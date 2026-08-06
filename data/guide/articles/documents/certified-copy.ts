import type { LocalizedGuideArticle } from "../../../../types/guide";

export const certifiedCopyArticle = {
      id: "certified-copy-guide",
      slug: "certified-copy-guide",
      categorySlug: "documents",
      title: {
        uz: "Beglaubigte Kopie va notarial tasdiq",
        de: "Beglaubigte Kopie und notarielle Beglaubigung",
      },
      excerpt: {
        uz: "Germaniyada tasdiqlangan nusxa: amtliche Beglaubigung, notarial tasdiq, imzo tasdig‘i, oddiy nusxadan farqi, qaysi idora tasdiqlashi va qachon asl hujjat kerakligi.",
        de: "Leitfaden zu beglaubigten Kopien: amtliche und notarielle Beglaubigung, Unterschriftsbeglaubigung, Unterschied zur einfachen Kopie, zuständige Stellen und Anforderungen.",
      },
      intro: {
        uz: "Beglaubigte Kopie — nusxa asl hujjatga mos ekanini vakolatli organ tasdiqlagan nusxa. U hujjat mazmunining to‘g‘riligini yoki haqiqiyligini to‘liq kafolatlamaydi. Notarial tasdiq, amtliche Beglaubigung va imzo tasdig‘i bir xil tushuncha emas; qaysi turi kerakligini qabul qiluvchi idora belgilaydi.",
        de: "Eine beglaubigte Kopie bestätigt, dass eine Kopie mit dem vorgelegten Original übereinstimmt. Sie bestätigt nicht automatisch den Inhalt oder die materielle Echtheit der Urkunde. Amtliche Beglaubigung, notarielle Beglaubigung und Unterschriftsbeglaubigung sind unterschiedliche Verfahren.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: {
        uz: "9 daqiqa",
        de: "9 Minuten",
      },
      facts: [
        {
          label: { uz: "Tasdiq mavzusi", de: "Bestätigt wird" },
          value: {
            uz: "Nusxaning ko‘rsatilgan originalga mosligi",
            de: "Übereinstimmung der Kopie mit dem vorgelegten Original",
          },
        },
        {
          label: { uz: "Amtliche Beglaubigung", de: "Amtliche Beglaubigung" },
          value: {
            uz: "Vakolatli davlat idorasi tomonidan",
            de: "Durch eine zuständige Behörde",
          },
        },
        {
          label: { uz: "Notarial tasdiq", de: "Notarielle Beglaubigung" },
          value: {
            uz: "Notarius tomonidan",
            de: "Durch einen Notar",
          },
        },
        {
          label: { uz: "Muhim farq", de: "Wichtiger Unterschied" },
          value: {
            uz: "Nusxa tasdig‘i va imzo tasdig‘i boshqa-boshqa",
            de: "Kopien- und Unterschriftsbeglaubigung sind verschieden",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Tasdiqlangan nusxa nima?",
            de: "Was ist eine beglaubigte Kopie?",
          },
          paragraphs: [
            {
              uz: "Vakolatli idora yoki notarius original hujjatni nusxa bilan solishtiradi va nusxaga tasdiq yozuvi, sana, imzo va muhr qo‘yadi.",
              de: "Eine zuständige Behörde oder ein Notar vergleicht Original und Kopie und versieht die Kopie mit Beglaubigungsvermerk, Datum, Unterschrift und Siegel.",
            },
            {
              uz: "Bu tasdiq faqat nusxa ko‘rsatilgan originalga mosligini bildiradi. Original hujjat soxta yoki mazmunan noto‘g‘ri bo‘lsa, nusxa tasdig‘i buni tuzatmaydi.",
              de: "Bestätigt wird nur die Übereinstimmung mit dem vorgelegten Original. Ist das Original unecht oder inhaltlich falsch, ändert die Beglaubigung daran nichts.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi holatlarda kerak bo‘ladi?",
            de: "Wann wird eine beglaubigte Kopie verlangt?",
          },
          items: [
            {
              uz: "Universitet yoki Anerkennung arizasi",
              de: "Hochschul- oder Anerkennungsverfahren",
            },
            {
              uz: "Ausländerbehörde yoki Standesamt jarayoni",
              de: "Verfahren bei Ausländerbehörde oder Standesamt",
            },
            {
              uz: "Kasbiy yoki akademik hujjatlar",
              de: "Berufliche oder akademische Nachweise",
            },
            {
              uz: "Sud yoki notarial jarayon",
              de: "Gerichtliches oder notarielles Verfahren",
            },
            {
              uz: "Asl hujjatni yuborish xavfli yoki mumkin bo‘lmagan holat",
              de: "Wenn das Original nicht versandt werden soll oder darf",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Kim tasdiqlashi mumkin?",
            de: "Wer darf beglaubigen?",
          },
          paragraphs: [
            {
              uz: "Bu hujjat va foydalanish maqsadiga bog‘liq. Bürgeramt yoki boshqa davlat idorasi ayrim hujjatlarni amtlich beglaubigen qilishi mumkin. Notarius esa notarial tasdiq beradi.",
              de: "Das hängt von Urkunde und Verwendungszweck ab. Bürgeramt oder andere Behörden können bestimmte Dokumente amtlich beglaubigen; Notare erteilen notarielle Beglaubigungen.",
            },
            {
              uz: "Maktab, universitet, cherkov, sug‘urta yoki boshqa tashkilotning tasdig‘i har doim barcha idora uchun yetarli emas.",
              de: "Beglaubigungen durch Schule, Hochschule, Kirche, Versicherung oder andere Stellen werden nicht in jedem Verfahren akzeptiert.",
            },
          ],
          items: [
            {
              uz: "Qabul qiluvchi idoradan kim tasdiqlashi mumkinligini so‘rang.",
              de: "Fragen Sie die empfangende Stelle, welche Beglaubigungsstelle akzeptiert wird.",
            },
            {
              uz: "Original va to‘liq nusxani olib boring.",
              de: "Bringen Sie Original und vollständige Kopie mit.",
            },
            {
              uz: "Bir nechta sahifa bo‘lsa, ularni ajralmas tarzda tasdiqlash kerakligini tekshiring.",
              de: "Prüfen Sie bei mehreren Seiten, ob eine feste Verbindung verlangt wird.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Terminga nima olib boriladi?",
            de: "Was wird zur Beglaubigung benötigt?",
          },
          items: [
            {
              uz: "Original hujjat",
              de: "Originalurkunde",
            },
            {
              uz: "To‘liq va o‘qiladigan nusxa",
              de: "Vollständige und gut lesbare Kopie",
            },
            {
              uz: "Pasport yoki ID karta",
              de: "Reisepass oder Personalausweis",
            },
            {
              uz: "Qabul qiluvchi idora talabi — mavjud bo‘lsa",
              de: "Vorgabe der empfangenden Stelle, soweit vorhanden",
            },
            {
              uz: "To‘lov vositasi",
              de: "Zahlungsmittel",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Nusxa tasdig‘i va imzo tasdig‘i farqi",
            de: "Kopien- und Unterschriftsbeglaubigung",
          },
          paragraphs: [
            {
              uz: "Nusxa tasdig‘ida nusxa originalga mosligi tekshiriladi. Imzo tasdig‘ida esa shaxs hujjatni vakolatli xodim oldida imzolagani yoki imzosini tan olgani tasdiqlanadi.",
              de: "Bei der Kopienbeglaubigung wird die Übereinstimmung mit dem Original bestätigt. Bei der Unterschriftsbeglaubigung wird bestätigt, dass eine Person vor der zuständigen Stelle unterschrieben oder ihre Unterschrift anerkannt hat.",
            },
            {
              uz: "Shartnoma, ishonchnoma yoki rozilik hujjatida qaysi tur kerakligi huquqiy maqsadga bog‘liq.",
              de: "Bei Vertrag, Vollmacht oder Zustimmung richtet sich die benötigte Form nach dem rechtlichen Zweck.",
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
              uz: "Oddiy rangli nusxani tasdiqlangan nusxa deb yuborish",
              de: "Eine einfache Farbkopie als beglaubigte Kopie einreichen",
            },
            {
              uz: "Tasdiqlovchi idora vakolatli ekanini tekshirmaslik",
              de: "Zuständigkeit der beglaubigenden Stelle nicht prüfen",
            },
            {
              uz: "Hujjatning orqa tomoni yoki ilovasini nusxaga kiritmaslik",
              de: "Rückseite oder Anlagen nicht mitkopieren",
            },
            {
              uz: "Imzo tasdig‘i o‘rniga nusxa tasdig‘i olish",
              de: "Kopienbeglaubigung statt Unterschriftsbeglaubigung beantragen",
            },
            {
              uz: "Xorijda foydalanish uchun apostil zarurligini unutish",
              de: "Für Auslandsverwendung mögliche Apostille nicht klären",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Talabni aniqlang",
            de: "Form klären",
          },
          description: {
            uz: "Amtliche, notarial yoki imzo tasdig‘idan qaysi biri kerakligini so‘rang.",
            de: "Klären Sie, ob amtliche, notarielle oder Unterschriftsbeglaubigung erforderlich ist.",
          },
        },
        {
          title: {
            uz: "Vakolatli joyni toping",
            de: "Zuständige Stelle finden",
          },
          description: {
            uz: "Bürgeramt, notarius yoki tegishli idoradan termin oling.",
            de: "Buchen Sie bei Bürgeramt, Notar oder zuständiger Behörde.",
          },
        },
        {
          title: {
            uz: "Original va nusxani taqdim eting",
            de: "Original und Kopie vorlegen",
          },
          description: {
            uz: "Barcha sahifa va ilovalarni to‘liq olib boring.",
            de: "Legen Sie sämtliche Seiten und Anlagen vollständig vor.",
          },
        },
        {
          title: {
            uz: "Tasdiq yozuvini tekshiring",
            de: "Beglaubigungsvermerk prüfen",
          },
          description: {
            uz: "Sana, muhr, imzo va sahifalar to‘liqligini tekshiring.",
            de: "Prüfen Sie Datum, Siegel, Unterschrift und Vollständigkeit.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Bürgeramt barcha hujjatni tasdiqlaydimi?",
            de: "Beglaubigt das Bürgeramt jedes Dokument?",
          },
          answer: {
            uz: "Yo‘q. Vakolat va hujjat turi bo‘yicha cheklovlar mavjud. Oldindan tekshiring.",
            de: "Nein. Zuständigkeit und Dokumentenart können eingeschränkt sein. Prüfen Sie dies vorab.",
          },
        },
        {
          question: {
            uz: "Tasdiqlangan nusxa original o‘rnini to‘liq bosadimi?",
            de: "Ersetzt eine beglaubigte Kopie immer das Original?",
          },
          answer: {
            uz: "Yo‘q. Ayrim jarayonlarda original yoki yangi rasmiy Ausfertigung baribir talab qilinadi.",
            de: "Nein. In manchen Verfahren wird weiterhin das Original oder eine neue amtliche Ausfertigung verlangt.",
          },
        },
        {
          question: {
            uz: "Tarjima nusxasini ham tasdiqlash kerakmi?",
            de: "Muss auch eine Übersetzung beglaubigt werden?",
          },
          answer: {
            uz: "Bu qabul qiluvchi idora talabiga bog‘liq. Vakolatli tarjimonning tasdiq yozuvi ko‘pincha alohida nusxa tasdig‘idan farq qiladi.",
            de: "Das richtet sich nach der Behördenvorgabe. Der Bestätigungsvermerk eines ermächtigten Übersetzers ist etwas anderes als eine Kopienbeglaubigung.",
          },
        },
      ],
      sources: [
        {
          title: "Certifying documents",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/konsularisches/beurkundungen-node",
          language: "en",
        },
        {
          title: "Consular information",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/konsularisches",
          language: "en",
        },
      ],
      relatedArticleSlugs: [
        "apostille-guide",
        "official-translation-guide",
        "birth-certificate-guide",
        "marriage-certificate-guide",
        "diploma-document-preparation",
      ],
    } satisfies LocalizedGuideArticle;
