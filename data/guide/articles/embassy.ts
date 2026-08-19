import type { LocalizedGuideArticle } from "../../../types/guide";

export const embassyArticles = [
  {
      id: "visa-appointment",
      slug: "visa-appointment",
      categorySlug: "embassy-and-appointments",
      title: {
        uz: "Germaniya vizasi uchun termin olish",
        de: "Visumtermin für Deutschland buchen",
      },
      excerpt: {
        uz: "Toshkentda Germaniya vizasi uchun termin olish: to‘g‘ri viza kategoriyasini tanlash, TLScontact, Germaniya elchixonasi, Auslandsportal va VIDEX farqi, akkaunt yaratish, bron qilish, to‘lov, terminni o‘zgartirish yoki bekor qilish, hujjatlar, biometrika va firibgarlardan himoyalanish.",
        de: "Leitfaden zur Terminbuchung für ein deutsches Visum in Taschkent: richtige Visumkategorie, TLScontact, Deutsche Botschaft, Auslandsportal und VIDEX, Registrierung, Buchung, Gebühren, Umbuchung oder Stornierung, Unterlagen, Biometrie und Schutz vor Betrug.",
      },
      intro: {
        uz: "Germaniya vizasi uchun termin — viza arizasini shaxsan topshirish, biometrik ma’lumot berish va asl hujjatlarni ko‘rsatish uchun belgilangan vaqt. Toshkentda termin yo‘li viza turiga qarab TLScontact, Germaniya elchixonasining termin tizimi yoki Konsullik xizmatlari portali bilan bog‘liq bo‘lishi mumkin. Eng muhim qoida: avval to‘g‘ri viza maqsadini aniqlang, keyin faqat shu kategoriya uchun ko‘rsatilgan rasmiy tizimdan termin oling.",
        de: "Ein Visumtermin ist der festgelegte Zeitpunkt für die persönliche Antragstellung, biometrische Erfassung und Vorlage von Originalunterlagen. In Taschkent kann der Terminweg je nach Visumzweck über TLScontact, das Terminvergabesystem der Deutschen Botschaft oder in Verbindung mit dem Auslandsportal erfolgen. Entscheidend ist: Bestimmen Sie zuerst den richtigen Visumzweck und buchen Sie anschließend ausschließlich über das dafür angegebene offizielle System.",
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
          label: { uz: "Oldindan termin", de: "Vorheriger Termin" },
          value: {
            uz: "Viza arizasi odatda faqat oldindan bron qilingan termin bilan qabul qilinadi",
            de: "Visumanträge werden grundsätzlich nur mit vorher gebuchtem Termin angenommen",
          },
        },
        {
          label: { uz: "Toshkentdagi tizim", de: "Verfahren in Taschkent" },
          value: {
            uz: "Kategoriya bo‘yicha TLScontact yoki elchixona termin tizimi",
            de: "Je nach Kategorie über TLScontact oder das Terminvergabesystem der Botschaft",
          },
        },
        {
          label: { uz: "Auslandsportal", de: "Auslandsportal" },
          value: {
            uz: "Ko‘p milliy viza turlarida ariza va hujjatlarni oldindan onlayn yuborish mumkin",
            de: "Bei vielen nationalen Visa können Antrag und Unterlagen vorab online eingereicht werden",
          },
        },
        {
          label: { uz: "Shaxsiy qatnashish", de: "Persönliche Vorsprache" },
          value: {
            uz: "Biometrika va asl hujjatlar uchun odatda baribir shaxsan borish kerak",
            de: "Für Biometrie und Originalunterlagen ist grundsätzlich weiterhin persönliches Erscheinen erforderlich",
          },
        },
        {
          label: { uz: "Rasmiy tizim", de: "Offizielles System" },
          value: {
            uz: "Termin faqat rasmiy TLS yoki elchixona tizimi orqali olinadi",
            de: "Termine werden ausschließlich über TLS oder das offizielle Botschaftssystem gebucht",
          },
        },
        {
          label: { uz: "Vositachilar", de: "Vermittler" },
          value: {
            uz: "Agentliklar rasmiy tizimga maxsus yoki ustuvor kirishga ega emas",
            de: "Agenturen haben keinen besonderen oder bevorzugten Zugang zum offiziellen System",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Termin nima va u nimani anglatmaydi?",
            de: "Was ist ein Termin – und was bedeutet er nicht?",
          },
          paragraphs: [
            {
              uz: "Termin viza qarori emas. U faqat arizani topshirish uchun ajratilgan vaqt. Termin olganingiz viza talablari bajarilganini, hujjatlar qabul qilinishini yoki viza berilishini kafolatlamaydi.",
              de: "Ein Termin ist keine Visumentscheidung. Er reserviert lediglich einen Zeitpunkt für die Antragstellung. Die Buchung garantiert weder erfüllte Voraussetzungen noch Annahme aller Unterlagen oder Erteilung des Visums.",
            },
            {
              uz: "Viza maqsadini noto‘g‘ri tanlab bron qilingan termin bilan kelish xavfli. Masalan, Schengen mehmon vizasi, Ausbildung (kasbiy ta’lim), Chancenkarte (Imkoniyatlar kartasi) va Familiennachzug (oila birlashtirish) uchun bir xil termin kategoriyasidan foydalanilmaydi.",
              de: "Eine Buchung in der falschen Kategorie ist riskant. Für Schengen-Besuch, Ausbildung, Chancenkarte und Familiennachzug werden nicht dieselben Terminkategorien verwendet.",
            },
            {
              uz: "Toshkentdagi Germaniya vakolatxonasi milliy viza arizalari elchixona yoki TLS termin tizimi orqali, viza maqsadiga qarab topshirilishini ko‘rsatadi. Har bir viza sahifasidagi «Terminbuchung» ko‘rsatmasi ustuvor manba hisoblanadi.",
              de: "Die Deutsche Botschaft Taschkent weist darauf hin, dass nationale Visumanträge je nach Aufenthaltszweck über das Terminvergabesystem der Botschaft oder von TLS eingereicht werden. Maßgeblich ist der Abschnitt „Terminbuchung“ der jeweiligen Visumseite.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi tizimdan foydalaniladi?",
            de: "Welches System wird verwendet?",
          },
          items: [
            {
              uz: "TLScontact: Toshkentda ko‘plab Schengen va milliy viza kategoriyalarini qabul qiluvchi rasmiy tashqi xizmat ko‘rsatuvchi",
              de: "TLScontact: offizieller externer Dienstleister für zahlreiche Schengen- und nationale Visumkategorien in Taschkent",
            },
            {
              uz: "Elchixona termin tizimi: ayrim maxsus milliy viza yoki konsullik kategoriyalarida to‘g‘ridan-to‘g‘ri vakolatxona orqali",
              de: "Terminvergabesystem der Botschaft: für bestimmte besondere nationale Visa- oder Konsularkategorien direkt über die Auslandsvertretung",
            },
            {
              uz: "Auslandsportal: ko‘p milliy viza kategoriyalarida ariza va hujjatlarni onlayn yuborish, keyin shaxsiy termin",
              de: "Auslandsportal: bei vielen nationalen Visumkategorien Online-Antrag und Dokumentenupload mit anschließendem persönlichen Termin",
            },
            {
              uz: "VIDEX: ariza formasini elektron to‘ldirish vositasi; u o‘zi alohida termin tizimi emas",
              de: "VIDEX: elektronisches Werkzeug zum Ausfüllen des Antragsformulars; kein eigenständiges Terminbuchungssystem",
            },
            {
              uz: "Kontaktforma yoki email: faqat vakolatxona aynan shu kategoriya uchun shunday ko‘rsatma bergan maxsus holatlarda",
              de: "Kontaktformular oder E-Mail: nur in besonderen Fällen, wenn die Auslandsvertretung dies für die konkrete Kategorie ausdrücklich vorgibt",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Termin bron qilishdan oldin tayyorlanadigan ma’lumotlar",
            de: "Angaben vor der Terminbuchung vorbereiten",
          },
          paragraphs: [
            {
              uz: "Akkaunt yaratishdan oldin pasportdagi ism-familiya, tug‘ilgan sana, pasport raqami, amal qilish muddati, email va telefon raqamini tayyorlang. Barcha ma’lumotlarni pasportdagi yozuv bilan aynan bir xil kiriting.",
              de: "Bereiten Sie vor der Registrierung Name, Geburtsdatum, Passnummer, Gültigkeit, E-Mail-Adresse und Telefonnummer vor. Übertragen Sie alle Angaben exakt aus dem Reisepass.",
            },
            {
              uz: "Viza kategoriyasini tanlashdan oldin tanlangan maqsad uchun rasmiy checklistni o‘qing. Kategoriya nomi siz rejalashtirayotgan ishga emas, viza huquqiy asosiga mos bo‘lishi kerak.",
              de: "Lesen Sie vor Auswahl der Kategorie die offizielle Checkliste des Aufenthaltszwecks. Die Kategorie muss zur Rechtsgrundlage des Visums passen, nicht nur zur allgemeinen Reiseabsicht.",
            },
            {
              uz: "Vatandoshlar.de tavsiyasi: bitta shaxs uchun bir nechta akkaunt va keraksiz parallel bron yaratmang. Bu xatolar, bekor qilish yoki muhim xabarlarni yo‘qotish xavfini oshiradi.",
              de: "Praktische Empfehlung von Vatandoshlar.de: Erstellen Sie nicht mehrere Konten und unnötige Parallelbuchungen für dieselbe Person. Das erhöht das Risiko von Fehlern, Stornierungen und verpassten Mitteilungen.",
            },
          ],
          items: [
            {
              uz: "Doimiy foydalanadigan shaxsiy email manzilidan foydalaning.",
              de: "Verwenden Sie eine persönliche, dauerhaft erreichbare E-Mail-Adresse.",
            },
            {
              uz: "Email va spam/junk papkasini muntazam tekshiring.",
              de: "Prüfen Sie regelmäßig Posteingang sowie Spam- und Junk-Ordner.",
            },
            {
              uz: "Pasport raqamida O va 0, I va 1 kabi belgilarni adashtirmang.",
              de: "Verwechseln Sie in der Passnummer keine Zeichen wie O und 0 oder I und 1.",
            },
            {
              uz: "Oila a’zolari birga topshirsa, tizimning group/family booking qoidalarini tekshiring.",
              de: "Prüfen Sie bei gemeinsam antragstellenden Familien die Regeln für Gruppen- oder Familienbuchungen.",
            },
            {
              uz: "Voyaga yetmagan bola uchun ota-ona yoki qonuniy vakil ma’lumotlarini to‘g‘ri kiriting.",
              de: "Erfassen Sie bei Minderjährigen die Angaben der Eltern oder gesetzlichen Vertretung korrekt.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Termin kuni olib boriladigan hujjatlar",
            de: "Unterlagen für den Termintag",
          },
          items: [
            {
              uz: "Termin tasdig‘i — elektron yoki chop etilgan shaklda, tizim ko‘rsatmasiga muvofiq",
              de: "Terminbestätigung – elektronisch oder ausgedruckt nach Vorgabe des Systems",
            },
            {
              uz: "Amaldagi pasport va checklist talab qilgan pasport nusxalari",
              de: "Gültiger Reisepass und die laut Checkliste erforderlichen Passkopien",
            },
            {
              uz: "To‘liq to‘ldirilgan va zarur bo‘lsa imzolangan viza arizasi",
              de: "Vollständig ausgefüllter und erforderlichenfalls unterschriebener Visumantrag",
            },
            {
              uz: "Biometrik fotosuratlar",
              de: "Biometrische Passfotos",
            },
            {
              uz: "Tanlangan viza turi bo‘yicha barcha asl hujjatlar va nusxalar",
              de: "Sämtliche Originalunterlagen und Kopien der gewählten Visumkategorie",
            },
            {
              uz: "Talab qilinadigan viza va xizmat to‘lovi uchun ko‘rsatilgan to‘lov usuli",
              de: "Vorgesehene Zahlungsmethode für Visum- und gegebenenfalls Servicegebühren",
            },
            {
              uz: "Auslandsportal yoki TLS orqali yuborilgan ariza ma’lumotlari va referens raqami",
              de: "Referenznummer und Angaben des über Auslandsportal oder TLS eingereichten Antrags",
            },
            {
              uz: "Voyaga yetmaganlar uchun tug‘ilganlik, vasiylik va rozilik hujjatlari — talab qilinsa",
              de: "Bei Minderjährigen erforderlichenfalls Geburts-, Sorge- und Zustimmungserklärungen",
            },
          ],
          paragraphs: [
            {
              uz: "Termin tasdig‘i hujjatlar checklistini almashtirmaydi. Ariza to‘liq bo‘lmasa, jarayon kechikishi, qo‘shimcha hujjat so‘ralishi yoki TLS qoidalariga ko‘ra topshirish qabul qilinmasligi mumkin.",
              de: "Die Terminbestätigung ersetzt nicht die Unterlagencheckliste. Bei unvollständigem Antrag kann sich das Verfahren verzögern, es können Nachforderungen entstehen oder die Annahme kann nach den TLS-Regeln abgelehnt werden.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Termin bron qilish, o‘zgartirish va bekor qilish",
            de: "Termin buchen, ändern und stornieren",
          },
          paragraphs: [
            {
              uz: "TLS tizimida avval akkaunt yaratiladi, viza turi tanlanadi, shaxsiy ma’lumotlar kiritiladi va mavjud sana-vaqt bron qilinadi. Toshkentdagi TLS sahifasida amaldagi xizmat to‘lovi bron jarayonida onlayn to‘lanishi ko‘rsatiladi.",
              de: "Im TLS-System wird zunächst ein Konto erstellt, der Visumtyp gewählt, persönliche Daten eingetragen und ein verfügbarer Termin gebucht. Die TLS-Seite für Taschkent weist darauf hin, dass die aktuelle Servicegebühr während der Terminbuchung online bezahlt wird.",
            },
            {
              uz: "Termin vaqtini o‘zgartirish yoki bekor qilish imkoniyati tizim qoidalari va mavjud bo‘sh joylarga bog‘liq. Yangi sana mavjud bo‘lmasa, eski terminni shoshilib bekor qilish xavfli.",
              de: "Umbuchung oder Stornierung hängen von den Systemregeln und verfügbaren Zeitfenstern ab. Ist kein neuer Termin verfügbar, sollte ein bestehender Termin nicht vorschnell storniert werden.",
            },
            {
              uz: "Terminga bora olmasangiz, tizimdagi ko‘rsatma bo‘yicha imkon qadar erta bekor qiling. Shunchaki bormaslik kelajakdagi bron, qayta to‘lov yoki akkaunt bilan bog‘liq muammolarga olib kelishi mumkin.",
              de: "Können Sie den Termin nicht wahrnehmen, stornieren Sie ihn möglichst früh nach den Systemvorgaben. Einfaches Nichterscheinen kann zu Problemen bei Neubuchung, erneuter Zahlung oder Kontonutzung führen.",
            },
          ],
          items: [
            {
              uz: "Bron tasdig‘ini darhol saqlang va screenshot yoki PDF nusxa yarating.",
              de: "Speichern Sie die Buchungsbestätigung sofort und erstellen Sie eine Screenshot- oder PDF-Kopie.",
            },
            {
              uz: "Termin joyi va manzilini tasdiq xatidan tekshiring; elchixona va TLS markazi bir xil joy emas.",
              de: "Prüfen Sie Ort und Adresse in der Bestätigung; Botschaft und TLS-Zentrum sind nicht derselbe Standort.",
            },
            {
              uz: "Termin sanasidan oldin markaz manzili o‘zgarmaganini rasmiy saytdan qayta tekshiring.",
              de: "Prüfen Sie vor dem Termin auf der offiziellen Website, ob sich die Adresse des Zentrums geändert hat.",
            },
            {
              uz: "Vaqtidan oldin yetib boring, lekin rasmiy markaz ko‘rsatgan qabul vaqtidan haddan tashqari erta emas.",
              de: "Erscheinen Sie rechtzeitig, aber nicht unangemessen früh entgegen den Vorgaben des Zentrums.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Firibgarlardan himoyalanish va ko‘p uchraydigan xatolar",
            de: "Schutz vor Betrug und häufige Fehler",
          },
          items: [
            {
              uz: "TLScontact Toshkent terminlar faqat rasmiy TLS sayti orqali olinishi va termin sotuvchi vositachilardan ehtiyot bo‘lish kerakligini ogohlantiradi.",
              de: "TLScontact Taschkent warnt ausdrücklich davor, Termine über Vermittler zu kaufen; Buchungen dürfen nur über die offizielle TLS-Website erfolgen.",
            },
            {
              uz: "Germaniya Tashqi ishlar vazirligi rasmiy termin tizimi barcha uchun bir xil ekanini va agentliklarda maxsus yoki ustuvor kirish yo‘qligini bildiradi.",
              de: "Das Auswärtige Amt stellt klar, dass die Buchungsmöglichkeiten für alle gleich sind und Agenturen keinen besonderen oder bevorzugten Zugang besitzen.",
            },
            {
              uz: "Telegram, Instagram yoki boshqa messenjer orqali pasport nusxasi va akkaunt parolini noma’lum shaxsga yubormang.",
              de: "Senden Sie Passkopien und Kontopasswörter nicht über Telegram, Instagram oder andere Messenger an unbekannte Personen.",
            },
            {
              uz: "Noto‘g‘ri viza turini tanlash, ism yoki pasport raqamini xato kiritish terminning bekor qilinishi yoki ariza qabul qilinmasligiga olib kelishi mumkin.",
              de: "Falsche Visumkategorie sowie fehlerhafte Namens- oder Passdaten können zur Stornierung oder Nichtannahme des Antrags führen.",
            },
            {
              uz: "Termin tasdig‘idagi QR-kod, referens raqam yoki shaxsiy ma’lumotni ochiq guruhlarda ulashmang.",
              de: "Veröffentlichen Sie QR-Code, Referenznummer oder persönliche Angaben der Terminbestätigung nicht in offenen Gruppen.",
            },
            {
              uz: "TLS hujjatlarni qabul qiladi va elchixonaga uzatadi; viza qarorini TLS emas, Germaniya vakolatxonasi qabul qiladi.",
              de: "TLS nimmt Unterlagen entgegen und leitet sie weiter; die Visumentscheidung trifft nicht TLS, sondern die deutsche Auslandsvertretung.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Viza maqsadini aniqlang",
            de: "Visumzweck bestimmen",
          },
          description: {
            uz: "Schengen tashrifi, Ausbildung, ish, Studium, Chancenkarte yoki oila birlashtirishdan qaysi biri sizga mosligini rasmiy manbada tekshiring.",
            de: "Prüfen Sie offiziell, ob Schengenbesuch, Ausbildung, Beschäftigung, Studium, Chancenkarte oder Familiennachzug zu Ihrer Situation passt.",
          },
        },
        {
          title: {
            uz: "Vakolatxona sahifasini oching",
            de: "Seite der Auslandsvertretung öffnen",
          },
          description: {
            uz: "Toshkentdagi Germaniya elchixonasining aynan shu kategoriya sahifasidagi termin ko‘rsatmasini o‘qing.",
            de: "Lesen Sie die Terminhinweise auf der speziellen Kategorieseite der Deutschen Botschaft Taschkent.",
          },
        },
        {
          title: {
            uz: "Rasmiy tizimda akkaunt yarating",
            de: "Im offiziellen System registrieren",
          },
          description: {
            uz: "Ko‘rsatmaga qarab TLScontact yoki Auslandsportal akkauntini shaxsiy emailingiz bilan yarating.",
            de: "Erstellen Sie je nach Vorgabe ein TLScontact- oder Auslandsportal-Konto mit Ihrer persönlichen E-Mail-Adresse.",
          },
        },
        {
          title: {
            uz: "Ma’lumotlarni pasportdan kiriting",
            de: "Daten aus dem Pass übernehmen",
          },
          description: {
            uz: "Ism, familiya, tug‘ilgan sana va pasport raqamini aynan hujjatdagi yozuv bilan kiriting.",
            de: "Übertragen Sie Name, Geburtsdatum und Passnummer exakt aus dem Reisepass.",
          },
        },
        {
          title: {
            uz: "To‘g‘ri kategoriyani tanlang",
            de: "Richtige Kategorie auswählen",
          },
          description: {
            uz: "Viza huquqiy maqsadiga mos bo‘lmagan kategoriya bilan termin bron qilmang.",
            de: "Buchen Sie keinen Termin in einer Kategorie, die nicht zum rechtlichen Aufenthaltszweck passt.",
          },
        },
        {
          title: {
            uz: "Mavjud vaqtni bron qiling",
            de: "Verfügbaren Termin buchen",
          },
          description: {
            uz: "Sana, vaqt, joy va kerak bo‘lsa xizmat to‘lovini tekshirib, bronni yakunlang.",
            de: "Prüfen Sie Datum, Uhrzeit, Ort und gegebenenfalls Servicegebühr und schließen Sie die Buchung ab.",
          },
        },
        {
          title: {
            uz: "Tasdiqni saqlang",
            de: "Bestätigung sichern",
          },
          description: {
            uz: "Email tasdig‘i, referens raqam va bron ma’lumotlarini xavfsiz saqlang.",
            de: "Speichern Sie E-Mail-Bestätigung, Referenznummer und Buchungsdaten sicher.",
          },
        },
        {
          title: {
            uz: "Hujjatlarni checklist bo‘yicha tayyorlang",
            de: "Unterlagen nach Checkliste vorbereiten",
          },
          description: {
            uz: "Termin sanasigacha barcha asl hujjat, nusxa, tarjima va ariza formalarini yakunlang.",
            de: "Vervollständigen Sie bis zum Termin sämtliche Originale, Kopien, Übersetzungen und Antragsformulare.",
          },
        },
        {
          title: {
            uz: "Termin kuni shaxsan qatnashing",
            de: "Termin persönlich wahrnehmen",
          },
          description: {
            uz: "Belgilangan joyga vaqtida boring, biometrika topshiring va hujjatlarni taqdim eting.",
            de: "Erscheinen Sie pünktlich am angegebenen Ort, geben Sie Biometrie ab und reichen Sie die Unterlagen ein.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Termin olish pullikmi?",
            de: "Ist die Terminbuchung kostenpflichtig?",
          },
          answer: {
            uz: "Elchixonaning rasmiy termin tizimi bepul. TLS orqali topshirishda esa rasmiy xizmat to‘lovi mavjud bo‘lishi mumkin va u TLS ko‘rsatmasi bo‘yicha to‘lanadi. Vositachiga terminning o‘zi uchun pul bermang.",
            de: "Das offizielle Terminvergabesystem der Botschaft ist kostenlos. Bei Einreichung über TLS kann eine offizielle Servicegebühr anfallen, die nach TLS-Vorgabe bezahlt wird. Zahlen Sie keinem Vermittler für den Termin selbst.",
          },
        },
        {
          question: {
            uz: "Termin topilmasa nima qilish kerak?",
            de: "Was tun, wenn kein Termin verfügbar ist?",
          },
          answer: {
            uz: "Faqat rasmiy tizimni muntazam tekshiring va vakolatxonaning kutish ro‘yxati yoki yangi bron tizimi haqidagi ko‘rsatmalariga amal qiling. Vositachining «yashirin slot» va’dasiga ishonmang.",
            de: "Prüfen Sie ausschließlich das offizielle System regelmäßig und folgen Sie Hinweisen zu Warteliste oder neuer Buchungslogik. Vertrauen Sie keinen Versprechen über „versteckte Slots“.",
          },
        },
        {
          question: {
            uz: "Auslandsportalda ariza bergan bo‘lsam, yana termin kerakmi?",
            de: "Brauche ich nach einem Antrag im Auslandsportal noch einen Termin?",
          },
          answer: {
            uz: "Ha, odatda biometrika va asl hujjatlarni ko‘rsatish uchun shaxsiy termin baribir talab qilinadi.",
            de: "Ja. Für Biometrie und Vorlage der Originalunterlagen ist grundsätzlich weiterhin ein persönlicher Termin erforderlich.",
          },
        },
        {
          question: {
            uz: "VIDEX orqali termin olinadimi?",
            de: "Wird der Termin über VIDEX gebucht?",
          },
          answer: {
            uz: "Yo‘q. VIDEX asosan ariza formasini elektron to‘ldirish vositasi. Termin alohida TLS yoki elchixona tizimi orqali olinadi.",
            de: "Nein. VIDEX dient hauptsächlich zum elektronischen Ausfüllen des Antrags. Der Termin wird gesondert über TLS oder das Botschaftssystem gebucht.",
          },
        },
        {
          question: {
            uz: "Termin vaqtini o‘zgartirish mumkinmi?",
            de: "Kann ein Termin umgebucht werden?",
          },
          answer: {
            uz: "Tizim va mavjud joylarga qarab mumkin bo‘lishi mumkin. Yangi sana mavjudligini tekshirmasdan eski terminni bekor qilmang.",
            de: "Je nach System und Verfügbarkeit kann eine Umbuchung möglich sein. Stornieren Sie den bestehenden Termin nicht, bevor eine neue Möglichkeit geklärt ist.",
          },
        },
        {
          question: {
            uz: "Terminga bora olmasam nima qilaman?",
            de: "Was tun, wenn ich den Termin nicht wahrnehmen kann?",
          },
          answer: {
            uz: "Akkaunt yoki tasdiq xatidagi bekor qilish tartibidan foydalaning. Imkon qadar erta bekor qiling va qayta bron hamda xizmat to‘lovi qoidalarini tekshiring.",
            de: "Nutzen Sie die Stornierungsfunktion im Konto oder in der Bestätigung. Stornieren Sie möglichst früh und prüfen Sie Regeln zur Neubuchung und Servicegebühr.",
          },
        },
        {
          question: {
            uz: "Agentlik men uchun tezroq termin topa oladimi?",
            de: "Kann eine Agentur schneller einen Termin bekommen?",
          },
          answer: {
            uz: "Rasmiy manbalarga ko‘ra yo‘q. Agentliklar rasmiy tizimga maxsus yoki ustuvor kirishga ega emas.",
            de: "Nach offiziellen Angaben nein. Agenturen besitzen keinen besonderen oder bevorzugten Zugang zum offiziellen System.",
          },
        },
        {
          question: {
            uz: "Oila uchun bitta termin yetadimi?",
            de: "Reicht ein Termin für die ganze Familie?",
          },
          answer: {
            uz: "Bu tizim va viza kategoriyasiga bog‘liq. Har bir arizachi uchun individual ariza talab qilinadi; group yoki family booking imkoniyatini bron tizimida tekshiring.",
            de: "Das hängt von System und Kategorie ab. Für jede Person ist ein eigener Antrag erforderlich; prüfen Sie im Buchungssystem die Möglichkeit einer Gruppen- oder Familienbuchung.",
          },
        },
        {
          question: {
            uz: "TLS viza berish yoki rad etish qarorini qabul qiladimi?",
            de: "Entscheidet TLS über Erteilung oder Ablehnung?",
          },
          answer: {
            uz: "Yo‘q. TLS ariza va hujjatlarni qabul qilib Germaniya vakolatxonasiga yuboradi. Qarorni elchixona yoki tegishli Germaniya idoralari qabul qiladi.",
            de: "Nein. TLS nimmt Antrag und Unterlagen entgegen und leitet sie an die deutsche Auslandsvertretung weiter. Die Entscheidung treffen die Botschaft und gegebenenfalls zuständige deutsche Behörden.",
          },
        },
      ],
      sources: [
        {
          title: "Terminvereinbarung zur Beantragung eines Visums",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/1444004-1444004",
          language: "de",
        },
        {
          title: "Nationales Visum über 90 Tage",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/1604022-1604022",
          language: "de",
        },
        {
          title: "Application procedure",
          organization: "TLScontact Taschkent",
          url: "https://visas-de.tlscontact.com/en-us/country/uz/vac/uzTAS2de/application-process",
          language: "en",
        },
        {
          title: "Documents and Visa Types",
          organization: "TLScontact Taschkent",
          url: "https://visas-de.tlscontact.com/en-us/country/uz/vac/uzTAS2de/visa-types",
          language: "en",
        },
        {
          title: "Fraud alert",
          organization: "TLScontact Taschkent",
          url: "https://visas-de.tlscontact.com/en-us/country/uz/vac/uzTAS2de/scam-alert",
          language: "en",
        },
        {
          title: "Questions about our online appointment booking system",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/2530968-2530968",
          language: "en",
        },
        {
          title: "Consular Services Portal",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
          language: "en",
        },
      ],
      relatedArticleSlugs: ["national-visa"],
    },
] satisfies ReadonlyArray<LocalizedGuideArticle>;
