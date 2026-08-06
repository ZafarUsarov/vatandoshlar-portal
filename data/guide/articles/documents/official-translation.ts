import type { LocalizedGuideArticle } from "../../../../types/guide";

export const officialTranslationArticle = {
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
    } satisfies LocalizedGuideArticle;
