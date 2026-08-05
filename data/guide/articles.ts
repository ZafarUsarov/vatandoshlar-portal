import type {
  GuideArticle,
  LocalizedGuideArticle,
  SupportedGuideLocale,
} from "../../types/guide";

export const localizedGuideArticles: ReadonlyArray<LocalizedGuideArticle> = [
  {
    id: "au-pair",
    slug: "au-pair",
    categorySlug: "coming-to-germany",
    title: {
      uz: "Germaniyada Au Pair",
      de: "Au-pair in Deutschland",
    },
    excerpt: {
      uz: "Au Pair sifatida Germaniyaga kelish talablari, mezbon oila, ish vaqti, cho‘ntak puli, til kursi, sug‘urta va viza jarayoni bo‘yicha rasmiy manbalarga asoslangan qo‘llanma.",
      de: "Offizieller Leitfaden zu Voraussetzungen, Gastfamilie, Arbeitszeit, Taschengeld, Sprachkurs, Versicherung und Visum für einen Au-pair-Aufenthalt in Deutschland.",
    },
    intro: {
      uz: "Au Pair — yosh insonning mezbon oilada yashab, asosan bolalarni parvarish qilish va yengil uy ishlarida yordam berish evaziga nemis tilini yaxshilashi hamda Germaniya madaniyati bilan tanishishi uchun mo‘ljallangan dastur. Bu oddiy to‘liq stavkali ish emas; madaniy almashinuv va til o‘rganish asosiy maqsad hisoblanadi.",
      de: "Ein Au-pair-Aufenthalt ermöglicht jungen Menschen, in einer Gastfamilie zu leben, vor allem bei der Kinderbetreuung und leichten Hausarbeit zu helfen, Deutsch zu lernen und den Alltag in Deutschland kennenzulernen. Es handelt sich nicht um eine gewöhnliche Vollzeitbeschäftigung; der kulturelle Austausch steht im Mittelpunkt.",
    },
    status: "published",
    featured: true,
    lastReviewedAt: "2026-08-05",
    readingTime: {
      uz: "10 daqiqa",
      de: "10 Minuten",
    },
    facts: [
      {
        label: { uz: "Yosh", de: "Alter" },
        value: {
          uz: "Ish boshlanganda kamida 18 yosh; yashash ruxsatiga ariza berishda 27 yoshga to‘lmagan",
          de: "Mindestens 18 Jahre bei Beginn; bei Beantragung des Aufenthaltstitels noch nicht 27 Jahre alt",
        },
      },
      {
        label: { uz: "Davomiylik", de: "Dauer" },
        value: {
          uz: "Kamida 6 oy, ko‘pi bilan 12 oy",
          de: "Mindestens 6, höchstens 12 Monate",
        },
      },
      {
        label: { uz: "Nemis tili", de: "Deutschkenntnisse" },
        value: {
          uz: "Kamida A1 daraja kutiladi",
          de: "Mindestens Niveau A1 wird erwartet",
        },
      },
      {
        label: { uz: "Ish vaqti", de: "Arbeitszeit" },
        value: {
          uz: "Kuniga ko‘pi bilan 6 soat, haftasiga 30 soat",
          de: "Höchstens 6 Stunden täglich und 30 Stunden wöchentlich",
        },
      },
      {
        label: { uz: "Cho‘ntak puli", de: "Taschengeld" },
        value: {
          uz: "Oyiga 280 yevro",
          de: "280 Euro monatlich",
        },
      },
      {
        label: { uz: "Til kursi yordami", de: "Sprachkurszuschuss" },
        value: {
          uz: "Mezbon oila kamida 840 yevro yoki oyiga 70 yevro hissa qo‘shadi",
          de: "Mindestens 840 Euro insgesamt oder 70 Euro monatlich durch die Gastfamilie",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Au Pair nima?",
          de: "Was ist ein Au-pair?",
        },
        paragraphs: [
          {
            uz: "Au Pair mezbon oila bilan bir uyda yashaydi. Asosiy vazifalar bolalarni kuzatish, bog‘cha yoki maktabga olib borish, ular bilan o‘ynash, oddiy taom tayyorlash va yengil uy ishlariga yordam berishdan iborat bo‘lishi mumkin.",
            de: "Ein Au-pair lebt im Haushalt der Gastfamilie. Zu den typischen Aufgaben gehören Kinderbetreuung, das Begleiten zu Kita oder Schule, Spielen mit den Kindern, einfache Mahlzeiten und leichte Hausarbeit.",
          },
          {
            uz: "Kasal yoki parvarishga muhtoj keksa odamlarni professional tarzda parvarish qilish Au Pair vazifasiga kirmaydi.",
            de: "Die Pflege kranker oder pflegebedürftiger älterer Menschen gehört nicht zu den Aufgaben eines Au-pairs.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Kimlar qatnasha oladi?",
          de: "Wer kann teilnehmen?",
        },
        items: [
          {
            uz: "Ish boshlanishida kamida 18 yosh bo‘lganlar",
            de: "Personen, die bei Beginn mindestens 18 Jahre alt sind",
          },
          {
            uz: "Yashash ruxsatiga ariza berish vaqtida 27 yoshga to‘lmaganlar",
            de: "Personen, die bei Beantragung des Aufenthaltstitels noch nicht 27 Jahre alt sind",
          },
          {
            uz: "Kamida A1 darajadagi boshlang‘ich nemis tiliga ega bo‘lganlar",
            de: "Personen mit grundlegenden Deutschkenntnissen, mindestens Niveau A1",
          },
          {
            uz: "Mezbon oila bilan qarindosh bo‘lmaganlar",
            de: "Personen, die nicht mit der Gastfamilie verwandt sind",
          },
          {
            uz: "6–12 oy davomida mezbon oilada yashashga tayyor bo‘lganlar",
            de: "Personen, die bereit sind, 6 bis 12 Monate in der Gastfamilie zu leben",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Mezbon oila va asosiy shartlar",
          de: "Gastfamilie und zentrale Bedingungen",
        },
        items: [
          {
            uz: "Mezbon oilada kamida 18 yoshga to‘lmagan bitta bola doimiy yashashi kerak.",
            de: "In der Gastfamilie muss mindestens ein Kind unter 18 Jahren dauerhaft leben.",
          },
          {
            uz: "Au Pair uchun odatda oilaning uyida alohida xona va bepul ovqat taqdim etiladi.",
            de: "Das Au-pair erhält grundsätzlich ein eigenes Zimmer im Haushalt der Familie sowie kostenlose Verpflegung.",
          },
          {
            uz: "Haftasiga kamida 1,5 kun dam olish, oyiga kamida bir yakshanba va haftasiga kamida to‘rtta bo‘sh kecha beriladi.",
            de: "Es bestehen Ansprüche auf mindestens 1,5 freie Tage pro Woche, mindestens einen freien Sonntag pro Monat und mindestens vier freie Abende pro Woche.",
          },
          {
            uz: "12 oylik Au Pair davri uchun to‘rt hafta haq to‘lanadigan ta’til beriladi; qisqaroq muddatda har to‘liq oy uchun ikki ish kuni.",
            de: "Bei einem vollen Jahr bestehen vier Wochen bezahlter Urlaub; bei kürzerer Dauer zwei Werktage pro vollem Monat.",
          },
          {
            uz: "Mezbon oila kasallik, homiladorlik, tug‘ruq va baxtsiz hodisa holatlarini qoplaydigan sug‘urtani to‘lashi kerak.",
            de: "Die Gastfamilie trägt die Kosten einer Versicherung für Krankheit, Schwangerschaft, Geburt und Unfall.",
          },
        ],
      },
      documents: {
        title: {
          uz: "Odatda kerak bo‘ladigan hujjatlar",
          de: "Üblicherweise erforderliche Unterlagen",
        },
        items: [
          {
            uz: "Imzolangan Au Pair shartnomasi",
            de: "Unterzeichneter Au-pair-Vertrag",
          },
          {
            uz: "Mezbon oila to‘ldirgan rasmiy savolnoma yoki mezbon oila ma’lumotlari",
            de: "Fragebogen beziehungsweise Angaben der Gastfamilie",
          },
          {
            uz: "Nemis tili bo‘yicha A1 darajasini ko‘rsatuvchi dalil yoki vakolatxona tekshiruvi",
            de: "Nachweis beziehungsweise Prüfung grundlegender Deutschkenntnisse auf Niveau A1",
          },
          {
            uz: "Milliy viza arizasi uchun mas’ul Germaniya vakolatxonasi talab qilgan shaxsiy hujjatlar",
            de: "Persönliche Unterlagen nach der aktuellen Checkliste der zuständigen deutschen Auslandsvertretung",
          },
          {
            uz: "Sug‘urta va yashash sharoiti bo‘yicha tasdiqlar, agar vakolatxona talab qilsa",
            de: "Nachweise zu Versicherung und Unterbringung, sofern von der Auslandsvertretung verlangt",
          },
        ],
        paragraphs: [
          {
            uz: "Aniq hujjatlar ro‘yxati yashash joyingiz uchun mas’ul Germaniya elchixonasi yoki konsulligiga qarab farq qilishi mumkin. Ariza berishdan oldin aynan o‘sha vakolatxonaning amaldagi checklistini tekshiring.",
            de: "Die genaue Unterlagenliste kann je nach zuständiger deutscher Auslandsvertretung variieren. Prüfen Sie vor der Antragstellung immer die aktuelle Checkliste der zuständigen Stelle.",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Ish va yashash sharoitlari",
          de: "Arbeits- und Lebensbedingungen",
        },
        items: [
          {
            uz: "Uy ishlari va bola parvarishi birgalikda haftasiga 30 soatdan oshmasligi kerak.",
            de: "Hausarbeit und Kinderbetreuung dürfen zusammen 30 Stunden pro Woche nicht überschreiten.",
          },
          {
            uz: "Qo‘shimcha ish vaqti oldindan kelishilishi va bo‘sh vaqt bilan qoplanishi kerak.",
            de: "Mehrarbeit muss vorher vereinbart und durch Freizeit ausgeglichen werden.",
          },
          {
            uz: "Mezbon oila nemis tili kursi xarajatlariga kamida 840 yevro hissa qo‘shadi va eng yaqin mos kursga zarur yo‘l xarajatlarini ham to‘laydi.",
            de: "Die Gastfamilie beteiligt sich mit mindestens 840 Euro an den Sprachkurskosten und übernimmt zusätzlich notwendige Fahrtkosten zum nächstgelegenen geeigneten Kurs.",
          },
          {
            uz: "Au Pairning Germaniyaga kelish va qaytish yo‘l xarajatlari odatda Au Pairning o‘z zimmasida bo‘ladi.",
            de: "Die Kosten für An- und Rückreise trägt das Au-pair in der Regel selbst.",
          },
        ],
      },
      warnings: {
        title: {
          uz: "Muhim ogohlantirishlar",
          de: "Wichtige Hinweise",
        },
        items: [
          {
            uz: "Uchinchi davlat fuqarolari Au Pair faoliyatini boshlashdan oldin tegishli milliy viza yoki yashash ruxsatini olishlari kerak.",
            de: "Drittstaatsangehörige benötigen vor Beginn der Au-pair-Tätigkeit das erforderliche nationale Visum beziehungsweise den passenden Aufenthaltstitel.",
          },
          {
            uz: "Viza chiqmasdan turib katta miqdorda vositachilik puli yubormang va shartnoma hamda mezbon oilani tekshiring.",
            de: "Zahlen Sie vor Erteilung des Visums keine hohen Vermittlungsgebühren und prüfen Sie Vertrag sowie Gastfamilie sorgfältig.",
          },
          {
            uz: "Rasmiy termin tizimi bepul. Termin uchun maxsus kirish va’da qiladigan vositachilarga ishonmang.",
            de: "Das offizielle Terminbuchungssystem ist kostenlos. Misstrauen Sie Vermittlern, die einen besonderen Zugang zu Terminen versprechen.",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Mezbon oilani toping",
          de: "Gastfamilie finden",
        },
        description: {
          uz: "Oilani o‘zingiz yoki ishonchli agentlik orqali topishingiz mumkin. Oilaning tarkibi, bolalar, vazifalar, xona va yashash sharoitlarini oldindan tekshiring.",
          de: "Sie können selbst oder über eine seriöse Vermittlungsstelle suchen. Klären Sie Familienstruktur, Kinder, Aufgaben, Zimmer und Lebensbedingungen im Voraus.",
        },
      },
      {
        title: {
          uz: "Shartlarni yozma ravishda kelishib oling",
          de: "Bedingungen schriftlich vereinbaren",
        },
        description: {
          uz: "Ish vaqti, vazifalar, dam olish, cho‘ntak puli, til kursi, sug‘urta va boshlanish sanasini shartnomada aniq yozing.",
          de: "Halten Sie Arbeitszeit, Aufgaben, Freizeit, Taschengeld, Sprachkurs, Versicherung und Beginn eindeutig im Vertrag fest.",
        },
      },
      {
        title: {
          uz: "Rasmiy Au Pair shartnomasini imzolang",
          de: "Au-pair-Vertrag unterschreiben",
        },
        description: {
          uz: "Bundesagentur für Arbeit taqdim etgan namunaviy Au Pair shartnomasidan foydalanish mumkin.",
          de: "Sie können den Mustervertrag der Bundesagentur für Arbeit verwenden.",
        },
      },
      {
        title: {
          uz: "Viza hujjatlarini tayyorlang",
          de: "Visumunterlagen vorbereiten",
        },
        description: {
          uz: "Mas’ul Germaniya vakolatxonasining joriy hujjatlar ro‘yxatini tekshiring va barcha talablarni aynan shu ro‘yxat bo‘yicha bajaring.",
          de: "Prüfen Sie die aktuelle Unterlagenliste der zuständigen deutschen Auslandsvertretung und richten Sie sich nach deren Anforderungen.",
        },
      },
      {
        title: {
          uz: "Ariza va termin jarayonini boshlang",
          de: "Antrag und Termin starten",
        },
        description: {
          uz: "Mavjud bo‘lsa Konsullik xizmatlari portali orqali onlayn ariza yuboring. Keyin biometrika, asl hujjatlar va to‘lov uchun shaxsan termin talab qilinadi.",
          de: "Reichen Sie den Antrag, sofern verfügbar, über das Auslandsportal ein. Für Biometrie, Originalunterlagen und Gebühren bleibt ein persönlicher Termin erforderlich.",
        },
      },
      {
        title: {
          uz: "Faqat ruxsat berilgandan keyin yo‘lga chiqing",
          de: "Erst nach Erteilung einreisen",
        },
        description: {
          uz: "Viza yoki yashash huquqi berilmasdan Au Pair faoliyatini boshlamang va qaytarib bo‘lmaydigan xarajatlarni ehtiyotkorlik bilan qiling.",
          de: "Beginnen Sie die Tätigkeit nicht ohne erteiltes Visum beziehungsweise Aufenthaltsrecht und gehen Sie mit nicht erstattbaren Kosten vorsichtig um.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "Au Pair sifatida necha soat ishlash mumkin?",
          de: "Wie viele Stunden darf ein Au-pair arbeiten?",
        },
        answer: {
          uz: "Uy ishlari va bola parvarishi birgalikda odatda kuniga 6 soat va haftasiga 30 soatdan oshmasligi kerak.",
          de: "Hausarbeit und Kinderbetreuung dürfen grundsätzlich 6 Stunden täglich und 30 Stunden wöchentlich nicht überschreiten.",
        },
      },
      {
        question: {
          uz: "Au Pair maosh oladimi?",
          de: "Erhält ein Au-pair Gehalt?",
        },
        answer: {
          uz: "Oddiy ish haqi emas, oyiga 280 yevro cho‘ntak puli beriladi. Uy-joy va ovqat mezbon oila tomonidan bepul taqdim etiladi.",
          de: "Es handelt sich nicht um regulären Arbeitslohn. Das Au-pair erhält 280 Euro Taschengeld pro Monat; Unterkunft und Verpflegung stellt die Gastfamilie kostenlos.",
        },
      },
      {
        question: {
          uz: "Nemis tili sertifikati shartmi?",
          de: "Ist ein Deutschzertifikat zwingend erforderlich?",
        },
        answer: {
          uz: "Rasmiy qo‘llanmada kamida A1 darajadagi boshlang‘ich nemis tili kutilishi aytiladi. Til bilimi elchixona yoki Ausländerbehörde tomonidan baholanishi mumkin. Qaysi dalil qabul qilinishini mas’ul vakolatxonadan tekshiring.",
          de: "Erwartet werden mindestens grundlegende Deutschkenntnisse auf Niveau A1. Die Kenntnisse können durch Auslandsvertretung oder Ausländerbehörde bewertet werden. Prüfen Sie bei der zuständigen Stelle, welcher Nachweis akzeptiert wird.",
        },
      },
      {
        question: {
          uz: "Au Pair dasturi qancha davom etadi?",
          de: "Wie lange dauert ein Au-pair-Aufenthalt?",
        },
        answer: {
          uz: "Kamida 6 oy va ko‘pi bilan 12 oy. Uchinchi davlat fuqarolari uchun Au Pair sifatida qayta ishlash odatda mumkin emas.",
          de: "Mindestens 6 und höchstens 12 Monate. Für Drittstaatsangehörige ist eine erneute Au-pair-Beschäftigung grundsätzlich nicht vorgesehen.",
        },
      },
      {
        question: {
          uz: "Viza arizasini to‘liq onlayn yakunlash mumkinmi?",
          de: "Kann das Visum vollständig online beantragt werden?",
        },
        answer: {
          uz: "Ayrim milliy vizalar bo‘yicha hujjatlarni Konsullik xizmatlari portali orqali onlayn yuborish mumkin. Lekin biometrika, asl hujjatlarni tekshirish va to‘lov uchun shaxsan termin baribir talab qilinadi.",
          de: "Für bestimmte nationale Visa können Unterlagen über das Auslandsportal online eingereicht werden. Für Biometrie, Prüfung der Originale und Gebühren ist weiterhin ein persönlicher Termin erforderlich.",
        },
      },
    ],
    sources: [
      {
        title: "Au-pair in deutschen Familien",
        organization: "Bundesagentur für Arbeit",
        url: "https://www.arbeitsagentur.de/datei/au-pair-merkblatt_ba031460.pdf",
        language: "de",
      },
      {
        title: "Au pairs in German families",
        organization: "Federal Employment Agency",
        url: "https://www.arbeitsagentur.de/datei/au-pair-in-germany-en_ba030535.pdf",
        language: "en",
      },
      {
        title: "Au-pair-Vertrag",
        organization: "Bundesagentur für Arbeit",
        url: "https://www.arbeitsagentur.de/datei/aupair-vertrag_ba030510.pdf",
        language: "de",
      },
      {
        title: "Consular Services Portal",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
        language: "en",
      },
    ],
    relatedArticleSlugs: [],
  },
];

function localizeArticle(
  article: LocalizedGuideArticle,
  locale: SupportedGuideLocale,
): GuideArticle {
  const localizedSections = Object.fromEntries(
    Object.entries(article.sections).flatMap(
      ([key, section]) => {
        if (!section) {
          return [];
        }

        return [
          [
            key,
            {
              title: section.title[locale],
              paragraphs:
                section.paragraphs?.map(
                  (paragraph) => paragraph[locale],
                ) ?? [],
              items:
                section.items?.map(
                  (item) => item[locale],
                ) ?? [],
            },
          ],
        ];
      },
    ),
  ) as GuideArticle["sections"];

  return {
    id: article.id,
    slug: article.slug,
    categorySlug: article.categorySlug,
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    intro: article.intro[locale],
    status: article.status,
    featured: article.featured,
    lastReviewedAt: article.lastReviewedAt,
    readingTime: article.readingTime[locale],
    facts: article.facts.map((fact) => ({
      label: fact.label[locale],
      value: fact.value[locale],
    })),
    sections: localizedSections,
    steps: article.steps.map((step) => ({
      title: step.title[locale],
      description: step.description[locale],
    })),
    faq: article.faq.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale],
    })),
    sources: article.sources,
    relatedArticleSlugs: article.relatedArticleSlugs,
  };
}

export function getGuideArticlesByCategory(
  categorySlug: string,
  locale: SupportedGuideLocale,
): ReadonlyArray<GuideArticle> {
  return localizedGuideArticles
    .filter(
      (article) =>
        article.categorySlug === categorySlug &&
        article.status === "published",
    )
    .map((article) => localizeArticle(article, locale));
}

export function getGuideArticleBySlug(
  categorySlug: string,
  articleSlug: string,
  locale: SupportedGuideLocale,
): GuideArticle | undefined {
  const article = localizedGuideArticles.find(
    (item) =>
      item.categorySlug === categorySlug &&
      item.slug === articleSlug &&
      item.status === "published",
  );

  return article
    ? localizeArticle(article, locale)
    : undefined;
}

export function getGuideArticleStaticParams(): Array<{
  category: string;
  article: string;
}> {
  return localizedGuideArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      category: article.categorySlug,
      article: article.slug,
    }));
}
