import type { LocalizedGuideArticle } from "../../../types/guide";

export const invitationArticles = [
  {
      id: "invitation-letter",
      slug: "invitation-letter",
      categorySlug: "invitation",
      title: {
        uz: "Germaniyaga mehmon chaqirish uchun taklifnoma",
        de: "Einladungsschreiben für einen Besuch in Deutschland",
      },
      excerpt: {
        uz: "Germaniyada yashovchi shaxs tomonidan mehmon uchun yoziladigan oddiy taklifnoma: mazmuni, moliyalashtirish, yashash manzili, qarindoshlik dalili, pasport nusxalari va Verpflichtungserklärungdan farqi.",
        de: "Leitfaden zum formlosen Einladungsschreiben: Inhalt, Finanzierung, Unterkunft, Verwandtschaftsnachweis, Ausweiskopien und Abgrenzung zur Verpflichtungserklärung.",
      },
      intro: {
        uz: "Oddiy taklifnoma safar maqsadini va mehmon bilan chaqiruvchi o‘rtasidagi aloqani tushuntiradi. U maxsus notarial shaklni talab qilmaydi. Ammo chaqiruvchi safar xarajatlarini huquqiy majburiyat bilan o‘z zimmasiga olsa, oddiy taklifnoma yetarli bo‘lmaydi va alohida Verpflichtungserklärung talab qilinishi mumkin.",
        de: "Ein formloses Einladungsschreiben erklärt Reisezweck und Beziehung zwischen Gast und einladender Person. Eine notarielle Form ist grundsätzlich nicht erforderlich. Soll die einladende Person jedoch die Reisekosten rechtlich verbindlich übernehmen, kann zusätzlich eine Verpflichtungserklärung erforderlich sein.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: {
        uz: "9 daqiqa",
        de: "9 Minuten",
      },
      facts: [
        {
          label: { uz: "Shakli", de: "Form" },
          value: {
            uz: "Odatda erkin shakldagi yozma taklifnoma",
            de: "Grundsätzlich formloses schriftliches Einladungsschreiben",
          },
        },
        {
          label: { uz: "Asosiy vazifa", de: "Zweck" },
          value: {
            uz: "Safar maqsadi va mehmon bilan aloqani tushuntirish",
            de: "Reisezweck und Beziehung zum Gast erläutern",
          },
        },
        {
          label: { uz: "Moliyalashtirish", de: "Finanzierung" },
          value: {
            uz: "Kim xarajatlarni qoplashi aniq yoziladi",
            de: "Es wird klar angegeben, wer die Kosten trägt",
          },
        },
        {
          label: { uz: "Muhim farq", de: "Wichtiger Unterschied" },
          value: {
            uz: "Oddiy taklifnoma Verpflichtungserklärung o‘rnini bosmaydi",
            de: "Ein Einladungsschreiben ersetzt keine Verpflichtungserklärung",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Oddiy taklifnoma nima?",
            de: "Was ist ein formloses Einladungsschreiben?",
          },
          paragraphs: [
            {
              uz: "Taklifnoma Germaniyada yashovchi shaxs mehmonni qaysi maqsadda, qaysi muddatga va qaysi manzilda qabul qilishini tushuntiradigan hujjatdir. U safar maqsadini tasdiqlashga xizmat qiladi.",
              de: "Das Einladungsschreiben erklärt, zu welchem Zweck, für welchen Zeitraum und an welcher Adresse die einladende Person den Gast aufnimmt. Es dient dem Nachweis des Reisezwecks.",
            },
            {
              uz: "Germaniya Tashqi ishlar vazirligi oddiy taklifnoma uchun maxsus rasmiy shakl shart emasligini ko‘rsatadi. Toshkentdagi Germaniya elchixonasi ham nemis yoki ingliz tilidagi erkin shakldagi taklifnomani qabul qilinadigan hujjatlar qatorida ko‘rsatadi.",
              de: "Das Auswärtige Amt weist darauf hin, dass für ein Einladungsschreiben grundsätzlich keine besondere Form vorgeschrieben ist. Auch die Deutsche Botschaft Taschkent nennt ein formloses Schreiben in deutscher oder englischer Sprache als möglichen Nachweis.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Taklifnomada nimalar bo‘lishi kerak?",
            de: "Welche Angaben sollte die Einladung enthalten?",
          },
          items: [
            {
              uz: "Chaqiruvchining to‘liq ism-familiyasi, manzili va aloqa ma’lumoti",
              de: "Vollständiger Name, Anschrift und Kontaktdaten der einladenden Person",
            },
            {
              uz: "Mehmonning to‘liq ism-familiyasi, tug‘ilgan sanasi va pasport ma’lumoti",
              de: "Vollständiger Name, Geburtsdatum und Passangaben des Gastes",
            },
            {
              uz: "Safarning aniq maqsadi",
              de: "Konkreter Zweck der Reise",
            },
            {
              uz: "Rejalashtirilgan kirish va chiqish sanalari",
              de: "Geplante Ein- und Ausreisedaten",
            },
            {
              uz: "Mehmon qayerda yashashi",
              de: "Unterkunft des Gastes",
            },
            {
              uz: "Chaqiruvchi va mehmon o‘rtasidagi munosabat",
              de: "Beziehung zwischen einladender Person und Gast",
            },
            {
              uz: "Safar xarajatlarini kim qoplashi",
              de: "Wer die Reisekosten übernimmt",
            },
            {
              uz: "Sana va imzo",
              de: "Datum und Unterschrift",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Taklifnomaga qo‘shiladigan hujjatlar",
            de: "Unterlagen zur Einladung",
          },
          items: [
            {
              uz: "Chaqiruvchining pasporti yoki Germaniya ID kartasi nusxasi",
              de: "Kopie des Reisepasses oder Personalausweises der einladenden Person",
            },
            {
              uz: "Chaqiruvchi Germaniya fuqarosi bo‘lmasa, Aufenthaltstitel nusxasi",
              de: "Bei nichtdeutscher einladender Person Kopie des Aufenthaltstitels",
            },
            {
              uz: "Zarur bo‘lsa qarindoshlikni tasdiqlovchi tug‘ilganlik yoki nikoh hujjatlari",
              de: "Gegebenenfalls Geburts- oder Heiratsurkunden zum Verwandtschaftsnachweis",
            },
            {
              uz: "Yashash manzili bo‘yicha dalil — zarur holatda",
              de: "Gegebenenfalls Nachweis der Unterkunft",
            },
          ],
          paragraphs: [
            {
              uz: "Toshkentdagi Germaniya elchixonasi chaqiruvchining pasporti va zarur bo‘lsa Germaniyadagi Aufenthaltstiteli nusxasini taqdim etishni ko‘rsatadi.",
              de: "Die Deutsche Botschaft Taschkent verlangt regelmäßig eine Passkopie und gegebenenfalls eine Kopie des deutschen Aufenthaltstitels der einladenden Person.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Moliyalashtirish qanday yoziladi?",
            de: "Wie wird die Finanzierung beschrieben?",
          },
          paragraphs: [
            {
              uz: "Mehmon safar xarajatlarini o‘zi qoplasa, taklifnomada bu aniq ko‘rsatiladi. Mehmon viza arizasida o‘zining bank hisoboti va boshqa moliyaviy dalillarini taqdim etadi.",
              de: "Finanziert der Gast die Reise selbst, sollte dies ausdrücklich erwähnt werden. Im Visumverfahren legt der Gast eigene Kontoauszüge und weitere Finanzierungsnachweise vor.",
            },
            {
              uz: "Chaqiruvchi yashash yoki ayrim kundalik xarajatlarni qoplasa, bu ham aniq yoziladi. Biroq xarajatlarni to‘liq va huquqiy tarzda o‘z zimmasiga olish uchun Verpflichtungserklärung talab qilinishi mumkin.",
              de: "Übernimmt die einladende Person Unterkunft oder einzelne Kosten, sollte dies klar benannt werden. Für eine umfassende rechtlich verbindliche Kostenübernahme kann jedoch eine Verpflichtungserklärung erforderlich sein.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Qaysi tilda yozish kerak?",
            de: "In welcher Sprache sollte die Einladung verfasst sein?",
          },
          items: [
            {
              uz: "Toshkent uchun nemis yoki ingliz tili tavsiya etiladi",
              de: "Für Taschkent werden Deutsch oder Englisch empfohlen",
            },
            {
              uz: "Matn qisqa, aniq va hujjatlardagi ma’lumotlarga mos bo‘lsin",
              de: "Der Text sollte kurz, klar und mit den Unterlagen konsistent sein",
            },
            {
              uz: "Safar muddati boshqa hujjatlardagi sanalar bilan mos bo‘lsin",
              de: "Reisezeitraum muss mit den übrigen Unterlagen übereinstimmen",
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
              uz: "Taklifnomada safar maqsadini juda umumiy yozish",
              de: "Reisezweck zu allgemein formulieren",
            },
            {
              uz: "Pasportdagi ism yoki tug‘ilgan sanani xato yozish",
              de: "Name oder Geburtsdatum abweichend vom Reisepass angeben",
            },
            {
              uz: "Moliyalashtirish haqida qarama-qarshi ma’lumot berish",
              de: "Widersprüchliche Angaben zur Finanzierung machen",
            },
            {
              uz: "Oddiy taklifnomani Verpflichtungserklärung deb ko‘rsatish",
              de: "Ein formloses Schreiben als Verpflichtungserklärung bezeichnen",
            },
            {
              uz: "Soxta manzil yoki noto‘g‘ri munosabat ko‘rsatish",
              de: "Falsche Anschrift oder unzutreffende Beziehung angeben",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Safar tafsilotlarini kelishib oling",
            de: "Reisedaten abstimmen",
          },
          description: {
            uz: "Mehmon bilan safar sanasi, yashash joyi va xarajatlarni kim qoplashini aniqlang.",
            de: "Stimmen Sie Reisezeitraum, Unterkunft und Kostenübernahme mit dem Gast ab.",
          },
        },
        {
          title: {
            uz: "Taklifnomani yozing",
            de: "Einladung verfassen",
          },
          description: {
            uz: "Barcha shaxsiy ma’lumot va safar maqsadini aniq kiriting.",
            de: "Tragen Sie alle Personendaten und den Reisezweck klar ein.",
          },
        },
        {
          title: {
            uz: "Hujjat nusxalarini qo‘shing",
            de: "Nachweise beifügen",
          },
          description: {
            uz: "Pasport, Aufenthaltstitel va zarur qarindoshlik hujjatlari nusxalarini tayyorlang.",
            de: "Bereiten Sie Pass-, Aufenthaltstitel- und gegebenenfalls Verwandtschaftsnachweise vor.",
          },
        },
        {
          title: {
            uz: "Mehmonga yuboring",
            de: "An Gast übermitteln",
          },
          description: {
            uz: "Taklifnoma va hujjatlarni xavfsiz kanal orqali yuboring.",
            de: "Übermitteln Sie Einladung und Unterlagen über einen sicheren Weg.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Taklifnoma notarial tasdiqlanishi kerakmi?",
            de: "Muss die Einladung notariell beglaubigt werden?",
          },
          answer: {
            uz: "Oddiy safar maqsadini tasdiqlovchi taklifnoma uchun odatda notarial tasdiq talab qilinmaydi.",
            de: "Für ein formloses Einladungsschreiben ist grundsätzlich keine notarielle Beglaubigung erforderlich.",
          },
        },
        {
          question: {
            uz: "Taklifnoma viza berilishini kafolatlaydimi?",
            de: "Garantiert eine Einladung die Visumerteilung?",
          },
          answer: {
            uz: "Yo‘q. Viza qarori barcha hujjatlar, safar maqsadi, moliyalashtirish va qaytish ehtimoli asosida qabul qilinadi.",
            de: "Nein. Die Entscheidung basiert auf allen Unterlagen, Reisezweck, Finanzierung und Rückkehrbereitschaft.",
          },
        },
        {
          question: {
            uz: "Taklifnomani email orqali yuborsa bo‘ladimi?",
            de: "Kann die Einladung per E-Mail versandt werden?",
          },
          answer: {
            uz: "Oddiy taklifnoma odatda skan yoki PDF shaklida yuborilishi mumkin. Ammo rasmiy checklistdagi talablar ustuvor.",
            de: "Ein formloses Schreiben kann regelmäßig als Scan oder PDF übermittelt werden. Maßgeblich bleibt jedoch die offizielle Checkliste.",
          },
        },
      ],
      sources: [
        {
          title: "For my visa application I need an invitation",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/12-einladung/606720",
          language: "en",
        },
        {
          title: "Besuchsvisum",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/2433904-2433904",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "visitor-visa",
        "declaration-of-commitment",
        "visitor-visa-documents",
      ],
    },
  {
      id: "declaration-of-commitment",
      slug: "declaration-of-commitment",
      categorySlug: "invitation",
      title: {
        uz: "Verpflichtungserklärung: mehmon xarajatlarini kafolatlash",
        de: "Verpflichtungserklärung für einen Besuch",
      },
      excerpt: {
        uz: "Germaniyada Verpflichtungserklärung olish: kim bera oladi, moliyaviy qobiliyat, qamrab olinadigan xarajatlar, kerakli hujjatlar, mahalliy idora, amal qilish muddati va viza uchun foydalanish.",
        de: "Leitfaden zur Verpflichtungserklärung: berechtigte Personen, Bonität, Kostenumfang, Unterlagen, zuständige Behörde, Geltungsdauer und Verwendung im Visumverfahren.",
      },
      intro: {
        uz: "Verpflichtungserklärung — Germaniyada yashovchi shaxsning mehmonning yashash, tibbiy yordam va zarur bo‘lsa qaytarish xarajatlarini davlat oldida huquqiy tarzda o‘z zimmasiga olishi. Bu oddiy taklifnoma emas va katta moliyaviy mas’uliyat tug‘diradi.",
        de: "Die Verpflichtungserklärung ist eine rechtlich verbindliche Kostenübernahme gegenüber dem Staat. Die einladende Person haftet unter anderem für Lebensunterhalt, medizinische Versorgung und gegebenenfalls Rückführungskosten des Gastes. Sie ist kein einfaches Einladungsschreiben.",
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
          label: { uz: "Mas’ul idora", de: "Zuständige Stelle" },
          value: {
            uz: "Yashash joyiga qarab Ausländerbehörde yoki Ordnungsamt",
            de: "Je nach Wohnort Ausländerbehörde oder Ordnungsamt",
          },
        },
        {
          label: { uz: "Huquqiy mas’uliyat", de: "Haftung" },
          value: {
            uz: "Yashash, davolanish va ayrim qaytarish xarajatlari",
            de: "Lebensunterhalt, Behandlung und gegebenenfalls Rückführungskosten",
          },
        },
        {
          label: { uz: "Moliya tekshiruvi", de: "Bonitätsprüfung" },
          value: {
            uz: "Daromad, oila va majburiyatlarga qarab",
            de: "Abhängig von Einkommen, Haushalt und Unterhaltspflichten",
          },
        },
        {
          label: { uz: "Viza arizasida", de: "Im Visumverfahren" },
          value: {
            uz: "Toshkentda odatda 6 oydan eski bo‘lmasligi kerak",
            de: "In Taschkent grundsätzlich nicht älter als sechs Monate",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Verpflichtungserklärung nimani qamrab oladi?",
            de: "Welche Kosten umfasst die Verpflichtung?",
          },
          items: [
            {
              uz: "Oziq-ovqat, turar joy va kundalik yashash xarajatlari",
              de: "Lebensunterhalt wie Unterkunft und Verpflegung",
            },
            {
              uz: "Tibbiy davolanish, dori va parvarish xarajatlari",
              de: "Ärztliche Behandlung, Medikamente und Pflege",
            },
            {
              uz: "Davlat idoralari to‘lagan ayrim ijtimoiy xarajatlarni qoplash",
              de: "Erstattung bestimmter öffentlicher Leistungen",
            },
            {
              uz: "Majburiy chiqib ketish bilan bog‘liq xarajatlar",
              de: "Kosten einer gegebenenfalls zwangsweisen Ausreise",
            },
          ],
          paragraphs: [
            {
              uz: "Mahalliy idora chaqiruvchining moliyaviy qobiliyatini tekshiradi. Yetarli daromad yoki jamg‘arma bo‘lmasa, hujjatda moliyaviy qobiliyat tasdiqlanmaganligi qayd etilishi va viza bo‘limi uni moliyaviy kafolat sifatida qabul qilmasligi mumkin.",
              de: "Die zuständige Behörde prüft die finanzielle Leistungsfähigkeit. Reichen Einkommen oder Vermögen nicht aus, kann die Bonität als nicht nachgewiesen vermerkt werden; die Auslandsvertretung kann die Erklärung dann als Finanzierungsnachweis ablehnen.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kim Verpflichtungserklärung bera oladi?",
            de: "Wer kann eine Verpflichtungserklärung abgeben?",
          },
          items: [
            {
              uz: "Germaniyada asosiy yashash joyiga ega shaxs",
              de: "Person mit Hauptwohnsitz in Deutschland",
            },
            {
              uz: "Yetarli va tasdiqlanadigan daromad yoki jamg‘armaga ega shaxs",
              de: "Person mit ausreichendem nachweisbarem Einkommen oder Vermögen",
            },
            {
              uz: "Mahalliy idora talablari bo‘yicha qonuniy maqomga ega shaxs",
              de: "Person mit dem von der örtlichen Behörde verlangten rechtmäßigen Status",
            },
          ],
          paragraphs: [
            {
              uz: "Aniq daromad chegarasi butun Germaniya bo‘yicha yagona emas. U shahar, chaqiruvchining oila tarkibi, ijara va aliment majburiyatlari hamda mehmonlar soniga qarab hisoblanadi.",
              de: "Es gibt keine bundesweit einheitliche Einkommensgrenze. Maßgeblich sind örtliche Berechnung, Haushaltsgröße, Wohn- und Unterhaltspflichten sowie Zahl der Gäste.",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Odatda kerak bo‘ladigan hujjatlar",
            de: "Üblicherweise erforderliche Unterlagen",
          },
          items: [
            {
              uz: "Chaqiruvchining pasporti yoki ID kartasi",
              de: "Reisepass oder Personalausweis der einladenden Person",
            },
            {
              uz: "Germaniya fuqarosi bo‘lmasa Aufenthaltstitel",
              de: "Bei nichtdeutscher Person gültiger Aufenthaltstitel",
            },
            {
              uz: "So‘nggi ish haqi hisoblari yoki daromad dalili",
              de: "Aktuelle Gehaltsabrechnungen oder Einkommensnachweise",
            },
            {
              uz: "Ish shartnomasi yoki ish beruvchi tasdig‘i",
              de: "Arbeitsvertrag oder Arbeitgeberbescheinigung",
            },
            {
              uz: "Ijara va muntazam majburiyatlar haqida ma’lumot",
              de: "Angaben zu Miete und laufenden Verpflichtungen",
            },
            {
              uz: "Mehmonning pasport ma’lumotlari va safar tafsilotlari",
              de: "Passdaten und Reisedaten des Gastes",
            },
            {
              uz: "Mahalliy idora so‘ragan qo‘shimcha hujjatlar",
              de: "Weitere von der örtlichen Behörde verlangte Unterlagen",
            },
          ],
        },
        documents: {
          title: {
            uz: "Hujjatni viza uchun qanday ishlatish kerak?",
            de: "Wie wird die Erklärung im Visumverfahren verwendet?",
          },
          paragraphs: [
            {
              uz: "Toshkentdagi Germaniya elchixonasi Besuchsvisum uchun Verpflichtungserklärungning originali va nusxasini ko‘rsatadi. Ariza topshirilayotgan vaqtda u olti oydan eski bo‘lmasligi kerak.",
              de: "Die Deutsche Botschaft Taschkent nennt für das Besuchsvisum Original und Kopie der Verpflichtungserklärung. Zum Zeitpunkt der Antragstellung darf sie grundsätzlich nicht älter als sechs Monate sein.",
            },
            {
              uz: "Hujjatni mehmonning o‘ziga xavfsiz tarzda yuboring. Faqat skan yetarlimi yoki original kerakmi — aniq vakolatxona checklistidan tekshiriladi.",
              de: "Übermitteln Sie die Erklärung sicher an den Gast. Ob Scan oder Original erforderlich ist, richtet sich nach der konkreten Checkliste der Auslandsvertretung.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Mas’uliyat qancha davom etadi?",
            de: "Wie lange dauert die Haftung?",
          },
          paragraphs: [
            {
              uz: "Verpflichtungserklärung bo‘yicha huquqiy mas’uliyat viza muddatidan uzoqroq davom etishi mumkin. Masalan, Berlin xizmati ayrim holatlarda majburiyat Germaniyaga kirishdan boshlab besh yilgacha davom etishini ko‘rsatadi.",
              de: "Die Haftung kann länger als die Visumgültigkeit dauern. Der Berliner Service weist beispielsweise darauf hin, dass sie in bestimmten Fällen ab Einreise bis zu fünf Jahre gelten kann.",
            },
            {
              uz: "Imzolashdan oldin mahalliy idora bergan qo‘shimcha tushuntirish va huquqiy oqibatlarni to‘liq o‘qing.",
              de: "Lesen Sie vor Unterzeichnung die ergänzende Belehrung und sämtliche Rechtsfolgen der örtlichen Behörde vollständig.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Muhim ogohlantirishlar",
            de: "Wichtige Hinweise",
          },
          items: [
            {
              uz: "Bu oddiy do‘stona va’da emas, huquqiy moliyaviy majburiyatdir",
              de: "Es handelt sich nicht um ein unverbindliches Versprechen, sondern um eine rechtliche Haftung",
            },
            {
              uz: "Mehmon kelmasa yoki viza rad qilinsa to‘lov qaytarilishi kafolatlanmaydi",
              de: "Bei Nichtreise oder Ablehnung ist eine Gebührenerstattung nicht garantiert",
            },
            {
              uz: "Mahalliy daromad mezonini boshqa shahar raqami bilan baholamang",
              de: "Übertragen Sie Einkommensgrenzen anderer Städte nicht ungeprüft",
            },
            {
              uz: "Soxta daromad dalili jiddiy huquqiy oqibatlarga olib keladi",
              de: "Gefälschte Einkommensnachweise können erhebliche rechtliche Folgen haben",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Mahalliy idorani toping",
            de: "Zuständige Stelle finden",
          },
          description: {
            uz: "Shahar yoki Kreis portalida Verpflichtungserklärung xizmatini toping.",
            de: "Suchen Sie im Stadt- oder Kreisportal nach der Dienstleistung.",
          },
        },
        {
          title: {
            uz: "Moliya talabini tekshiring",
            de: "Bonität vorprüfen",
          },
          description: {
            uz: "Daromad, oila tarkibi va mehmonlar soniga oid talablarni ko‘ring.",
            de: "Prüfen Sie Anforderungen zu Einkommen, Haushalt und Zahl der Gäste.",
          },
        },
        {
          title: {
            uz: "Ariza va hujjatlarni topshiring",
            de: "Antrag und Unterlagen einreichen",
          },
          description: {
            uz: "Rasmiy portal yoki termin orqali ariza bering.",
            de: "Stellen Sie den Antrag über Portal oder Termin.",
          },
        },
        {
          title: {
            uz: "Hujjatni shaxsan imzolang",
            de: "Erklärung unterzeichnen",
          },
          description: {
            uz: "Idora talabi bo‘yicha shaxsni tasdiqlab, hujjatni imzolang.",
            de: "Identifizieren Sie sich und unterzeichnen Sie die Erklärung nach Behördenvorgabe.",
          },
        },
        {
          title: {
            uz: "Mehmonga yuboring",
            de: "An Gast senden",
          },
          description: {
            uz: "Original va nusxani checklist talabiga muvofiq yuboring.",
            de: "Übermitteln Sie Original und Kopie entsprechend der Checkliste.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Verpflichtungserklärung viza berilishini kafolatlaydimi?",
            de: "Garantiert die Verpflichtungserklärung ein Visum?",
          },
          answer: {
            uz: "Yo‘q. U faqat moliyalashtirish dalillaridan biri. Viza qarori barcha talablar asosida qabul qilinadi.",
            de: "Nein. Sie ist nur ein Finanzierungsnachweis. Die Visumentscheidung berücksichtigt alle Voraussetzungen.",
          },
        },
        {
          question: {
            uz: "Daromadim yetmasa baribir olish mumkinmi?",
            de: "Kann ich die Erklärung trotz zu geringen Einkommens erhalten?",
          },
          answer: {
            uz: "Ayrim idoralar hujjatni moliyaviy qobiliyat tasdiqlanmagan qaydi bilan berishi mumkin, lekin viza bo‘limi uni moliyaviy kafolat sifatida tan olmasligi mumkin.",
            de: "Einige Behörden können sie mit dem Vermerk fehlender Bonität ausstellen; die Auslandsvertretung kann sie dann als Finanzierungsnachweis ablehnen.",
          },
        },
        {
          question: {
            uz: "Bir nechta mehmon uchun bitta hujjat yetadimi?",
            de: "Reicht eine Erklärung für mehrere Gäste?",
          },
          answer: {
            uz: "Bu mahalliy idora tartibiga bog‘liq. Har bir mehmon va oila guruhi bo‘yicha talabni idoradan tekshiring.",
            de: "Das hängt vom örtlichen Verfahren ab. Prüfen Sie die Anforderungen für Einzelpersonen und Familiengruppen.",
          },
        },
      ],
      sources: [
        {
          title: "For my visa application I need an invitation",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/12-einladung/606720",
          language: "en",
        },
        {
          title: "Verpflichtungserklärung abgeben",
          organization: "Service Berlin",
          url: "https://service.berlin.de/dienstleistung/326540/",
          language: "de",
        },
        {
          title: "Besuchsvisum",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/2433904-2433904",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "invitation-letter",
        "visitor-visa",
        "visitor-visa-documents",
      ],
    },
  {
      id: "visitor-visa",
      slug: "visitor-visa",
      categorySlug: "invitation",
      title: {
        uz: "Germaniyaga mehmon vizasi",
        de: "Besuchsvisum für Deutschland",
      },
      excerpt: {
        uz: "O‘zbekistondan Germaniyaga qarindosh yoki tanishnikiga borish uchun Schengen mehmon vizasi: 90/180 qoidasi, TLS termini, ariza muddati, to‘lovlar, sug‘urta, moliyalashtirish va qaytish dalillari.",
        de: "Schengen-Besuchsvisum aus Usbekistan: 90/180-Regel, TLS-Termin, Antragsfrist, Gebühren, Versicherung, Finanzierung und Rückkehrnachweise.",
      },
      intro: {
        uz: "Mehmon vizasi Schengen C vizasi bo‘lib, Germaniya va Schengen hududida 180 kunlik davr ichida jami 90 kungacha qisqa muddatli tashrifga mo‘ljallangan. Toshkentda arizalar 2025-yil 1-iyuldan boshlab TLScontact orqali qabul qilinadi.",
        de: "Das Besuchsvisum ist ein Schengen-Visum Typ C für kurzfristige Aufenthalte von insgesamt bis zu 90 Tagen innerhalb eines Zeitraums von 180 Tagen. In Taschkent werden Anträge seit dem 1. Juli 2025 über TLScontact angenommen.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: {
        uz: "12 daqiqa",
        de: "12 Minuten",
      },
      facts: [
        {
          label: { uz: "Viza turi", de: "Visumtyp" },
          value: { uz: "Schengen C vizasi", de: "Schengen-Visum Typ C" },
        },
        {
          label: { uz: "Maksimal muddat", de: "Maximaler Aufenthalt" },
          value: {
            uz: "180 kun ichida 90 kungacha",
            de: "Bis zu 90 Tage innerhalb von 180 Tagen",
          },
        },
        {
          label: { uz: "Ariza joyi", de: "Antragstellung" },
          value: { uz: "TLScontact Toshkent", de: "TLScontact Taschkent" },
        },
        {
          label: { uz: "Kattalar to‘lovi", de: "Gebühr Erwachsene" },
          value: { uz: "90 yevro", de: "90 Euro" },
        },
        {
          label: { uz: "6–12 yosh", de: "Kinder 6–12 Jahre" },
          value: { uz: "45 yevro", de: "45 Euro" },
        },
        {
          label: { uz: "Ariza muddati", de: "Antragszeitraum" },
          value: {
            uz: "Safardan 6 oy oldin topshirish mumkin",
            de: "Antrag bis zu 6 Monate vor Reise möglich",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Mehmon vizasi kimlar uchun?",
            de: "Für wen ist das Besuchsvisum?",
          },
          items: [
            {
              uz: "Germaniyada yashovchi qarindoshnikiga tashrif",
              de: "Besuch bei Verwandten in Deutschland",
            },
            {
              uz: "Do‘st yoki tanishnikiga qisqa muddatli tashrif",
              de: "Kurzfristiger Besuch bei Freunden oder Bekannten",
            },
            {
              uz: "Oilaviy tadbir, bayram yoki qisqa xususiy safar",
              de: "Familienfeier, privater Anlass oder kurzer Besuch",
            },
          ],
          paragraphs: [
            {
              uz: "Bu viza Germaniyada ishlash yoki uzoq muddat yashash huquqini bermaydi. Safar 90 kundan ortiq yoki boshqa asosiy maqsadga ega bo‘lsa, milliy viza yoki boshqa viza kategoriyasi kerak bo‘lishi mumkin.",
              de: "Das Visum berechtigt nicht zur Erwerbstätigkeit oder zu einem langfristigen Aufenthalt. Bei mehr als 90 Tagen oder anderem Hauptzweck kann ein nationales Visum oder eine andere Kategorie erforderlich sein.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Asosiy baholash mezonlari",
            de: "Zentrale Prüfungspunkte",
          },
          items: [
            {
              uz: "Safar maqsadining ishonchliligi",
              de: "Plausibler Reisezweck",
            },
            {
              uz: "Yashash joyi va moliyalashtirishning ta’minlanganligi",
              de: "Gesicherte Unterkunft und Finanzierung",
            },
            {
              uz: "Butun safar uchun yetarli tibbiy sug‘urta",
              de: "Ausreichende Reisekrankenversicherung",
            },
            {
              uz: "Safar tugagach O‘zbekistonga qaytish ehtimoli",
              de: "Glaubhafte Rückkehrbereitschaft nach Usbekistan",
            },
            {
              uz: "To‘liq va bir-biriga mos hujjatlar",
              de: "Vollständige und widerspruchsfreie Unterlagen",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Termin va ariza topshirish",
            de: "Termin und Antragstellung",
          },
          paragraphs: [
            {
              uz: "Toshkentda Schengen arizasi TLScontact orqali topshiriladi. Termin bron qilish bepul, biroq viza to‘lovidan tashqari TLS xizmat to‘lovi olinadi.",
              de: "In Taschkent wird der Schengen-Antrag über TLScontact eingereicht. Die Terminbuchung ist kostenlos; zusätzlich zur Visumgebühr fällt eine TLS-Servicegebühr an.",
            },
            {
              uz: "Arizani rejalashtirilgan safardan olti oy oldin topshirish mumkin. Bayram va yozgi mavsumda terminlar band bo‘lishi sabab erta tayyorlanish tavsiya etiladi.",
              de: "Der Antrag kann bis zu sechs Monate vor der geplanten Reise gestellt werden. Wegen hoher Nachfrage vor Ferien und Feiertagen empfiehlt sich frühzeitige Vorbereitung.",
            },
          ],
          items: [
            {
              uz: "TLS yoki elchixona nomidan termin sotuvchi vositachilarga ishonmang",
              de: "Keine Termine von angeblichen Vermittlern kaufen",
            },
            {
              uz: "Pasport ma’lumotlarini bron tizimiga xatosiz kiriting",
              de: "Passdaten im Buchungssystem fehlerfrei eingeben",
            },
            {
              uz: "Tasdiq xatini va referens raqamini saqlang",
              de: "Bestätigung und Referenznummer aufbewahren",
            },
          ],
        },
        documents: {
          title: {
            uz: "Asosiy hujjatlar",
            de: "Grundlegende Unterlagen",
          },
          items: [
            {
              uz: "To‘ldirilgan va imzolangan Schengen viza arizasi",
              de: "Vollständig ausgefüllter und unterschriebener Schengen-Antrag",
            },
            {
              uz: "Amaldagi pasport va nusxa",
              de: "Gültiger Reisepass und Kopie",
            },
            {
              uz: "Ikki dona biometrik foto",
              de: "Zwei biometrische Passfotos",
            },
            {
              uz: "Kamida 30 000 yevro qoplamali Schengen sug‘urtasi",
              de: "Schengen-Reisekrankenversicherung mit mindestens 30.000 Euro Deckung",
            },
            {
              uz: "Taklifnoma va chaqiruvchining hujjat nusxalari",
              de: "Einladung und Ausweiskopien der einladenden Person",
            },
            {
              uz: "Verpflichtungserklärung yoki o‘z mablag‘i dalili",
              de: "Verpflichtungserklärung oder eigener Finanzierungsnachweis",
            },
            {
              uz: "Ish, ta’lim, oila yoki mulk bilan bog‘liq qaytish dalillari",
              de: "Nachweise zu Arbeit, Studium, Familie oder Vermögen als Rückkehrbindung",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Sug‘urta va moliyalashtirish",
            de: "Versicherung und Finanzierung",
          },
          paragraphs: [
            {
              uz: "Toshkent checklisti sug‘urta butun Schengen hududida, rejalashtirilgan kunlar va qo‘shimcha 15 kunlik davr uchun amal qilishini ko‘rsatadi.",
              de: "Die Taschkenter Checkliste verlangt Versicherungsschutz im gesamten Schengen-Raum für die geplanten Aufenthaltstage zuzüglich einer weiteren Frist von 15 Tagen.",
            },
            {
              uz: "Moliyalashtirish Verpflichtungserklärung orqali, mehmonning o‘z mablag‘i orqali yoki ayrim hollarda ikkalasining kombinatsiyasi bilan ko‘rsatilishi mumkin.",
              de: "Die Finanzierung kann durch Verpflichtungserklärung, eigene Mittel des Gastes oder gegebenenfalls eine Kombination nachgewiesen werden.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Rad etish xavfini oshiradigan holatlar",
            de: "Typische Ablehnungsrisiken",
          },
          items: [
            {
              uz: "Safar maqsadi yoki munosabat tushunarsiz bo‘lishi",
              de: "Unklarer Reisezweck oder unklare Beziehung",
            },
            {
              uz: "Bank hisobidagi g‘ayrioddiy katta va izohsiz pul tushumlari",
              de: "Ungewöhnlich hohe, nicht erklärte Kontoeinzahlungen",
            },
            {
              uz: "Ish yoki o‘qish dalillari bilan safar sanalari mos kelmasligi",
              de: "Widersprüche zwischen Reisezeitraum und Arbeits- oder Studiennachweisen",
            },
            {
              uz: "O‘zbekistonga qaytish dalillarining zaifligi",
              de: "Unzureichende Rückkehrbindung",
            },
            {
              uz: "Soxta bron, sug‘urta yoki hujjat",
              de: "Gefälschte Buchung, Versicherung oder Unterlage",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Safar rejasini aniqlang",
            de: "Reise planen",
          },
          description: {
            uz: "Maqsad, sana, yashash joyi va moliyalashtirishni aniq belgilang.",
            de: "Legen Sie Zweck, Zeitraum, Unterkunft und Finanzierung fest.",
          },
        },
        {
          title: {
            uz: "Taklif hujjatlarini oling",
            de: "Einladungsunterlagen erhalten",
          },
          description: {
            uz: "Taklifnoma va zarur bo‘lsa Verpflichtungserklärungni tayyorlang.",
            de: "Bereiten Sie Einladung und gegebenenfalls Verpflichtungserklärung vor.",
          },
        },
        {
          title: {
            uz: "TLS terminini bron qiling",
            de: "TLS-Termin buchen",
          },
          description: {
            uz: "Faqat rasmiy tizimdan foydalaning.",
            de: "Nutzen Sie ausschließlich das offizielle System.",
          },
        },
        {
          title: {
            uz: "Hujjatlarni topshiring",
            de: "Unterlagen einreichen",
          },
          description: {
            uz: "Biometrika va to‘liq hujjatlar bilan terminga boring.",
            de: "Erscheinen Sie mit Biometrie und vollständigen Unterlagen.",
          },
        },
        {
          title: {
            uz: "Qarorni kuting",
            de: "Entscheidung abwarten",
          },
          description: {
            uz: "Qo‘shimcha hujjat so‘ralsa, belgilangan muddatda yuboring.",
            de: "Reichen Sie angeforderte Unterlagen fristgerecht nach.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Mehmon vizasi bilan ishlash mumkinmi?",
            de: "Darf ich mit dem Besuchsvisum arbeiten?",
          },
          answer: {
            uz: "Yo‘q. Mehmon vizasi qisqa xususiy tashrif uchun mo‘ljallangan.",
            de: "Nein. Das Besuchsvisum dient einem kurzfristigen privaten Aufenthalt.",
          },
        },
        {
          question: {
            uz: "Chipta oldindan sotib olinishi shartmi?",
            de: "Muss das Flugticket vorher gekauft werden?",
          },
          answer: {
            uz: "Rasmiy checklistga amal qiling. Qaytarilmaydigan chipta xaridini viza qaroridan oldin qilish moliyaviy xavf tug‘diradi.",
            de: "Beachten Sie die offizielle Checkliste. Der Kauf eines nicht erstattbaren Tickets vor Visumentscheidung birgt ein finanzielles Risiko.",
          },
        },
        {
          question: {
            uz: "Viza qancha vaqtda chiqadi?",
            de: "Wie lange dauert die Bearbeitung?",
          },
          answer: {
            uz: "Muddat individual holat, mavsum va qo‘shimcha tekshiruvlarga bog‘liq. Safarni faqat taxminiy tezlikka asoslab rejalashtirmang.",
            de: "Die Dauer hängt von Einzelfall, Saison und zusätzlichen Prüfungen ab. Planen Sie nicht allein anhand einer geschätzten Bearbeitungszeit.",
          },
        },
      ],
      sources: [
        {
          title: "Besuchsvisum",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/2433904-2433904",
          language: "de",
        },
        {
          title: "Terminvereinbarung zur Beantragung eines Visums",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/1444004-1444004",
          language: "de",
        },
        {
          title: "Schengenvisum bis max. 90 Tage",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/1604024-1604024",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "invitation-letter",
        "declaration-of-commitment",
        "visitor-visa-documents",
        "visa-appointment",
      ],
    },
  {
      id: "visitor-visa-documents",
      slug: "visitor-visa-documents",
      categorySlug: "invitation",
      title: {
        uz: "Mehmon vizasi uchun hujjatlar ro‘yxati",
        de: "Unterlagen für ein Besuchsvisum",
      },
      excerpt: {
        uz: "Toshkentda Germaniya mehmon vizasi uchun to‘liq checklist: pasport, fotosurat, sug‘urta, taklifnoma, moliyalashtirish, ish yoki o‘qish dalili, voyaga yetmaganlar hujjatlari va hujjatlarni tartiblash.",
        de: "Vollständige Checkliste für ein Besuchsvisum in Taschkent: Pass, Fotos, Versicherung, Einladung, Finanzierung, Arbeits- oder Studiennachweise, Unterlagen für Minderjährige und Dokumentenordnung.",
      },
      intro: {
        uz: "Mehmon vizasi arizasida hujjatlar bir-birini tasdiqlashi kerak: taklifnoma safar maqsadini, bank hujjatlari moliyalashtirishni, ish yoki o‘qish hujjatlari esa O‘zbekistonga qaytish aloqalarini ko‘rsatadi. Faqat ko‘p hujjat emas, balki izchil va tekshiriladigan hujjatlar muhim.",
        de: "Die Unterlagen müssen ein stimmiges Gesamtbild ergeben: Einladung erklärt den Reisezweck, Finanznachweise sichern die Kosten und Arbeits- oder Studienunterlagen belegen Rückkehrbindungen. Entscheidend sind nicht möglichst viele, sondern konsistente und überprüfbare Dokumente.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: {
        uz: "11 daqiqa",
        de: "11 Minuten",
      },
      facts: [
        {
          label: { uz: "Nusxa formati", de: "Kopienformat" },
          value: {
            uz: "Toshkentda barcha nusxalar DIN A4",
            de: "In Taschkent alle Kopien im Format DIN A4",
          },
        },
        {
          label: { uz: "Pasport", de: "Reisepass" },
          value: {
            uz: "Kamida 2 bo‘sh sahifa va safardan keyin kamida 3 oy amal",
            de: "Mindestens 2 freie Seiten und 3 Monate über Reiseende gültig",
          },
        },
        {
          label: { uz: "Sug‘urta qoplami", de: "Versicherungssumme" },
          value: {
            uz: "Kamida 30 000 yevro",
            de: "Mindestens 30.000 Euro",
          },
        },
        {
          label: { uz: "Bank hujjati", de: "Kontoauszug" },
          value: {
            uz: "Odatda oxirgi 3 oylik harakatlar",
            de: "Regelmäßig Kontobewegungen der letzten 3 Monate",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Asosiy ariza hujjatlari",
            de: "Grundlegende Antragsunterlagen",
          },
          items: [
            {
              uz: "To‘liq to‘ldirilgan va imzolangan Schengen arizasi",
              de: "Vollständig ausgefüllter und unterschriebener Schengen-Antrag",
            },
            {
              uz: "Kerakli huquqiy va sug‘urta tushuntirishlari",
              de: "Erforderliche Belehrungen und Versicherungserklärung",
            },
            {
              uz: "Pasport originali va shaxsiy ma’lumot sahifasi nusxasi",
              de: "Reisepass im Original und Kopie der Personaldatenseite",
            },
            {
              uz: "Ikki dona yangi biometrik foto",
              de: "Zwei aktuelle biometrische Passfotos",
            },
            {
              uz: "Oldingi Schengen vizalari nusxalari — mavjud bo‘lsa",
              de: "Kopien früherer Schengen-Visa, soweit vorhanden",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Safar maqsadi hujjatlari",
            de: "Nachweise zum Reisezweck",
          },
          items: [
            {
              uz: "Nemis yoki ingliz tilidagi taklifnoma",
              de: "Einladungsschreiben in deutscher oder englischer Sprache",
            },
            {
              uz: "Chaqiruvchining pasport yoki ID nusxasi",
              de: "Pass- oder Ausweiskopie der einladenden Person",
            },
            {
              uz: "Chaqiruvchi Germaniya fuqarosi bo‘lmasa Aufenthaltstitel nusxasi",
              de: "Bei nichtdeutscher Person Kopie des Aufenthaltstitels",
            },
            {
              uz: "Zarur bo‘lsa qarindoshlik dalili",
              de: "Gegebenenfalls Verwandtschaftsnachweis",
            },
            {
              uz: "Yashash manzili va safar tafsilotlari",
              de: "Unterkunft und konkrete Reisedaten",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Moliyalashtirish dalillari",
            de: "Finanzierungsnachweise",
          },
          items: [
            {
              uz: "Original Verpflichtungserklärung va nusxa",
              de: "Verpflichtungserklärung im Original und als Kopie",
            },
            {
              uz: "Yoki o‘z mablag‘i: oxirgi 3 oylik bank hisoboti",
              de: "Oder eigene Mittel: Kontoauszug mit Bewegungen der letzten 3 Monate",
            },
            {
              uz: "Zarur bo‘lsa pensiya, ijara yoki boshqa daromad dalillari",
              de: "Gegebenenfalls Rente, Mieteinnahmen oder weitere Einkommensnachweise",
            },
            {
              uz: "Er-xotin mablag‘idan foydalanilsa nikoh hujjati",
              de: "Bei Finanzierung durch Ehegatten Heiratsurkunde",
            },
            {
              uz: "Voyaga yetmagan uchun ota-ona mablag‘i va tug‘ilganlik hujjati",
              de: "Bei Minderjährigen Elternkonto und Geburtsurkunde",
            },
          ],
        },
        documents: {
          title: {
            uz: "O‘zbekistonga qaytish aloqalari",
            de: "Nachweise der Rückkehrbindung",
          },
          items: [
            {
              uz: "Xodimlar uchun lavozim, ish muddati, maosh va ta’tilni ko‘rsatgan ish ma’lumotnomasi",
              de: "Bei Beschäftigten Arbeitgeberbescheinigung mit Position, Dauer, Gehalt und Urlaub",
            },
            {
              uz: "Tadbirkorlar uchun firma ro‘yxati va soliq hujjatlari",
              de: "Bei Selbstständigen Firmenregistrierung und Steuerunterlagen",
            },
            {
              uz: "Talabalar uchun o‘qish ma’lumotnomasi va zarur bo‘lsa darsdan ozod qilish",
              de: "Bei Studierenden Studienbescheinigung und gegebenenfalls Unterrichtsbefreiung",
            },
            {
              uz: "Maktab o‘quvchilari uchun maktab ma’lumotnomasi",
              de: "Bei Schülern Schulbescheinigung",
            },
            {
              uz: "Pensionerlar uchun pensiya hisoboti",
              de: "Bei Rentnern Rentenkontoauszug",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Voyaga yetmaganlar uchun qo‘shimcha hujjatlar",
            de: "Zusätzliche Unterlagen für Minderjährige",
          },
          items: [
            {
              uz: "Tug‘ilganlik guvohnomasi",
              de: "Geburtsurkunde",
            },
            {
              uz: "Ota-ona pasport yoki ID nusxalari",
              de: "Pass- oder Ausweiskopien der Eltern",
            },
            {
              uz: "Bir ota-ona yoki uchinchi shaxs bilan safarda notarial rozilik va tarjima",
              de: "Bei Reise mit nur einem Elternteil oder Dritten notarielle Zustimmung mit Übersetzung",
            },
            {
              uz: "Hamroh shaxs va butun viza muddati uchun aniq ruxsat",
              de: "Klare Zustimmung zur Begleitperson und zum gesamten beantragten Zeitraum",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Hujjatlarni topshirishda xatolar",
            de: "Fehler bei der Einreichung",
          },
          items: [
            {
              uz: "Sanalar bir-biriga mos kelmasligi",
              de: "Widersprüchliche Reisedaten",
            },
            {
              uz: "Bank hisobida harakatsiz yoki izohsiz yangi katta summa",
              de: "Unbewegtes Konto oder unerklärte hohe Neueinzahlung",
            },
            {
              uz: "Nusxalarni DIN A4 formatida tayyorlamaslik",
              de: "Kopien nicht im DIN-A4-Format einreichen",
            },
            {
              uz: "Tarjima yoki notarial rozilikni unutish",
              de: "Übersetzung oder notarielle Zustimmung vergessen",
            },
            {
              uz: "Rasmiy checklist yangilanganini tekshirmaslik",
              de: "Aktualität der offiziellen Checkliste nicht prüfen",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Checklistni yuklab oling",
            de: "Aktuelle Checkliste öffnen",
          },
          description: {
            uz: "Toshkent elchixonasi va TLS sahifasidagi amaldagi talabni tekshiring.",
            de: "Prüfen Sie die aktuelle Liste von Botschaft und TLS.",
          },
        },
        {
          title: {
            uz: "Hujjatlarni guruhlarga ajrating",
            de: "Unterlagen gruppieren",
          },
          description: {
            uz: "Ariza, safar maqsadi, moliya, qaytish va voyaga yetmaganlar bo‘limiga ajrating.",
            de: "Ordnen Sie Antrag, Reisezweck, Finanzierung, Rückkehr und Minderjährigenunterlagen.",
          },
        },
        {
          title: {
            uz: "Sanalarni solishtiring",
            de: "Daten abgleichen",
          },
          description: {
            uz: "Taklifnoma, sug‘urta, ta’til va arizadagi sanalar bir xil bo‘lsin.",
            de: "Reisezeitraum in Einladung, Versicherung, Urlaub und Antrag muss übereinstimmen.",
          },
        },
        {
          title: {
            uz: "Original va nusxalarni tayyorlang",
            de: "Originale und Kopien vorbereiten",
          },
          description: {
            uz: "DIN A4 va rasmiy tartibga muvofiq joylashtiring.",
            de: "Bereiten Sie alles im DIN-A4-Format und in sinnvoller Reihenfolge vor.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Barcha hujjatlarni tarjima qilish kerakmi?",
            de: "Müssen alle Unterlagen übersetzt werden?",
          },
          answer: {
            uz: "Bu hujjat va vakolatxona talabiga bog‘liq. Checklistda tarjima so‘ralgan hujjatlarni belgilangan tilga tarjima qiling.",
            de: "Das hängt von Dokument und Vorgabe ab. Übersetzen Sie Unterlagen, für die die Checkliste ausdrücklich eine Übersetzung verlangt.",
          },
        },
        {
          question: {
            uz: "Qo‘shimcha hujjat so‘ralishi mumkinmi?",
            de: "Können weitere Unterlagen verlangt werden?",
          },
          answer: {
            uz: "Ha. Elchixona individual tekshiruv uchun qo‘shimcha hujjat so‘rashi mumkin.",
            de: "Ja. Die Auslandsvertretung kann im Einzelfall weitere Nachweise anfordern.",
          },
        },
        {
          question: {
            uz: "To‘liq checklist viza kafolatimi?",
            de: "Garantiert eine vollständige Checkliste das Visum?",
          },
          answer: {
            uz: "Yo‘q. To‘liq hujjatlar arizani ko‘rib chiqish uchun zarur, lekin ijobiy qarorni kafolatlamaydi.",
            de: "Nein. Vollständige Unterlagen sind für die Prüfung erforderlich, garantieren aber keine positive Entscheidung.",
          },
        },
      ],
      sources: [
        {
          title: "Besuchsvisum",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/2433904-2433904",
          language: "de",
        },
        {
          title: "Schengen visa application process",
          organization: "European External Action Service",
          url: "https://www.eeas.europa.eu/delegations/china/schengen-visa-application-process-essential-guide_en",
          language: "en",
        },
      ],
      relatedArticleSlugs: [
        "visitor-visa",
        "invitation-letter",
        "declaration-of-commitment",
      ],
    },
] satisfies ReadonlyArray<LocalizedGuideArticle>;
