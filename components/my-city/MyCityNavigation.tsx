"use client";

import { Link, useRouter } from "@/i18n/navigation";

type Props = Readonly<{
  locale: "uz" | "de";
}>;

export default function MyCityNavigation({ locale }: Props) {
  const router = useRouter();
  const copy = locale === "de"
    ? { back: "Zurück", home: "Startseite", profile: "Profil bearbeiten", current: "Meine Stadt" }
    : { back: "Ortga", home: "Bosh sahifa", profile: "Profilni tahrirlash", current: "Mening shahrim" };

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/account");
  }

  const base = "inline-flex min-h-11 items-center justify-center rounded-2xl px-4 text-sm font-bold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:focus-visible:ring-offset-slate-950";

  return (
    <nav
      aria-label={locale === "de" ? "Seitennavigation" : "Sahifa navigatsiyasi"}
      className="flex flex-wrap items-center gap-2.5"
    >
      <span
        aria-current="page"
        className="relative inline-flex min-h-11 items-center rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-4 text-sm font-black text-emerald-800 shadow-sm dark:border-emerald-900/70 dark:bg-emerald-950/35 dark:text-emerald-200"
      >
        {copy.current}
        <span aria-hidden="true" className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-emerald-500" />
      </span>
      <button
        type="button"
        onClick={goBack}
        className={`${base} border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/60 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20`}
      >
        <span aria-hidden="true" className="mr-2">←</span>
        {copy.back}
      </button>
      <Link
        href="/"
        className={`${base} border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm hover:border-cyan-200 hover:bg-cyan-50/60 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-cyan-900 dark:hover:bg-cyan-950/20`}
      >
        {copy.home}
      </Link>
      <Link
        href="/account/profile"
        className={`${base} bg-emerald-600 text-white shadow-sm shadow-emerald-900/10 hover:bg-emerald-500`}
      >
        {copy.profile}
      </Link>
    </nav>
  );
}
