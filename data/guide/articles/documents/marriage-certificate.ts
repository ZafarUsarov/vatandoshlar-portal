import type { LocalizedGuideArticle } from "../../../../types/guide";

export const marriageCertificateArticle = {
    id: "marriage-certificate-guide",
    slug: "marriage-certificate-guide",
    categorySlug: "documents",
    title: {
      uz: "Nikoh guvohnomasini Germaniya uchun tayyorlash",
      de: "Heiratsurkunde für deutsche Verfahren vorbereiten",
    },
    excerpt: {
      uz: "Xorijiy nikoh guvohnomasini oila birlashtirish, Standesamt, familiya o‘zgarishi va boshqa Germaniya jarayonlari uchun tayyorlash: haqiqiylik, apostil, tarjima, oldingi nikohlar va ism farqlari.",
      de: "Leitfaden zur Vorbereitung einer ausländischen Heiratsurkunde für Familiennachzug, Standesamt, Namensführung und weitere deutsche Verfahren: Echtheit, Apostille, Übersetzung, frühere Ehen und Namensabweichungen.",
    },
    intro: {
      uz: "Xorijda qonuniy tuzilgan nikoh Germaniyada odatda alohida universal tan olish qarorisiz ham hisobga olinishi mumkin. Biroq nikohning haqiqiyligi, hujjatning rasmiy kelib chiqishi, er-xotinning oldingi nikohlari va ism-familiya ma’lumotlari individual jarayonda tekshiriladi.",
      de: "Eine im Ausland wirksam geschlossene Ehe kann in Deutschland grundsätzlich ohne ein allgemeines gesondertes Anerkennungsverfahren berücksichtigt werden. Wirksamkeit der Ehe, Echtheit der Urkunde, frühere Ehen und Namensführung werden jedoch im jeweiligen Verfahren geprüft.",
    },
    status: "published",
    featured: true,
    lastReviewedAt: "2026-08-06",
    readingTime: {
      uz: "11 daqiqa",
      de: "11 Minuten",
    },
    facts: [
      {
        label: { uz: "Asosiy hujjat", de: "Zentrales Dokument" },
        value: {
          uz: "Nikoh tuzilganini tasdiqlovchi rasmiy guvohnoma",
          de: "Amtliche Urkunde über die Eheschließung",
        },
      },
      {
        label: { uz: "Alohida tan olish", de: "Gesonderte Anerkennung" },
        value: {
          uz: "Nikoh uchun odatda universal alohida tan olish jarayoni yo‘q",
          de: "Für die Ehe besteht grundsätzlich kein allgemeines Anerkennungsverfahren",
        },
      },
      {
        label: { uz: "Ajrim", de: "Scheidung" },
        value: {
          uz: "Xorijiy ajrim uchun alohida tan olish talab qilinishi mumkin",
          de: "Für ausländische Scheidungen kann eine Anerkennung erforderlich sein",
        },
      },
      {
        label: { uz: "Tarjima", de: "Übersetzung" },
        value: {
          uz: "Ko‘pincha apostil bilan birga to‘liq nemischa tarjima",
          de: "Häufig vollständige deutsche Übersetzung einschließlich Apostille",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Qaysi jarayonlarda kerak bo‘ladi?",
          de: "Für welche Verfahren wird die Heiratsurkunde benötigt?",
        },
        items: [
          {
            uz: "Turmush o‘rtog‘i bilan oila birlashtirish",
            de: "Ehegattennachzug",
          },
          {
            uz: "Standesamt va nikoh reyestri",
            de: "Standesamt und Eheregister",
          },
          {
            uz: "Familiya va ism yuritish",
            de: "Namensführung",
          },
          {
            uz: "Soliq klassi, sug‘urta va oilaviy huquqlar",
            de: "Steuerklasse, Versicherung und Familienleistungen",
          },
          {
            uz: "Fuqarolik yoki Aufenthaltstitel jarayoni",
            de: "Einbürgerungs- oder Aufenthaltsverfahren",
          },
        ],
        paragraphs: [
          {
            uz: "Har bir idora bir xil hujjat to‘plamini talab qilmaydi. Masalan, viza bo‘limi va Standesamtning apostil, tarjima yoki oldingi nikoh bo‘yicha talabi farq qilishi mumkin.",
            de: "Nicht jede Stelle verlangt dieselben Unterlagen. Visastelle und Standesamt können beispielsweise unterschiedliche Anforderungen an Apostille, Übersetzung oder frühere Ehen stellen.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Nikohning Germaniyada hisobga olinishi",
          de: "Berücksichtigung der Ehe in Deutschland",
        },
        paragraphs: [
          {
            uz: "Xorijda tuzilgan nikoh odatda nikoh tuzilgan davlat huquqiga muvofiq bo‘lsa va Germaniya huquq tartibining asosiy tamoyillariga zid bo‘lmasa haqiqiy deb qaraladi.",
            de: "Eine im Ausland geschlossene Ehe wird grundsätzlich berücksichtigt, wenn sie nach dem Recht des Eheschließungsstaates wirksam ist und nicht gegen wesentliche Grundsätze der deutschen Rechtsordnung verstößt.",
          },
          {
            uz: "Nikoh uchun umumiy alohida tan olish jarayoni mavjud bo‘lmasa-da, hujjatning haqiqiyligi va nikoh shartlari viza, Standesamt yoki boshqa idora jarayonida tekshiriladi.",
            de: "Auch ohne allgemeines Anerkennungsverfahren werden Echtheit der Urkunde und Voraussetzungen der Eheschließung im Visa-, Standesamts- oder sonstigen Verwaltungsverfahren geprüft.",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Apostil, legalizatsiya va hujjat tekshiruvi",
          de: "Apostille, Legalisation und Urkundenprüfung",
        },
        paragraphs: [
          {
            uz: "Germaniyadagi idora xorijiy nikoh guvohnomasining haqiqiyligini tasdiqlovchi tartibni talab qilishi mumkin. Qo‘llanadigan tartib hujjat berilgan davlat va xalqaro hujjatlar tizimiga bog‘liq.",
            de: "Eine deutsche Stelle kann einen Echtheitsnachweis für die ausländische Heiratsurkunde verlangen. Das Verfahren richtet sich nach Ausstellungsstaat und internationalem Urkundenverkehr.",
          },
          {
            uz: "Apostil yoki boshqa tasdiqning mavjudligi nikoh mazmuni va oilaviy holatni avtomatik tasdiqlamaydi; idora boshqa hujjatlarni ham so‘rashi mumkin.",
            de: "Apostille oder anderer Echtheitsnachweis bestätigt nicht automatisch sämtliche inhaltlichen und familienrechtlichen Voraussetzungen; weitere Unterlagen können verlangt werden.",
          },
        ],
        items: [
          {
            uz: "Avval qabul qiluvchi idoraning checklistini tekshiring.",
            de: "Prüfen Sie zuerst die Checkliste der empfangenden Stelle.",
          },
          {
            uz: "Talab qilinsa originalga apostil yoki boshqa tasdiq oling.",
            de: "Beschaffen Sie bei Bedarf Apostille oder anderen Echtheitsnachweis.",
          },
          {
            uz: "So‘ng guvohnoma va barcha tasdiqlarni to‘liq tarjima qildiring.",
            de: "Lassen Sie anschließend Urkunde und sämtliche Bestätigungen vollständig übersetzen.",
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
            uz: "Nikoh guvohnomasining originali yoki yangi rasmiy nusxasi",
            de: "Heiratsurkunde im Original oder als aktuelle amtliche Ausfertigung",
          },
          {
            uz: "Apostil yoki talab qilingan haqiqiylik tasdig‘i",
            de: "Apostille oder verlangter Echtheitsnachweis",
          },
          {
            uz: "Nemis tilidagi rasmiy tarjima",
            de: "Beglaubigte deutsche Übersetzung",
          },
          {
            uz: "Er-xotinning amaldagi pasportlari",
            de: "Gültige Reisepässe beider Ehegatten",
          },
          {
            uz: "Oldingi nikohlar tugaganini tasdiqlovchi hujjatlar",
            de: "Nachweise über die Beendigung früherer Ehen",
          },
          {
            uz: "Familiya o‘zgarishi yoki ism farqini tushuntiruvchi hujjat",
            de: "Nachweis über Namensänderung oder abweichende Schreibweise",
          },
          {
            uz: "Talab qilinsa tug‘ilganlik guvohnomalari",
            de: "Geburtsurkunden, soweit verlangt",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Oldingi nikoh va xorijiy ajrim",
          de: "Frühere Ehe und ausländische Scheidung",
        },
        paragraphs: [
          {
            uz: "Agar er yoki xotinning oldingi nikohi xorijda ajrim bilan tugagan bo‘lsa, Germaniyada bu ajrim qarorini alohida tan olish talab qilinishi mumkin. Bu nikoh guvohnomasini tayyorlashdan alohida huquqiy jarayon.",
            de: "Wurde eine frühere Ehe im Ausland geschieden, kann in Deutschland eine gesonderte Anerkennung der Scheidungsentscheidung erforderlich sein. Dies ist ein eigenes rechtliches Verfahren neben der Vorbereitung der Heiratsurkunde.",
          },
          {
            uz: "Oldingi turmush o‘rtog‘i vafot etgan bo‘lsa, vafot guvohnomasi va zarur bo‘lsa apostil hamda tarjima tayyorlanadi.",
            de: "Ist ein früherer Ehegatte verstorben, werden Sterbeurkunde und gegebenenfalls Apostille sowie Übersetzung benötigt.",
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
            uz: "Nikoh guvohnomasini alohida tan oldirish har doim shart deb o‘ylash",
            de: "Annehmen, jede Ehe müsse gesondert anerkannt werden",
          },
          {
            uz: "Xorijiy ajrimni Germaniyada avtomatik tan olingan deb hisoblash",
            de: "Ausländische Scheidung automatisch als anerkannt ansehen",
          },
          {
            uz: "Familiya o‘zgarishini hujjat bilan tushuntirmaslik",
            de: "Namensänderung nicht dokumentieren",
          },
          {
            uz: "Apostil va tarjimadagi ism yozilishini pasport bilan tekshirmaslik",
            de: "Namensschreibweise in Apostille und Übersetzung nicht mit Pass abgleichen",
          },
          {
            uz: "Standesamt va viza bo‘limining talabi bir xil deb o‘ylash",
            de: "Anforderungen von Standesamt und Visastelle gleichsetzen",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Jarayonni aniqlang",
          de: "Verwendungszweck bestimmen",
        },
        description: {
          uz: "Viza, Standesamt, familiya yoki boshqa jarayon uchun hujjat kerakligini aniqlang.",
          de: "Klären Sie, ob die Urkunde für Visum, Standesamt, Namensführung oder ein anderes Verfahren benötigt wird.",
        },
      },
      {
        title: {
          uz: "Yangi rasmiy nusxa oling",
          de: "Aktuelle Ausfertigung beschaffen",
        },
        description: {
          uz: "Zarur bo‘lsa nikoh qayd etilgan idoradan yangi nusxa oling.",
          de: "Beantragen Sie bei Bedarf eine neue Ausfertigung bei der zuständigen Personenstandsbehörde.",
        },
      },
      {
        title: {
          uz: "Oldingi nikohlarni hujjatlashtiring",
          de: "Frühere Ehen dokumentieren",
        },
        description: {
          uz: "Ajrim, vafot yoki nikoh bekor bo‘lganini tasdiqlovchi hujjatlarni tayyorlang.",
          de: "Bereiten Sie Scheidungs-, Sterbe- oder sonstige Beendigungsnachweise vor.",
        },
      },
      {
        title: {
          uz: "Apostil va tarjimani tayyorlang",
          de: "Apostille und Übersetzung vorbereiten",
        },
        description: {
          uz: "Qabul qiluvchi idora talabiga muvofiq guvohnoma va tasdiqlarni rasmiylashtiring.",
          de: "Bereiten Sie Urkunde und Echtheitsnachweise nach Behördenvorgabe vor.",
        },
      },
      {
        title: {
          uz: "Ism-familiyani tekshiring",
          de: "Namensführung prüfen",
        },
        description: {
          uz: "Pasport, nikoh guvohnomasi va tarjimadagi yozuvlar o‘zaro mos bo‘lsin.",
          de: "Vergleichen Sie Namensangaben in Pässen, Heiratsurkunde und Übersetzung.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "Xorijiy nikohni Germaniyada alohida tan oldirish kerakmi?",
          de: "Muss eine ausländische Ehe in Deutschland gesondert anerkannt werden?",
        },
        answer: {
          uz: "Odatda nikoh uchun umumiy alohida tan olish jarayoni yo‘q. Lekin nikohning haqiqiyligi va hujjatlar tegishli idora jarayonida tekshiriladi.",
          de: "Grundsätzlich gibt es kein allgemeines gesondertes Anerkennungsverfahren für die Ehe. Wirksamkeit und Urkunden werden jedoch im jeweiligen Verfahren geprüft.",
        },
      },
      {
        question: {
          uz: "Ajrim qarorini alohida tan oldirish kerakmi?",
          de: "Muss eine ausländische Scheidung anerkannt werden?",
        },
        answer: {
          uz: "Ko‘p holatda ha. Xorijiy ajrim qarori uchun Germaniyada alohida tan olish jarayoni talab qilinishi mumkin.",
          de: "In vielen Fällen ja. Für eine ausländische Scheidungsentscheidung kann ein gesondertes Anerkennungsverfahren erforderlich sein.",
        },
      },
      {
        question: {
          uz: "Nikoh guvohnomasining tarjimasi yetarlimi?",
          de: "Reicht die Übersetzung der Heiratsurkunde aus?",
        },
        answer: {
          uz: "Har doim emas. Original yoki rasmiy nusxa, apostil yoki boshqa haqiqiylik tasdig‘i ham talab qilinishi mumkin.",
          de: "Nicht immer. Zusätzlich können Original oder amtliche Ausfertigung sowie Apostille oder anderer Echtheitsnachweis erforderlich sein.",
        },
      },
    ],
    sources: [
      {
        title: "International marriages",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/konsularisches/eheschliessung-node",
        language: "en",
      },
      {
        title: "Foreign public documents for use in Germany",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/konsularisches/urkundenverkehrallgemeines-node/urkundenverkehrteilb-node",
        language: "en",
      },
      {
        title: "International divorce law",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/international-divorce-law-2683968",
        language: "en",
      },
    ],
    relatedArticleSlugs: [
      "birth-certificate-guide",
      "apostille-guide",
      "official-translation-guide",
      "certified-copy-guide",
    ],
  } satisfies LocalizedGuideArticle;
