import type { LocalizedGuideArticle } from "../../../../types/guide";

export const interviewEmploymentContractArticle = {
  id: "interview-employment-contract",
  slug: "interview-employment-contract",
  categorySlug: "work-and-career",
  title: {
      uz: "Ish suhbati va Arbeitsvertragni tekshirish",
      de: "Vorstellungsgespräch und Arbeitsvertrag prüfen"
    },
  excerpt: {
      uz: "Germaniyada interviewga tayyorgarlik, maosh, probation, ish vaqti, ta’til, notice period va shartnomani imzolashdan oldin tekshirish.",
      de: "Vorbereitung auf Vorstellungsgespräch sowie Prüfung von Gehalt, Probezeit, Arbeitszeit, Urlaub und Kündigungsfrist vor Vertragsunterzeichnung."
    },
  intro: {
      uz: "Suhbatda faqat texnik savol emas, motivatsiya, tajriba va jamoaviy ishlash ham baholanadi. Taklif kelgach, shartnomani imzolashdan oldin barcha asosiy bandlarni tushunish muhim.",
      de: "Im Gespräch werden nicht nur Fachkenntnisse, sondern auch Motivation, Erfahrung und Zusammenarbeit bewertet. Vor der Unterschrift müssen die zentralen Vertragsbedingungen verstanden werden."
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
                    uz: "Probezeit",
                    de: "Probezeit"
                  },
            value: {
                    uz: "Ko‘pincha shartnomada belgilanadi",
                    de: "Häufig vertraglich vereinbart"
                  }
          },
      {
            label: {
                    uz: "Ish vaqti",
                    de: "Arbeitszeit"
                  },
            value: {
                    uz: "Haftalik soat va overtime",
                    de: "Wochenstunden und Überstunden"
                  }
          },
      {
            label: {
                    uz: "Ta’til",
                    de: "Urlaub"
                  },
            value: {
                    uz: "Shartnoma va qonun minimumi",
                    de: "Vertrag und gesetzlicher Mindesturlaub"
                  }
          },
      {
            label: {
                    uz: "Notice",
                    de: "Kündigung"
                  },
            value: {
                    uz: "Kündigungsfristni tekshirish",
                    de: "Kündigungsfrist prüfen"
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
                              uz: "STAR usulida tajriba misollari",
                              de: "Erfahrungsbeispiele nach STAR"
                            },
                    {
                              uz: "Maosh va start date",
                              de: "Gehalt und Eintrittstermin"
                            },
                    {
                              uz: "Shartnoma bandlarini yozma tekshirish",
                              de: "Vertragsklauseln schriftlich prüfen"
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
                              uz: "Rol va kompaniyani o‘rganish",
                              de: "Rolle und Unternehmen recherchieren"
                            },
                    {
                              uz: "Savollarga real misollar tayyorlash",
                              de: "Konkrete Beispiele vorbereiten"
                            },
                    {
                              uz: "Shartnoma tushunilmasa maslahat olish",
                              de: "Bei Unklarheiten Beratung einholen"
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
                              uz: "Vakansiya va CV",
                              de: "Stellenanzeige und Lebenslauf"
                            },
                    {
                              uz: "Savollar ro‘yxati",
                              de: "Fragenliste"
                            },
                    {
                              uz: "Arbeitsvertrag va qo‘shimchalar",
                              de: "Arbeitsvertrag und Anlagen"
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
                              uz: "Og‘zaki va’da shartnomadagi band bilan bir xil bo‘lmasligi mumkin. Maosh, remote work, bonus va relocation kabi muhim kelishuvlar yozma bo‘lishi kerak.",
                              de: "Mündliche Zusagen können vom Vertrag abweichen. Gehalt, Remote Work, Bonus und Relocation sollten schriftlich festgehalten werden."
                            },
                    {
                              uz: "Shartnomani tushunmasdan tez imzolash shart emas; reasonable tekshiruv va savol berish professional hisoblanadi.",
                              de: "Ein Vertrag muss nicht ungeprüft sofort unterschrieben werden. Eine angemessene Prüfung und Rückfragen sind professionell."
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
                              uz: "Faqat maoshga qarash",
                              de: "Nur auf das Gehalt achten"
                            },
                    {
                              uz: "Overtime va notice periodni o‘qimaslik",
                              de: "Überstunden und Kündigungsfrist überlesen"
                            },
                    {
                              uz: "Og‘zaki va’daga tayanish",
                              de: "Nur auf mündliche Zusagen vertrauen"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Suhbatga misollar tayyorlang",
                    de: "Beispiele vorbereiten"
                  },
            description: {
                    uz: "Texnik va xulqiy savollarga real misollar yozing.",
                    de: "Bereiten Sie konkrete fachliche und verhaltensbezogene Beispiele vor."
                  }
          },
      {
            title: {
                    uz: "Taklifni solishtiring",
                    de: "Angebot prüfen"
                  },
            description: {
                    uz: "Maosh, ish vaqti, joy va benefitsni solishtiring.",
                    de: "Vergleichen Sie Gehalt, Arbeitszeit, Ort und Benefits."
                  }
          },
      {
            title: {
                    uz: "Shartnomani o‘qing",
                    de: "Vertrag lesen"
                  },
            description: {
                    uz: "Tushunarsiz bandlarni yozma so‘rang.",
                    de: "Fragen Sie unklare Punkte schriftlich nach."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "Shartnomani darhol imzolash kerakmi?",
                    de: "Muss man sofort unterschreiben?"
                  },
            answer: {
                    uz: "Yo‘q. O‘qib chiqish va savol berish normal.",
                    de: "Nein. Prüfung und Rückfragen sind normal."
                  }
          },
      {
            question: {
                    uz: "Probezeitda huquqlar yo‘qmi?",
                    de: "Hat man in der Probezeit keine Rechte?"
                  },
            answer: {
                    uz: "Yo‘q. Huquqlar saqlanadi, lekin Kündigungsfrist qisqaroq bo‘lishi mumkin.",
                    de: "Doch. Rechte gelten weiterhin, aber die Kündigungsfrist kann kürzer sein."
                  }
          }
    ],
  sources: [
      {
            title: "Employment contracts",
            organization: "Make it in Germany",
            url: "https://www.make-it-in-germany.com/en/working-in-germany/working-environment/employment-contract",
            language: "en"
          },
      {
            title: "Job search and application",
            organization: "Make it in Germany",
            url: "https://www.make-it-in-germany.com/en/working-in-germany/job/application",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "german-cv",
      "cover-letter",
      "job-search-strategy"
    ]
} satisfies LocalizedGuideArticle;
