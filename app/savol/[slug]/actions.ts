"use server";

import { revalidatePath } from "next/cache";
import { createAnswerReply, updateOwnPublishedReply, removeOwnPublishedReply } from "@/lib/savol/answer-replies-repository";

import { requirePublicUser } from "@/lib/auth/user";
import {
  createAnswer,
  getPublishedAnswersForQuestion,
  getPublishedQuestionBySlug,
  updateOwnPublishedAnswer,
  removeOwnPublishedAnswer,
  removeOwnPublishedQuestion,
  toggleAnswerHelpfulVote,
  toggleQuestionFollow,
} from "@/lib/savol/savol-repository";
import { createContentReport, type SavolReportReason } from "@/lib/savol/moderation-repository";
import { createAnswerReplyNotification, createNewAnswerNotifications } from "@/lib/notifications/notification-repository";
import { sendSavolAnswerReplyEmail, sendSavolNewAnswerEmail } from "@/lib/email/savol-email";
import type { UserPreferredLocale } from "@/types/user";

export type CreateAnswerState = Readonly<{
  error: string | null;
  answerId?: string;
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

  if (question.authorUserId === context.user.id) {
    return {
      error: locale === "de"
        ? "Sie können Ihre eigene Frage nicht beantworten. Antworten Sie stattdessen auf Beiträge anderer Nutzer."
        : "O‘z savolingizga javob yoza olmaysiz. Boshqa foydalanuvchilarning javoblariga munosabat bildiring.",
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
  return { error: null, answerId: answer.id };
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

  if (targetType === "question" && question.authorUserId === context.user.id) {
    return {
      status: "error",
      message: locale === "de"
        ? "Sie können Ihre eigene Frage nicht melden."
        : "O‘z savolingiz ustidan shikoyat yubora olmaysiz.",
    };
  }
  if (targetType === "answer") {
    const answers = await getPublishedAnswersForQuestion(question.id);
    if (answers.some((answer) => answer.id === targetId && answer.authorUserId === context.user.id)) {
      return {
        status: "error",
        message: locale === "de"
          ? "Sie können Ihre eigene Antwort nicht melden."
          : "O‘z javobingiz ustidan shikoyat yubora olmaysiz.",
      };
    }
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

export type CreateReplyState = Readonly<{ error: string | null; success: boolean }>;
export async function createReplyAction(_previousState: CreateReplyState, formData: FormData): Promise<CreateReplyState> {
  const locale = resolveLocale(formData.get("locale"));
  const context = await requirePublicUser(locale);
  const slug = textValue(formData.get("slug"));
  const answerId = textValue(formData.get("answerId"));
  const body = textValue(formData.get("body"));
  const parentId = textValue(formData.get("parentId")) || null;
  const invalid = locale === "de" ? "Bitte schreiben Sie 2–3000 Zeichen." : "Izoh 2–3000 belgidan iborat bo‘lsin.";
  if (!slug || !/^\d+$/.test(answerId) || (parentId !== null && !/^\d+$/.test(parentId)) || body.length < 2 || body.length > 3000) return { error: invalid, success: false };
  const question = await getPublishedQuestionBySlug(slug);
  if (!question) return { error: locale === "de" ? "Frage nicht gefunden." : "Savol topilmadi.", success: false };
  const replyId = await createAnswerReply({ answerId, questionId: question.id, authorUserId: context.user.id, body, parentId });
  if (!replyId) return { error: locale === "de" ? "Antwort nicht verfügbar." : "Javob mavjud emas.", success: false };
  try {
    const recipient = await createAnswerReplyNotification({
      questionId: question.id, answerId, replyId, actorUserId: context.user.id,
    });
    if (recipient) {
      await sendSavolAnswerReplyEmail({
        to: recipient.email, locale: recipient.locale,
        questionSlug: question.slug, questionTitle: question.title,
      });
    }
  } catch (notificationError) {
    console.error('Savol reply notification failed', { questionId: question.id, answerId, replyId, notificationError });
  }
  revalidatePath(`/${locale}/savol/${slug}`);
  return { error: null, success: true };
}


export type ManageAnswerResult = Readonly<{ error: string | null }>;

export async function updateOwnAnswerAction(input: Readonly<{
  locale: UserPreferredLocale;
  slug: string;
  answerId: string;
  body: string;
}>): Promise<ManageAnswerResult> {
  const locale = input.locale === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const slug = input.slug.trim();
  const body = input.body.trim();
  if (!slug || !/^[1-9]\d*$/.test(input.answerId) || body.length < 10 || body.length > 10000) {
    return { error: locale === "de" ? "Die Antwort muss 10–10000 Zeichen enthalten." : "Javob 10–10000 belgidan iborat bo‘lishi kerak." };
  }
  const question = await getPublishedQuestionBySlug(slug);
  if (!question) return { error: locale === "de" ? "Frage nicht gefunden." : "Savol topilmadi." };
  const updated = await updateOwnPublishedAnswer({
    answerId: input.answerId, questionId: question.id, authorUserId: context.user.id, body,
  });
  if (!updated) return { error: locale === "de" ? "Diese Antwort kann nicht bearbeitet werden." : "Bu javobni tahrirlab bo‘lmaydi." };
  revalidatePath(`/${locale}/savol/${slug}`);
  return { error: null };
}

export async function removeOwnAnswerAction(input: Readonly<{
  locale: UserPreferredLocale;
  slug: string;
  answerId: string;
}>): Promise<ManageAnswerResult> {
  const locale = input.locale === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const slug = input.slug.trim();
  if (!slug || !/^[1-9]\d*$/.test(input.answerId)) {
    return { error: locale === "de" ? "Ungültige Antwort." : "Javob ma’lumotlari noto‘g‘ri." };
  }
  const question = await getPublishedQuestionBySlug(slug);
  if (!question) return { error: locale === "de" ? "Frage nicht gefunden." : "Savol topilmadi." };
  const removed = await removeOwnPublishedAnswer({
    answerId: input.answerId, questionId: question.id, authorUserId: context.user.id,
  });
  if (!removed) return { error: locale === "de" ? "Diese Antwort kann nicht entfernt werden." : "Bu javobni o‘chirib bo‘lmaydi." };
  revalidatePath(`/${locale}/savol/${slug}`);
  return { error: null };
}

export type ManageReplyResult = Readonly<{ error: string | null }>;
type ReplyActionInput = Readonly<{ locale: UserPreferredLocale; slug: string; answerId: string; replyId: string }>;

export async function updateOwnReplyAction(input: ReplyActionInput & { body: string }): Promise<ManageReplyResult> {
  const locale = input.locale === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const slug = input.slug.trim();
  const body = input.body.trim();
  if (!slug || !/^[1-9]\d*$/.test(input.answerId) || !/^[1-9]\d*$/.test(input.replyId) || body.length < 2 || body.length > 3000) {
    return { error: locale === "de" ? "Der Kommentar muss 2–3000 Zeichen enthalten." : "Izoh 2–3000 belgidan iborat bo‘lishi kerak." };
  }
  const question = await getPublishedQuestionBySlug(slug);
  if (!question) return { error: locale === "de" ? "Frage nicht gefunden." : "Savol topilmadi." };
  const updated = await updateOwnPublishedReply({ replyId: input.replyId, answerId: input.answerId, questionId: question.id, authorUserId: context.user.id, body });
  if (!updated) return { error: locale === "de" ? "Kommentar kann nicht bearbeitet werden." : "Izohni tahrirlab bo‘lmaydi." };
  revalidatePath(`/${locale}/savol/${slug}`);
  return { error: null };
}

export async function removeOwnReplyAction(input: ReplyActionInput): Promise<ManageReplyResult> {
  const locale = input.locale === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const slug = input.slug.trim();
  if (!slug || !/^[1-9]\d*$/.test(input.answerId) || !/^[1-9]\d*$/.test(input.replyId)) {
    return { error: locale === "de" ? "Ungültiger Kommentar." : "Izoh ma’lumotlari noto‘g‘ri." };
  }
  const question = await getPublishedQuestionBySlug(slug);
  if (!question) return { error: locale === "de" ? "Frage nicht gefunden." : "Savol topilmadi." };
  const removed = await removeOwnPublishedReply({ replyId: input.replyId, answerId: input.answerId, questionId: question.id, authorUserId: context.user.id });
  if (!removed) return { error: locale === "de" ? "Kommentar kann nicht gelöscht werden." : "Izohni o‘chirib bo‘lmaydi." };
  revalidatePath(`/${locale}/savol/${slug}`);
  return { error: null };
}


/** Only the signed-in question author can remove their published question. */
export async function removeOwnQuestionAction(input: Readonly<{
  slug: string;
  locale: UserPreferredLocale;
}>): Promise<{ error: string | null }> {
  const locale = input.locale === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const slug = input.slug.trim();
  if (!slug) return { error: locale === "de" ? "Ungültige Frage." : "Savol noto‘g‘ri." };
  const question = await getPublishedQuestionBySlug(slug);
  if (!question || question.authorUserId !== context.user.id) {
    return { error: locale === "de" ? "Keine Berechtigung." : "Bu savolni o‘chirish huquqi yo‘q." };
  }
  const removed = await removeOwnPublishedQuestion({
    questionId: question.id,
    authorUserId: context.user.id,
  });
  if (!removed) return { error: locale === "de" ? "Die Frage konnte nicht gelöscht werden." : "Savolni o‘chirib bo‘lmadi." };
  revalidatePath(`/${locale}/savol/${slug}`);
  revalidatePath(`/${locale}/savol`);
  return { error: null };
}
