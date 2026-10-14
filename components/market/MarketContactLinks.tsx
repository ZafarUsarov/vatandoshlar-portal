import MarketDetailIcon from "./MarketDetailIcon";
import type { MarketContact } from "@/lib/market/market-contact";

export default function MarketContactLinks({ contact, title, locale }: { contact: MarketContact; title: string; locale: "uz" | "de" }) {
  const links = [
    contact.telegram ? { label: "Telegram", href: `https://t.me/${contact.telegram.replace(/^@/, "")}` } : null,
    contact.whatsapp ? { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp.slice(1)}` } : null,
    contact.phone ? { label: locale === "de" ? "Anrufen" : "Qo‘ng‘iroq qilish", href: `tel:${contact.phone}` } : null,
    contact.email ? { label: "Email", href: `mailto:${contact.email}?subject=${encodeURIComponent((locale === "de" ? "Anfrage zur Anzeige: " : "E’lon bo‘yicha murojaat: ") + title)}` } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);
  if (!links.length) return null;
  return <section className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
    <h2 className="flex items-center gap-2 text-lg font-bold"><MarketDetailIcon name="message" className="h-5 w-5 text-emerald-700" />{locale === "de" ? "Anbieter kontaktieren" : "E’lon egasi bilan bog‘lanish"}</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">{links.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("https:") ? "_blank" : undefined} rel={link.href.startsWith("https:") ? "noopener noreferrer" : undefined} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-4 py-3 text-center font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-slate-800"><MarketDetailIcon name={link.label === "Email" ? "mail" : link.label === "Telegram" || link.label === "WhatsApp" ? "message" : "phone"} className="h-5 w-5" />{link.label}</a>)}</div>
  </section>;
}
