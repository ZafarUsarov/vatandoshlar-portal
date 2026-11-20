import { Link } from "../../i18n/navigation";

import type { SupportedGuideLocale } from "../../types/guide";

type Props = Readonly<{ locale: SupportedGuideLocale }>;

export default function GuideAuthor({ locale }: Props) {
  return (
    <aside className="mt-5">
      <Link
        href="/about/founder"
        className="group inline-flex min-h-11 flex-col items-start justify-center border-b border-slate-300 py-1 text-slate-950 transition-colors hover:border-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 motion-reduce:transition-none dark:border-slate-600 dark:text-white dark:hover:border-emerald-400 dark:focus-visible:ring-offset-slate-950"
      >
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {locale === "uz" ? "Tayyorladi" : "Erstellt von"}
        </span>
        <span className="mt-0.5 text-sm font-semibold transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
          Zafar Usarov
        </span>
      </Link>
    </aside>
  );
}
