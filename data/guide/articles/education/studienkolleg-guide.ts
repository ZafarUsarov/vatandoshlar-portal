import type { LocalizedGuideArticle } from "../../../../types/guide";

export const studienkollegGuideArticle = {
  id: "studienkolleg-guide",
  slug: "studienkolleg-guide",
  categorySlug: "education",
  title: {
      uz: "Studienkolleg va Feststellungsprüfung",
      de: "Studienkolleg und Feststellungsprüfung"
    },
  excerpt: {
      uz: "To‘g‘ridan-to‘g‘ri universitet kirishi bo‘lmaganlar uchun Studienkolleg, kurs turlari, nemis tili, kirish imtihoni va Feststellungsprüfung.",
      de: "Studienkolleg für Bewerber ohne direkten Hochschulzugang, Kurstypen, Deutschkenntnisse, Aufnahmeprüfung und Feststellungsprüfung."
    },
  intro: {
      uz: "Studienkolleg xorijiy ta’lim hujjati to‘g‘ridan-to‘g‘ri universitetga kirish uchun yetarli bo‘lmagan abituriyentlarni tayyorlaydi. Odatda fan kurslari, nemis tili va yakuniy Feststellungsprüfungdan iborat.",
      de: "Das Studienkolleg bereitet internationale Bewerber ohne direkten Hochschulzugang fachlich und sprachlich auf das Studium vor. Typisch sind Schwerpunktkurs, Deutschunterricht und Feststellungsprüfung."
    },
  status: "published",
  featured: true,
  lastReviewedAt: "2026-08-06",
  readingTime: {
      uz: "10 daqiqa",
      de: "10 Minuten"
    },
  facts: [
      {
            label: {
                    uz: "Maqsad",
                    de: "Ziel"
                  },
            value: {
                    uz: "Universitet kirishiga tayyorlash",
                    de: "Vorbereitung auf den Hochschulzugang"
                  }
          },
      {
            label: {
                    uz: "Til",
                    de: "Sprache"
                  },
            value: {
                    uz: "Ko‘p hollarda nemischa",
                    de: "Überwiegend deutschsprachig"
                  }
          },
      {
            label: {
                    uz: "Yakun",
                    de: "Abschluss"
                  },
            value: {
                    uz: "Feststellungsprüfung",
                    de: "Feststellungsprüfung"
                  }
          },
      {
            label: {
                    uz: "Daraja",
                    de: "Niveau"
                  },
            value: {
                    uz: "Kurs davomida C1gacha rivojlanishi mumkin",
                    de: "Sprachentwicklung häufig bis C1"
                  }
          }
    ],
  sections: {
      overview: {
            title: {
                    uz: "Asosiy tushuncha",
                    de: "Grundlagen"
                  },
            items: [
                    {
                              uz: "T-, M-, W-, G/S-kurslar yo‘nalishga qarab",
                              de: "T-, M-, W-, G/S-Kurse je nach Fachrichtung"
                            },
                    {
                              uz: "Kirish imtihoni bo‘lishi mumkin",
                              de: "Aufnahmeprüfung kann erforderlich sein"
                            },
                    {
                              uz: "Yakuniy imtihon tanlangan fan yo‘liga bog‘liq",
                              de: "Feststellungsprüfung richtet sich nach Schwerpunkt"
                            }
                  ]
          },
      eligibility: {
            title: {
                    uz: "Kimlar uchun muhim?",
                    de: "Für wen ist das wichtig?"
                  },
            paragraphs: [
                    {
                              uz: "Talablar maqsad, muassasa va individual holatga qarab farq qiladi. Ariza topshirishdan oldin aynan mas’ul idoraning amaldagi ko‘rsatmasini tekshirish kerak.",
                              de: "Die Anforderungen unterscheiden sich je nach Zweck, Institution und Einzelfall. Vor der Antragstellung sollten immer die aktuellen Vorgaben der zuständigen Stelle geprüft werden."
                            }
                  ]
          },
      requirements: {
            title: {
                    uz: "Asosiy talablar",
                    de: "Zentrale Anforderungen"
                  },
            items: [
                    {
                              uz: "Studienkollegga mos ta’lim hujjati",
                              de: "Geeigneter Bildungsabschluss"
                            },
                    {
                              uz: "Ko‘pincha kamida B1/B2 nemis tili",
                              de: "Häufig mindestens B1/B2 Deutsch"
                            },
                    {
                              uz: "Kirish imtihoniga tayyorgarlik",
                              de: "Vorbereitung auf Aufnahmeprüfung"
                            }
                  ]
          },
      documents: {
            title: {
                    uz: "Tayyorlanadigan hujjatlar",
                    de: "Vorzubereitende Unterlagen"
                  },
            items: [
                    {
                              uz: "Attestat va baholar",
                              de: "Schulabschluss und Noten"
                            },
                    {
                              uz: "Tarjima va tasdiqlangan nusxa",
                              de: "Übersetzung und beglaubigte Kopie"
                            },
                    {
                              uz: "Til sertifikati",
                              de: "Sprachzertifikat"
                            },
                    {
                              uz: "Ariza va pasport",
                              de: "Antrag und Pass"
                            }
                  ]
          },
      conditions: {
            title: {
                    uz: "Real holat va muhim farqlar",
                    de: "Praxis und wichtige Unterschiede"
                  },
            paragraphs: [
                    {
                              uz: "Studienkolleglar talabi va kurs tizimi bir xil emas. Davlat va xususiy muassasalar narx, qabul va tan olinishi bo‘yicha farq qiladi.",
                              de: "Studienkollegs haben unterschiedliche Anforderungen. Staatliche und private Angebote unterscheiden sich bei Kosten, Zulassung und Anerkennung."
                            },
                    {
                              uz: "DAAD ma’lumotiga ko‘ra Studienkolleglar ko‘pincha nemis tilida bo‘lib, tilni C1gacha rivojlantiradi.",
                              de: "Laut DAAD sind Studienkollegs überwiegend deutschsprachig und führen sprachlich häufig bis C1."
                            }
                  ]
          },
      warnings: {
            title: {
                    uz: "Ko‘p uchraydigan xatolar",
                    de: "Häufige Fehler"
                  },
            items: [
                    {
                              uz: "Har qanday xususiy kursni davlat Studienkollegiga teng deb o‘ylash",
                              de: "Jeden privaten Kurs mit staatlichem Studienkolleg gleichsetzen"
                            },
                    {
                              uz: "Kurs yo‘nalishini noto‘g‘ri tanlash",
                              de: "Falschen Schwerpunktkurs wählen"
                            },
                    {
                              uz: "Kirish imtihonini e’tiborsiz qoldirish",
                              de: "Aufnahmeprüfung unterschätzen"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Kirish huquqini tekshiring",
                    de: "Zugang prüfen"
                  },
            description: {
                    uz: "Sizga Studienkolleg kerakligini DAAD yoki universitet orqali aniqlang.",
                    de: "Klären Sie über DAAD oder Hochschule, ob ein Studienkolleg nötig ist."
                  }
          },
      {
            title: {
                    uz: "Kurs turini tanlang",
                    de: "Schwerpunkt wählen"
                  },
            description: {
                    uz: "Kelajakdagi yo‘nalishga mos kursni tanlang.",
                    de: "Wählen Sie den passenden Schwerpunkt."
                  }
          },
      {
            title: {
                    uz: "Til va kirish imtihoniga tayyorlaning",
                    de: "Sprache und Aufnahmeprüfung vorbereiten"
                  },
            description: {
                    uz: "Nemis tili va matematika kabi talablarni mashq qiling.",
                    de: "Trainieren Sie Deutsch und gegebenenfalls Mathematik."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "Studienkolleg universitetmi?",
                    de: "Ist ein Studienkolleg eine Hochschule?"
                  },
            answer: {
                    uz: "Yo‘q. U universitetga tayyorlov muassasasi.",
                    de: "Nein. Es ist eine Vorbereitungseinrichtung."
                  }
          },
      {
            question: {
                    uz: "B1 bilan Studienkollegga kirish mumkinmi?",
                    de: "Reicht B1 für das Studienkolleg?"
                  },
            answer: {
                    uz: "Ba’zi dasturlar B1 qabul qiladi, boshqalari B2 yoki kirish imtihoni talab qiladi.",
                    de: "Einige Angebote akzeptieren B1, andere verlangen B2 oder eine Aufnahmeprüfung."
                  }
          }
    ],
  sources: [
      {
            title: "Studienkollegs",
            organization: "DAAD",
            url: "https://www.daad.de/en/studying-in-germany/requirements/studienkollegs/",
            language: "en"
          },
      {
            title: "Database on admission requirements",
            organization: "DAAD",
            url: "https://www.daad.de/en/studying-in-germany/requirements/admission-database/",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "university-admission-germany",
      "university-language-tests",
      "bachelor-master-application"
    ]
} satisfies LocalizedGuideArticle;
