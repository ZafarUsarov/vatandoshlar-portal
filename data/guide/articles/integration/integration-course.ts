import type { LocalizedGuideArticle } from "../../../../types/guide";

export const integrationCourseArticle = {
  id: "integration-course",
  slug: "integration-course",
  categorySlug: "integration",
  title: {
      uz: "Integratsiya kursi: kim qatnashadi va qanday ishlaydi",
      de: "Integrationskurs: Teilnahme und Ablauf"
    },
  excerpt: {
      uz: "BAMF integratsiya kursining til va orientatsiya qismlari, qatnashish huquqi, majburiyat, kurs turlari va BAMF-NAvI orqali kurs topish.",
      de: "Sprach- und Orientierungsteil des BAMF-Integrationskurses, Teilnahmeberechtigung, Verpflichtung, Kursarten und Kurssuche über BAMF-NAvI."
    },
  intro: {
      uz: "Integratsiya kursi nemis tili va Germaniyaning huquqiy, tarixiy hamda ijtimoiy tizimi bo‘yicha orientatsiya kursidan iborat. Umumiy kurs odatda 700 dars birligini tashkil qiladi.",
      de: "Der Integrationskurs besteht aus Sprachkurs und Orientierungskurs zu Rechtsordnung, Geschichte und Gesellschaft. Der allgemeine Integrationskurs umfasst in der Regel 700 Unterrichtseinheiten."
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
                    uz: "Tarkib",
                    de: "Inhalt"
                  },
            value: {
                    uz: "Til kursi va orientatsiya",
                    de: "Sprach- und Orientierungskurs"
                  }
          },
      {
            label: {
                    uz: "Umumiy kurs",
                    de: "Allgemeiner Kurs"
                  },
            value: {
                    uz: "700 dars birligi",
                    de: "700 Unterrichtseinheiten"
                  }
          },
      {
            label: {
                    uz: "Yakun",
                    de: "Abschluss"
                  },
            value: {
                    uz: "DTZ va Leben in Deutschland",
                    de: "DTZ und Leben in Deutschland"
                  }
          },
      {
            label: {
                    uz: "Qidiruv",
                    de: "Suche"
                  },
            value: {
                    uz: "BAMF-NAvI",
                    de: "BAMF-NAvI"
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
                              uz: "Umumiy integratsiya kursi",
                              de: "Allgemeiner Integrationskurs"
                            },
                    {
                              uz: "Ayollar, ota-onalar, yoshlar yoki savodxonlik kurslari",
                              de: "Frauen-, Eltern-, Jugend- oder Alphabetisierungskurse"
                            },
                    {
                              uz: "Intensiv va maxsus kurslar",
                              de: "Intensiv- und Spezialkurse"
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
                              uz: "Teilnahmeberechtigung yoki Verpflichtung",
                              de: "Teilnahmeberechtigung oder Verpflichtung"
                            },
                    {
                              uz: "Einstufungstest",
                              de: "Einstufungstest"
                            },
                    {
                              uz: "Tasdiqlangan kurs provayderi",
                              de: "Zugelassener Kursträger"
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
                              uz: "Residence permit",
                              de: "Aufenthaltstitel"
                            },
                    {
                              uz: "BAMF yoki Ausländerbehörde hujjati",
                              de: "BAMF- oder Behördenberechtigung"
                            },
                    {
                              uz: "Pasport",
                              de: "Identitätsnachweis"
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
                              uz: "Ayrim uchinchi davlat fuqarolari Aufenthaltstitel va kelish sababiga qarab kursda qatnashish huquqiga ega bo‘lishi mumkin; ayrimlar esa majbur qilinishi mumkin.",
                              de: "Je nach Aufenthaltstitel und Aufenthaltszweck können Drittstaatsangehörige teilnahmeberechtigt oder verpflichtet sein."
                            },
                    {
                              uz: "EU fuqarolarida avtomatik huquq bo‘lmasligi mumkin, lekin bo‘sh joy bo‘lsa BAMF ruxsat berishi mumkin.",
                              de: "EU-Bürger haben nicht automatisch einen Anspruch, können aber bei freien Plätzen zugelassen werden."
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
                              uz: "Har qanday til kursini Integrationskurs deb o‘ylash",
                              de: "Jeden Sprachkurs als Integrationskurs ansehen"
                            },
                    {
                              uz: "Berechtigung muddatini e’tiborsiz qoldirish",
                              de: "Gültigkeit der Berechtigung übersehen"
                            },
                    {
                              uz: "Kursga qatnashish majburiyatini buzish",
                              de: "Teilnahmepflicht nicht beachten"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Huquqni tekshiring",
                    de: "Teilnahme prüfen"
                  },
            description: {
                    uz: "BAMF yoki Ausländerbehörde orqali statusni aniqlang.",
                    de: "Klären Sie den Status bei BAMF oder Ausländerbehörde."
                  }
          },
      {
            title: {
                    uz: "Kurs toping",
                    de: "Kurs finden"
                  },
            description: {
                    uz: "BAMF-NAvI orqali yaqin provayderni toping.",
                    de: "Suchen Sie über BAMF-NAvI einen Träger."
                  }
          },
      {
            title: {
                    uz: "Einstufungstest o‘ting",
                    de: "Einstufungstest machen"
                  },
            description: {
                    uz: "Mos kurs bosqichidan boshlang.",
                    de: "Starten Sie im passenden Kursabschnitt."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "Integratsiya kursi majburiymi?",
                    de: "Ist der Integrationskurs Pflicht?"
                  },
            answer: {
                    uz: "Bu residence status va idora qaroriga bog‘liq.",
                    de: "Das hängt vom Aufenthaltsstatus und der Behördenentscheidung ab."
                  }
          },
      {
            question: {
                    uz: "Kurs faqat tilmi?",
                    de: "Ist der Kurs nur Sprache?"
                  },
            answer: {
                    uz: "Yo‘q. Orientatsiya qismi ham bor.",
                    de: "Nein. Er enthält auch einen Orientierungskurs."
                  }
          }
    ],
  sources: [
      {
            title: "Integration courses",
            organization: "BAMF",
            url: "https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
            language: "en"
          },
      {
            title: "Content and stages of the procedure",
            organization: "BAMF",
            url: "https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/InhaltAblauf/inhaltablauf-node.html",
            language: "en"
          },
      {
            title: "Integration courses",
            organization: "BAMF-NAvI",
            url: "https://bamf-navi.bamf.de/en/Themen/Integrationskurse/",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "dtz-lid",
      "vocational-language-courses",
      "naturalisation-language-integration"
    ]
} satisfies LocalizedGuideArticle;
