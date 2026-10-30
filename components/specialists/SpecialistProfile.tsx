import SpecialistContactLinks from "@/components/specialists/SpecialistContactLinks";
import BrandedText from "@/components/ui/BrandedText";
import { Link } from "@/i18n/navigation";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
  SpecialistLanguage,
} from "@/types/specialist";

type SpecialistProfileProps = Readonly<{
  specialist: LocalizedSpecialist;
  labels: Readonly<{
    backToDirectory: string;
    verified: string;
    notVerified: string;
    premium: string;
    sponsored: string;
    location: string;
    languages: string;
    profile: string;
    education: string;
    memberships: string;
    services: string;
    pricing: string;
    contact: string;
    contactDescription: string;
    phone: string;
    mobile: string;
    email: string;
    copyEmail: string;
    composeEmail: string;
    emailCopied: string;
    emailCopyFailed: string;
    callPhone: string;
    website: string;
    whatsapp: string;
    telegram: string;
    instagram: string;
    youtube: string;
    facebook: string;
    googleScholar: string;
    researchGate: string;
    github: string;
    linkedin: string;
    achievements: string;
    imageCredit: string;
    source: string;
    categories: string;
    code: string;
    categoriesMap: Readonly<
      Record<SpecialistCategory, string>
    >;
    languagesMap: Readonly<
      Partial<Record<SpecialistLanguage, string>>
    >;
  }>;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 12H5m5-5-5 5 5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path
        d="m6 12 4 4 8-8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  return [
    specialist.location?.city,
    specialist.location?.bundesland,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function SpecialistProfile({
  specialist,
  labels,
}: SpecialistProfileProps) {
  const locationLabel = getLocationLabel(specialist);
  const isEntrepreneurProfile =
    specialist.categories.includes("entrepreneur");

  return (
    <main className="min-h-screen bg-white bg-[radial-gradient(circle_at_8%_28%,rgba(16,185,129,0.055),transparent_30rem),radial-gradient(circle_at_92%_48%,rgba(59,130,246,0.045),transparent_34rem),radial-gradient(circle_at_45%_88%,rgba(20,184,166,0.04),transparent_32rem)] bg-no-repeat pt-[88px] text-slate-950 dark:bg-none dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-8 dark:border-slate-800 dark:bg-slate-950 sm:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_25%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/specialists"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-slate-300 dark:hover:text-emerald-400 dark:focus-visible:ring-offset-slate-950"
          >
            <ArrowLeftIcon className="size-4" />
            {labels.backToDirectory}
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div
                className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[2rem] text-2xl font-black text-white shadow-xl ${
                  specialist.slug === "nigora-okhunova"
                    ? "h-36 w-28 sm:h-52 sm:w-40 lg:h-64 lg:w-48"
                    : "size-28 sm:size-40 lg:size-48"
                } ${
                  specialist.avatarUrl
                    ? "bg-white shadow-slate-900/10 dark:bg-slate-900"
                    : "bg-gradient-to-br from-emerald-500 to-teal-700 shadow-emerald-600/20"
                }`}
              >
                {specialist.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={specialist.avatarUrl}
                    alt=""
                    className="h-full w-full"
                    style={{
                      objectFit: specialist.slug === "nigora-okhunova" ? "contain" : (specialist.imageFit ?? "cover"),
                      objectPosition: specialist.imagePosition ?? "center",
                      transform: specialist.slug === "nigora-okhunova" ? "none" : `scale(${specialist.imageScale ?? 1})`,
                    }}
                  />
                ) : (
                  getInitials(specialist.name)
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                      specialist.status.verified
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <VerifiedIcon className="size-4" />
                    {specialist.status.verified
                      ? labels.verified
                      : labels.notVerified}
                  </span>

                  {specialist.status.premium && (
                    <span className="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                      {labels.premium}
                    </span>
                  )}

                  {specialist.status.sponsored && (
                    <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                      {labels.sponsored}
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-slate-950 sm:text-5xl dark:text-white">
                  {specialist.name}
                </h1>

                <p className="mt-3 text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                  {specialist.profession}
                </p>
                {specialist.avatarCredit && (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {labels.imageCredit}: {specialist.avatarSourceUrl ? <a href={specialist.avatarSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emerald-600">{specialist.avatarCredit}</a> : specialist.avatarCredit}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="font-bold text-slate-950 dark:text-white">
                {labels.code}
              </p>
              <p className="mt-1 font-mono text-slate-500 dark:text-slate-400">
                {specialist.code}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-8">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                <BrandedText text={specialist.shortDescription} />
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {locationLabel && (
                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      {labels.location}
                    </p>

                    <p className="mt-3 flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                      <LocationIcon className="size-5 text-emerald-600 dark:text-emerald-400" />
                      {locationLabel}
                    </p>
                  </div>
                )}

                {specialist.languages.length > 0 && (
                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      {labels.languages}
                    </p>

                    <p className="mt-3 font-semibold text-slate-800 dark:text-slate-200">
                      {specialist.languages
                        .map(
                          (language) =>
                            labels.languagesMap[
                              language
                            ] ?? language.toUpperCase(),
                        )
                        .join(" · ")}
                    </p>
                  </div>
                )}
              </div>
            </article>

            {specialist.profile && specialist.profile.length > 0 && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                  {labels.profile}
                </h2>

                <div className="mt-4 space-y-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  {specialist.profile.map((paragraph) => (
                    <p key={paragraph}>
                      <BrandedText text={paragraph} />
                    </p>
                  ))}
                </div>
              </article>
            )}

            {((specialist.education && specialist.education.length > 0) ||
              (specialist.memberships && specialist.memberships.length > 0)) && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  {specialist.education && specialist.education.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                        {labels.education}
                      </h2>
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 marker:text-emerald-500 dark:text-slate-300 dark:marker:text-emerald-400">
                        {specialist.education.map((item) => (
                          <li key={item} className="leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {specialist.memberships && specialist.memberships.length > 0 && (
                    <div>
                      <h2 className="text-xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                        {labels.memberships}
                      </h2>
                      <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                        {specialist.memberships.map((item) => (
                          <li key={item} className="leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            )}

            {specialist.achievements && specialist.achievements.length > 0 && (
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">{labels.achievements}</h2>
                <ol className="mt-6 space-y-4">
                  {specialist.achievements.map((item, index) => (
                    <li key={`${item.year}-${item.title}-${index}`} className="grid gap-2 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 shadow-sm transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50/60 hover:shadow-[0_18px_45px_-28px_rgba(5,150,105,0.55)] focus-within:-translate-y-1 focus-within:border-emerald-400 focus-within:bg-emerald-50/60 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-emerald-400/35 dark:hover:bg-emerald-400/[0.06] dark:focus-within:border-emerald-400/50 dark:focus-within:bg-emerald-400/[0.06] dark:focus-within:ring-offset-slate-900 sm:grid-cols-[7rem_1fr]">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{item.year}</span>
                      <div><p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>{item.award && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.award}</p>}{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-md text-xs font-bold text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950">{labels.source}</a>}</div>
                    </li>
                  ))}
                </ol>
              </article>
            )}

            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                {labels.services}
              </h2>

              <ul className="mt-6 space-y-4">
                {specialist.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <CheckIcon className="size-4" />
                    </span>
                    <span className="leading-7">{service}</span>
                  </li>
                ))}
              </ul>

              {specialist.pricingNote && (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                    {labels.pricing}
                  </p>
                  <p className="mt-2 leading-7 text-emerald-900 dark:text-emerald-100">
                    {specialist.pricingNote}
                  </p>
                </div>
              )}
            </article>

            <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white">
                {labels.categories}
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {specialist.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                  >
                    {labels.categoriesMap[category]}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <aside>
            <div className="sticky top-28 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm transition-[border-color,box-shadow,background-color] duration-300 hover:border-emerald-200 hover:shadow-[0_18px_45px_-30px_rgba(5,150,105,0.45)] motion-reduce:transition-none dark:border-white/[0.08] dark:bg-slate-900 dark:hover:border-emerald-400/20">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                {isEntrepreneurProfile
                  ? labels.website
                  : labels.contact}
              </h2>

              {!isEntrepreneurProfile && (
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {labels.contactDescription}
                </p>
              )}

              <SpecialistContactLinks contact={specialist.contact} labels={labels} />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
