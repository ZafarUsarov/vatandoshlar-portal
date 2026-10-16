"use client";
import MarketCategoryField from "@/components/market/MarketCategoryField";
import Image from "next/image";


import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import MarketContactFields from "@/components/market/MarketContactFields";
import MarketCityCombobox from "@/components/market/MarketCityCombobox";
import { createMarketDraftAction, publishCreatedMarketListing, type CreateMarketState } from "@/app/market/new/actions";

type Props = Readonly<{
  locale: "uz" | "de";
}>;
const initialState: CreateMarketState = {
  error: null,
  values: { category: "items", listingType: "", locationId: "", title: "", description: "", priceAmount: "", priceType: "fixed", contentLanguage: "uz", telegram: "", whatsapp: "", phone: "", email: "" },
  revision: 0,
};
const control = "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export default function CreateMarketForm({ locale }: Props) {
  const [state, action, pending] = useActionState(createMarketDraftAction, initialState);
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => () => previews.forEach(url => URL.revokeObjectURL(url)), [previews]);
  useEffect(() => { if (!state.error) return; const target = document.getElementById(state.errorField ?? "market-form-error"); target?.scrollIntoView({ behavior: "smooth", block: "center" }); if (target instanceof HTMLElement) target.focus({ preventScroll: true }); }, [state.error, state.revision, state.errorField]);
  const [progress, setProgress] = useState("");
  const [uploadError, setUploadError] = useState("");
  const started = useRef<string | null>(null);
  const [working, setWorking] = useState(false);
  useEffect(() => {
    if (!state.createdId || started.current === state.createdId) return;
    const id = state.createdId;
    started.current = id;
    let active = true;
    async function finish() {
      setWorking(true);
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!active) return;
          setProgress(`${i + 1}/${files.length}`);
          const endpoint = `/api/market/listings/${id}/images`;
          const reserved = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contentType: file.type, byteSize: file.size }) });
          if (!reserved.ok) throw new Error(`Image reservation failed (${reserved.status})`);
          const { imageId } = await reserved.json() as { imageId: string };
          try {
            const uploaded = await fetch(`${endpoint}/${imageId}/upload`, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
            if (!uploaded.ok) throw new Error(`Image upload failed (${uploaded.status})`);
            const confirmed = await fetch(`${endpoint}/${imageId}/confirm`, { method: "POST" });
            if (!confirmed.ok) throw new Error(`Image confirmation failed (${confirmed.status})`);
          } catch (error) {
            await fetch(`${endpoint}/${imageId}`, { method: "DELETE" }).catch(() => undefined);
            throw error;
          }
        }
        const published = await publishCreatedMarketListing(id, locale);
        if (!published) throw new Error(locale === "de" ? "Veröffentlichung fehlgeschlagen." : "E’lonni nashr qilib bo‘lmadi.");
        router.push("/market/mine");
      } catch (error) {
        if (active) setUploadError(error instanceof Error ? error.message : "Upload failed");
      } finally { if (active) setWorking(false); }
    }
    void finish();
    return () => { active = false; };
  }, [state.createdId, files, locale, router]);
  const t = locale === "de" ? {
    type: "Anzeigenart", city: "Stadt", title: "Titel", description: "Beschreibung", price: "Preis in EUR", save: "Anzeige veröffentlichen", saving: "Wird gespeichert…", select: "Bitte auswählen", sell: "Verkaufen", buy: "Suche", giveaway: "Verschenken", note: "Speichern Sie zuerst den Entwurf. Danach können Sie bis zu fünf Bilder hochladen und die Anzeige veröffentlichen.",
  } : {
    type: "E’lon turi", city: "Shahar", title: "Sarlavha", description: "Tavsif", price: "Narx (EUR)", save: "E’lonni joylashtirish", saving: "Saqlanmoqda…", select: "Tanlang", sell: "Sotaman", buy: "Sotib olaman", giveaway: "Bepul beraman", note: "Avval qoralamani saqlang. Keyingi bosqichda 5 tagacha rasm yuklab, e’lonni nashr qilishingiz mumkin.",
  };
  return <form action={action} className="space-y-5" noValidate>
    <input type="hidden" name="flow" value="inline" />
    <input type="hidden" name="locale" value={locale} />
    {state.error && <p id="market-form-error" tabIndex={-1} role="alert" className="rounded-xl border border-red-300 p-3 text-red-700 dark:text-red-300">{state.error}</p>}
    <div><label htmlFor="market-type" className="mb-2 block font-semibold">{t.type}</label><div className="relative"><select id="market-type" name="listingType" defaultValue={state.values.listingType} required disabled={pending} className={`${control} appearance-none pr-14`}><option value="" disabled>{t.select}</option><option value="sell">{t.sell}</option><option value="buy">{t.buy}</option><option value="giveaway">{t.giveaway}</option></select><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600 dark:text-slate-300"><path d="m6 9 6 6 6-6" /></svg></div></div>
    <div><label htmlFor="market-language" className="mb-2 block font-semibold">{locale === "de" ? "Sprache der Anzeige" : "E’lon tili"}</label><select id="market-language" name="contentLanguage" defaultValue={state.values.contentLanguage} required disabled={pending} className={control}><option value="uz">O‘zbekcha</option><option value="de">Deutsch</option></select></div>
    <MarketCategoryField locale={locale} value={state.values.category as import("@/lib/market/market-category").MarketCategory} disabled={pending} />
    <MarketCityCombobox initialId={state.values.locationId} locale={locale} disabled={pending} />
    <div><label htmlFor="market-title" className="mb-2 block font-semibold">{t.title}</label><input id="market-title" name="title" defaultValue={state.values.title} required disabled={pending} className={control} /></div>
    <div><label htmlFor="market-description" className="mb-2 block font-semibold">{t.description}</label><textarea id="market-description" name="description" defaultValue={state.values.description} minLength={20} maxLength={10000} rows={7} required disabled={pending} className={control} /></div>
    <div><label htmlFor="market-price" className="mb-2 block font-semibold">{t.price}</label><input id="market-price" name="priceAmount" defaultValue={state.values.priceAmount} inputMode="decimal" placeholder="9,99" disabled={pending} aria-describedby="market-price-help" className={control} /><p id="market-price-help" className="mt-1 text-sm text-slate-600 dark:text-slate-300">{locale === "de" ? "Zum Beispiel 9,99 oder 999. Komma für Cent, Punkt nur für Tausender." : "Masalan: 9,99 yoki 999. Ti­yin uchun vergul, nuqta faqat minglik uchun."}</p>{state.errorField === "market-price" && <p role="alert" className="mt-1 text-sm text-red-700 dark:text-red-300">{state.error}</p>}</div>
    <fieldset id="market-price-type" className="space-y-2"><legend className="font-semibold">{locale === "de" ? "Preisart" : "Narx turi"}</legend><div className="flex flex-wrap gap-4"><label><input type="radio" name="priceType" value="fixed" defaultChecked={state.values.priceType !== "negotiable"} /> {locale === "de" ? "Festpreis" : "Qat’iy narx (Festpreis)"}</label><label><input type="radio" name="priceType" value="negotiable" defaultChecked={state.values.priceType === "negotiable"} /> {locale === "de" ? "VB (verhandelbar)" : "Kelishiladi"}</label></div></fieldset>
    <MarketContactFields locale={locale} values={state.values} disabled={pending} />
    <div><label htmlFor="market-new-images" className="mb-2 block font-semibold">{locale === "de" ? "Bilder" : "Rasmlar"}</label>
      <input id="market-new-images" type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={pending || working || Boolean(state.createdId)} onChange={event => {
        const next = Array.from(event.target.files ?? []);
        if (next.length > 5 || next.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size < 1 || file.size > 5 * 1024 * 1024)) {
          setUploadError(locale === "de" ? "Maximal 5 Bilder, JPEG/PNG/WebP, je 5 MB." : "5 tagacha JPG/PNG/WebP rasm, har biri 5 MB gacha.");
          event.target.value = ""; return;
        }
        setUploadError(""); setFiles(next); setPreviews(next.map(file => URL.createObjectURL(file)));
      }} className={control} />
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">JPG, PNG, WebP · 5 {locale === "de" ? "Bilder" : "tagacha rasm"} · 5 MB</p>
    </div>
    {previews.length > 0 && <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">{previews.map((src, i) => <div key={src} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"><Image src={src} alt={`${locale === "de" ? "Bild" : "Rasm"} ${i + 1}`} width={160} height={160} unoptimized className="aspect-square w-full object-cover" /><p className="truncate px-2 py-1 text-xs">{files[i]?.name}</p></div>)}</div>}
    {progress && <p role="status">{locale === "de" ? "Bilder werden hochgeladen" : "Rasmlar yuklanmoqda"}: {progress}</p>}
    {uploadError && <p role="alert" className="text-red-700 dark:text-red-300">{uploadError} <a className="underline" href={`/market/${state.createdId}/edit`}>{locale === "de" ? "Entwurf bearbeiten und fortsetzen" : "Qoralamani tahrirlab davom etish"}</a></p>}
    <p role="status" aria-live="polite">{pending ? (locale === "de" ? "Anzeige wird geprüft…" : "E’lon tekshirilmoqda…") : working ? (locale === "de" ? "Bilder werden hochgeladen und Anzeige veröffentlicht…" : "Rasmlar yuklanmoqda va e’lon joylashtirilmoqda…") : null}</p>
    <button disabled={pending || working || Boolean(state.createdId)} className="min-h-12 rounded-xl bg-emerald-700 px-6 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">{pending ? t.saving : t.save}</button>
  </form>;
}
