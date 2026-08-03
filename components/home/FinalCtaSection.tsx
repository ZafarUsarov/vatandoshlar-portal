import { getTranslations } from "next-intl/server";

import { Link } from "../../i18n/navigation";
import Reveal from "../Reveal";

export default async function FinalCtaSection() {
  const t = await getTranslations("Home.finalCta");

  return (
    <Reveal>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-400">
                {t("badge")}
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t("title")}
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                {t("description")}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/telegram"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-7 py-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t("telegramButton")}
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {t("eventsButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}