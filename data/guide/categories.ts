import type {
  GuideCategory,
  LocalizedGuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";

export const localizedGuideCategories: ReadonlyArray<LocalizedGuideCategory> = [
  {
    id: "arrival",
    slug: "coming-to-germany",
    icon: "arrival",
    title: { uz: "Germaniyaga kelish", de: "Nach Deutschland kommen" },
    description: {
      uz: "Au Pair, FSJ, BFD, Ausbildung, Chancenkarte va boshqa qonuniy kelish yo‘llari.",
      de: "Au-pair, FSJ, BFD, Ausbildung, Chancenkarte und weitere legale Einreisewege.",
    },
    articleCount: 5,
    status: "available",
    featured: true,
  },
  {
    id: "visa",
    slug: "visas",
    icon: "visa",
    title: { uz: "Vizalar", de: "Visa" },
    description: {
      uz: "O‘qish, ish, til kursi, oila va mehmon vizalari bo‘yicha yo‘riqnomalar.",
      de: "Leitfäden zu Studien-, Arbeits-, Sprachkurs-, Familien- und Besuchsvisa.",
    },
    articleCount: 1,
    status: "available",
    featured: true,
  },
  {
    id: "family",
    slug: "family",
    icon: "family",
    title: { uz: "Oila birlashtirish", de: "Familiennachzug" },
    description: {
      uz: "Turmush o‘rtog‘i, farzandlar va boshqa oila a’zolari uchun jarayonlar.",
      de: "Verfahren für Ehepartner, Kinder und weitere Familienangehörige.",
    },
    articleCount: 5,
    status: "available",
  },
  {
    id: "invitation",
    slug: "invitation",
    icon: "invitation",
    title: { uz: "Mehmonga chaqirish", de: "Besuch einladen" },
    description: {
      uz: "Taklifnoma, Verpflichtungserklärung va mehmon vizasi uchun kerakli bosqichlar.",
      de: "Einladung, Verpflichtungserklärung und Schritte für ein Besuchsvisum.",
    },
    articleCount: 0,
    status: "coming-soon",
  },
  {
    id: "embassy",
    slug: "embassy-and-appointments",
    icon: "embassy",
    title: { uz: "Elchixona va termin", de: "Botschaft und Termine" },
    description: {
      uz: "Termin olish, ariza topshirish, suhbat va konsullik jarayonlari.",
      de: "Terminbuchung, Antragstellung, Interview und konsularische Abläufe.",
    },
    articleCount: 1,
    status: "available",
  },
  {
    id: "documents",
    slug: "documents",
    icon: "documents",
    title: { uz: "Hujjatlar", de: "Dokumente" },
    description: {
      uz: "Tarjima, apostil, notarial tasdiq, diplom va sertifikatlar bo‘yicha ma’lumot.",
      de: "Informationen zu Übersetzung, Apostille, Beglaubigung, Abschlüssen und Zertifikaten.",
    },
    articleCount: 0,
    status: "coming-soon",
  },
  {
    id: "language",
    slug: "language-and-certificates",
    icon: "language",
    title: { uz: "Til va sertifikatlar", de: "Sprache und Zertifikate" },
    description: {
      uz: "A1–C1, Goethe, telc, TestDaF va boshqa til imtihonlari.",
      de: "A1–C1, Goethe, telc, TestDaF und weitere Sprachprüfungen.",
    },
    articleCount: 0,
    status: "coming-soon",
  },
  {
    id: "education",
    slug: "education",
    icon: "education",
    title: { uz: "Ta’lim", de: "Bildung" },
    description: {
      uz: "Studienkolleg, Bachelor, Master, PhD, stipendiya va universitetga qabul.",
      de: "Studienkolleg, Bachelor, Master, Promotion, Stipendien und Hochschulzulassung.",
    },
    articleCount: 0,
    status: "coming-soon",
    featured: true,
  },
  {
    id: "career",
    slug: "work-and-career",
    icon: "career",
    title: { uz: "Ish va karyera", de: "Arbeit und Karriere" },
    description: {
      uz: "CV, Bewerbung, suhbat, Praktikum va Germaniyada ish boshlash bo‘yicha yo‘nalishlar.",
      de: "Lebenslauf, Bewerbung, Vorstellungsgespräch, Praktikum und Berufseinstieg.",
    },
    articleCount: 0,
    status: "coming-soon",
  },
  {
    id: "after-arrival",
    slug: "after-arrival",
    icon: "after-arrival",
    title: { uz: "Kelgandan keyin", de: "Nach der Ankunft" },
    description: {
      uz: "Anmeldung, bank, Krankenkasse, Steuer-ID va Aufenthaltstitel bo‘yicha qadamlar.",
      de: "Schritte zu Anmeldung, Bankkonto, Krankenversicherung, Steuer-ID und Aufenthaltstitel.",
    },
    articleCount: 1,
    status: "available",
    featured: true,
  },
  {
    id: "recognition",
    slug: "recognition",
    icon: "recognition",
    title: { uz: "Kasblarni tan olish", de: "Berufsanerkennung" },
    description: {
      uz: "Anerkennung, Approbation va turli kasblar uchun malakani tan olish.",
      de: "Anerkennung, Approbation und Bewertung beruflicher Qualifikationen.",
    },
    articleCount: 0,
    status: "coming-soon",
  },
  {
    id: "integration",
    slug: "integration",
    icon: "integration",
    title: { uz: "Integratsiya", de: "Integration" },
    description: {
      uz: "Integratsiya kursi, maktab, bog‘cha, kundalik hayot va ijtimoiy tizim.",
      de: "Integrationskurs, Schule, Kita, Alltag und soziale Systeme.",
    },
    articleCount: 0,
    status: "coming-soon",
  },
];

export function getGuideCategories(
  locale: SupportedGuideLocale,
): ReadonlyArray<GuideCategory> {
  return localizedGuideCategories.map((category) => ({
    id: category.id,
    slug: category.slug,
    icon: category.icon,
    title: category.title[locale],
    description: category.description[locale],
    articleCount: category.articleCount,
    status: category.status,
    featured: category.featured,
  }));
}

export function getGuideCategoryBySlug(
  slug: string,
  locale: SupportedGuideLocale,
): GuideCategory | undefined {
  const category = localizedGuideCategories.find(
    (item) => item.slug === slug,
  );

  if (!category) {
    return undefined;
  }

  return {
    id: category.id,
    slug: category.slug,
    icon: category.icon,
    title: category.title[locale],
    description: category.description[locale],
    articleCount: category.articleCount,
    status: category.status,
    featured: category.featured,
  };
}

export function getGuideCategorySlugs(): ReadonlyArray<string> {
  return localizedGuideCategories.map(
    (category) => category.slug,
  );
}
