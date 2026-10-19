"use server";
import { revalidatePath } from "next/cache";
import { requirePublicUser } from "@/lib/auth/user";
import { deleteOwnTravelImage } from "@/lib/travel/travel-image";
export async function deleteTravelImageAction(form: FormData) {
  const id = form.get("listingId");
  const locale = form.get("locale") === "de" ? "de" : "uz";
  if (typeof id !== "string" || !/^[1-9]\d{0,18}$/.test(id)) return;
  const user = await requirePublicUser(locale,"/safar/mine");
  await deleteOwnTravelImage(id,user.user.id);
  revalidatePath(`/${locale}/safar`);
  revalidatePath(`/${locale}/safar/mine/${id}/edit`);
}
