import type { UserPreferredLocale } from "@/types/user";

export type NotificationType = "savol_new_answer";

export type Notification = Readonly<{
  id: string;
  type: NotificationType;
  questionId: string;
  questionSlug: string;
  questionTitle: string;
  answerId: string;
  actorDisplayName: string | null;
  readAt: string | null;
  createdAt: string;
}>;

export type NotificationRecipient = Readonly<{
  userId: string;
  email: string;
  locale: UserPreferredLocale;
}>;
