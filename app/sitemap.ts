import type { MetadataRoute } from "next";

import { getGuideCategories } from "@/data/guide/categories";
import {
  getPastPublishedEvents,
  getUpcomingPublishedEvents,
} from "@/lib/events/public-events-repository";
import {
  getPublishedGuideArticlesByCategory,
  isPublicGuideCategorySlug,
} from "@/lib/guide/public-guide-repository";
import {
  getPublishedJobGuides,
} from "@/lib/jobs/public-jobs-repository";
import {
  getPublishedNews,
} from "@/lib/news/public-news-repository";
import {
  getPublishedServices,
} from "@/lib/services/public-services-repository";
import {
  getPublishedSpecialists,
} from "@/lib/specialists/public-specialists-repository";

const baseUrl =
  "https://vatandoshlar.de";

const locales = [
  "uz",
  "de",
] as const;

function createLocalizedEntries(
  pathname: string,
  options?: Readonly<{
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  }>,
): MetadataRoute.Sitemap {
  return locales.map(
    (locale) => ({
      url:
        `${baseUrl}/${locale}${pathname}`,
      changeFrequency:
        options?.changeFrequency,
      priority:
        options?.priority,
      alternates: {
        languages: {
          uz:
            `${baseUrl}/uz${pathname}`,
          de:
            `${baseUrl}/de${pathname}`,
        },
      },
    }),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    news,
    jobs,
    services,
    specialists,
    upcomingEvents,
    pastEvents,
  ] = await Promise.all([
    getPublishedNews("uz"),
    getPublishedJobGuides("uz"),
    getPublishedServices("uz"),
    getPublishedSpecialists("uz"),
    getUpcomingPublishedEvents("uz"),
    getPastPublishedEvents("uz"),
  ]);

  const eventsBySlug =
    new Map(
      [
        ...upcomingEvents,
        ...pastEvents,
      ].map(
        (event) => [
          event.slug,
          event,
        ],
      ),
    );

  const guideCategories =
    getGuideCategories("uz").filter(
      (category) =>
        isPublicGuideCategorySlug(
          category.slug,
        ),
    );

  const guideArticleGroups =
    await Promise.all(
      guideCategories.map(
        async (category) => {
          if (
            !isPublicGuideCategorySlug(
              category.slug,
            )
          ) {
            return [];
          }

          return getPublishedGuideArticlesByCategory(
            category.slug,
            "uz",
          );
        },
      ),
    );

  const entries: MetadataRoute.Sitemap = [
    ...createLocalizedEntries(
      "",
      {
        changeFrequency:
          "daily",
        priority: 1,
      },
    ),

    ...createLocalizedEntries(
      "/news",
      {
        changeFrequency:
          "daily",
        priority: 0.9,
      },
    ),

    ...createLocalizedEntries(
      "/services",
      {
        changeFrequency:
          "weekly",
        priority: 0.8,
      },
    ),

    ...createLocalizedEntries(
      "/specialists",
      {
        changeFrequency:
          "weekly",
        priority: 0.8,
      },
    ),

    ...createLocalizedEntries(
      "/jobs",
      {
        changeFrequency:
          "weekly",
        priority: 0.8,
      },
    ),

    ...createLocalizedEntries(
      "/telegram",
      {
        changeFrequency:
          "weekly",
        priority: 0.7,
      },
    ),

    ...createLocalizedEntries(
      "/events",
      {
        changeFrequency:
          "daily",
        priority: 0.8,
      },
    ),

    ...createLocalizedEntries(
      "/guide",
      {
        changeFrequency:
          "weekly",
        priority: 0.9,
      },
    ),

    ...createLocalizedEntries(
      "/support",
      {
        changeFrequency:
          "monthly",
        priority: 0.4,
      },
    ),

    ...createLocalizedEntries(
      "/about/founder",
      {
        changeFrequency:
          "monthly",
        priority: 0.5,
      },
    ),
  ];

  for (
    const article
    of news
  ) {
    entries.push(
      ...createLocalizedEntries(
        `/news/${article.slug}`,
        {
          changeFrequency:
            "weekly",
          priority: 0.8,
        },
      ),
    );
  }

  for (
    const guide
    of jobs
  ) {
    entries.push(
      ...createLocalizedEntries(
        `/jobs/${guide.slug}`,
        {
          changeFrequency:
            "weekly",
          priority: 0.7,
        },
      ),
    );
  }

  for (
    const service
    of services
  ) {
    entries.push(
      ...createLocalizedEntries(
        `/services/${service.slug}`,
        {
          changeFrequency:
            "weekly",
          priority: 0.7,
        },
      ),
    );
  }

  for (
    const specialist
    of specialists
  ) {
    entries.push(
      ...createLocalizedEntries(
        `/specialists/${specialist.slug}`,
        {
          changeFrequency:
            "weekly",
          priority: 0.7,
        },
      ),
    );
  }

  for (
    const event
    of eventsBySlug.values()
  ) {
    entries.push(
      ...createLocalizedEntries(
        `/events/${event.slug}`,
        {
          changeFrequency:
            "daily",
          priority: 0.7,
        },
      ),
    );
  }

  for (
    const category
    of guideCategories
  ) {
    entries.push(
      ...createLocalizedEntries(
        `/guide/${category.slug}`,
        {
          changeFrequency:
            "weekly",
          priority: 0.8,
        },
      ),
    );
  }

  for (
    let index = 0;
    index <
    guideCategories.length;
    index += 1
  ) {
    const category =
      guideCategories[index];

    const articles =
      guideArticleGroups[index] ??
      [];

    for (
      const article
      of articles
    ) {
      entries.push(
        ...createLocalizedEntries(
          `/guide/${category.slug}/${article.slug}`,
          {
            changeFrequency:
              "monthly",
            priority: 0.7,
          },
        ),
      );
    }
  }

  return entries;
}