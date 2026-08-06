import type { LocalizedGuideArticle } from "../../../../types/guide";

export const recognitionProcedureArticle = {
  id: "recognition-procedure",
  slug: "recognition-procedure",
  categorySlug: "recognition",
  title: {
      uz: "Anerkennung jarayoni bosqichma-bosqich",
      de: "Anerkennungsverfahren Schritt für Schritt"
    },
  excerpt: {
      uz: "Mas’ul idora, ariza, hujjat tekshiruvi, equivalence assessment, mumkin bo‘lgan natijalar va qo‘shimcha choralar.",
      de: "Zuständige Stelle, Antrag, Dokumentenprüfung, Gleichwertigkeitsprüfung, mögliche Ergebnisse und Ausgleichsmaßnahmen."
    },
  intro: {
      uz: "Jarayon mas’ul idorani topishdan boshlanadi. Idora xorijiy malakani Germaniya Referenzberuf bilan taqqoslaydi va rasmiy qaror chiqaradi.",
      de: "Das Verfahren beginnt mit der Ermittlung der zuständigen Stelle. Diese vergleicht die ausländische Qualifikation mit dem deutschen Referenzberuf und erlässt einen Bescheid."
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
                    uz: "Boshlanish",
                    de: "Start"
                  },
            value: {
                    uz: "Recognition Finder",
                    de: "Recognition Finder"
                  }
          },
      {
            label: {
                    uz: "Baholash",
                    de: "Prüfung"
                  },
            value: {
                    uz: "Ta’lim mazmuni va tajriba",
                    de: "Ausbildungsinhalte und Erfahrung"
                  }
          },
      {
            label: {
                    uz: "Natija",
                    de: "Ergebnis"
                  },
            value: {
                    uz: "To‘liq yoki qisman tenglik",
                    de: "Volle oder teilweise Gleichwertigkeit"
                  }
          },
      {
            label: {
                    uz: "Hujjat",
                    de: "Dokument"
                  },
            value: {
                    uz: "Rasmiy Bescheid",
                    de: "Amtlicher Bescheid"
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
                              uz: "Ariza qabul qilinishi",
                              de: "Antragseingang"
                            },
                    {
                              uz: "Hujjatlar to‘liqligi tekshiruvi",
                              de: "Prüfung der Vollständigkeit"
                            },
                    {
                              uz: "Mazmuniy equivalence assessment",
                              de: "Inhaltliche Gleichwertigkeitsprüfung"
                            },
                    {
                              uz: "Bescheid va keyingi qadam",
                              de: "Bescheid und nächste Schritte"
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
                              uz: "To‘liq hujjat",
                              de: "Vollständige Unterlagen"
                            },
                    {
                              uz: "Aniq Referenzberuf",
                              de: "Konkreter Referenzberuf"
                            },
                    {
                              uz: "Qo‘shimcha ma’lumotga tez javob",
                              de: "Schnelle Reaktion auf Nachforderungen"
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
                              uz: "Diplom va fanlar ro‘yxati",
                              de: "Abschluss und Fächerübersicht"
                            },
                    {
                              uz: "Ish tajribasi",
                              de: "Berufserfahrung"
                            },
                    {
                              uz: "Kurs va sertifikatlar",
                              de: "Fortbildungen und Zertifikate"
                            },
                    {
                              uz: "Tarjima",
                              de: "Übersetzungen"
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
                              uz: "Baholashda nafaqat formal o‘qish, balki ish tajribasi va qo‘shimcha malaka ham hisobga olinishi mumkin.",
                              de: "Bei der Prüfung können neben der formalen Ausbildung auch Berufserfahrung und zusätzliche Qualifikationen berücksichtigt werden."
                            },
                    {
                              uz: "Qisman tenglik aniqlansa, Anpassungslehrgang yoki Kenntnisprüfung kabi choralar taklif qilinishi mumkin.",
                              de: "Bei teilweiser Gleichwertigkeit können Ausgleichsmaßnahmen wie Anpassungslehrgang oder Kenntnisprüfung erforderlich sein."
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
                              uz: "Hujjat yetishmasligini yashirish",
                              de: "Fehlende Unterlagen nicht erklären"
                            },
                    {
                              uz: "Deadlinega javob bermaslik",
                              de: "Nachforderungsfristen versäumen"
                            },
                    {
                              uz: "Bescheidni tushunmasdan qoldirish",
                              de: "Bescheid nicht prüfen"
                            }
                  ]
          }
    },
  steps: [
      {
            title: {
                    uz: "Checklist oling",
                    de: "Checkliste beschaffen"
                  },
            description: {
                    uz: "Mas’ul idora talabini aniq yozib oling.",
                    de: "Notieren Sie die Anforderungen der Stelle."
                  }
          },
      {
            title: {
                    uz: "Ariza topshiring",
                    de: "Antrag stellen"
                  },
            description: {
                    uz: "To‘liq hujjat va tarjimalarni yuboring.",
                    de: "Reichen Sie vollständige Unterlagen ein."
                  }
          },
      {
            title: {
                    uz: "Bescheidni tahlil qiling",
                    de: "Bescheid auswerten"
                  },
            description: {
                    uz: "To‘liq, qisman yoki qo‘shimcha chora natijasini tushuning.",
                    de: "Verstehen Sie Anerkennung, Teilanerkennung oder Ausgleichsmaßnahme."
                  }
          }
    ],
  faq: [
      {
            question: {
                    uz: "Jarayon qancha davom etadi?",
                    de: "Wie lange dauert das Verfahren?"
                  },
            answer: {
                    uz: "Muddat kasb, idora va hujjat to‘liqligiga bog‘liq.",
                    de: "Die Dauer hängt von Beruf, Stelle und Vollständigkeit ab."
                  }
          },
      {
            question: {
                    uz: "Ish tajribasi hisobga olinadimi?",
                    de: "Wird Berufserfahrung berücksichtigt?"
                  },
            answer: {
                    uz: "Ko‘p jarayonda muhim farqlarni qoplashda hisobga olinishi mumkin.",
                    de: "Sie kann in vielen Verfahren wesentliche Unterschiede ausgleichen."
                  }
          }
    ],
  sources: [
      {
            title: "Recognition procedure",
            organization: "Recognition in Germany",
            url: "https://www.anerkennung-in-deutschland.de/html/en/pro/recognition-procedure.php",
            language: "en"
          },
      {
            title: "Documents for the application",
            organization: "Recognition in Germany",
            url: "https://www.anerkennung-in-deutschland.de/html/en/documents-application.php",
            language: "en"
          }
    ],
  relatedArticleSlugs: [
      "recognition-overview",
      "regulated-professions",
      "anabin-zab-recognition"
    ]
} satisfies LocalizedGuideArticle;
