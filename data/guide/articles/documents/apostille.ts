import type { LocalizedGuideArticle } from "../../../../types/guide";

export const apostilleArticle = {
      id: "apostille-guide",
      slug: "apostille-guide",
      categorySlug: "documents",
      title: {
        uz: "Apostil: hujjatni Germaniyada tan oldirish",
        de: "Apostille: Urkunden in Deutschland verwenden",
      },
      excerpt: {
        uz: "O‘zbekiston yoki Germaniyada berilgan rasmiy hujjatlar uchun apostil: nima tasdiqlanadi, qaysi hujjatlarga kerak, qaysi davlat beradi, tarjima bilan qanday tartibda ishlanadi va keng tarqalgan xatolar.",
        de: "Leitfaden zur Apostille für öffentliche Urkunden aus Usbekistan oder Deutschland: Zweck, zuständige Stelle, Reihenfolge mit Übersetzung und häufige Fehler.",
      },
      intro: {
        uz: "Apostil hujjat mazmunining to‘g‘riligini emas, rasmiy hujjatdagi imzo, muhr va hujjatni bergan shaxsning vakolatini tasdiqlaydi. Hujjat qaysi davlatda berilgan bo‘lsa, apostilni ham o‘sha davlatning vakolatli idorasi qo‘yadi. Germaniyada foydalaniladigan xorijiy hujjat uchun talab qilinadigan aniq tartibni hujjatni qabul qiluvchi idora belgilaydi.",
        de: "Die Apostille bestätigt nicht die inhaltliche Richtigkeit einer Urkunde, sondern Echtheit von Unterschrift, Siegel und Funktion der ausstellenden Person. Sie wird von der zuständigen Behörde des Staates erteilt, in dem die Urkunde ausgestellt wurde. Welche Form für ein konkretes Verfahren verlangt wird, entscheidet die empfangende deutsche Stelle.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: {
        uz: "10 daqiqa",
        de: "10 Minuten",
      },
      facts: [
        {
          label: { uz: "Tasdiqlanadi", de: "Bestätigt wird" },
          value: {
            uz: "Imzo, muhr va hujjat beruvchining vakolati",
            de: "Echtheit von Unterschrift, Siegel und Funktion",
          },
        },
        {
          label: { uz: "Beruvchi davlat", de: "Ausstellungsstaat" },
          value: {
            uz: "Apostilni hujjat berilgan davlat qo‘yadi",
            de: "Die Apostille erteilt der Staat, der die Urkunde ausgestellt hat",
          },
        },
        {
          label: { uz: "Mazmun", de: "Inhalt" },
          value: {
            uz: "Apostil hujjat mazmunini tasdiqlamaydi",
            de: "Die Apostille bestätigt nicht den Inhalt",
          },
        },
        {
          label: { uz: "Muhim tartib", de: "Reihenfolge" },
          value: {
            uz: "Avval talabni tekshirish, keyin apostil va tarjima",
            de: "Erst Anforderungen prüfen, dann Apostille und Übersetzung",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Apostil nima va qachon kerak?",
            de: "Was ist eine Apostille und wann wird sie benötigt?",
          },
          paragraphs: [
            {
              uz: "Hague Apostille Convention qo‘llanadigan davlatlar o‘rtasida ayrim rasmiy hujjatlar konsullik legalizatsiyasisiz tan olinishi mumkin. Bunday holatda hujjatga belgilangan shakldagi apostil qo‘yiladi.",
              de: "Zwischen Staaten, für die das Haager Apostille-Übereinkommen gilt, können bestimmte öffentliche Urkunden ohne konsularische Legalisation verwendet werden. Stattdessen wird die Urkunde mit einer Apostille versehen.",
            },
            {
              uz: "Apostil zarurligi hujjat turi va undan foydalaniladigan jarayonga bog‘liq. Masalan, Standesamt, Ausländerbehörde, universitet yoki Anerkennung idorasi turli talab qo‘yishi mumkin.",
              de: "Ob eine Apostille erforderlich ist, hängt von Urkundenart und Verfahren ab. Standesamt, Ausländerbehörde, Hochschule oder Anerkennungsstelle können unterschiedliche Anforderungen stellen.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi hujjatlarda uchraydi?",
            de: "Für welche Urkunden ist sie typisch?",
          },
          items: [
            {
              uz: "Tug‘ilganlik guvohnomasi",
              de: "Geburtsurkunde",
            },
            {
              uz: "Nikoh yoki ajrim hujjati",
              de: "Heirats- oder Scheidungsurkunde",
            },
            {
              uz: "Sud qarori",
              de: "Gerichtliche Entscheidung",
            },
            {
              uz: "Diplom, attestat yoki davlat sertifikati",
              de: "Diplom, Schulzeugnis oder staatliches Zertifikat",
            },
            {
              uz: "Notarial tasdiqlangan hujjat",
              de: "Notariell beurkundete oder beglaubigte Urkunde",
            },
            {
              uz: "Davlat idorasi bergan boshqa rasmiy hujjat",
              de: "Sonstige öffentliche Urkunde",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Apostilni qayerdan olish kerak?",
            de: "Wo wird die Apostille erteilt?",
          },
          paragraphs: [
            {
              uz: "O‘zbekistonda berilgan hujjat uchun Germaniyadagi elchixona apostil qo‘ymaydi. Apostilni O‘zbekistondagi hujjat turiga vakolatli idora beradi.",
              de: "Für eine in Usbekistan ausgestellte Urkunde erteilt die deutsche Auslandsvertretung keine Apostille. Zuständig ist die nach usbekischem Recht bestimmte Behörde.",
            },
            {
              uz: "Germaniyada berilgan hujjat uchun vakolatli idora Bundesland va hujjat turiga qarab farq qiladi. Masalan, sud, notarius, ma’muriy idora yoki Standesamt hujjatlari uchun turli organ vakolatli bo‘lishi mumkin.",
              de: "Für deutsche Urkunden richtet sich die Zuständigkeit nach Bundesland und Urkundenart. Für gerichtliche, notarielle, administrative oder standesamtliche Urkunden können unterschiedliche Stellen zuständig sein.",
            },
          ],
          items: [
            {
              uz: "Hujjatni qabul qiluvchi idoradan apostil zarurligini yozma tekshiring.",
              de: "Klären Sie schriftlich bei der empfangenden Stelle, ob eine Apostille verlangt wird.",
            },
            {
              uz: "Faqat hujjat bergan davlatdagi vakolatli idoraga murojaat qiling.",
              de: "Wenden Sie sich nur an die zuständige Stelle im Ausstellungsstaat.",
            },
            {
              uz: "Apostil uchun original yoki vakolatli nusxa kerakligini tekshiring.",
              de: "Prüfen Sie, ob Original oder besondere Ausfertigung erforderlich ist.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda tayyorlanadigan hujjatlar",
            de: "Üblicherweise vorzubereitende Unterlagen",
          },
          items: [
            {
              uz: "Apostil qo‘yiladigan original rasmiy hujjat",
              de: "Öffentliche Urkunde im Original",
            },
            {
              uz: "Shaxsni tasdiqlovchi hujjat",
              de: "Identitätsnachweis",
            },
            {
              uz: "Ariza formasi — talab qilinsa",
              de: "Antragsformular, soweit verlangt",
            },
            {
              uz: "Vakil topshirsa ishonchnoma",
              de: "Vollmacht bei Vertretung",
            },
            {
              uz: "To‘lov dalili yoki qaytarish konverti — idora tartibiga qarab",
              de: "Gebührennachweis oder Rückumschlag nach Behördenvorgabe",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Apostil va tarjima tartibi",
            de: "Reihenfolge von Apostille und Übersetzung",
          },
          paragraphs: [
            {
              uz: "Ko‘p holatda avval original hujjatga apostil qo‘yiladi, keyin hujjat va apostil birgalikda tarjima qilinadi. Chunki tarjimon apostil matni, muhr va raqamlarni ham tarjimada aks ettiradi.",
              de: "Häufig wird zuerst die Originalurkunde apostilliert und anschließend Urkunde einschließlich Apostille übersetzt. So können auch Apostillentext, Siegel und Registriernummern in die Übersetzung aufgenommen werden.",
            },
            {
              uz: "Biroq qabul qiluvchi idora boshqa tartib talab qilishi mumkin. Masalan, tarjimon imzosiga alohida tasdiq yoki tarjimaga ham qo‘shimcha apostil talab qilinishi mumkin.",
              de: "Die empfangende Stelle kann jedoch ein anderes Verfahren verlangen, etwa zusätzliche Bestätigung der Übersetzerunterschrift oder eine weitere Apostille für die Übersetzung.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Ko‘p uchraydigan xatolar",
            de: "Häufige Fehler",
          },
          items: [
            {
              uz: "Hujjat mazmuni apostil bilan tasdiqlandi deb o‘ylash",
              de: "Annehmen, die Apostille bestätige den Inhalt",
            },
            {
              uz: "Apostilni Germaniyadagi noto‘g‘ri idoradan so‘rash",
              de: "Apostille bei der falschen deutschen Stelle beantragen",
            },
            {
              uz: "Tarjimani apostildan oldin qilib, apostil matnini tarjimasiz qoldirish",
              de: "Übersetzung vor Apostille erstellen und Apostillentext unübersetzt lassen",
            },
            {
              uz: "Qabul qiluvchi idora talabini oldindan tekshirmaslik",
              de: "Anforderungen der empfangenden Stelle nicht vorab prüfen",
            },
            {
              uz: "Eski yoki shikastlangan hujjatni yuborish",
              de: "Veraltete oder beschädigte Urkunde einreichen",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Talabni yozma tekshiring",
            de: "Anforderung schriftlich klären",
          },
          description: {
            uz: "Hujjatni qabul qiluvchi idoradan apostil, tarjima va nusxa formatini so‘rang.",
            de: "Fragen Sie die empfangende Stelle nach Apostille, Übersetzung und Kopienform.",
          },
        },
        {
          title: {
            uz: "Yangi original hujjat oling",
            de: "Aktuelle Originalurkunde beschaffen",
          },
          description: {
            uz: "Zarur bo‘lsa yangi nusxa yoki Ausfertigung buyurtma qiling.",
            de: "Beantragen Sie bei Bedarf eine neue Ausfertigung.",
          },
        },
        {
          title: {
            uz: "Vakolatli idoraga topshiring",
            de: "Bei zuständiger Stelle einreichen",
          },
          description: {
            uz: "Hujjat berilgan davlatdagi tegishli idoradan apostil oling.",
            de: "Beantragen Sie die Apostille im Staat, der die Urkunde ausgestellt hat.",
          },
        },
        {
          title: {
            uz: "Tarjimani tayyorlang",
            de: "Übersetzung erstellen lassen",
          },
          description: {
            uz: "Hujjat va apostilni talabga mos tarjimonga bering.",
            de: "Lassen Sie Urkunde und Apostille von einem geeigneten Übersetzer übertragen.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Apostil hujjatni avtomatik tan oldiradimi?",
            de: "Führt eine Apostille automatisch zur Anerkennung?",
          },
          answer: {
            uz: "Yo‘q. Apostil faqat hujjatning rasmiy kelib chiqishini tasdiqlaydi. Idora hujjat mazmuni va huquqiy qiymatini alohida baholaydi.",
            de: "Nein. Sie bestätigt nur die formale Echtheit. Inhalt und rechtliche Wirkung werden gesondert geprüft.",
          },
        },
        {
          question: {
            uz: "Nusxaga apostil qo‘yish mumkinmi?",
            de: "Kann eine Kopie apostilliert werden?",
          },
          answer: {
            uz: "Bu hujjat turi va vakolatli idora tartibiga bog‘liq. Oddiy nusxa ko‘pincha yetarli emas.",
            de: "Das hängt von Urkundenart und zuständiger Stelle ab. Eine einfache Kopie genügt regelmäßig nicht.",
          },
        },
        {
          question: {
            uz: "Germaniya elchixonasi O‘zbekiston hujjatiga apostil qo‘yadimi?",
            de: "Erteilt die deutsche Botschaft eine Apostille für usbekische Urkunden?",
          },
          answer: {
            uz: "Yo‘q. Apostilni hujjatni bergan davlatning vakolatli idorasi qo‘yadi.",
            de: "Nein. Zuständig ist die Behörde des Staates, der die Urkunde ausgestellt hat.",
          },
        },
      ],
      sources: [
        {
          title: "Foreign public documents for use in Germany",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/konsularisches/urkundenverkehrallgemeines-node/urkundenverkehrteilb-node",
          language: "en",
        },
        {
          title: "German public documents for use abroad",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/konsularisches/urkundenverkehrallgemeines-node/urkundenverkehrteila-node",
          language: "en",
        },
        {
          title: "Das Haager Apostille-Übereinkommen",
          organization: "Auswärtiges Amt",
          url: "https://www.auswaertiges-amt.de/de/2570832-2570832",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "official-translation-guide",
        "certified-copy-guide",
        "birth-certificate-guide",
        "marriage-certificate-guide",
        "diploma-document-preparation",
      ],
    } satisfies LocalizedGuideArticle;
