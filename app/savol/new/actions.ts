"use server";

import { randomUUID } from "node:crypto";

import { revalidatePath } from "next/cache";

import { redirect } from "@/i18n/navigation";
import { requirePublicUser } from "@/lib/auth/user";
import {
  createQuestion,
  getActiveQuestionCategories,
} from "@/lib/savol/savol-repository";
import type { UserPreferredLocale } from "@/types/user";

export type CreateQuestionState = Readonly<{
  error: string | null;
  errorField: "categoryId" | "title" | "body" | null;
}>;

function resolveLocale(value: FormDataEntryValue | null): UserPreferredLocale {
  return value === "de" ? "de" : "uz";
}

function textValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value: string): string {
  const base = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return `${base || "savol"}-${randomUUID().slice(0, 8)}`;
}

export async function createQuestionAction(
  _previousState: CreateQuestionState,
  formData: FormData,
): Promise<CreateQuestionState> {
  const locale = resolveLocale(formData.get("locale"));
  const context = await requirePublicUser(locale);

  const categoryId = textValue(formData.get("categoryId"));
  const title = textValue(formData.get("title"));
  const body = textValue(formData.get("body"));

  const copy =
    locale === "de"
      ? {
          category: "Bitte wählen Sie eine gültige Kategorie.",
          title: "Bitte geben Sie einen Titel mit mindestens 10 Zeichen ein.",
          body: "Bitte beschreiben Sie Ihre Frage mit mindestens 20 Zeichen.",
        }
      : {
          category: "To‘g‘ri kategoriyani tanlang.",
          title: "Savol sarlavhasini kamida 10 ta belgi bilan yozing.",
          body: "Savolingizni kamida 20 ta belgi bilan batafsilroq yozing.",
        };

  if (!/^\d+$/.test(categoryId)) {
    return { error: copy.category, errorField: "categoryId" };
  }

  const categories = await getActiveQuestionCategories();
  if (!categories.some((category) => category.id === categoryId)) {
    return { error: copy.category, errorField: "categoryId" };
  }

  if (title.length < 10 || title.length > 180) {
    return { error: copy.title, errorField: "title" };
  }

  if (body.length < 20 || body.length > 10000) {
    return { error: copy.body, errorField: "body" };
  }

  const question = await createQuestion({
    authorUserId: context.user.id,
    categoryId,
    locationId: context.profile?.homeLocationId ?? null,
    slug: slugify(title),
    title,
    body,
    contentLanguage: locale,
    tagIds: [],
  });

  revalidatePath(`/${locale}/savol`);

  return redirect({
    href: `/savol/${question.slug}`,
    locale,
  });
}
