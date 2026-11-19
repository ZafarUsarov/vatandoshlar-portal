import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function MarketHomeEntry() {
  const de = (await getLocale()) === "de";
  const entries = [
    { href: "/savol", title: de ? "Fragen & Antworten" : "Savol-javob", description: de ? "Fragen stellen und Antworten finden" : "Savol bering va javob toping" },
    { href: "/market", title: de ? "Marktplatz" : "Market", description: de ? "Anzeigen entdecken und aufgeben" : "E’lonlarni köring va joylaştiring" },
    { href: "/travel", title: de ? "Reisen" : "Sayohat", description: de ? "Reisen und Reisebegleitung entdecken" : "Safarlar va hamrohlarni toping" },
    { href: "/places", title: de ? "Unternehmen & Organisationen" : "Biznes va taşkilotlar", description: de ? "Restaurants, Praxen, Geschäfte und Dienstleistungen" : "Restoranlar, klinikalar, dökonlar va xizmatlar" },
  ];
  return (
    <section aria-labelledby="ecosystem-services-title" className="bg-[#f7f7f7] px-[clamp(16px,3.3vw,112px)] py-[clamp(24px,3vw,56px)] text-[#202020] dark:bg-[var(--uzde-home-bg)] dark:text-zinc-100">
      <div className="mb-8 border-b border-zinc-300 pb-5 dark:border-zinc-700">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">{de ? "UZDE / COMMUNITY" : "UZDE / PLATFORMALAR"}</p>
        <h2 id="ecosystem-services-title" className="mt-5 w-full text-center text-[clamp(25px,4.5vw,76px)] font-semibold leading-[1.08] tracking-[-0.01em] [word-spacing:0.12em]">{de ? "EINE COMMUNITY. VIELE MÖGLICHKEITEN." : "BIR HAMJAMIYAT. KÖPLAB IMKONIYATLAR."}</h2>
        <p className="mx-auto mt-5 max-w-[65ch] text-center text-base leading-7 text-zinc-600 dark:text-zinc-400">{de ? "Entdecken Sie digitale Plattformen, die Usbekinnen und Usbeken in Deutschland verbinden." : "Germaniyadagi özbekistonliklarni boǵlovçi raqamli platformalarni kaşf eting."}</p>
      </div>
      <div className="grid gap-x-[clamp(16px,2.5vw,48px)] gap-y-0 sm:grid-cols-2 xl:grid-cols-4">
        {entries.map((entry, index) => (
          <Link key={entry.href} href={entry.href} className="group flex min-w-0 flex-col border-t border-zinc-300 py-4 sm:py-5 transition-colors hover:border-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:border-zinc-700">
            <span className="mb-3 text-xs tracking-[0.15em] text-zinc-500">{String(index + 1).padStart(2, "0")}</span>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[clamp(21px,1.8vw,32px)] font-semibold leading-tight tracking-[-0.035em]">{entry.title}</h3>
              <span aria-hidden="true" className="text-xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </div>
            <p className="mt-2 max-w-[38ch] text-sm leading-6 text-zinc-600 dark:text-zinc-400">{entry.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
