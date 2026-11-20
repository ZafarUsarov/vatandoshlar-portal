"use client";

import { useState } from "react";
import { Check, Share as ShareIcon } from "lucide-react";

type Props = Readonly<{
  title: string;
  locale: "uz" | "de";
}>;

export default function GuideArticleShareButton({ title, locale }: Props) {
  const [copied, setCopied] = useState(false);
  const label = locale === "de" ? "Artikel teilen" : "Maqolani ulaşiş";

  function share() {
    setCopied(false);
    const url = window.location.href;

    if (window.isSecureContext && typeof navigator.share === "function") {
      try {
        const result = navigator.share({
          title,
          text: locale === "de" ? "Ratgeber rund um Deutschland" : "Germaniya böyiça qöllanma",
          url,
        });
        void result.catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          // Native share failures must not open a second copy/share UI.
          console.error("Guide article native share failed", error);
        });
      } catch (error) {
        console.error("Guide article native share failed", error);
      }
      return;
    }

    // Only browsers without native sharing use the clipboard fallback.
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(url)
        .then(() => setCopied(true))
        .catch(() => window.prompt(locale === "de" ? "Link kopieren:" : "Havolani nusxalang:", url));
    } else {
      window.prompt(locale === "de" ? "Link kopieren:" : "Havolani nusxalang:", url);
    }
  }

  return (
    <div className="inline-flex shrink-0 items-center">
      <button
        type="button"
        onClick={share}
        aria-label={label}
        title={label}
        className="inline-flex size-11 shrink-0 items-center justify-center text-slate-500 transition-colors hover:text-emerald-700 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 motion-reduce:transition-none dark:text-slate-400 dark:hover:text-emerald-300"
      >
        {copied ? <Check size={20} aria-hidden="true" /> : <ShareIcon size={20} aria-hidden="true" />}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : ""}
      </span>
    </div>
  );
}
