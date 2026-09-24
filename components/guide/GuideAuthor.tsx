import { Link } from "../../i18n/navigation";
import type { SupportedGuideLocale } from "../../types/guide";

type Props = Readonly<{ locale: SupportedGuideLocale }>;

export default function GuideAuthor({ locale }: Props) {
  return (
    <aside className="mt-8">
      <Link
        href="/about/founder"
        className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700 dark:focus-visible:ring-offset-slate-950"
      >
        <span aria-hidden="true" className="h-9 w-1 rounded-full bg-emerald-500" />
        <span>
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            {locale === "uz" ? "Tayyorladi" : "Erstellt von"}
          </span>
          <span className="mt-0.5 block text-sm font-bold text-slate-950 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
            Zafar Usarov <span aria-hidden="true">→</span>
          </span>
        </span>
      </Link>
    </aside>
  );
}
