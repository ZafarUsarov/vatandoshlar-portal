import { Link } from "@/i18n/navigation";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
} from "@/types/specialist";

type SpecialistCardProps = Readonly<{
  specialist: LocalizedSpecialist;
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
}: SpecialistCardProps) {
  const locationLabel = getLocationLabel(specialist);

  return (
    <article className="group relative flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      {specialist.status.sponsored && (
        <span className="mb-2 self-start rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">{labels.sponsored}</span>
      )}
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-white sm:size-16">
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
          <div className="flex items-start gap-1.5">
            <h3 className="min-w-0 text-base font-bold leading-5 text-slate-950 dark:text-white sm:text-lg">{specialist.name}</h3>
            {specialist.status.verified && (
              <span title={labels.verified} className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"><VerifiedIcon className="size-3.5" /></span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-emerald-700 dark:text-emerald-400">{specialist.profession}</p>
          {locationLabel && <p className="mt-1.5 flex items-start gap-1 text-xs leading-4 text-slate-500 dark:text-slate-400"><LocationIcon className="mt-0.5 size-3.5 shrink-0" /><span className="line-clamp-1">{locationLabel}</span></p>}
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3 pb-2">
        {specialist.categories.slice(0, 2).map((category) => (
          <span key={category} className="max-w-full truncate rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{labels.categories[category] ?? category}</span>
        ))}
        {specialist.status.premium && <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">{labels.premium}</span>}
      </div>
      <div className="mt-auto flex min-w-0 items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <span className="min-w-0 truncate text-xs text-slate-500 dark:text-slate-400">{specialist.languages.map((language) => language.toUpperCase()).join(" · ")}</span>
        {specialist.profilePublished ? (
          <Link href={`/specialists/${specialist.slug}`} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400">
            <span aria-hidden="true" className="absolute inset-0" />
            {labels.details}<ArrowUpRightIcon />
          </Link>
        ) : <span className="shrink-0 text-xs text-slate-400">{labels.detailsSoon}</span>}
      </div>
    </article>
  );
}
