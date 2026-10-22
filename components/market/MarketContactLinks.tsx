import { MessageCircleMore } from "lucide-react";
import StartConversationButton from "@/components/messaging/StartConversationButton";
import MarketDetailIcon from "./MarketDetailIcon";
import type { MarketContact } from "@/lib/market/market-contact";

type Props = {
  contact: MarketContact;
  title: string;
  locale: "uz" | "de";
  messaging?: { listingId: string };
};

export default function MarketContactLinks({ contact, title, locale, messaging }: Props) {
  const links = [
    contact.telegram ? { label: "Telegram", icon: "send" as const, href: `https://t.me/${contact.telegram.replace(/^@/, "")}` } : null,
    contact.whatsapp ? { label: "WhatsApp", icon: "whatsapp" as const, href: `https://wa.me/${contact.whatsapp.slice(1)}` } : null,
    contact.phone ? { label: locale === "de" ? "Anrufen" : "Qo‘ng‘iroq qilish", icon: "phone" as const, href: `tel:${contact.phone}` } : null,
    contact.email ? { label: "Email", icon: "mail" as const, href: `mailto:${contact.email}?subject=${encodeURIComponent((locale === "de" ? "Anfrage zur Anzeige: " : "E’lon bo‘yicha murojaat: ") + title)}` } : null,
  ].filter((link): link is NonNullable<typeof link> => link !== null);
  if (!links.length && !messaging) return null;
  return <section className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-emerald-50/40 p-5 shadow-sm ring-1 ring-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800">
    <h2 className="flex items-center gap-2 text-lg font-bold"><MessageCircleMore aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-700" />{locale === "de" ? "Anbieter kontaktieren" : "E’lon egasi bilan bog‘lanish"}</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2">{messaging && <StartConversationButton kind="market" listingId={messaging.listingId} de={locale === "de"} fullWidth />}</div>
      {links.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("https:") ? "_blank" : undefined} rel={link.href.startsWith("https:") ? "noopener noreferrer" : undefined} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-4 py-3 text-center font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-slate-800"><MarketDetailIcon name={link.icon} className={`h-5 w-5 ${link.icon === "send" ? "text-sky-500" : link.icon === "whatsapp" ? "text-green-600" : "text-emerald-700"}`} />{link.label}</a>)}
    </div>
  </section>;
}
