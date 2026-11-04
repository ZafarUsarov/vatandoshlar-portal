"use client";

import { useState } from "react";
import { Check, Copy, Share, Share2 } from "lucide-react";

type Props = Readonly<{
  title: string;
  locale: "uz" | "de";
  variant?: "light" | "dark";
  iconOnly?: boolean;
}>;

export default function ShareButton({ title, locale, variant = "light", iconOnly = false }: Props) {
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const de = locale === "de";
  const label = de ? "Teilen" : "Ulashish";
  const url = typeof window === "undefined" ? "" : window.location.href.split("#")[0];
  const buttonClass = iconOnly
    ? "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    : variant === "dark"
    ? "inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
    : "inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800";

  async function share() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url: window.location.href.split("#")[0] });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    setShowFallback((previous) => !previous);
  }

  async function copy() {
    const currentUrl = window.location.href.split("#")[0];
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
    } catch {
      window.prompt(de ? "Link kopieren:" : "Havolani nusxalang:", currentUrl);
    }
  }

  return (
    <div className="relative inline-flex shrink-0 items-center">
      <button type="button" onClick={() => void share()} className={buttonClass} aria-expanded={showFallback} aria-label={iconOnly ? (de ? "Profil teilen" : "Profilni ulashish") : label} title={iconOnly ? (de ? "Profil teilen" : "Profilni ulashish") : label}>
        {iconOnly ? <Share size={20} aria-hidden="true" /> : <Share2 size={17} aria-hidden="true" />} {!iconOnly && label}
      </button>
      {showFallback && (
        <div className="absolute right-0 top-full z-50 mt-2 flex w-[min(18rem,calc(100vw-2rem))] flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <a className="rounded-lg px-3 py-2 text-slate-900 underline-offset-2 hover:underline dark:text-white" href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">Telegram</a>
          <a className="rounded-lg px-3 py-2 text-slate-900 underline-offset-2 hover:underline dark:text-white" href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <button type="button" onClick={() => void copy()} className="inline-flex min-h-10 items-center gap-1 rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800">
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {copied ? (de ? "Kopiert" : "Nusxalandi") : (de ? "Link kopieren" : "Havolani nusxalash")}
          </button>
        </div>
      )}
    </div>
  );
}
