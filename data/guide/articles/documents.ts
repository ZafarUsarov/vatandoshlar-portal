import type { LocalizedGuideArticle } from "../../../types/guide";

export const documentArticles = [
  {
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
    },
  {
      id: "official-translation-guide",
      slug: "official-translation-guide",
      categorySlug: "documents",
      title: {
        uz: "Nemis tiliga rasmiy tarjima",
        de: "Beglaubigte Übersetzungen ins Deutsche",
      },
      excerpt: {
        uz: "Germaniyada hujjat tarjimasi: qasam ichgan yoki vakolatli tarjimon, O‘zbekistonda qilingan tarjimaning qabul qilinishi, apostil bilan tarjima tartibi, tarjimon bazasi va idora talablarini tekshirish.",
        de: "Leitfaden zu beglaubigten Übersetzungen: allgemein beeidigte oder ermächtigte Übersetzer, Anerkennung ausländischer Übersetzungen, Reihenfolge mit Apostille und offizielle Übersetzerdatenbank.",
      },
      intro: {
        uz: "Germaniyada rasmiy jarayon uchun oddiy tarjima yetarli bo‘lmasligi mumkin. Ko‘plab idoralar hujjatni Germaniyada qasam ichgan yoki vakolatli tarjimon tayyorlagan va imzo-muhr bilan tasdiqlagan tarjima shaklida talab qiladi. Aniq talabni hujjatni qabul qiluvchi idora belgilaydi.",
        de: "Für behördliche Verfahren reicht eine einfache Übersetzung häufig nicht aus. Viele Stellen verlangen eine Übersetzung, die von einem in Deutschland allgemein beeidigten oder ermächtigten Übersetzer gefertigt und mit Bestätigungsvermerk versehen wurde. Maßgeblich ist immer die Vorgabe der empfangenden Stelle.",
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
          label: { uz: "Tarjimon", de: "Übersetzer" },
          value: {
            uz: "Ko‘pincha qasam ichgan yoki vakolatli tarjimon",
            de: "Häufig allgemein beeidigter oder ermächtigter Übersetzer",
          },
        },
        {
          label: { uz: "Idora talabi", de: "Behördenvorgabe" },
          value: {
            uz: "Qabul qiluvchi idora qaysi tarjimani tan olishini belgilaydi",
            de: "Die empfangende Stelle bestimmt die akzeptierte Form",
          },
        },
        {
          label: { uz: "Rasmiy baza", de: "Offizielle Datenbank" },
          value: {
            uz: "justiz-dolmetscher.de",
            de: "justiz-dolmetscher.de",
          },
        },
        {
          label: { uz: "Muhim tartib", de: "Reihenfolge" },
          value: {
            uz: "Ko‘pincha apostildan keyin tarjima",
            de: "Häufig Übersetzung nach der Apostille",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Rasmiy tarjima nima?",
            de: "Was ist eine beglaubigte Übersetzung?",
          },
          paragraphs: [
            {
              uz: "Vakolatli tarjimon tarjimaning taqdim etilgan hujjatga to‘liq va to‘g‘ri mosligini o‘z imzosi, muhri va tasdiq yozuvi bilan tasdiqlaydi.",
              de: "Der ermächtigte Übersetzer bestätigt mit Unterschrift, Stempel und Vermerk, dass die Übersetzung vollständig und richtig mit der vorgelegten Urkunde übereinstimmt.",
            },
            {
              uz: "Germaniyada tarjimonlarni tayinlash va qasam ichirish qoidalari Bundeslandlar bo‘yicha farq qiladi. Rasmiy tarjimonlar federal adliya bazasida qidiriladi.",
              de: "Bestellung, Ermächtigung und Beeidigung richten sich nach den Regelungen der Bundesländer. Geeignete Übersetzer können in der offiziellen Justizdatenbank recherchiert werden.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi jarayonlarda kerak bo‘lishi mumkin?",
            de: "Für welche Verfahren kann sie erforderlich sein?",
          },
          items: [
            {
              uz: "Ausländerbehörde va viza jarayonlari",
              de: "Ausländerbehörde und Visumverfahren",
            },
            {
              uz: "Standesamt va oila huquqi",
              de: "Standesamt und familienrechtliche Verfahren",
            },
            {
              uz: "Universitet va Ausbildung",
              de: "Hochschule und Ausbildung",
            },
            {
              uz: "Diplom yoki kasb tan olish",
              de: "Anerkennung von Abschluss oder Beruf",
            },
            {
              uz: "Sud, notarius yoki boshqa davlat idorasi",
              de: "Gericht, Notar oder sonstige Behörde",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Tarjimonni qanday tanlash kerak?",
            de: "Wie wird ein geeigneter Übersetzer gefunden?",
          },
          items: [
            {
              uz: "Til kombinatsiyasini tekshiring",
              de: "Sprachkombination prüfen",
            },
            {
              uz: "Tarjimonning vakolati va Bundesland ma’lumotini tekshiring",
              de: "Ermächtigung und Bundesland prüfen",
            },
            {
              uz: "Qabul qiluvchi idora aynan shu tarjimon shaklini tan olishini tasdiqlang",
              de: "Akzeptanz durch die empfangende Stelle bestätigen lassen",
            },
            {
              uz: "Narx, muddat, yetkazish va originalni yuborish tartibini oldindan kelishing",
              de: "Preis, Frist, Versand und Umgang mit Originalen vorab klären",
            },
          ],
          paragraphs: [
            {
              uz: "Tarjimonni faqat reklama yoki ijtimoiy tarmoq orqali tanlamang. Ismni rasmiy adliya tarjimonlari bazasida tekshirish xavfsizroq.",
              de: "Wählen Sie nicht allein anhand von Werbung oder sozialen Medien. Prüfen Sie den Namen in der offiziellen Datenbank der Justiz.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Tarjimonga nima yuboriladi?",
            de: "Was benötigt der Übersetzer?",
          },
          items: [
            {
              uz: "To‘liq va o‘qiladigan original yoki sifatli skan",
              de: "Vollständiges, gut lesbares Original oder hochwertiger Scan",
            },
            {
              uz: "Apostil yoki boshqa tasdiq — mavjud bo‘lsa",
              de: "Apostille oder sonstige Bestätigung, soweit vorhanden",
            },
            {
              uz: "Ism-familiya yozilishi bo‘yicha pasport nusxasi",
              de: "Passkopie zur korrekten Schreibweise von Namen",
            },
            {
              uz: "Qabul qiluvchi idora yoki checklist talabi",
              de: "Vorgabe oder Checkliste der empfangenden Stelle",
            },
            {
              uz: "Oldingi tarjima — terminologiyani solishtirish uchun, mavjud bo‘lsa",
              de: "Frühere Übersetzung zur Terminologieabstimmung, soweit vorhanden",
            },
          ],
        },
        conditions: {
          title: {
            uz: "O‘zbekistonda qilingan tarjima Germaniyada qabul qilinadimi?",
            de: "Wird eine in Usbekistan erstellte Übersetzung anerkannt?",
          },
          paragraphs: [
            {
              uz: "Bu avtomatik emas. Ayrim idoralar xorijda tayyorlangan tarjimani qabul qiladi, boshqalari esa Germaniyada vakolatli tarjimonning tarjimasini talab qiladi.",
              de: "Das ist nicht automatisch der Fall. Manche Stellen akzeptieren im Ausland gefertigte Übersetzungen, andere verlangen eine Übersetzung durch einen in Deutschland ermächtigten Übersetzer.",
            },
            {
              uz: "Shuning uchun tarjima uchun pul to‘lashdan oldin qabul qiluvchi idoradan yozma javob olish tavsiya etiladi.",
              de: "Deshalb sollte vor Beauftragung schriftlich geklärt werden, welche Übersetzung akzeptiert wird.",
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
              uz: "Oddiy tarjimani rasmiy tasdiqlangan tarjima deb o‘ylash",
              de: "Einfache Übersetzung mit beglaubigter Übersetzung verwechseln",
            },
            {
              uz: "Apostil matnini tarjimadan tashqarida qoldirish",
              de: "Apostillentext nicht mitübersetzen lassen",
            },
            {
              uz: "Ism-familiyani pasportdan boshqacha yozish",
              de: "Namensschreibweise abweichend vom Reisepass",
            },
            {
              uz: "Faqat tarjimon muhri borligi uchun barcha idora qabul qiladi deb o‘ylash",
              de: "Annehmen, jeder Stempel werde von jeder Behörde akzeptiert",
            },
            {
              uz: "Original hujjatning bir qismini yoki orqa tomonini yubormaslik",
              de: "Rückseite oder Teile der Urkunde nicht vorlegen",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Idora talabini so‘rang",
            de: "Anforderung klären",
          },
          description: {
            uz: "Tarjima qayerda va kim tomonidan tayyorlanishi kerakligini yozma aniqlang.",
            de: "Klären Sie schriftlich, wo und durch wen die Übersetzung gefertigt werden muss.",
          },
        },
        {
          title: {
            uz: "Rasmiy tarjimon toping",
            de: "Offiziellen Übersetzer suchen",
          },
          description: {
            uz: "justiz-dolmetscher.de bazasida til va hudud bo‘yicha qidiring.",
            de: "Suchen Sie in justiz-dolmetscher.de nach Sprache und Ort.",
          },
        },
        {
          title: {
            uz: "Taklifni solishtiring",
            de: "Angebot vergleichen",
          },
          description: {
            uz: "Narx, muddat, sahifa soni va pochta xarajatini aniqlang.",
            de: "Klären Sie Preis, Frist, Seitenumfang und Versand.",
          },
        },
        {
          title: {
            uz: "Tarjimani tekshiring",
            de: "Übersetzung kontrollieren",
          },
          description: {
            uz: "Ismlar, sanalar, raqamlar va barcha muhrlar to‘g‘ri aks etganini tekshiring.",
            de: "Prüfen Sie Namen, Daten, Nummern und sämtliche Siegel.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Har qanday tarjimon rasmiy tarjima qila oladimi?",
            de: "Kann jeder Übersetzer eine beglaubigte Übersetzung erstellen?",
          },
          answer: {
            uz: "Yo‘q. Ko‘plab idoralar faqat qasam ichgan yoki vakolatli tarjimon tarjimasini qabul qiladi.",
            de: "Nein. Viele Behörden verlangen eine Übersetzung durch einen allgemein beeidigten oder ermächtigten Übersetzer.",
          },
        },
        {
          question: {
            uz: "Tarjima originalga biriktiriladimi?",
            de: "Wird die Übersetzung mit dem Original verbunden?",
          },
          answer: {
            uz: "Tarjimon amaliyoti va idora talabiga qarab nusxa yoki skan bilan biriktirilishi mumkin. Oldindan so‘rang.",
            de: "Je nach Arbeitsweise und Behördenvorgabe kann sie mit Kopie oder Scan verbunden werden. Klären Sie dies vorab.",
          },
        },
        {
          question: {
            uz: "Tarjimaga ham apostil kerakmi?",
            de: "Braucht auch die Übersetzung eine Apostille?",
          },
          answer: {
            uz: "Faqat qabul qiluvchi davlat yoki idora shunday talab qilsa. Bu avtomatik qoida emas.",
            de: "Nur wenn der Verwendungsstaat oder die empfangende Stelle dies verlangt. Es ist keine automatische Regel.",
          },
        },
      ],
      sources: [
        {
          title: "Database of translators and interpreters",
          organization: "German judicial authorities",
          url: "https://www.justiz-dolmetscher.de/Recherche/en",
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
        "certified-copy-guide",
        "birth-certificate-guide",
        "marriage-certificate-guide",
        "diploma-document-preparation",
      ],
    },
  {
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
    },
] satisfies ReadonlyArray<LocalizedGuideArticle>;
