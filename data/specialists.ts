import type {
  LocalizedSpecialist,
  Specialist,
  SupportedLocale,
} from "@/types/specialist";

/**
 * Public directory entries must contain only information that
 * the specialist has approved for publication.
 */
export const specialists: ReadonlyArray<Specialist> = [
  {
    id: "durdona-ibragimova",
    code: "UZ-MED-0001",
    slug: "durdona-ibragimova",
    name: "Durdona Ibragimova",
    profession: {
      uz: "Shifokorlar uchun FSP va hujjatlar bo‘yicha maslahatchi",
      de: "Beraterin für FSP-Vorbereitung und Unterlagen für Ärzte",
    },
    shortDescription: {
      uz: "NRW hududidagi shifokorlarga hujjatlar va FSP imtihoniga tayyorgarlik bo‘yicha maslahat beradi.",
      de: "Unterstützt Ärztinnen und Ärzte in Nordrhein-Westfalen bei Unterlagen und der Vorbereitung auf die Fachsprachprüfung.",
    },
    categories: ["medical"],
    languages: [],
    services: [
      {
        uz: "Shifokorlar uchun NRW bo‘yicha hujjatlar maslahati",
        de: "Beratung zu Unterlagen für Ärzte in Nordrhein-Westfalen",
      },
      {
        uz: "FSP imtihoniga tayyorgarlik bo‘yicha maslahat",
        de: "Beratung zur Vorbereitung auf die Fachsprachprüfung",
      },
    ],
    location: {
      bundesland: "Nordrhein-Westfalen",
    },
    contact: {
      phone: "+49 163 136 2803",
    },
    status: {
      verified: false,
      featured: false,
      premium: false,
      sponsored: false,
    },
    pricingNote: {
      uz: "Maslahat bepul.",
      de: "Die Beratung ist kostenlos.",
    },
    profilePublished: false,
  },
  {
    id: "gulchekhra-agzamova",
    code: "UZ-BEA-0001",
    slug: "gulchekhra-agzamova",
    name: "Gulchekhra Agzamova",
    profession: {
      uz: "Ayollar sartaroshi",
      de: "Damenfriseurin",
    },
    shortDescription: {
      uz: "Hamm shahrida ayollar uchun soch turmagi va soch qirqish xizmatlarini taklif qiladi.",
      de: "Bietet in Hamm Haarschnitte und Frisuren für Frauen an.",
    },
    categories: ["beauty"],
    languages: [],
    services: [
      {
        uz: "Ayollar uchun soch turmagi",
        de: "Damenfrisuren",
      },
      {
        uz: "Ayollar uchun soch qirqish",
        de: "Damenhaarschnitte",
      },
    ],
    location: {
      city: "Hamm",
      bundesland: "Nordrhein-Westfalen",
    },
    contact: {
      phone: "+49 177 1585206",
      telegram: "https://t.me/GuliAgzamov",
    },
    status: {
      verified: false,
      featured: false,
      premium: false,
      sponsored: false,
    },
    pricingNote: {
      uz: "Narx xizmat turiga qarab kelishiladi.",
      de: "Der Preis wird je nach Leistung vereinbart.",
    },
    profilePublished: false,
  },
  {
    id: "zafar-usarov",
    code: "UZ-IT-0001",
    slug: "zafar-usarov",
    name: "Zafar Usarov",
    profession: {
      uz: "Dasturiy ta’minot muhandisi va loyiha asoschisi",
      de: "Softwareentwickler und Projektgründer",
    },
    shortDescription: {
      uz: "Vatandoshlar.de asoschisi va dasturchisi. Veb-platformalar hamda Bachelor, Master va PhD hujjatlari bo‘yicha amaliy yo‘naltirish bilan shug‘ullanadi.",
      de: "Gründer und Entwickler von Vatandoshlar.de. Unterstützt bei Webplattformen sowie bei der Orientierung rund um Bachelor-, Master- und Promotionsunterlagen.",
    },
    categories: ["technology", "academic-documents"],
    languages: ["uz", "de"],
    services: [
      {
        uz: "Veb-sayt va veb-platformalarni ishlab chiqish",
        de: "Entwicklung von Websites und Webplattformen",
      },
      {
        uz: "Bachelor, Master va PhD hujjatlari bo‘yicha yo‘naltirish",
        de: "Orientierung bei Bachelor-, Master- und Promotionsunterlagen",
      },
    ],
    contact: {
      email: "info.vatandoshlar@gmx.de",
      telegram: "https://t.me/ZafarUsarov",
      instagram: "https://www.instagram.com/zafarbek_usarov",
      youtube: "https://youtube.com/@zafarusarov",
      facebook: "https://www.facebook.com/ZafarbekUsarov",
    },
    status: {
      verified: true,
      featured: true,
      premium: false,
      sponsored: false,
    },
    profilePublished: false,
  },
];

export function localizeSpecialist(
  specialist: Specialist,
  locale: SupportedLocale,
): LocalizedSpecialist {
  return {
    ...specialist,
    profession: specialist.profession[locale],
    shortDescription: specialist.shortDescription[locale],
    services: specialist.services.map(
      (service) => service[locale],
    ),
    pricingNote: specialist.pricingNote?.[locale],
  };
}

export function getFeaturedSpecialists(
  locale: SupportedLocale,
  limit = 3,
): ReadonlyArray<LocalizedSpecialist> {
  return specialists
    .filter(
      (specialist) =>
        specialist.status.featured &&
        specialist.status.verified,
    )
    .slice(0, limit)
    .map((specialist) =>
      localizeSpecialist(specialist, locale),
    );
}

export function getSpecialistBySlug(
  slug: string,
  locale: SupportedLocale,
): LocalizedSpecialist | undefined {
  const specialist = specialists.find(
    (item) => item.slug === slug,
  );

  return specialist
    ? localizeSpecialist(specialist, locale)
    : undefined;
}
