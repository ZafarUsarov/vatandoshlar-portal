"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/admin";
import { moderateSavolReport } from "@/lib/savol/moderation-repository";
import type { SavolContentStatus } from "@/types/savol";

export async function moderateSavolAction(formData: FormData): Promise<void> {
  const locale = formData.get("locale") === "de" ? "de" : "uz";
  await requireAdmin(locale);

  const reportId = String(formData.get("reportId") ?? "");
  const targetId = String(formData.get("targetId") ?? "");
  const targetType = formData.get("targetType") === "answer" ? "answer" : "question";
  const requestedStatus = String(formData.get("status") ?? "");

  if (!/^\d+$/.test(reportId) || !/^\d+$/.test(targetId)) return;
  if (!(["published", "hidden", "removed"] as const).includes(requestedStatus as SavolContentStatus)) return;

  await moderateSavolReport({
    reportId,
    targetId,
    targetType,
    contentStatus: requestedStatus as SavolContentStatus,
  });

  revalidatePath(`/${locale}/admin/savol`);
  revalidatePath(`/${locale}/savol`);
}
