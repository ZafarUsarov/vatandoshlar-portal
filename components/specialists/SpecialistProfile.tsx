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
    services: string;
    pricing: string;
    contact: string;
    contactDescription: string;
    phone: string;
    email: string;
    website: string;
    whatsapp: string;
    telegram: string;
    instagram: string;
    youtube: string;
    facebook: string;
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

function ArrowUpRightIcon({ className }: IconProps) {
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
        d="M7 17 17 7M8 7h9v9"
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

  const contactLinks = [
    specialist.contact.phone
      ? {
          key: "phone",
          label: labels.phone,
          value: specialist.contact.phone,
          href: `tel:${specialist.contact.phone.replace(
            /\s+/g,
            "",
          )}`,
        }
      : null,
    specialist.contact.email
      ? {
          key: "email",
          label: labels.email,
          value: specialist.contact.email,
          href: `mailto:${specialist.contact.email}`,
        }
      : null,
    specialist.contact.website
      ? {
          key: "website",
          label: labels.website,
          value: specialist.contact.website,
          href: specialist.contact.website,
        }
      : null,
    specialist.contact.whatsapp
      ? {
          key: "whatsapp",
          label: labels.whatsapp,
          value: labels.whatsapp,
          href: specialist.contact.whatsapp,
        }
      : null,
    specialist.contact.telegram
      ? {
          key: "telegram",
          label: labels.telegram,
          value: labels.telegram,
          href: specialist.contact.telegram,
        }
      : null,
    specialist.contact.instagram
      ? {
          key: "instagram",
          label: labels.instagram,
          value: labels.instagram,
          href: specialist.contact.instagram,
        }
      : null,
    specialist.contact.youtube
      ? {
          key: "youtube",
          label: labels.youtube,
          value: labels.youtube,
          href: specialist.contact.youtube,
        }
      : null,
    specialist.contact.facebook
      ? {
          key: "facebook",
          label: labels.facebook,
          value: labels.facebook,
          href: specialist.contact.facebook,
        }
      : null,
  ].filter(
    (
      item,
    ): item is {
      key: string;
      label: string;
      value: string;
      href: string;
    } => Boolean(item),
  );

  return (
    <main className="min-h-screen bg-white pt-20 text-slate-950 dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-950 sm:py-20">
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

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-700 text-2xl font-black text-white shadow-xl shadow-emerald-600/20">
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

      <section className="py-16 sm:py-20">
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
            <div className="sticky top-28 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                {labels.contact}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {labels.contactDescription}
              </p>

              <div className="mt-6 space-y-3">
                {contactLinks.map((contact) => {
                  const isExternal =
                    contact.href.startsWith("http");

                  return (
                    <a
                      key={contact.key}
                      href={contact.href}
                      target={
                        isExternal ? "_blank" : undefined
                      }
                      rel={
                        isExternal
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/10"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                          {contact.label}
                        </span>
                        <span className="mt-1 block truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                          {contact.value}
                        </span>
                      </span>

                      <ArrowUpRightIcon className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
