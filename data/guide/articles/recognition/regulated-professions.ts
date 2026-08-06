import type { LocalizedGuideArticle } from "../../../../types/guide";

export const regulatedProfessionsArticle = {
  id: "regulated-professions",
  slug: "regulated-professions",
  categorySlug: "recognition",
  title: {
      uz: "Reglementierte kasblar: shifokor, o‘qituvchi va boshqalar",
      de: "Reglementierte Berufe: Arzt, Lehrer und weitere"
    },
  excerpt: {
      uz: "Qaysi kasblarda formal tan olish va professional ruxsat zarur, til va qo‘shimcha imtihonlar, Bundesland farqlari.",
      de: "Wann formale Anerkennung und Berufszulassung nötig sind, Sprach- und Zusatzprüfungen sowie Unterschiede der Bundesländer."
    },
  intro: {
      uz: "Reglementierte kasblarda ishlash qonun bilan himoyalangan va faqat tan olingan malaka hamda kerakli professional ruxsat bilan mumkin. Shifokor, hamshira, o‘qituvchi va ayrim muhandislik unvonlari bunga misol bo‘lishi mumkin.",
      de: "Reglementierte Berufe dürfen nur mit anerkannter Qualifikation und erforderlicher Berufszulassung ausgeübt werden. Beispiele sind Ärzte, Pflegeberufe, Lehrer und bestimmte geschützte Berufsbezeichnungen."
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
                    uz: "Majburiy",
                    de: "Pflicht"
                  },
            value: {
                    uz: "Formal recognition va ruxsat",
                    de: "Formale Anerkennung und Zulassung"
                  }
          },
      {
            label: {
                    uz: "Til",
                    de: "Sprache"
                  },
            value: {
                    uz: "Kasbga xos til talabi bo‘lishi mumkin",
                    de: "Berufsspezifische Sprachprüfung möglich"
                  }
          },
      {
            label: {
                    uz: "Hudud",
                    de: "Region"
                  },
            value: {
                    uz: "Bundesland bo‘yicha idora farq qiladi",
                    de: "Zuständigkeit nach Bundesland"
                  }
          },
      {
            label: {
                    uz: "Natija",
                    de: "Ergebnis"
                  },
            value: {
                    uz: "Approbation yoki boshqa ruxsat",
                    de: "Approbation oder andere Erlaubnis"
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
                              uz: "Sog‘liqni saqlash kasblari",
                              de: "Gesundheitsberufe"
                            },
                    {
                              uz: "O‘qituvchilik",
                              de: "Lehramt"
                            },
                    {
                              uz: "Huquq bilan himoyalangan unvonlar",
                              de: "Gesetzlich geschützte Berufsbezeichnungen"
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
                              uz: "Formal equivalence",
                              de: "Formale Gleichwertigkeit"
                            },
                    {
                              uz: "Shaxsiy ishonchlilik va sog‘liq talabi",
                              de: "Persönliche Zuverlässigkeit und Gesundheit"
                            },
                    {
                              uz: "Nemis tili yoki Fachsprache",
                              de: "Deutsch oder Fachsprache"
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
                              uz: "Diplom va curriculum",
                              de: "Abschluss und Curriculum"
                            },
                    {
                              uz: "Good standing yoki professional hujjat",
                              de: "Berufsrechtliche Nachweise"
                            },
                    {
                              uz: "Til sertifikati",
                              de: "Sprachnachweis"
                            },
                    {
                              uz: "Sog‘liq va police certificate",
                              de: "Gesundheits- und Führungsnachweis"
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
                              uz: "Kasb nomi va ruxsat turi Bundesland hamda kasb qonuniga bog‘liq. Bir Bundeslanddagi idora boshqa hududdan farq qilishi mumkin.",
                              de: "Berufsbezeichnung, Zulassung und zuständige Stelle richten sich nach Berufsrecht und Bundesland."
                            },
                    {
                              uz: "Academic degree assessment professional licence o‘rnini bosmaydi.",
                              de: "Eine akademische Zeugnisbewertung ersetzt keine Berufszulassung."
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
                              uz: "ZAB hujjatini Approbation deb tushunish",
                              de: "ZAB-Bewertung mit Approbation verwechseln"
                            },
                    {
                              uz: "Fachsprache talabini kech boshlash",
                              de: "Fachsprachenprüfung zu spät vorbereiten"
                            },
                    {
                              uz: "Noto‘g‘ri Bundesland idorasiga ariza berish",
                              de: "Bei falscher Landesbehörde beantragen"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Kasb reglementierte ekanini tekshiring",
                    de: "Reglementierung prüfen"
                  },
            description: {
                    uz: "Recognition Finder orqali kasb statusini tekshiring.",
                    de: "Prüfen Sie den Berufsstatus im Recognition Finder."
                  }
          },
      {
            title: {
                    uz: "Ruxsat turini aniqlang",
                    de: "Zulassung klären"
                  },
            description: {
                    uz: "Approbation, Erlaubnis yoki Anerkennung talabini aniqlang.",
                    de: "Klären Sie Approbation, Erlaubnis oder Anerkennung."
                  }
          },
      {
            title: {
                    uz: "Til va hujjatlarni tayyorlang",
                    de: "Sprache und Unterlagen vorbereiten"
                  },
            description: {
                    uz: "Kasbga xos imtihon va hujjatlarni rejalang.",
                    de: "Planen Sie Fachsprache und Unterlagen."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "Reglementierte kasbda recognition bo‘lmasdan ishlash mumkinmi?",
                    de: "Darf man ohne Anerkennung arbeiten?"
                  },
            answer: {
                    uz: "Odatda professional unvon va to‘liq faoliyat uchun yo‘q.",
                    de: "Für geschützte Berufsbezeichnung und volle Tätigkeit grundsätzlich nein."
                  }
          },
      {
            question: {
                    uz: "ZAB yetarlimi?",
                    de: "Reicht die ZAB?"
                  },
            answer: {
                    uz: "Yo‘q. Professional licence uchun tegishli Anerkennung idorasi kerak.",
                    de: "Nein. Für die Berufszulassung ist die zuständige Anerkennungsstelle nötig."
                  }
          }
    ],
  sources: [
      {
            title: "Advantages of recognition",
            organization: "Recognition in Germany",
            url: "https://www.anerkennung-in-deutschland.de/html/en/advantages-recognition.php",
            language: "en"
          },
      {
            title: "FAQ",
            organization: "Recognition in Germany",
            url: "https://www.anerkennung-in-deutschland.de/html/en/faq.php",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "recognition-overview",
      "recognition-procedure",
      "anabin-zab-recognition"
    ]
} satisfies LocalizedGuideArticle;
