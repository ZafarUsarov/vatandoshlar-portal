"use client";

import { useState } from "react";
import MarketDetailIcon from "./MarketDetailIcon";

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
  return <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="share" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Anzeige teilen" : "E’lonni ulashish"}</h2>
    <button type="button" aria-expanded={open} onClick={() => setOpen(v => !v)} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 font-semibold hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
      <MarketDetailIcon name="share" className="h-4 w-4" />{open ? (locale === "de" ? "Optionen schließen" : "Variantlarni yopish") : (locale === "de" ? "Teilen auswählen" : "Ulashish usulini tanlash")}
    </button>
    {open && <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
      {channels.map(channel => <a key={channel.label} href={channel.href} target={channel.href.startsWith("https") ? "_blank" : undefined} rel={channel.href.startsWith("https") ? "noopener noreferrer" : undefined} className="flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 font-medium shadow-sm hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"><span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${channel.label === "Telegram" ? "bg-sky-500" : channel.label === "WhatsApp" ? "bg-green-500" : "bg-slate-600"}`}><MarketDetailIcon name={channel.label === "Telegram" ? "send" : channel.label === "WhatsApp" ? "whatsapp" : "mail"} className="h-4 w-4 text-white" /></span>{channel.label}</a>)}
      <button type="button" onClick={instagram} className="flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 font-medium shadow-sm hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 text-white"><MarketDetailIcon name="instagram" className="h-4 w-4" /></span>Instagram</button>
      <button type="button" onClick={copy} className="col-span-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-3 text-center font-semibold text-emerald-700 dark:text-emerald-300"><MarketDetailIcon name="link" className="h-4 w-4 shrink-0" /> {copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : (locale === "de" ? "Link kopieren" : "Havolani nusxalash")}</button>
    </div>}
  </div>;
}
