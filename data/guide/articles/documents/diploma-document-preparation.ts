import type { LocalizedGuideArticle } from "../../../../types/guide";

export const diplomaDocumentPreparationArticle = {
    id: "diploma-document-preparation",
    slug: "diploma-document-preparation",
    categorySlug: "documents",
    title: {
      uz: "Diplom, transkript va sertifikatlarni tayyorlash",
      de: "Diplom, Transcript und Zertifikate vorbereiten",
    },
    excerpt: {
      uz: "Germaniyada universitet, Ausbildung, ish, ZAB yoki kasbiy tan olish uchun diplom hujjatlarini tayyorlash: diplom, fanlar va baholar ro‘yxati, tarjima, tasdiqlangan nusxa, apostil, anabin, ZAB va Anerkennung farqlari.",
      de: "Leitfaden zur Vorbereitung von Hochschul-, Ausbildungs- und Berufsunterlagen für Studium, Arbeit, ZAB oder Anerkennung: Abschlussurkunde, Fächer- und Notenübersicht, Übersetzung, beglaubigte Kopie, Apostille, anabin und Anerkennungsverfahren.",
    },
    intro: {
      uz: "Germaniyada xorijiy diplom bilan foydalanishning yagona universal yo‘li yo‘q. Universitetga kirish, Ausbildung, reglementierte kasb, oddiy ish, ZAB Zeugnisbewertung yoki kasbiy Anerkennung uchun hujjatlar va baholash tartibi turlicha. Shuning uchun avval maqsadni aniqlab, keyin aynan mas’ul idoraning hujjatlar ro‘yxatiga amal qilish kerak.",
      de: "Für die Verwendung eines ausländischen Abschlusses in Deutschland gibt es keinen einheitlichen Universalweg. Hochschule, Ausbildung, reglementierter Beruf, normale Beschäftigung, ZAB-Zeugnisbewertung und berufliche Anerkennung folgen unterschiedlichen Verfahren. Deshalb muss zuerst der Zweck bestimmt und anschließend die konkrete Unterlagenliste der zuständigen Stelle beachtet werden.",
    },
    status: "published",
    featured: true,
    lastReviewedAt: "2026-08-06",
    readingTime: {
      uz: "13 daqiqa",
      de: "13 Minuten",
    },
    facts: [
      {
        label: { uz: "Asosiy hujjatlar", de: "Kernunterlagen" },
        value: {
          uz: "Diplom va fanlar/baholar ro‘yxati",
          de: "Abschlussurkunde und Fächer-/Notenübersicht",
        },
      },
      {
        label: { uz: "Oliy ma’lumot", de: "Hochschulabschluss" },
        value: {
          uz: "anabin yoki ZAB Zeugnisbewertung orqali baholanishi mumkin",
          de: "Kann über anabin oder ZAB-Zeugnisbewertung bewertet werden",
        },
      },
      {
        label: { uz: "Kasbiy malaka", de: "Berufsqualifikation" },
        value: {
          uz: "Anerkennung uchun tegishli vakolatli idora baholaydi",
          de: "Wird im Anerkennungsverfahren von der zuständigen Stelle bewertet",
        },
      },
      {
        label: { uz: "Tarjima", de: "Übersetzung" },
        value: {
          uz: "Zaruratni va tarjimon talabini qabul qiluvchi idora belgilaydi",
          de: "Notwendigkeit und Übersetzeranforderung bestimmt die zuständige Stelle",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Avval qaysi maqsad uchun kerakligini aniqlang",
          de: "Zuerst den Verwendungszweck bestimmen",
        },
        items: [
          {
            uz: "Universitet yoki Studienkollegga kirish",
            de: "Hochschul- oder Studienkollegbewerbung",
          },
          {
            uz: "Dual yoki schulische Ausbildung",
            de: "Duale oder schulische Ausbildung",
          },
          {
            uz: "Reglementierte kasb uchun Anerkennung",
            de: "Anerkennung in einem reglementierten Beruf",
          },
          {
            uz: "Reglementiert bo‘lmagan kasbda ish qidirish",
            de: "Arbeitssuche in einem nicht reglementierten Beruf",
          },
          {
            uz: "Viza yoki Chancenkarte uchun malaka dalili",
            de: "Qualifikationsnachweis für Visum oder Chancenkarte",
          },
          {
            uz: "ZAB Zeugnisbewertung yoki DAB",
            de: "ZAB-Zeugnisbewertung oder DAB",
          },
        ],
        paragraphs: [
          {
            uz: "Bir jarayon uchun tayyorlangan hujjat to‘plami boshqa jarayon uchun avtomatik yetarli bo‘lmaydi. Masalan, ZAB uchun oddiy skan yetishi mumkin bo‘lgan holatda, boshqa Anerkennung idorasi certified copy va tarjima talab qilishi mumkin.",
            de: "Ein für ein Verfahren vorbereitetes Dokumentenpaket reicht nicht automatisch für ein anderes. Während bei der ZAB teilweise einfache Scans genügen, kann eine andere Anerkennungsstelle beglaubigte Kopien und Übersetzungen verlangen.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Diplom hujjatlari tarkibi",
          de: "Bestandteile der Abschlussunterlagen",
        },
        items: [
          {
            uz: "Diplom yoki yakuniy sertifikat",
            de: "Abschlussurkunde oder Abschlusszeugnis",
          },
          {
            uz: "Barcha fanlar va baholar ko‘rsatilgan transkript",
            de: "Vollständige Fächer- und Notenübersicht",
          },
          {
            uz: "Diploma Supplement — mavjud bo‘lsa",
            de: "Diploma Supplement, soweit vorhanden",
          },
          {
            uz: "Ta’lim davomiyligi va shakli haqida dalil — talab qilinsa",
            de: "Nachweis zu Dauer und Form des Studiums, soweit verlangt",
          },
          {
            uz: "Oldingi ta’lim bosqichlari hujjatlari",
            de: "Nachweise vorheriger Bildungsstufen",
          },
          {
            uz: "Kasbiy sertifikat, amaliyot va ish tajribasi dalillari",
            de: "Berufszertifikate, Praktika und Berufserfahrungsnachweise",
          },
        ],
      },
      requirements: {
        title: {
          uz: "anabin, ZAB va Anerkennung farqi",
          de: "Unterschied zwischen anabin, ZAB und Anerkennung",
        },
        paragraphs: [
          {
            uz: "anabin — xorijiy ta’lim muassasalari va diplomlar bo‘yicha ma’lumot bazasi. Undagi ijobiy ma’lumot ayrim viza yoki ish jarayonlarida malaka dalili sifatida ishlatilishi mumkin.",
            de: "anabin ist eine Informationsdatenbank zu ausländischen Bildungseinrichtungen und Abschlüssen. Positive Einträge können in bestimmten Visa- oder Beschäftigungsverfahren als Qualifikationsnachweis dienen.",
          },
          {
            uz: "ZAB Zeugnisbewertung xorijiy oliy diplomni Germaniya ta’lim tizimidagi daraja bilan taqqoslaydigan rasmiy hujjatdir. U kasbiy litsenziya o‘rnini bosmaydi.",
            de: "Die ZAB-Zeugnisbewertung ist eine amtliche Bescheinigung, die einen ausländischen Hochschulabschluss mit einem deutschen Bildungsabschluss vergleicht. Sie ersetzt keine berufsrechtliche Zulassung.",
          },
          {
            uz: "Kasbiy Anerkennung esa xorijiy kasbiy malakani Germaniyadagi aniq Referenzberuf bilan solishtiradi. Reglementierte kasblarda ishlash uchun to‘liq yoki qisman tan olish va qo‘shimcha choralar talab qilinishi mumkin.",
            de: "Die berufliche Anerkennung vergleicht eine ausländische Berufsqualifikation mit einem konkreten deutschen Referenzberuf. In reglementierten Berufen können vollständige oder teilweise Anerkennung und Ausgleichsmaßnahmen erforderlich sein.",
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
            uz: "Diplomning original tilidagi to‘liq nusxasi",
            de: "Vollständige Abschlussurkunde in der Originalsprache",
          },
          {
            uz: "Barcha fan va baholar ro‘yxati",
            de: "Vollständige Fächer- und Notenübersicht",
          },
          {
            uz: "Diploma Supplement yoki o‘quv dasturi — talab qilinsa",
            de: "Diploma Supplement oder Curriculum, soweit verlangt",
          },
          {
            uz: "Nemischa tarjima — mas’ul idora talab qilsa",
            de: "Deutsche Übersetzung, soweit von der zuständigen Stelle verlangt",
          },
          {
            uz: "Certified copy yoki oddiy scan — idora tartibiga qarab",
            de: "Beglaubigte Kopie oder einfacher Scan nach Verfahrensvorgabe",
          },
          {
            uz: "Pasport yoki shaxsni tasdiqlovchi hujjat",
            de: "Reisepass oder Identitätsnachweis",
          },
          {
            uz: "Ism o‘zgargan bo‘lsa nikoh yoki ism o‘zgarishi hujjati",
            de: "Bei Namensänderung Heirats- oder Namensänderungsnachweis",
          },
          {
            uz: "Ish tajribasi uchun vazifalar ko‘rsatilgan ma’lumotnomalar",
            de: "Arbeitsnachweise mit Beschreibung der Tätigkeiten",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Tarjima, certified copy va apostil",
          de: "Übersetzung, Beglaubigung und Apostille",
        },
        paragraphs: [
          {
            uz: "Anerkennung jarayonlarida ko‘pincha nemischa tarjima talab qilinadi va uni Germaniyada vakolatli yoki qasam ichgan tarjimon tayyorlashi kerak bo‘lishi mumkin. Qaysi tarjima tan olinishi mas’ul idora tomonidan belgilanadi.",
            de: "In Anerkennungsverfahren werden häufig deutsche Übersetzungen verlangt, die von öffentlich bestellten oder ermächtigten Übersetzern erstellt werden müssen. Welche Übersetzung akzeptiert wird, bestimmt die zuständige Stelle.",
          },
          {
            uz: "Apostil yoki certified copy talabi ham barcha jarayonda bir xil emas. Masalan, ZABning ayrim raqamli arizalarida oddiy skan yetishi mumkin, boshqa idora esa tasdiqlangan nusxa talab qiladi.",
            de: "Auch Apostille und Beglaubigung sind nicht in jedem Verfahren gleich. Bei einzelnen digitalen ZAB-Verfahren können einfache Scans genügen, während andere Stellen beglaubigte Kopien verlangen.",
          },
        ],
        items: [
          {
            uz: "Pul sarflashdan oldin aynan mas’ul idora checklistini oling.",
            de: "Beschaffen Sie vor Ausgaben die konkrete Checkliste der zuständigen Stelle.",
          },
          {
            uz: "Tarjimaga diplom, transkript, muhr va ilovalarni to‘liq kiriting.",
            de: "Lassen Sie Diplom, Transcript, Siegel und Anlagen vollständig übersetzen.",
          },
          {
            uz: "Original hujjatni pochta bilan yuborish talab qilinadimi yoki scan yetarlimi — alohida tekshiring.",
            de: "Prüfen Sie gesondert, ob Originalversand oder Scan genügt.",
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
            uz: "Faqat diplomni topshirib, transkriptni unutish",
            de: "Nur das Diplom ohne Fächer- und Notenübersicht einreichen",
          },
          {
            uz: "ZAB baholashini kasbiy Anerkennung bilan tenglashtirish",
            de: "ZAB-Zeugnisbewertung mit beruflicher Anerkennung verwechseln",
          },
          {
            uz: "anabin natijasini barcha kasb uchun avtomatik ish ruxsati deb tushunish",
            de: "anabin-Eintrag als automatische Berufszulassung verstehen",
          },
          {
            uz: "Keraksiz apostil va qimmat tarjimaga oldindan pul sarflash",
            de: "Unnötig vorab Geld für Apostille und Übersetzung ausgeben",
          },
          {
            uz: "Diplomdagi ism bilan pasportdagi ism farqini hujjatlashtirmaslik",
            de: "Namensabweichungen zwischen Abschluss und Pass nicht dokumentieren",
          },
          {
            uz: "Faqat norasmiy yoki AI tarjimasini rasmiy tarjima o‘rnida yuborish",
            de: "Inoffizielle oder KI-Übersetzung statt erforderlicher beglaubigter Übersetzung einreichen",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Maqsad va mas’ul idorani toping",
          de: "Zweck und zuständige Stelle bestimmen",
        },
        description: {
          uz: "Universitet, ZAB, Anerkennung, viza yoki ish beruvchi uchun qaysi yo‘l kerakligini aniqlang.",
          de: "Klären Sie, ob Hochschule, ZAB, Anerkennung, Visum oder Arbeitgeber zuständig ist.",
        },
      },
      {
        title: {
          uz: "To‘liq hujjat ro‘yxatini tuzing",
          de: "Vollständige Unterlagenliste erstellen",
        },
        description: {
          uz: "Diplom, transkript, ilovalar, oldingi ta’lim va ish tajribasi hujjatlarini jamlang.",
          de: "Sammeln Sie Abschluss, Transcript, Anlagen, frühere Bildungs- und Berufsnachweise.",
        },
      },
      {
        title: {
          uz: "Scan va original sifatini tekshiring",
          de: "Qualität von Scan und Original prüfen",
        },
        description: {
          uz: "Barcha sahifa, orqa tomon, muhr va imzo o‘qiladigan bo‘lsin.",
          de: "Alle Seiten, Rückseiten, Siegel und Unterschriften müssen lesbar sein.",
        },
      },
      {
        title: {
          uz: "Talab qilingan tarjimani tayyorlang",
          de: "Erforderliche Übersetzung erstellen lassen",
        },
        description: {
          uz: "Faqat mas’ul idora tan oladigan tarjimon va formatdan foydalaning.",
          de: "Nutzen Sie nur eine von der zuständigen Stelle akzeptierte Übersetzerqualifikation und Form.",
        },
      },
      {
        title: {
          uz: "Arizani to‘liq yuboring",
          de: "Antrag vollständig einreichen",
        },
        description: {
          uz: "Portal yoki idora ko‘rsatmasiga muvofiq fayllarni nomlab va tartiblab yuboring.",
          de: "Benennen und ordnen Sie Dateien nach Portal- oder Behördenvorgabe.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "ZAB va Anerkennung bir xilmi?",
          de: "Sind ZAB-Zeugnisbewertung und Anerkennung dasselbe?",
        },
        answer: {
          uz: "Yo‘q. ZAB oliy diplomni ta’lim darajasi bilan taqqoslaydi. Kasbiy Anerkennung esa malakani aniq Germaniya kasbi bilan solishtiradi.",
          de: "Nein. Die ZAB bewertet einen Hochschulabschluss bildungsbezogen. Die berufliche Anerkennung vergleicht eine Qualifikation mit einem konkreten deutschen Beruf.",
        },
      },
      {
        question: {
          uz: "Har bir diplomga apostil kerakmi?",
          de: "Braucht jedes Diplom eine Apostille?",
        },
        answer: {
          uz: "Yo‘q. Bu jarayon va mas’ul idora talabiga bog‘liq. Ayrim raqamli jarayonlarda oddiy scan yetarli bo‘lishi mumkin.",
          de: "Nein. Das richtet sich nach Verfahren und zuständiger Stelle. In einzelnen digitalen Verfahren kann ein einfacher Scan genügen.",
        },
      },
      {
        question: {
          uz: "Transkript bo‘lmasa nima qilish kerak?",
          de: "Was tun, wenn kein Transcript vorhanden ist?",
        },
        answer: {
          uz: "Ta’lim muassasasidan fanlar, baholar va o‘qish davomiyligi ko‘rsatilgan rasmiy ma’lumotnoma yoki dublikat so‘rang. Mas’ul idoraga yo‘qolgan hujjat holatini ham tushuntiring.",
          de: "Beantragen Sie bei der Bildungseinrichtung eine amtliche Fächer- und Notenübersicht oder ein Duplikat und informieren Sie die zuständige Stelle über fehlende Unterlagen.",
        },
      },
      {
        question: {
          uz: "AI tarjimasi yetarlimi?",
          de: "Reicht eine KI-Übersetzung?",
        },
        answer: {
          uz: "Rasmiy jarayon uchun odatda yo‘q. Idora vakolatli tarjimon tayyorlagan tarjimani talab qilishi mumkin.",
          de: "Für offizielle Verfahren grundsätzlich nicht. Die Stelle kann eine Übersetzung durch einen ermächtigten Übersetzer verlangen.",
        },
      },
    ],
    sources: [
      {
        title: "Documents for the application",
        organization: "Recognition in Germany",
        url: "https://www.anerkennung-in-deutschland.de/html/en/documents-application.php",
        language: "en",
      },
      {
        title: "Higher education qualifications",
        organization: "Recognition in Germany",
        url: "https://www.anerkennung-in-deutschland.de/html/en/Institute-of-higher-education.php",
        language: "en",
      },
      {
        title: "Statement of Comparability",
        organization: "Central Office for Foreign Education",
        url: "https://zab.kmk.org/en/statement-comparability",
        language: "en",
      },
      {
        title: "Application for a Statement of Comparability",
        organization: "Central Office for Foreign Education",
        url: "https://zab.kmk.org/en/statement-comparability/application",
        language: "en",
      },
      {
        title: "Evaluation of foreign academic degrees",
        organization: "Make it in Germany",
        url: "https://www.make-it-in-germany.com/en/working-in-germany/recognition/foreign-academic-qualifications",
        language: "en",
      },
    ],
    relatedArticleSlugs: [
      "apostille-guide",
      "official-translation-guide",
      "certified-copy-guide",
      "birth-certificate-guide",
      "marriage-certificate-guide",
    ],
  } satisfies LocalizedGuideArticle;
