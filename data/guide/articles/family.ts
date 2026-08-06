import type { LocalizedGuideArticle } from "../../../types/guide";

export const familyArticles = [
  {
      id: "spouse-reunification",
      slug: "spouse-reunification",
      categorySlug: "family",
      title: {
        uz: "Turmush o‘rtog‘i bilan oila birlashtirish",
        de: "Ehegattennachzug nach Deutschland",
      },
      excerpt: {
        uz: "Germaniyada yashayotgan turmush o‘rtog‘i yoniga ko‘chib kelish: mezbon shaxsning maqomi, A1 talabi va istisnolar, daromad, uy-joy, hujjatlar, milliy viza, ishlash huquqi va amaliy jarayon bo‘yicha batafsil qo‘llanma.",
        de: "Ausführlicher Leitfaden zum Ehegattennachzug nach Deutschland: Aufenthaltsstatus der Bezugsperson, A1-Anforderung und Ausnahmen, Lebensunterhalt, Wohnraum, Unterlagen, nationales Visum, Erwerbstätigkeit und praktischer Ablauf.",
      },
      intro: {
        uz: "Turmush o‘rtog‘i bilan oila birlashtirish — nikohdagi juftlikning Germaniyada birga yashashi uchun beriladigan oilaviy yashash yo‘lidir. Talablar Germaniyada yashayotgan turmush o‘rtog‘ining Germaniya fuqarosi, EU/EEA fuqarosi, uchinchi davlat fuqarosi, malakali mutaxassis, Blue Card egasi yoki boshqa maqomga ega ekaniga qarab farq qiladi. Shu sabab bitta umumiy hujjatlar ro‘yxati barcha oilalarga bir xil qo‘llanmaydi.",
        de: "Der Ehegattennachzug ist der familienbezogene Aufenthaltsweg, damit verheiratete Paare in Deutschland zusammenleben können. Die Voraussetzungen unterscheiden sich danach, ob die in Deutschland lebende Person deutsch, EU-/EWR-staatsangehörig, drittstaatsangehörig, Fachkraft, Inhaberin oder Inhaber einer Blauen Karte EU oder in einem anderen Aufenthaltsstatus ist. Deshalb gilt nicht für alle Familien dieselbe Unterlagenliste.",
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
          label: { uz: "Asosiy viza", de: "Grundlegendes Visum" },
          value: {
            uz: "O‘zbekiston fuqarolari odatda kirishdan oldin Ehegattennachzug uchun milliy viza oladi",
            de: "Staatsangehörige Usbekistans beantragen grundsätzlich vor der Einreise ein nationales Visum zum Ehegattennachzug",
          },
        },
        {
          label: { uz: "Yosh", de: "Alter" },
          value: {
            uz: "Uchinchi davlat fuqarosi yoniga qo‘shilishda odatda ikkala turmush o‘rtog‘i ham 18 yoshga to‘lgan bo‘lishi kerak",
            de: "Beim Nachzug zu Drittstaatsangehörigen müssen grundsätzlich beide Ehegatten 18 Jahre alt sein",
          },
        },
        {
          label: { uz: "Nemis tili", de: "Deutschkenntnisse" },
          value: {
            uz: "Ko‘p holatda kirishdan oldin oddiy nemis tili — A1; qonunda muhim istisnolar mavjud",
            de: "In vielen Fällen einfache Deutschkenntnisse vor der Einreise — A1; das Gesetz enthält wichtige Ausnahmen",
          },
        },
        {
          label: { uz: "Daromad va uy-joy", de: "Lebensunterhalt und Wohnraum" },
          value: {
            uz: "Mezbon shaxsning maqomiga qarab talab qilinadi, yengillashtiriladi yoki ayrim holatlarda qo‘llanmaydi",
            de: "Je nach Status der Bezugsperson erforderlich, erleichtert oder in bestimmten Fällen nicht maßgeblich",
          },
        },
        {
          label: { uz: "Ishlash huquqi", de: "Erwerbstätigkeit" },
          value: {
            uz: "Oila birlashtirish bilan kelgan turmush o‘rtog‘i Germaniyada ishlashi mumkin",
            de: "Nachgezogene Ehegatten dürfen in Deutschland erwerbstätig sein",
          },
        },
        {
          label: { uz: "Jarayon", de: "Verfahren" },
          value: {
            uz: "Vakolatxona arizani qabul qiladi; ko‘p holatda Germaniyadagi Ausländerbehörde ishtirok etadi",
            de: "Die Auslandsvertretung nimmt den Antrag an; häufig wird die Ausländerbehörde in Deutschland beteiligt",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Oila birlashtirishning qaysi turi sizga tegishli?",
            de: "Welche Form des Ehegattennachzugs gilt für Sie?",
          },
          paragraphs: [
            {
              uz: "Birinchi qadam — Germaniyada yashayotgan turmush o‘rtog‘ining fuqaroligi va Aufenthaltstitelini aniq tekshirish. Nemis fuqarosi yoniga qo‘shilish §28 AufenthG, uchinchi davlat fuqarosi yoniga qo‘shilish esa odatda §§29–30 AufenthG asosida baholanadi. EU yoki EEA fuqarolari uchun Freizügigkeitsrecht bo‘yicha boshqa qoidalar amal qiladi.",
              de: "Der erste Schritt ist die genaue Prüfung von Staatsangehörigkeit und Aufenthaltstitel der in Deutschland lebenden Person. Der Nachzug zu Deutschen richtet sich nach § 28 AufenthG, der Nachzug zu Drittstaatsangehörigen grundsätzlich nach §§ 29–30 AufenthG. Für EU- oder EWR-Bürgerinnen und -Bürger gelten andere Regeln des Freizügigkeitsrechts.",
            },
            {
              uz: "Ushbu maqola umumiy turmush o‘rtog‘i vizasi jarayonini tushuntiradi. Nemis fuqarosi, EU fuqarosi, Blue Card egasi, malakali mutaxassis yoki himoya maqomiga ega shaxs bilan oila birlashtirishda ayrim talablar alohida farq qiladi va keyingi maxsus maqolalarda batafsil yoritiladi.",
              de: "Dieser Artikel erklärt den allgemeinen Ablauf des Ehegattennachzugs. Beim Nachzug zu Deutschen, EU-Bürgern, Inhabern einer Blauen Karte EU, Fachkräften oder Personen mit Schutzstatus gelten teilweise besondere Regeln, die in weiteren Spezialartikeln getrennt dargestellt werden.",
            },
            {
              uz: "Viza faqat haqiqiy oilaviy hayotni Germaniyada birga davom ettirish uchun beriladi. Soxta nikoh yoki faqat yashash huquqi olish maqsadidagi nikohda oila birlashtirish rad etiladi.",
              de: "Das Visum wird nur zur tatsächlichen Führung der ehelichen Lebensgemeinschaft in Deutschland erteilt. Bei einer Scheinehe oder einer ausschließlich aufenthaltsrechtlich motivierten Verbindung wird der Familiennachzug abgelehnt.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Asosiy huquqiy shartlar",
            de: "Zentrale rechtliche Voraussetzungen",
          },
          items: [
            {
              uz: "Nikoh Germaniya huquqi nuqtai nazaridan haqiqiy va hujjatlar bilan isbotlanadigan bo‘lishi kerak.",
              de: "Die Ehe muss aus deutscher rechtlicher Sicht wirksam und durch geeignete Urkunden nachweisbar sein.",
            },
            {
              uz: "Er-xotin Germaniyada haqiqiy oilaviy hayot olib borishni rejalashtirishi kerak.",
              de: "Die Ehegatten müssen beabsichtigen, in Deutschland eine tatsächliche familiäre Lebensgemeinschaft zu führen.",
            },
            {
              uz: "Uchinchi davlat fuqarosi yoniga qo‘shilishda odatda ikkala turmush o‘rtog‘i ham 18 yoshga to‘lgan bo‘lishi kerak.",
              de: "Beim Nachzug zu Drittstaatsangehörigen müssen grundsätzlich beide Ehegatten das 18. Lebensjahr vollendet haben.",
            },
            {
              uz: "Germaniyada yashayotgan shaxs oila birlashtirishga imkon beradigan amaldagi yashash maqomiga ega bo‘lishi kerak.",
              de: "Die in Deutschland lebende Person muss einen Aufenthaltsstatus besitzen, der Familiennachzug ermöglicht.",
            },
            {
              uz: "Umumiy qoida bo‘yicha yetarli uy-joy va davlat yordamisiz yashash xarajatlarini qoplash tekshirilishi mumkin; istisnolar mezbon shaxs maqomiga bog‘liq.",
              de: "Grundsätzlich können ausreichender Wohnraum und die Sicherung des Lebensunterhalts ohne öffentliche Mittel geprüft werden; Ausnahmen hängen vom Status der Bezugsperson ab.",
            },
            {
              uz: "Pasport, shaxsni aniqlash va viza jarayonining umumiy talablariga rioya qilinishi kerak.",
              de: "Passpflicht, Identitätsklärung und allgemeine Voraussetzungen des Visumverfahrens müssen erfüllt sein.",
            },
          ],
        },
        requirements: {
          title: {
            uz: "A1 nemis tili: qoida va muhim istisnolar",
            de: "Deutsch A1: Grundregel und wichtige Ausnahmen",
          },
          paragraphs: [
            {
              uz: "Ko‘p holatda Germaniyaga ko‘chib kelayotgan turmush o‘rtog‘i viza topshirishda oddiy nemis tilida muloqot qila olishini ko‘rsatadi. Amaliyotda bu odatda CEFR A1 sertifikati bilan isbotlanadi. Sertifikatning o‘zi yetarli bo‘lmay, vakolatxona suhbat davomida oddiy muloqotni ham baholashi mumkin.",
              de: "In vielen Fällen muss der nachziehende Ehegatte bei der Visumbeantragung nachweisen, dass er sich auf einfache Art auf Deutsch verständigen kann. Praktisch erfolgt dies meist durch ein Zertifikat auf Niveau A1. Neben dem Zertifikat kann die Auslandsvertretung einfache Kommunikation im Gespräch berücksichtigen.",
            },
            {
              uz: "A1 barcha holatlarda majburiy emas. §30 AufenthG va maxsus qoidalarda, jumladan ayrim malakali mutaxassislar, Blue Card egasi, EU erkin harakat huquqi, sog‘liq sababli til o‘rganish imkonsizligi yoki asossiz qiyinchilik kabi holatlar uchun istisnolar mavjud. Istisno avtomatik deb qabul qilinmaydi; u tegishli hujjatlar bilan isbotlanadi.",
              de: "A1 ist nicht in jedem Fall verpflichtend. § 30 AufenthG und besondere Vorschriften enthalten Ausnahmen, unter anderem bei bestimmten Fachkräften, Inhabern einer Blauen Karte EU, unionsrechtlicher Freizügigkeit, krankheitsbedingter Unmöglichkeit des Spracherwerbs oder unzumutbarer Härte. Eine Ausnahme wird nicht automatisch angenommen, sondern muss belegt werden.",
            },
            {
              uz: "Vatandoshlar.de amaliy tavsiyasi: istisnoga tayanishdan oldin mas’ul vakolatxona va zarur bo‘lsa Ausländerbehörde bilan yozma ravishda aniqlashtiring. A1 talab qilinadigan holatda faqat yodlangan iboralar emas, oddiy kundalik savol-javobni ham mashq qiling.",
              de: "Praktische Empfehlung von Vatandoshlar.de: Klären Sie eine mögliche Ausnahme vorab schriftlich mit der zuständigen Auslandsvertretung und gegebenenfalls der Ausländerbehörde. Wenn A1 erforderlich ist, sollten nicht nur auswendig gelernte Sätze, sondern einfache Alltagssituationen geübt werden.",
            },
          ],
          items: [
            {
              uz: "Nemis fuqarosi yoniga qo‘shilishda ham umumiy qoida sifatida A1 talab qilinishi mumkin; §30dagi istisnolar tegishli tarzda qo‘llanadi.",
              de: "Auch beim Nachzug zu Deutschen kann grundsätzlich A1 verlangt werden; die Ausnahmen des § 30 gelten entsprechend.",
            },
            {
              uz: "EU/EEA fuqarosining erkin harakat huquqi asosidagi turmush o‘rtog‘i uchun oldindan A1 talabi odatda qo‘llanmaydi.",
              de: "Beim Nachzug zu freizügigkeitsberechtigten EU-/EWR-Bürgern gilt grundsätzlich keine vorherige A1-Anforderung.",
            },
            {
              uz: "Ayrim malakali mutaxassislar va Blue Card egalarining turmush o‘rtog‘iga qonunda yengilliklar berilgan.",
              de: "Für Ehegatten bestimmter Fachkräfte und von Inhabern einer Blauen Karte EU bestehen gesetzliche Erleichterungen.",
            },
            {
              uz: "Jismoniy, ruhiy yoki psixologik kasallik sababli til o‘rganish imkonsiz bo‘lsa, tibbiy hujjat talab qilinadi.",
              de: "Ist der Spracherwerb wegen körperlicher, geistiger oder seelischer Krankheit unmöglich, sind belastbare ärztliche Nachweise erforderlich.",
            },
            {
              uz: "Tilni o‘rganish bo‘yicha jiddiy va isbotlangan urinishlarga qaramay imkonsizlik yoki asossiz qiyinchilik bo‘lsa, individual baholash talab qilinadi.",
              de: "Bei nachgewiesenen ernsthaften Lernbemühungen und dennoch bestehender Unmöglichkeit oder Unzumutbarkeit ist eine individuelle Prüfung erforderlich.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan hujjatlar",
            de: "Üblicherweise erforderliche Unterlagen",
          },
          items: [
            {
              uz: "Amaldagi pasport, milliy viza arizasi va biometrik fotosuratlar",
              de: "Gültiger Reisepass, Antrag auf ein nationales Visum und biometrische Passfotos",
            },
            {
              uz: "Nikoh guvohnomasi va talab qilinsa apostil, legalizatsiya yoki rasmiy tarjima",
              de: "Heiratsurkunde und erforderlichenfalls Apostille, Legalisation oder beglaubigte Übersetzung",
            },
            {
              uz: "Germaniyada yashayotgan turmush o‘rtog‘ining pasporti, Aufenthaltstiteli va Anmeldung nusxalari",
              de: "Kopien von Pass, Aufenthaltstitel und Meldebescheinigung der in Deutschland lebenden Person",
            },
            {
              uz: "Talab qilinadigan holatda A1 til sertifikati yoki istisnoni isbotlovchi hujjatlar",
              de: "Wenn erforderlich A1-Sprachnachweis oder Unterlagen zum Nachweis einer Ausnahme",
            },
            {
              uz: "Daromad dalillari: ish shartnomasi, so‘nggi maosh varaqalari yoki boshqa moliyaviy hujjatlar — maqomga qarab",
              de: "Einkommensnachweise wie Arbeitsvertrag, aktuelle Gehaltsabrechnungen oder weitere Finanzunterlagen — abhängig vom Status",
            },
            {
              uz: "Ijara shartnomasi va uy maydoni dalili — talab qilinadigan holatlarda",
              de: "Mietvertrag und Nachweis der Wohnfläche — soweit im konkreten Fall erforderlich",
            },
            {
              uz: "Tibbiy sug‘urta bo‘yicha dalil yoki Germaniyaga kelgach oilaviy sug‘urtaga qo‘shilish tasdig‘i",
              de: "Nachweis des Krankenversicherungsschutzes oder Bestätigung der möglichen Familienversicherung nach Einreise",
            },
            {
              uz: "Oldingi nikohlar bo‘lgan bo‘lsa ajrim, vafot yoki nikoh bekor bo‘lganini tasdiqlovchi hujjatlar",
              de: "Bei früheren Ehen Scheidungsurteil, Sterbeurkunde oder sonstige Nachweise über deren Beendigung",
            },
            {
              uz: "Mas’ul Germaniya vakolatxonasi yoki Ausländerbehörde so‘ragan qo‘shimcha hujjatlar",
              de: "Weitere Unterlagen nach Vorgabe der zuständigen deutschen Auslandsvertretung oder Ausländerbehörde",
            },
          ],
          paragraphs: [
            {
              uz: "Hujjatlar ro‘yxati nikoh qayerda tuzilgani, turmush o‘rtog‘ining maqomi va mas’ul vakolatxonaga qarab farq qiladi. Viza topshirishdan oldin aynan O‘zbekistondagi Germaniya vakolatxonasining amaldagi checklistini tekshiring.",
              de: "Die Unterlagenliste hängt vom Ort der Eheschließung, vom Status des Ehegatten und von der zuständigen Auslandsvertretung ab. Prüfen Sie vor der Antragstellung stets die aktuelle Checkliste der deutschen Auslandsvertretung in Usbekistan.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Daromad, uy-joy va ishlash huquqi",
            de: "Lebensunterhalt, Wohnraum und Erwerbstätigkeit",
          },
          paragraphs: [
            {
              uz: "Uchinchi davlat fuqarosi yoniga umumiy oila birlashtirishda yetarli uy-joy va yashash xarajatlarining ta’minlanganligi muhim talab bo‘lishi mumkin. Ausländerbehörde ijara, uy maydoni, maosh, soliqlar, sug‘urta va doimiy majburiyatlarni ko‘rib chiqadi.",
              de: "Beim allgemeinen Familiennachzug zu Drittstaatsangehörigen können ausreichender Wohnraum und gesicherter Lebensunterhalt zentrale Voraussetzungen sein. Die Ausländerbehörde prüft dabei unter anderem Miete, Wohnfläche, Einkommen, Abgaben, Versicherung und laufende Verpflichtungen.",
            },
            {
              uz: "Nemis fuqarosi yoniga oila birlashtirishda §28 bo‘yicha yashash huquqi odatda kuchliroq himoyalangan va daromad talabi uchinchi davlat fuqarosi yoniga qo‘shilish bilan bir xil qo‘llanmaydi. Biroq maxsus holatlar va Germaniyada oilaviy hayotni davom ettirish imkoniyati individual baholanadi.",
              de: "Beim Nachzug zu Deutschen ist der Anspruch nach § 28 stärker geschützt; die Lebensunterhaltssicherung wird nicht in gleicher Weise wie beim Nachzug zu Drittstaatsangehörigen angewandt. Besondere Umstände und die Zumutbarkeit der Familienführung in Deutschland werden jedoch individuell geprüft.",
            },
            {
              uz: "Ayrim malakali mutaxassislar yoniga turmush o‘rtog‘i va voyaga yetmagan farzandlar qo‘shilishida yetarli uy-joy dalili talab qilinmaydi. Bu yengillik barcha Aufenthaltstitellarga emas, qonunda belgilangan aniq guruhlarga tegishli.",
              de: "Beim Nachzug zu bestimmten Fachkräften müssen Ehegatten und minderjährige Kinder keinen ausreichenden Wohnraum nachweisen. Diese Erleichterung gilt nicht für jeden Aufenthaltstitel, sondern für gesetzlich bestimmte Gruppen.",
            },
          ],
          items: [
            {
              uz: "Oila birlashtirish bilan yashash ruxsati olgan turmush o‘rtog‘i Germaniyada ishlashi mumkin.",
              de: "Ehegatten mit einem Aufenthaltstitel zum Familiennachzug dürfen in Deutschland arbeiten.",
            },
            {
              uz: "Daromad talabi uchun barcha oilalarga tegishli yagona federal «minimal maosh» raqami yo‘q; hisob oila, ijara, shahar va maqomga qarab individual qilinadi.",
              de: "Für den Lebensunterhalt gibt es keinen einheitlichen bundesweiten Mindestlohn-Betrag für alle Familien; die Berechnung erfolgt individuell nach Familie, Miete, Wohnort und Status.",
            },
            {
              uz: "Uy maydonining yetarliligi Bundesland va mahalliy idora amaliyotiga bog‘liq; faqat internetdagi bitta kvadrat metr formulasiga ishonmang.",
              de: "Die Bewertung ausreichenden Wohnraums hängt von Bundesland und lokaler Verwaltungspraxis ab; verlassen Sie sich nicht allein auf eine pauschale Quadratmeterformel aus dem Internet.",
            },
            {
              uz: "Viza chiqquncha mavjud ishni, uy-joyni yoki qaytarib bo‘lmaydigan rejalarning barchasini bekor qilishga shoshilmang.",
              de: "Kündigen Sie Arbeit oder Wohnung und tätigen Sie nicht erstattbare Planungen nicht vorschnell vor Erteilung des Visums.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Muhim ogohlantirishlar va amaliy tavsiyalar",
            de: "Wichtige Hinweise und praktische Empfehlungen",
          },
          items: [
            {
              uz: "Turmush o‘rtog‘ining aniq Aufenthaltstitel raqamini bilmasdan talablarni umumlashtirmang. Blue Card, Niederlassungserlaubnis, nemis fuqaroligi va boshqa maqomlarda qoidalar farq qiladi.",
              de: "Verallgemeinern Sie die Voraussetzungen nicht, ohne den genauen Aufenthaltstitel der Bezugsperson zu kennen. Blaue Karte EU, Niederlassungserlaubnis, deutsche Staatsangehörigkeit und andere Status führen zu unterschiedlichen Regeln.",
            },
            {
              uz: "A1 sertifikati bo‘lsa ham nikohning haqiqiyligi, hujjatlar va boshqa talablar alohida tekshiriladi.",
              de: "Auch mit A1-Zertifikat werden Echtheit der Ehe, Urkunden und weitere Voraussetzungen gesondert geprüft.",
            },
            {
              uz: "A1 istisnosi borligini eshitib, hujjatsiz istisnoga tayanmang. Istisno sababini oldindan rasmiy dalillar bilan tayyorlang.",
              de: "Verlassen Sie sich nicht ohne Nachweise auf eine vermeintliche A1-Ausnahme. Bereiten Sie die Ausnahmegründe vorab mit offiziellen Belegen vor.",
            },
            {
              uz: "Termin yoki tez viza kafolati uchun katta pul so‘raydigan vositachilarga ishonmang. Rasmiy termin va viza qarorini faqat vakolatli idoralar boshqaradi.",
              de: "Misstrauen Sie Vermittlern, die gegen hohe Zahlungen Termine oder ein schnelles Visum garantieren. Über Termin und Visum entscheiden ausschließlich zuständige Behörden.",
            },
            {
              uz: "Nikoh guvohnomasi, ism-sharif yozilishi, tug‘ilgan sana va pasport ma’lumotlaridagi farqlar jarayonni kechiktirishi mumkin.",
              de: "Abweichungen bei Namen, Geburtsdaten oder Passangaben in Heirats- und Personenstandsurkunden können das Verfahren verzögern.",
            },
            {
              uz: "Subsidiar himoya maqomiga oila birlashtirish bo‘yicha 2025-yildan alohida vaqtinchalik cheklovlar mavjud; bunday holatda maxsus rasmiy ma’lumotni tekshirish kerak.",
              de: "Für den Familiennachzug zu subsidiär Schutzberechtigten bestehen seit 2025 besondere vorübergehende Einschränkungen; in solchen Fällen sind die speziellen offiziellen Hinweise zu prüfen.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Turmush o‘rtog‘ining Germaniyadagi maqomini aniqlang",
            de: "Status der Bezugsperson in Deutschland klären",
          },
          description: {
            uz: "Fuqarolik, Aufenthaltstitelning aniq paragrafi, amal qilish muddati va ish holatini tekshiring. Talablar aynan shu ma’lumotdan boshlanadi.",
            de: "Prüfen Sie Staatsangehörigkeit, genaue Rechtsgrundlage und Gültigkeit des Aufenthaltstitels sowie die Beschäftigungssituation. Davon hängen die Anforderungen ab.",
          },
        },
        {
          title: {
            uz: "Nikoh va shaxsiy hujjatlarni tekshiring",
            de: "Ehe- und Personenstandsurkunden prüfen",
          },
          description: {
            uz: "Nikoh guvohnomasi, pasportlar, oldingi nikohlar va ism-sharif ma’lumotlari bir-biriga mos bo‘lsin. Apostil va tarjima talabini oldindan aniqlang.",
            de: "Achten Sie darauf, dass Heiratsurkunde, Pässe, frühere Ehen und Namensangaben übereinstimmen. Klären Sie Apostille und Übersetzung frühzeitig.",
          },
        },
        {
          title: {
            uz: "A1 talabi yoki istisnoni aniqlang",
            de: "A1-Pflicht oder Ausnahme klären",
          },
          description: {
            uz: "Turmush o‘rtog‘ining maqomiga qarab A1 kerakligini tekshiring. Istisno mavjud bo‘lsa, uni tasdiqlovchi barcha dalillarni tayyorlang.",
            de: "Prüfen Sie anhand des Status der Bezugsperson, ob A1 erforderlich ist. Bereiten Sie bei einer Ausnahme sämtliche Nachweise vor.",
          },
        },
        {
          title: {
            uz: "Daromad va uy-joy hujjatlarini tayyorlang",
            de: "Unterlagen zu Einkommen und Wohnraum vorbereiten",
          },
          description: {
            uz: "Ish shartnomasi, maosh varaqalari, ijara va uy maydonini tayyorlang. Agar sizga yengillik tegishli bo‘lsa, maqom dalilini ham qo‘shing.",
            de: "Bereiten Sie Arbeitsvertrag, Gehaltsabrechnungen, Mietvertrag und Wohnfläche vor. Falls eine Erleichterung gilt, legen Sie den entsprechenden Statusnachweis bei.",
          },
        },
        {
          title: {
            uz: "Milliy viza arizasini yuboring",
            de: "Antrag auf nationales Visum stellen",
          },
          description: {
            uz: "Mavjud bo‘lsa Konsullik xizmatlari portali orqali onlayn ariza bering yoki mas’ul Germaniya vakolatxonasi ko‘rsatmasiga amal qiling.",
            de: "Stellen Sie den Antrag, sofern verfügbar, über das Auslandsportal oder folgen Sie dem Verfahren der zuständigen deutschen Auslandsvertretung.",
          },
        },
        {
          title: {
            uz: "Shaxsiy terminga boring",
            de: "Persönlichen Termin wahrnehmen",
          },
          description: {
            uz: "Asl hujjatlar, biometrika, to‘lov va suhbat uchun terminga boring. Nikoh va Germaniyada birga yashash rejangiz haqida oddiy savollarga tayyor bo‘ling.",
            de: "Erscheinen Sie mit Originalunterlagen zu Biometrie, Gebühren und Gespräch. Bereiten Sie sich auf einfache Fragen zur Ehe und zum gemeinsamen Leben in Deutschland vor.",
          },
        },
        {
          title: {
            uz: "Ausländerbehörde tekshiruvini kuting",
            de: "Prüfung durch die Ausländerbehörde abwarten",
          },
          description: {
            uz: "Ko‘p holatda Germaniyadagi idora qo‘shimcha hujjat so‘raydi. Turmush o‘rtog‘i so‘rov xatlariga o‘z vaqtida javob berishi kerak.",
            de: "Häufig fordert die Ausländerbehörde in Deutschland weitere Unterlagen an. Die Bezugsperson sollte auf Schreiben fristgerecht reagieren.",
          },
        },
        {
          title: {
            uz: "Kelgach Anmeldung va Aufenthaltstitelni rasmiylashtiring",
            de: "Nach Einreise Anmeldung und Aufenthaltstitel erledigen",
          },
          description: {
            uz: "Manzil ro‘yxati, tibbiy sug‘urta va Ausländerbehörde orqali oilaviy yashash ruxsatini oling. Ishlash huquqi bo‘yicha kartadagi yozuvni tekshiring.",
            de: "Erledigen Sie Anmeldung, Krankenversicherung und den familienbezogenen Aufenthaltstitel bei der Ausländerbehörde. Prüfen Sie den Vermerk zur Erwerbstätigkeit.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Turmush o‘rtog‘i vizasi uchun A1 har doim kerakmi?",
            de: "Ist A1 für den Ehegattennachzug immer erforderlich?",
          },
          answer: {
            uz: "Yo‘q. Ko‘p holatda A1 umumiy qoida, lekin mezbon shaxsning maqomi, EU huquqi, ayrim malakali mutaxassislar, sog‘liq yoki individual qiyinchilik sababli istisnolar mavjud. Istisno hujjatlar bilan isbotlanadi.",
            de: "Nein. A1 ist in vielen Fällen die Grundregel, es bestehen aber Ausnahmen nach Status der Bezugsperson, Unionsrecht, bei bestimmten Fachkräften, aus gesundheitlichen Gründen oder bei individueller Unzumutbarkeit. Die Ausnahme muss belegt werden.",
          },
        },
        {
          question: {
            uz: "Nemis fuqarosining turmush o‘rtog‘iga daromad shartmi?",
            de: "Muss der deutsche Ehegatte ein bestimmtes Einkommen nachweisen?",
          },
          answer: {
            uz: "Nemis fuqarosi yoniga oila birlashtirishda daromad talabi uchinchi davlat fuqarosi yoniga qo‘shilishdagi kabi umumiy shart sifatida qo‘llanmaydi. Biroq ishning barcha holatlari individual baholanadi.",
            de: "Beim Nachzug zu Deutschen wird die Lebensunterhaltssicherung nicht wie beim allgemeinen Nachzug zu Drittstaatsangehörigen als reguläre Voraussetzung angewandt. Die Gesamtumstände werden dennoch individuell geprüft.",
          },
        },
        {
          question: {
            uz: "Turmush o‘rtog‘i Germaniyada ishlay oladimi?",
            de: "Darf der nachgezogene Ehegatte in Deutschland arbeiten?",
          },
          answer: {
            uz: "Ha. Oila birlashtirish orqali kelgan turmush o‘rtog‘iga Germaniyada ishlash huquqi beriladi. Aufenthaltstitel yoki Zusatzblattdagi yozuvni tekshiring.",
            de: "Ja. Nachgezogene Ehegatten dürfen in Deutschland erwerbstätig sein. Prüfen Sie den Eintrag auf dem Aufenthaltstitel oder Zusatzblatt.",
          },
        },
        {
          question: {
            uz: "Nikohdan keyin darhol viza beriladimi?",
            de: "Wird das Visum unmittelbar nach der Eheschließung erteilt?",
          },
          answer: {
            uz: "Yo‘q. Nikohning o‘zi viza qarorini avtomatik bermaydi. Hujjatlar, shaxs, til, mezbon shaxs maqomi va boshqa tegishli shartlar tekshiriladi.",
            de: "Nein. Die Eheschließung führt nicht automatisch zur Visumerteilung. Urkunden, Identität, Sprache, Status der Bezugsperson und weitere Voraussetzungen werden geprüft.",
          },
        },
        {
          question: {
            uz: "Viza jarayoni qancha davom etadi?",
            de: "Wie lange dauert das Visumverfahren?",
          },
          answer: {
            uz: "Yagona kafolatlangan muddat yo‘q. Ausländerbehörde ishtiroki, hujjat tekshiruvi, nikoh hujjatlari va qo‘shimcha so‘rovlar sabab jarayon bir necha oy yoki ayrim holatda uzoqroq davom etishi mumkin.",
            de: "Eine einheitlich garantierte Dauer gibt es nicht. Beteiligung der Ausländerbehörde, Urkundenprüfung und Nachforderungen können zu mehreren Monaten oder im Einzelfall längerer Bearbeitung führen.",
          },
        },
        {
          question: {
            uz: "Uy-joy uchun aniq nechta kvadrat metr kerak?",
            de: "Wie viele Quadratmeter Wohnraum sind genau erforderlich?",
          },
          answer: {
            uz: "Barcha Germaniya uchun yagona oddiy raqam mavjud emas. Yetarli uy-joy mahalliy qonun va idora amaliyotiga ko‘ra, oila soni va uy sharoitiga qarab baholanadi. Ayrim malakali mutaxassislar oilasi uchun uy-joy dalili bo‘yicha yengillik mavjud.",
            de: "Es gibt keine einfache einheitliche Quadratmeterzahl für ganz Deutschland. Ausreichender Wohnraum wird nach lokalem Recht und Verwaltungspraxis, Familiengröße und Wohnung bewertet. Für Familien bestimmter Fachkräfte bestehen Erleichterungen.",
          },
        },
        {
          question: {
            uz: "Turistik viza bilan kirib Germaniyada oila vizasiga o‘zgartirish mumkinmi?",
            de: "Kann man mit Besuchsvisum einreisen und in Deutschland zum Familiennachzug wechseln?",
          },
          answer: {
            uz: "O‘zbekiston fuqarolari uchun umumiy xavfsiz yo‘l — kirishdan oldin milliy oila birlashtirish vizasiga topshirish. Germaniyada statusni o‘zgartirish faqat cheklangan maxsus holatlarda mumkin; turistik viza bunga kafolat bermaydi.",
            de: "Für Staatsangehörige Usbekistans ist der reguläre sichere Weg die Beantragung des nationalen Visums vor Einreise. Ein Statuswechsel in Deutschland ist nur in begrenzten Ausnahmefällen möglich; ein Besuchsvisum garantiert dies nicht.",
          },
        },
        {
          question: {
            uz: "Ausländerbehörde qo‘shimcha hujjat so‘rashi mumkinmi?",
            de: "Darf die Ausländerbehörde zusätzliche Unterlagen verlangen?",
          },
          answer: {
            uz: "Ha. Arizaning individual holatiga qarab daromad, uy-joy, sug‘urta, nikoh va boshqa ma’lumotlar bo‘yicha qo‘shimcha hujjatlar so‘ralishi mumkin.",
            de: "Ja. Abhängig vom Einzelfall können weitere Nachweise zu Einkommen, Wohnraum, Versicherung, Ehe und anderen Umständen verlangt werden.",
          },
        },
      ],
      sources: [
        {
          title: "Familiennachzug",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html",
          language: "de",
        },
        {
          title: "Nachzug zu deutschen Familienangehörigen",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDeutschen/nachzug-zu-deutschen-node.html",
          language: "de",
        },
        {
          title: "Nachzug zu ausländischen Familienangehörigen",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html",
          language: "de",
        },
        {
          title: "Nachweis einfacher Deutschkenntnisse beim Ehegattennachzug",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/SharedDocs/Anlagen/DE/MigrationAufenthalt/Ehegattennachzug/ehegattennachzug.pdf?__blob=publicationFile",
          language: "de",
        },
        {
          title: "§ 28 AufenthG — Familiennachzug zu Deutschen",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__28.html",
          language: "de",
        },
        {
          title: "§ 29 AufenthG — Familiennachzug zu Ausländern",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__29.html",
          language: "de",
        },
        {
          title: "§ 30 AufenthG — Ehegattennachzug",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__30.html",
          language: "de",
        },
        {
          title: "Family reunification",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/visa-residence/family-reunification",
          language: "en",
        },
        {
          title: "Consular Services Portal",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
          language: "en",
        },
      ],
      relatedArticleSlugs: [],
    },
  {
      id: "german-citizen-spouse-reunification",
      slug: "german-citizen-spouse-reunification",
      categorySlug: "family",
      title: {
        uz: "Nemis fuqarosi bilan oila birlashtirish",
        de: "Ehegattennachzug zu deutschen Staatsangehörigen",
      },
      excerpt: {
        uz: "Nemis fuqarosi bo‘lgan turmush o‘rtog‘i yoniga Germaniyaga ko‘chib kelish: §28 AufenthG, A1 talabi va istisnolar, daromad va uy-joyning amaliy baholanishi, bepul milliy viza, ishlash huquqi, hujjatlar va bosqichma-bosqich jarayon.",
        de: "Leitfaden zum Nachzug zu einem deutschen Ehegatten: § 28 AufenthG, A1-Anforderung und Ausnahmen, praktische Prüfung von Lebensunterhalt und Wohnsituation, gebührenfreies nationales Visum, Erwerbstätigkeit, Unterlagen und Ablauf.",
      },
      intro: {
        uz: "Agar turmush o‘rtog‘ingiz Germaniya fuqarosi bo‘lib, uning odatiy yashash joyi Germaniyada bo‘lsa, oila birlashtirish odatda §28 Aufenthaltsgesetz asosida amalga oshiriladi. Bu yo‘l uchinchi davlat fuqarosi yoniga umumiy oila birlashtirishdan kuchliroq oilaviy himoyaga ega. Shunga qaramay, nikohning haqiqiyligi, Germaniyada birga oilaviy hayot olib borish niyati, shaxsiy hujjatlar, odatda A1 darajadagi boshlang‘ich nemis tili va umumiy viza talablari tekshiriladi.",
        de: "Ist Ihr Ehegatte deutscher Staatsangehöriger und hat seinen gewöhnlichen Aufenthalt in Deutschland, richtet sich der Familiennachzug grundsätzlich nach § 28 Aufenthaltsgesetz. Dieser Weg genießt einen stärkeren familiären Schutz als der allgemeine Nachzug zu Drittstaatsangehörigen. Dennoch werden die Wirksamkeit der Ehe, die beabsichtigte familiäre Lebensgemeinschaft in Deutschland, Personenstandsurkunden, grundsätzlich einfache Deutschkenntnisse auf Niveau A1 und die allgemeinen Visumvoraussetzungen geprüft.",
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
          label: { uz: "Huquqiy asos", de: "Rechtsgrundlage" },
          value: {
            uz: "Asosan §28 AufenthG; A1 bo‘yicha §30ning tegishli qoidalari qo‘llanadi",
            de: "Grundsätzlich § 28 AufenthG; für A1 gelten die entsprechenden Regeln des § 30",
          },
        },
        {
          label: { uz: "Asosiy shart", de: "Zentrale Voraussetzung" },
          value: {
            uz: "Nemis turmush o‘rtog‘ining odatiy yashash joyi Germaniyada va oilaviy hayot birga olib borilishi kerak",
            de: "Der deutsche Ehegatte hat seinen gewöhnlichen Aufenthalt in Deutschland und die familiäre Lebensgemeinschaft soll dort geführt werden",
          },
        },
        {
          label: { uz: "Nemis tili", de: "Deutschkenntnisse" },
          value: {
            uz: "Odatda kirishdan oldin A1; qonuniy istisnolar mavjud",
            de: "Grundsätzlich A1 vor der Einreise; gesetzliche Ausnahmen sind möglich",
          },
        },
        {
          label: { uz: "Daromad", de: "Lebensunterhalt" },
          value: {
            uz: "Odatda oddiy uchinchi davlat oilaviy qoidasidagidek qat’iy shart emas; §28 bo‘yicha individual baholanadi",
            de: "Grundsätzlich nicht in gleicher Strenge wie beim allgemeinen Drittstaatsnachzug; individuelle Prüfung nach § 28",
          },
        },
        {
          label: { uz: "Viza to‘lovi", de: "Visumgebühr" },
          value: {
            uz: "Nemis fuqarosining turmush o‘rtog‘i uchun milliy viza odatda bepul",
            de: "Das nationale Visum ist für Ehegatten deutscher Staatsangehöriger grundsätzlich gebührenfrei",
          },
        },
        {
          label: { uz: "Ishlash", de: "Erwerbstätigkeit" },
          value: {
            uz: "Oilaviy yashash ruxsati Germaniyada ishlash huquqini beradi",
            de: "Der familienbezogene Aufenthaltstitel berechtigt zur Erwerbstätigkeit",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Nemis fuqarosi yoniga oila birlashtirish nima?",
            de: "Was ist der Ehegattennachzug zu Deutschen?",
          },
          paragraphs: [
            {
              uz: "§28 AufenthG bo‘yicha chet ellik turmush o‘rtog‘iga yashash ruxsati berilishi kerak, agar nemis fuqarosining odatiy yashash joyi Germaniyada bo‘lsa va er-xotin Germaniyada haqiqiy oilaviy hayot olib borishni istasa.",
              de: "Nach § 28 AufenthG ist dem ausländischen Ehegatten grundsätzlich eine Aufenthaltserlaubnis zu erteilen, wenn der deutsche Ehegatte seinen gewöhnlichen Aufenthalt in Deutschland hat und die Eheleute dort eine tatsächliche familiäre Lebensgemeinschaft führen wollen.",
            },
            {
              uz: "Nikohning xorijda tuzilgani o‘z-o‘zidan muammo emas. Muhimi, nikoh tuzilgan davlat huquqiga ko‘ra haqiqiy bo‘lishi va Germaniya huquq tartibiga zid bo‘lmasligi kerak. Germaniyada xorijiy nikohni tan olish uchun odatda bitta alohida universal «tan olish jarayoni» mavjud emas; hujjat viza jarayonida tekshiriladi.",
              de: "Eine im Ausland geschlossene Ehe ist nicht allein deshalb problematisch. Entscheidend ist, dass sie nach dem Recht des Eheschließungsstaates wirksam ist und nicht gegen wesentliche Grundsätze der deutschen Rechtsordnung verstößt. Ein einheitliches gesondertes Anerkennungsverfahren für ausländische Ehen existiert grundsätzlich nicht; die Urkunde wird im jeweiligen Verwaltungsverfahren geprüft.",
            },
            {
              uz: "Bu maqola faqat turmush o‘rtog‘i nemis fuqarosi bo‘lgan holatga tegishli. EU fuqarosi, Blue Card egasi yoki boshqa xorijiy Aufenthaltstitel egasi bilan oila birlashtirish qoidalari alohida.",
              de: "Dieser Artikel betrifft ausschließlich den Nachzug zu einem deutschen Ehegatten. Für EU-Bürger, Inhaber einer Blauen Karte EU oder andere ausländische Aufenthaltstitel gelten gesonderte Regeln.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kimlar murojaat qila oladi?",
            de: "Wer kann den Nachzug beantragen?",
          },
          items: [
            {
              uz: "Germaniya fuqarosi bilan qonuniy nikohda bo‘lgan uchinchi davlat fuqarosi",
              de: "Drittstaatsangehörige, die wirksam mit einer deutschen Person verheiratet sind",
            },
            {
              uz: "Nemis turmush o‘rtog‘ining odatiy yashash joyi Germaniyada bo‘lishi yoki ko‘chib keluvchi turmush o‘rtog‘i bilan birga Germaniyada yashashni boshlashi",
              de: "Der deutsche Ehegatte hat seinen gewöhnlichen Aufenthalt in Deutschland oder begründet ihn gemeinsam mit dem nachziehenden Ehegatten",
            },
            {
              uz: "Er-xotin Germaniyada haqiqiy oilaviy hayot olib borishni rejalashtirishi",
              de: "Die Eheleute beabsichtigen, in Deutschland eine tatsächliche eheliche Lebensgemeinschaft zu führen",
            },
            {
              uz: "Nikoh faqat viza yoki yashash huquqi olish uchun soxta tuzilmagan bo‘lishi",
              de: "Die Ehe darf nicht ausschließlich zum Zweck der Visum- oder Aufenthaltserlangung geschlossen worden sein",
            },
            {
              uz: "Shaxs, fuqarolik va nikoh holati ishonchli hujjatlar bilan tasdiqlanishi",
              de: "Identität, Staatsangehörigkeit und Familienstand müssen durch verlässliche Unterlagen nachgewiesen werden",
            },
          ],
        },
        requirements: {
          title: {
            uz: "A1 talabi va istisnolar",
            de: "A1-Anforderung und Ausnahmen",
          },
          paragraphs: [
            {
              uz: "Nemis fuqarosi bilan nikohda bo‘lish A1 talabini avtomatik bekor qilmaydi. §28 AufenthG §30ning tegishli til qoidalariga murojaat qiladi. Shu sabab ko‘p holatda viza topshirayotgan turmush o‘rtog‘i oddiy nemis tilida muloqot qila olishini — odatda A1 sertifikati orqali — ko‘rsatadi.",
              de: "Die Ehe mit einer deutschen Person hebt die A1-Anforderung nicht automatisch auf. § 28 AufenthG verweist auf die entsprechenden Sprachregelungen des § 30. Daher muss der nachziehende Ehegatte in vielen Fällen einfache Deutschkenntnisse nachweisen, üblicherweise durch ein A1-Zertifikat.",
            },
            {
              uz: "Qonunda sog‘liq sababli til o‘rganish imkonsizligi, individual asossiz qiyinchilik yoki boshqa maxsus holatlar uchun istisnolar mavjud. Istisno faqat og‘zaki da’vo bilan emas, tibbiy hujjat, o‘qishga urinishlar yoki boshqa ishonchli dalillar bilan asoslanishi kerak.",
              de: "Das Gesetz sieht Ausnahmen vor, etwa bei krankheitsbedingter Unmöglichkeit des Spracherwerbs, individueller Unzumutbarkeit oder weiteren besonderen Konstellationen. Eine Ausnahme muss durch ärztliche Unterlagen, dokumentierte Lernbemühungen oder andere belastbare Nachweise begründet werden.",
            },
            {
              uz: "Vatandoshlar.de amaliy tavsiyasi: istisno haqidagi Telegram yoki YouTube maslahatiga tayanib A1siz ariza bermang. Avval mas’ul Germaniya vakolatxonasidan yozma ma’lumot oling va istisno dalillarini to‘liq tayyorlang.",
              de: "Praktische Empfehlung von Vatandoshlar.de: Stellen Sie nicht allein aufgrund von Telegram- oder YouTube-Aussagen ohne A1 einen Antrag. Klären Sie die mögliche Ausnahme vorab schriftlich mit der zuständigen deutschen Auslandsvertretung und bereiten Sie sämtliche Nachweise vollständig vor.",
            },
          ],
          items: [
            {
              uz: "A1 sertifikati tan olingan imtihon tashkilotidan bo‘lishi kerak.",
              de: "Das A1-Zertifikat sollte von einer anerkannten Prüfungsorganisation stammen.",
            },
            {
              uz: "Vakolatxona sertifikatdan tashqari suhbatda oddiy savol-javobni ham baholashi mumkin.",
              de: "Die Auslandsvertretung kann neben dem Zertifikat auch einfache Kommunikation im Gespräch berücksichtigen.",
            },
            {
              uz: "Tibbiy istisno uchun oddiy umumiy ma’lumotnoma emas, til o‘rganish qobiliyatiga ta’sirni tushuntiradigan batafsil hujjat kerak bo‘lishi mumkin.",
              de: "Für eine medizinische Ausnahme kann statt einer pauschalen Bescheinigung ein detaillierter Nachweis über die Auswirkungen auf den Spracherwerb erforderlich sein.",
            },
            {
              uz: "A1 talab qilinmasa ham, Germaniyadagi kundalik hayot, Anmeldung, sug‘urta va idoralar uchun til o‘rganish tavsiya etiladi.",
              de: "Auch wenn A1 im Einzelfall entfällt, sind Deutschkenntnisse für Alltag, Anmeldung, Versicherung und Behörden dringend empfehlenswert.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan hujjatlar",
            de: "Üblicherweise erforderliche Unterlagen",
          },
          items: [
            {
              uz: "Amaldagi pasport, milliy viza arizasi va biometrik fotosurat",
              de: "Gültiger Reisepass, Antrag auf ein nationales Visum und biometrisches Passfoto",
            },
            {
              uz: "Nikoh guvohnomasi va talab qilinsa apostil, legalizatsiya yoki nemischa rasmiy tarjima",
              de: "Heiratsurkunde und erforderlichenfalls Apostille, Legalisation oder beglaubigte deutsche Übersetzung",
            },
            {
              uz: "Nemis turmush o‘rtog‘ining Reisepass yoki Personalausweis nusxasi",
              de: "Kopie des Reisepasses oder Personalausweises des deutschen Ehegatten",
            },
            {
              uz: "Nemis turmush o‘rtog‘ining Germaniyadagi Meldebescheinigung yoki rejalashtirilgan yashash joyi dalili",
              de: "Meldebescheinigung oder Nachweis des geplanten Wohnsitzes des deutschen Ehegatten in Deutschland",
            },
            {
              uz: "Talab qilinadigan holatda A1 sertifikati yoki istisnoni isbotlovchi hujjatlar",
              de: "Wenn erforderlich A1-Zertifikat oder Unterlagen zum Nachweis einer Ausnahme",
            },
            {
              uz: "Oldingi nikoh bo‘lgan bo‘lsa ajrim qarori, vafot guvohnomasi yoki nikoh tugaganini tasdiqlovchi hujjat",
              de: "Bei früheren Ehen Scheidungsurteil, Sterbeurkunde oder anderer Nachweis über die Beendigung",
            },
            {
              uz: "Familiya yoki ism o‘zgargan bo‘lsa tegishli fuqarolik holati hujjatlari",
              de: "Bei Namensänderungen entsprechende Personenstandsurkunden",
            },
            {
              uz: "Tibbiy sug‘urta bo‘yicha dalil yoki Germaniyada Familienversicherungga qo‘shilish imkoniyati",
              de: "Nachweis des Krankenversicherungsschutzes oder der möglichen Familienversicherung in Deutschland",
            },
            {
              uz: "Vakolatxona yoki Ausländerbehörde individual holat bo‘yicha so‘ragan qo‘shimcha hujjatlar",
              de: "Weitere Unterlagen nach individueller Anforderung der Auslandsvertretung oder Ausländerbehörde",
            },
          ],
          paragraphs: [
            {
              uz: "Hujjatlar ro‘yxati nikoh tuzilgan davlat, oldingi nikohlar, ism-familiya yozilishi va vakolatxonaning joriy amaliyotiga qarab farq qiladi. Ariza berishdan oldin O‘zbekistondagi Germaniya vakolatxonasining aynan shu viza turi uchun amaldagi checklistini tekshiring.",
              de: "Die Unterlagenliste hängt vom Eheschließungsstaat, früheren Ehen, Namensführung und der aktuellen Praxis der Auslandsvertretung ab. Prüfen Sie vor der Antragstellung die aktuelle Checkliste der deutschen Auslandsvertretung in Usbekistan für genau diesen Visumzweck.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Daromad, uy-joy, to‘lov va ishlash huquqi",
            de: "Lebensunterhalt, Wohnraum, Gebühren und Erwerbstätigkeit",
          },
          paragraphs: [
            {
              uz: "§28 bo‘yicha nemis fuqarosining turmush o‘rtog‘iga yashash ruxsati odatda §5dagi yashash xarajatlarini to‘liq ta’minlash talabidan chetga chiqib berilishi kerak. Bu «daromad hech qachon ko‘rilmaydi» degani emas: noodatiy maxsus holatlarda idora oilaviy hayotni Germaniyada yoki boshqa joyda olib borish imkoniyatini individual baholashi mumkin.",
              de: "Nach § 28 soll die Aufenthaltserlaubnis für den Ehegatten eines Deutschen in der Regel abweichend von der vollständigen Lebensunterhaltssicherung nach § 5 erteilt werden. Das bedeutet nicht, dass Einkommen niemals betrachtet wird: In atypischen Sonderfällen kann die Behörde individuell prüfen, ob die familiäre Lebensgemeinschaft zumutbar auch außerhalb Deutschlands geführt werden könnte.",
            },
            {
              uz: "Uchinchi davlat fuqarosi yoniga oila birlashtirishdagi kabi §29dagi yetarli uy-joy talabi §28 holatida oddiy asosiy shart sifatida bir xil qo‘llanmaydi. Shunga qaramay Anmeldung va haqiqiy oilaviy yashash uchun manzil dalili so‘raladi.",
              de: "Die Wohnraumanforderung des § 29 für den allgemeinen Nachzug zu Drittstaatsangehörigen gilt im Fall des § 28 nicht als gleichartige reguläre Hauptvoraussetzung. Dennoch werden für Anmeldung und tatsächliche gemeinsame Lebensführung Nachweise zum Wohnsitz benötigt.",
            },
            {
              uz: "Nemis fuqarosining turmush o‘rtog‘i va voyaga yetmagan yolg‘iz farzandlari uchun viza odatda konsullik to‘lovidan ozod qilinadi. Tarjima, apostil, sug‘urta va hujjat tayyorlash xarajatlari baribir qolishi mumkin.",
              de: "Visa für Ehegatten sowie minderjährige ledige Kinder deutscher Staatsangehöriger sind grundsätzlich von der Konsulargebühr befreit. Kosten für Übersetzung, Apostille, Versicherung und Dokumentenbeschaffung können dennoch entstehen.",
            },
          ],
          items: [
            {
              uz: "Oilaviy Aufenthaltstitel bilan Germaniyada mehnat faoliyatiga ruxsat beriladi.",
              de: "Der familienbezogene Aufenthaltstitel berechtigt zur Erwerbstätigkeit in Deutschland.",
            },
            {
              uz: "Nemis turmush o‘rtog‘ining Bürgergeld yoki boshqa yordam olishi arizani avtomatik rad etadi degan umumiy qoida yo‘q.",
              de: "Der Bezug von Bürgergeld oder anderen Leistungen durch den deutschen Ehegatten führt nicht nach einer pauschalen Regel automatisch zur Ablehnung.",
            },
            {
              uz: "Vakolatxona amaliy ma’lumot uchun ish, uy va sug‘urta hujjatlarini so‘rashi mumkin; hujjat so‘ralishi uning qat’iy qonuniy asosiy shart ekanini avtomatik anglatmaydi.",
              de: "Die Auslandsvertretung kann Arbeits-, Wohnungs- oder Versicherungsunterlagen zur Sachverhaltsprüfung anfordern; die Anforderung bedeutet nicht automatisch, dass diese jeweils starre gesetzliche Hauptvoraussetzungen sind.",
            },
            {
              uz: "Germaniyaga kelgach Anmeldung, Krankenversicherung va Ausländerbehördedagi Aufenthaltstitel jarayonini o‘z vaqtida bajaring.",
              de: "Erledigen Sie nach der Einreise Anmeldung, Krankenversicherung und den Aufenthaltstitel bei der Ausländerbehörde fristgerecht.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Muhim ogohlantirishlar va real amaliyot",
            de: "Wichtige Hinweise und praktische Realität",
          },
          items: [
            {
              uz: "«Nemis bilan nikoh bo‘lsa viza avtomatik chiqadi» degan gap noto‘g‘ri. Nikoh haqiqiyligi, shaxs, hujjatlar, A1 yoki istisno va oilaviy hayot niyati baribir tekshiriladi.",
              de: "Die Aussage, eine Ehe mit einem Deutschen führe automatisch zum Visum, ist falsch. Wirksamkeit der Ehe, Identität, Unterlagen, A1 oder Ausnahme und die beabsichtigte Lebensgemeinschaft werden weiterhin geprüft.",
            },
            {
              uz: "Nikoh guvohnomasi va pasportlarda ism, familiya, tug‘ilgan sana yoki joy bo‘yicha farq bo‘lsa, uni viza topshirishdan oldin aniqlashtiring.",
              de: "Klären Sie Abweichungen bei Namen, Geburtsdatum oder Geburtsort zwischen Heiratsurkunde und Pässen vor der Visumbeantragung.",
            },
            {
              uz: "Faqat nikoh fotosuratlari yetarli emas; vakolatxona zarur holatda munosabat tarixi va birga yashash rejasi haqida savol berishi mumkin.",
              de: "Hochzeitsfotos allein genügen nicht; die Auslandsvertretung kann bei Bedarf Fragen zur Beziehungsgeschichte und zur geplanten gemeinsamen Lebensführung stellen.",
            },
            {
              uz: "Turistik viza bilan kirib, Germaniyada albatta oila vizasiga o‘tkazaman deb reja qilmang. O‘zbekiston fuqarolari uchun standart yo‘l — kirishdan oldin milliy viza.",
              de: "Planen Sie nicht, mit einem Besuchsvisum einzureisen und den Status in Deutschland sicher zum Familiennachzug zu wechseln. Für Staatsangehörige Usbekistans ist der reguläre Weg das nationale Visum vor der Einreise.",
            },
            {
              uz: "Termin yoki viza kafolati uchun katta pul so‘raydigan vositachilardan ehtiyot bo‘ling. Rasmiy qarorni faqat Germaniya vakolatxonasi va tegishli idoralar qabul qiladi.",
              de: "Seien Sie vorsichtig bei Vermittlern, die gegen hohe Zahlungen Termin oder Visum garantieren. Die Entscheidung treffen ausschließlich die deutsche Auslandsvertretung und zuständige Behörden.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Nemis fuqaroligi va yashash joyini tasdiqlang",
            de: "Deutsche Staatsangehörigkeit und Wohnsitz klären",
          },
          description: {
            uz: "Nemis turmush o‘rtog‘ining Personalausweis yoki pasporti va Germaniyadagi Meldebescheinigungini tayyorlang.",
            de: "Bereiten Sie Personalausweis oder Reisepass des deutschen Ehegatten sowie dessen Meldebescheinigung in Deutschland vor.",
          },
        },
        {
          title: {
            uz: "Nikoh hujjatlarini tekshiring",
            de: "Eheurkunden prüfen",
          },
          description: {
            uz: "Nikoh guvohnomasi, oldingi nikohlarning tugashi, ism-familiya va apostil yoki tarjima talablarini oldindan tekshiring.",
            de: "Prüfen Sie Heiratsurkunde, Beendigung früherer Ehen, Namensführung sowie Anforderungen an Apostille und Übersetzung.",
          },
        },
        {
          title: {
            uz: "A1 yoki istisno dalilini tayyorlang",
            de: "A1 oder Ausnahme nachweisen",
          },
          description: {
            uz: "A1 talab qilinsa sertifikat va suhbatga tayyorlaning. Istisnoga tayansangiz, uni ishonchli hujjatlar bilan asoslang.",
            de: "Bereiten Sie bei A1-Pflicht Zertifikat und Gespräch vor. Stützen Sie eine Ausnahme auf belastbare Unterlagen.",
          },
        },
        {
          title: {
            uz: "Vakolatxona checklistini tekshiring",
            de: "Checkliste der Auslandsvertretung prüfen",
          },
          description: {
            uz: "O‘zbekistondagi Germaniya vakolatxonasining aynan Ehegattennachzug zu Deutschen uchun amaldagi hujjatlar ro‘yxatiga amal qiling.",
            de: "Folgen Sie der aktuellen Unterlagenliste der deutschen Auslandsvertretung in Usbekistan speziell für den Ehegattennachzug zu Deutschen.",
          },
        },
        {
          title: {
            uz: "Milliy viza arizasini yuboring",
            de: "Nationales Visum beantragen",
          },
          description: {
            uz: "Mavjud bo‘lsa Konsullik xizmatlari portali orqali hujjatlarni yuboring va shaxsiy termin ko‘rsatmalariga amal qiling.",
            de: "Reichen Sie die Unterlagen, sofern verfügbar, über das Auslandsportal ein und folgen Sie den Vorgaben für den persönlichen Termin.",
          },
        },
        {
          title: {
            uz: "Biometrika va suhbatdan o‘ting",
            de: "Biometrie und Gespräch absolvieren",
          },
          description: {
            uz: "Asl hujjatlar bilan terminga boring. Nikoh, birga yashash manzili va kelajak rejalari bo‘yicha oddiy savollarga aniq javob bering.",
            de: "Erscheinen Sie mit Originalunterlagen. Beantworten Sie Fragen zu Ehe, gemeinsamer Adresse und Zukunftsplanung klar und wahrheitsgemäß.",
          },
        },
        {
          title: {
            uz: "Ausländerbehörde bilan hamkorlik qiling",
            de: "Mit der Ausländerbehörde mitwirken",
          },
          description: {
            uz: "Germaniyadagi turmush o‘rtog‘i idora xatlariga tez javob bersin va so‘ralgan qo‘shimcha hujjatlarni yuborsin.",
            de: "Der deutsche Ehegatte sollte Schreiben der Ausländerbehörde zeitnah beantworten und angeforderte Unterlagen einreichen.",
          },
        },
        {
          title: {
            uz: "Kelgach oilaviy Aufenthaltstitelni oling",
            de: "Nach Einreise Aufenthaltstitel erhalten",
          },
          description: {
            uz: "Anmeldung, Krankenversicherung va Ausländerbehörde terminini bajaring. Kartadagi Erwerbstätigkeit yozuvini tekshiring.",
            de: "Erledigen Sie Anmeldung, Krankenversicherung und Termin bei der Ausländerbehörde. Prüfen Sie den Vermerk zur Erwerbstätigkeit.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Nemis fuqarosi bilan nikoh vizani avtomatik beradimi?",
            de: "Führt die Ehe mit einem Deutschen automatisch zum Visum?",
          },
          answer: {
            uz: "Yo‘q. §28 kuchli oilaviy huquq beradi, ammo nikohning haqiqiyligi, hujjatlar, shaxs, A1 yoki istisno va Germaniyada birga yashash niyati tekshiriladi.",
            de: "Nein. § 28 vermittelt einen starken familienbezogenen Anspruch, dennoch werden Wirksamkeit der Ehe, Unterlagen, Identität, A1 oder Ausnahme und die beabsichtigte gemeinsame Lebensführung geprüft.",
          },
        },
        {
          question: {
            uz: "Nemis turmush o‘rtog‘ining daromadi yetarli bo‘lishi shartmi?",
            de: "Muss der deutsche Ehegatte ein ausreichendes Einkommen haben?",
          },
          answer: {
            uz: "Odatda uchinchi davlat fuqarosi yoniga oila birlashtirishdagi kabi qat’iy daromad sharti qo‘llanmaydi. §28 bo‘yicha yashash ruxsati odatda yashash xarajatlari to‘liq ta’minlanmagan bo‘lsa ham berilishi kerak. Noodatiy maxsus holatlar individual baholanadi.",
            de: "Grundsätzlich gilt nicht dieselbe strenge Einkommensvoraussetzung wie beim allgemeinen Nachzug zu Drittstaatsangehörigen. Nach § 28 soll die Aufenthaltserlaubnis in der Regel auch ohne vollständige Lebensunterhaltssicherung erteilt werden. Atypische Sonderfälle werden individuell geprüft.",
          },
        },
        {
          question: {
            uz: "Uy maydoni bo‘yicha qat’iy talab bormi?",
            de: "Gibt es eine starre Wohnraumanforderung?",
          },
          answer: {
            uz: "§29dagi umumiy yetarli uy-joy talabi §28 holatida xuddi shu shaklda asosiy shart emas. Biroq Germaniyada haqiqiy birga yashash va Anmeldung uchun manzil dalili kerak.",
            de: "Die allgemeine Wohnraumanforderung des § 29 ist im Fall des § 28 nicht in gleicher Weise reguläre Hauptvoraussetzung. Für tatsächliches Zusammenleben und Anmeldung wird jedoch ein Wohnsitznachweis benötigt.",
          },
        },
        {
          question: {
            uz: "A1 har doim talab qilinadimi?",
            de: "Ist A1 immer erforderlich?",
          },
          answer: {
            uz: "Yo‘q. A1 ko‘p holatda umumiy qoida, ammo sog‘liq, asossiz qiyinchilik va boshqa qonuniy istisnolar mavjud. Istisno hujjatlar bilan asoslanishi kerak.",
            de: "Nein. A1 ist in vielen Fällen die Grundregel, es bestehen jedoch gesetzliche Ausnahmen, etwa aus gesundheitlichen Gründen oder bei Unzumutbarkeit. Die Ausnahme muss belegt werden.",
          },
        },
        {
          question: {
            uz: "Nemis fuqarosining turmush o‘rtog‘i uchun viza to‘lovi bormi?",
            de: "Fällt für den Ehegatten eines Deutschen eine Visumgebühr an?",
          },
          answer: {
            uz: "Odatda yo‘q. Nemis fuqarosining turmush o‘rtog‘i uchun viza konsullik to‘lovidan ozod qilinadi. Tarjima, apostil va boshqa tashqi xarajatlar qolishi mumkin.",
            de: "Grundsätzlich nein. Visa für Ehegatten deutscher Staatsangehöriger sind von der Konsulargebühr befreit. Übersetzung, Apostille und andere externe Kosten können dennoch anfallen.",
          },
        },
        {
          question: {
            uz: "Germaniyaga kelgach ishlash mumkinmi?",
            de: "Darf man nach der Einreise arbeiten?",
          },
          answer: {
            uz: "Ha. §28 bo‘yicha oilaviy Aufenthaltstitel ishlash huquqini beradi. Kartadagi yoki Zusatzblattdagi «Erwerbstätigkeit gestattet» yozuvini tekshiring.",
            de: "Ja. Der Aufenthaltstitel nach § 28 berechtigt zur Erwerbstätigkeit. Prüfen Sie den Eintrag „Erwerbstätigkeit gestattet“ auf Karte oder Zusatzblatt.",
          },
        },
        {
          question: {
            uz: "Viza jarayoni qancha davom etadi?",
            de: "Wie lange dauert das Visumverfahren?",
          },
          answer: {
            uz: "Kafolatlangan yagona muddat yo‘q. Ausländerbehörde ishtiroki, nikoh hujjatlari tekshiruvi va qo‘shimcha so‘rovlar sabab bir necha oy yoki ayrim holatda uzoqroq davom etishi mumkin.",
            de: "Eine garantierte einheitliche Frist gibt es nicht. Beteiligung der Ausländerbehörde, Prüfung von Personenstandsurkunden und Nachforderungen können mehrere Monate oder im Einzelfall länger dauern.",
          },
        },
        {
          question: {
            uz: "Xorijda tuzilgan nikohni Germaniyada alohida tan oldirish kerakmi?",
            de: "Muss eine im Ausland geschlossene Ehe gesondert anerkannt werden?",
          },
          answer: {
            uz: "Odatda xorijiy nikohlar uchun bitta umumiy alohida tan olish jarayoni yo‘q. Nikohning haqiqiyligi viza yoki boshqa idoraviy jarayonda tekshiriladi. Ajrim qarorlari uchun esa alohida tan olish talabi yuzaga kelishi mumkin.",
            de: "Für ausländische Ehen besteht grundsätzlich kein einheitliches gesondertes Anerkennungsverfahren. Die Wirksamkeit wird im jeweiligen Verwaltungsverfahren geprüft. Für ausländische Scheidungsentscheidungen kann dagegen ein eigenes Anerkennungsverfahren erforderlich sein.",
          },
        },
      ],
      sources: [
        {
          title: "§ 28 AufenthG — Familiennachzug zu Deutschen",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__28.html",
          language: "de",
        },
        {
          title: "§ 30 AufenthG — Ehegattennachzug",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__30.html",
          language: "de",
        },
        {
          title: "Nachzug zu deutschen Familienangehörigen",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDeutschen/nachzug-zu-deutschen-node.html",
          language: "de",
        },
        {
          title: "Nachweis einfacher Deutschkenntnisse beim Ehegattennachzug",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/SharedDocs/Anlagen/DE/MigrationAufenthalt/Ehegattennachzug/ehegattennachzug.pdf?__blob=publicationFile",
          language: "de",
        },
        {
          title: "FAQ zum ausländischen Ehepartner",
          organization: "Auswärtiges Amt",
          url: "https://www.auswaertiges-amt.de/de/service/fragenkatalog-node/04-auslehepartner/606478",
          language: "de",
        },
        {
          title: "Allgemeine Informationen zur Visumbeantragung",
          organization: "Auswärtiges Amt",
          url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/visabestimmungen-allgemein",
          language: "de",
        },
        {
          title: "Eheschließung im Ausland",
          organization: "Auswärtiges Amt",
          url: "https://www.auswaertiges-amt.de/de/service/fragenkatalog-node/606794-606794",
          language: "de",
        },
        {
          title: "Consular Services Portal",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
          language: "en",
        },
      ],
      relatedArticleSlugs: ["spouse-reunification"],
    },
  {
      id: "eu-blue-card-family-reunification",
      slug: "eu-blue-card-family-reunification",
      categorySlug: "family",
      title: {
        uz: "EU Blue Card egasi bilan oila birlashtirish",
        de: "Familiennachzug zu Inhabern einer Blauen Karte EU",
      },
      excerpt: {
        uz: "EU Blue Card egasining turmush o‘rtog‘i va voyaga yetmagan farzandlari uchun oila birlashtirish: A1siz murojaat, uy-joy bo‘yicha yengillik, daromad va sug‘urta, ishlash huquqi, hujjatlar, viza va boshqa EU davlatidan ko‘chishdagi maxsus qoidalar.",
        de: "Leitfaden zum Familiennachzug zu Inhabern einer Blauen Karte EU: Antrag ohne A1, Erleichterungen beim Wohnraum, Lebensunterhalt und Krankenversicherung, Erwerbstätigkeit, Unterlagen, Visum und Sonderregeln bei Mobilität aus einem anderen EU-Staat.",
      },
      intro: {
        uz: "EU Blue Card — malakali mutaxassislar uchun beriladigan yashash huquqi bo‘lib, uning egalarining oilasi uchun oila birlashtirish shartlari odatdagi uchinchi davlat fuqarosi yoniga qo‘shilishdan yengilroq. Turmush o‘rtog‘idan Germaniyaga kirishdan oldin A1 nemis tili talab qilinmaydi, yetarli uy-joyni isbotlash bo‘yicha ham yengillik mavjud va oilaviy yashash ruxsati ishlash huquqini beradi. Shunga qaramay, nikohning haqiqiyligi, Blue Card maqomi, yashash xarajatlari va tibbiy sug‘urta kabi asosiy shartlar hujjatlar bilan ko‘rsatiladi.",
        de: "Die Blaue Karte EU ist ein Aufenthaltstitel für qualifizierte Fachkräfte. Für ihre Familienangehörigen gelten erleichterte Bedingungen gegenüber dem allgemeinen Familiennachzug zu Drittstaatsangehörigen. Ehegatten müssen vor der Einreise keine Deutschkenntnisse auf Niveau A1 nachweisen, beim Nachweis ausreichenden Wohnraums bestehen Erleichterungen und der familienbezogene Aufenthaltstitel berechtigt zur Erwerbstätigkeit. Wirksamkeit der Ehe, Status der Bezugsperson, Lebensunterhalt und Krankenversicherung müssen dennoch nachvollziehbar belegt werden.",
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
          label: { uz: "Huquqiy asos", de: "Rechtsgrundlage" },
          value: {
            uz: "Asosan §§29–30 AufenthG; Blue Card egasi uchun maxsus yengilliklar",
            de: "Grundsätzlich §§ 29–30 AufenthG mit besonderen Erleichterungen für die Blaue Karte EU",
          },
        },
        {
          label: { uz: "Nemis tili", de: "Deutschkenntnisse" },
          value: {
            uz: "Turmush o‘rtog‘idan kirishdan oldin A1 talab qilinmaydi",
            de: "Vor der Einreise ist für den Ehegatten kein A1-Nachweis erforderlich",
          },
        },
        {
          label: { uz: "Uy-joy", de: "Wohnraum" },
          value: {
            uz: "Blue Card egasi oilasi uchun yetarli uy-joy dalili bo‘yicha yengillik mavjud",
            de: "Für Familien von Inhabern einer Blauen Karte EU entfällt der Nachweis ausreichenden Wohnraums",
          },
        },
        {
          label: { uz: "Daromad va sug‘urta", de: "Lebensunterhalt und Versicherung" },
          value: {
            uz: "Odatda oilaning yashash xarajatlari va tibbiy sug‘urtasi ta’minlangan bo‘lishi kerak",
            de: "Lebensunterhalt und Krankenversicherung der Familie müssen grundsätzlich gesichert sein",
          },
        },
        {
          label: { uz: "Ishlash huquqi", de: "Erwerbstätigkeit" },
          value: {
            uz: "Turmush o‘rtog‘i cheklovsiz ishlashi mumkin",
            de: "Der nachziehende Ehegatte darf uneingeschränkt arbeiten",
          },
        },
        {
          label: { uz: "Viza", de: "Visum" },
          value: {
            uz: "O‘zbekiston fuqarolari odatda kirishdan oldin milliy oila vizasiga topshiradi",
            de: "Staatsangehörige Usbekistans beantragen grundsätzlich vor der Einreise ein nationales Familiennachzugsvisum",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Blue Card oilasi uchun maxsus yengilliklar",
            de: "Besondere Erleichterungen für Familien von Blue-Card-Inhabern",
          },
          paragraphs: [
            {
              uz: "EU Blue Card egasi Germaniyada §18g AufenthG asosida yashaydi va ishlaydi. Uning turmush o‘rtog‘i bilan oila birlashtirish odatda §§29–30, voyaga yetmagan farzandlari bilan qo‘shilish esa §32 asosida ko‘rib chiqiladi.",
              de: "Inhaber einer Blauen Karte EU leben und arbeiten in Deutschland auf Grundlage des § 18g AufenthG. Der Ehegattennachzug richtet sich grundsätzlich nach §§ 29–30, der Nachzug minderjähriger Kinder nach § 32 AufenthG.",
            },
            {
              uz: "Blue Card oilalari uchun eng muhim farqlar — turmush o‘rtog‘iga oldindan A1 talab qilinmasligi, yetarli uy-joyni isbotlash bo‘yicha yengillik va turmush o‘rtog‘iga darhol ishlash huquqi berilishidir.",
              de: "Die wichtigsten Unterschiede sind der Wegfall des vorherigen A1-Nachweises für Ehegatten, die Erleichterung beim Wohnraumnachweis und der unmittelbare Zugang des Ehegatten zum Arbeitsmarkt.",
            },
            {
              uz: "Blue Card barcha oilaviy talablarni bekor qilmaydi. Nikoh va qarindoshlik hujjatlari, Blue Cardning amaldaligi, Germaniyada birga yashash rejasi, daromad hamda tibbiy sug‘urta tekshirilishi mumkin.",
              de: "Die Blaue Karte EU hebt nicht sämtliche familienrechtlichen Voraussetzungen auf. Ehe- und Abstammungsurkunden, Gültigkeit der Blauen Karte, gemeinsame Lebensplanung, Einkommen und Krankenversicherung können geprüft werden.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kimlar murojaat qila oladi?",
            de: "Wer kann den Familiennachzug beantragen?",
          },
          items: [
            {
              uz: "Germaniyada amaldagi EU Blue Cardga ega shaxsning qonuniy turmush o‘rtog‘i",
              de: "Der wirksam verheiratete Ehegatte einer Person mit gültiger Blauer Karte EU in Deutschland",
            },
            {
              uz: "Blue Card egasining 18 yoshga to‘lmagan va nikohda bo‘lmagan farzandlari",
              de: "Minderjährige ledige Kinder des Inhabers einer Blauen Karte EU",
            },
            {
              uz: "Blue Card egasi bilan Germaniyada haqiqiy oilaviy hayot olib borishni rejalashtirayotgan oila a’zolari",
              de: "Familienangehörige, die mit dem Blue-Card-Inhaber eine tatsächliche familiäre Lebensgemeinschaft in Deutschland führen wollen",
            },
            {
              uz: "Shaxs, nikoh yoki ota-onalik munosabatini ishonchli hujjatlar bilan isbotlay oladiganlar",
              de: "Personen, die Identität, Ehe oder Eltern-Kind-Verhältnis zuverlässig nachweisen können",
            },
            {
              uz: "O‘zbekiston fuqarolari uchun odatda Germaniyaga kirishdan oldin kerakli milliy vizani oladiganlar",
              de: "Für Staatsangehörige Usbekistans grundsätzlich Personen mit dem erforderlichen nationalen Visum vor der Einreise",
            },
          ],
        },
        requirements: {
          title: {
            uz: "A1 talab qilinmaydi — lekin til baribir muhim",
            de: "Kein A1-Nachweis — Deutsch bleibt dennoch wichtig",
          },
          paragraphs: [
            {
              uz: "§30 AufenthG bo‘yicha EU Blue Card egasining turmush o‘rtog‘idan kirishdan oldin oddiy nemis tili isboti talab qilinmaydi. Bu yengillik nikoh Blue Card berilishidan oldin yoki keyin tuzilganiga qarab umumiy tarzda bekor bo‘lib qolmaydi.",
              de: "Nach § 30 AufenthG muss der Ehegatte eines Inhabers einer Blauen Karte EU vor der Einreise keine einfachen Deutschkenntnisse nachweisen. Diese Erleichterung entfällt nicht pauschal danach, ob die Ehe vor oder nach Erteilung der Blauen Karte geschlossen wurde.",
            },
            {
              uz: "Bu faqat viza oldidan A1 sertifikati majburiy emasligini anglatadi. Germaniyada ish, shifokor, maktab, sug‘urta, Ausländerbehörde va kundalik hayot uchun nemis tili amalda juda foydali.",
              de: "Dies bedeutet lediglich, dass vor dem Visum kein A1-Zertifikat verpflichtend ist. Für Arbeit, Arztbesuche, Schule, Versicherung, Ausländerbehörde und Alltag sind Deutschkenntnisse praktisch sehr hilfreich.",
            },
            {
              uz: "Vatandoshlar.de tavsiyasi: viza A1siz mumkin bo‘lsa ham, ko‘chishdan oldin kamida A1–A2ni boshlash, Germaniyada esa imkon qadar B1 va undan yuqoriga chiqish oilaning mustaqilligi va ish imkoniyatini sezilarli yaxshilaydi.",
              de: "Praktische Empfehlung von Vatandoshlar.de: Auch wenn das Visum ohne A1 möglich ist, sollten vor der Einreise mindestens erste A1-/A2-Kenntnisse aufgebaut und in Deutschland möglichst B1 oder höher angestrebt werden. Das verbessert Selbstständigkeit und Arbeitschancen deutlich.",
            },
          ],
          items: [
            {
              uz: "Viza uchun A1 sertifikati odatda so‘ralmasligi kerak.",
              de: "Ein A1-Zertifikat ist für dieses Visum grundsätzlich nicht erforderlich.",
            },
            {
              uz: "Til sertifikati yo‘qligi turmush o‘rtog‘ining ishlash huquqini cheklamaydi.",
              de: "Das Fehlen eines Sprachzertifikats beschränkt die Erwerbstätigkeit des Ehegatten nicht.",
            },
            {
              uz: "Integratsiya kursi yoki nemis tili kursiga borish keyinchalik idora qarori yoki shaxsiy ehtiyojga qarab dolzarb bo‘lishi mumkin.",
              de: "Ein Integrations- oder Deutschkurs kann später abhängig von behördlicher Entscheidung und persönlichem Bedarf relevant werden.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan hujjatlar",
            de: "Üblicherweise erforderliche Unterlagen",
          },
          items: [
            {
              uz: "Amaldagi pasport, milliy viza arizasi va biometrik fotosurat",
              de: "Gültiger Reisepass, Antrag auf ein nationales Visum und biometrisches Passfoto",
            },
            {
              uz: "Nikoh guvohnomasi va zarur bo‘lsa apostil, legalizatsiya yoki rasmiy nemischa tarjima",
              de: "Heiratsurkunde und erforderlichenfalls Apostille, Legalisation oder beglaubigte deutsche Übersetzung",
            },
            {
              uz: "Blue Card egasining pasporti va amaldagi EU Blue Card nusxasi",
              de: "Kopie von Reisepass und gültiger Blauer Karte EU der Bezugsperson",
            },
            {
              uz: "Blue Card egasining Meldebescheinigung yoki Germaniyadagi rejalashtirilgan manzili",
              de: "Meldebescheinigung oder geplanter Wohnsitz des Blue-Card-Inhabers in Deutschland",
            },
            {
              uz: "Ish shartnomasi va so‘nggi maosh dalillari",
              de: "Arbeitsvertrag und aktuelle Einkommensnachweise",
            },
            {
              uz: "Oilani qamrab oladigan tibbiy sug‘urta yoki Familienversicherung imkoniyati",
              de: "Nachweis des Krankenversicherungsschutzes oder der möglichen Familienversicherung",
            },
            {
              uz: "Farzandlar uchun tug‘ilganlik guvohnomasi va zarur bo‘lsa vasiylik yoki ikkinchi ota-onaning roziligi",
              de: "Für Kinder Geburtsurkunde und erforderlichenfalls Sorgerechtsnachweis oder Zustimmung des anderen Elternteils",
            },
            {
              uz: "Oldingi nikohlar bo‘lsa, ularning tugaganini tasdiqlovchi hujjatlar",
              de: "Bei früheren Ehen Nachweise über deren Beendigung",
            },
            {
              uz: "Vakolatxona yoki Ausländerbehörde individual holat bo‘yicha so‘ragan boshqa hujjatlar",
              de: "Weitere Unterlagen nach individueller Anforderung der Auslandsvertretung oder Ausländerbehörde",
            },
          ],
          paragraphs: [
            {
              uz: "Aniq checklist vakolatxona, nikoh tuzilgan davlat, farzandlarning holati va Blue Card egasining Germaniyadagi vaziyatiga qarab farq qilishi mumkin. O‘zbekistondagi Germaniya vakolatxonasining amaldagi ro‘yxatini ariza berishdan oldin tekshiring.",
              de: "Die genaue Checkliste kann je nach Auslandsvertretung, Eheschließungsstaat, Situation der Kinder und Status des Blue-Card-Inhabers variieren. Prüfen Sie vor Antragstellung die aktuelle Liste der deutschen Auslandsvertretung in Usbekistan.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Daromad, uy-joy, sug‘urta va ishlash huquqi",
            de: "Lebensunterhalt, Wohnraum, Versicherung und Erwerbstätigkeit",
          },
          paragraphs: [
            {
              uz: "Blue Card oilasi uchun yetarli uy-joyni alohida isbotlash talabi yengillashtirilgan. Shunga qaramay, Germaniyada haqiqiy manzil, Anmeldung va oila yashashi mumkin bo‘lgan amaliy turar joy kerak bo‘ladi.",
              de: "Für Familien von Inhabern einer Blauen Karte EU entfällt der gesonderte Nachweis ausreichenden Wohnraums. Dennoch werden ein tatsächlicher Wohnsitz, Anmeldung und eine praktisch nutzbare Unterkunft für die Familie benötigt.",
            },
            {
              uz: "Umumiy holatda oilaning yashash xarajatlari davlat yordamiga tayanmasdan qoplanishi va yetarli tibbiy sug‘urta mavjud bo‘lishi kerak. Blue Card egasining ish shartnomasi, maoshi, ijara va sug‘urta holati amaliy tekshiruvda muhim.",
              de: "Grundsätzlich müssen der Lebensunterhalt der Familie ohne Inanspruchnahme öffentlicher Mittel und ausreichender Krankenversicherungsschutz gesichert sein. Arbeitsvertrag, Einkommen, Miete und Versicherungssituation des Blue-Card-Inhabers sind in der praktischen Prüfung relevant.",
            },
            {
              uz: "Turmush o‘rtog‘iga beriladigan oilaviy yashash ruxsati cheklovsiz mehnat faoliyatiga ruxsat beradi. Alohida ish beruvchi roziligi yoki oldindan ish taklifi talab qilinmaydi.",
              de: "Der familienbezogene Aufenthaltstitel des Ehegatten erlaubt uneingeschränkte Erwerbstätigkeit. Eine gesonderte Zustimmung eines Arbeitgebers oder ein vorheriges Arbeitsplatzangebot ist nicht erforderlich.",
            },
          ],
          items: [
            {
              uz: "Turmush o‘rtog‘i Vollzeit, Teilzeit yoki mustaqil faoliyat bilan shug‘ullanishi mumkin — boshqa professional ruxsatlar saqlanadi.",
              de: "Der Ehegatte kann Vollzeit, Teilzeit oder selbstständig tätig sein; berufsrechtliche Anforderungen bleiben bestehen.",
            },
            {
              uz: "Reglementierte kasblarda diplomni tan oldirish yoki kasbiy ruxsat baribir kerak bo‘lishi mumkin.",
              de: "In reglementierten Berufen können Anerkennung oder Berufserlaubnis weiterhin erforderlich sein.",
            },
            {
              uz: "Viza berilguncha ishni, uyni yoki katta qaytarilmaydigan xarajatlarni bekor qilishga shoshilmang.",
              de: "Kündigen Sie Arbeit oder Wohnung und tätigen Sie größere nicht erstattbare Ausgaben nicht vorschnell vor Visumerteilung.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Muhim farqlar va ogohlantirishlar",
            de: "Wichtige Unterschiede und Hinweise",
          },
          items: [
            {
              uz: "Blue Card egasining turmush o‘rtog‘iga A1 kerak emas; bu umumiy Ehegattennachzug maqolasidagi A1 qoidasidan muhim istisno.",
              de: "Für den Ehegatten eines Blue-Card-Inhabers ist A1 nicht erforderlich; dies ist eine wichtige Ausnahme von der allgemeinen Sprachregel.",
            },
            {
              uz: "«A1 kerak emas» degani «hech qanday hujjat kerak emas» degani emas. Nikoh, shaxs, Blue Card, daromad va sug‘urta baribir tekshiriladi.",
              de: "„Kein A1“ bedeutet nicht „keine Unterlagen“. Ehe, Identität, Blaue Karte, Einkommen und Versicherung werden weiterhin geprüft.",
            },
            {
              uz: "Blue Card arizasi hali ko‘rib chiqilayotgan bo‘lsa, oilaviy ariza qanday bog‘lanishini vakolatxona bilan oldindan aniqlashtiring.",
              de: "Ist der Antrag auf die Blaue Karte EU noch nicht entschieden, klären Sie mit der Auslandsvertretung, wie beide Verfahren miteinander verbunden werden.",
            },
            {
              uz: "Agar Blue Card boshqa EU davlatida berilgan bo‘lsa va oila u yerda birga yashagan bo‘lsa, Germaniyaga uzoq muddatli ko‘chish uchun maxsus mobilitet qoidalari qo‘llanishi mumkin.",
              de: "Wurde die Blaue Karte EU von einem anderen EU-Staat erteilt und lebte die Familie dort zusammen, können für den Wechsel nach Deutschland besondere Mobilitätsregeln gelten.",
            },
            {
              uz: "Blue Card egasi ishini yo‘qotsa yoki maqomi o‘zgarsa, bu oila arizasiga ta’sir qilishi mumkin. Ausländerbehördega o‘zgarishni o‘z vaqtida bildiring.",
              de: "Verliert der Blue-Card-Inhaber seine Beschäftigung oder ändert sich sein Status, kann dies das Familienverfahren beeinflussen. Informieren Sie die Ausländerbehörde rechtzeitig.",
            },
            {
              uz: "Rasmiy termin tizimi bepul. Maxsus yoki tez termin va’da qiladigan vositachilarga ishonmang.",
              de: "Das offizielle Terminbuchungssystem ist kostenlos. Misstrauen Sie Vermittlern, die besondere oder beschleunigte Termine versprechen.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Blue Card maqomini tekshiring",
            de: "Blue-Card-Status prüfen",
          },
          description: {
            uz: "Blue Cardning amal qilish muddati, §18g yozuvi, ish shartnomasi va Germaniyadagi manzilni tayyorlang.",
            de: "Prüfen Sie Gültigkeit, §-18g-Vermerk, Arbeitsvertrag und Wohnsitz des Blue-Card-Inhabers.",
          },
        },
        {
          title: {
            uz: "Oilaviy hujjatlarni tayyorlang",
            de: "Familienurkunden vorbereiten",
          },
          description: {
            uz: "Nikoh va tug‘ilganlik guvohnomalari, oldingi nikohlar, ism-familiya, apostil va tarjimalarni tekshiring.",
            de: "Prüfen Sie Ehe- und Geburtsurkunden, frühere Ehen, Namensführung, Apostille und Übersetzungen.",
          },
        },
        {
          title: {
            uz: "A1 sertifikati talab qilinmasligini to‘g‘ri belgilang",
            de: "A1-Ausnahme korrekt zuordnen",
          },
          description: {
            uz: "Arizada mezbon shaxs EU Blue Card egasi ekanini aniq ko‘rsating va Blue Card nusxasini ilova qiling.",
            de: "Geben Sie im Antrag klar an, dass die Bezugsperson eine Blaue Karte EU besitzt, und fügen Sie eine Kopie bei.",
          },
        },
        {
          title: {
            uz: "Daromad va sug‘urtani tayyorlang",
            de: "Lebensunterhalt und Versicherung vorbereiten",
          },
          description: {
            uz: "Ish shartnomasi, maosh, sug‘urta va Familienversicherung imkoniyati bo‘yicha dalillarni yig‘ing.",
            de: "Sammeln Sie Arbeitsvertrag, Einkommensnachweise, Versicherungsunterlagen und Nachweise zur möglichen Familienversicherung.",
          },
        },
        {
          title: {
            uz: "Milliy viza arizasini yuboring",
            de: "Nationales Visum beantragen",
          },
          description: {
            uz: "Mavjud bo‘lsa Konsullik xizmatlari portali orqali ariza bering yoki vakolatxonaning amaldagi tartibiga amal qiling.",
            de: "Stellen Sie den Antrag, sofern verfügbar, über das Auslandsportal oder folgen Sie dem aktuellen Verfahren der Auslandsvertretung.",
          },
        },
        {
          title: {
            uz: "Shaxsiy terminga boring",
            de: "Persönlichen Termin wahrnehmen",
          },
          description: {
            uz: "Asl hujjatlar, biometrika va suhbat uchun terminga boring. Oilaviy munosabat va Germaniyadagi reja haqida aniq javob bering.",
            de: "Erscheinen Sie mit Originalunterlagen zu Biometrie und Gespräch. Beantworten Sie Fragen zur Familie und zum Leben in Deutschland klar.",
          },
        },
        {
          title: {
            uz: "Ausländerbehörde so‘rovlariga javob bering",
            de: "Auf Rückfragen der Ausländerbehörde reagieren",
          },
          description: {
            uz: "Blue Card egasi Germaniyada qo‘shimcha hujjat so‘rovlariga o‘z vaqtida javob bersin.",
            de: "Der Blue-Card-Inhaber sollte in Deutschland auf Nachforderungen der Ausländerbehörde fristgerecht reagieren.",
          },
        },
        {
          title: {
            uz: "Kelgach Anmeldung va Aufenthaltstitelni rasmiylashtiring",
            de: "Nach Einreise Anmeldung und Aufenthaltstitel erledigen",
          },
          description: {
            uz: "Manzil ro‘yxati, sug‘urta va oilaviy Aufenthaltstitelni oling. Kartada ishlash huquqi to‘g‘ri ko‘rsatilganini tekshiring.",
            de: "Erledigen Sie Anmeldung, Versicherung und familienbezogenen Aufenthaltstitel. Prüfen Sie den korrekten Vermerk zur Erwerbstätigkeit.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Blue Card egasining turmush o‘rtog‘iga A1 kerakmi?",
            de: "Braucht der Ehegatte eines Blue-Card-Inhabers A1?",
          },
          answer: {
            uz: "Yo‘q. EU Blue Card egasining turmush o‘rtog‘idan Germaniyaga kirishdan oldin oddiy nemis tili isboti talab qilinmaydi.",
            de: "Nein. Der Ehegatte eines Inhabers einer Blauen Karte EU muss vor der Einreise keine einfachen Deutschkenntnisse nachweisen.",
          },
        },
        {
          question: {
            uz: "Nikoh Blue Card berilgandan keyin tuzilgan bo‘lsa ham A1siz bo‘ladimi?",
            de: "Entfällt A1 auch bei einer Ehe nach Erteilung der Blue Card?",
          },
          answer: {
            uz: "Ha, Blue Card egasining turmush o‘rtog‘i uchun til yengilligi nikoh faqat oldindan tuzilgan holat bilan umumiy tarzda cheklanmagan. Nikoh haqiqiyligi va qolgan talablar baribir tekshiriladi.",
            de: "Ja. Die Spracherleichterung für Ehegatten von Blue-Card-Inhabern ist nicht pauschal auf bereits vorher bestehende Ehen beschränkt. Wirksamkeit der Ehe und weitere Voraussetzungen werden dennoch geprüft.",
          },
        },
        {
          question: {
            uz: "Blue Card oilasi uchun uy maydoni isboti kerakmi?",
            de: "Muss ausreichender Wohnraum nachgewiesen werden?",
          },
          answer: {
            uz: "Blue Card egasi oilasi uchun yetarli uy-joyni alohida isbotlash talabi bekor qilingan. Ammo haqiqiy yashash manzili, Anmeldung va amalda oilaga mos turar joy kerak.",
            de: "Für den Familiennachzug zu Inhabern einer Blauen Karte EU entfällt der gesonderte Nachweis ausreichenden Wohnraums. Ein tatsächlicher Wohnsitz, Anmeldung und praktisch nutzbare Unterkunft bleiben erforderlich.",
          },
        },
        {
          question: {
            uz: "Turmush o‘rtog‘i darhol ishlay oladimi?",
            de: "Darf der Ehegatte sofort arbeiten?",
          },
          answer: {
            uz: "Oilaviy yashash ruxsati cheklovsiz ishlash huquqini beradi. Amalda ishni boshlashdan oldin vizadagi yoki Aufenthaltstiteldagi ishlash yozuvini tekshiring.",
            de: "Der familienbezogene Aufenthaltstitel erlaubt uneingeschränkte Erwerbstätigkeit. Prüfen Sie vor Arbeitsbeginn den entsprechenden Vermerk im Visum oder Aufenthaltstitel.",
          },
        },
        {
          question: {
            uz: "Turmush o‘rtog‘i oldindan ish topishi shartmi?",
            de: "Muss der Ehegatte vorher einen Arbeitsplatz haben?",
          },
          answer: {
            uz: "Yo‘q. Oila birlashtirish vizasi uchun turmush o‘rtog‘ining oldindan ish taklifiga ega bo‘lishi shart emas.",
            de: "Nein. Für das Familiennachzugsvisum benötigt der Ehegatte kein vorheriges Arbeitsplatzangebot.",
          },
        },
        {
          question: {
            uz: "Daromad umuman tekshirilmaydimi?",
            de: "Wird das Einkommen überhaupt nicht geprüft?",
          },
          answer: {
            uz: "Tekshirilishi mumkin. Blue Card oila birlashtirishni yengillashtiradi, biroq yashash xarajatlari va tibbiy sug‘urta odatda ta’minlangan bo‘lishi kerak.",
            de: "Doch, eine Prüfung ist möglich. Die Blaue Karte erleichtert den Familiennachzug, dennoch müssen Lebensunterhalt und Krankenversicherung grundsätzlich gesichert sein.",
          },
        },
        {
          question: {
            uz: "Farzandlar ham birga kelishi mumkinmi?",
            de: "Können Kinder ebenfalls nachziehen?",
          },
          answer: {
            uz: "Ha. Blue Card egasining 18 yoshga to‘lmagan, nikohda bo‘lmagan farzandlari §32 AufenthG asosida oila birlashtirishga murojaat qilishi mumkin.",
            de: "Ja. Minderjährige ledige Kinder können nach § 32 AufenthG zum Inhaber einer Blauen Karte EU nachziehen.",
          },
        },
        {
          question: {
            uz: "Blue Card boshqa EU davlatida berilgan bo‘lsa nima bo‘ladi?",
            de: "Was gilt bei einer Blue Card aus einem anderen EU-Staat?",
          },
          answer: {
            uz: "Agar Blue Card egasi va oilasi boshqa EU davlatida qonuniy yashagan bo‘lsa, Germaniyaga ko‘chishda maxsus uzoq muddatli mobilitet va oilaviy yengilliklar qo‘llanishi mumkin. Bu holatni oddiy birinchi oila vizasi bilan aralashtirmasdan alohida tekshirish kerak.",
            de: "Haben Blue-Card-Inhaber und Familie bereits rechtmäßig in einem anderen EU-Staat gelebt, können besondere Regeln der langfristigen Mobilität und des privilegierten Familiennachzugs gelten. Diese Konstellation muss gesondert geprüft werden.",
          },
        },
      ],
      sources: [
        {
          title: "§ 29 AufenthG — Familiennachzug zu Ausländern",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__29.html",
          language: "de",
        },
        {
          title: "§ 30 AufenthG — Ehegattennachzug",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__30.html",
          language: "de",
        },
        {
          title: "§ 32 AufenthG — Kindernachzug",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__32.html",
          language: "de",
        },
        {
          title: "Die Blaue Karte EU",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/BlaueKarteEU/blauekarteeu-node.html",
          language: "de",
        },
        {
          title: "Nachzug zu ausländischen Familienangehörigen",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html",
          language: "de",
        },
        {
          title: "Spouses joining citizens of non-EU countries",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/visa-residence/family-reunification/spouses-joining-citizens-non-eu",
          language: "en",
        },
        {
          title: "The new Skilled Immigration Act",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/visa-residence/skilled-immigration-act",
          language: "en",
        },
        {
          title: "Consular Services Portal",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
          language: "en",
        },
      ],
      relatedArticleSlugs: [
        "spouse-reunification",
        "german-citizen-spouse-reunification",
      ],
    },
  {
      id: "child-family-reunification",
      slug: "child-family-reunification",
      categorySlug: "family",
      title: {
        uz: "Farzand orqali oila birlashtirish",
        de: "Kindernachzug nach Deutschland",
      },
      excerpt: {
        uz: "Voyaga yetmagan va nikohda bo‘lmagan farzandning Germaniyadagi ota-onasi yoniga ko‘chib kelishi: §32 AufenthG, vasiylik, ikkinchi ota-onaning roziligi, tug‘ilganlik hujjatlari, viza, sug‘urta va amaliy jarayon bo‘yicha batafsil qo‘llanma.",
        de: "Ausführlicher Leitfaden zum Nachzug minderjähriger lediger Kinder nach Deutschland: § 32 AufenthG, Sorgerecht, Zustimmung des anderen Elternteils, Geburtsurkunden, Visum, Versicherung und praktischer Ablauf.",
      },
      intro: {
        uz: "Kindernachzug — 18 yoshga to‘lmagan va nikohda bo‘lmagan farzandning Germaniyada qonuniy yashayotgan ota-onasi yoki yolg‘iz vasiylik huquqiga ega ota-onasi yoniga ko‘chib kelishidir. Asosiy huquqiy norma §32 Aufenthaltsgesetz hisoblanadi. Arizaning muvaffaqiyati faqat qarindoshlikni isbotlashga emas, balki vasiylik, ikkinchi ota-onaning roziligi, ota-onaning Germaniyadagi maqomi, hujjatlar uyg‘unligi va milliy viza tartibiga ham bog‘liq.",
        de: "Der Kindernachzug ermöglicht minderjährigen ledigen Kindern, zu ihren rechtmäßig in Deutschland lebenden Eltern oder zum allein personensorgeberechtigten Elternteil zu ziehen. Zentrale Rechtsgrundlage ist § 32 Aufenthaltsgesetz. Entscheidend sind nicht nur Abstammungsnachweise, sondern auch Sorgerecht, Zustimmung des anderen Elternteils, Aufenthaltsstatus der Eltern, widerspruchsfreie Urkunden und das nationale Visumverfahren.",
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
          label: { uz: "Yosh", de: "Alter" },
          value: {
            uz: "Ariza qilayotgan farzand 18 yoshga to‘lmagan bo‘lishi kerak",
            de: "Das nachziehende Kind muss unter 18 Jahre alt sein",
          },
        },
        {
          label: { uz: "Oilaviy holat", de: "Familienstand" },
          value: {
            uz: "Farzand nikohda bo‘lmagan bo‘lishi kerak",
            de: "Das Kind muss ledig sein",
          },
        },
        {
          label: { uz: "Huquqiy asos", de: "Rechtsgrundlage" },
          value: {
            uz: "Asosan §32 AufenthG; nemis farzand yoki nemis ota-ona holatida §28 ham muhim",
            de: "Grundsätzlich § 32 AufenthG; bei deutschen Kindern oder Eltern ist zusätzlich § 28 relevant",
          },
        },
        {
          label: { uz: "Vasiylik", de: "Sorgerecht" },
          value: {
            uz: "Ikkala ota-ona yoki yolg‘iz vasiylik huquqiga ega ota-ona holati hujjat bilan isbotlanadi",
            de: "Gemeinsames oder alleiniges Sorgerecht muss durch geeignete Unterlagen nachgewiesen werden",
          },
        },
        {
          label: { uz: "Viza", de: "Visum" },
          value: {
            uz: "O‘zbekiston fuqarolari odatda kirishdan oldin Kindernachzug uchun milliy viza oladi",
            de: "Staatsangehörige Usbekistans beantragen grundsätzlich vor der Einreise ein nationales Visum zum Kindernachzug",
          },
        },
        {
          label: { uz: "Voyaga yetgan farzand", de: "Volljähriges Kind" },
          value: {
            uz: "18 yoshdan keyin oddiy Kindernachzug odatda mumkin emas; faqat alohida Härtefall holatlari tekshiriladi",
            de: "Nach Volljährigkeit ist regulärer Kindernachzug grundsätzlich ausgeschlossen; möglich sind nur besondere Härtefälle",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Kindernachzug nima?",
            de: "Was ist der Kindernachzug?",
          },
          paragraphs: [
            {
              uz: "§32 AufenthG bo‘yicha voyaga yetmagan va nikohda bo‘lmagan farzand ota-onasi yoki yolg‘iz vasiylik huquqiga ega ota-onasi yoniga Germaniyaga ko‘chib kelishi mumkin. Ota-onaning Germaniyadagi Aufenthaltstiteli oila birlashtirishga ruxsat beradigan maqom bo‘lishi kerak.",
              de: "Nach § 32 AufenthG kann ein minderjähriges lediges Kind zu seinen Eltern oder zum allein personensorgeberechtigten Elternteil nach Deutschland ziehen. Der Aufenthaltstitel der Eltern muss den Familiennachzug ermöglichen.",
            },
            {
              uz: "Agar faqat bitta ota-ona Germaniyada bo‘lsa, ikkinchi ota-onaning vasiylik huquqi va roziligi markaziy masalaga aylanadi. Faqat og‘zaki rozilik yetarli emas; notarial rozilik, sud qarori yoki yolg‘iz vasiylik hujjati talab qilinishi mumkin.",
              de: "Lebt nur ein Elternteil in Deutschland, werden Sorgerecht und Zustimmung des anderen Elternteils besonders wichtig. Eine mündliche Zustimmung reicht nicht aus; erforderlich sein können notarielle Zustimmung, gerichtliche Entscheidung oder Nachweis des alleinigen Sorgerechts.",
            },
            {
              uz: "18 yoshga to‘lgan farzandlar uchun §32dagi oddiy yo‘l tugaydi. Bunday holatda faqat §36 bo‘yicha favqulodda og‘irlik holati yoki boshqa mustaqil viza turi ko‘rib chiqilishi mumkin.",
              de: "Mit Vollendung des 18. Lebensjahres endet der reguläre Weg nach § 32. Danach kommen nur ein außergewöhnlicher Härtefall nach § 36 oder ein eigener Aufenthaltstitel in Betracht.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kimlar murojaat qila oladi?",
            de: "Wer kann den Kindernachzug beantragen?",
          },
          items: [
            {
              uz: "18 yoshga to‘lmagan va nikohda bo‘lmagan biologik farzandlar",
              de: "Minderjährige ledige leibliche Kinder",
            },
            {
              uz: "Germaniya huquqi bo‘yicha tan olinadigan asrab olingan farzandlar",
              de: "Adoptierte Kinder, deren Adoption nach deutschem Recht wirksam oder anerkennungsfähig ist",
            },
            {
              uz: "Ikkala ota-ona Germaniyada yashayotgan yoki birga ko‘chib kelayotgan farzandlar",
              de: "Kinder, deren beide Eltern in Deutschland leben oder gemeinsam einreisen",
            },
            {
              uz: "Yolg‘iz vasiylik huquqiga ega ota-ona Germaniyada yashayotgan farzandlar",
              de: "Kinder, deren allein personensorgeberechtigter Elternteil in Deutschland lebt",
            },
            {
              uz: "Boshqa ota-ona vasiylikka ega bo‘lsa, uning qonuniy roziligi yoki tegishli sud qarori mavjud farzandlar",
              de: "Kinder mit rechtswirksamer Zustimmung des mitsorgeberechtigten anderen Elternteils oder entsprechender gerichtlicher Entscheidung",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Vasiylik va ikkinchi ota-onaning roziligi",
            de: "Sorgerecht und Zustimmung des anderen Elternteils",
          },
          paragraphs: [
            {
              uz: "Agar ota-onalar birgalikda vasiylik huquqiga ega bo‘lsa va faqat bittasi Germaniyada yashasa, bolaning doimiy ko‘chib ketishiga ikkinchi ota-onaning roziligi odatda talab qilinadi. Bu rozilik aniq, yozma va ko‘pincha notarial tasdiqlangan bo‘lishi kerak.",
              de: "Haben beide Eltern gemeinsames Sorgerecht und lebt nur ein Elternteil in Deutschland, ist für den dauerhaften Umzug des Kindes grundsätzlich die Zustimmung des anderen Elternteils erforderlich. Sie muss eindeutig, schriftlich und häufig notariell beglaubigt sein.",
            },
            {
              uz: "Agar Germaniyadagi ota-ona yolg‘iz vasiylik huquqiga ega bo‘lsa, buni sud qarori, tug‘ilganlik hujjati, vasiylik reyestri ma’lumoti yoki tegishli davlat hujjati bilan isbotlash kerak.",
              de: "Besteht alleiniges Sorgerecht beim in Deutschland lebenden Elternteil, muss dies durch gerichtliche Entscheidung, Personenstandsurkunde, Sorgeregisterauskunft oder vergleichbaren staatlichen Nachweis belegt werden.",
            },
            {
              uz: "Ikkinchi ota-ona rozilik bermasa, bolaning ko‘chishi bo‘yicha vakolatli sud qarori talab qilinishi mumkin. Viza idorasi ota-onalar o‘rtasidagi xususiy nizoni hal qilmaydi.",
              de: "Verweigert der andere Elternteil die Zustimmung, kann eine gerichtliche Entscheidung zur Ausreise oder Aufenthaltsbestimmung erforderlich sein. Das Visumverfahren ersetzt keine familiengerichtliche Klärung.",
            },
            {
              uz: "Vatandoshlar.de tavsiyasi: viza terminini olishdan oldin vasiylik hujjatlarini to‘liq tekshiring. Ayniqsa nikohsiz tug‘ilgan bola, ajrashgan ota-ona yoki turli davlatlarda rasmiylashtirilgan hujjatlarda xato xavfi yuqori.",
              de: "Praktische Empfehlung von Vatandoshlar.de: Prüfen Sie sämtliche Sorgerechtsunterlagen vor dem Visumtermin. Besonders bei nichtehelich geborenen Kindern, geschiedenen Eltern oder Urkunden aus verschiedenen Staaten bestehen erhöhte Fehlerrisiken.",
            },
          ],
          items: [
            {
              uz: "Rozilikda bolaning Germaniyada doimiy yashashi aniq ko‘rsatilishi kerak.",
              de: "Die Zustimmung sollte den dauerhaften Aufenthalt des Kindes in Deutschland eindeutig erfassen.",
            },
            {
              uz: "Oddiy qo‘lda yozilgan xat vakolatxona uchun yetarli bo‘lmasligi mumkin.",
              de: "Ein einfaches handschriftliches Schreiben kann für die Auslandsvertretung unzureichend sein.",
            },
            {
              uz: "Sud qarori kuchga kirgan va kerak bo‘lsa apostil hamda tarjima bilan taqdim etilishi kerak.",
              de: "Gerichtliche Entscheidungen müssen rechtskräftig und erforderlichenfalls mit Apostille und Übersetzung vorgelegt werden.",
            },
            {
              uz: "Farzandning manfaatlari barcha qarorlarda markaziy mezon hisoblanadi.",
              de: "Das Kindeswohl ist bei allen Entscheidungen ein zentrales Kriterium.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan hujjatlar",
            de: "Üblicherweise erforderliche Unterlagen",
          },
          items: [
            {
              uz: "Farzandning amaldagi pasporti, milliy viza arizasi va biometrik fotosurati",
              de: "Gültiger Reisepass des Kindes, Antrag auf ein nationales Visum und biometrisches Passfoto",
            },
            {
              uz: "Tug‘ilganlik guvohnomasi va zarur bo‘lsa apostil, legalizatsiya yoki rasmiy tarjima",
              de: "Geburtsurkunde und erforderlichenfalls Apostille, Legalisation oder beglaubigte Übersetzung",
            },
            {
              uz: "Germaniyada yashayotgan ota-onaning pasporti va Aufenthaltstiteli nusxasi",
              de: "Kopie von Reisepass und Aufenthaltstitel des in Deutschland lebenden Elternteils",
            },
            {
              uz: "Ota-onaning Meldebescheinigung va Germaniyadagi manzil dalili",
              de: "Meldebescheinigung und Wohnsitznachweis des Elternteils in Deutschland",
            },
            {
              uz: "Nikoh guvohnomasi, ajrim qarori yoki ota-onaning oilaviy holatini ko‘rsatuvchi boshqa hujjatlar",
              de: "Heiratsurkunde, Scheidungsentscheidung oder weitere Nachweise zum Familienstand der Eltern",
            },
            {
              uz: "Yolg‘iz vasiylik huquqi dalili yoki ikkinchi ota-onaning notarial roziligi",
              de: "Nachweis des alleinigen Sorgerechts oder notarielle Zustimmung des anderen Elternteils",
            },
            {
              uz: "Zarur bo‘lsa ikkinchi ota-onaning pasport nusxasi va imzo tasdig‘i",
              de: "Erforderlichenfalls Passkopie und Unterschriftsbeglaubigung des anderen Elternteils",
            },
            {
              uz: "Farzand uchun tibbiy sug‘urta yoki Familienversicherung imkoniyati",
              de: "Nachweis des Krankenversicherungsschutzes oder der möglichen Familienversicherung des Kindes",
            },
            {
              uz: "Ota-onaning maqomiga qarab daromad va uy-joy hujjatlari",
              de: "Je nach Aufenthaltsstatus der Eltern Nachweise zu Einkommen und Wohnraum",
            },
            {
              uz: "Vakolatxona yoki Ausländerbehörde so‘ragan qo‘shimcha hujjatlar",
              de: "Weitere Unterlagen nach Anforderung der Auslandsvertretung oder Ausländerbehörde",
            },
          ],
          paragraphs: [
            {
              uz: "Toshkentdagi Germaniya vakolatxonasi hujjatlar ro‘yxati ishning holatiga qarab qo‘shimcha dalillarni so‘rashi mumkin. Tug‘ilganlik, vasiylik va familiya yozilishidagi har qanday farqni arizadan oldin aniqlashtiring.",
              de: "Die deutsche Auslandsvertretung in Taschkent kann je nach Einzelfall zusätzliche Nachweise verlangen. Klären Sie Abweichungen bei Geburt, Sorgerecht oder Namensschreibweise vor Antragstellung.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Daromad, uy-joy, sug‘urta va yosh masalasi",
            de: "Lebensunterhalt, Wohnraum, Versicherung und Altersgrenze",
          },
          paragraphs: [
            {
              uz: "Uchinchi davlat fuqarosi bo‘lgan ota-ona yoniga Kindernachzugda umumiy holatda yashash xarajatlari va yetarli uy-joy tekshirilishi mumkin. Malakali mutaxassislar, EU Blue Card egalari va ayrim boshqa maqomlarda uy-joy bo‘yicha yengilliklar mavjud.",
              de: "Beim Kindernachzug zu drittstaatsangehörigen Eltern können grundsätzlich Lebensunterhalt und ausreichender Wohnraum geprüft werden. Für Fachkräfte, Inhaber einer Blauen Karte EU und bestimmte weitere Status bestehen Erleichterungen beim Wohnraum.",
            },
            {
              uz: "Farzand 18 yoshga to‘lmasdan turib ariza berilishi juda muhim. Voyaga yetganidan keyin oddiy §32 talabi odatda yo‘qoladi. Shu sabab hujjatlarni kechiktirmaslik kerak.",
              de: "Die Antragstellung vor Vollendung des 18. Lebensjahres ist besonders wichtig. Nach Eintritt der Volljährigkeit entfällt der reguläre Anspruch nach § 32 grundsätzlich. Unterlagen sollten daher nicht unnötig verzögert werden.",
            },
            {
              uz: "Farzand Germaniyaga kelgach tibbiy sug‘urtaga ega bo‘lishi kerak. Ko‘p oilalarda qonuniy sug‘urtadagi Familienversicherung mumkin, ammo bu ota-onaning sug‘urta turi va holatiga bog‘liq.",
              de: "Nach der Einreise benötigt das Kind Krankenversicherungsschutz. Häufig ist eine beitragsfreie Familienversicherung möglich, abhängig von Versicherungsart und Situation der Eltern.",
            },
          ],
          items: [
            {
              uz: "Voyaga yetmagan farzand maktab yoshida bo‘lsa, Germaniyada Schulpflicht qoidalari qo‘llanadi.",
              de: "Für schulpflichtige minderjährige Kinder gelten nach Einreise die jeweiligen landesrechtlichen Schulpflichtregeln.",
            },
            {
              uz: "Viza chiqmaguncha maktabni yakuniy bekor qilish yoki qaytarilmaydigan safar xarajatlarini qilishga shoshilmang.",
              de: "Beenden Sie Schule oder tätigen Sie nicht erstattbare Reisekosten nicht vorschnell vor Visumerteilung.",
            },
            {
              uz: "Farzandning yoshi, ota-onaning maqomi va vasiylik holati birgalikda baholanadi.",
              de: "Alter des Kindes, Aufenthaltsstatus der Eltern und Sorgerechtslage werden gemeinsam bewertet.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Muhim ogohlantirishlar va real amaliyot",
            de: "Wichtige Hinweise und praktische Realität",
          },
          items: [
            {
              uz: "«Tug‘ilganlik guvohnomasi bo‘lsa yetarli» degan fikr noto‘g‘ri. Vasiylik va boshqa ota-onaning roziligi ko‘pincha alohida tekshiriladi.",
              de: "Die Annahme, eine Geburtsurkunde allein reiche aus, ist falsch. Sorgerecht und Zustimmung des anderen Elternteils werden häufig gesondert geprüft.",
            },
            {
              uz: "17 yoshdan katta farzand uchun jarayonni oxirgi oyga qoldirmang. 18 yoshga to‘lish huquqiy yo‘lni keskin o‘zgartiradi.",
              de: "Warten Sie bei Kindern über 17 Jahren nicht bis zum letzten Monat. Die Volljährigkeit verändert die rechtliche Ausgangslage erheblich.",
            },
            {
              uz: "Nikohsiz tug‘ilgan bola bo‘yicha otalik va vasiylik alohida huquqiy masalalar bo‘lishi mumkin.",
              de: "Bei nichtehelich geborenen Kindern können Vaterschaft und Sorgerecht rechtlich getrennte Fragen sein.",
            },
            {
              uz: "DNA tekshiruvi oddiy standart talab emas, lekin hujjatlar bilan qarindoshlikni ishonchli aniqlab bo‘lmasa, vakolatli idora qo‘shimcha dalil so‘rashi mumkin.",
              de: "Ein DNA-Test ist keine reguläre Standardanforderung. Kann die Abstammung durch Urkunden nicht zuverlässig geklärt werden, können zuständige Stellen zusätzliche Nachweise verlangen.",
            },
            {
              uz: "Soxta vasiylik, rozilik yoki tug‘ilganlik hujjati viza radiga va huquqiy oqibatlarga olib kelishi mumkin.",
              de: "Gefälschte Sorgerechts-, Zustimmungs- oder Geburtsunterlagen können zur Ablehnung und zu rechtlichen Folgen führen.",
            },
            {
              uz: "Rasmiy termin tizimi bepul. Maxsus termin yoki viza kafolati uchun pul so‘raydigan vositachilarga ishonmang.",
              de: "Das offizielle Terminbuchungssystem ist kostenlos. Misstrauen Sie Vermittlern, die besondere Termine oder ein Visum garantieren.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Ota-onaning Germaniyadagi maqomini tekshiring",
            de: "Aufenthaltsstatus der Eltern prüfen",
          },
          description: {
            uz: "Fuqarolik, Aufenthaltstitel paragrafi, amal qilish muddati va oila birlashtirish huquqini aniqlang.",
            de: "Prüfen Sie Staatsangehörigkeit, Rechtsgrundlage, Gültigkeit des Aufenthaltstitels und Berechtigung zum Familiennachzug.",
          },
        },
        {
          title: {
            uz: "Farzandning yosh va oilaviy holatini tekshiring",
            de: "Alter und Familienstand des Kindes prüfen",
          },
          description: {
            uz: "Farzand 18 yoshga to‘lmagan va nikohda bo‘lmagan bo‘lishi kerak. Vaqt tor bo‘lsa hujjatlarni darhol boshlang.",
            de: "Das Kind muss minderjährig und ledig sein. Bei knapper Zeit sollten Unterlagen unverzüglich vorbereitet werden.",
          },
        },
        {
          title: {
            uz: "Vasiylik holatini aniqlang",
            de: "Sorgerechtslage klären",
          },
          description: {
            uz: "Birgalikdagi yoki yolg‘iz vasiylikni rasmiy hujjatlar bilan aniqlang.",
            de: "Klären Sie gemeinsames oder alleiniges Sorgerecht anhand offizieller Unterlagen.",
          },
        },
        {
          title: {
            uz: "Ikkinchi ota-onaning roziligini tayyorlang",
            de: "Zustimmung des anderen Elternteils vorbereiten",
          },
          description: {
            uz: "Zarur bo‘lsa Germaniyada doimiy yashashga aniq rozilikni notarial shaklda oling.",
            de: "Lassen Sie erforderlichenfalls eine eindeutige notarielle Zustimmung zum dauerhaften Aufenthalt in Deutschland erstellen.",
          },
        },
        {
          title: {
            uz: "Tug‘ilganlik va oilaviy hujjatlarni tekshiring",
            de: "Geburts- und Familienurkunden prüfen",
          },
          description: {
            uz: "Ism, familiya, sana, otalik, apostil va tarjimalardagi ma’lumotlar bir-biriga mos bo‘lsin.",
            de: "Achten Sie auf übereinstimmende Namen, Daten, Vaterschaftsangaben, Apostillen und Übersetzungen.",
          },
        },
        {
          title: {
            uz: "Milliy viza arizasini yuboring",
            de: "Nationales Visum beantragen",
          },
          description: {
            uz: "Mavjud bo‘lsa Auslandsportal orqali ariza bering yoki Toshkentdagi Germaniya vakolatxonasining joriy tartibiga amal qiling.",
            de: "Stellen Sie den Antrag, sofern verfügbar, über das Auslandsportal oder folgen Sie dem aktuellen Verfahren der deutschen Auslandsvertretung in Taschkent.",
          },
        },
        {
          title: {
            uz: "Shaxsiy terminga boring",
            de: "Persönlichen Termin wahrnehmen",
          },
          description: {
            uz: "Farzand va zarur bo‘lsa vasiy ota-ona asl hujjatlar bilan biometrika hamda suhbat uchun qatnashadi.",
            de: "Das Kind und erforderlichenfalls der sorgeberechtigte Elternteil erscheinen mit Originalunterlagen zu Biometrie und Gespräch.",
          },
        },
        {
          title: {
            uz: "Ausländerbehörde so‘rovlariga javob bering",
            de: "Rückfragen der Ausländerbehörde beantworten",
          },
          description: {
            uz: "Germaniyadagi ota-ona daromad, uy-joy, sug‘urta yoki vasiylik bo‘yicha qo‘shimcha hujjatlarni o‘z vaqtida yuborsin.",
            de: "Der Elternteil in Deutschland sollte zusätzliche Nachweise zu Einkommen, Wohnraum, Versicherung oder Sorgerecht fristgerecht einreichen.",
          },
        },
        {
          title: {
            uz: "Kelgach Anmeldung, sug‘urta va maktabni rasmiylashtiring",
            de: "Nach Einreise Anmeldung, Versicherung und Schule erledigen",
          },
          description: {
            uz: "Farzandni manzilga ro‘yxatdan o‘tkazing, sug‘urtaga qo‘shing, Aufenthaltstitel va maktab masalalarini yakunlang.",
            de: "Melden Sie das Kind an, sichern Sie Krankenversicherung, Aufenthaltstitel und gegebenenfalls Schulaufnahme.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "17 yosh 11 oylik farzand ham Kindernachzugga topshira oladimi?",
            de: "Kann ein 17 Jahre und 11 Monate altes Kind noch den Kindernachzug beantragen?",
          },
          answer: {
            uz: "Nazariy jihatdan ha, chunki farzand hali voyaga yetmagan. Biroq vaqt juda muhim: hujjatlar va ariza jarayonini zudlik bilan boshlash kerak. 18 yoshga to‘lish huquqiy baholashni o‘zgartirishi mumkin.",
            de: "Grundsätzlich ja, solange das Kind noch minderjährig ist. Zeit ist jedoch entscheidend; Unterlagen und Antrag sollten unverzüglich eingeleitet werden. Die Volljährigkeit kann die rechtliche Bewertung verändern.",
          },
        },
        {
          question: {
            uz: "Nikohsiz tug‘ilgan farzand ham kelishi mumkinmi?",
            de: "Kann auch ein nichtehelich geborenes Kind nachziehen?",
          },
          answer: {
            uz: "Ha. Lekin otalik, vasiylik va ikkinchi ota-onaning roziligi alohida hujjatlar bilan aniqlanishi mumkin.",
            de: "Ja. Vaterschaft, Sorgerecht und gegebenenfalls Zustimmung des anderen Elternteils müssen jedoch gesondert nachgewiesen werden.",
          },
        },
        {
          question: {
            uz: "Ikkinchi ota-onaning roziligi qachon kerak?",
            de: "Wann ist die Zustimmung des anderen Elternteils erforderlich?",
          },
          answer: {
            uz: "Agar ikkinchi ota-ona ham vasiylik huquqiga ega bo‘lsa va Germaniyaga ko‘chib kelmasa, bolaning doimiy ko‘chishiga uning qonuniy roziligi odatda talab qilinadi.",
            de: "Ist der andere Elternteil mitsorgeberechtigt und zieht nicht mit nach Deutschland, ist seine rechtswirksame Zustimmung zum dauerhaften Umzug grundsätzlich erforderlich.",
          },
        },
        {
          question: {
            uz: "Yolg‘iz vasiylik bo‘lsa ham rozilik kerakmi?",
            de: "Ist bei alleinigem Sorgerecht dennoch eine Zustimmung erforderlich?",
          },
          answer: {
            uz: "Odatda yo‘q, agar yolg‘iz vasiylik ishonchli rasmiy hujjat bilan tasdiqlansa. Vakolatxona hujjatning haqiqiyligi va ko‘lamini tekshiradi.",
            de: "Grundsätzlich nein, wenn das alleinige Sorgerecht zuverlässig amtlich nachgewiesen wird. Die Auslandsvertretung prüft Wirksamkeit und Umfang des Nachweises.",
          },
        },
        {
          question: {
            uz: "DNA testi majburiymi?",
            de: "Ist ein DNA-Test verpflichtend?",
          },
          answer: {
            uz: "Yo‘q, standart talab emas. Faqat hujjatlar qarindoshlikni ishonchli isbotlamasa, qo‘shimcha dalil sifatida ko‘rib chiqilishi mumkin.",
            de: "Nein, er ist keine Standardvoraussetzung. Er kann nur erwogen werden, wenn die Abstammung durch Urkunden nicht zuverlässig nachgewiesen werden kann.",
          },
        },
        {
          question: {
            uz: "Voyaga yetgan farzand oddiy oila birlashtirish bilan kela oladimi?",
            de: "Kann ein volljähriges Kind regulär im Familiennachzug einreisen?",
          },
          answer: {
            uz: "Odatda yo‘q. 18 yoshdan keyin oddiy §32 yo‘li tugaydi. Faqat §36dagi alohida og‘irlik holati yoki mustaqil o‘qish, Ausbildung yoki ish vizasi tekshiriladi.",
            de: "Grundsätzlich nein. Nach Volljährigkeit endet der reguläre Weg nach § 32. In Betracht kommen nur ein außergewöhnlicher Härtefall nach § 36 oder ein eigener Titel für Studium, Ausbildung oder Beschäftigung.",
          },
        },
        {
          question: {
            uz: "Farzand Germaniyada maktabga bora oladimi?",
            de: "Darf das Kind in Deutschland zur Schule gehen?",
          },
          answer: {
            uz: "Ha. Germaniyaga ko‘chib kelgan maktab yoshidagi farzandga Bundeslandning Schulpflicht va maktabga qabul qoidalari qo‘llanadi.",
            de: "Ja. Für schulpflichtige Kinder gelten nach der Einreise die Schulpflicht- und Aufnahmevorschriften des jeweiligen Bundeslandes.",
          },
        },
        {
          question: {
            uz: "Germaniyada tug‘ilgan farzandga ham viza kerakmi?",
            de: "Braucht ein in Deutschland geborenes Kind ein Visum?",
          },
          answer: {
            uz: "Germaniyada tug‘ilgan bola chetdan kirayotgan farzand emas. Uning yashash huquqi §33 va fuqarolik holatiga qarab alohida rasmiylashtiriladi.",
            de: "Ein in Deutschland geborenes Kind zieht nicht aus dem Ausland nach. Sein Aufenthaltsrecht richtet sich gesondert nach § 33 und gegebenenfalls nach seiner Staatsangehörigkeit.",
          },
        },
      ],
      sources: [
        {
          title: "§ 32 AufenthG — Kindernachzug",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__32.html",
          language: "de",
        },
        {
          title: "§ 28 AufenthG — Familiennachzug zu Deutschen",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__28.html",
          language: "de",
        },
        {
          title: "§ 33 AufenthG — Geburt eines Kindes im Bundesgebiet",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__33.html",
          language: "de",
        },
        {
          title: "Familiennachzug",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html",
          language: "de",
        },
        {
          title: "Nachzug zu ausländischen Familienangehörigen",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html",
          language: "de",
        },
        {
          title: "Family reunification for children",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/visa-residence/family-reunification/children-join",
          language: "en",
        },
        {
          title: "Visum zum Kindernachzug",
          organization: "Auswärtiges Amt — Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/2446686-2446686",
          language: "de",
        },
        {
          title: "Visum zum Kindernachzug",
          organization: "Auslandsportal",
          url: "https://digital.diplo.de/navigator/de/visa/overview/ergebnis-familiennachzug-kind",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "spouse-reunification",
        "german-citizen-spouse-reunification",
        "eu-blue-card-family-reunification",
      ],
    },
] satisfies ReadonlyArray<LocalizedGuideArticle>;
