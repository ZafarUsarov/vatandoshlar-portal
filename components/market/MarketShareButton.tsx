"use client";

import { useState } from "react";

export default function MarketShareButton({ locale, title }: { locale: "uz" | "de"; title: string }) {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      // Clipboard may be unavailable on insecure origins; allow manual copying.
      window.prompt(locale === "de" ? "Link kopieren:" : "Havolani nusxalang:", url);
    }
  }
  return <button type="button" onClick={share} className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">{copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : (locale === "de" ? "Anzeige teilen" : "E’lonni ulashish")}</button>;
}
