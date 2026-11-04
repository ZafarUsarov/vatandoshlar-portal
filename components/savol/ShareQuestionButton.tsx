"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Link2, Mail, Share2 } from "lucide-react";

export default function ShareQuestionButton({ locale }: { locale: "uz" | "de" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? "" : window.location.href.split("#")[0];
  const title = typeof document === "undefined" ? "" : document.title;
  const shareText = `${title} — ${url}`;
  const channels = [
    { label: "Telegram", icon: "/icons/social/telegram.svg", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "WhatsApp", icon: "/icons/social/whatsapp.svg", href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: "Email", icon: "/icons/social/email.svg", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt(locale === "de" ? "Link kopieren:" : "Havolani nusxalang:", url);
    }
  }

  return (
    <div className="relative inline-block">
      <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="savol-share-options" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-slate-800">
        <Share2 size={16} aria-hidden="true" /> {locale === "de" ? "Teilen" : "Ulashish"}
      </button>
      {open && (
        <div id="savol-share-options" className="absolute right-0 top-full z-30 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <p className="mb-3 text-sm font-bold">{locale === "de" ? "Frage teilen" : "Savolni ulashish"}</p>
          <div className="grid grid-cols-4 justify-items-center gap-2">
            {channels.map(channel => (
              <a key={channel.label} href={channel.href} target={channel.href.startsWith("https") ? "_blank" : undefined} rel={channel.href.startsWith("https") ? "noopener noreferrer" : undefined} aria-label={channel.label} title={channel.label} className={`flex size-12 shrink-0 items-center justify-center rounded-full border transition-colors ${channel.label === "Telegram" ? "border-sky-400 hover:bg-sky-50 dark:border-sky-500 dark:hover:bg-sky-950/30" : channel.label === "WhatsApp" ? "border-green-500 hover:bg-green-50 dark:border-green-500 dark:hover:bg-green-950/30" : "border-blue-400 hover:bg-blue-50 dark:border-blue-500 dark:hover:bg-blue-950/30"}`}>
                {channel.label === "Email" ? <Mail size={20} className="text-sky-600" aria-hidden="true" /> : <Image src={channel.icon} alt="" width={20} height={20} className="size-5 object-contain" />}
              </a>
            ))}
            <button type="button" onClick={() => void copy()} aria-label={copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : (locale === "de" ? "Link kopieren" : "Havolani nusxalash")} title={copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : (locale === "de" ? "Link kopieren" : "Havolani nusxalash")} className="flex size-12 shrink-0 items-center justify-center rounded-full border border-emerald-600 text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/30">
              {copied ? <Check size={20} aria-hidden="true" /> : <Link2 size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
