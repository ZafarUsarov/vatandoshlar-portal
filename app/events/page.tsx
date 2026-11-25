import EventsCommunityAnimation from "../../components/events/EventsCommunityAnimation";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import UzDeTalksSection from "../../components/events/talks/UzDeTalksSection";
import EventsExplorer from "../../components/events/EventsExplorer";
import { toEventItem, toPlanningEventItem } from "../../lib/events/event-presenter";
import { getUpcomingPublishedEvents, getPlanningPublishedEvents, getPastPublishedEvents } from "../../lib/events/public-events-repository";
import type { SupportedEventLocale } from "../../types/event";

const interTight = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "uz" ? "Tadbirlar | UzDe" : "Veranstaltungen | UzDe",
    description: locale === "uz" ? "Germaniyadagi o‘zbekistonliklar uchun e’lon qilingan tadbirlar va kelajak uchun rejalashtirilayotgan hamjamiyat tadbirlari." : "Veröffentlichte Veranstaltungen und geplante Community-Veranstaltungen für Usbeken in Deutschland.",
    alternates: { canonical: `/${locale}/events`, languages: { uz: "/uz/events", de: "/de/events" } },
  };
}

export default async function EventsPage() {
  const locale = (await getLocale()) as SupportedEventLocale;
  const uz = locale === "uz";
  const [upcoming, planning, past] = await Promise.all([getUpcomingPublishedEvents(locale), getPlanningPublishedEvents(locale), getPastPublishedEvents(locale)]);
  return (
    <>
      <Header />
      <div className="uzde-home-frame bg-[var(--uzde-page-bg)]">
      <main className="min-h-screen bg-[var(--uzde-page-bg)] pt-20 text-zinc-950 dark:text-white">
        <header className="mx-auto max-w-7xl px-5 pb-5 pt-4 text-center sm:px-8 sm:pb-8 sm:pt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-[#55d6c5]">{uz ? "Germaniyadagi tadbirlar" : "Veranstaltungen in Deutschland"}</p>
          <h1 className={`${interTight.className} mx-auto mt-3 max-w-4xl text-3xl sm:mt-4 sm:text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.08] [text-wrap:balance]`}>{uz ? "Uçraşuvlar. Imkoniyatlar. Yangi aloqalar." : "Begegnungen. Chancen. Neue Kontakte."}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 text-zinc-600 dark:text-zinc-400">{uz ? "Germaniyadagi vatandoşlarni birlaştiruvçi tadbirlar va uçraşuvlar." : "Veranstaltungen und Begegnungen, die die usbekische Community in Deutschland verbinden."}</p>
        </header>
        <EventsCommunityAnimation locale={locale} />
        <div className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)] pb-5 sm:pb-10">
          <EventsExplorer locale={locale} upcoming={upcoming.map(e => toEventItem(e, locale))} planning={planning.map(e => toPlanningEventItem(e, locale))} past={past.map(e => toEventItem(e, locale))} />
          <aside className="border-t border-slate-200 py-4 sm:py-8 text-sm leading-6 text-slate-600 dark:border-zinc-800 dark:text-[#b6bbc4]"><strong className="text-slate-950 dark:text-white">{uz ? "Muhim eslatma: " : "Wichtiger Hinweis: "}</strong>{uz ? "Yölga çiqişdan oldin rasmiy manbani tekşiring. Taşkilotçi sana, manzil yoki dasturni özgartirişi mumkin." : "Prüfen Sie vor der Anreise die offizielle Quelle. Veranstalter können Termin, Ort oder Programm ändern."}</aside>
          <UzDeTalksSection locale={locale} headingClassName={interTight.className} />
        </div>
      </main>
      <SectionPromo target="home" variant="compact" continuous />
      <Footer continuous />
      </div>
    </>
  );
}
