import type { UserPreferredLocale } from "@/types/user";

export type NotificationType = "savol_new_answer" | "market_listing_hidden" | "market_listing_removed";

export type Notification = Readonly<{
  id: string;
  type: NotificationType;
  questionId: string | null;
  questionSlug: string | null;
  questionTitle: string | null;
  answerId: string | null;
  actorDisplayName: string | null;
  marketListingId: string | null;
  marketListingSlug: string | null;
  marketListingTitle: string | null;
  readAt: string | null;
  createdAt: string;
}>;

export type NotificationRecipient = Readonly<{
  userId: string;
  email: string;
  locale: UserPreferredLocale;
}>;
