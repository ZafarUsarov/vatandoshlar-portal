import { Link } from "@/i18n/navigation";
import PremiumBadge from "@/components/specialists/PremiumBadge";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
} from "@/types/specialist";

type SpecialistCardProps = Readonly<{
  specialist: LocalizedSpecialist;
  compact?: boolean;
  labels: Readonly<{
    verified: string;
    premium: string;
    sponsored: string;
    details: string;
    detailsSoon: string;
    languages: string;
    serviceArea: string;
    categories: Readonly<
      Record<SpecialistCategory, string>
    >;
  }>;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function LocationIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function VerifiedIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      <path
        d="m9.4 3.8 2.6-1.3 2.6 1.3 2.9.4.5 2.9 1.3 2.6-1.3 2.6-.5 2.9-2.9.4-2.6 1.3-2.6-1.3-2.9-.4-.5-2.9-1.3-2.6L6 7.1l.5-2.9 2.9-.4Z"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 9.8 1.8 1.8 3.9-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getLocationLabel(
  specialist: LocalizedSpecialist,
) {
  if (specialist.serviceArea) {
    return specialist.serviceArea;
  }

  return [
    specialist.location?.city,
    specialist.location?.bundesland,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function SpecialistCard({
  specialist,
  labels,
  compact = false,
}: SpecialistCardProps) {
  const locationLabel = getLocationLabel(specialist);
  const hiddenCategories = Math.max(0, specialist.categories.length - 2);

  return (
    <article className={`group relative flex min-w-0 flex-col rounded-xl border border-zinc-200 bg-white transition-[transform,border-color] duration-200 hover:border-zinc-400 dark:border-[#2A343A] dark:bg-[#181E22] dark:hover:border-[#40534F] motion-reduce:transition-none ${specialist.status.premium ? "border-[#83B8A4] hover:border-[#379B78] dark:border-[#24765B] dark:hover:border-[#34D399]" : ""} ${compact ? "p-3.5 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0" : "p-5 sm:p-6"}`}>
      {specialist.status.sponsored && (
        <span className="mb-2 self-start rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">{labels.sponsored}</span>
      )}
      <div className="flex min-w-0 items-start gap-3">
        <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-white ${compact ? "size-11" : "size-14 sm:size-16"}`}>
          {specialist.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={specialist.avatarUrl} alt="" className="h-full w-full" style={{
              objectFit: specialist.slug === "nigora-okhunova" ? "contain" : (specialist.imageFit ?? "cover"),
              objectPosition: specialist.imagePosition ?? "center",
              transform: specialist.slug === "nigora-okhunova" ? "scale(0.88)" : `scale(${specialist.imageScale ?? 1})`,
            }} />
          ) : getInitials(specialist.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`flex min-w-0 items-center gap-2`}>
            <h3 className={`min-w-0 font-bold leading-5 text-slate-950 dark:text-white ${compact ? "line-clamp-2 text-[15px]" : "text-base sm:text-lg"}`}>{specialist.name}</h3>
            {specialist.status.premium && <PremiumBadge />}
            {specialist.status.verified && (
              <span title={labels.verified} className="inline-flex size-5 shrink-0 self-center items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-[#203B37] dark:text-[#9BDED0]"><VerifiedIcon className="size-3.5" /></span>
            )}
          </div>
          <p className={`mt-1 line-clamp-2 font-semibold text-emerald-700 dark:text-[#9BDED0] ${compact ? "text-[13px] leading-[18px]" : "text-sm leading-5"}`}>{specialist.profession}</p>
          {(locationLabel || compact) && <p className={`flex min-w-0 items-start gap-1 text-xs leading-4 text-slate-500 dark:text-slate-400 ${compact ? "mt-1" : "mt-1.5"}`}>{locationLabel && <LocationIcon className="mt-0.5 size-3.5 shrink-0" />}<span className="min-w-0 truncate">{locationLabel}</span></p>}
        </div>
      </div>
      <div className={`flex min-w-0 flex-wrap gap-1.5 ${compact ? "min-h-6 flex-nowrap items-center overflow-hidden pb-1.5 pt-2" : "pb-3 pt-5"}`}>
        {specialist.categories.slice(0, 2).map((category) => (
          <span key={category} className={`max-w-full truncate rounded-full bg-zinc-100 text-[11px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300 ${compact ? "max-w-[45%] px-2 py-0.5" : "px-2.5 py-1"}`}>{labels.categories[category] ?? category}</span>
        ))}
        {compact && hiddenCategories > 0 && <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-300">+{hiddenCategories}</span>}
      </div>
      <div className={`mt-auto flex min-w-0 items-center justify-between gap-2 border-t border-zinc-100 dark:border-white/10 ${compact ? "pt-1.5" : "pt-4"}`}>
        <span className="min-w-0 truncate text-xs text-slate-500 dark:text-slate-400">{specialist.languages.map((language) => language.toUpperCase()).join(" · ")}</span>
        {specialist.profilePublished ? (
          <Link href={`/specialists/${specialist.slug}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-200 dark:hover:text-[#65CBB6]">
            <span aria-hidden="true" className="absolute inset-0" />
            {labels.details}<ArrowUpRightIcon />
          </Link>
        ) : <span className="shrink-0 text-xs text-slate-400">{labels.detailsSoon}</span>}
      </div>
    </article>
  );
}
