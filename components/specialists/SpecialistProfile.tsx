import FounderProfilePromo from "@/components/specialists/FounderProfilePromo";
import PremiumBadge from "@/components/specialists/PremiumBadge";
import SpecialistContactLinks from "@/components/specialists/SpecialistContactLinks";
import ShareButton from "@/components/shared/ShareButton";
import BrandedText from "@/components/ui/BrandedText";
import { Link } from "@/i18n/navigation";
import type {
  LocalizedSpecialist,
  SpecialistCategory,
  SpecialistLanguage,
} from "@/types/specialist";

type SpecialistProfileProps = Readonly<{
  specialist: LocalizedSpecialist;
  locale: "uz" | "de";
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

function SpecialistProfileText({ text, name }: Readonly<{ text: string; name: string }>) {
  const tokens = name ? text.split(name) : [text];
  return <>{tokens.map((part, index) => (
    <span key={index}>
      {index > 0 && <strong className="font-semibold text-slate-800 dark:text-zinc-100">{name}</strong>}
      <BrandedText text={part} />
    </span>
  ))}</>;
}

function AnvarProfileText({ text }: Readonly<{ text: string }>) {
  const names = ["Anvar Shermatov", "Turkestan Travel LLC", "Turkestan Travel UG", "UZB Sprachschule", "Davra e.V.", "(DaF/DaZ)"];
  const escaped = names.map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return <>{parts.map((part, index) => (
    names.includes(part) ? (
      <strong key={index} className="font-semibold text-slate-800 dark:text-zinc-100">{part}</strong>
    ) : <BrandedText key={index} text={part} />
  ))}</>;
}

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

export default function SpecialistProfile({
  specialist,
  locale,
  labels,
}: SpecialistProfileProps) {
  const locationLabel = [
    ...new Set(
      [specialist.location?.city, specialist.location?.bundesland]
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ].join(", ");

  const isFounder = specialist.slug === "zafar-usarov";
  const isEntrepreneurProfile =
    specialist.categories.includes("entrepreneur");

  return (
    <main className="min-h-screen bg-white pt-[66px] lg:pt-20 text-slate-950 dark:bg-[#111419] dark:text-zinc-100">
      <section className="border-b border-slate-200 bg-slate-50/70 py-5 dark:border-zinc-700 dark:bg-[#111419] sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/specialists"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-zinc-300 dark:hover:text-teal-300 dark:focus-visible:ring-offset-[#111419]"
          >
            <ArrowLeftIcon className="size-4" />
            {labels.backToDirectory}
          </Link>

          <div className="mt-4 grid gap-3  sm:gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
              <div
                className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl text-lg font-black text-white sm:text-xl ${
                  specialist.slug === "nigora-okhunova"
                    ? "h-24 w-20 sm:h-[130px] sm:w-[104px]"
                    : "size-24 sm:size-[124px]"
                } ${
                  specialist.avatarUrl
                    ? "bg-white dark:bg-zinc-900/40"
                    : "bg-gradient-to-br from-emerald-500 to-teal-700"
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

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                      specialist.status.verified
                        ? "bg-emerald-100 text-emerald-700 dark:bg-teal-950/30 dark:text-teal-300"
                        : "bg-slate-200 text-slate-600 dark:bg-zinc-800/60 dark:text-zinc-300"
                    }`}
                  >
                    <VerifiedIcon className="size-3.5" />
                    {specialist.status.verified
                      ? labels.verified
                      : labels.notVerified}
                  </span>

                  {specialist.status.sponsored && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-zinc-800/60 dark:text-amber-300">
                      {labels.sponsored}
                    </span>
                  )}
                </div>

                <h1 className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[clamp(1.75rem,4vw,2.375rem)] font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:mt-2 dark:text-zinc-100">
                  <span className="min-w-0 break-words">{specialist.name}</span>
                  {specialist.status.premium && <PremiumBadge size="profile" />}
                </h1>

                <p className="mt-1 text-[15px] font-semibold leading-snug text-emerald-700 sm:text-[15px] dark:text-teal-300">
                  {specialist.profession}
                </p>
                {specialist.avatarCredit && (
                  <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">
                    {labels.imageCredit}: {specialist.avatarSourceUrl ? <a href={specialist.avatarSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emerald-600">{specialist.avatarCredit}</a> : specialist.avatarCredit}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 dark:text-zinc-400 lg:self-end">
              <p className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-medium">{labels.code}</span>
                <span className="font-mono">{specialist.code}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-7">
        <div className="mx-auto grid max-w-7xl min-w-0 grid-cols-1 gap-4 px-4 sm:gap-5 sm:px-6 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:px-8">
          <div className="min-w-0 space-y-4 sm:space-y-5">
            <article className="rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6">
              <p className="text-sm leading-6 text-slate-600 dark:text-zinc-300 sm:text-[15px]">
                <BrandedText text={specialist.slug === "zafar-usarov" ? (locale === "de" ? "Ich bin Gründer und Entwickler von UzDe. Ich entwickle Webplattformen und biete praxisorientierte Unterstützung bei Unterlagen für Bachelor-, Master- und Promotionsstudiengänge." : "UzDe asoschisi va dasturchisiman. Veb-platformalar ishlab chiqish hamda bakalavr, magistratura va doktorantura hujjatlari bo‘yicha amaliy yo‘naltirish bilan shug‘ullanaman.") : specialist.shortDescription} />
              </p>

              <div className="mt-3 space-y-2">
                {locationLabel && (
                  <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-[#111419]">
                    <LocationIcon className="size-4 shrink-0 text-emerald-600 dark:text-teal-300" />
                    <p className="text-sm font-medium text-slate-800 dark:text-zinc-300">
                      {locationLabel}
                    </p>
                  </div>
                )}

                {specialist.languages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {specialist.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
                      >
                        {labels.languagesMap[language] ?? language.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>

            {specialist.profile && specialist.profile.length > 0 && (
              <article className="rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950 dark:text-zinc-100 sm:text-xl">
                  {labels.profile}
                </h2>

                <div className="mt-3 space-y-2 text-sm leading-6 sm:text-[15px] text-slate-600 dark:text-zinc-300">
                  {specialist.profile.map((paragraph) => (
                    <p key={paragraph}>
                      {specialist.slug === "anvar-shermatov" ? (
                        <AnvarProfileText text={paragraph} />
                      ) : (
                        <SpecialistProfileText text={paragraph} name={specialist.name} />
                      )}
                    </p>
                  ))}
                </div>
              </article>
            )}

            {((specialist.education && specialist.education.length > 0) ||
              (specialist.memberships && specialist.memberships.length > 0)) && (
              <article className="rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {specialist.education && specialist.education.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950 dark:text-zinc-100">
                        {labels.education}
                      </h2>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600 sm:text-[15px] marker:text-emerald-500 dark:text-zinc-300 dark:marker:text-emerald-400">
                        {specialist.education.map((item) => (
                          <li key={item} className="leading-6">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {specialist.memberships && specialist.memberships.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950 dark:text-zinc-100">
                        {specialist.slug === "anvar-shermatov" ? (locale === "de" ? "Organisationen & Tätigkeiten" : "Tashkilotlar va faoliyat") : labels.memberships}
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 sm:text-[15px] dark:text-zinc-300">
                        {specialist.memberships.map((item) => {
                          const separator = " | https://";
                          const separatorIndex = item.lastIndexOf(separator);
                          const text = separatorIndex === -1 ? item : item.slice(0, separatorIndex);
                          const url = separatorIndex === -1 ? null : item.slice(separatorIndex + 3);
                          const validUrl = url && /^https:\/\/[^\s]+$/.test(url) ? url : null;

                          return (
                            <li key={item} className="leading-6">
                              {validUrl ? (
                                <a
                                  href={validUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-emerald-500/50 underline-offset-4 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-teal-300"
                                >
                                  {specialist.slug === "anvar-shermatov" && text.includes(" — ") ? (
                                    <>
                                      <strong className="font-bold">{text.split(" — ")[0]}</strong>
                                      {text.slice(text.indexOf(" — "))}
                                    </>
                                  ) : text}
                                </a>
                              ) : (
                                item
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            )}

            {specialist.achievements && specialist.achievements.length > 0 && (
              <article className="rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950 dark:text-zinc-100 sm:text-xl">{labels.achievements}</h2>
                <ol className="mt-3 space-y-2">
                  {specialist.achievements.map((item, index) => (
                    <li key={`${item.year}-${item.title}-${index}`} className="grid gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800/60 sm:grid-cols-[6rem_1fr]">
                      <span className="font-bold text-emerald-700 dark:text-teal-300">{item.year}</span>
                      <div><p className="font-semibold text-slate-900 dark:text-zinc-100">{item.title}</p>{item.award && <p className="mt-1 text-sm text-slate-600 dark:text-zinc-300">{item.award}</p>}{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-md text-xs font-bold text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-teal-300 dark:hover:text-teal-300 dark:focus-visible:ring-offset-[#111419]">{labels.source}</a>}</div>
                    </li>
                  ))}
                </ol>
              </article>
            )}

            {(specialist.services.length > 0 || specialist.categories.length > 0 || specialist.pricingNote) && (
              <article className="rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950 dark:text-zinc-100">
                  {locale === "de" ? "Tätigkeiten & Leistungen" : "Faoliyat va xizmatlar"}
                </h2>

                {specialist.services.length > 0 && (
                  <ul className="mt-3 space-y-2 ">
                    {specialist.services.map((service) => (
                      <li key={service} className="flex items-start gap-2 text-sm leading-6 text-slate-700 dark:text-zinc-300 sm:text-[15px]">
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-teal-950/30 dark:text-teal-300">
                          <CheckIcon className="size-3" />
                        </span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {specialist.categories.length > 0 && (
                  <div className="mt-4 border-t border-slate-200 pt-3 dark:border-zinc-700 ">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                      {labels.categories}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {specialist.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
                        >
                          {labels.categoriesMap[category]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {specialist.pricingNote && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800/60">
                    <p className="text-xs font-bold text-emerald-700 dark:text-teal-300">
                      {labels.pricing}
                    </p>
                    <p className="mt-1 leading-6 text-emerald-900 dark:text-zinc-300">
                      {specialist.pricingNote}
                    </p>
                  </div>
                )}
              </article>
            )}
          </div>

          <aside className="min-w-0 w-full">
            <div className="min-w-0 w-full space-y-4 lg:sticky lg:top-24">
              {specialist.slug === "zafar-usarov" && <FounderProfilePromo />}
              <div className="min-w-0 w-full rounded-[20px] border border-slate-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900/40 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-zinc-100">
                {isFounder ? (locale === "de" ? "Soziale Netzwerke & Kontakt" : "Ijtimoiy tarmoqlar va bog‘lanish") : specialist.slug === "anvar-shermatov" ? (locale === "de" ? "Kontakt & soziale Netzwerke" : "Bog‘lanish va ijtimoiy tarmoqlar") : isEntrepreneurProfile ? labels.website : labels.contact}
              </h2>

              {!isEntrepreneurProfile && !isFounder && (
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                  {labels.contactDescription}
                </p>
              )}

              <SpecialistContactLinks contact={specialist.slug === "anvar-shermatov" ? { ...specialist.contact, website: undefined } : specialist.contact} labels={labels} isFounder={isFounder} />
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-3 dark:border-zinc-700">
                <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                  {locale === "de" ? "Profil teilen" : "Profilni ulashish"}
                </span>
                <ShareButton title={specialist.name} locale={locale} variant="specialist" iconOnly />
              </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
