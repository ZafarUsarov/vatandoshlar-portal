"use server";

import { revalidatePath } from "next/cache";

import { requirePublicUser } from "@/lib/auth/user";
import {
  createAnswer,
  getPublishedAnswersForQuestion,
  getPublishedQuestionBySlug,
  toggleAnswerHelpfulVote,
  toggleQuestionFollow,
} from "@/lib/savol/savol-repository";
import type { UserPreferredLocale } from "@/types/user";

export type CreateAnswerState = Readonly<{
  error: string | null;
}>;

function resolveLocale(value: FormDataEntryValue | null): UserPreferredLocale {
  return value === "de" ? "de" : "uz";
}

function textValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function createAnswerAction(
  _previousState: CreateAnswerState,
  formData: FormData,
): Promise<CreateAnswerState> {
  const locale = resolveLocale(formData.get("locale"));
  const context = await requirePublicUser(locale);
  const slug = textValue(formData.get("slug"));
  const body = textValue(formData.get("body"));

  const error =
    locale === "de"
      ? "Bitte schreiben Sie eine Antwort mit mindestens 10 Zeichen."
      : "Javobni kamida 10 ta belgi bilan yozing.";

  if (!slug || body.length < 10 || body.length > 10000) {
    return { error };
  }

  const question = await getPublishedQuestionBySlug(slug);
  if (!question) {
    return {
      error:
        locale === "de"
          ? "Diese Frage ist nicht mehr verfügbar."
          : "Bu savol endi mavjud emas.",
    };
  }

  await createAnswer({
    questionId: question.id,
    authorUserId: context.user.id,
    body,
  });

  revalidatePath(`/${locale}/savol/${slug}`);
  return { error: null };
}

export async function toggleHelpfulAction(formData: FormData): Promise<void> {
  const locale = resolveLocale(formData.get("locale"));
  const context = await requirePublicUser(locale);
  const slug = textValue(formData.get("slug"));
  const answerId = textValue(formData.get("targetId"));

  if (!slug || !/^\d+$/.test(answerId)) {
    return;
  }

  const question = await getPublishedQuestionBySlug(slug);
  if (!question) {
    return;
  }

  const answers = await getPublishedAnswersForQuestion(question.id);
  if (!answers.some((answer) => answer.id === answerId)) {
    return;
  }

  await toggleAnswerHelpfulVote(answerId, context.user.id);
  revalidatePath(`/${locale}/savol/${slug}`);
}

export async function toggleFollowAction(formData: FormData): Promise<void> {
  const locale = resolveLocale(formData.get("locale"));
  const context = await requirePublicUser(locale);
  const slug = textValue(formData.get("slug"));
  const questionId = textValue(formData.get("targetId"));

  if (!slug || !/^\d+$/.test(questionId)) {
    return;
  }

  const question = await getPublishedQuestionBySlug(slug);
  if (!question || question.id !== questionId) {
    return;
  }

  await toggleQuestionFollow(questionId, context.user.id);
  revalidatePath(`/${locale}/savol/${slug}`);
}
