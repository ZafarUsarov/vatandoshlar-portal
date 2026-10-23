import MyCityMapLoader from "./MyCityMapLoader";
import type {
  ReactNode,
} from "react";

import {
  Link,
} from "@/i18n/navigation";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  UsersRound,
} from "lucide-react";

import MyCityNavigation from "@/components/my-city/MyCityNavigation";

import type {
  MyCityDashboardData,
} from "@/lib/my-city/my-city-dashboard";

type MyCityDashboardProps = Readonly<{
  data: MyCityDashboardData;
}>;

type SectionTone = "mint" | "cyan" | "violet";

const sectionToneClasses: Record<SectionTone, { shell: string; badge: string; empty: string }> = {
  mint: {
    shell: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
    badge: "border-emerald-200/80 bg-emerald-50/90 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
    empty: "border-emerald-200/80 bg-emerald-50/55 dark:border-emerald-900/60 dark:bg-emerald-950/20",
  },
  cyan: {
    shell: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
    badge: "border-cyan-200/80 bg-cyan-50/90 text-cyan-700 dark:border-cyan-900/70 dark:bg-cyan-950/40 dark:text-cyan-300",
    empty: "border-cyan-200/80 bg-cyan-50/55 dark:border-cyan-900/60 dark:bg-cyan-950/20",
  },
  violet: {
    shell: "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
    badge: "border-violet-200/80 bg-violet-50/90 text-violet-700 dark:border-violet-900/70 dark:bg-violet-950/40 dark:text-violet-300",
    empty: "border-violet-200/80 bg-violet-50/50 dark:border-violet-900/60 dark:bg-violet-950/20",
  },
};

function SectionShell({
  id,
  title,
  description,
  badge,
  tone = "mint",
  children,
}: Readonly<{
  id?: string;
  title: string;
  description: string;
  badge: string;
  tone?: SectionTone;
  children: ReactNode;
}>) {
  const classes = sectionToneClasses[tone];

  return (
    <section id={id} className={`scroll-mt-28 rounded-2xl border p-5 shadow-sm shadow-slate-900/[0.035] sm:p-6 ${classes.shell}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${classes.badge}`}>
          {badge}
        </span>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function EmptyState({
  children,
  tone = "mint",
}: Readonly<{
  children: ReactNode;
  tone?: SectionTone;
}>) {
  return (
    <div className={`rounded-2xl border border-dashed px-4 py-5 text-sm leading-6 text-slate-600 dark:text-slate-400 ${sectionToneClasses[tone].empty}`}>
      {children}
    </div>
  );
}

function EventList({
  events,
  openLabel,
}: Readonly<{
  events: MyCityDashboardData["city"]["events"];
  openLabel: string;
}>) {
  return (
    <div className="space-y-3">
      {events.map(
        (event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-slate-200/90 bg-white/70 p-4 transition duration-150 hover:border-emerald-200 hover:shadow-sm motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-950/20 dark:hover:border-emerald-900"
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              {event.startDate}
            </p>

            <h3 className="mt-2 font-black text-slate-950 dark:text-white">
              {event.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {event.excerpt}
            </p>

            <Link
              href={`/events/${event.slug}`}
              className="mt-3 inline-flex text-sm font-bold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300"
            >
              {openLabel} →
            </Link>
          </article>
        ),
      )}
    </div>
  );
}

function SpecialistList({
  specialists,
  openLabel,
}: Readonly<{
  specialists: MyCityDashboardData["city"]["specialists"];
  openLabel: string;
}>) {
  return (
    <div className="space-y-3">
      {specialists.map(
        (specialist) => (
          <article
            key={specialist.id}
            className="rounded-2xl border border-slate-200/90 bg-white/70 p-4 transition duration-150 hover:border-emerald-200 hover:shadow-sm motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-950/20 dark:hover:border-emerald-900"
          >
            <h3 className="font-black text-slate-950 dark:text-white">
              {specialist.name}
            </h3>

            <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {specialist.profession}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {specialist.shortDescription}
            </p>

            <Link
              href={`/specialists/${specialist.slug}`}
              className="mt-3 inline-flex text-sm font-bold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300"
            >
              {openLabel} →
            </Link>
          </article>
        ),
      )}
    </div>
  );
}

export default function MyCityDashboard({
  data,
}: MyCityDashboardProps) {
  const {
    context,
    city,
    region,
  } = data;

  const locale =
    context.locale;

  const location =
    context.homeLocation;

  const copy =
    locale === "de"
      ? {
          eyebrow:
            "MEINE STADT",
          noCityTitle:
            "Wählen Sie Ihre Stadt aus",
          noCityDescription:
            "Hinterlegen Sie Ihre Stadt in Ihrem Vatandoshlar-ID-Profil. Danach können lokale Inhalte hier angezeigt werden.",
          chooseCity:
            "Stadt auswählen",
          localInfo:
            "Lokale Übersicht",
          localInfoDescription:
            "Ihre Übersicht basiert ausschließlich auf kanonisch verknüpften Standortdaten.",
          cityBadge:
            "Stadt",
          regionBadge:
            "Bundesland",
          state:
            "Bundesland",
          cityEvents:
            "Veranstaltungen in Ihrer Stadt",
          cityEventsDescription:
            "Veröffentlichte Veranstaltungen mit eindeutiger Zuordnung zu Ihrer Stadt.",
          noCityEvents:
            "Für Ihre Stadt sind aktuell keine eindeutig zugeordneten kommenden Veranstaltungen verfügbar.",
          citySpecialists:
            "Fachkräfte in Ihrer Stadt",
          citySpecialistsDescription:
            "Veröffentlichte Fachkräfte mit eindeutiger Zuordnung zu Ihrer Stadt.",
          noCitySpecialists:
            "Für Ihre Stadt sind aktuell keine eindeutig zugeordneten Fachkräfte verfügbar.",
          regionEvents:
            "Veranstaltungen im Bundesland",
          regionEventsDescription:
            "Veröffentlichte Veranstaltungen, die kanonisch Ihrem Bundesland zugeordnet sind.",
          noRegionEvents:
            "Für Ihr Bundesland sind aktuell keine eindeutig zugeordneten kommenden Veranstaltungen verfügbar.",
          regionSpecialists:
            "Fachkräfte im Bundesland",
          regionSpecialistsDescription:
            "Veröffentlichte Fachkräfte mit kanonischer Zuordnung zu Ihrem Bundesland.",
          noRegionSpecialists:
            "Für Ihr Bundesland sind aktuell keine eindeutig zugeordneten Fachkräfte verfügbar.",
          community:
            "Regionale Community",
          communityDescription:
            "Veröffentlichte Community-Angebote für Ihr Bundesland.",
          noCommunity:
            "Für Ihr Bundesland ist aktuell keine veröffentlichte regionale Community verfügbar.",
          editorial:
            "Lokale News & Ratgeber",
          editorialDescription:
            "News und Guide-Inhalte werden erst angezeigt, wenn dafür eine kanonische Standort-Zuordnung vorhanden ist.",
          editorialEmpty:
            "Aktuell gibt es noch keine kanonisch zugeordneten lokalen News oder Ratgeber. Andere Regionen werden nicht als Ersatz angezeigt.",
          viewEvent:
            "Veranstaltung öffnen",
          viewSpecialist:
            "Profil öffnen",
          openCommunity:
            "Community öffnen",
        }
      : {
          eyebrow:
            "MENING SHAHRIM",
          noCityTitle:
            "Shahringizni tanlang",
          noCityDescription:
            "Vatandoshlar ID profilingizda yashayotgan shahringizni tanlang. Shundan keyin lokal ma’lumotlar shu yerda ko‘rinadi.",
          chooseCity:
            "Shahringizni tanlang",
          localInfo:
            "Mahalliy ma’lumotlar",
          localInfoDescription:
            "Dashboard faqat canonical va ishonchli bog‘langan location ma’lumotlaridan foydalanadi.",
          cityBadge:
            "Shahar",
          regionBadge:
            "Bundesland",
          state:
            "Hudud",
          cityEvents:
            "Shahardagi tadbirlar",
          cityEventsDescription:
            "Aynan sizning shahringizga canonical location orqali bog‘langan tadbirlar.",
          noCityEvents:
            "Hozircha shahringizga ishonchli bog‘langan yaqin tadbirlar mavjud emas.",
          citySpecialists:
            "Shahardagi mutaxassislar",
          citySpecialistsDescription:
            "Aynan sizning shahringizga canonical location orqali bog‘langan mutaxassislar.",
          noCitySpecialists:
            "Hozircha shahringizga ishonchli bog‘langan mutaxassislar mavjud emas.",
          regionEvents:
            "Bundesland bo‘yicha tadbirlar",
          regionEventsDescription:
            "Sizning Bundeslandingizga canonical location orqali bog‘langan tadbirlar.",
          noRegionEvents:
            "Hozircha Bundeslandingizga ishonchli bog‘langan yaqin tadbirlar mavjud emas.",
          regionSpecialists:
            "Bundesland bo‘yicha mutaxassislar",
          regionSpecialistsDescription:
            "Sizning Bundeslandingizga canonical location orqali bog‘langan mutaxassislar.",
          noRegionSpecialists:
            "Hozircha Bundeslandingizga ishonchli bog‘langan mutaxassislar mavjud emas.",
          community:
            "Regional Community",
          communityDescription:
            "Sizning Bundeslandingiz uchun e’lon qilingan hududiy communitylar.",
          noCommunity:
            "Hozircha hududingiz uchun e’lon qilingan regional community mavjud emas.",
          editorial:
            "Mahalliy yangilik va qo‘llanmalar",
          editorialDescription:
            "News va Guide kontenti faqat canonical location mapping mavjud bo‘lganda lokal dashboardga qo‘shiladi.",
          editorialEmpty:
            "Hozircha canonical location bilan bog‘langan mahalliy yangilik yoki qo‘llanma yo‘q. Boshqa hudud kontenti o‘rniga chiqarilmaydi.",
          viewEvent:
            "Tadbirni ochish",
          viewSpecialist:
            "Profilni ochish",
          openCommunity:
            "Communityni ochish",
        };

  if (!location) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 dark:bg-slate-950 sm:px-6 sm:py-10">
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-4 sm:mb-5">
            <MyCityNavigation locale={locale} />
          </div>
          <div className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-900/8 backdrop-blur-sm dark:border-slate-800/90 dark:bg-slate-900/90 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
              {copy.eyebrow}
            </p>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              {copy.noCityTitle}
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              {copy.noCityDescription}
            </p>

            <Link
              href="/account/profile"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-500"
            >
              {copy.chooseCity}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 dark:bg-slate-950 sm:px-6 sm:py-10">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 sm:mb-5">
          <MyCityNavigation locale={locale} />
        </div>
        <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                {copy.eyebrow}
              </p>

              <h1 className="mt-4 break-words text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                {location.cityName ?? location.stateName}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={16} aria-hidden="true" />
                {location.stateName}, {location.countryCode === "DE" ? (locale === "de" ? "Deutschland" : "Germaniya") : location.countryCode}
              </p>

              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300">
                {locale === "de"
                  ? "Entdecken Sie Communities, Veranstaltungen und Fachkräfte in Ihrer Stadt und Region."
                  : "Shahringiz va hududingizdagi hamjamiyatlar, tadbirlar hamda mutaxassislarni bir joyda toping."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/account/profile"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {locale === "de" ? "Stadt ändern" : "Shaharni o‘zgartirish"}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>

              </div>
            </div>

            <div
              id="my-city-map"
              className="scroll-mt-28 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50 sm:p-6 lg:flex lg:flex-col lg:justify-center lg:border-l lg:border-t-0"
            >
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                  {locale === "de" ? "Ihre Stadt auf der Karte" : "Shahringiz xaritada"}
                </p>
                <h2 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {location.cityName ?? location.stateName}
                </h2>
              </div>

              {location.latitude !== null &&
              location.longitude !== null &&
              Number.isFinite(Number(location.latitude)) &&
              Number.isFinite(Number(location.longitude)) ? (
                <MyCityMapLoader
                  cityName={location.cityName ?? location.stateName}
                  stateName={location.stateName}
                  latitude={Number(location.latitude)}
                  longitude={Number(location.longitude)}
                  locale={locale}
                />
              ) : (
                <EmptyState>
                  {locale === "de"
                    ? "Für diesen Standort sind noch keine Kartenkoordinaten verfügbar."
                    : "Bu hudud uchun xarita koordinatalari hozircha mavjud emas."}
                </EmptyState>
              )}
            </div>
          </div>
        </header>

        <section
          aria-labelledby="my-city-opportunities"
          className="mt-8"
        >
          <div className="mb-5">
            <h2
              id="my-city-opportunities"
              className="text-2xl font-black tracking-tight text-slate-950 dark:text-white"
            >
              {locale === "de"
                ? "Möglichkeiten in Ihrer Stadt"
                : "Shahringizdagi imkoniyatlar"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {locale === "de"
                ? "Entdecken Sie verfügbare Angebote in Ihrer Stadt und Region."
                : "Shahringiz va hududingizdagi mavjud imkoniyatlarni kashf eting."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                id: "my-city-community",
                Icon: UsersRound,
                title: locale === "de" ? "Community" : "Hamjamiyatlar",
                description: region.communities.length > 0
                  ? locale === "de" ? "Regionale Gruppen ansehen" : "Hududiy guruhlarni ko‘rish"
                  : locale === "de" ? "Keine regionalen Gruppen" : "Hozircha guruhlar yo‘q",
              },
              {
                id: "my-city-events",
                Icon: CalendarDays,
                title: locale === "de" ? "Veranstaltungen" : "Tadbirlar",
                description: city.events.length > 0
                  ? locale === "de" ? "Kommende Veranstaltungen" : "Yaqin tadbirlarni ko‘rish"
                  : locale === "de" ? "Keine lokalen Veranstaltungen" : "Hozircha tadbirlar yo‘q",
              },
              {
                id: "my-city-specialists",
                Icon: BriefcaseBusiness,
                title: locale === "de" ? "Fachkräfte" : "Mutaxassislar",
                description: city.specialists.length > 0
                  ? locale === "de" ? "Lokale Fachkräfte ansehen" : "Mahalliy mutaxassislar"
                  : locale === "de" ? "Keine lokalen Fachkräfte" : "Hozircha mutaxassis yo‘q",
              },
            ].map(({ id, Icon, title, description }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex min-h-28 items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900/85 dark:hover:border-emerald-700"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-slate-950 dark:text-white">
                    {title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {description}
                  </span>
                </span>
              </a>
            ))}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location.latitude !== null && location.longitude !== null &&
                Number.isFinite(Number(location.latitude)) && Number.isFinite(Number(location.longitude))
                  ? `Moschee near ${location.latitude},${location.longitude}`
                  : `Moschee near ${location.cityName ?? location.stateName}, Germany`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-28 items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 transition hover:border-emerald-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-emerald-700"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                <span aria-hidden="true" className="text-2xl leading-none">🕌</span>
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {locale === "de" ? "Moscheen" : "Masjidlar"}
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {locale === "de"
                    ? "Moscheen in Google Maps finden ↗"
                    : "Google Maps orqali masjidlarni topish ↗"}
                </p>
              </div>
            </a>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">


          <SectionShell
            id="my-city-community"
              title={copy.community}
            description={copy.communityDescription}
            badge={copy.regionBadge}
            tone="cyan"
          >
            {region.communities.length === 0 ? (
              <EmptyState tone="cyan">
                {copy.noCommunity}
              </EmptyState>
            ) : (
              <div className="space-y-3">
                {region.communities.slice(0, 3).map(
                  (community) => (
                    <div
                      key={`${community.shortName}-${community.state}`}
                      className="rounded-2xl border border-slate-200/90 bg-white/70 p-4 transition duration-150 hover:border-emerald-200 hover:shadow-sm motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-950/20 dark:hover:border-emerald-900"
                    >
                      <p className="font-bold text-slate-950 dark:text-white">
                        {community.state}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {community.description}
                      </p>

                      {community.href && (
                        <a
                          href={community.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-bold text-emerald-700 hover:text-emerald-600 dark:text-emerald-300"
                        >
                          {copy.openCommunity} →
                        </a>
                      )}
                    </div>
                  ),
                )}
              </div>
            )}
          </SectionShell>

          <SectionShell
            id="my-city-events"
              title={copy.cityEvents}
            description={copy.cityEventsDescription}
            badge={copy.cityBadge}
            tone="violet"
          >
            {city.events.length === 0 ? (
              <EmptyState tone="violet">
                {copy.noCityEvents}
              </EmptyState>
            ) : (
              <EventList
                events={city.events}
                openLabel={copy.viewEvent}
              />
            )}
          </SectionShell>

          <SectionShell
            id="my-city-specialists"
              title={copy.citySpecialists}
            description={copy.citySpecialistsDescription}
            badge={copy.cityBadge}
            tone="mint"
          >
            {city.specialists.length === 0 ? (
              <EmptyState tone="mint">
                {copy.noCitySpecialists}
              </EmptyState>
            ) : (
              <SpecialistList
                specialists={city.specialists}
                openLabel={copy.viewSpecialist}
              />
            )}
          </SectionShell>

          <SectionShell
            title={copy.regionEvents}
            description={copy.regionEventsDescription}
            badge={copy.regionBadge}
            tone="cyan"
          >
            {region.events.length === 0 ? (
              <EmptyState tone="cyan">
                {copy.noRegionEvents}
              </EmptyState>
            ) : (
              <EventList
                events={region.events}
                openLabel={copy.viewEvent}
              />
            )}
          </SectionShell>

          <SectionShell
            title={copy.regionSpecialists}
            description={copy.regionSpecialistsDescription}
            badge={copy.regionBadge}
            tone="mint"
          >
            {region.specialists.length === 0 ? (
              <EmptyState tone="mint">
                {copy.noRegionSpecialists}
              </EmptyState>
            ) : (
              <SpecialistList
                specialists={region.specialists}
                openLabel={copy.viewSpecialist}
              />
            )}
          </SectionShell>

          <SectionShell
            title={copy.editorial}
            description={copy.editorialDescription}
            badge={copy.regionBadge}
            tone="violet"
          >
            <EmptyState tone="violet">
              {copy.editorialEmpty}
            </EmptyState>
          </SectionShell>
        </div>
      </div>
    </main>
  );
}
