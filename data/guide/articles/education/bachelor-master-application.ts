import type { LocalizedGuideArticle } from "../../../../types/guide";

export const bachelorMasterApplicationArticle = {
  id: "bachelor-master-application",
  slug: "bachelor-master-application",
  categorySlug: "education",
  title: {
      uz: "Bachelor va Master uchun ariza topshirish",
      de: "Bewerbung für Bachelor und Master"
    },
  excerpt: {
      uz: "Germaniyada Bachelor yoki Master dasturiga ariza: universitet, uni-assist, deadline, hujjatlar, tarjima, motivatsiya xati va dasturga xos talablar.",
      de: "Bewerbung für Bachelor oder Master: Hochschule, uni-assist, Fristen, Unterlagen, Übersetzungen, Motivation und programmspezifische Anforderungen."
    },
  intro: {
      uz: "Ariza yo‘li universitet va dasturga bog‘liq: to‘g‘ridan-to‘g‘ri universitetga, uni-assist orqali yoki maxsus portal orqali topshirilishi mumkin. Master dasturlarida oldingi fanlar tarkibi va ECTS mosligi alohida tekshiriladi.",
      de: "Der Bewerbungsweg hängt von Hochschule und Studiengang ab: direkt, über uni-assist oder über ein Fachportal. Bei Masterprogrammen werden häufig Fachinhalte und ECTS des Vorstudiums detailliert geprüft."
    },
  status: "published",
  featured: false,
  lastReviewedAt: "2026-08-06",
  readingTime: {
      uz: "10 daqiqa",
      de: "10 Minuten"
    },
  facts: [
      {
            label: {
                    uz: "Bachelor",
                    de: "Bachelor"
                  },
            value: {
                    uz: "Hochschulzugangsberechtigung asosiy",
                    de: "Hochschulzugangsberechtigung zentral"
                  }
          },
      {
            label: {
                    uz: "Master",
                    de: "Master"
                  },
            value: {
                    uz: "Mos Bachelor va fan tarkibi",
                    de: "Passender Bachelor und Fachinhalte"
                  }
          },
      {
            label: {
                    uz: "Portal",
                    de: "Portal"
                  },
            value: {
                    uz: "Universitet yoki uni-assist",
                    de: "Hochschule oder uni-assist"
                  }
          },
      {
            label: {
                    uz: "Deadline",
                    de: "Frist"
                  },
            value: {
                    uz: "Dastur bo‘yicha farq qiladi",
                    de: "Studiengangsspezifisch"
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
                              uz: "NC yoki non-NC dastur",
                              de: "NC- oder zulassungsfreier Studiengang"
                            },
                    {
                              uz: "Wintersemester va Sommersemester muddatlari",
                              de: "Fristen für Winter- und Sommersemester"
                            },
                    {
                              uz: "Masterda modul tavsiflari talab qilinishi mumkin",
                              de: "Im Master können Modulbeschreibungen nötig sein"
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
                              uz: "Dasturga mos akademik hujjat",
                              de: "Passender akademischer Abschluss"
                            },
                    {
                              uz: "Til dalili",
                              de: "Sprachnachweis"
                            },
                    {
                              uz: "Deadlinegacha to‘liq ariza",
                              de: "Vollständige Bewerbung vor Frist"
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
                              uz: "Diplom yoki attestat",
                              de: "Abschlusszeugnis"
                            },
                    {
                              uz: "Transkript",
                              de: "Notenübersicht"
                            },
                    {
                              uz: "CV",
                              de: "Lebenslauf"
                            },
                    {
                              uz: "Motivatsiya xati — talab qilinsa",
                              de: "Motivationsschreiben, soweit verlangt"
                            },
                    {
                              uz: "Til sertifikati",
                              de: "Sprachzertifikat"
                            },
                    {
                              uz: "Modul tavsiflari — Master uchun",
                              de: "Modulbeschreibungen für Master"
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
                              uz: "Bir xil nomdagi Master dasturlari ham turli prerequisite va ECTS talablariga ega bo‘lishi mumkin.",
                              de: "Auch gleich benannte Masterprogramme können unterschiedliche Fach- und ECTS-Voraussetzungen haben."
                            },
                    {
                              uz: "Hujjatlarning portalga yuklanishi ariza yakunlandi degani emas; fee, VPD yoki qo‘shimcha yuborish talabi bo‘lishi mumkin.",
                              de: "Das Hochladen der Unterlagen bedeutet nicht automatisch eine abgeschlossene Bewerbung; Gebühren, VPD oder zusätzliche Einreichungen können nötig sein."
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
                              uz: "Deadline kuni ariza boshlash",
                              de: "Bewerbung erst am Fristtag beginnen"
                            },
                    {
                              uz: "Master uchun modul tavsiflarini unutish",
                              de: "Modulbeschreibungen im Master vergessen"
                            },
                    {
                              uz: "Portal statusini tekshirmaslik",
                              de: "Portalstatus nicht kontrollieren"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Dastur checklistini oling",
                    de: "Checkliste öffnen"
                  },
            description: {
                    uz: "Rasmiy dastur sahifasidagi barcha talablarni yozib oling.",
                    de: "Notieren Sie alle offiziellen Anforderungen."
                  }
          },
      {
            title: {
                    uz: "Hujjatlarni tayyorlang",
                    de: "Unterlagen vorbereiten"
                  },
            description: {
                    uz: "Tarjima, certified copy va formatni tekshiring.",
                    de: "Prüfen Sie Übersetzung, Beglaubigung und Format."
                  }
          },
      {
            title: {
                    uz: "Erta topshiring",
                    de: "Früh einreichen"
                  },
            description: {
                    uz: "Texnik yoki hujjat muammosi uchun vaqt qoldiring.",
                    de: "Lassen Sie Zeit für technische oder formale Probleme."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "uni-assist barcha universitet uchunmi?",
                    de: "Nutzen alle Hochschulen uni-assist?"
                  },
            answer: {
                    uz: "Yo‘q. Ariza yo‘li universitet va dasturga bog‘liq.",
                    de: "Nein. Der Bewerbungsweg hängt von Hochschule und Studiengang ab."
                  }
          },
      {
            question: {
                    uz: "Master uchun Bachelor nomi aynan bir xil bo‘lishi kerakmi?",
                    de: "Muss der Bachelor exakt gleich heißen?"
                  },
            answer: {
                    uz: "Har doim emas, lekin fan tarkibi va ECTS mosligi tekshiriladi.",
                    de: "Nicht immer, aber Fachinhalte und ECTS werden geprüft."
                  }
          }
    ],
  sources: [
      {
            title: "Application process",
            organization: "DAAD",
            url: "https://www.daad.de/en/studying-in-germany/requirements/application-process/",
            language: "en"
          },
      {
            title: "Requirements overview",
            organization: "DAAD",
            url: "https://www.daad.de/en/studying-in-germany/requirements/overview/",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "university-admission-germany",
      "studienkolleg-guide",
      "study-financing-germany"
    ]
} satisfies LocalizedGuideArticle;
