import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";

type IconProps = Readonly<{
  className?: string;
}>;

type SupportedHomeLocale = "uz" | "de";



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
            "Kerakli yordamga ortiqça qidiruvsiz yetib boring",
          description:
            "Rasmiy xizmat yönalişini tekşiring yoki sizga mos özbek mutaxassisini toping. Ikki yöl — bitta aniq boşlaniş nuqtasi.",
          services: {
            eyebrow: "Rasmiy yönalişlar",
            title: "Xizmatlar",
            description:
              "Tarjima, huquq, soliq, tibbiyot va boşqa xizmatlar uçun qayerdan izlaş va qanday tekşiriş kerakligini köring.",
            action: "Xizmatlarni köriş",
          },
          specialists: {
            eyebrow: "Professional yordam",
            title: "Mutaxassislar",
            description:
              "Şifokor, yurist, IT va boşqa yönalişlarda e’lon qilingan özbek mutaxassislarini bir joydan toping.",
            action: "Mutaxassislarni köriş",
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
      className="border-b border-[#DADADA] bg-[#F7F7F7] py-10 text-[#202020] sm:py-14 lg:py-16 dark:border-[var(--uzde-home-border)] dark:bg-[var(--uzde-home-surface)] dark:text-white"
    >
      <div className="w-full px-[clamp(16px,3.5vw,96px)]">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#686868] dark:text-slate-400">
            {copy.badge}
          </p>
          <h2
            id="help-discovery-heading"
            className="mt-5 text-balance text-[clamp(1.5rem,4vw,4.75rem)] font-semibold uppercase leading-[1.08] tracking-[-0.01em] [word-spacing:0.08em]"
          >
            {copy.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#686868] sm:text-lg dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="mt-10 grid border-t border-[#DADADA] md:grid-cols-2 dark:border-slate-700 sm:mt-12">
          <Link
            href="/services"
            className="group flex min-w-0 flex-col border-b border-[#DADADA] py-7 transition-colors hover:bg-black/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-inset md:border-r md:pr-8 dark:border-slate-700 dark:hover:bg-white/[0.04] lg:py-10 lg:pr-12"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium tabular-nums text-[#686868] dark:text-slate-400">01 / {copy.services.eyebrow}</span>
              <ArrowUpRightIcon className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="mt-8 flex items-center gap-3">
                            <h3 className="text-[clamp(1.6rem,2.8vw,3rem)] font-semibold leading-tight tracking-[-0.04em]">{copy.services.title}</h3>
            </div>
            <p className="mt-4 max-w-lg flex-1 text-sm leading-7 text-[#686868] sm:text-base dark:text-slate-400">
              {copy.services.description}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
              {copy.services.action}
              <ArrowUpRightIcon className="size-4" />
            </span>
          </Link>

          <Link
            href="/specialists"
            className="group flex min-w-0 flex-col border-b border-[#DADADA] py-7 transition-colors hover:bg-black/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-inset md:pl-8 dark:border-slate-700 dark:hover:bg-white/[0.04] lg:py-10 lg:pl-12"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium tabular-nums text-[#686868] dark:text-slate-400">02 / {copy.specialists.eyebrow}</span>
              <ArrowUpRightIcon className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="mt-8 flex items-center gap-3">
                            <h3 className="text-[clamp(1.6rem,2.8vw,3rem)] font-semibold leading-tight tracking-[-0.04em]">{copy.specialists.title}</h3>
            </div>
            <p className="mt-4 max-w-lg flex-1 text-sm leading-7 text-[#686868] sm:text-base dark:text-slate-400">
              {copy.specialists.description}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 group-hover:underline">
              {copy.specialists.action}
              <ArrowUpRightIcon className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
