"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function CompanionShareButton({ title, de }: { title: string; de: boolean }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const successful = document.execCommand("copy");
      input.remove();
      if (!successful) return;
    }
    setCopied(true);
  }

  return <button type="button" onClick={share} className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950" aria-live="polite">
    {copied ? <Check size={16} aria-hidden="true"/> : <Share2 size={16} aria-hidden="true"/>}
    {copied ? (de ? "Link kopiert" : "Havola nusxalandi") : (de ? "Teilen" : "Ulashish")}
  </button>;
}
