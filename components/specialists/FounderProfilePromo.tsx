import { Fragment } from "react";
import { getLocale } from "next-intl/server";

import { Link } from "../../i18n/navigation";
import BrandName from "../ui/BrandName";

function BrandedText({
  text,
}: Readonly<{
  text: string;
}>) {
  const parts = text.split("Vatandoshlar.de");

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 && <BrandName />}
          {part}
        </Fragment>
      ))}
    </>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="8"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5.5 19.5v-1.25A5.75 5.75 0 0 1 11.25 12.5h1.5a5.75 5.75 0 0 1 5.75 5.75v1.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default async function FounderProfilePromo() {
  const locale = await getLocale();

  const copy =
    locale === "de"
      ? {
          label: "Vatandoshlar.de · Projektgründer",
          title:
            "Lernen Sie das Projekt hinter Vatandoshlar.de und seine Ziele kennen",
          description:
            "Erfahren Sie mehr darüber, warum Zafar Usarov Vatandoshlar.de gegründet hat, welche Ziele die Plattform verfolgt und wie sie weiterentwickelt wird.",
          action: "Mehr über den Projektgründer",
        }
      : {
          label: "Vatandoshlar.de · Loyiha asoschisi",
          title:
            "Vatandoshlar.de ortidagi loyiha va uning maqsadi bilan tanishing",
          description:
            "Zafar Usarovning Vatandoshlar.de loyihasini nima uchun yaratgani, platformaning maqsadi va rivojlanish yo‘nalishlari haqida batafsil ma’lumot oling.",
          action: "Loyiha asoschisi haqida",
        };

  return (
    <section
      aria-labelledby="founder-profile-promo-title"
      className="relative isolate overflow-hidden border-t border-slate-200/80 bg-slate-50/70 py-12 transition-colors dark:border-white/[0.08] dark:bg-slate-950 sm:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 size-64 -translate-y-1/2 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-400/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.45),rgba(16,185,129,0.35),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur transition duration-300 hover:border-violet-200 hover:shadow-lg dark:border-white/[0.09] dark:bg-white/[0.045] dark:hover:border-violet-400/20 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300">
                <span className="flex size-5 items-center justify-center rounded-full border border-current/20">
                  <UserIcon />
                </span>

                <BrandedText text={copy.label} />
              </div>

              <h2
                id="founder-profile-promo-title"
                className="mt-5 text-2xl font-bold tracking-[-0.035em] text-slate-950 dark:text-white sm:text-3xl lg:text-4xl"
              >
                <BrandedText text={copy.title} />
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
                <BrandedText text={copy.description} />
              </p>
            </div>

            <Link
              href="/about/founder"
              className="group/link inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto lg:min-w-56 dark:focus-visible:ring-offset-slate-950"
            >
              {copy.action}

              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <ArrowUpRightIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
