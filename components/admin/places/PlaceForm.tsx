"use client";

import { useActionState } from "react";
import PlaceCityPicker from "./PlaceCityPicker";
import PlaceLogoUpload from "./PlaceLogoUpload";
import PlaceSpecialistPicker from "./PlaceSpecialistPicker";
import type { PlaceSpecialistOption } from "@/lib/places/admin-specialists";
import { savePlaceAction, type PlaceFormState } from "@/app/[locale]/admin/places/actions";
import type { AdminPlace } from "@/lib/places/admin-places-repository";

const initial: PlaceFormState = { error: null, success: false };
const categories = ["restaurant", "hotel", "shop", "service", "organization", "other"];
export default function PlaceForm({ place, locale, specialists }: { place?: AdminPlace | null; locale: "uz" | "de"; specialists: PlaceSpecialistOption[] }) {
  const [state, action, pending] = useActionState(savePlaceAction, initial);
  const de = locale === "de";
  const fields: { name: string; label: string; required?: boolean; multiline?: boolean; type?: string }[] = [
    { name: "slug", label: "Slug (a-z, 0-9, -)", required: true },
    { name: "name", label: de ? "Name" : "Nomi", required: true },
    { name: "descriptionUz", label: "Tavsif (UZ)", multiline: true },
    { name: "descriptionDe", label: "Beschreibung (DE)", multiline: true },
    { name: "streetAddress", label: de ? "Straße und Hausnummer" : "Ko‘cha va uy raqami" },
    { name: "postalCode", label: "PLZ" },
    { name: "latitude", label: "Latitude", type: "number" },
    { name: "longitude", label: "Longitude", type: "number" },
    { name: "website", label: "Website", type: "url" },

    { name: "categoryLabelUz", label: "Kategoriya nomi (UZ)" },
    { name: "categoryLabelDe", label: "Kategoriebezeichnung (DE)" },

  ];
  const defaults: Record<string, string> = place ? {
    slug: place.slug, name: place.name, descriptionUz: place.description_uz, descriptionDe: place.description_de,
    locationId: place.location_id, streetAddress: place.street_address ?? "", postalCode: place.postal_code ?? "",
    latitude: place.latitude ?? "", longitude: place.longitude ?? "", website: place.website ?? "",
    logoPath: place.logo_path ?? "", categoryLabelUz: place.category_label_uz ?? "",
    categoryLabelDe: place.category_label_de ?? "", specialistIds: place.specialist_ids.join(", "),
  } : {};
  return <form action={action} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
    {place && <input type="hidden" name="id" value={place.id} />}
    <div className="grid gap-5 md:grid-cols-2">
      <PlaceCityPicker locale={locale} initialId={place?.location_id ?? ""} initialLabel={place ? `${place.city_name ?? place.state_name}, ${place.state_name}` : ""} />
      {fields.map(f => <label key={f.name} className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{f.label}
        {f.multiline ? <textarea name={f.name} defaultValue={defaults[f.name] ?? ""} rows={4} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"/> :
        <input name={f.name} type={f.type ?? "text"} step={f.type === "number" ? "any" : undefined} required={f.required} defaultValue={defaults[f.name] ?? ""} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"/>}
      </label>)}
      <PlaceLogoUpload initialPath={place?.logo_path ?? ""} locale={locale} />
      <PlaceSpecialistPicker options={specialists} selected={place?.specialist_ids ?? []} locale={locale} />
      <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">{de ? "Kategorie" : "Kategoriya"}<select name="category" defaultValue={place?.category ?? "organization"} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white">{categories.map(c => <option key={c} value={c}>{{ restaurant: de ? "Restaurant" : "Restoran", hotel: de ? "Hotel" : "Mehmonxona", shop: de ? "Geschäft" : "Do‘kon", service: de ? "Dienstleistung" : "Xizmat", organization: de ? "Organisation" : "Tashkilot", other: de ? "Sonstiges" : "Boshqa" }[c]}</option>)}</select></label>
      <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">Status<select name="status" defaultValue={place?.status ?? "draft"} className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
    </div>
    {state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{state.error}</p>}
    {state.success && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{de ? "Gespeichert" : "Saqlandi"}</p>}
    <button type="submit" disabled={pending} className="rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white disabled:opacity-50">{pending ? (de ? "Speichern..." : "Saqlanmoqda...") : (de ? "Speichern" : "Saqlash")}</button>
  </form>;
}
