import { MapPin, ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function PlacesHomeEntry() {
  const isGerman = (await getLocale()) === "de";
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8" aria-label={isGerman ? "Orte" : "Joylar"}>
      <Link
        href="/places"
        className="group flex flex-col gap-4 rounded-3xl border border-emerald-200/70 bg-emerald-50/60 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-emerald-500/20 dark:bg-emerald-500/5 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm dark:bg-slate-900 dark:text-emerald-300">
            <MapPin aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">{isGerman ? "Orte entdecken" : "Joylarni kashf eting"}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {isGerman ? "Unternehmen, Bildungszentren und Organisationen der Community finden." : "Vatandoshlar bizneslari, ta’lim markazlari va tashkilotlarini toping."}
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-emerald-800 dark:text-emerald-300 sm:self-auto">
          {isGerman ? "Alle Orte" : "Barcha joylar"}
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </section>
  );
}
