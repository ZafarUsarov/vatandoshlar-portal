import { getLocale } from "next-intl/server";
import {
  ArrowRight,
  MapPin,
  MessageCircleQuestion,
  Plane,
  ShoppingBag,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function MarketHomeEntry() {
  const de = (await getLocale()) === "de";

  const entries = [
    {
      href: "/savol" as const,
      icon: MessageCircleQuestion,
      title: de ? "Fragen & Antworten" : "Savol-javob",
      description: de
        ? "Fragen stellen und Antworten finden"
        : "Savol bering va javob toping",
      color: "emerald",
      available: true,
    },
    {
      href: "/market" as const,
      icon: ShoppingBag,
      title: de ? "Marktplatz" : "Market",
      description: de
        ? "Anzeigen entdecken und aufgeben"
        : "E’lonlarni ko‘ring va joylashtiring",
      color: "amber",
      available: true,
    },
    {
      href: "/travel" as const,
      icon: Plane,
      title: de ? "Reisen" : "Sayohat",
      description: de
        ? "Reisen und Reisebegleitung entdecken"
        : "Safarlar va hamrohlarni toping",
      color: "blue",
      available: true,
    },
    {
      href: "/places" as const,
      icon: MapPin,
      title: de ? "Unternehmen & Organisationen" : "Biznes va tashkilotlar",
      description: de
        ? "Restaurants, Praxen, Geschäfte und Dienstleistungen"
        : "Restoranlar, klinikalar, do‘konlar va xizmatlar",
      color: "violet",
      available: true,
    },
  ];

  const styles: Record<string, string> = {
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    blue:
      "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  };

  const cardClass =
    "group flex min-h-[165px] flex-col items-center rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-3 text-center transition-colors dark:border-slate-800 dark:bg-slate-900 sm:min-h-[175px] sm:px-5 min-[2560px]:min-h-[210px] min-[2560px]:px-8 min-[2560px]:py-6";

  return (
    <section
      aria-labelledby="ecosystem-services-title"
      className="mx-auto max-w-7xl min-[1921px]:max-w-[1680px] min-[2560px]:max-w-[2200px] px-5 pt-8 pb-3 sm:px-8 sm:pt-10 sm:pb-4"
    >
      <h2
        id="ecosystem-services-title"
        className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl min-[2560px]:text-4xl"
      >
        {de ? "Unsere Angebote" : "Vatandoshlar xizmatlari"}
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {entries.map((entry) => {
          const Icon = entry.icon;

          const content = (
            <>
              <span
                aria-hidden="true"
                className={`flex size-14 shrink-0 items-center justify-center rounded-full ${styles[entry.color]}`}
              >
                <Icon size={28} strokeWidth={2.2} />
              </span>

              <span className="mt-2 text-base font-bold text-slate-950 dark:text-white">
                {entry.title}
              </span>

              <span className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-sm">
                {entry.description}
              </span>

              <span
                className={`mt-auto flex min-h-6 items-center justify-center pt-1 ${
                  entry.available
                    ? styles[entry.color].split(" ").filter((c) => c.startsWith("text-") || c.startsWith("dark:text-")).join(" ")
                    : "text-emerald-700 dark:text-emerald-400"
                }`}
              >
                {entry.available ? (
                  <ArrowRight aria-hidden="true" size={22} strokeWidth={2.2} />
                ) : (
                  <span className="text-xs font-semibold">
                    {de ? "Demnächst" : "Tez kunda"}
                  </span>
                )}
              </span>
            </>
          );

          if (!entry.available) {
            return (
              <div key={entry.href} className={`${cardClass} opacity-80`}>
                {content}
              </div>
            );
          }

          return (
            <Link
              key={entry.href}
              href={entry.href}
              className={`${cardClass} hover:border-emerald-300 hover:bg-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-emerald-600 dark:hover:bg-slate-800`}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
