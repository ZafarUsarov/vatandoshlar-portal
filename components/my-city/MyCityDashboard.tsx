import type {
  ReactNode,
} from "react";

import {
  Link,
} from "@/i18n/navigation";

import type {
  MyCityDashboardData,
} from "@/lib/my-city/my-city-dashboard";

type MyCityDashboardProps = Readonly<{
  data: MyCityDashboardData;
}>;

function SectionShell({
  title,
  description,
  children,
}: Readonly<{
  title: string;
  description: string;
  children: ReactNode;
}>) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

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
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
      {children}
    </div>
  );
}

export default function MyCityDashboard({
  data,
}: MyCityDashboardProps) {
  const {
    context,
    events,
    specialists,
    communities,
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
            "Ihre persönliche lokale Übersicht basiert ausschließlich auf verknüpften, bestätigten Standortdaten.",
          state:
            "Bundesland",
          events:
            "Veranstaltungen in Ihrer Nähe",
          eventsDescription:
            "Veröffentlichte Veranstaltungen, die eindeutig Ihrer Stadt zugeordnet sind.",
          noEvents:
            "Für Ihre Stadt sind aktuell keine eindeutig zugeordneten kommenden Veranstaltungen verfügbar.",
          specialists:
            "Fachkräfte",
          specialistsDescription:
            "Veröffentlichte Fachkräfte mit bestätigter Zuordnung zu Ihrer Stadt.",
          noSpecialists:
            "Für Ihre Stadt sind aktuell keine eindeutig zugeordneten Fachkräfte verfügbar.",
          community:
            "Community",
          communityDescription:
            "Regionale Community-Angebote für Ihr Bundesland.",
          noCommunity:
            "Für Ihr Bundesland ist aktuell keine veröffentlichte regionale Community verfügbar.",
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
            "Lokal dashboard faqat canonical va ishonchli bog‘langan location ma’lumotlaridan foydalanadi.",
          state:
            "Hudud",
          events:
            "Yaqin tadbirlar",
          eventsDescription:
            "Sizning shahringizga ishonchli bog‘langan e’lon qilingan tadbirlar.",
          noEvents:
            "Hozircha shahringizga ishonchli bog‘langan yaqin tadbirlar mavjud emas.",
          specialists:
            "Mutaxassislar",
          specialistsDescription:
            "Sizning shahringizga canonical location orqali bog‘langan mutaxassislar.",
          noSpecialists:
            "Hozircha shahringizga ishonchli bog‘langan mutaxassislar mavjud emas.",
          community:
            "Community",
          communityDescription:
            "Sizning Bundeslandingiz uchun mavjud hududiy hamjamiyatlar.",
          noCommunity:
            "Hozircha hududingiz uchun e’lon qilingan regional community mavjud emas.",
          viewEvent:
            "Tadbirni ochish",
          viewSpecialist:
            "Profilni ochish",
          openCommunity:
            "Communityni ochish",
        };

  if (!location) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
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
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            {copy.eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {locale === "de"
              ? `Meine Stadt — ${location.cityName ?? location.stateName}`
              : `Mening shahrim — ${location.cityName ?? location.stateName}`}
          </h1>

          <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {copy.state}: {location.stateName}
          </p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SectionShell
            title={copy.localInfo}
            description={copy.localInfoDescription}
          >
            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {locale === "de" ? "Stadt" : "Shahar"}
                </dt>
                <dd className="mt-2 font-bold text-slate-950 dark:text-white">
                  {location.cityName ?? "—"}
                </dd>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
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
          >
            {communities.length === 0 ? (
              <EmptyState>
                {copy.noCommunity}
              </EmptyState>
            ) : (
              <div className="space-y-3">
                {communities.slice(0, 3).map(
                  (community) => (
                    <div
                      key={`${community.shortName}-${community.state}`}
                      className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
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
            title={copy.events}
            description={copy.eventsDescription}
          >
            {events.length === 0 ? (
              <EmptyState>
                {copy.noEvents}
              </EmptyState>
            ) : (
              <div className="space-y-3">
                {events.map(
                  (event) => (
                    <article
                      key={event.id}
                      className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
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
                        {copy.viewEvent} →
                      </Link>
                    </article>
                  ),
                )}
              </div>
            )}
          </SectionShell>

          <SectionShell
            title={copy.specialists}
            description={copy.specialistsDescription}
          >
            {specialists.length === 0 ? (
              <EmptyState>
                {copy.noSpecialists}
              </EmptyState>
            ) : (
              <div className="space-y-3">
                {specialists.map(
                  (specialist) => (
                    <article
                      key={specialist.id}
                      className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
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
                        {copy.viewSpecialist} →
                      </Link>
                    </article>
                  ),
                )}
              </div>
            )}
          </SectionShell>
        </div>
      </div>
    </main>
  );
}
