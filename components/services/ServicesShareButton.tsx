"use client";

import { useState } from "react";
import { Share as ShareIcon, Check, Copy } from "lucide-react";

type Props = Readonly<{ locale: "uz" | "de" }>;

export default function ServicesShareButton({ locale }: Props) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const de = locale === "de";

  function share() {
    const url = window.location.href.split("#")[0];
    if (window.isSecureContext && typeof navigator.share === "function") {
      // Invoke during the original click; do not await any preceding operation.
      try {
        void navigator.share({
          title: de ? "UzDe — Dienstleistungen" : "UzDe — Xizmatlar",
          text: de ? "Dienstleistungen bei UzDe" : "UzDe xizmatlari",
          url,
        }).catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError") return;
          // A native share failure must not open a copy panel.
        });
      } catch {
        // Do not silently switch to clipboard when native sharing is supported.
      }
      return;
    }

    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setCopyFailed(false);
      }).catch(() => setCopyFailed(true));
    } else {
      setCopyFailed(true);
    }
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" onClick={share}
        aria-label={de ? "Seite teilen" : "Sahifani ulaşiş"}
        title={de ? "Teilen" : "Ulaşiş"}
        className="inline-flex size-11 items-center justify-center rounded-full text-zinc-600 transition-colors hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:text-zinc-300 dark:hover:text-teal-300">
        <ShareIcon size={20} aria-hidden="true" />
      </button>
      {copied && <span role="status" className="inline-flex items-center gap-1 text-xs text-teal-700 dark:text-teal-300"><Check size={14} />{de ? "Kopiert" : "Nusxalandi"}</span>}
      {copyFailed && <button type="button" onClick={() => window.prompt(de ? "Link kopieren:" : "Havolani nusxalang:", window.location.href.split("#")[0])} className="inline-flex items-center gap-1 text-xs underline underline-offset-2"><Copy size={14} />{de ? "Link kopieren" : "Nusxalaş"}</button>}
    </div>
  );
}
