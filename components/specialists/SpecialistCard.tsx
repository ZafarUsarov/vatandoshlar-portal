import { Link } from "@/i18n/navigation";
import type { LocalizedSpecialist } from "@/types/specialist";

type SpecialistCardProps = Readonly<{
  specialist: LocalizedSpecialist;
  labels: Readonly<{
    verified: string;
    premium: string;
    sponsored: string;
    details: string;
    detailsSoon: string;
    languages: string;
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
  const city = specialist.location?.city;
  const bundesland = specialist.location?.bundesland;

  return [city, bundesland].filter(Boolean).join(", ");
}

export default function SpecialistCard({
  specialist,
  labels,
}: SpecialistCardProps) {
  const locationLabel = getLocationLabel(specialist);

  return (
    <article className="group relative isolate flex min-h-[390px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/30 dark:hover:shadow-black/20 sm:p-7">
      {specialist.status.sponsored && (
        <span className="absolute right-5 top-5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
          {labels.sponsored}
        </span>
      )}

      <div className="flex w-full flex-col">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-lg font-black text-white shadow-lg shadow-emerald-600/20">
            {specialist.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={specialist.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              getInitials(specialist.name)
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-xl font-bold text-slate-950 dark:text-white">
                {specialist.name}
              </h3>

              {specialist.status.verified && (
                <span
                  title={labels.verified}
                  className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  <VerifiedIcon className="size-4" />
                </span>
              )}
            </div>

            <p className="mt-1 truncate text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              {specialist.profession}
            </p>
          </div>
        </div>

        <p className="mt-6 line-clamp-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          {specialist.shortDescription}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {specialist.status.premium && (
            <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
              {labels.premium}
            </span>
          )}

          {locationLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <LocationIcon className="size-3.5" />
              {locationLabel}
            </span>
          )}
        </div>

        {specialist.languages.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              {labels.languages}
            </p>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {specialist.languages
                .map((language) => language.toUpperCase())
                .join(" · ")}
            </p>
          </div>
        )}

        <div className="mt-auto border-t border-slate-200 pt-5 dark:border-slate-800">
          {specialist.profilePublished ? (
            <Link
              href={`/specialists/${specialist.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition-all group-hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-emerald-400 dark:focus-visible:ring-offset-slate-900"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
              />
              {labels.details}
              <ArrowUpRightIcon />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500">
              {labels.detailsSoon}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
