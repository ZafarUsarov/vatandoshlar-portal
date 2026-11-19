"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Props = Readonly<{ title: string; locale: "uz" | "de" }>;

export default function HomeNativeShareButton({ title, locale }: Props) {
  const de = locale === "de";
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyUrl(url: string) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setManualCopy(false);
    } catch {
      setCopied(false);
      setManualCopy(true);
    }
  }

  async function handleShare() {
    const url = window.location.href.split("#")[0];
    const data: ShareData = {
      title,
      text: de
        ? "UzDe – die Plattform für Usbeken in Deutschland."
        : "UzDe – Germaniyadagi özbekistonliklar uchun platforma.",
      url,
    };
    setFallbackUrl("");
    setManualCopy(false);
    setCopied(false);

    // Must be invoked in the click's user-activation context, before any await.
    if (typeof navigator.share === "function" &&
        (typeof navigator.canShare !== "function" || navigator.canShare(data))) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    setFallbackUrl(url);
    await copyUrl(url);
  }

  return (
    <div className="min-w-0">
      <button
        type="button"
        onClick={() => void handleShare()}
        className="inline-flex min-h-11 items-center gap-6 border-b border-current pb-2 text-base font-semibold text-zinc-950 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current dark:text-white"
      >
        {de ? "Teilen" : "Ulaşiş"} <span aria-hidden="true">↗</span>
      </button>
      {fallbackUrl && (
        <div className="mt-3 max-w-full space-y-2 text-sm" aria-live="polite">
          <p className="text-zinc-600 dark:text-zinc-300">
            {copied
              ? (de ? "Link kopiert." : "Havola nusxalandi.")
              : manualCopy
                ? (de ? "Link manuell kopieren:" : "Havolani qölda nusxalang:")
                : (de ? "Link teilen:" : "Havolani ulashing:")}
          </p>
          {manualCopy ? (
            <input
              aria-label={de ? "Link zum Kopieren" : "Nusxalaş uchun havola"}
              readOnly
              onFocus={(event) => event.currentTarget.select()}
              value={fallbackUrl}
              className="w-full max-w-[min(22rem,calc(100vw-2rem))] rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-600"
            />
          ) : (
            <button
              type="button"
              onClick={() => void copyUrl(fallbackUrl)}
              className="inline-flex min-h-10 items-center gap-2 underline underline-offset-4"
            >
              {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
              {de ? "Link kopieren" : "Havolani nusxalaş"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
