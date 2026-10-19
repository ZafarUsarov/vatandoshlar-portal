"use client";

import { useActionState, useState } from "react";
import { Check, Copy, Ellipsis, Pencil, Send, Share2, Trash2, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { changeTravelStatusAction, removeTravelListingAction, type TravelMutationState } from "@/app/travel/mine/actions";

const initial: TravelMutationState = { error: null, success: false };

type Props = { id: string; slug: string; status: string; locale: "uz" | "de" };

export default function TravelListingActions({ id, slug, status, locale }: Props) {
  const de = locale === "de";
  const [change, changeAction, changing] = useActionState(changeTravelStatusAction, initial);
  const [remove, removeAction, removing] = useActionState(removeTravelListingAction, initial);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const shareText = de ? "Reiseanzeige auf Vatandoshlar.de" : "Vatandoshlar.de saytidagi safar e’loni";
  const encodedShare = encodeURIComponent(`${shareText}\n${shareUrl}`);

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return <div className="flex flex-wrap items-start gap-2">
    {status === "draft" && <form action={changeAction} className="space-y-2">
      <input type="hidden" name="listingId" value={id} />
      <input type="hidden" name="operation" value={status === "draft" ? "publish" : "close"} />
      <button disabled={changing} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-4 font-semibold text-white disabled:opacity-50">
        {status === "draft" ? <Send aria-hidden="true" size={17} /> : <X aria-hidden="true" size={17} />}
        {changing ? (de ? "Bitte warten…" : "Kutilmoqda…") : status === "draft" ? (de ? "Anzeige veröffentlichen" : "E’lonni joylash") : (de ? "Anzeige schließen" : "E’lonni yopish")}
      </button>
      {change.error && <p role="alert" className="max-w-xs text-sm text-red-700 dark:text-red-300">{change.error}</p>}
    </form>}

    {status === "published" && <details className="group relative">
      <summary onClick={() => setShareUrl(`${window.location.origin}/${locale}/safar/${encodeURIComponent(slug)}`)} className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-300 px-4 font-semibold marker:hidden dark:border-slate-700 [&::-webkit-details-marker]:hidden">
        <Share2 aria-hidden="true" size={17} />{de ? "Teilen" : "Ulashish"}
      </summary>
      <div className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <button type="button" disabled={!shareUrl} onClick={copyLink} className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800">
          {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
          {copied ? (de ? "Link kopiert" : "Havola nusxalandi") : (de ? "Link kopieren" : "Havolani nusxalash")}
        </button>
        {shareUrl && <>
          <a className="flex min-h-10 items-center rounded-lg px-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800" href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">Telegram</a>
          <a className="flex min-h-10 items-center rounded-lg px-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800" href={`https://wa.me/?text=${encodedShare}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </>}
      </div>
    </details>}

    {status === "draft" && <>
      <Link href={`/safar/mine/${id}/edit`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 font-semibold dark:border-slate-700"><Pencil aria-hidden="true" size={17} />{de ? "Bearbeiten" : "Tahrirlash"}</Link>
      <details className="group relative">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-red-200 px-4 font-semibold text-red-700 marker:hidden dark:border-red-900 dark:text-red-300 [&::-webkit-details-marker]:hidden"><Trash2 aria-hidden="true" size={17} />{de ? "Löschen" : "O‘chirish"}</summary>
        <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <form action={removeAction}>
            <p className="mb-3 text-sm">{de ? "Anzeige wirklich löschen?" : "E’lonni rostdan o‘chirasizmi?"}</p>
            <input type="hidden" name="listingId" value={id} />
            <button disabled={removing} className="min-h-10 rounded-lg border border-red-300 px-3 text-sm font-semibold text-red-700 disabled:opacity-50 dark:border-red-900 dark:text-red-300">{removing ? (de ? "Bitte warten…" : "Kutilmoqda…") : (de ? "Ja, löschen" : "Ha, o‘chirish")}</button>
            {remove.error && <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{remove.error}</p>}
          </form>
        </div>
      </details>
    </>}

    {status !== "draft" && <details className="group relative">
      <summary aria-label={de ? "Weitere Aktionen" : "Boshqa amallar"} title={de ? "Weitere Aktionen" : "Boshqa amallar"} className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-slate-300 px-3 marker:hidden dark:border-slate-700 [&::-webkit-details-marker]:hidden">
        <Ellipsis aria-hidden="true" size={21} />
      </summary>
      <div className="absolute right-0 top-full z-20 mt-2 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        {(status === "draft" || status === "published") && <Link href={`/safar/mine/${id}/edit`} className="flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil aria-hidden="true" size={16} />{de ? "Bearbeiten" : "Tahrirlash"}</Link>}
        {status === "published" && <form action={changeAction} className="mb-1 border-b border-slate-200 pb-2 dark:border-slate-700">
          <input type="hidden" name="listingId" value={id} />
          <input type="hidden" name="operation" value="close" />
          <button disabled={changing} className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 text-left text-sm font-medium hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"><X aria-hidden="true" size={16} />{changing ? (de ? "Bitte warten…" : "Kutilmoqda…") : (de ? "Anzeige schließen" : "E’lonni yopish")}</button>
          {change.error && <p role="alert" className="px-3 text-sm text-red-700">{change.error}</p>}
        </form>}
        <details className="rounded-lg">
          <summary className="flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-lg px-3 text-sm font-medium text-red-700 marker:hidden hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30 [&::-webkit-details-marker]:hidden"><Trash2 aria-hidden="true" size={16} />{de ? "Löschen" : "O‘chirish"}</summary>
          <form action={removeAction} className="border-t border-slate-200 p-3 dark:border-slate-700">
            <p className="mb-3 text-sm">{de ? "Anzeige wirklich löschen?" : "E’lonni rostdan o‘chirasizmi?"}</p>
            <input type="hidden" name="listingId" value={id} />
            <button disabled={removing} className="min-h-10 rounded-lg border border-red-300 px-3 text-sm font-semibold text-red-700 disabled:opacity-50 dark:border-red-900 dark:text-red-300">{removing ? (de ? "Bitte warten…" : "Kutilmoqda…") : (de ? "Ja, löschen" : "Ha, o‘chirish")}</button>
            {remove.error && <p role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">{remove.error}</p>}
          </form>
        </details>
      </div>
    </details>}
  </div>;
}
