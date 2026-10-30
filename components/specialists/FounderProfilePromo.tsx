
import { getLocale } from "next-intl/server";

import { Link } from "../../i18n/navigation";

import BrandedText from "../ui/BrandedText";

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
          label: "Zafar Usarov · Ausführliches Profil",
          title:
            "Mein beruflicher Hintergrund und UzDe",
          description:
            "Mehr zu meiner Arbeit, Erfahrung und der Entstehung von UzDe auf der Gründerseite.",
          action: "Ausführliches Profil ansehen",
        }
      : {
          label: "Zafar Usarov · Batafsil profil",
          title:
            "Faoliyatim va UzDe haqida",
          description:
            "Faoliyatim, tajribam va UzDe loyihasi haqida batafsil ma’lumot asoschi sahifasida.",
          action: "Batafsil profilni ko‘rish",
        };

  return (
    <section
      aria-labelledby="founder-profile-promo-title"
      className="min-w-0 overflow-hidden rounded-[2rem] border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-5 shadow-sm dark:border-emerald-400/20 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-900 sm:p-6"
    >
      <div className="flex min-w-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/70 bg-white/70 dark:border-emerald-400/30 dark:bg-emerald-400/10">
          <UserIcon />
        </span>
        <span className="min-w-0 break-words"><BrandedText text={copy.label} /></span>
      </div>
      <h2 id="founder-profile-promo-title" className="mt-4 text-lg font-bold leading-snug tracking-tight text-slate-950 dark:text-white">
        <BrandedText text={copy.title} />
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <BrandedText text={copy.description} />
      </p>
      <Link
        href="/about/founder"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-md shadow-emerald-600/15 transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
      >
        {copy.action}
        <ArrowUpRightIcon />
      </Link>
    </section>
  );
}
