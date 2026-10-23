"use client";

import Image from "next/image";
import { useState } from "react";
import MarketDetailIcon from "./MarketDetailIcon";

type Props = { locale: "uz" | "de"; title: string };
export default function MarketShareButton({ locale, title }: Props) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? "" : window.location.href;
  const shareText = `${title} — ${url}`;
  const channels = [
    { label: "Telegram", icon: "/icons/social/telegram.svg", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "WhatsApp", icon: "/icons/social/whatsapp.svg", href: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
    { label: "Email", icon: "/icons/social/email.svg", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}` },
  ];
  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); }
    catch { window.prompt(locale === "de" ? "Link kopieren:" : "Havolani nusxalang:", url); }
  }
  return <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
    <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="share" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Anzeige teilen" : "E’lonni ulashish"}</h2>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {channels.map(channel => <a
        key={channel.label}
        href={channel.href}
        target={channel.href.startsWith("https") ? "_blank" : undefined}
        rel={channel.href.startsWith("https") ? "noopener noreferrer" : undefined}
        className="flex min-w-0 min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-1.5 py-2 text-center font-medium shadow-sm hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"
      >
        {channel.label === "Email"
          ? <MarketDetailIcon name="mail" className="h-5 w-5 text-sky-600" />
          : <Image src={channel.icon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
        }
        <span className="max-w-full truncate text-[11px] leading-tight">{channel.label}</span>
      </a>)}
      <button type="button" onClick={copy} className="col-span-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-3 text-center font-semibold text-emerald-700 dark:text-emerald-300"><MarketDetailIcon name="link" className="h-4 w-4 shrink-0" /> {copied ? (locale === "de" ? "Link kopiert" : "Havola nusxalandi") : (locale === "de" ? "Link kopieren" : "Havolani nusxalash")}</button>
    </div>
  </div>;
}
