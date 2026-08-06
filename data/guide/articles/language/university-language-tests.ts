import type { LocalizedGuideArticle } from "../../../../types/guide";

export const universityLanguageTestsArticle = {
  id: "university-language-tests",
  slug: "university-language-tests",
  categorySlug: "language-and-certificates",
  title: {
      uz: "Universitet uchun TestDaF, DSH va boshqa til dalillari",
      de: "TestDaF, DSH und Sprachnachweise für die Hochschule"
    },
  excerpt: {
      uz: "Nemis tilidagi universitet dasturlariga kirish uchun til dalillari, TestDaF va DSH, B2/C1 real talablari hamda dastur bo‘yicha tekshiruv.",
      de: "Sprachnachweise für deutschsprachige Studiengänge, TestDaF, DSH, realistische B2/C1-Anforderungen und programmspezifische Prüfung."
    },
  intro: {
      uz: "Nemis tilidagi ko‘plab oliy ta’lim dasturlari kamida B2, ko‘pincha esa C1ga yaqin akademik til talab qiladi. Qabul qilinadigan sertifikat va minimal natija universitet hamda dasturga bog‘liq.",
      de: "Viele deutschsprachige Studiengänge verlangen mindestens B2, häufig jedoch akademische Sprachkompetenz nahe C1. Akzeptierte Nachweise und Mindestresultate richten sich nach Hochschule und Studiengang."
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
                    uz: "TestDaF",
                    de: "TestDaF"
                  },
            value: {
                    uz: "B2–C1 oralig‘idagi universitet imtihoni",
                    de: "Hochschulprüfung im Bereich B2–C1"
                  }
          },
      {
            label: {
                    uz: "DSH",
                    de: "DSH"
                  },
            value: {
                    uz: "Universitetlar o‘tkazadigan til imtihoni",
                    de: "Von Hochschulen durchgeführte Sprachprüfung"
                  }
          },
      {
            label: {
                    uz: "Real daraja",
                    de: "Praxisniveau"
                  },
            value: {
                    uz: "Ko‘p dasturlarda C1ga yaqin",
                    de: "In vielen Studiengängen nahe C1"
                  }
          },
      {
            label: {
                    uz: "Tekshiruv",
                    de: "Prüfung"
                  },
            value: {
                    uz: "Har bir dastur talabi alohida",
                    de: "Jeder Studiengang hat eigene Vorgaben"
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
                              uz: "TestDaF natijasi turli daraja komponentlarini ko‘rsatadi",
                              de: "TestDaF weist Teilkompetenzen aus"
                            },
                    {
                              uz: "DSH talabi universitetga qarab belgilanadi",
                              de: "DSH-Anforderung wird von der Hochschule festgelegt"
                            },
                    {
                              uz: "Ingliz tilidagi dasturda ham nemis tili kundalik hayot uchun zarur",
                              de: "Auch in englischen Programmen ist Deutsch für den Alltag wichtig"
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
                              uz: "Dastur sahifasidagi aniq til talabini tekshirish",
                              de: "Konkrete Sprachvorgabe des Studiengangs prüfen"
                            },
                    {
                              uz: "Ariza va enrollment bosqichidagi farqni aniqlash",
                              de: "Unterschied zwischen Bewerbung und Einschreibung klären"
                            },
                    {
                              uz: "Imtihon natijasi chiqish muddatini rejalash",
                              de: "Auswertungsfrist der Prüfung einplanen"
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
                              uz: "Til sertifikati",
                              de: "Sprachzertifikat"
                            },
                    {
                              uz: "Universitetning admission talabi",
                              de: "Zulassungsvorgabe der Hochschule"
                            },
                    {
                              uz: "Kerak bo‘lsa shartli qabul xati",
                              de: "Gegebenenfalls bedingte Zulassung"
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
                              uz: "DAAD ma’lumotiga ko‘ra ko‘p oliy ta’lim muassasalari kamida B2 talab qiladi, lekin murakkab akademik o‘qish va yozish uchun C1ga yaqin daraja ko‘pincha real ehtiyojdir.",
                              de: "Laut DAAD verlangen viele Hochschulen mindestens B2; für anspruchsvolles akademisches Lesen und Schreiben ist praktisch jedoch häufig ein Niveau nahe C1 erforderlich."
                            },
                    {
                              uz: "Til imtihoni natijasi kechiksa, admission yoki enrollment muddati o‘tib ketishi mumkin.",
                              de: "Verspätete Prüfungsergebnisse können Bewerbungs- oder Einschreibefristen gefährden."
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
                              uz: "Faqat umumiy B2 sertifikat bilan barcha universitet qabul qiladi deb o‘ylash",
                              de: "Annehmen, jedes allgemeine B2-Zertifikat werde akzeptiert"
                            },
                    {
                              uz: "Imtihon sanasini juda kech bron qilish",
                              de: "Prüfung zu spät buchen"
                            },
                    {
                              uz: "Faqat grammar bilan tayyorlanib, akademik yozishni mashq qilmaslik",
                              de: "Nur Grammatik statt akademischem Schreiben trainieren"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Dastur talabini tekshiring",
                    de: "Studiengang prüfen"
                  },
            description: {
                    uz: "Universitet sahifasidagi qabul qilinadigan imtihon va minimal natijani yozib oling.",
                    de: "Notieren Sie akzeptierte Prüfungen und Mindestresultate."
                  }
          },
      {
            title: {
                    uz: "Imtihon formatini tanlang",
                    de: "Prüfungsformat wählen"
                  },
            description: {
                    uz: "TestDaF, DSH yoki boshqa qabul qilinadigan variantni tanlang.",
                    de: "Wählen Sie TestDaF, DSH oder eine andere akzeptierte Prüfung."
                  }
          },
      {
            title: {
                    uz: "Muddat bilan rejalang",
                    de: "Fristgerecht planen"
                  },
            description: {
                    uz: "Natija admission muddatidan oldin tayyor bo‘lishini ta’minlang.",
                    de: "Planen Sie das Ergebnis vor der Bewerbungsfrist ein."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "B2 bilan universitetga kirish mumkinmi?",
                    de: "Kann man mit B2 studieren?"
                  },
            answer: {
                    uz: "Ba’zi dasturlar B2ni qabul qiladi, lekin ko‘p nemis tilidagi dasturlar yuqoriroq akademik ko‘nikma talab qiladi.",
                    de: "Einige Studiengänge akzeptieren B2, viele deutschsprachige Programme verlangen jedoch höhere akademische Sprachkompetenz."
                  }
          },
      {
            question: {
                    uz: "TestDaF va DSHdan qaysi biri yaxshi?",
                    de: "Ist TestDaF oder DSH besser?"
                  },
            answer: {
                    uz: "Qaysi biri qabul qilinishi, sana va shaxsiy formatga moslikka bog‘liq.",
                    de: "Das hängt von Akzeptanz, Termin und persönlicher Passung zum Prüfungsformat ab."
                  }
          }
    ],
  sources: [
      {
            title: "Requirements overview",
            organization: "DAAD",
            url: "https://www.daad.de/en/studying-in-germany/requirements/overview/",
            language: "en"
          },
      {
            title: "Studienkollegs",
            organization: "DAAD",
            url: "https://www.daad.de/en/studying-in-germany/requirements/studienkollegs/",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "german-levels-reality",
      "recognized-language-certificates",
      "university-admission-germany"
    ]
} satisfies LocalizedGuideArticle;
