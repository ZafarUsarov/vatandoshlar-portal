import FounderProfilePromo from "@/components/specialists/FounderProfilePromo";
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
      {index > 0 && <strong className="font-semibold text-slate-800 dark:text-slate-100">{name}</strong>}
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
      <strong key={index} className="font-semibold text-slate-800 dark:text-slate-100">{part}</strong>
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
    <main className="min-h-screen bg-white bg-[radial-gradient(circle_at_8%_28%,rgba(16,185,129,0.055),transparent_30rem),radial-gradient(circle_at_92%_48%,rgba(59,130,246,0.045),transparent_34rem),radial-gradient(circle_at_45%_88%,rgba(20,184,166,0.04),transparent_32rem)] bg-no-repeat pt-[88px] text-slate-950 dark:bg-none dark:bg-slate-950 dark:text-white">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-50 py-5 dark:border-slate-800 dark:bg-slate-950 sm:py-12">
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

          <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="flex min-w-0 flex-row items-start gap-3 sm:items-center sm:gap-6">
              <div
                className={`flex shrink-0 items-center justify-center overflow-hidden rounded-2xl text-lg font-black text-white shadow-md sm:rounded-[2rem] sm:text-2xl sm:shadow-xl ${
                  specialist.slug === "nigora-okhunova"
                    ? "h-24 w-20 sm:h-52 sm:w-40 lg:h-64 lg:w-48"
                    : "size-20 sm:size-40 lg:size-48"
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

              <div className="min-w-0 flex-1">
                <div className="hidden flex-wrap items-center gap-1.5 sm:flex sm:gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs ${
                      specialist.status.verified
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                        : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <VerifiedIcon className="size-3.5 sm:size-4" />
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

                <h1 className="mt-2 text-[clamp(1.15rem,5vw,1.6rem)] font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:mt-4 sm:text-5xl sm:tracking-[-0.05em] dark:text-white">
                  {specialist.name}
                </h1>

                <p className="mt-1.5 text-sm font-semibold leading-snug text-emerald-700 sm:mt-3 sm:text-lg dark:text-emerald-400">
                  {specialist.profession}
                </p>
                {specialist.avatarCredit && (
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {labels.imageCredit}: {specialist.avatarSourceUrl ? <a href={specialist.avatarSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-emerald-600">{specialist.avatarCredit}</a> : specialist.avatarCredit}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 dark:text-slate-400 lg:self-end">
              <div className="flex flex-wrap items-center gap-1.5 sm:hidden">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${specialist.status.verified ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300"}`}>
                  <VerifiedIcon className="size-3.5" />
                  {specialist.status.verified ? labels.verified : labels.notVerified}
                </span>
                {specialist.status.premium && <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">{labels.premium}</span>}
                {specialist.status.sponsored && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">{labels.sponsored}</span>}
              </div>
              <p className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-medium">{labels.code}</span>
                <span className="font-mono">{specialist.code}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-4 sm:space-y-8">
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:rounded-[2rem] sm:p-8">
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
                <BrandedText text={specialist.slug === "zafar-usarov" ? (locale === "de" ? "Ich bin Gründer und Entwickler von UzDe. Ich entwickle Webplattformen und biete praxisorientierte Unterstützung bei Unterlagen für Bachelor-, Master- und Promotionsstudiengänge." : "UzDe asoschisi va dasturchisiman. Veb-platformalar ishlab chiqish hamda bakalavr, magistratura va doktorantura hujjatlari bo‘yicha amaliy yo‘naltirish bilan shug‘ullanaman.") : specialist.shortDescription} />
              </p>

              <div className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
                {locationLabel && (
                  <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950 sm:px-5 sm:py-3.5">
                    <LocationIcon className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 sm:text-base">
                      {locationLabel}
                    </p>
                  </div>
                )}

                {specialist.languages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 p-2 dark:border-slate-800 dark:bg-slate-950 sm:p-2.5">
                    {specialist.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-emerald-200/80 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm shadow-emerald-500/10 transition-colors hover:border-emerald-400 hover:bg-emerald-50 dark:border-emerald-800/60 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:bg-slate-800 sm:text-sm"
                      >
                        {labels.languagesMap[language] ?? language.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>

            {specialist.profile && specialist.profile.length > 0 && (
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:rounded-[2rem] sm:p-8">
                <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950 dark:text-white sm:text-2xl">
                  {labels.profile}
                </h2>

                <div className="mt-3 space-y-2 text-sm leading-6 sm:mt-4 sm:space-y-3 sm:text-base sm:leading-7 text-slate-600 dark:text-slate-300">
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
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:rounded-[2rem] sm:p-8">
                <div className="grid gap-4 sm:gap-8 sm:grid-cols-2">
                  {specialist.education && specialist.education.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950 dark:text-white sm:text-xl">
                        {labels.education}
                      </h2>
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600 sm:mt-4 sm:space-y-2 sm:text-base marker:text-emerald-500 dark:text-slate-300 dark:marker:text-emerald-400">
                        {specialist.education.map((item) => (
                          <li key={item} className="leading-6 sm:leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {specialist.memberships && specialist.memberships.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950 dark:text-white sm:text-xl">
                        {specialist.slug === "anvar-shermatov" ? (locale === "de" ? "Organisationen & Tätigkeiten" : "Tashkilotlar va faoliyat") : labels.memberships}
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 sm:mt-4 sm:space-y-3 sm:text-base dark:text-slate-300">
                        {specialist.memberships.map((item) => {
                          const separator = " | https://";
                          const separatorIndex = item.lastIndexOf(separator);
                          const text = separatorIndex === -1 ? item : item.slice(0, separatorIndex);
                          const url = separatorIndex === -1 ? null : item.slice(separatorIndex + 3);
                          const validUrl = url && /^https:\/\/[^\s]+$/.test(url) ? url : null;

                          return (
                            <li key={item} className="leading-6 sm:leading-7">
                              {validUrl ? (
                                <a
                                  href={validUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline decoration-emerald-500/50 underline-offset-4 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-emerald-400"
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
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:rounded-[2rem] sm:p-8">
                <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950 dark:text-white sm:text-2xl">{labels.achievements}</h2>
                <ol className="mt-3 space-y-2 sm:mt-6 sm:space-y-4">
                  {specialist.achievements.map((item, index) => (
                    <li key={`${item.year}-${item.title}-${index}`} className="grid gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/70 p-3.5 text-sm shadow-sm sm:rounded-2xl sm:p-5 sm:text-base transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50/60 hover:shadow-[0_18px_45px_-28px_rgba(5,150,105,0.55)] focus-within:-translate-y-1 focus-within:border-emerald-400 focus-within:bg-emerald-50/60 focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:border-white/[0.08] dark:bg-white/[0.035] dark:hover:border-emerald-400/35 dark:hover:bg-emerald-400/[0.06] dark:focus-within:border-emerald-400/50 dark:focus-within:bg-emerald-400/[0.06] dark:focus-within:ring-offset-slate-900 sm:grid-cols-[7rem_1fr]">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{item.year}</span>
                      <div><p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>{item.award && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.award}</p>}{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex rounded-md text-xs font-bold text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-emerald-400 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-950">{labels.source}</a>}</div>
                    </li>
                  ))}
                </ol>
              </article>
            )}

            {(specialist.services.length > 0 || specialist.categories.length > 0 || specialist.pricingNote) && (
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:rounded-[2rem] sm:p-6">
                <h2 className="text-lg font-bold tracking-[-0.03em] text-slate-950 dark:text-white sm:text-xl">
                  {locale === "de" ? "Tätigkeiten & Leistungen" : "Faoliyat va xizmatlar"}
                </h2>

                {specialist.services.length > 0 && (
                  <ul className="mt-3 space-y-2 sm:mt-4">
                    {specialist.services.map((service) => (
                      <li key={service} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700 dark:text-slate-300 sm:text-base">
                        <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <CheckIcon className="size-3" />
                        </span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {specialist.categories.length > 0 && (
                  <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800 sm:mt-5">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {labels.categories}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {specialist.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                        >
                          {labels.categoriesMap[category]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {specialist.pricingNote && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm dark:border-emerald-500/20 dark:bg-emerald-500/10">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {labels.pricing}
                    </p>
                    <p className="mt-1 leading-6 text-emerald-900 dark:text-emerald-100">
                      {specialist.pricingNote}
                    </p>
                  </div>
                )}
              </article>
            )}
          </div>

          <aside className="min-w-0">
            <div className="space-y-4 sm:space-y-5 lg:sticky lg:top-28">
              {specialist.slug === "zafar-usarov" && <FounderProfilePromo />}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6 transition-[border-color,box-shadow,background-color] duration-300 hover:border-emerald-200 hover:shadow-[0_18px_45px_-30px_rgba(5,150,105,0.45)] motion-reduce:transition-none dark:border-white/[0.08] dark:bg-slate-900 dark:hover:border-emerald-400/20">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white sm:text-xl">
                {isFounder ? (locale === "de" ? "Soziale Netzwerke & Kontakt" : "Ijtimoiy tarmoqlar va bog‘lanish") : specialist.slug === "anvar-shermatov" ? (locale === "de" ? "Kontakt & soziale Netzwerke" : "Bog‘lanish va ijtimoiy tarmoqlar") : isEntrepreneurProfile ? labels.website : labels.contact}
              </h2>

              {!isEntrepreneurProfile && !isFounder && (
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {labels.contactDescription}
                </p>
              )}

              <SpecialistContactLinks contact={specialist.slug === "anvar-shermatov" ? { ...specialist.contact, website: undefined } : specialist.contact} labels={labels} isFounder={isFounder} />
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3 sm:mt-5 sm:pt-4 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {locale === "de" ? "Profil teilen" : "Profilni ulashish"}
                </span>
                <ShareButton title={specialist.name} locale={locale} iconOnly />
              </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
