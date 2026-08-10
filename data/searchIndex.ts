import {
  getJobGuides,
  type SupportedJobLocale,
} from "./jobs";
import { getGuideArticlesByCategory } from "./guide/articles";
import { getGuideCategories } from "./guide/categories";
import {
  localizeSpecialist,
  specialists,
} from "./specialists";

export type SearchLocale = SupportedJobLocale;

export type SearchCategory =
  | "Sahifa"
  | "Yangilik"
  | "Xizmat"
  | "Mutaxassis"
  | "Ish"
  | "Ish platformasi"
  | "Telegram"
  | "Tadbir"
  | "Qo‘llanma";

export type GlobalSearchItem = Readonly<{
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords: ReadonlyArray<string>;
  badge?: string;
}>;

type LocalizedSearchCopy = Readonly<{
  title: string;
  description: string;
  badge: string;
  keywords: ReadonlyArray<string>;
}>;

type StaticSearchDefinition = Readonly<{
  id: string;
  path: string;
  category: SearchCategory;
  content: Readonly<Record<SearchLocale, LocalizedSearchCopy>>;
}>;

const staticSearchDefinitions: ReadonlyArray<StaticSearchDefinition> = [
  {
    id: "page-home",
    path: "",
    category: "Sahifa",
    content: {
      uz: {
        title: "Bosh sahifa",
        description:
          "Vatandoshlar.de portalining asosiy sahifasi.",
        badge: "Sahifa",
        keywords: [
          "bosh sahifa",
          "asosiy sahifa",
          "home",
          "portal",
          "vatandoshlar",
          "germaniya",
          "o‘zbeklar",
        ],
      },
      de: {
        title: "Startseite",
        description:
          "Die zentrale Startseite des Portals Vatandoshlar.de.",
        badge: "Seite",
        keywords: [
          "startseite",
          "home",
          "portal",
          "vatandoshlar",
          "deutschland",
          "usbeken",
        ],
      },
    },
  },
  {
    id: "page-guide",
    path: "/guide",
    category: "Qo‘llanma",
    content: {
      uz: {
        title: "Germaniya qo‘llanmasi",
        description:
          "Vizalar, oila birlashtirish, Ausbildung va Germaniyaga kelgandan keyingi jarayonlar bo‘yicha tizimli qo‘llanmalar.",
        badge: "Qo‘llanma",
        keywords: [
          "guide",
          "qo‘llanma",
          "germaniya qo‘llanmasi",
          "viza",
          "oila birlashtirish",
          "ausbildung",
          "anmeldung",
          "aufenthaltstitel",
        ],
      },
      de: {
        title: "Deutschland Guide",
        description:
          "Strukturierte Leitfäden zu Visa, Familiennachzug, Ausbildung und den ersten Schritten nach der Ankunft.",
        badge: "Guide",
        keywords: [
          "guide",
          "deutschland guide",
          "visum",
          "familiennachzug",
          "ausbildung",
          "anmeldung",
          "aufenthaltstitel",
        ],
      },
    },
  },
  {
    id: "page-news",
    path: "/news",
    category: "Yangilik",
    content: {
      uz: {
        title: "Yangiliklar",
        description:
          "Germaniyada yashash, o‘qish va ishlash bo‘yicha rasmiy hamda tekshirilgan ma’lumotlar.",
        badge: "Yangilik",
        keywords: [
          "yangilik",
          "xabar",
          "rasmiy",
          "bamf",
          "daad",
          "elchixona",
          "germaniya",
          "ma’lumot",
        ],
      },
      de: {
        title: "Nachrichten",
        description:
          "Offizielle und geprüfte Informationen zum Leben, Studieren und Arbeiten in Deutschland.",
        badge: "Nachricht",
        keywords: [
          "nachrichten",
          "neuigkeiten",
          "offiziell",
          "bamf",
          "daad",
          "botschaft",
          "deutschland",
          "informationen",
        ],
      },
    },
  },
  {
    id: "page-services",
    path: "/services",
    category: "Xizmat",
    content: {
      uz: {
        title: "Xizmatlar",
        description:
          "Tarjimonlar, huquqiy xizmatlar, soliq maslahatchilari, shifokorlar va boshqa mutaxassislar.",
        badge: "Xizmat",
        keywords: [
          "xizmat",
          "tarjimon",
          "advokat",
          "huquqshunos",
          "soliq",
          "steuerberater",
          "shifokor",
          "doktor",
          "usta",
          "mutaxassis",
        ],
      },
      de: {
        title: "Dienstleistungen",
        description:
          "Übersetzer, rechtliche Unterstützung, Steuerberater, Ärzte und weitere Fachkräfte.",
        badge: "Dienstleistung",
        keywords: [
          "dienstleistung",
          "übersetzer",
          "anwalt",
          "recht",
          "steuer",
          "steuerberater",
          "arzt",
          "handwerker",
          "fachkraft",
        ],
      },
    },
  },
  {
    id: "page-jobs",
    path: "/jobs",
    category: "Ish",
    content: {
      uz: {
        title: "Ish va karyera",
        description:
          "Ish qidirish, Minijob, Werkstudent, Praktikum, Ausbildung va professional karyera qo‘llanmalari.",
        badge: "Ish",
        keywords: [
          "ish",
          "job",
          "karyera",
          "vakansiya",
          "minijob",
          "werkstudent",
          "praktikum",
          "ausbildung",
          "nebenjob",
          "aushilfe",
        ],
      },
      de: {
        title: "Arbeit und Karriere",
        description:
          "Leitfäden zu Jobsuche, Minijob, Werkstudent, Praktikum, Ausbildung und beruflicher Karriere.",
        badge: "Arbeit",
        keywords: [
          "arbeit",
          "job",
          "karriere",
          "stelle",
          "minijob",
          "werkstudent",
          "praktikum",
          "ausbildung",
          "nebenjob",
          "aushilfe",
        ],
      },
    },
  },
  {
    id: "page-job-platforms",
    path: "/jobs#job-platforms",
    category: "Ish platformasi",
    content: {
      uz: {
        title: "Ish qidirish platformalari",
        description:
          "Rasmiy va xususiy ish portallarini kasb, til va ish turi bo‘yicha toping.",
        badge: "Ish platformasi",
        keywords: [
          "ish sayti",
          "job portal",
          "jobsuche",
          "arbeitsagentur",
          "bundesagentur",
          "make it in germany",
          "eures",
          "stepstone",
          "linkedin",
          "xing",
          "jobmensa",
          "ausbildung.de",
        ],
      },
      de: {
        title: "Jobportale",
        description:
          "Offizielle und private Jobportale nach Beruf, Sprache und Beschäftigungsart finden.",
        badge: "Jobportal",
        keywords: [
          "jobportal",
          "jobsuche",
          "arbeitsagentur",
          "bundesagentur",
          "make it in germany",
          "eures",
          "stepstone",
          "linkedin",
          "xing",
          "jobmensa",
          "ausbildung.de",
        ],
      },
    },
  },
  {
    id: "page-telegram",
    path: "/telegram",
    category: "Telegram",
    content: {
      uz: {
        title: "Telegram guruhlari",
        description:
          "Germaniya federal yerlari bo‘yicha o‘zbek Telegram guruhlari.",
        badge: "Telegram",
        keywords: [
          "telegram",
          "guruh",
          "hamjamiyat",
          "bundesland",
          "nrw",
          "nordrhein westfalen",
          "baden württemberg",
          "schleswig holstein",
          "o‘zbeklar",
        ],
      },
      de: {
        title: "Telegram-Gruppen",
        description:
          "Usbekische Telegram-Gruppen nach deutschen Bundesländern.",
        badge: "Telegram",
        keywords: [
          "telegram",
          "gruppe",
          "community",
          "bundesland",
          "nrw",
          "nordrhein westfalen",
          "baden württemberg",
          "schleswig holstein",
          "usbeken",
        ],
      },
    },
  },
  {
    id: "page-events",
    path: "/events",
    category: "Tadbir",
    content: {
      uz: {
        title: "Tadbirlar",
        description:
          "Madaniy, ta’limiy, professional va jamoat tadbirlari.",
        badge: "Tadbir",
        keywords: [
          "tadbir",
          "event",
          "uchrashuv",
          "seminar",
          "konsert",
          "networking",
          "madaniyat",
          "ta’lim",
          "karyera",
        ],
      },
      de: {
        title: "Veranstaltungen",
        description:
          "Kulturelle, bildungsbezogene, berufliche und gemeinschaftliche Veranstaltungen.",
        badge: "Veranstaltung",
        keywords: [
          "veranstaltung",
          "event",
          "treffen",
          "seminar",
          "konzert",
          "networking",
          "kultur",
          "bildung",
          "karriere",
        ],
      },
    },
  },
];

function createLocalizedHref(
  locale: SearchLocale,
  path: string,
): string {
  return `/${locale}${path}`;
}

function getStaticSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  return staticSearchDefinitions.map((definition) => {
    const content = definition.content[locale];

    return {
      id: definition.id,
      title: content.title,
      description: content.description,
      href: createLocalizedHref(locale, definition.path),
      category: definition.category,
      badge: content.badge,
      keywords: content.keywords,
    };
  });
}

function getSpecialistSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  return specialists
    .filter((specialist) => specialist.profilePublished)
    .map((specialist) => {
      const localizedSpecialist = localizeSpecialist(
        specialist,
        locale,
      );

      return {
        id: `specialist-${specialist.id}`,
        title: specialist.name,
        description: localizedSpecialist.shortDescription,
        href: createLocalizedHref(
          locale,
          `/specialists/${specialist.slug}`,
        ),
        category: "Mutaxassis",
        badge: localizedSpecialist.profession,
        keywords: [
          specialist.name,
          specialist.code,
          localizedSpecialist.profession,
          localizedSpecialist.shortDescription,
          ...localizedSpecialist.services,
          ...specialist.categories,
          ...specialist.languages,
          specialist.location?.city ?? "",
          specialist.location?.bundesland ?? "",
          localizedSpecialist.serviceArea ?? "",
          localizedSpecialist.pricingNote ?? "",
        ],
      };
    });
}


function getJobGuideSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  return getJobGuides(locale).map((guide) => ({
    id: `job-guide-${guide.id}`,
    title: guide.title,
    description: guide.description,
    href: createLocalizedHref(
      locale,
      `/jobs/${guide.slug}`,
    ),
    category: "Ish",
    badge: guide.category,
    keywords: [
      guide.title,
      guide.shortTitle,
      guide.description,
      guide.category,
      guide.audience,
      guide.officialSourceName,
      ...guide.searchKeywords,
      ...guide.highlights,
    ],
  }));
}


function getGuideSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  return getGuideCategories(locale).flatMap((category) =>
    getGuideArticlesByCategory(category.slug, locale).map(
      (article) => ({
        id: `guide-article-${article.id}`,
        title: article.title,
        description: article.excerpt,
        href: createLocalizedHref(
          locale,
          `/guide/${category.slug}/${article.slug}`,
        ),
        category: "Qo‘llanma",
        badge: category.title,
        keywords: [
          article.title,
          article.excerpt,
          article.intro,
          article.readingTime,
          category.title,
          ...article.facts.flatMap((fact) => [
            fact.label,
            fact.value,
          ]),
          ...Object.values(article.sections).flatMap(
            (section) =>
              section
                ? [
                    section.title,
                    ...section.paragraphs,
                    ...section.items,
                  ]
                : [],
          ),
          ...article.steps.flatMap((step) => [
            step.title,
            step.description,
          ]),
          ...article.faq.flatMap((item) => [
            item.question,
            item.answer,
          ]),
        ],
      }),
    ),
  );
}

export function getGlobalSearchItems(
  locale: SearchLocale,
): ReadonlyArray<GlobalSearchItem> {
  return [
    ...getStaticSearchItems(locale),
    ...getSpecialistSearchItems(locale),
    ...getJobGuideSearchItems(locale),
    ...getGuideSearchItems(locale),
  ];
}

/**
 * Backward-compatible Uzbek index.
 * New code should use getGlobalSearchItems(locale).
 */
export const globalSearchItems: ReadonlyArray<GlobalSearchItem> =
  getGlobalSearchItems("uz");

export function getSearchCategoryLabel(
  category: SearchCategory,
  locale: SearchLocale,
): string {
  const labels: Readonly<
    Record<SearchLocale, Record<SearchCategory, string>>
  > = {
    uz: {
      Sahifa: "Sahifa",
      Yangilik: "Yangilik",
      Xizmat: "Xizmat",
      Mutaxassis: "Mutaxassis",
      Ish: "Ish",
      "Ish platformasi": "Ish platformasi",
      Telegram: "Telegram",
      Tadbir: "Tadbir",
      "Qo‘llanma": "Qo‘llanma",
    },
    de: {
      Sahifa: "Seite",
      Yangilik: "Nachricht",
      Xizmat: "Dienstleistung",
      Mutaxassis: "Fachkraft",
      Ish: "Arbeit",
      "Ish platformasi": "Jobportal",
      Telegram: "Telegram",
      Tadbir: "Veranstaltung",
      "Qo‘llanma": "Guide",
    },
  };

  return labels[locale][category];
}

export function normalizeSearchText(
  value: string,
  locale: SearchLocale = "uz",
): string {
  return value
    .toLocaleLowerCase(locale === "uz" ? "uz" : "de")
    .replace(/[ʻ’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchGlobalItems(
  query: string,
  locale: SearchLocale = "uz",
  category?: SearchCategory,
): GlobalSearchItem[] {
  const normalizedQuery = normalizeSearchText(
    query,
    locale,
  );

  return getGlobalSearchItems(locale)
    .filter((item) => {
      if (
        category &&
        item.category !== category
      ) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = normalizeSearchText(
        [
          item.title,
          item.description,
          item.category,
          item.badge ?? "",
          ...item.keywords,
        ].join(" "),
        locale,
      );

      return searchableText.includes(normalizedQuery);
    })
    .sort((firstItem, secondItem) => {
      if (!normalizedQuery) {
        return firstItem.title.localeCompare(
          secondItem.title,
          locale === "uz" ? "uz" : "de",
        );
      }

      const firstTitle = normalizeSearchText(
        firstItem.title,
        locale,
      );
      const secondTitle = normalizeSearchText(
        secondItem.title,
        locale,
      );

      const firstExact = firstTitle === normalizedQuery;
      const secondExact = secondTitle === normalizedQuery;

      if (firstExact && !secondExact) {
        return -1;
      }

      if (!firstExact && secondExact) {
        return 1;
      }

      const firstStarts =
        firstTitle.startsWith(normalizedQuery);
      const secondStarts =
        secondTitle.startsWith(normalizedQuery);

      if (firstStarts && !secondStarts) {
        return -1;
      }

      if (!firstStarts && secondStarts) {
        return 1;
      }

      return firstItem.title.localeCompare(
        secondItem.title,
        locale === "uz" ? "uz" : "de",
      );
    });
}
