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
import { createContentReport, type SavolReportReason } from "@/lib/savol/moderation-repository";
import { createNewAnswerNotifications } from "@/lib/notifications/notification-repository";
import { sendSavolNewAnswerEmail } from "@/lib/email/savol-email";
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

  const answer = await createAnswer({
    questionId: question.id,
    authorUserId: context.user.id,
    body,
  });

  try {
    const recipients = await createNewAnswerNotifications({
      questionId: question.id,
      answerId: answer.id,
      actorUserId: context.user.id,
    });

    await Promise.allSettled(
      recipients.map((recipient) =>
        sendSavolNewAnswerEmail({
          to: recipient.email,
          locale: recipient.locale,
          questionSlug: question.slug,
          questionTitle: question.title,
        }),
      ),
    );
  } catch (notificationError) {
    console.error("Savol notification creation failed", {
      questionId: question.id,
      answerId: answer.id,
      notificationError,
    });
  }

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


export type ReportContentState = Readonly<{
  status: "idle" | "success" | "duplicate" | "error";
  message: string | null;
}>;

export async function reportContentAction(
  _previousState: ReportContentState,
  formData: FormData,
): Promise<ReportContentState> {
  const locale = resolveLocale(formData.get("locale"));
  const context = await requirePublicUser(locale);
  const slug = textValue(formData.get("slug"));
  const targetType = formData.get("targetType") === "answer" ? "answer" : "question";
  const targetId = textValue(formData.get("targetId"));
  const rawReason = textValue(formData.get("reason"));
  const details = textValue(formData.get("details"));
  const reasons = ["spam", "abuse", "misinformation", "other"] as const;

  if (!slug || !/^\d+$/.test(targetId) || !reasons.includes(rawReason as SavolReportReason) || details.length > 1000) {
    return { status: "error", message: locale === "de" ? "Die Meldung ist ungültig." : "Shikoyat ma’lumotlari noto‘g‘ri." };
  }

  const question = await getPublishedQuestionBySlug(slug);
  if (!question) {
    return { status: "error", message: locale === "de" ? "Dieser Inhalt ist nicht mehr verfügbar." : "Bu kontent endi mavjud emas." };
  }

  if (targetType === "question") {
    if (question.id !== targetId) return { status: "error", message: locale === "de" ? "Die Meldung ist ungültig." : "Shikoyat ma’lumotlari noto‘g‘ri." };
  } else {
    const answers = await getPublishedAnswersForQuestion(question.id);
    if (!answers.some((answer) => answer.id === targetId)) return { status: "error", message: locale === "de" ? "Die Antwort ist nicht mehr verfügbar." : "Bu javob endi mavjud emas." };
  }

  const result = await createContentReport({
    reporterUserId: context.user.id,
    targetType,
    targetId,
    reason: rawReason as SavolReportReason,
    details: details || null,
  });

  return result === "duplicate"
    ? { status: "duplicate", message: locale === "de" ? "Sie haben diesen Inhalt bereits gemeldet." : "Siz bu kontent haqida avval shikoyat qilgansiz." }
    : { status: "success", message: locale === "de" ? "Danke. Die Meldung wurde zur Prüfung gesendet." : "Rahmat. Shikoyat tekshiruvga yuborildi." };
}
