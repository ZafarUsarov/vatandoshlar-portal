import type { MarketContact } from "@/lib/market/market-contact";

export default function MarketContactLinks({ contact, title, locale }: { contact: MarketContact; title: string; locale: "uz" | "de" }) {
  const links = [
    contact.telegram ? { label: "Telegram", href: `https://t.me/${contact.telegram.replace(/^@/, "")}` } : null,
    contact.whatsapp ? { label: "WhatsApp", href: `https://wa.me/${contact.whatsapp.slice(1)}` } : null,
    contact.phone ? { label: locale === "de" ? "Anrufen" : "Qo‘ng‘iroq qilish", href: `tel:${contact.phone}` } : null,
    contact.email ? { label: "Email", href: `mailto:${contact.email}?subject=${encodeURIComponent((locale === "de" ? "Anfrage zur Anzeige: " : "E’lon bo‘yicha murojaat: ") + title)}` } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);
  if (!links.length) return null;
  return <section className="mt-10 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
    <h2 className="text-xl font-bold">{locale === "de" ? "Anbieter kontaktieren" : "E’lon egasi bilan bog‘lanish"}</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">{links.map(link => <a key={link.label} href={link.href} target={link.href.startsWith("https:") ? "_blank" : undefined} rel={link.href.startsWith("https:") ? "noopener noreferrer" : undefined} className="flex min-h-12 items-center justify-center rounded-xl border border-emerald-700 px-4 py-3 text-center font-semibold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-slate-800">{link.label}</a>)}</div>
  </section>;
}
