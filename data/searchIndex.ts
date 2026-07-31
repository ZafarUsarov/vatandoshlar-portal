import { jobGuides } from "./jobs";

export type SearchCategory =
  | "Sahifa"
  | "Yangilik"
  | "Xizmat"
  | "Ish"
  | "Ish platformasi"
  | "Telegram"
  | "Tadbir";

export type GlobalSearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  keywords: string[];
  badge?: string;
};

/*
 * Portalning doimiy asosiy sahifalari.
 */
const staticSearchItems: GlobalSearchItem[] = [
  {
    id: "page-home",
    title: "Bosh sahifa",
    description:
      "Vatandoshlar.de portalining asosiy sahifasi.",
    href: "/",
    category: "Sahifa",
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
  {
    id: "page-news",
    title: "Yangiliklar",
    description:
      "Germaniyada yashash, o‘qish va ishlash bo‘yicha rasmiy hamda tekshirilgan ma’lumotlar.",
    href: "/news",
    category: "Yangilik",
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
  {
    id: "page-services",
    title: "Xizmatlar",
    description:
      "Tarjimonlar, huquqiy xizmatlar, soliq maslahatchilari, shifokorlar va boshqa mutaxassislar.",
    href: "/services",
    category: "Xizmat",
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
  {
    id: "page-jobs",
    title: "Ish va karyera",
    description:
      "Ish qidirish, Minijob, Werkstudent, Praktikum, Ausbildung va professional karyera qo‘llanmalari.",
    href: "/jobs",
    category: "Ish",
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
  {
    id: "page-job-platforms",
    title: "Ish qidirish platformalari",
    description:
      "Rasmiy va xususiy ish portallarini kasb, til va ish turi bo‘yicha toping.",
    href: "/jobs#job-platforms",
    category: "Ish platformasi",
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
  {
    id: "page-telegram",
    title: "Telegram guruhlari",
    description:
      "Germaniya Bundeslandlari bo‘yicha o‘zbek Telegram guruhlari.",
    href: "/telegram",
    category: "Telegram",
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
  {
    id: "page-events",
    title: "Tadbirlar",
    description:
      "Madaniy, ta’limiy, professional va jamoat tadbirlari.",
    href: "/events",
    category: "Tadbir",
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
];

/*
 * data/jobs.ts ichidagi barcha qo‘llanmalarni avtomatik
 * qidiruv elementlariga aylantiradi.
 *
 * Yangi JobGuide qo‘shilganda qidiruv indeksiga ham
 * avtomatik qo‘shiladi.
 */
const jobGuideSearchItems: GlobalSearchItem[] =
  jobGuides.map((guide) => ({
    id: `job-guide-${guide.id}`,
    title: guide.title,
    description: guide.description,
    href: `/jobs/${guide.slug}`,
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

export const globalSearchItems: GlobalSearchItem[] = [
  ...staticSearchItems,
  ...jobGuideSearchItems,
];

/*
 * O‘zbek tilidagi ayrim harflar turlicha yozilishi mumkin:
 *
 * o‘ / o' / oʻ
 * g‘ / g' / gʻ
 *
 * Ushbu funksiya ularni bir xil shaklga keltiradi.
 */
export function normalizeSearchText(
  value: string,
): string {
  return value
    .toLocaleLowerCase("uz")
    .replace(/[ʻ’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchGlobalItems(
  query: string,
  category?: SearchCategory,
): GlobalSearchItem[] {
  const normalizedQuery = normalizeSearchText(query);

  return globalSearchItems
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
      );

      return searchableText.includes(
        normalizedQuery,
      );
    })
    .sort((firstItem, secondItem) => {
      if (!normalizedQuery) {
        return firstItem.title.localeCompare(
          secondItem.title,
          "uz",
        );
      }

      const firstTitle = normalizeSearchText(
        firstItem.title,
      );

      const secondTitle = normalizeSearchText(
        secondItem.title,
      );

      const firstExact =
        firstTitle === normalizedQuery;

      const secondExact =
        secondTitle === normalizedQuery;

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
        "uz",
      );
    });
}