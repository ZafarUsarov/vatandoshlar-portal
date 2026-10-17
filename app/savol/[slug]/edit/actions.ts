"use server";

import { revalidatePath } from "next/cache";
import { requirePublicUser } from "@/lib/auth/user";
import { getActiveQuestionCategories, getPublishedQuestionBySlug, updateOwnPublishedQuestion } from "@/lib/savol/savol-repository";
import { redirect } from "@/i18n/navigation";

export type EditQuestionState = { error: string | null; };
export async function editQuestionAction(
  slug: string,
  locale: "uz" | "de",
  _state: EditQuestionState,
  formData: FormData,
): Promise<EditQuestionState> {
  const user = await requirePublicUser(locale, `/savol/${slug}/edit`);
  const question = await getPublishedQuestionBySlug(slug);
  if (!question || question.authorUserId !== user.user.id) {
    return { error: locale === "de" ? "Keine Berechtigung." : "Tahrirlash huquqi yo‘q." };
  }
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const categories = await getActiveQuestionCategories();
  if (!categories.some((c) => c.id === categoryId) || title.length < 10 || title.length > 180 || body.length < 20 || body.length > 10000) {
    return { error: locale === "de" ? "Bitte prüfen Sie Kategorie, Titel (10–180) und Text (20–10000 Zeichen)." : "Kategoriya, sarlavha (10–180) va matnni (20–10000 belgi) tekshiring." };
  }
  const ok = await updateOwnPublishedQuestion({ questionId: question.id, authorUserId: user.user.id, categoryId, title, body });
  if (!ok) return { error: locale === "de" ? "Änderung fehlgeschlagen." : "O‘zgartirish saqlanmadi." };
  revalidatePath(`/${locale}/savol/${slug}`);
  return redirect({ href: `/savol/${slug}`, locale });
}
