import type { LocalizedGuideArticle } from "../../../../types/guide";

export const birthCertificateArticle = {
    id: "birth-certificate-guide",
    slug: "birth-certificate-guide",
    categorySlug: "documents",
    title: {
      uz: "Tug‘ilganlik guvohnomasini Germaniya uchun tayyorlash",
      de: "Geburtsurkunde für deutsche Verfahren vorbereiten",
    },
    excerpt: {
      uz: "Tug‘ilganlik guvohnomasini viza, oila birlashtirish, Standesamt, fuqarolik va boshqa Germaniya jarayonlari uchun tayyorlash: yangi nusxa, apostil, rasmiy tarjima, ism-familiya farqlari va tekshiruv tartibi.",
      de: "Leitfaden zur Vorbereitung einer ausländischen Geburtsurkunde für Visum, Familiennachzug, Standesamt, Einbürgerung und andere deutsche Verfahren: neue Ausfertigung, Apostille, Übersetzung und Namensabweichungen.",
    },
    intro: {
      uz: "Tug‘ilganlik guvohnomasi Germaniyada shaxsning tug‘ilgan sanasi, joyi va ota-onalik ma’lumotini tasdiqlash uchun ko‘p ishlatiladi. Biroq xorijiy hujjatning qabul qilinishi faqat tarjimaga bog‘liq emas: qabul qiluvchi idora hujjatning yangi nusxasi, apostil yoki boshqa haqiqiylik tasdig‘i, to‘liq tarjima va ism-familiya mosligini talab qilishi mumkin.",
      de: "Eine ausländische Geburtsurkunde wird in Deutschland häufig zum Nachweis von Geburtsdatum, Geburtsort und Abstammung benötigt. Die Anerkennung hängt jedoch nicht nur von einer Übersetzung ab: Die empfangende Behörde kann eine aktuelle Ausfertigung, Apostille oder einen anderen Echtheitsnachweis, vollständige Übersetzung und geklärte Namensabweichungen verlangen.",
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
        label: { uz: "Asosiy vazifa", de: "Hauptfunktion" },
        value: {
          uz: "Tug‘ilish va ota-onalik ma’lumotini tasdiqlash",
          de: "Nachweis von Geburt und Abstammung",
        },
      },
      {
        label: { uz: "Haqiqiylik", de: "Echtheit" },
        value: {
          uz: "Qabul qiluvchi idora apostil yoki boshqa tekshiruv talab qilishi mumkin",
          de: "Die empfangende Stelle kann Apostille oder andere Prüfung verlangen",
        },
      },
      {
        label: { uz: "Tarjima", de: "Übersetzung" },
        value: {
          uz: "Ko‘pincha vakolatli tarjimon tayyorlagan nemischa tarjima",
          de: "Häufig deutsche Übersetzung durch ermächtigten Übersetzer",
        },
      },
      {
        label: { uz: "Muhim tekshiruv", de: "Wichtige Prüfung" },
        value: {
          uz: "Ism, familiya, sana va ota-ona ma’lumotlari pasportga mos bo‘lsin",
          de: "Namen, Daten und Elternangaben müssen mit anderen Unterlagen übereinstimmen",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Qaysi jarayonlarda kerak bo‘ladi?",
          de: "Für welche Verfahren wird die Urkunde benötigt?",
        },
        items: [
          {
            uz: "Oila birlashtirish va farzand vizasi",
            de: "Familiennachzug und Kindernachzug",
          },
          {
            uz: "Standesamt va nikoh jarayonlari",
            de: "Standesamt und Eheschließungsverfahren",
          },
          {
            uz: "Fuqarolik yoki Aufenthaltstitel jarayoni",
            de: "Einbürgerungs- oder Aufenthaltsverfahren",
          },
          {
            uz: "Maktab, bog‘cha yoki sug‘urta jarayoni",
            de: "Schule, Kita oder Versicherung",
          },
          {
            uz: "Ota-onalik va vasiylikni tasdiqlash",
            de: "Nachweis von Abstammung und Sorgerecht",
          },
        ],
        paragraphs: [
          {
            uz: "Talab qilinadigan shakl jarayonga qarab farq qiladi. Bir idora oddiy yangi nusxani qabul qilishi, boshqasi esa apostil va rasmiy tarjimani talab qilishi mumkin.",
            de: "Die verlangte Form unterscheidet sich je nach Verfahren. Eine Stelle akzeptiert möglicherweise eine aktuelle Ausfertigung, während eine andere Apostille und beglaubigte Übersetzung verlangt.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Qaysi nusxa xavfsizroq?",
          de: "Welche Ausfertigung ist sinnvoll?",
        },
        paragraphs: [
          {
            uz: "Amaliy jihatdan eski, shikastlangan yoki qo‘lda o‘zgartirilgan hujjatdan ko‘ra vakolatli FHDYO organidan olingan yangi rasmiy nusxa xavfsizroq. Qabul qiluvchi idora hujjat qancha yangi bo‘lishi kerakligini alohida belgilashi mumkin.",
            de: "Praktisch ist eine neue amtliche Ausfertigung der zuständigen Personenstandsbehörde sicherer als eine alte, beschädigte oder handschriftlich veränderte Urkunde. Die empfangende Stelle kann eigene Aktualitätsanforderungen festlegen.",
          },
          {
            uz: "Faqat skan, oddiy foto yoki notarial nusxa har doim original rasmiy hujjatning o‘rnini bosmaydi.",
            de: "Ein Scan, Foto oder eine bloß notarielle Kopie ersetzt nicht in jedem Verfahren die amtliche Originalausfertigung.",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Apostil va haqiqiylik tekshiruvi",
          de: "Apostille und Echtheitsprüfung",
        },
        paragraphs: [
          {
            uz: "Xorijiy tug‘ilganlik guvohnomasi Germaniyada taqdim etilganda qabul qiluvchi idora uning haqiqiyligini tasdiqlashni talab qilishi mumkin. Qaysi tartib qo‘llanishi hujjat berilgan davlat, xalqaro bitim va idora talabiga bog‘liq.",
            de: "Wird eine ausländische Geburtsurkunde in Deutschland vorgelegt, kann die empfangende Behörde einen Echtheitsnachweis verlangen. Das konkrete Verfahren richtet sich nach Ausstellungsstaat, völkerrechtlicher Vereinbarung und Behördenvorgabe.",
          },
          {
            uz: "Apostil hujjat mazmunini emas, imzo, muhr va hujjatni bergan mansabdor shaxsning vakolatini tasdiqlaydi.",
            de: "Die Apostille bestätigt nicht den Inhalt, sondern Echtheit von Unterschrift, Siegel und Funktion der ausstellenden Person.",
          },
        ],
        items: [
          {
            uz: "Apostil zarurligini hujjatni qabul qiluvchi Germaniya idorasidan tekshiring.",
            de: "Klären Sie die Apostillepflicht bei der empfangenden deutschen Stelle.",
          },
          {
            uz: "Apostilni hujjat berilgan davlatning vakolatli idorasidan oling.",
            de: "Beantragen Sie die Apostille bei der zuständigen Stelle des Ausstellungsstaates.",
          },
          {
            uz: "Ko‘pincha avval apostil, keyin hujjat va apostilning birgalikdagi tarjimasi tayyorlanadi.",
            de: "Häufig wird zuerst apostilliert und anschließend Urkunde samt Apostille übersetzt.",
          },
        ],
      },
      documents: {
        title: {
          uz: "Tayyorlanadigan hujjatlar",
          de: "Vorzubereitende Unterlagen",
        },
        items: [
          {
            uz: "Tug‘ilganlik guvohnomasining yangi rasmiy nusxasi",
            de: "Aktuelle amtliche Ausfertigung der Geburtsurkunde",
          },
          {
            uz: "Apostil yoki talab qilingan boshqa haqiqiylik tasdig‘i",
            de: "Apostille oder anderer verlangter Echtheitsnachweis",
          },
          {
            uz: "Hujjat va apostilning to‘liq nemischa tarjimasi",
            de: "Vollständige deutsche Übersetzung von Urkunde und Apostille",
          },
          {
            uz: "Pasport va boshqa shaxsiy hujjatlar nusxasi",
            de: "Kopie von Reisepass und weiteren Personenstandsdokumenten",
          },
          {
            uz: "Ism yoki familiya o‘zgargan bo‘lsa o‘zgarishni tasdiqlovchi hujjat",
            de: "Bei Namensänderung entsprechender Nachweis",
          },
          {
            uz: "Ota-onalik yoki vasiylik bo‘yicha qo‘shimcha dalillar — talab qilinsa",
            de: "Zusätzliche Abstammungs- oder Sorgerechtsnachweise, soweit verlangt",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Ism-familiya va ma’lumotlar farqi",
          de: "Abweichungen bei Namen und Daten",
        },
        paragraphs: [
          {
            uz: "Lotin va kirill yozuvi, transliteratsiya yoki familiya o‘zgarishi sababli guvohnoma va pasportdagi ism bir xil ko‘rinmasligi mumkin. Bunday farqni yashirmasdan, tarjimonda to‘g‘ri qayd ettirish va zarur bo‘lsa qo‘shimcha hujjat bilan tushuntirish kerak.",
            de: "Durch kyrillische und lateinische Schreibweise, Transliteration oder Namensänderung können Urkunde und Pass unterschiedliche Namensformen enthalten. Solche Abweichungen sollten transparent übersetzt und erforderlichenfalls durch weitere Unterlagen erklärt werden.",
          },
          {
            uz: "Tug‘ilgan sana, joy, ota-ona ismi yoki hujjat raqamidagi xato jarayonni kechiktirishi mumkin. Xato bo‘lsa tarjima bilan yopishga urinmasdan, hujjatni bergan idorada tuzatish imkonini tekshiring.",
            de: "Fehler bei Geburtsdatum, Geburtsort, Elternnamen oder Urkundennummer können das Verfahren verzögern. Versuchen Sie nicht, Fehler durch Übersetzung zu verdecken, sondern prüfen Sie eine Berichtigung bei der ausstellenden Behörde.",
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
            uz: "Faqat oddiy tarjimani rasmiy hujjat o‘rnida topshirish",
            de: "Nur eine einfache Übersetzung statt der Urkunde einreichen",
          },
          {
            uz: "Apostil matnini tarjimaga kiritmaslik",
            de: "Apostillentext nicht mitübersetzen lassen",
          },
          {
            uz: "Pasport va guvohnomadagi ism farqini tushuntirmaslik",
            de: "Namensabweichungen zwischen Pass und Urkunde nicht erklären",
          },
          {
            uz: "Eski yoki o‘qib bo‘lmaydigan nusxa bilan topshirish",
            de: "Alte oder unleserliche Ausfertigung verwenden",
          },
          {
            uz: "Qabul qiluvchi idoraning aniq checklistini tekshirmaslik",
            de: "Konkrete Checkliste der empfangenden Stelle nicht prüfen",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Idora talabini aniqlang",
          de: "Anforderungen klären",
        },
        description: {
          uz: "Original, yangi nusxa, apostil, tarjima va certified copy talabi bor-yo‘qligini yozma so‘rang.",
          de: "Klären Sie schriftlich Anforderungen an Original, aktuelle Ausfertigung, Apostille, Übersetzung und beglaubigte Kopie.",
        },
      },
      {
        title: {
          uz: "Yangi rasmiy nusxa oling",
          de: "Neue amtliche Ausfertigung beschaffen",
        },
        description: {
          uz: "Hujjatni bergan vakolatli organdan toza va to‘liq nusxa oling.",
          de: "Beantragen Sie bei der zuständigen Stelle eine vollständige und gut lesbare Ausfertigung.",
        },
      },
      {
        title: {
          uz: "Apostilni tayyorlang",
          de: "Apostille beschaffen",
        },
        description: {
          uz: "Talab qilinsa, hujjat berilgan davlatdagi vakolatli organdan apostil oling.",
          de: "Lassen Sie die Urkunde bei Bedarf im Ausstellungsstaat apostillieren.",
        },
      },
      {
        title: {
          uz: "Rasmiy tarjima qildiring",
          de: "Beglaubigt übersetzen lassen",
        },
        description: {
          uz: "Guvohnoma va apostilni qabul qiluvchi idora tan oladigan tarjimonga bering.",
          de: "Lassen Sie Urkunde und Apostille durch einen akzeptierten ermächtigten Übersetzer übersetzen.",
        },
      },
      {
        title: {
          uz: "Barcha ma’lumotni solishtiring",
          de: "Alle Angaben abgleichen",
        },
        description: {
          uz: "Pasport, tug‘ilganlik guvohnomasi va tarjimadagi ism, sana va joylarni tekshiring.",
          de: "Vergleichen Sie Namen, Daten und Orte in Pass, Geburtsurkunde und Übersetzung.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "Tug‘ilganlik guvohnomasi uchun apostil har doim kerakmi?",
          de: "Ist für eine Geburtsurkunde immer eine Apostille erforderlich?",
        },
        answer: {
          uz: "Yo‘q. Bu hujjat berilgan davlat, Germaniyadagi jarayon va qabul qiluvchi idora talabiga bog‘liq.",
          de: "Nein. Das hängt von Ausstellungsstaat, Verfahren und Vorgabe der empfangenden Stelle ab.",
        },
      },
      {
        question: {
          uz: "Eski guvohnoma bilan topshirsa bo‘ladimi?",
          de: "Kann eine alte Geburtsurkunde verwendet werden?",
        },
        answer: {
          uz: "Ba’zan mumkin, ammo ayrim idoralar yangi rasmiy nusxa talab qiladi. Eski yoki shikastlangan hujjat o‘rniga yangi nusxa xavfsizroq.",
          de: "Teilweise ja, manche Stellen verlangen jedoch eine aktuelle Ausfertigung. Eine neue Urkunde ist bei alten oder beschädigten Dokumenten sicherer.",
        },
      },
      {
        question: {
          uz: "Tarjimani O‘zbekistonda qildirish mumkinmi?",
          de: "Kann die Übersetzung in Usbekistan erstellt werden?",
        },
        answer: {
          uz: "Mumkin bo‘lishi mumkin, lekin Germaniyadagi qabul qiluvchi idora aynan qaysi tarjimon va tasdiq shaklini qabul qilishini oldindan tekshiring.",
          de: "Das kann möglich sein. Klären Sie jedoch vorher, welche Übersetzerqualifikation und Bestätigungsform die deutsche Stelle akzeptiert.",
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
        title: "Internationaler Urkundenverkehr",
        organization: "Auswärtiges Amt",
        url: "https://www.auswaertiges-amt.de/de/service/konsularinfo/internationaler-urkundenverkehr",
        language: "de",
      },
    ],
    relatedArticleSlugs: [
      "apostille-guide",
      "official-translation-guide",
      "certified-copy-guide",
      "marriage-certificate-guide",
    ],
  } satisfies LocalizedGuideArticle;
