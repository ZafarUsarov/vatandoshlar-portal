"use server";

import { revalidatePath } from "next/cache";
import { requirePublicUser } from "@/lib/auth/user";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/notifications/notification-repository";

function localeFrom(value: FormDataEntryValue | null): "uz" | "de" {
  return value === "de" ? "de" : "uz";
}

export async function markNotificationReadAction(formData: FormData): Promise<void> {
  const locale = localeFrom(formData.get("locale"));
  const context = await requirePublicUser(locale, "/account/notifications");
  const notificationId = typeof formData.get("notificationId") === "string"
    ? String(formData.get("notificationId"))
    : "";

  if (!/^\d+$/.test(notificationId)) return;
  await markNotificationRead(notificationId, context.user.id);
  revalidatePath(`/${locale}/account/notifications`);
}

export async function markAllNotificationsReadAction(formData: FormData): Promise<void> {
  const locale = localeFrom(formData.get("locale"));
  const context = await requirePublicUser(locale, "/account/notifications");
  await markAllNotificationsRead(context.user.id);
  revalidatePath(`/${locale}/account/notifications`);
}
