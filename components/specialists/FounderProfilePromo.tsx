
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
          label: "Ausführliches Profil",
          title:
            "Mein beruflicher Hintergrund und UzDe",
          description:
            "Mehr zu meiner Arbeit, Erfahrung und der Entstehung von UzDe auf der Gründerseite.",
          action: "Ausführliches Profil ansehen",
        }
      : {
          label: "Batafsil profil",
          title:
            "Faoliyatim va UzDe haqida",
          description:
            "Faoliyatim, tajribam va UzDe loyihasi haqida batafsil ma’lumot asoschi sahifasida.",
          action: "Batafsil profilni körış",
        };

  return (
    <section
      aria-labelledby="founder-profile-promo-title"
      className="min-w-0 w-full rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6"
    >
      <h2 id="founder-profile-promo-title" className="flex min-w-0 items-center gap-2 text-[18px] font-semibold leading-snug text-slate-950 dark:text-zinc-100">
        <span className="flex size-6 shrink-0 items-center justify-center text-slate-500 dark:text-zinc-400">
          <UserIcon />
        </span>
        <span className="min-w-0 break-words"><BrandedText text={copy.label} /></span>
      </h2>
      <p className="mt-3 text-sm font-medium leading-5 text-slate-800 dark:text-zinc-300">
        <BrandedText text={copy.title} />
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
        <BrandedText text={copy.description} />
      </p>
      <Link
        href="/about/founder"
        className="mt-4 inline-flex min-h-[38px] max-w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3.5 py-2 text-center text-[13px] font-semibold leading-5 text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-[#344355] dark:focus-visible:ring-offset-[#111419]"
      >
        {copy.action}
        <ArrowUpRightIcon />
      </Link>
    </section>
  );
}
