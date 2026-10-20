"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type Props = { locale: "uz" | "de"; title: string; url: string };





export default function NewsShareActions({ locale, title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const de = locale === "de";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const channels = [
    { name: "Telegram", icon: <Image src="/icons/social/telegram.svg" alt="" aria-hidden="true" className="h-5 w-5 object-contain" width={20} height={20} unoptimized />, href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}` },
    { name: "WhatsApp", icon: <Image src="/icons/social/whatsapp.svg" alt="" aria-hidden="true" className="h-5 w-5 object-contain" width={20} height={20} unoptimized />, href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}` },
    { name: "Facebook", icon: <Image src="/icons/social/facebook.svg" alt="" aria-hidden="true" className="h-5 w-5 object-contain" width={20} height={20} unoptimized />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setCopied(true); }
    catch { setCopied(false); }
  }
  async function nativeShare() {
    if (!navigator.share) { await copyLink(); return; }
    try { await navigator.share({ title, url }); } catch { /* cancelled */ }
  }
  return (
    <section aria-label={de ? "Artikel teilen" : "Maqolani ulashish"} className="mt-0">
      <div className="flex flex-wrap items-center gap-2.5">
        {channels.map((channel) => (
          <a key={channel.name} href={channel.href} target="_blank" rel="noopener noreferrer"
            aria-label={channel.name} title={channel.name}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-800 transition hover:border-slate-300 hover:shadow-sm sm:px-3 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <span className="flex size-6 shrink-0 items-center justify-center">{channel.icon}</span><span>{channel.name}</span>
          </a>
        ))}
        <button type="button" onClick={() => void copyLink()} title={de ? "Link kopieren" : "Havolani nusxalash"}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 sm:text-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          {copied ? <Check size={16} /> : <Image src="/icons/social/copy.svg" alt="" width={24} height={24} unoptimized />}
          <span>{copied ? (de ? "Kopiert" : "Nusxalandi") : (de ? "Link" : "Nusxa")}</span>
        </button>
        <button type="button" onClick={() => void nativeShare()}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:text-sm dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
          <Image src="/icons/social/share.svg" alt="" aria-hidden="true" className="h-4 w-4 object-contain" width={20} height={20} unoptimized />{de ? "Teilen" : "Ulashish"}
        </button>
      </div>
    </section>
  );
}
