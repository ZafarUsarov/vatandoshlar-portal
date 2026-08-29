import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import SpecialistCard from "@/components/specialists/SpecialistCard";
import {
  getFeaturedPublishedSpecialists,
} from "@/lib/specialists/public-specialists-repository";
import type {
  SpecialistCategory,
  SupportedLocale,
} from "@/types/specialist";

type IconProps = Readonly<{
  className?: string;
}>;

function UsersIcon({ className }: IconProps) {
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
        d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-4A4.5 4.5 0 0 0 3 18.5V20"
        strokeLinecap="round"
      />
      <circle
        cx="9.5"
        cy="7.5"
        r="3.5"
      />
      <path
        d="M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14.5a4.5 4.5 0 0 1 3 4.2V20"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
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
        d="M12 3.5 19 6v5.3c0 4.5-2.7 7.8-7 9.2-4.3-1.4-7-4.7-7-9.2V6l7-2.5Z"
        strokeLinejoin="round"
      />
      <path
        d="m8.8 12 2.1 2.1 4.4-4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ className }: IconProps) {
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
        d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MegaphoneIcon({ className }: IconProps) {
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
        d="M4 13V9h4l9-4v12l-9-4H4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m8 13 1.5 6h3L11 14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 8v6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function FeaturedSpecialistsSection() {
  const t =
    await getTranslations(
      "FeaturedSpecialistsSection",
    );

  const specialistsT =
    await getTranslations(
      "SpecialistsPage",
    );

  const locale =
    (await getLocale()) as SupportedLocale;

  const featuredSpecialists =
    await getFeaturedPublishedSpecialists(
      locale,
      3,
    );

  const categories: Readonly<
    Record<
      SpecialistCategory,
      string
    >
  > = {
    medical:
      specialistsT(
        "categories.medical",
      ),

    legal:
      specialistsT(
        "categories.legal",
      ),

    technology:
      specialistsT(
        "categories.technology",
      ),

    automotive:
      specialistsT(
        "categories.automotive",
      ),

    home:
      specialistsT(
        "categories.home",
      ),

    education:
      specialistsT(
        "categories.education",
      ),

    "language-teaching":
      specialistsT(
        "categories.languageTeaching",
      ),

    "academic-documents":
      specialistsT(
        "categories.academicDocuments",
      ),

    beauty:
      specialistsT(
        "categories.beauty",
      ),

    finance:
      specialistsT(
        "categories.finance",
      ),

    creative:
      specialistsT(
        "categories.creative",
      ),
  };

  const labels = {
    verified:
      t(
        "card.verified",
      ),

    premium:
      t(
        "card.premium",
      ),

    sponsored:
      t(
        "card.sponsored",
      ),

    details:
      t(
        "card.details",
      ),

    detailsSoon:
      t(
        "card.detailsSoon",
      ),

    languages:
      t(
        "card.languages",
      ),

    serviceArea:
      specialistsT(
        "card.serviceArea",
      ),

    categories,
  };

  return (
    <section
      id="featured-specialists"
      aria-labelledby="featured-specialists-heading"
      className="relative isolate overflow-hidden border-b border-slate-200 bg-white py-24 sm:py-28 lg:py-32 dark:border-slate-800 dark:bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.10),transparent_25%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.08),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
            <UsersIcon className="size-4" />

            {t("badge")}
          </div>

          <h2
            id="featured-specialists-heading"
            className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl dark:text-white"
          >
            {t("title")}
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400">
            {t("description")}
          </p>
        </div>

        {featuredSpecialists.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredSpecialists.map(
              (specialist) => (
                <SpecialistCard
                  key={
                    specialist.id
                  }
                  specialist={
                    specialist
                  }
                  labels={
                    labels
                  }
                />
              ),
            )}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                  {t(
                    "emptyState.eyebrow",
                  )}
                </p>

                <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
                  {t(
                    "emptyState.title",
                  )}
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
                  {t(
                    "emptyState.description",
                  )}
                </p>

                <a
                  href="mailto:info.vatandoshlar@gmx.de?subject=Mutaxassislar%20katalogiga%20qo%27shilish"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900"
                >
                  {t(
                    "emptyState.applyButton",
                  )}
                </a>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <ShieldIcon className="size-5" />
                  </span>

                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">
                      {t(
                        "benefits.verification.title",
                      )}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {t(
                        "benefits.verification.description",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                    <StarIcon className="size-5" />
                  </span>

                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">
                      {t(
                        "benefits.visibility.title",
                      )}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {t(
                        "benefits.visibility.description",
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    <MegaphoneIcon className="size-5" />
                  </span>

                  <div>
                    <h4 className="font-bold text-slate-950 dark:text-white">
                      {t(
                        "benefits.premium.title",
                      )}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {t(
                        "benefits.premium.description",
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
