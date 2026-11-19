"use client";

import { useState } from "react";
import { Share } from "lucide-react";

type Props = { locale: "uz" | "de"; title: string; url: string };
type CopyStatus = "idle" | "success" | "error";

export default function NewsShareActions({ locale, title }: Props) {
  const de = locale === "de";
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  function shareArticle() {
    setCopyStatus("idle");
    const shareUrl = window.location.href;

    if (window.isSecureContext && typeof navigator.share === "function") {
      // Call synchronously during the click event to retain user activation.
      const nativeShare = navigator.share({
        title: document.title,
        text: title,
        url: shareUrl,
      });
      void nativeShare.catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCopyStatus("error");
      });
      return;
    }

    void (async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(shareUrl);
        setCopyStatus("success");
      } catch {
        setCopyStatus("error");
      }
    })();
  }

  return (
    <section aria-label={de ? "Artikel teilen" : "Maqolani ulasiş"} className="min-w-0">
      <div className="relative flex justify-end">
        <button
          type="button"
          onClick={() => void shareArticle()}
          aria-label={de ? "Artikel teilen" : "Maqolani ulasiş"}
          title={de ? "Artikel teilen" : "Maqolani ulasiş"}
          className="inline-flex size-9 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Share size={19} strokeWidth={1.8} aria-hidden="true" />
        </button>
        {copyStatus !== "idle" && (
          <span role="status" aria-live="polite" className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs text-white shadow-sm dark:bg-slate-700">
            {copyStatus === "success"
              ? de ? "Link kopiert" : "Havola nusxalandi"
              : de ? "Kopieren fehlgeschlagen" : "Havolani nusxalab bölmadi"}
          </span>
        )}
      </div>
    </section>
  );
}
