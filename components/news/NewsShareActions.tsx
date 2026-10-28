"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, Share2 } from "lucide-react";

type Props = { locale: "uz" | "de"; title: string; url: string };
type CopyStatus = "idle" | "success" | "error";

export default function NewsShareActions({ locale, title, url }: Props) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const de = locale === "de";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const channels = [
    { name: "Telegram", icon: "/icons/social/telegram.svg", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
    { name: "WhatsApp", icon: "/icons/social/whatsapp.svg", href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}` },
    { name: "Facebook", icon: "/icons/social/facebook.svg", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];
  const buttonClass = "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition-colors hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-400 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950";

  async function copyLink() {
    setCopyStatus("idle");
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title, url });
    } catch {
      // User cancellation is not a successful copy.
    }
  }

  return (
    <section aria-label={de ? "Artikel teilen" : "Maqolani ulashish"} className="min-w-0">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
        {channels.map((channel) => (
          <a key={channel.name} href={channel.href} target="_blank" rel="noopener noreferrer"
            aria-label={de ? `Auf ${channel.name} teilen` : `${channel.name} orqali ulashish`}
            title={channel.name} className={buttonClass}>
            <Image src={channel.icon} alt="" aria-hidden="true" width={20} height={20} unoptimized className="size-5 object-contain" />
          </a>
        ))}
        <button type="button" onClick={() => void copyLink()}
          aria-label={copyStatus === "success" ? (de ? "Kopiert" : "Nusxalandi") : (de ? "Link kopieren" : "Havolani nusxalash")}
          title={copyStatus === "success" ? (de ? "Kopiert ✓" : "Nusxalandi ✓") : (de ? "Link kopieren" : "Havolani nusxalash")}
          className={buttonClass}>
          {copyStatus === "success" ? <Check size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}

        </button>
        <button type="button" onClick={() => void nativeShare()}
          aria-label={de ? "Artikel teilen" : "Maqolani ulashish"} title={de ? "Artikel teilen" : "Maqolani ulashish"} className={buttonClass}>
          <Share2 size={20} aria-hidden="true" />

        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-1 text-center text-xs text-red-700 dark:text-red-300 sm:text-right">
        {copyStatus === "error" ? (de ? "Kopieren fehlgeschlagen" : "Havolani nusxalab bo‘lmadi") : ""}
      </p>
    </section>
  );
}
