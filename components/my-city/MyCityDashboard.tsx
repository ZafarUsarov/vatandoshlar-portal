import type {
  ReactNode,
} from "react";

import {
  Link,
} from "@/i18n/navigation";

import MyCityNavigation from "@/components/my-city/MyCityNavigation";

import type {
  MyCityDashboardData,
} from "@/lib/my-city/my-city-dashboard";

type MyCityDashboardProps = Readonly<{
  data: MyCityDashboardData;
}>;

function SectionShell({
  title,
  description,
  badge,
  children,
}: Readonly<{
  title: string;
  description: string;
  badge: string;
  children: ReactNode;
}>) {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-900/[0.04] backdrop-blur-sm transition-shadow duration-200 hover:shadow-xl motion-reduce:transition-none dark:border-slate-800/90 dark:bg-slate-900/90 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>

        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
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
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300/90 bg-slate-50/80 px-4 py-5 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
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
      <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
          <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/10" />
        </div>
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
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 sm:py-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -left-32 top-[38rem] h-80 w-80 rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-500/[0.08]" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl dark:bg-cyan-500/[0.08]" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 sm:mb-5">
          <MyCityNavigation locale={locale} />
        </div>
        <header className="relative overflow-hidden rounded-[2rem] border border-emerald-100/90 bg-white/90 p-6 shadow-2xl shadow-slate-900/[0.06] backdrop-blur-sm dark:border-emerald-950 dark:bg-slate-900/90 sm:p-8">
          <div aria-hidden="true" className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl from-emerald-100/70 to-transparent dark:from-emerald-900/20" />
          <p className="relative text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {copy.eyebrow}
          </p>

          <h1 className="relative mt-4 text-3xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl">
            {locale === "de"
              ? `Meine Stadt — ${location.cityName ?? location.stateName}`
              : `Mening shahrim — ${location.cityName ?? location.stateName}`}
          </h1>

          <p className="relative mt-3 inline-flex rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1.5 text-sm font-semibold text-emerald-800 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-200">
            {copy.state}: {location.stateName}
          </p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SectionShell
            title={copy.localInfo}
            description={copy.localInfoDescription}
            badge={copy.cityBadge}
          >
            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {locale === "de" ? "Stadt" : "Shahar"}
                </dt>
                <dd className="mt-2 font-bold text-slate-950 dark:text-white">
                  {location.cityName ?? "—"}
                </dd>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {copy.state}
                </dt>
                <dd className="mt-2 font-bold text-slate-950 dark:text-white">
                  {location.stateName}
                </dd>
              </div>
            </dl>
          </SectionShell>

          <SectionShell
            title={copy.community}
            description={copy.communityDescription}
            badge={copy.regionBadge}
          >
            {region.communities.length === 0 ? (
              <EmptyState>
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
            title={copy.cityEvents}
            description={copy.cityEventsDescription}
            badge={copy.cityBadge}
          >
            {city.events.length === 0 ? (
              <EmptyState>
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
            title={copy.citySpecialists}
            description={copy.citySpecialistsDescription}
            badge={copy.cityBadge}
          >
            {city.specialists.length === 0 ? (
              <EmptyState>
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
          >
            {region.events.length === 0 ? (
              <EmptyState>
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
          >
            {region.specialists.length === 0 ? (
              <EmptyState>
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
          >
            <EmptyState>
              {copy.editorialEmpty}
            </EmptyState>
          </SectionShell>
        </div>
      </div>
    </main>
  );
}
