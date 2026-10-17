"use server";

import { revalidatePath } from "next/cache";
import { requirePublicUser } from "@/lib/auth/user";
import { getPublishedAnswersForQuestion, getPublishedQuestionBySlug } from "@/lib/savol/savol-repository";
import { toggleAnswerVote } from "@/lib/savol/answer-votes-repository";

export async function voteOnAnswerAction(formData: FormData): Promise<void> {
  const locale = formData.get("locale") === "de" ? "de" : "uz";
  const context = await requirePublicUser(locale);
  const slug = formData.get("slug");
  const answerId = formData.get("answerId");
  const direction = formData.get("direction");
  if (typeof slug !== "string" || !slug || typeof answerId !== "string" || !/^\d+$/.test(answerId) || (direction !== "up" && direction !== "down")) return;
  const question = await getPublishedQuestionBySlug(slug);
  if (!question) return;
  const answers = await getPublishedAnswersForQuestion(question.id);
  if (!answers.some((answer) => answer.id === answerId)) return;
  await toggleAnswerVote({ answerId, userId: context.user.id, direction });
  revalidatePath(`/${locale}/savol/${slug}`);
}
