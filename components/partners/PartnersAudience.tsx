import mobile from "./PartnersMobile.module.css";
import { BookOpen, GraduationCap, UsersRound, Building2, Landmark, Lightbulb, ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

const icons = [BookOpen, GraduationCap, UsersRound, Building2, Landmark, Lightbulb, ArrowUpRight] as const;

type Props = { title: string; description: string; items: readonly string[]; headingClassName: string };

export default function PartnersAudience({ title, description, items, headingClassName }: Props) {
  return (
    <section aria-labelledby="partners-audience" className={`${mobile.audience} w-full py-8 lg:py-10`}>
      <h2 id="partners-audience" className={`${headingClassName} text-center text-[30px] font-semibold leading-tight tracking-tight lg:text-[44px]`}>{title}</h2>
      <p className="mx-auto mt-3 max-w-[70ch] text-center text-base leading-relaxed text-[var(--text-secondary)] lg:text-lg">{description}</p>
      <ol className="mt-6 w-full border-t border-[var(--border)] lg:mt-8">
        {items.map((item, index) => {
          const Icon = icons[index];
          const rowClass = `${mobile.audienceRow} grid min-h-[56px] grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 py-3 lg:min-h-[72px] lg:grid-cols-[3rem_minmax(0,1fr)_auto] lg:gap-5`;
          const row = <>
            <span aria-hidden="true" className="text-sm tabular-nums text-[var(--text-secondary)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="min-w-0 break-words text-base leading-snug lg:text-xl">{item}</span>
            {Icon && <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-[var(--text-secondary)] lg:size-6" />}
          </>;
          return <li key={item} className="border-b border-[var(--border)]">
            {index === 6 ? <Link href="/support" className={`${rowClass} transition-colors hover:bg-black/[0.025] dark:hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none`}>{row}</Link> : <div className={rowClass}>{row}</div>}
          </li>;
        })}
      </ol>
    </section>
  );
}
