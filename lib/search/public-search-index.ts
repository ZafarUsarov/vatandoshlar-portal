import "server-only";

import { unstable_cache } from "next/cache";
import { getGuideCategories } from "@/data/guide/categories";
import {
  getStaticSearchItems,
  type SearchCategory,
  type SearchLocale,
} from "@/data/searchIndex";
import {
  getPastPublishedEvents,
  getPlanningPublishedEvents,
  getUpcomingPublishedEvents,
} from "@/lib/events/public-events-repository";
import {
  getPublishedGuideArticlesByCategory,
  isPublicGuideCategorySlug,
} from "@/lib/guide/public-guide-repository";
import { getPublishedJobGuides } from "@/lib/jobs/public-jobs-repository";
import { getPublishedNews } from "@/lib/news/public-news-repository";
import { getPublishedServices } from "@/lib/services/public-services-repository";
import { getPublishedSpecialists } from "@/lib/specialists/public-specialists-repository";
import { getPublicTelegramGroups } from "@/lib/telegram/public-telegram-repository";

type SearchableDocument = Readonly<{
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  badge?: string;
  keywords: ReadonlyArray<string>;
  body: ReadonlyArray<string>;
}>;

function clean(values: ReadonlyArray<string | null | undefined>): string[] {
  return values
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);
}

function uniqueById(
  items: ReadonlyArray<SearchableDocument>,
): ReadonlyArray<SearchableDocument> {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

function localizedHref(locale: SearchLocale, path: string): string {
  return `/${locale}${path}`;
}

async function buildPublicSearchIndex(
  locale: SearchLocale,
): Promise<ReadonlyArray<SearchableDocument>> {
  const categories = getGuideCategories(locale).flatMap((category) =>
    isPublicGuideCategorySlug(category.slug)
      ? [{ category, slug: category.slug }]
      : [],
  );

  const [
    news,
    services,
    specialists,
    jobs,
    upcomingEvents,
    planningEvents,
    pastEvents,
    telegramGroups,
    guideGroups,
  ] = await Promise.all([
    getPublishedNews(locale),
    getPublishedServices(locale),
    getPublishedSpecialists(locale),
    getPublishedJobGuides(locale),
    getUpcomingPublishedEvents(locale),
    getPlanningPublishedEvents(locale),
    getPastPublishedEvents(locale),
    getPublicTelegramGroups(locale),
    Promise.all(
      categories.map(async ({ category, slug }) => ({
        category,
        articles: await getPublishedGuideArticlesByCategory(
          slug,
          locale,
        ),
      })),
    ),
  ]);

  const staticPages: SearchableDocument[] = getStaticSearchItems(locale)
    .filter((item) => item.id.startsWith("page-"))
    .map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      href: item.href,
      category: item.category,
      badge: item.badge,
      keywords: item.keywords,
      body: [],
    }));

  const newsDocuments: SearchableDocument[] = news.map((article) => ({
    id: `news-${article.id}`,
    title: article.title,
    description: article.excerpt,
    href: localizedHref(locale, `/news/${article.slug}`),
    category: "Yangilik",
    badge: article.category,
    keywords: clean([
      article.category,
      article.contentType,
      article.readingTime,
      article.sourceName,
      article.sourceLanguage,
      article.location,
    ]),
    body: clean(article.content),
  }));

  const serviceDocuments: SearchableDocument[] = services.map((service) => ({
    id: `service-${service.id}`,
    title: service.title,
    description: service.description,
    href: localizedHref(locale, `/services/${service.slug}`),
    category: "Xizmat",
    badge: service.category,
    keywords: clean([
      service.shortTitle,
      service.category,
      ...service.services,
      service.officialSourceName,
      service.sourceDescription,
      service.location,
    ]),
    body: [],
  }));

  const specialistDocuments: SearchableDocument[] = specialists.map(
    (specialist) => ({
      id: `specialist-${specialist.id}`,
      title: specialist.name,
      description: specialist.shortDescription,
      href: localizedHref(locale, `/specialists/${specialist.slug}`),
      category: "Mutaxassis",
      badge: specialist.profession,
      keywords: clean([
        specialist.code,
        specialist.profession,
        ...specialist.services,
        ...specialist.categories,
        ...specialist.languages,
        specialist.location?.city,
        specialist.location?.bundesland,
        specialist.serviceArea,
        specialist.pricingNote,
      ]),
      body: [],
    }),
  );

  const jobDocuments: SearchableDocument[] = jobs.map((guide) => ({
    id: `job-guide-${guide.id}`,
    title: guide.title,
    description: guide.description,
    href: localizedHref(locale, `/jobs/${guide.slug}`),
    category: "Ish",
    badge: guide.category,
    keywords: clean([
      guide.shortTitle,
      guide.category,
      guide.audience,
      ...guide.searchKeywords,
      ...guide.highlights,
      guide.officialSourceName,
      guide.sourceDescription,
    ]),
    body: [],
  }));

  const eventMap = new Map(
    [...upcomingEvents, ...planningEvents, ...pastEvents].map((event) => [
      event.slug,
      event,
    ]),
  );

  const eventDocuments: SearchableDocument[] = [...eventMap.values()].map(
    (event) => {
      const city = "city" in event ? event.city : undefined;
      const bundesland =
        "bundesland" in event ? event.bundesland : undefined;
      const venueName = "venueName" in event ? event.venueName : undefined;
      const address = "address" in event ? event.address : undefined;
      const officialSourceName =
        "officialSourceName" in event ? event.officialSourceName : undefined;

      return {
        id: `event-${event.id}`,
        title: event.title,
        description: event.excerpt,
        href: localizedHref(locale, `/events/${event.slug}`),
        category: "Tadbir",
        badge: event.category,
        keywords: clean([
          event.category,
          event.format,
          city,
          bundesland,
          venueName,
          address,
          event.organizerName,
          ...event.languages,
          event.priceLabel,
          officialSourceName,
        ]),
        body: clean([...event.description, ...event.importantNotes]),
      };
    },
  );

  const telegramDocuments: SearchableDocument[] = telegramGroups.map(
    (group) => ({
      id: `telegram-${group.shortName}`,
      title: group.state,
      description: group.description,
      href: localizedHref(locale, "/telegram"),
      category: "Telegram",
      badge: group.statusLabel,
      keywords: clean([
        group.shortName,
        group.statusLabel,
        group.button,
        "Telegram",
      ]),
      body: [],
    }),
  );

  const guideDocuments: SearchableDocument[] = guideGroups.flatMap(
    ({ category, articles }) =>
      articles.map((article) => ({
        id: `guide-article-${article.id}`,
        title: article.title,
        description: article.excerpt,
        href: localizedHref(
          locale,
          `/guide/${category.slug}/${article.slug}`,
        ),
        category: "Qo‘llanma" as const,
        badge: category.title,
        keywords: clean([
          article.readingTime,
          category.title,
          ...article.facts.flatMap((fact) => [fact.label, fact.value]),
          ...article.steps.flatMap((step) => [step.title, step.description]),
          ...article.faq.flatMap((item) => [item.question, item.answer]),
        ]),
        body: clean([
          article.intro,
          ...Object.values(article.sections).flatMap((section) =>
            section
              ? [section.title, ...section.paragraphs, ...section.items]
              : [],
          ),
        ]),
      })),
  );

  return uniqueById([
    ...staticPages,
    ...newsDocuments,
    ...serviceDocuments,
    ...specialistDocuments,
    ...jobDocuments,
    ...telegramDocuments,
    ...eventDocuments,
    ...guideDocuments,
  ]);
}

const getPublicSearchIndexCached = unstable_cache(
  async (locale: SearchLocale) => buildPublicSearchIndex(locale),
  ["public-search-index-v1"],
  { revalidate: 60 },
);

export async function getPublicSearchIndex(
  locale: SearchLocale,
): Promise<ReadonlyArray<SearchableDocument>> {
  return getPublicSearchIndexCached(locale);
}

export type { SearchableDocument };
