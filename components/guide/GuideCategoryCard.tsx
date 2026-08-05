import type {
  GuideCategory,
  GuideCategoryIcon,
} from "../../types/guide";

type GuideCategoryCardProps = Readonly<{
  category: GuideCategory;
  comingSoonLabel: string;
  articlesLabel: string;
}>;

type IconProps = Readonly<{
  type: GuideCategoryIcon;
}>;

function CategoryIcon({ type }: IconProps) {
  const labels: Readonly<Record<GuideCategoryIcon, string>> = {
    arrival: "→",
    visa: "▣",
    family: "⌂",
    invitation: "✉",
    embassy: "▥",
    documents: "▤",
    language: "A",
    education: "◇",
    career: "▧",
    "after-arrival": "✓",
    recognition: "◎",
    integration: "∞",
  };

  return (
    <span
      aria-hidden="true"
      className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
    >
      {labels[type]}
    </span>
  );
}

export default function GuideCategoryCard({
  category,
  comingSoonLabel,
  articlesLabel,
}: GuideCategoryCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30">
      <div className="flex items-start justify-between gap-4">
        <CategoryIcon type={category.icon} />

        <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
          {comingSoonLabel}
        </span>
      </div>

      <h2 className="mt-6 text-xl font-bold tracking-[-0.025em] text-slate-950 dark:text-white">
        {category.title}
      </h2>

      <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
        {category.description}
      </p>

      <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {category.articleCount} {articlesLabel}
        </p>
      </div>
    </article>
  );
}
