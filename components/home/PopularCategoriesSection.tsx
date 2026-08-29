import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type IconProps = Readonly<{
  className?: string;
}>;

type SupportedHomeLocale = "uz" | "de";

function ServicesIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M14.25 6.25a4.5 4.5 0 0 0-5.9 5.9L3.5 17a2.12 2.12 0 0 0 3 3l4.85-4.85a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-2.5-.5-.5-2.5 2.6-2.6Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpecialistsIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="8.25" cy="8" r="3.25" />
      <path
        d="M2.75 19.25v-1.5A4.75 4.75 0 0 1 7.5 13H9a4.75 4.75 0 0 1 4.75 4.75v1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 7a2.75 2.75 0 1 1 0 5.5M16 14h.5a4.75 4.75 0 0 1 4.75 4.75v.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function PopularCategoriesSection() {
  const locale =
    (await getLocale()) as SupportedHomeLocale;

  const copy =
    locale === "uz"
      ? {
          badge: "Yordam toping",
          title:
            "Kerakli yordamga ortiqcha qidiruvsiz yetib boring",
          description:
            "Rasmiy xizmat yo‘nalishini tekshiring yoki sizga mos o‘zbek mutaxassisini toping. Ikki yo‘l — bitta aniq boshlanish nuqtasi.",
          services: {
            eyebrow: "Rasmiy yo‘nalishlar",
            title: "Xizmatlar",
            description:
              "Tarjima, huquq, soliq, tibbiyot va boshqa xizmatlar uchun qayerdan izlash va qanday tekshirish kerakligini ko‘ring.",
            action: "Xizmatlarni ko‘rish",
          },
          specialists: {
            eyebrow: "Professional yordam",
            title: "Mutaxassislar",
            description:
              "Shifokor, yurist, IT va boshqa yo‘nalishlarda e’lon qilingan o‘zbek mutaxassislarini bir joydan toping.",
            action: "Mutaxassislarni ko‘rish",
          },
        }
      : {
          badge: "Hilfe finden",
          title:
            "Schnell zur passenden Unterstützung",
          description:
            "Prüfen Sie offizielle Dienstleistungswege oder finden Sie passende usbekische Fachkräfte. Zwei klare Wege, ein einfacher Einstieg.",
          services: {
            eyebrow: "Offizielle Anlaufstellen",
            title: "Dienstleistungen",
            description:
              "Sehen Sie für Übersetzung, Recht, Steuern, Medizin und weitere Bereiche, wo Sie suchen und Anbieter prüfen können.",
            action: "Dienstleistungen ansehen",
          },
          specialists: {
            eyebrow: "Professionelle Unterstützung",
            title: "Fachkräfte",
            description:
              "Finden Sie veröffentlichte usbekische Fachkräfte aus Medizin, Recht, IT und weiteren Bereichen an einem Ort.",
            action: "Fachkräfte ansehen",
          },
        };

  return (
    <section
      id="popular-categories"
      aria-labelledby="help-discovery-heading"
      className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24 dark:border-slate-800 dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(59,130,246,0.10),transparent_26%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            <span className="size-2 rounded-full bg-emerald-500" />
            {copy.badge}
          </div>

          <h2
            id="help-discovery-heading"
            className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
          >
            {copy.title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 sm:mt-12">
          <Link
            href="/services"
            className="group relative overflow-hidden rounded-[2rem] border border-blue-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:border-blue-400/15 dark:bg-white/[0.045] dark:hover:border-blue-400/30 dark:focus-visible:ring-offset-slate-950 sm:p-7"
          >
            <div
              aria-hidden="true"
              className="absolute -right-14 -top-14 size-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/15"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
                  <ServicesIcon className="size-6" />
                </span>

                <span className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition group-hover:border-blue-200 group-hover:text-blue-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:group-hover:border-blue-400/20 dark:group-hover:text-blue-300">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">
                {copy.services.eyebrow}
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                {copy.services.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                {copy.services.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300">
                {copy.services.action}
                <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>

          <Link
            href="/specialists"
            className="group relative overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:border-emerald-400/15 dark:bg-white/[0.045] dark:hover:border-emerald-400/30 dark:focus-visible:ring-offset-slate-950 sm:p-7"
          >
            <div
              aria-hidden="true"
              className="absolute -right-14 -top-14 size-40 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:bg-emerald-500/15"
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <SpecialistsIcon className="size-6" />
                </span>

                <span className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition group-hover:border-emerald-200 group-hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:group-hover:border-emerald-400/20 dark:group-hover:text-emerald-300">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                {copy.specialists.eyebrow}
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                {copy.specialists.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7">
                {copy.specialists.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                {copy.specialists.action}
                <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
