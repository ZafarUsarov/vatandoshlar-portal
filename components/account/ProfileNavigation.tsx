"use client";

import { Link, useRouter } from "@/i18n/navigation";

type Props = Readonly<{
  locale: "uz" | "de";
}>;

const actionClass = "inline-flex min-h-10 items-center justify-center rounded-2xl px-3.5 text-sm font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-offset-slate-950";

export default function ProfileNavigation({ locale }: Props) {
  const router = useRouter();
  const copy = locale === "de"
    ? { back: "Zurück", home: "Startseite", label: "Seitennavigation" }
    : { back: "Ortga", home: "Bosh sahifa", label: "Sahifa navigatsiyasi" };

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/account");
  }

  return (
    <nav aria-label={copy.label} className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
      <button
        type="button"
        onClick={goBack}
        className={`${actionClass} border border-slate-200/90 bg-white/85 text-slate-700 shadow-sm hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-200 dark:hover:bg-slate-800`}
      >
        <span aria-hidden="true" className="mr-2">←</span>
        {copy.back}
      </button>
      <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
      <Link
        href="/"
        className={`${actionClass} text-slate-700 hover:bg-white/80 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900/80 dark:hover:text-white`}
      >
        {copy.home}
      </Link>
    </nav>
  );
}
