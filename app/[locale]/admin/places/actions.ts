"use server";

import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminPlace, updateAdminPlace, type AdminPlaceInput } from "@/lib/places/admin-places-repository";
import { placeCategories, type PlaceCategory } from "@/lib/places/places-repository";

export type PlaceFormState = { error: string | null; success: boolean };
const val = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const optional = (s: string) => s || null;
function numberOrNull(s: string): number | null { return s === "" ? null : Number(s); }
function parseInput(f: FormData): AdminPlaceInput {
  const category = val(f, "category");
  if (!placeCategories.some(c => c === category)) throw new Error("Invalid category");
  const status = val(f, "status");
  if (status !== "draft" && status !== "published" && status !== "archived") throw new Error("Invalid status");
  const specialistIds = val(f, "specialistIds").split(/[\s,;]+/).filter(Boolean);
  return {
    slug: val(f, "slug"), name: val(f, "name"), category: category as PlaceCategory,
    descriptionUz: val(f, "descriptionUz"), descriptionDe: val(f, "descriptionDe"),
    locationId: val(f, "locationId"), streetAddress: optional(val(f, "streetAddress")),
    postalCode: optional(val(f, "postalCode")), latitude: numberOrNull(val(f, "latitude")),
    longitude: numberOrNull(val(f, "longitude")), website: optional(val(f, "website")),
    logoPath: optional(val(f, "logoPath")), categoryLabelUz: optional(val(f, "categoryLabelUz")),
    categoryLabelDe: optional(val(f, "categoryLabelDe")), status, specialistIds,
  };
}
function errorText(error: unknown, de: boolean): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    if (error.code === "23505") return de ? "Slug bereits vergeben" : "Bu slug allaqachon mavjud";
    if (error.code === "23503") return de ? "Ungültige Orts- oder Spezialisten-ID" : "Shahar yoki mutaxassis ID noto‘g‘ri";
  }
  if (error instanceof Error && /^(Invalid |Coordinates |Invalid website)/.test(error.message)) return error.message;
  return de ? "Speichern fehlgeschlagen. Eingaben prüfen." : "Saqlashda xatolik. Ma’lumotlarni tekshiring.";
}
export async function savePlaceAction(_prev: PlaceFormState, f: FormData): Promise<PlaceFormState> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  await requireAdmin(locale);
  try {
    const input = parseInput(f);
    const id = val(f, "id");
    if (id) {
      if (!/^\d{1,18}$/.test(id) || !(await updateAdminPlace(id, input))) throw new Error("Invalid place ID");
    } else {
      await createAdminPlace(input);
    }
    revalidatePath("/places");
    revalidatePath(`/places/${input.slug}`);
    revalidatePath("/admin/places");
    return { error: null, success: true };
  } catch (error) { return { error: errorText(error, locale === "de"), success: false }; }
}
