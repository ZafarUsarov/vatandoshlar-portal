import type { LocalizedGuideArticle } from "../../../types/guide";

export const visaArticles = [
  {
      id: "national-visa",
      slug: "national-visa",
      categorySlug: "visas",
      title: {
        uz: "Germaniya milliy vizasi",
        de: "Nationales Visum für Deutschland",
      },
      excerpt: {
        uz: "Germaniyada 90 kundan ortiq yashash uchun D turdagi milliy viza: Schengen vizasidan farqi, viza maqsadini tanlash, Auslandsportal, VIDEX, hujjatlar, termin, biometrika, Ausländerbehörde, ko‘rib chiqish muddati, rad javobi va Germaniyaga kelgandan keyingi Aufenthaltstitel jarayoni.",
        de: "Leitfaden zum nationalen Visum der Kategorie D für Aufenthalte über 90 Tage: Unterschied zum Schengenvisum, Aufenthaltszweck, Auslandsportal, VIDEX, Unterlagen, Termin, Biometrie, Ausländerbehörde, Bearbeitungsdauer, Ablehnung und Aufenthaltstitel nach der Einreise.",
      },
      intro: {
        uz: "Milliy viza — Germaniyada 90 kundan ortiq muddatga ma’lum bir qonuniy maqsad bilan yashash uchun kirish vizasidir. U Ausbildung, ish, Studium, Chancenkarte, Au Pair, FSJ/BFD, til kursi yoki oila birlashtirish kabi maqsadlar uchun beriladi. Milliy viza o‘zi alohida «umumiy ruxsat» emas: ariza beruvchi aynan qaysi yashash maqsadiga topshirayotganini tanlaydi va shu maqsadga tegishli barcha hujjatlarni isbotlaydi.",
        de: "Das nationale Visum ist ein Einreisevisum für einen längerfristigen Aufenthalt von mehr als 90 Tagen zu einem bestimmten gesetzlichen Zweck. Es wird etwa für Ausbildung, Beschäftigung, Studium, Chancenkarte, Au-pair, FSJ/BFD, Sprachkurs oder Familiennachzug erteilt. Es ist keine allgemeine Aufenthaltserlaubnis: Antragstellende müssen einen konkreten Aufenthaltszweck wählen und sämtliche hierfür erforderlichen Voraussetzungen nachweisen.",
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
          label: { uz: "Viza turi", de: "Visumkategorie" },
          value: {
            uz: "Kategoriya D — 90 kundan ortiq uzoq muddatli yashash uchun",
            de: "Kategorie D — für längerfristige Aufenthalte über 90 Tage",
          },
        },
        {
          label: { uz: "Huquqiy asos", de: "Rechtsgrundlage" },
          value: {
            uz: "Asosan §6 Abs. 3 AufenthG va tanlangan yashash maqsadining tegishli qoidalari",
            de: "Grundsätzlich § 6 Abs. 3 AufenthG und die Vorschriften des gewählten Aufenthaltszwecks",
          },
        },
        {
          label: { uz: "Ariza berish joyi", de: "Antragstellung" },
          value: {
            uz: "Odatda Germaniyaga kirishdan oldin mas’ul Germaniya vakolatxonasida",
            de: "Grundsätzlich vor der Einreise bei der zuständigen deutschen Auslandsvertretung",
          },
        },
        {
          label: { uz: "O‘zbekiston bo‘yicha", de: "Für Usbekistan" },
          value: {
            uz: "Milliy viza topshirish toifaga qarab elchixona yoki TLS orqali, oldindan termin bilan",
            de: "Antragstellung je nach Kategorie bei Botschaft oder TLS und nur mit vorherigem Termin",
          },
        },
        {
          label: { uz: "Ko‘rib chiqish", de: "Bearbeitung" },
          value: {
            uz: "Ausländerbehörde yoki Bundesagentur für Arbeit ishtirok etsa bir necha oy davom etishi mumkin",
            de: "Bei Beteiligung von Ausländerbehörde oder Bundesagentur für Arbeit kann das Verfahren mehrere Monate dauern",
          },
        },
        {
          label: { uz: "Rad javobi", de: "Ablehnung" },
          value: {
            uz: "2025-yil 1-iyuldan viza rad javobini vakolatxonada qayta ko‘rib chiqishni so‘rash tartibi (remonstratsiya) bekor qilingan; yangi ariza topshirish yoki sud orqali huquqiy himoya yo‘lidan foydalanish mumkin",
            de: "Seit 1. Juli 2025 ist die Remonstration abgeschafft; regelmäßig bleiben Neuantrag oder gerichtliches Verfahren",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Milliy viza va Schengen vizasi o‘rtasidagi farq",
            de: "Unterschied zwischen nationalem Visum und Schengenvisum",
          },
          paragraphs: [
            {
              uz: "Schengen vizasi odatda 180 kunlik davr ichida ko‘pi bilan 90 kunlik qisqa tashriflar uchun ishlatiladi. Milliy viza esa Germaniyada 90 kundan ortiq yashash va keyinchalik tegishli Aufenthaltstitel olish maqsadiga xizmat qiladi.",
              de: "Ein Schengenvisum dient grundsätzlich Kurzaufenthalten von höchstens 90 Tagen innerhalb eines Zeitraums von 180 Tagen. Das nationale Visum ermöglicht dagegen die Einreise für einen längerfristigen Aufenthalt und den anschließenden Erhalt des passenden Aufenthaltstitels.",
            },
            {
              uz: "Milliy viza kategoriya D sifatida beriladi. U odatda ma’lum muddatga kirish va boshlang‘ich yashash huquqini beradi. Germaniyaga kelgach, agar vizaning o‘zi butun rejalashtirilgan muddatni qamramasa, Ausländerbehörde orqali elektron Aufenthaltstitel rasmiylashtiriladi.",
              de: "Das nationale Visum wird als Kategorie D erteilt. Es berechtigt zur Einreise und zum anfänglichen Aufenthalt für einen bestimmten Zeitraum. Nach der Einreise wird, sofern das Visum nicht bereits den gesamten Aufenthaltszeitraum abdeckt, bei der Ausländerbehörde der elektronische Aufenthaltstitel beantragt.",
            },
            {
              uz: "D vizasi bilan, viza amal qilish shartlariga rioya qilgan holda, boshqa Schengen davlatlarida ham 180 kun ichida 90 kungacha qisqa safar qilish mumkin. Bu boshqa davlatda ishlash yoki yashash huquqini bermaydi.",
              de: "Mit einem gültigen D-Visum sind innerhalb der Gültigkeit grundsätzlich auch Kurzreisen in andere Schengen-Staaten bis zu 90 Tagen je 180-Tage-Zeitraum möglich. Daraus entsteht kein Recht, dort zu arbeiten oder dauerhaft zu leben.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi maqsadlar uchun milliy viza olinadi?",
            de: "Für welche Zwecke wird ein nationales Visum beantragt?",
          },
          items: [
            {
              uz: "Ausbildung yoki Ausbildung joyini qidirish",
              de: "Berufsausbildung oder Suche nach einem Ausbildungsplatz",
            },
            {
              uz: "Malakali ish, EU Blue Card, ilmiy faoliyat yoki mustaqil tadbirkorlik",
              de: "Qualifizierte Beschäftigung, Blaue Karte EU, Forschung oder selbstständige Tätigkeit",
            },
            {
              uz: "Studium, Studienkolleg, Studienbewerbung yoki ilmiy tayyorgarlik",
              de: "Studium, Studienkolleg, Studienbewerbung oder wissenschaftliche Vorbereitung",
            },
            {
              uz: "Chancenkarte yoki ish qidirishning boshqa qonuniy yo‘llari",
              de: "Chancenkarte oder andere gesetzliche Wege der Arbeitssuche",
            },
            {
              uz: "Au Pair, FSJ, BFD yoki boshqa tan olingan ixtiyoriy xizmat",
              de: "Au-pair, FSJ, BFD oder ein anderer anerkannter Freiwilligendienst",
            },
            {
              uz: "Oila birlashtirish: turmush o‘rtog‘i, farzand, ota-ona yoki maxsus oilaviy holatlar",
              de: "Familiennachzug zu Ehegatten, Kindern, Eltern oder in besonderen Familienkonstellationen",
            },
            {
              uz: "Intensiv til kursi yoki malakani tan oldirish chorasi",
              de: "Intensivsprachkurs oder Maßnahme zur Anerkennung einer Qualifikation",
            },
          ],
        },
        requirements: {
          title: {
            uz: "To‘g‘ri viza maqsadini tanlash",
            de: "Den richtigen Visumzweck wählen",
          },
          paragraphs: [
            {
              uz: "Eng muhim qadam — «milliy viza»ni umumiy nom sifatida emas, aniq yashash maqsadi sifatida tanlash. Masalan, Ausbildung, Chancenkarte va Familiennachzug bir xil D vizasi doirasida bo‘lsa ham, ularning qonuniy talablari va hujjatlari butunlay boshqacha.",
              de: "Der wichtigste Schritt ist, das nationale Visum nicht nur als Oberbegriff, sondern mit dem konkreten Aufenthaltszweck zu beantragen. Ausbildung, Chancenkarte und Familiennachzug gehören zwar zur Kategorie D, haben jedoch völlig unterschiedliche gesetzliche Voraussetzungen und Unterlagen.",
            },
            {
              uz: "Noto‘g‘ri kategoriya tanlansa, hujjatlar to‘liq bo‘lsa ham ariza kechikishi yoki rad etilishi mumkin. Ariza berishdan oldin Germaniya vakolatxonasining aynan shu maqsad uchun yozilgan sahifasi va checklistini tekshiring.",
              de: "Wird die falsche Kategorie gewählt, kann der Antrag trotz vollständiger Unterlagen verzögert oder abgelehnt werden. Prüfen Sie vor Antragstellung die spezielle Informationsseite und Checkliste der Auslandsvertretung für genau diesen Zweck.",
            },
            {
              uz: "Vatandoshlar.de tavsiyasi: avval huquqiy maqsadni aniqlang, keyin termin yoki portalni tanlang. Termin mavjudligi qaysi vizaga haqingiz borligini belgilamaydi.",
              de: "Praktische Empfehlung von Vatandoshlar.de: Bestimmen Sie zuerst die richtige Rechtsgrundlage und wählen Sie erst danach Portal oder Terminweg. Die Verfügbarkeit eines Termins entscheidet nicht darüber, ob die Voraussetzungen für ein Visum erfüllt sind.",
            },
          ],
          items: [
            {
              uz: "Ish shartnomasi bo‘lsa, Chancenkarte o‘rniga to‘g‘ridan-to‘g‘ri ish vizasi mos bo‘lishi mumkin.",
              de: "Liegt bereits ein Arbeitsvertrag vor, kann statt der Chancenkarte direkt ein Beschäftigungsvisum passend sein.",
            },
            {
              uz: "Faqat til o‘rganish maqsadi bilan Ausbildung yoki Studium vizasiga topshirib bo‘lmaydi.",
              de: "Ein reiner Sprachlernzweck kann nicht als Ausbildungs- oder Studienvisum beantragt werden.",
            },
            {
              uz: "Mehmon tashrifi uchun milliy viza emas, odatda Schengen vizasi kerak.",
              de: "Für einen bloßen Besuch ist grundsätzlich kein nationales, sondern ein Schengenvisum erforderlich.",
            },
            {
              uz: "Turistik viza orqali kirib, Germaniyada albatta uzoq muddatli vizaga o‘tish rejasiga tayanmang.",
              de: "Verlassen Sie sich nicht auf den Plan, mit einem Besuchsvisum einzureisen und den Aufenthaltszweck in Deutschland sicher zu wechseln.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Umumiy hujjatlar va maqsadga xos dalillar",
            de: "Allgemeine und zweckspezifische Unterlagen",
          },
          items: [
            {
              uz: "Amaldagi pasport va to‘liq to‘ldirilgan milliy viza arizasi",
              de: "Gültiger Reisepass und vollständig ausgefüllter Antrag auf ein nationales Visum",
            },
            {
              uz: "Biometrik fotosurat va vakolatxona talab qilgan nusxalar",
              de: "Biometrisches Passfoto und die von der Auslandsvertretung verlangten Kopien",
            },
            {
              uz: "Yashash maqsadini isbotlovchi asosiy hujjat: ish yoki Ausbildung shartnomasi, universitet qabul xati, nikoh guvohnomasi va hokazo",
              de: "Zentraler Nachweis des Aufenthaltszwecks, etwa Arbeits- oder Ausbildungsvertrag, Hochschulzulassung oder Heiratsurkunde",
            },
            {
              uz: "Til darajasi talab qilinsa tan olingan sertifikat yoki qonuniy istisno dalili",
              de: "Soweit erforderlich anerkannter Sprachnachweis oder Nachweis einer gesetzlichen Ausnahme",
            },
            {
              uz: "Moliyaviy ta’minot: maosh, Sperrkonto, Verpflichtungserklärung, stipendiya yoki maqsadga mos boshqa dalil",
              de: "Finanzierungsnachweis durch Einkommen, Sperrkonto, Verpflichtungserklärung, Stipendium oder einen anderen zweckgeeigneten Nachweis",
            },
            {
              uz: "Tibbiy sug‘urta bo‘yicha viza turiga mos dalil",
              de: "Zum Visumzweck passender Nachweis des Krankenversicherungsschutzes",
            },
            {
              uz: "Diplom, kasbiy malaka, Anerkennung, ZAB yoki Bundesagentur für Arbeit bilan bog‘liq hujjatlar — talab qilinadigan holatlarda",
              de: "Unterlagen zu Abschluss, Berufsqualifikation, Anerkennung, ZAB oder Bundesagentur für Arbeit — soweit erforderlich",
            },
            {
              uz: "Fuqarolik holati hujjatlari uchun apostil, legalizatsiya yoki rasmiy tarjima — checklistga qarab",
              de: "Apostille, Legalisation oder beglaubigte Übersetzung von Personenstandsurkunden — nach Checkliste",
            },
            {
              uz: "Mas’ul vakolatxona individual holat bo‘yicha talab qilgan qo‘shimcha hujjatlar",
              de: "Weitere Unterlagen nach individueller Anforderung der zuständigen Auslandsvertretung",
            },
          ],
          paragraphs: [
            {
              uz: "Bitta umumiy «D viza hujjatlari ro‘yxati» barcha kategoriyalar uchun yetarli emas. Har bir viza maqsadining alohida checklisti asosiy manba hisoblanadi.",
              de: "Eine einzige allgemeine Unterlagenliste für alle D-Visa reicht nicht aus. Maßgeblich ist die spezielle Checkliste des jeweiligen Aufenthaltszwecks.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Auslandsportal, VIDEX, termin va ko‘rib chiqish",
            de: "Auslandsportal, VIDEX, Termin und Bearbeitung",
          },
          paragraphs: [
            {
              uz: "Ko‘plab milliy viza turlari bo‘yicha arizani Konsullik xizmatlari portali orqali onlayn boshlash mumkin. Portal hujjatlarni oldindan yuklash va ayrim hollarda dastlabki tekshiruv imkonini beradi, lekin biometrika va asl hujjatlar uchun shaxsiy termin baribir talab qilinadi.",
              de: "Viele nationale Visaverfahren können über das Auslandsportal online begonnen werden. Dort lassen sich Unterlagen hochladen und teilweise vorprüfen; für Biometrie und Originaldokumente bleibt jedoch ein persönlicher Termin erforderlich.",
            },
            {
              uz: "Ba’zi kategoriyalar yoki vakolatxona tartibida VIDEX arizasi, elchixona termin tizimi yoki TLS xizmatidan foydalanilishi mumkin. Toshkentda milliy vizaga hujjat topshirish viza kategoriyasiga qarab elchixona yoki TLS orqali amalga oshiriladi.",
              de: "Je nach Kategorie und Verfahren können VIDEX, das Terminvergabesystem der Botschaft oder der Dienstleister TLS genutzt werden. In Taschkent erfolgt die Abgabe nationaler Visumanträge abhängig von der Kategorie bei der Botschaft oder über TLS.",
            },
            {
              uz: "Ausländerbehörde roziligi talab qilinadigan jarayonlarda ish uch oygacha, ayrim hollarda undan ham uzoq davom etishi mumkin. Bundesagentur für Arbeit, Urkundenprüfung yoki qo‘shimcha tekshiruvlar ham muddatni uzaytiradi.",
              de: "Ist die Zustimmung der Ausländerbehörde erforderlich, kann das Verfahren bis zu drei Monate und gelegentlich länger dauern. Beteiligung der Bundesagentur für Arbeit, Urkundenprüfung oder weitere Prüfungen können die Bearbeitung verlängern.",
            },
          ],
          items: [
            {
              uz: "Termin olishning o‘zi viza talablari bajarilganini anglatmaydi.",
              de: "Ein Termin bedeutet nicht, dass die Visumvoraussetzungen erfüllt sind.",
            },
            {
              uz: "Portalga hujjat yuklash shaxsiy terminni to‘liq bekor qilmaydi.",
              de: "Das Hochladen im Portal ersetzt den persönlichen Termin nicht vollständig.",
            },
            {
              uz: "Ko‘rib chiqish muddati barcha arizalar uchun bir xil emas.",
              de: "Die Bearbeitungsdauer ist nicht für alle Anträge gleich.",
            },
            {
              uz: "Qo‘shimcha hujjat so‘ralsa, belgilangan muddatda aniq va to‘liq javob bering.",
              de: "Reagieren Sie auf Nachforderungen vollständig und innerhalb der gesetzten Frist.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Rad javobi, firibgarlik va muhim xatolar",
            de: "Ablehnung, Betrug und wichtige Fehler",
          },
          items: [
            {
              uz: "2025-yil 1-iyuldan Germaniya vizalari bo‘yicha remonstratsiya — ya’ni viza rad etilgandan keyin Germaniya vakolatxonasidan qarorni qayta ko‘rib chiqishni so‘rash tartibi — butun dunyo bo‘ylab bekor qilingan. Rad javobidan keyin yangi viza arizasi topshirish yoki rad qarorida ko‘rsatilgan huquqiy himoya yo‘lidan foydalanish mumkin.",
              de: "Seit dem 1. Juli 2025 ist das Remonstrationsverfahren für deutsche Visumentscheidungen weltweit abgeschafft. Nach einer Ablehnung kommen grundsätzlich ein verbesserter Neuantrag oder die Prüfung gerichtlichen Rechtsschutzes innerhalb der Rechtsbehelfsfrist in Betracht.",
            },
            {
              uz: "Rad javobidagi sababni tushunmasdan xuddi shu hujjatlar bilan qayta topshirmang.",
              de: "Stellen Sie nicht unverändert erneut denselben Antrag, ohne die Ablehnungsgründe zu verstehen.",
            },
            {
              uz: "Rasmiy termin tizimi uchun «maxsus kirish», «ichki tanish» yoki kafolatlangan tez viza va’da qiladigan vositachilarga ishonmang.",
              de: "Misstrauen Sie Vermittlern, die besonderen Terminzugang, interne Kontakte oder ein garantiert schnelles Visum versprechen.",
            },
            {
              uz: "Soxta bank hujjati, shartnoma, til sertifikati yoki oilaviy hujjat viza radiga va huquqiy oqibatlarga olib kelishi mumkin.",
              de: "Gefälschte Bankunterlagen, Verträge, Sprachzertifikate oder Familienurkunden können zur Ablehnung und zu rechtlichen Folgen führen.",
            },
            {
              uz: "Viza chiqmasdan ishni, uyni yoki o‘qishni qaytarib bo‘lmaydigan tarzda bekor qilishga shoshilmang.",
              de: "Kündigen Sie Arbeit, Wohnung oder Ausbildung nicht vorschnell und unwiderruflich vor Erteilung des Visums.",
            },
            {
              uz: "Viza yorlig‘idagi ism, pasport raqami, amal qilish muddati va ruxsat etilgan maqsadni safardan oldin tekshiring.",
              de: "Prüfen Sie vor der Reise Name, Passnummer, Gültigkeitszeitraum und Zweckangaben auf dem Visumetikett.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Aniq yashash maqsadini tanlang",
            de: "Konkreten Aufenthaltszweck bestimmen",
          },
          description: {
            uz: "Ausbildung, ish, Studium, Chancenkarte, oila yoki boshqa maqsadlardan qaysi biri qonuniy holatingizga mosligini aniqlang.",
            de: "Klären Sie, ob Ausbildung, Beschäftigung, Studium, Chancenkarte, Familie oder ein anderer Zweck rechtlich zu Ihrer Situation passt.",
          },
        },
        {
          title: {
            uz: "Rasmiy checklistni toping",
            de: "Offizielle Checkliste aufrufen",
          },
          description: {
            uz: "Toshkentdagi Germaniya vakolatxonasining aynan tanlangan kategoriya uchun joriy sahifasi va hujjatlar ro‘yxatini tekshiring.",
            de: "Prüfen Sie die aktuelle Informationsseite und Unterlagenliste der deutschen Auslandsvertretung in Taschkent für die gewählte Kategorie.",
          },
        },
        {
          title: {
            uz: "Hujjatlarni mazmunan tayyorlang",
            de: "Unterlagen inhaltlich vorbereiten",
          },
          description: {
            uz: "Shartnoma, qabul xati, malaka, til, moliya, sug‘urta va fuqarolik hujjatlarini bir-biriga mos holda tayyorlang.",
            de: "Bereiten Sie Vertrag, Zulassung, Qualifikation, Sprache, Finanzierung, Versicherung und Personenstandsurkunden widerspruchsfrei vor.",
          },
        },
        {
          title: {
            uz: "To‘g‘ri portal yoki termin yo‘lini tanlang",
            de: "Richtigen Portal- oder Terminweg wählen",
          },
          description: {
            uz: "Kategoriya bo‘yicha Auslandsportal, elchixona yoki TLS ko‘rsatmasiga amal qiling.",
            de: "Folgen Sie je nach Kategorie dem Auslandsportal, der Botschaft oder den Vorgaben von TLS.",
          },
        },
        {
          title: {
            uz: "Onlayn arizani to‘liq yuboring",
            de: "Online-Antrag vollständig einreichen",
          },
          description: {
            uz: "Portal yoki VIDEXdagi barcha ma’lumotlarni hujjatlar bilan aynan mos kiriting.",
            de: "Tragen Sie im Portal oder in VIDEX sämtliche Angaben exakt entsprechend den Unterlagen ein.",
          },
        },
        {
          title: {
            uz: "Shaxsiy terminga boring",
            de: "Persönlichen Termin wahrnehmen",
          },
          description: {
            uz: "Asl hujjatlar, biometrika, kerakli nusxalar va tegishli to‘lov bilan belgilangan vaqtda qatnashing.",
            de: "Erscheinen Sie pünktlich mit Originalunterlagen, Biometrie, erforderlichen Kopien und gegebenenfalls der Gebühr.",
          },
        },
        {
          title: {
            uz: "Qo‘shimcha so‘rovlarga javob bering",
            de: "Nachforderungen beantworten",
          },
          description: {
            uz: "Vakolatxona, Ausländerbehörde yoki boshqa idora so‘ragan hujjatlarni muddatida yuboring.",
            de: "Reichen Sie angeforderte Unterlagen von Auslandsvertretung, Ausländerbehörde oder anderen Stellen fristgerecht ein.",
          },
        },
        {
          title: {
            uz: "Viza qarorini tekshiring",
            de: "Visumentscheidung prüfen",
          },
          description: {
            uz: "Viza berilsa yorliq ma’lumotlarini tekshiring; rad etilsa yozma sabab va huquqiy yo‘llarni tahlil qiling.",
            de: "Prüfen Sie bei Erteilung das Visumetikett; analysieren Sie bei Ablehnung die schriftlichen Gründe und möglichen Rechtswege.",
          },
        },
        {
          title: {
            uz: "Germaniyaga kelgach Aufenthaltstitelni oling",
            de: "Nach Einreise Aufenthaltstitel beantragen",
          },
          description: {
            uz: "Anmeldung, Krankenversicherung va Ausländerbehörde terminini viza muddati tugashidan oldin yakunlang.",
            de: "Erledigen Sie Anmeldung, Krankenversicherung und Antrag bei der Ausländerbehörde vor Ablauf des Visums.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Milliy viza va D viza bir xilmi?",
            de: "Sind nationales Visum und D-Visum dasselbe?",
          },
          answer: {
            uz: "Ha. Germaniyada uzoq muddatli yashash uchun beriladigan milliy viza odatda kategoriya D sifatida belgilanadi.",
            de: "Ja. Das nationale Visum für längerfristige Aufenthalte wird grundsätzlich als Kategorie D bezeichnet.",
          },
        },
        {
          question: {
            uz: "90 kundan kam qolish uchun milliy viza kerakmi?",
            de: "Braucht man für weniger als 90 Tage ein nationales Visum?",
          },
          answer: {
            uz: "Odatda yo‘q. Qisqa tashriflar uchun Schengen viza qoidalari qo‘llanadi. Biroq maqsad va faoliyat turiga qarab alohida talablar bo‘lishi mumkin.",
            de: "Grundsätzlich nein. Für Kurzaufenthalte gelten die Schengenvisumregeln. Je nach Zweck und Tätigkeit können jedoch besondere Vorgaben bestehen.",
          },
        },
        {
          question: {
            uz: "Milliy viza arizasini to‘liq onlayn yakunlash mumkinmi?",
            de: "Kann das nationale Visum vollständig online abgeschlossen werden?",
          },
          answer: {
            uz: "Ko‘p kategoriyada arizani onlayn boshlash mumkin, lekin biometrika va asl hujjatlar uchun shaxsiy termin odatda baribir kerak.",
            de: "Bei vielen Kategorien kann der Antrag online begonnen werden; für Biometrie und Originalunterlagen ist grundsätzlich weiterhin ein persönlicher Termin erforderlich.",
          },
        },
        {
          question: {
            uz: "VIDEX va Auslandsportal o‘rtasidagi farq nima?",
            de: "Was ist der Unterschied zwischen VIDEX und Auslandsportal?",
          },
          answer: {
            uz: "VIDEX elektron ariza formasini tayyorlash vositasi. Auslandsportal esa ayrim kategoriyalarda ariza va hujjatlarni onlayn topshirish hamda dastlabki tekshiruv uchun kengroq jarayonni beradi. Qaysi biri ishlatilishi vakolatxona va viza turiga bog‘liq.",
            de: "VIDEX dient der elektronischen Erstellung des Antragsformulars. Das Auslandsportal ermöglicht bei bestimmten Kategorien zusätzlich die Online-Einreichung und Vorprüfung von Unterlagen. Welcher Weg gilt, hängt von Auslandsvertretung und Visumkategorie ab.",
          },
        },
        {
          question: {
            uz: "Milliy viza qancha vaqtda chiqadi?",
            de: "Wie lange dauert ein nationales Visum?",
          },
          answer: {
            uz: "Yagona kafolatlangan muddat yo‘q. Ausländerbehörde ishtirok etsa jarayon uch oygacha, ayrim holatda undan ham uzoq davom etishi mumkin.",
            de: "Eine einheitlich garantierte Dauer gibt es nicht. Bei Beteiligung der Ausländerbehörde kann das Verfahren bis zu drei Monate und gelegentlich länger dauern.",
          },
        },
        {
          question: {
            uz: "D viza bilan boshqa Schengen davlatlariga borish mumkinmi?",
            de: "Darf man mit einem D-Visum andere Schengen-Staaten besuchen?",
          },
          answer: {
            uz: "Ha, viza shartlariga rioya qilgan holda 180 kun ichida 90 kungacha qisqa safar qilish mumkin. Bu boshqa davlatda ishlash yoki ko‘chib yashash huquqini bermaydi.",
            de: "Ja, grundsätzlich für Kurzreisen bis zu 90 Tagen innerhalb von 180 Tagen. Ein Arbeits- oder Daueraufenthaltsrecht in anderen Staaten entsteht dadurch nicht.",
          },
        },
        {
          question: {
            uz: "Viza rad etilsa qarorni qayta ko‘rib chiqishni so‘rash mumkinmi?",
            de: "Kann man nach einer Ablehnung remonstrieren?",
          },
          answer: {
            uz: "2025-yil 1-iyuldan remonstratsiya — ya’ni Germaniya vakolatxonasidan viza rad javobini qayta ko‘rib chiqishni so‘rash tartibi — bekor qilingan. Rad javobidan keyin yangi viza arizasi topshirish yoki rad qarorida ko‘rsatilgan huquqiy himoya yo‘lidan foydalanish mumkin.",
            de: "Nein. Seit dem 1. Juli 2025 ist das Remonstrationsverfahren abgeschafft. Möglich sind ein verbesserter Neuantrag oder die Prüfung gerichtlichen Rechtsschutzes innerhalb der angegebenen Frist.",
          },
        },
        {
          question: {
            uz: "Turistik viza bilan Germaniyada milliy vizaga o‘tish mumkinmi?",
            de: "Kann man mit Schengenvisum in Deutschland zum nationalen Aufenthalt wechseln?",
          },
          answer: {
            uz: "O‘zbekiston fuqarolari uchun umumiy xavfsiz qoida — uzoq muddatli maqsad uchun kirishdan oldin milliy viza olish. Germaniyada o‘zgartirish faqat cheklangan qonuniy istisnolarda mumkin.",
            de: "Für Staatsangehörige Usbekistans gilt als regulärer sicherer Weg die Beantragung des nationalen Visums vor der Einreise. Ein Wechsel in Deutschland ist nur in begrenzten gesetzlichen Ausnahmefällen möglich.",
          },
        },
        {
          question: {
            uz: "Viza olgach Germaniyada yana nima qilish kerak?",
            de: "Was muss nach der Einreise noch erledigt werden?",
          },
          answer: {
            uz: "Odatda Anmeldung, tibbiy sug‘urta va Ausländerbehörde orqali Aufenthaltstitel rasmiylashtiriladi. Aniq qadamlar viza maqsadiga bog‘liq.",
            de: "Grundsätzlich folgen Anmeldung, Krankenversicherung und Beantragung des Aufenthaltstitels bei der Ausländerbehörde. Die konkreten Schritte hängen vom Aufenthaltszweck ab.",
          },
        },
      ],
      sources: [
        {
          title: "§ 6 AufenthG — Visum",
          organization: "Bundesministerium der Justiz",
          url: "https://www.gesetze-im-internet.de/aufenthg_2004/__6.html",
          language: "de",
        },
        {
          title: "Längerfristige Aufenthalte über 90 Tage",
          organization: "Auswärtiges Amt",
          url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/nationale-visa",
          language: "de",
        },
        {
          title: "Allgemeine Informationen zur Visumbeantragung",
          organization: "Auswärtiges Amt",
          url: "https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/visabestimmungen-allgemein",
          language: "de",
        },
        {
          title: "Abolition of the remonstration procedure from 1 July 2025",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/2716462-2716462",
          language: "en",
        },
        {
          title: "Nationales Visum über 90 Tage",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/05-visaeinreise/1604022-1604022",
          language: "de",
        },
        {
          title: "Terminvereinbarung zur Beantragung eines Visums",
          organization: "Deutsche Botschaft Taschkent",
          url: "https://taschkent.diplo.de/uz-de/service/1444004-1444004",
          language: "de",
        },
        {
          title: "Consular Services Portal",
          organization: "Federal Foreign Office",
          url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
          language: "en",
        },
      ],
      relatedArticleSlugs: [
        "ausbildung",
        "chancenkarte",
        "au-pair",
        "fsj",
        "bfd",
        "spouse-reunification",
      ],
    },
] satisfies ReadonlyArray<LocalizedGuideArticle>;
