"use client";

import { useState } from "react";

type Props = { locale: "uz" | "de"; title: string };
export default function MarketShareButton({ locale, title }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? "" : window.location.href;
  const shareText = `${title} — ${url}`;
  const channels = [
    { label: "Telegram", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: "Email", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}` },
  ];
  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); }
    catch { window.prompt(locale === "de" ? "Link kopieren:" : "Havolani nusxalang:", url); }
  }
  async function instagram() {
    // Instagram has no general web URL for sharing an arbitrary listing link.
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch { /* User cancelled. */ }
    } else await copy();
  }
  return <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
    <button type="button" aria-expanded={open} onClick={() => setOpen(v => !v)} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 font-semibold hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
      <span aria-hidden="true">↗</span>{locale === "de" ? "Anzeige teilen" : "E’lonni ulashish"}
    </button>
    {open && <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
      {channels.map(channel => <a key={channel.label} href={channel.href} target={channel.href.startsWith("https") ? "_blank" : undefined} rel={channel.href.startsWith("https") ? "noopener noreferrer" : undefined} className="flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-2 font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">{channel.label}</a>)}
      <button type="button" onClick={instagram} className="min-h-11 rounded-xl border border-slate-200 px-2 font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">Instagram</button>
      <button type="button" onClick={copy} className="col-span-2 min-h-11 rounded-xl border border-emerald-600 px-2 font-semibold text-emerald-700 dark:text-emerald-300">{copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : (locale === "de" ? "Link kopieren" : "Havolani nusxalash")}</button>
    </div>}
  </div>;
}
