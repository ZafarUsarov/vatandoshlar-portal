import SpecialistCard from "@/components/specialists/SpecialistCard";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
} from "@/types/specialist";

type FeaturedSpecialistsProps = Readonly<{
  specialists: ReadonlyArray<LocalizedSpecialist>;
  labels: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
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

function StarIcon() {
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
        d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeaturedSpecialists({
  specialists,
  labels,
}: FeaturedSpecialistsProps) {
  if (specialists.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-directory-heading"
      className="rounded-[2rem] border border-violet-200 bg-violet-50/60 p-6 dark:border-violet-500/20 dark:bg-violet-500/[0.06] sm:p-8"
    >
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
          <StarIcon />
          {labels.eyebrow}
        </span>

        <h2
          id="featured-directory-heading"
          className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white"
        >
          {labels.title}
        </h2>

        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
          {labels.description}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {specialists.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            labels={{
              verified: labels.verified,
              premium: labels.premium,
              sponsored: labels.sponsored,
              details: labels.details,
              detailsSoon: labels.detailsSoon,
              languages: labels.languages,
              serviceArea: labels.serviceArea,
              categories: labels.categories,
            }}
          />
        ))}
      </div>
    </section>
  );
}
