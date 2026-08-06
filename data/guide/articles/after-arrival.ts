import type { LocalizedGuideArticle } from "../../../types/guide";

export const afterArrivalArticles = [
  {
      id: "first-steps-after-arrival",
      slug: "first-steps-after-arrival",
      categorySlug: "after-arrival",
      title: {
        uz: "Germaniyaga kelgandan keyingi birinchi qadamlar",
        de: "Erste Schritte nach der Einreise nach Deutschland",
      },
      excerpt: {
        uz: "Germaniyaga kelgach bajariladigan asosiy ishlar: vizani tekshirish, yashash joyini ro‘yxatdan o‘tkazish, Wohnungsgeberbestätigung, Steuer-ID, tibbiy sug‘urta, bank hisobi, Aufenthaltstitel, telefon, transport, Rundfunkbeitrag, favqulodda raqamlar va dastlabki haftalar uchun amaliy checklist.",
        de: "Praxisleitfaden für die ersten Wochen nach der Einreise: Visum prüfen, Wohnsitz anmelden, Wohnungsgeberbestätigung, Steuer-ID, Krankenversicherung, Bankkonto, Aufenthaltstitel, Mobilfunk, öffentlicher Verkehr, Rundfunkbeitrag, Notrufnummern und Checkliste.",
      },
      intro: {
        uz: "Germaniyaga kirish bilan viza jarayoni tugamaydi. Yangi kelgan shaxs yashash manzilini ro‘yxatdan o‘tkazishi, tibbiy sug‘urtani faollashtirishi, ish beruvchi yoki ta’lim muassasasiga kerakli ma’lumotlarni yuborishi va zarur bo‘lsa milliy viza tugashidan oldin Aufenthaltstitelga murojaat qilishi kerak. Quyidagi tartib ko‘pchilik uchun xavfsiz asos bo‘lib xizmat qiladi, lekin aniq vazifalar viza maqsadi, shahar, ish va oilaviy holatga qarab farq qiladi.",
        de: "Mit der Einreise ist das Visumverfahren nicht abgeschlossen. Neu Eingereiste müssen ihren Wohnsitz anmelden, Krankenversicherung aktivieren, erforderliche Daten an Arbeitgeber oder Bildungseinrichtung übermitteln und gegebenenfalls vor Ablauf des nationalen Visums einen Aufenthaltstitel beantragen. Die folgende Reihenfolge ist für viele Fälle eine sichere Grundlage; konkrete Pflichten unterscheiden sich jedoch nach Visumzweck, Wohnort, Beschäftigung und Familiensituation.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: {
        uz: "14 daqiqa",
        de: "14 Minuten",
      },
      facts: [
        {
          label: { uz: "Anmeldung", de: "Wohnsitzanmeldung" },
          value: {
            uz: "Yangi uyga ko‘chib kirgandan keyin odatda ikki hafta ichida",
            de: "Grundsätzlich innerhalb von zwei Wochen nach Einzug",
          },
        },
        {
          label: { uz: "Asosiy hujjat", de: "Wichtiges Dokument" },
          value: {
            uz: "Wohnungsgeberbestätigung; ijara shartnomasi uning o‘rnini bosmaydi",
            de: "Wohnungsgeberbestätigung; der Mietvertrag ersetzt sie nicht",
          },
        },
        {
          label: { uz: "Steuer-ID", de: "Steuer-ID" },
          value: {
            uz: "11 xonali, umrbod amal qiladigan identifikatsiya raqami",
            de: "Elfstellige, dauerhaft gültige Identifikationsnummer",
          },
        },
        {
          label: { uz: "Sug‘urta", de: "Krankenversicherung" },
          value: {
            uz: "Germaniyada yashovchilar uchun tibbiy sug‘urta majburiy",
            de: "Für Personen mit Wohnsitz in Deutschland besteht Krankenversicherungspflicht",
          },
        },
        {
          label: { uz: "Rundfunkbeitrag", de: "Rundfunkbeitrag" },
          value: {
            uz: "Bir xonadon uchun bir marta; hozirda oyiga 18,36 yevro",
            de: "Einmal pro Wohnung; derzeit 18,36 Euro monatlich",
          },
        },
        {
          label: { uz: "Favqulodda raqamlar", de: "Notrufnummern" },
          value: {
            uz: "112 — tez yordam/yong‘in, 110 — politsiya, 116117 — shoshilinch bo‘lmagan tibbiy navbatchilik",
            de: "112 – Rettung/Feuerwehr, 110 – Polizei, 116117 – ärztlicher Bereitschaftsdienst",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Birinchi 24–48 soatda nima qilish kerak?",
            de: "Was ist in den ersten 24–48 Stunden wichtig?",
          },
          paragraphs: [
            {
              uz: "Pasport, viza yorlig‘i va kirish ma’lumotlarini tekshiring. Ism, pasport raqami, viza muddati, kirishlar soni va qo‘shimcha yozuvlarda xato bo‘lsa, darhol tegishli vakolatxona yoki Ausländerbehörde bilan bog‘laning.",
              de: "Prüfen Sie Reisepass, Visumetikett und Einreisedaten. Bei Fehlern in Name, Passnummer, Gültigkeit, Einreiseanzahl oder Zusatzvermerken wenden Sie sich unverzüglich an Auslandsvertretung oder Ausländerbehörde.",
            },
            {
              uz: "Muhim hujjatlarning raqamli va qog‘oz nusxalarini alohida saqlang: pasport, viza, ijara, Wohnungsgeberbestätigung, ish yoki Ausbildung shartnomasi, sug‘urta tasdig‘i, nikoh va tug‘ilganlik hujjatlari.",
              de: "Bewahren Sie digitale und gedruckte Kopien wichtiger Unterlagen getrennt auf: Pass, Visum, Mietunterlagen, Wohnungsgeberbestätigung, Arbeits- oder Ausbildungsvertrag, Versicherungsnachweis sowie Familienurkunden.",
            },
            {
              uz: "Yashayotgan manzilingizda Anmeldung qilish mumkinligini tekshiring. Mehmonxona, hostel yoki qisqa muddatli turar joy har doim ro‘yxatdan o‘tish manzili bo‘lavermaydi.",
              de: "Prüfen Sie, ob an Ihrer Unterkunft eine Anmeldung möglich ist. Hotel, Hostel oder kurzfristige Unterkunft sind nicht automatisch als Meldeadresse geeignet.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Birinchi haftalar uchun ustuvor vazifalar",
            de: "Prioritäten für die ersten Wochen",
          },
          items: [
            {
              uz: "Yashash joyini Bürgeramt yoki Meldebehördeda ro‘yxatdan o‘tkazish",
              de: "Wohnsitz beim Bürgeramt oder der Meldebehörde anmelden",
            },
            {
              uz: "Tibbiy sug‘urtani faollashtirish va sug‘urta raqamini olish",
              de: "Krankenversicherung aktivieren und Versicherungsdaten erhalten",
            },
            {
              uz: "Steuer-ID kelishini kuzatish yoki zarur bo‘lsa qayta so‘rash",
              de: "Zugang der Steuer-ID abwarten oder erforderlichenfalls erneut anfordern",
            },
            {
              uz: "Ish haqi, ijara va kundalik to‘lovlar uchun bank hisobini tashkil qilish",
              de: "Bankkonto für Gehalt, Miete und laufende Zahlungen einrichten",
            },
            {
              uz: "Milliy viza tugashidan oldin Ausländerbehörde jarayonini boshlash",
              de: "Verfahren bei der Ausländerbehörde vor Ablauf des nationalen Visums beginnen",
            },
            {
              uz: "Ish beruvchi, Ausbildung joyi yoki universitetga kerakli ma’lumotlarni yuborish",
              de: "Erforderliche Daten an Arbeitgeber, Ausbildungsbetrieb oder Hochschule übermitteln",
            },
            {
              uz: "Rundfunkbeitrag bo‘yicha xonadon allaqachon ro‘yxatdan o‘tganini tekshirish",
              de: "Prüfen, ob die Wohnung bereits zum Rundfunkbeitrag angemeldet ist",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Anmeldung va Wohnungsgeberbestätigung",
            de: "Anmeldung und Wohnungsgeberbestätigung",
          },
          paragraphs: [
            {
              uz: "Yangi uyga ko‘chib kirgan shaxs odatda ikki hafta ichida mas’ul Meldebehördeda ro‘yxatdan o‘tishi kerak. Ko‘plab shaharlarda termin talab qilinadi; ayrim joylarda esa elektron Anmeldung mavjud.",
              de: "Wer eine Wohnung bezieht, muss sich grundsätzlich innerhalb von zwei Wochen bei der zuständigen Meldebehörde anmelden. In vielen Städten ist ein Termin erforderlich; teilweise steht eine elektronische Anmeldung zur Verfügung.",
            },
            {
              uz: "Anmeldung uchun pasport, viza yoki Aufenthaltstitel, to‘ldirilgan forma va Wohnungsgeberbestätigung talab qilinadi. Oddiy ijara shartnomasi Wohnungsgeberbestätigung o‘rnini bosmaydi.",
              de: "Für die Anmeldung werden regelmäßig Pass, Visum oder Aufenthaltstitel, Anmeldeformular und Wohnungsgeberbestätigung benötigt. Ein Mietvertrag ersetzt die Wohnungsgeberbestätigung nicht.",
            },
            {
              uz: "Ro‘yxatdan o‘tgach Meldebescheinigungni xavfsiz saqlang. U bank, Ausländerbehörde, sug‘urta, telefon shartnomasi va boshqa ko‘plab jarayonlarda kerak bo‘lishi mumkin.",
              de: "Bewahren Sie die Meldebescheinigung nach der Anmeldung sicher auf. Sie kann bei Bank, Ausländerbehörde, Versicherung, Mobilfunkvertrag und weiteren Verfahren benötigt werden.",
            },
          ],
          items: [
            {
              uz: "Wohnungsgeberbestätigungda uy egasi yoki vakolatli shaxs, manzil, ko‘chib kirish sanasi va ro‘yxatdan o‘tuvchilar ko‘rsatiladi.",
              de: "Die Wohnungsgeberbestätigung enthält Wohnungsgeber, Anschrift, Einzugsdatum und meldepflichtige Personen.",
            },
            {
              uz: "Subarenda bo‘lsa, asosiy ijarachi Wohnungsgeber bo‘lishi mumkin, lekin bunga huquqi bo‘lishi kerak.",
              de: "Bei Untermiete kann der Hauptmieter Wohnungsgeber sein, muss hierzu jedoch berechtigt sein.",
            },
            {
              uz: "Soxta Anmeldung yoki real yashamaydigan manzildan foydalanish huquqiy muammolarga olib keladi.",
              de: "Eine Scheinanmeldung oder Anmeldung an einer tatsächlich nicht bewohnten Adresse kann rechtliche Folgen haben.",
            },
            {
              uz: "Termin kech bo‘lsa, o‘z vaqtida bron qilganingizni tasdiqlovchi hujjatni saqlang.",
              de: "Liegt der Termin später, bewahren Sie den Nachweis der rechtzeitigen Terminbuchung auf.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Steuer-ID, bank va ish beruvchiga kerakli ma’lumotlar",
            de: "Steuer-ID, Bankkonto und Angaben für den Arbeitgeber",
          },
          paragraphs: [
            {
              uz: "Steuer-ID — 11 xonali va umrbod amal qiladigan shaxsiy soliq identifikatsiya raqami. Germaniyada ro‘yxatdan o‘tgandan keyin u odatda avtomatik ravishda pochta orqali yuboriladi. Agar yo‘qolsa yoki kelmasa, BZSt orqali qayta so‘rash mumkin.",
              de: "Die Steuer-ID ist eine elfstellige und dauerhaft gültige persönliche Identifikationsnummer. Nach der Anmeldung wird sie grundsätzlich automatisch per Post mitgeteilt. Bei Verlust oder ausbleibender Mitteilung kann sie beim BZSt erneut angefordert werden.",
            },
            {
              uz: "Bank hisobini ochishda pasport, viza yoki Aufenthaltstitel, Meldebescheinigung va ba’zan Steuer-ID so‘raladi. Shartlar bankka qarab farq qiladi. Hisob narxi, naqd pul yechish, karta turi va xorijga pul o‘tkazish xarajatlarini solishtiring.",
              de: "Für die Kontoeröffnung werden häufig Pass, Visum oder Aufenthaltstitel, Meldebescheinigung und teilweise Steuer-ID verlangt. Konditionen unterscheiden sich je nach Bank. Vergleichen Sie Kontoführung, Bargeldabhebung, Kartenart und Auslandsüberweisungen.",
            },
            {
              uz: "Ish beruvchiga odatda Steuer-ID, bank IBANi, Krankenkasse ma’lumoti, Sozialversicherungsnummer va oilaviy holatga oid ayrim ma’lumotlar kerak bo‘ladi. Noma’lum shaxsga bu ma’lumotlarni messenjer orqali yubormang.",
              de: "Arbeitgeber benötigen regelmäßig Steuer-ID, IBAN, Krankenkasse, Sozialversicherungsnummer und bestimmte Angaben zum Familienstand. Senden Sie solche Daten nicht über Messenger an unbekannte Personen.",
            },
          ],
          items: [
            {
              uz: "Steuer-ID va Steuernummer bir xil emas.",
              de: "Steuer-ID und Steuernummer sind nicht dasselbe.",
            },
            {
              uz: "IBANni yuborishdan oldin ish beruvchining rasmiy kontaktini tekshiring.",
              de: "Prüfen Sie vor Übermittlung der IBAN den offiziellen Kontakt des Arbeitgebers.",
            },
            {
              uz: "Bank akkaunti uchun ikki bosqichli himoyani yoqing.",
              de: "Aktivieren Sie für das Bankkonto eine Zwei-Faktor-Authentifizierung.",
            },
            {
              uz: "PIN, TAN va internet-bank parolini hech kimga bermang.",
              de: "Geben Sie PIN, TAN und Onlinebanking-Passwort niemals weiter.",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Sug‘urta, Aufenthaltstitel va kundalik xizmatlar",
            de: "Krankenversicherung, Aufenthaltstitel und Alltag",
          },
          paragraphs: [
            {
              uz: "Germaniyada tibbiy sug‘urta majburiy. Ish bilan kelganlarda ish beruvchi tanlangan Krankenkassega ro‘yxatdan o‘tkazish ma’lumotlarini yuboradi; talabalar, oila a’zolari, Chancenkarte egalari va mustaqil shaxslar uchun jarayon boshqacha bo‘lishi mumkin.",
              de: "In Deutschland besteht Krankenversicherungspflicht. Bei Beschäftigten meldet der Arbeitgeber die Daten an die gewählte Krankenkasse; für Studierende, Familienangehörige, Inhaber einer Chancenkarte und Selbstständige kann das Verfahren anders aussehen.",
            },
            {
              uz: "Milliy vizangiz butun rejalashtirilgan muddatni qamramasa, viza tugashidan oldin Ausländerbehördeda Aufenthaltstitelga murojaat qiling. Termin topilmasa, muddat tugashidan oldin ariza yoki rasmiy murojaat yuborganingizni isbotlay oladigan usuldan foydalaning.",
              de: "Deckt das nationale Visum nicht den gesamten geplanten Aufenthalt ab, beantragen Sie vor Ablauf bei der Ausländerbehörde den Aufenthaltstitel. Ist kein Termin verfügbar, nutzen Sie vor Fristablauf einen nachweisbaren offiziellen Antrags- oder Kontaktweg.",
            },
            {
              uz: "Telefon uchun Prepaid, oylik shartnoma yoki eSIM tanlash mumkin. Uzoq shartnoma tuzishdan oldin muddat, Kündigungsfrist, internet hajmi, roaming va aktivlashtirish to‘lovini tekshiring.",
              de: "Für Mobilfunk stehen Prepaid, Laufzeitvertrag oder eSIM zur Verfügung. Prüfen Sie vor Vertragsabschluss Laufzeit, Kündigungsfrist, Datenvolumen, Roaming und Aktivierungsgebühren.",
            },
            {
              uz: "Jamoat transporti uchun mahalliy tarif yoki Deutschlandticket mos kelishi mumkin. Deutschlandticket shaxsiy va odatda obuna shaklida bo‘lgani sabab bekor qilish sanasi hamda foydalanish shartlarini tekshiring.",
              de: "Für den Nahverkehr können lokale Tarife oder das Deutschlandticket geeignet sein. Da das Deutschlandticket personengebunden und grundsätzlich ein Abonnement ist, sollten Kündigungsfrist und Nutzungsbedingungen geprüft werden.",
            },
          ],
          items: [
            {
              uz: "Ausländerbehördega yuborgan email, portal arizasi va avtomatik tasdiqlarni saqlang.",
              de: "Bewahren Sie E-Mails, Portalanträge und automatische Bestätigungen der Ausländerbehörde auf.",
            },
            {
              uz: "Fiktionsbescheinigung avtomatik berilmaydi; uning kerakligi va huquqiy ta’siri individual holatga bog‘liq.",
              de: "Eine Fiktionsbescheinigung wird nicht automatisch erteilt; Erforderlichkeit und Wirkung hängen vom Einzelfall ab.",
            },
            {
              uz: "eAT karta kelguncha pasport va amaldagi viza yoki vaqtinchalik hujjatni xavfsiz saqlang.",
              de: "Bewahren Sie bis zum Erhalt des eAT Pass und gültiges Visum oder vorläufigen Nachweis sicher auf.",
            },
            {
              uz: "Reglementierte kasblarda ishlash uchun alohida Anerkennung yoki Berufserlaubnis kerak bo‘lishi mumkin.",
              de: "Für reglementierte Berufe können zusätzlich Anerkennung oder Berufserlaubnis erforderlich sein.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Rundfunkbeitrag, firibgarlik va ko‘p uchraydigan xatolar",
            de: "Rundfunkbeitrag, Betrug und häufige Fehler",
          },
          paragraphs: [
            {
              uz: "Rundfunkbeitrag har bir xonadon uchun bir marta to‘lanadi — uyda nechta kishi yashashidan qat’i nazar. Hozirgi miqdor oyiga 18,36 yevro. WG yoki oilada boshqa shaxs allaqachon to‘layotgan bo‘lsa, uning Beitragsnummeri orqali o‘zingizni shu xonadonga biriktirish kerak.",
              de: "Der Rundfunkbeitrag fällt einmal pro Wohnung an, unabhängig von der Zahl der Bewohner. Derzeit beträgt er 18,36 Euro monatlich. Zahlt in WG oder Familie bereits eine Person, muss die Zuordnung über deren Beitragsnummer erfolgen.",
            },
            {
              uz: "Anmeldungdan keyin bank, sug‘urta, Rundfunkbeitrag yoki boshqa tashkilot nomidan soxta xatlar va phishing xabarlari kelishi mumkin. To‘lovdan oldin jo‘natuvchi, IBAN, domen va rasmiy akkauntni tekshiring.",
              de: "Nach der Anmeldung können gefälschte Schreiben oder Phishing-Nachrichten im Namen von Banken, Versicherungen, Rundfunkbeitrag oder anderen Stellen auftreten. Prüfen Sie vor Zahlung Absender, IBAN, Domain und offizielles Konto.",
            },
          ],
          items: [
            {
              uz: "Anmeldungni kechiktirmang va Wohnungsgeberbestätigungni oldindan so‘rang.",
              de: "Verzögern Sie die Anmeldung nicht und fordern Sie die Wohnungsgeberbestätigung rechtzeitig an.",
            },
            {
              uz: "Viza tugash sanasini kalendarga yozing va Ausländerbehörde jarayonini erta boshlang.",
              de: "Notieren Sie das Visumablaufdatum und beginnen Sie das Verfahren bei der Ausländerbehörde frühzeitig.",
            },
            {
              uz: "Sug‘urtadagi bo‘shliq katta tibbiy va moliyaviy xavf tug‘diradi.",
              de: "Eine Versicherungslücke verursacht erhebliche medizinische und finanzielle Risiken.",
            },
            {
              uz: "Uy yoki ish topish uchun oldindan noma’lum shaxsga katta depozit yubormang.",
              de: "Überweisen Sie unbekannten Personen nicht vorschnell hohe Kautionen für Wohnung oder Arbeit.",
            },
            {
              uz: "Pasport, Aufenthaltstitel, Steuer-ID va bank ma’lumotlarini ochiq guruhda ulashmang.",
              de: "Teilen Sie Pass, Aufenthaltstitel, Steuer-ID und Bankdaten nicht in offenen Gruppen.",
            },
            {
              uz: "Rasmiy xatlarni e’tiborsiz qoldirmang; javob muddati bo‘lsa kalendarga kiriting.",
              de: "Ignorieren Sie behördliche Schreiben nicht; tragen Sie Antwortfristen in den Kalender ein.",
            },
          ],
        },
      },
      steps: [
        {
          title: {
            uz: "Viza va hujjatlarni tekshiring",
            de: "Visum und Unterlagen prüfen",
          },
          description: {
            uz: "Viza muddati, maqsadi va shaxsiy ma’lumotlarni tekshirib, muhim hujjatlarning nusxalarini yarating.",
            de: "Prüfen Sie Gültigkeit, Zweck und Personendaten des Visums und erstellen Sie Kopien wichtiger Unterlagen.",
          },
        },
        {
          title: {
            uz: "Anmeldung terminini oling",
            de: "Termin zur Anmeldung buchen",
          },
          description: {
            uz: "Ko‘chib kirgandan keyin ikki haftalik muddatni hisobga olib Bürgeramt yoki onlayn xizmat orqali ro‘yxatdan o‘tishni boshlang.",
            de: "Beginnen Sie unter Beachtung der Zweiwochenfrist die Anmeldung beim Bürgeramt oder über den verfügbaren Onlinedienst.",
          },
        },
        {
          title: {
            uz: "Wohnungsgeberbestätigungni oling",
            de: "Wohnungsgeberbestätigung erhalten",
          },
          description: {
            uz: "Uy egasi yoki vakolatli Wohnungsgeberdan to‘g‘ri to‘ldirilgan tasdiqni so‘rang.",
            de: "Fordern Sie vom Vermieter oder berechtigten Wohnungsgeber eine korrekt ausgefüllte Bestätigung an.",
          },
        },
        {
          title: {
            uz: "Sug‘urtani faollashtiring",
            de: "Krankenversicherung aktivieren",
          },
          description: {
            uz: "Viza va ish/o‘qish holatingizga mos Krankenkasse yoki xususiy sug‘urta jarayonini yakunlang.",
            de: "Schließen Sie entsprechend Visum, Beschäftigung oder Studium die gesetzliche oder private Krankenversicherung ab.",
          },
        },
        {
          title: {
            uz: "Bank hisobi va aloqa vositasini tashkil qiling",
            de: "Bankkonto und Mobilfunk einrichten",
          },
          description: {
            uz: "Shartlarni solishtirib bank hisobi oching va ehtiyojga mos Prepaid yoki shartnoma tanlang.",
            de: "Vergleichen Sie Konditionen, eröffnen Sie ein Bankkonto und wählen Sie Prepaid oder Vertrag passend zum Bedarf.",
          },
        },
        {
          title: {
            uz: "Steuer-ID va ish hujjatlarini kuzating",
            de: "Steuer-ID und Beschäftigungsdaten verfolgen",
          },
          description: {
            uz: "Steuer-ID kelishini kuting va ish beruvchiga kerakli ma’lumotlarni xavfsiz yuboring.",
            de: "Warten Sie die Steuer-ID ab und übermitteln Sie erforderliche Daten sicher an den Arbeitgeber.",
          },
        },
        {
          title: {
            uz: "Aufenthaltstitelga erta murojaat qiling",
            de: "Aufenthaltstitel frühzeitig beantragen",
          },
          description: {
            uz: "Milliy viza tugashidan oldin mas’ul Ausländerbehörde tartibini aniqlang va arizani hujjatlashtirilgan tarzda yuboring.",
            de: "Klären Sie vor Ablauf des nationalen Visums das Verfahren der zuständigen Ausländerbehörde und reichen Sie den Antrag nachweisbar ein.",
          },
        },
        {
          title: {
            uz: "Rundfunkbeitrag holatini tekshiring",
            de: "Rundfunkbeitrag klären",
          },
          description: {
            uz: "Xonadon allaqachon ro‘yxatdan o‘tgan bo‘lsa Beitragsnummerni oling; aks holda rasmiy saytda ro‘yxatdan o‘ting.",
            de: "Ist die Wohnung bereits angemeldet, nutzen Sie die Beitragsnummer; andernfalls melden Sie sie offiziell an.",
          },
        },
        {
          title: {
            uz: "Favqulodda raqamlarni saqlang",
            de: "Notrufnummern speichern",
          },
          description: {
            uz: "112, 110 va 116117 raqamlarini telefoningizga saqlang va qaysi vaziyatda ishlatilishini biling.",
            de: "Speichern Sie 112, 110 und 116117 und kennen Sie den jeweiligen Verwendungszweck.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Anmeldungni qachon qilish kerak?",
            de: "Wann muss ich meinen Wohnsitz anmelden?",
          },
          answer: {
            uz: "Yangi uyga ko‘chib kirgandan keyin odatda ikki hafta ichida. Aniq termin va onlayn imkoniyat shahar yoki Gemeinde bo‘yicha farq qiladi.",
            de: "Grundsätzlich innerhalb von zwei Wochen nach Einzug. Termin- und Onlineverfahren unterscheiden sich je nach Stadt oder Gemeinde.",
          },
        },
        {
          question: {
            uz: "Ijara shartnomasi Wohnungsgeberbestätigung o‘rnini bosadimi?",
            de: "Ersetzt der Mietvertrag die Wohnungsgeberbestätigung?",
          },
          answer: {
            uz: "Yo‘q. Rasmiy Anmeldung uchun odatda alohida Wohnungsgeberbestätigung kerak.",
            de: "Nein. Für die Anmeldung wird grundsätzlich eine gesonderte Wohnungsgeberbestätigung benötigt.",
          },
        },
        {
          question: {
            uz: "Steuer-IDni qayerdan olaman?",
            de: "Woher bekomme ich die Steuer-ID?",
          },
          answer: {
            uz: "Anmeldungdan keyin u odatda avtomatik ravishda pochta orqali yuboriladi. Kelmasa yoki yo‘qolsa BZSt orqali qayta so‘rash mumkin.",
            de: "Nach der Anmeldung wird sie grundsätzlich automatisch per Post mitgeteilt. Bei Verlust oder ausbleibender Mitteilung kann sie beim BZSt erneut angefordert werden.",
          },
        },
        {
          question: {
            uz: "Steuer-ID va Steuernummer bir xilmi?",
            de: "Sind Steuer-ID und Steuernummer dasselbe?",
          },
          answer: {
            uz: "Yo‘q. Steuer-ID shaxsga umrbod biriktirilgan 11 xonali raqam; Steuernummer esa Finanzamt va soliq holatiga bog‘liq.",
            de: "Nein. Die Steuer-ID ist eine dauerhaft persönliche elfstellige Nummer; die Steuernummer hängt von Finanzamt und steuerlichem Vorgang ab.",
          },
        },
        {
          question: {
            uz: "Mehmonxonada Anmeldung qilish mumkinmi?",
            de: "Kann ich mich in einem Hotel anmelden?",
          },
          answer: {
            uz: "Har doim emas. Turar joy ro‘yxatdan o‘tishga ruxsat berishi va Wohnungsgeberbestätigung taqdim etishi kerak.",
            de: "Nicht immer. Die Unterkunft muss eine Anmeldung ermöglichen und eine Wohnungsgeberbestätigung ausstellen können.",
          },
        },
        {
          question: {
            uz: "Vizam tugashidan oldin Ausländerbehörde termini topilmasa nima qilaman?",
            de: "Was tun, wenn vor Visumablauf kein Termin verfügbar ist?",
          },
          answer: {
            uz: "Viza tugashidan oldin idoraning rasmiy portal, forma, email yoki boshqa ko‘rsatgan yo‘li orqali arizani yuboring va yuborilganini isbotlovchi tasdiqni saqlang.",
            de: "Reichen Sie vor Visumablauf über Portal, Formular, E-Mail oder den offiziell vorgegebenen Weg einen nachweisbaren Antrag ein und bewahren Sie die Bestätigung auf.",
          },
        },
        {
          question: {
            uz: "Rundfunkbeitragni WGdagi har bir odam to‘laydimi?",
            de: "Zahlt in einer WG jede Person den Rundfunkbeitrag?",
          },
          answer: {
            uz: "Yo‘q. Bir xonadon uchun bir marta to‘lanadi. Boshqa yashovchi to‘layotgan bo‘lsa, uning Beitragsnummeri bilan xonadonga bog‘lanasiz.",
            de: "Nein. Der Beitrag fällt einmal pro Wohnung an. Zahlt bereits ein Mitbewohner, erfolgt die Zuordnung über dessen Beitragsnummer.",
          },
        },
        {
          question: {
            uz: "Qaysi favqulodda raqamga qo‘ng‘iroq qilaman?",
            de: "Welche Notrufnummer nutze ich?",
          },
          answer: {
            uz: "Hayot uchun xavf, tez yordam yoki yong‘in uchun 112; politsiya favqulodda holati uchun 110; shoshilinch, lekin hayot uchun xavfli bo‘lmagan tibbiy yordam uchun 116117.",
            de: "112 bei Lebensgefahr, Rettungsdienst oder Feuerwehr; 110 bei Polizeinotfällen; 116117 bei dringenden, aber nicht lebensbedrohlichen medizinischen Beschwerden.",
          },
        },
        {
          question: {
            uz: "Deutschlandticket avtomatik bekor bo‘ladimi?",
            de: "Endet das Deutschlandticket automatisch?",
          },
          answer: {
            uz: "Odatda yo‘q, u obuna hisoblanadi. Sotuvchi tashkilotning Kündigungsfrist va bekor qilish qoidalarini tekshiring.",
            de: "Grundsätzlich nein, da es sich um ein Abonnement handelt. Prüfen Sie Kündigungsfrist und Stornierungsregeln des jeweiligen Anbieters.",
          },
        },
      ],
      sources: [
        {
          title: "Wohnsitz anmelden",
          organization: "Bundesportal",
          url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99115005104000",
          language: "de",
        },
        {
          title: "Housing and registration",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration",
          language: "en",
        },
        {
          title: "Steuerliche Identifikationsnummer",
          organization: "Bundeszentralamt für Steuern",
          url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html",
          language: "de",
        },
        {
          title: "Health insurance",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/health-insurance",
          language: "en",
        },
        {
          title: "Der Rundfunkbeitrag",
          organization: "ARD ZDF Deutschlandradio Beitragsservice",
          url: "https://www.rundfunkbeitrag.de/",
          language: "de",
        },
        {
          title: "Ärztlicher Bereitschaftsdienst",
          organization: "116117",
          url: "https://www.116117.de/de/aerztlicher-bereitschaftsdienst.php",
          language: "de",
        },
        {
          title: "Deutschlandticket",
          organization: "Deutsche Bahn",
          url: "https://www.bahn.de/angebot/regio/deutschland-ticket",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "national-visa",
        "visa-appointment",
        "spouse-reunification",
        "eu-blue-card-family-reunification",
        "child-family-reunification",
      ],
    },
  {
      id: "anmeldung-guide",
      slug: "anmeldung-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Anmeldung: yashash manzilini ro‘yxatdan o‘tkazish",
        de: "Anmeldung des Wohnsitzes in Deutschland",
      },
      excerpt: {
        uz: "Germaniyada yashash manzilini ro‘yxatdan o‘tkazish: ikki haftalik muddat, Wohnungsgeberbestätigung, Bürgeramt, kerakli hujjatlar, Meldebescheinigung, Ummeldung, Abmeldung va keng tarqalgan xatolar.",
        de: "Leitfaden zur Wohnsitzanmeldung: Zweiwochenfrist, Wohnungsgeberbestätigung, Bürgeramt, erforderliche Unterlagen, Meldebescheinigung, Ummeldung, Abmeldung und häufige Fehler.",
      },
      intro: {
        uz: "Anmeldung — Germaniyada haqiqatan yashayotgan manzilingizni mas’ul Meldebehördeda rasmiy ro‘yxatdan o‘tkazish jarayoni. U Steuer-ID, bank, sug‘urta, Ausländerbehörde, telefon shartnomasi va ko‘plab boshqa xizmatlar uchun asosiy hujjatlardan biri bo‘lgan Meldebescheinigungni olishga xizmat qiladi.",
        de: "Die Anmeldung ist die offizielle Registrierung der tatsächlich bewohnten Adresse bei der zuständigen Meldebehörde. Sie führt zur Meldebescheinigung, die häufig für Steuer-ID, Bank, Krankenversicherung, Ausländerbehörde, Mobilfunkvertrag und weitere Verfahren benötigt wird.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "10 daqiqa", de: "10 Minuten" },
      facts: [
        {
          label: { uz: "Muddat", de: "Frist" },
          value: {
            uz: "Odatda ko‘chib kirgandan keyin ikki hafta ichida",
            de: "Grundsätzlich innerhalb von zwei Wochen nach Einzug",
          },
        },
        {
          label: { uz: "Asosiy hujjat", de: "Zentrales Dokument" },
          value: {
            uz: "Wohnungsgeberbestätigung",
            de: "Wohnungsgeberbestätigung",
          },
        },
        {
          label: { uz: "Natija", de: "Ergebnis" },
          value: {
            uz: "Meldebescheinigung",
            de: "Meldebescheinigung",
          },
        },
        {
          label: { uz: "Ko‘chish", de: "Umzug" },
          value: {
            uz: "Yangi manzilda qayta Anmeldung/Ummeldung qilinadi",
            de: "Am neuen Wohnort erfolgt eine erneute Anmeldung/Ummeldung",
          },
        },
        {
          label: { uz: "Chet elga ketish", de: "Wegzug ins Ausland" },
          value: {
            uz: "Germaniyadan doimiy chiqishda Abmeldung kerak bo‘lishi mumkin",
            de: "Bei dauerhaftem Wegzug ins Ausland kann eine Abmeldung erforderlich sein",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Anmeldung nima uchun kerak?",
            de: "Wofür wird die Anmeldung benötigt?",
          },
          paragraphs: [
            {
              uz: "Anmeldung sizning Germaniyadagi rasmiy yashash manzilingizni davlat reyestriga kiritadi. Ro‘yxatdan keyin Meldebescheinigung beriladi va soliq identifikatsiya raqami odatda pochta orqali yuboriladi.",
              de: "Mit der Anmeldung wird Ihre tatsächliche Wohnadresse im Melderegister erfasst. Anschließend erhalten Sie eine Meldebescheinigung; die Steuer-ID wird grundsätzlich automatisch postalisch mitgeteilt.",
            },
            {
              uz: "Anmeldung faqat real yashayotgan manzilda amalga oshiriladi. Faqat xat olish yoki hujjat rasmiylashtirish uchun boshqa manzildan foydalanish Scheinanmeldung hisoblanishi mumkin.",
              de: "Die Anmeldung erfolgt nur an der tatsächlich bewohnten Adresse. Eine Anmeldung lediglich für Postempfang oder Behördengänge kann eine unzulässige Scheinanmeldung darstellen.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kim Anmeldung qilishi kerak?",
            de: "Wer muss sich anmelden?",
          },
          items: [
            {
              uz: "Germaniyada yangi uy yoki xona egallagan shaxs",
              de: "Personen, die in Deutschland eine Wohnung oder ein Zimmer beziehen",
            },
            {
              uz: "Shu shahar ichida yoki boshqa shaharga ko‘chgan shaxs",
              de: "Personen, die innerhalb derselben Stadt oder in eine andere Gemeinde umziehen",
            },
            {
              uz: "WG yoki subarendaga ko‘chib kirgan shaxs",
              de: "Personen, die in eine WG oder Untermiete einziehen",
            },
            {
              uz: "Oila bilan kelgan har bir ro‘yxatdan o‘tuvchi shaxs",
              de: "Jede meldepflichtige Person einer gemeinsam einreisenden Familie",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Wohnungsgeberbestätigung",
            de: "Wohnungsgeberbestätigung",
          },
          paragraphs: [
            {
              uz: "Wohnungsgeberbestätigungni uy egasi yoki vakolatli Wohnungsgeber beradi. Unda manzil, ko‘chib kirish sanasi, ro‘yxatdan o‘tuvchi shaxslar va Wohnungsgeber ma’lumotlari bo‘ladi.",
              de: "Die Wohnungsgeberbestätigung wird vom Vermieter oder berechtigten Wohnungsgeber ausgestellt. Sie enthält Anschrift, Einzugsdatum, meldepflichtige Personen und Angaben zum Wohnungsgeber.",
            },
            {
              uz: "Ijara shartnomasi ushbu tasdiqning o‘rnini bosmaydi. Wohnungsgeber hujjatni bermasa, Meldebehördega darhol xabar berish tavsiya etiladi.",
              de: "Der Mietvertrag ersetzt diese Bestätigung nicht. Verweigert der Wohnungsgeber die Ausstellung, sollte die Meldebehörde unverzüglich informiert werden.",
            },
          ],
          items: [
            {
              uz: "Subarendada asosiy ijarachi vakolatli bo‘lsa Wohnungsgeber bo‘lishi mumkin.",
              de: "Bei Untermiete kann der Hauptmieter als Wohnungsgeber handeln, wenn er dazu berechtigt ist.",
            },
            {
              uz: "Ko‘chib kirish sanasi shartnoma sanasi bilan har doim bir xil bo‘lavermaydi.",
              de: "Das Einzugsdatum ist nicht zwingend identisch mit dem Vertragsdatum.",
            },
            {
              uz: "Soxta Wohnungsgeberbestätigungdan foydalanmang.",
              de: "Verwenden Sie keine gefälschte Wohnungsgeberbestätigung.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Kerakli hujjatlar",
            de: "Erforderliche Unterlagen",
          },
          items: [
            {
              uz: "Pasport yoki tan olinadigan shaxsni tasdiqlovchi hujjat",
              de: "Reisepass oder anerkanntes Identitätsdokument",
            },
            {
              uz: "Viza yoki Aufenthaltstitel — mavjud bo‘lsa",
              de: "Visum oder Aufenthaltstitel, soweit vorhanden",
            },
            {
              uz: "Wohnungsgeberbestätigung",
              de: "Wohnungsgeberbestätigung",
            },
            {
              uz: "Shahar talab qilsa Anmeldung formasi",
              de: "Anmeldeformular, sofern von der Kommune verlangt",
            },
            {
              uz: "Oila uchun nikoh va tug‘ilganlik hujjatlari — zarur holatlarda",
              de: "Für Familien gegebenenfalls Ehe- und Geburtsurkunden",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Ummeldung va Abmeldung",
            de: "Ummeldung und Abmeldung",
          },
          paragraphs: [
            {
              uz: "Germaniya ichida yangi manzilga ko‘chganda odatda yangi manzilda Anmeldung qilinadi; eski manzil alohida bekor qilinmaydi. Mahalliy xizmat nomi ko‘pincha Ummeldung deb ataladi.",
              de: "Bei einem Umzug innerhalb Deutschlands erfolgt grundsätzlich die Anmeldung am neuen Wohnort; die bisherige Adresse wird regelmäßig automatisch abgemeldet. Lokal wird dies oft als Ummeldung bezeichnet.",
            },
            {
              uz: "Germaniyadan doimiy ravishda chet elga ko‘chib ketganda va Germaniyada boshqa uy qolmasa, Abmeldung talab qilinadi.",
              de: "Bei dauerhaftem Wegzug ins Ausland ohne weitere Wohnung in Deutschland ist eine Abmeldung erforderlich.",
            },
          ],
          items: [
            {
              uz: "Termin kech bo‘lsa bron tasdig‘ini saqlang.",
              de: "Bewahren Sie bei spätem Termin die Buchungsbestätigung auf.",
            },
            {
              uz: "Meldebescheinigung nusxalarini xavfsiz saqlang.",
              de: "Bewahren Sie Kopien der Meldebescheinigung sicher auf.",
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
              uz: "Ijara shartnomasini Wohnungsgeberbestätigung deb o‘ylash",
              de: "Den Mietvertrag mit der Wohnungsgeberbestätigung verwechseln",
            },
            {
              uz: "Real yashamaydigan manzilga Anmeldung qilish",
              de: "Anmeldung an einer tatsächlich nicht bewohnten Adresse",
            },
            {
              uz: "Pasportdagi ism-familiyani noto‘g‘ri kiritish",
              de: "Fehlerhafte Übernahme von Namen aus dem Reisepass",
            },
            {
              uz: "Ko‘chib o‘tgach eski manzil ma’lumotidan foydalanishda davom etish",
              de: "Nach Umzug weiterhin die alte Adresse verwenden",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Manzilni tasdiqlang", de: "Adresse klären" },
          description: {
            uz: "Uyda Anmeldung mumkinligini va Wohnungsgeberbestätigung berilishini oldindan tekshiring.",
            de: "Prüfen Sie vorab, ob eine Anmeldung möglich ist und die Wohnungsgeberbestätigung ausgestellt wird.",
          },
        },
        {
          title: { uz: "Termin oling", de: "Termin buchen" },
          description: {
            uz: "Bürgeramt yoki Meldebehörde rasmiy tizimidan termin oling.",
            de: "Buchen Sie einen Termin über das offizielle System von Bürgeramt oder Meldebehörde.",
          },
        },
        {
          title: { uz: "Hujjatlarni tayyorlang", de: "Unterlagen vorbereiten" },
          description: {
            uz: "Pasport, Wohnungsgeberbestätigung va mahalliy formani tayyorlang.",
            de: "Bereiten Sie Pass, Wohnungsgeberbestätigung und lokales Formular vor.",
          },
        },
        {
          title: { uz: "Ro‘yxatdan o‘ting", de: "Anmeldung durchführen" },
          description: {
            uz: "Ma’lumotlarni tekshirib, Meldebescheinigungni oling.",
            de: "Prüfen Sie die Daten und nehmen Sie die Meldebescheinigung entgegen.",
          },
        },
        {
          title: { uz: "Keyingi jarayonlarni boshlang", de: "Folgeverfahren starten" },
          description: {
            uz: "Steuer-ID, bank, sug‘urta va Ausländerbehörde ishlarini davom ettiring.",
            de: "Führen Sie Steuer-ID-, Bank-, Versicherungs- und Ausländerbehördenverfahren fort.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Anmeldungni ikki haftadan kech qilsam nima bo‘ladi?",
            de: "Was passiert bei verspäteter Anmeldung?",
          },
          answer: {
            uz: "Meldepflicht buzilishi jarima yoki boshqa ma’muriy muammolarga olib kelishi mumkin. Termin kech bo‘lsa, o‘z vaqtida bron qilganingizni saqlang.",
            de: "Ein Verstoß gegen die Meldepflicht kann zu Bußgeld oder Verwaltungsproblemen führen. Bewahren Sie bei später Terminvergabe den rechtzeitigen Buchungsnachweis auf.",
          },
        },
        {
          question: {
            uz: "Mehmonxonada Anmeldung mumkinmi?",
            de: "Ist eine Anmeldung im Hotel möglich?",
          },
          answer: {
            uz: "Faqat turar joy rasmiy Wohnungsgeberbestätigung bera olsa va manzil ro‘yxatdan o‘tishga mos bo‘lsa.",
            de: "Nur wenn die Unterkunft eine Wohnungsgeberbestätigung ausstellen kann und als Meldeadresse geeignet ist.",
          },
        },
        {
          question: {
            uz: "Germaniya ichida ko‘chganda Abmeldung kerakmi?",
            de: "Brauche ich bei Umzug innerhalb Deutschlands eine Abmeldung?",
          },
          answer: {
            uz: "Odatda yo‘q. Yangi manzilda Anmeldung/Ummeldung qilinadi va eski manzil avtomatik yangilanadi.",
            de: "Grundsätzlich nein. Sie melden sich am neuen Wohnort an; die alte Adresse wird regelmäßig automatisch aktualisiert.",
          },
        },
      ],
      sources: [
        {
          title: "Wohnsitz anmelden",
          organization: "Bundesportal",
          url: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99115005104001",
          language: "de",
        },
        {
          title: "Umzug: neue Wohnung online anmelden",
          organization: "Bundesportal",
          url: "https://verwaltung.bund.de/portal/DE/info-pages/umzug",
          language: "de",
        },
        {
          title: "Housing and registration",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration",
          language: "en",
        },
      ],
      relatedArticleSlugs: ["first-steps-after-arrival"],
    },
  {
      id: "health-insurance-guide",
      slug: "health-insurance-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Germaniyada tibbiy sug‘urta",
        de: "Krankenversicherung in Deutschland",
      },
      excerpt: {
        uz: "Germaniyadagi majburiy tibbiy sug‘urta: gesetzlich va privat tizimlari, ishchilar, talabalar, oila a’zolari, Chancenkarte egalari, Familienversicherung, Krankenkasse tanlash va keng tarqalgan xatolar.",
        de: "Leitfaden zur Krankenversicherungspflicht: gesetzliche und private Versicherung, Beschäftigte, Studierende, Familienangehörige, Chancenkarte, Familienversicherung, Kassenwahl und häufige Fehler.",
      },
      intro: {
        uz: "Germaniyada tibbiy sug‘urta majburiy. Qaysi tizimga kirishingiz — gesetzliche Krankenversicherung yoki private Krankenversicherung — ish, daromad, talabalik, oilaviy holat va yashash maqomiga bog‘liq. Viza uchun ishlatilgan vaqtinchalik sug‘urta Germaniyadagi uzoq muddatli sug‘urta o‘rnini har doim bosa olmaydi.",
        de: "In Deutschland besteht Krankenversicherungspflicht. Ob gesetzliche oder private Krankenversicherung in Betracht kommt, hängt von Beschäftigung, Einkommen, Studium, Familiensituation und Aufenthaltsstatus ab. Eine für das Visum verwendete Übergangsversicherung ersetzt nicht immer den langfristig erforderlichen Schutz.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "11 daqiqa", de: "11 Minuten" },
      facts: [
        {
          label: { uz: "Majburiyat", de: "Pflicht" },
          value: {
            uz: "Germaniyada yashovchilar uchun tibbiy sug‘urta majburiy",
            de: "Für Personen mit Wohnsitz in Deutschland besteht Krankenversicherungspflicht",
          },
        },
        {
          label: { uz: "Asosiy tizimlar", de: "Systeme" },
          value: {
            uz: "Gesetzliche va private Krankenversicherung",
            de: "Gesetzliche und private Krankenversicherung",
          },
        },
        {
          label: { uz: "Ishchilar", de: "Beschäftigte" },
          value: {
            uz: "Ko‘pchilik ijtimoiy sug‘urtali xodimlar GKVga kiradi",
            de: "Die meisten sozialversicherungspflichtig Beschäftigten sind in der GKV",
          },
        },
        {
          label: { uz: "Oila", de: "Familie" },
          value: {
            uz: "Shartlar bajarilsa GKVda beitragsfreie Familienversicherung mumkin",
            de: "Unter Voraussetzungen ist beitragsfreie Familienversicherung in der GKV möglich",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "GKV va PKV farqi",
            de: "Unterschied zwischen GKV und PKV",
          },
          paragraphs: [
            {
              uz: "Gesetzliche Krankenversicherung badali odatda daromadga bog‘liq va xizmatlar qonuniy minimumga asoslanadi. Private Krankenversicherung badali esa tarif, yosh, sog‘liq va tanlangan xizmatlarga bog‘liq.",
              de: "Beiträge der gesetzlichen Krankenversicherung richten sich grundsätzlich nach dem Einkommen; Leistungen basieren auf gesetzlichen Vorgaben. In der privaten Krankenversicherung hängen Beiträge von Tarif, Alter, Gesundheit und Leistungsumfang ab.",
            },
            {
              uz: "PKV har doim «yaxshiroq» yoki «arzonroq» degani emas. Keyinchalik GKVga qaytish qiyin bo‘lishi mumkin, ayniqsa yoshi katta yoki mustaqil shaxslar uchun.",
              de: "PKV ist nicht automatisch besser oder günstiger. Eine spätere Rückkehr in die GKV kann schwierig sein, besonders bei höherem Alter oder Selbstständigkeit.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Turli guruhlar uchun holat",
            de: "Situation verschiedener Gruppen",
          },
          items: [
            {
              uz: "Ijtimoiy sug‘urtali xodimlar odatda Krankenkasseni o‘zlari tanlaydi va ish beruvchi ro‘yxatdan o‘tkazadi",
              de: "Sozialversicherungspflichtig Beschäftigte wählen grundsätzlich ihre Krankenkasse; der Arbeitgeber meldet sie an",
            },
            {
              uz: "Talabalar studentische Krankenversicherung yoki tegishli boshqa qoidaga tushadi",
              de: "Studierende fallen regelmäßig unter die studentische Krankenversicherung oder passende Sonderregelungen",
            },
            {
              uz: "Oila birlashtirish bilan kelganlar Familienversicherungga mos kelishi mumkin",
              de: "Nachgezogene Familienangehörige können die Voraussetzungen der Familienversicherung erfüllen",
            },
            {
              uz: "Chancenkarte yoki ish qidirish davrida yetarli mustaqil sug‘urta talab qilinadi",
              de: "Während Chancenkarte oder Arbeitssuche ist eigenständiger ausreichender Versicherungsschutz erforderlich",
            },
            {
              uz: "Mustaqil ishlovchilar GKV yoki PKV variantlarini individual tekshiradi",
              de: "Selbstständige prüfen GKV- und PKV-Möglichkeiten individuell",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Krankenkasse tanlash",
            de: "Krankenkasse auswählen",
          },
          paragraphs: [
            {
              uz: "GKV kassalarining asosiy qonuniy xizmatlari o‘xshash, lekin Zusatzbeitrag, qo‘shimcha bonuslar, servis tili, ilova va filiallar farq qiladi.",
              de: "Die gesetzlichen Grundleistungen ähneln sich, Unterschiede bestehen bei Zusatzbeitrag, Bonusprogrammen, Service, App und Filialnetz.",
            },
            {
              uz: "Faqat reklama yoki vositachi tavsiyasiga emas, rasmiy tarif, xizmat va bekor qilish shartlariga qarang.",
              de: "Entscheiden Sie nicht allein nach Werbung oder Vermittlerempfehlung, sondern anhand offizieller Beiträge, Leistungen und Wechselbedingungen.",
            },
          ],
          items: [
            {
              uz: "Sug‘urta boshlanish sanasi ish yoki o‘qish boshlanishiga mos bo‘lsin.",
              de: "Der Versicherungsbeginn muss zu Beschäftigungs- oder Studienbeginn passen.",
            },
            {
              uz: "Ism, manzil va tug‘ilgan sana hujjatlar bilan mos bo‘lsin.",
              de: "Name, Adresse und Geburtsdatum müssen mit den Unterlagen übereinstimmen.",
            },
            {
              uz: "Elektron Gesundheitskarte kelguncha vaqtinchalik tasdiqni saqlang.",
              de: "Bewahren Sie bis zur Gesundheitskarte eine vorläufige Mitgliedsbestätigung auf.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan ma’lumotlar",
            de: "Üblicherweise erforderliche Angaben",
          },
          items: [
            {
              uz: "Pasport va Aufenthaltstitel yoki viza",
              de: "Reisepass und Aufenthaltstitel oder Visum",
            },
            {
              uz: "Meldebescheinigung yoki Germaniyadagi manzil",
              de: "Meldebescheinigung oder deutsche Anschrift",
            },
            {
              uz: "Ish yoki Ausbildung shartnomasi",
              de: "Arbeits- oder Ausbildungsvertrag",
            },
            {
              uz: "Talabalar uchun Immatrikulationsbescheinigung",
              de: "Für Studierende Immatrikulationsbescheinigung",
            },
            {
              uz: "Oila sug‘urtasi uchun nikoh va tug‘ilganlik hujjatlari",
              de: "Für Familienversicherung Ehe- und Geburtsurkunden",
            },
            {
              uz: "Oldingi sug‘urta haqida ma’lumot — mavjud bo‘lsa",
              de: "Angaben zur bisherigen Versicherung, soweit vorhanden",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Familienversicherung va ish boshlash",
            de: "Familienversicherung und Arbeitsbeginn",
          },
          paragraphs: [
            {
              uz: "GKVda turmush o‘rtog‘i va farzandlar shartlar bajarilganda qo‘shimcha badalsiz Familienversicherungga qo‘shilishi mumkin. Daromad, boshqa sug‘urta va oilaviy munosabatlar tekshiriladi.",
              de: "In der GKV können Ehegatten und Kinder unter Voraussetzungen beitragsfrei familienversichert werden. Einkommen, anderweitige Versicherung und Familienverhältnis werden geprüft.",
            },
            {
              uz: "Ish beruvchi sizni ijtimoiy sug‘urta tizimiga ro‘yxatdan o‘tkazishi uchun tanlangan Krankenkasse ma’lumotini o‘z vaqtida yuboring.",
              de: "Übermitteln Sie dem Arbeitgeber rechtzeitig die gewählte Krankenkasse, damit die Sozialversicherungsmeldung erfolgen kann.",
            },
          ],
          items: [
            {
              uz: "Sug‘urta bo‘shlig‘iga yo‘l qo‘ymang.",
              de: "Vermeiden Sie Versicherungslücken.",
            },
            {
              uz: "Viza sug‘urtasi qachon tugashini tekshiring.",
              de: "Prüfen Sie das Ende der Visum- oder Übergangsversicherung.",
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
              uz: "Sayohat sug‘urtasini doimiy Krankenkasse deb qabul qilish",
              de: "Reisekrankenversicherung mit dauerhaftem Krankenversicherungsschutz verwechseln",
            },
            {
              uz: "PKVga uzoq muddatli oqibatlarni tushunmasdan kirish",
              de: "PKV ohne Verständnis langfristiger Folgen wählen",
            },
            {
              uz: "Ish beruvchiga Krankenkasse ma’lumotini kech yuborish",
              de: "Krankenkassendaten verspätet an den Arbeitgeber senden",
            },
            {
              uz: "Sug‘urta xatlarini e’tiborsiz qoldirish",
              de: "Schreiben der Krankenversicherung ignorieren",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Maqomingizni aniqlang", de: "Status klären" },
          description: {
            uz: "Ishchi, talaba, oila a’zosi yoki ish qidiruvchi sifatida qaysi qoida tegishli ekanini aniqlang.",
            de: "Klären Sie, welche Regeln als Beschäftigter, Studierender, Familienangehöriger oder Arbeitssuchender gelten.",
          },
        },
        {
          title: { uz: "Variantlarni solishtiring", de: "Optionen vergleichen" },
          description: {
            uz: "GKV kassalari yoki zarur bo‘lsa PKV tariflarini rasmiy ma’lumot bilan solishtiring.",
            de: "Vergleichen Sie GKV-Kassen oder erforderlichenfalls PKV-Tarife anhand offizieller Angaben.",
          },
        },
        {
          title: { uz: "Ro‘yxatdan o‘ting", de: "Mitgliedschaft beantragen" },
          description: {
            uz: "Hujjatlarni yuboring va yozma Mitgliedsbescheinigung oling.",
            de: "Reichen Sie Unterlagen ein und lassen Sie sich die Mitgliedschaft schriftlich bestätigen.",
          },
        },
        {
          title: { uz: "Ish beruvchi yoki universitetga yuboring", de: "Nachweis übermitteln" },
          description: {
            uz: "Sug‘urta ma’lumotini ish beruvchi yoki universitetga taqdim eting.",
            de: "Übermitteln Sie den Versicherungsnachweis an Arbeitgeber oder Hochschule.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Germaniyada tibbiy sug‘urta majburiymi?",
            de: "Ist Krankenversicherung in Deutschland Pflicht?",
          },
          answer: {
            uz: "Ha. Germaniyada yashovchilar uchun yetarli tibbiy sug‘urta talab qilinadi.",
            de: "Ja. Für Personen mit Wohnsitz in Deutschland ist ausreichender Krankenversicherungsschutz erforderlich.",
          },
        },
        {
          question: {
            uz: "Qaysi Krankenkasseni tanlashim kerak?",
            de: "Welche Krankenkasse soll ich wählen?",
          },
          answer: {
            uz: "Bu xizmat, Zusatzbeitrag, til, ilova va shaxsiy ehtiyojga bog‘liq. Rasmiy shartlarni solishtiring.",
            de: "Das hängt von Zusatzbeitrag, Service, Sprache, App und persönlichem Bedarf ab. Vergleichen Sie offizielle Konditionen.",
          },
        },
        {
          question: {
            uz: "Turmush o‘rtog‘im Familienversicherungga kira oladimi?",
            de: "Kann mein Ehegatte familienversichert werden?",
          },
          answer: {
            uz: "GKVda daromad va boshqa shartlar bajarilsa mumkin.",
            de: "In der GKV ist dies möglich, wenn Einkommens- und weitere Voraussetzungen erfüllt sind.",
          },
        },
      ],
      sources: [
        {
          title: "Health insurance",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/health-insurance",
          language: "en",
        },
        {
          title: "Social security",
          organization: "Make it in Germany",
          url: "https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/social-security",
          language: "en",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "anmeldung-guide",
      ],
    },
  {
      id: "bank-account-guide",
      slug: "bank-account-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Germaniyada bank hisobi ochish",
        de: "Bankkonto in Deutschland eröffnen",
      },
      excerpt: {
        uz: "Germaniyada Girokonto yoki Basiskonto ochish: kerakli hujjatlar, IBAN, kartalar, to‘lovlar, onlayn va an’anaviy banklar, Basiskontoga bo‘lgan huquq, firibgarlikdan himoyalanish va bank tanlash mezonlari.",
        de: "Leitfaden zur Eröffnung von Girokonto oder Basiskonto: Unterlagen, IBAN, Karten, Gebühren, Direkt- und Filialbanken, Recht auf ein Basiskonto, Betrugsschutz und Auswahlkriterien.",
      },
      intro: {
        uz: "Germaniyada ish haqi, ijara, sug‘urta, telefon va kundalik to‘lovlar uchun Girokonto deyarli zarur. Odatdagi bank hisobi ochilmasa, qonuniy shartlarga mos shaxslar asosiy funksiyalarga ega Basiskontoni so‘rashi mumkin.",
        de: "Ein Girokonto ist für Gehalt, Miete, Versicherungen, Mobilfunk und alltägliche Zahlungen praktisch unverzichtbar. Wird ein gewöhnliches Konto nicht eröffnet, können berechtigte Personen ein Basiskonto mit grundlegenden Zahlungsfunktionen beantragen.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "10 daqiqa", de: "10 Minuten" },
      facts: [
        {
          label: { uz: "Asosiy hisob", de: "Standardkonto" },
          value: { uz: "Girokonto", de: "Girokonto" },
        },
        {
          label: { uz: "Minimal imkoniyat", de: "Grundversorgung" },
          value: {
            uz: "Shartlar bajarilsa Basiskontoga qonuniy huquq",
            de: "Unter Voraussetzungen gesetzlicher Anspruch auf ein Basiskonto",
          },
        },
        {
          label: { uz: "Asosiy raqam", de: "Kontokennung" },
          value: { uz: "IBAN", de: "IBAN" },
        },
        {
          label: { uz: "Xavfsizlik", de: "Sicherheit" },
          value: {
            uz: "PIN, TAN va login ma’lumotlarini hech kimga bermang",
            de: "PIN, TAN und Zugangsdaten niemals weitergeben",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Girokonto va Basiskonto",
            de: "Girokonto und Basiskonto",
          },
          paragraphs: [
            {
              uz: "Girokonto bankning odatiy kundalik hisobidir. Basiskonto esa naqd pul kiritish va yechish, Überweisung, Lastschrift va karta orqali to‘lov kabi asosiy funksiyalarni ta’minlashi kerak.",
              de: "Das Girokonto ist das übliche Zahlungskonto. Ein Basiskonto muss grundlegende Funktionen wie Ein- und Auszahlungen, Überweisungen, Lastschriften und Kartenzahlungen ermöglichen.",
            },
            {
              uz: "Basiskonto har doim bepul emas; bank maqbul hisob yuritish to‘lovi olishi mumkin.",
              de: "Ein Basiskonto ist nicht zwingend kostenlos; die Bank darf ein angemessenes Kontoführungsentgelt verlangen.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi hisob sizga mos?",
            de: "Welches Konto passt?",
          },
          items: [
            {
              uz: "Filial banki — yuzma-yuz xizmat va naqd pul operatsiyalari muhim bo‘lsa",
              de: "Filialbank – wenn persönliche Beratung und Bargeldservice wichtig sind",
            },
            {
              uz: "Onlayn bank — mobil boshqaruv va pastroq to‘lov muhim bo‘lsa",
              de: "Direktbank – wenn digitale Nutzung und niedrige Gebühren wichtig sind",
            },
            {
              uz: "Basiskonto — oddiy Girokonto ochilishi rad etilsa va qonuniy shartlar bajarilsa",
              de: "Basiskonto – wenn ein gewöhnliches Girokonto abgelehnt wird und die gesetzlichen Voraussetzungen erfüllt sind",
            },
            {
              uz: "Student yoki Azubi hisobi — yosh va maqomga oid imtiyozlar bo‘lsa",
              de: "Studierenden- oder Azubi-Konto – bei alters- oder statusbezogenen Vergünstigungen",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Bank tanlash mezonlari",
            de: "Kriterien bei der Bankwahl",
          },
          items: [
            {
              uz: "Hisob yuritish oylik to‘lovi",
              de: "Monatliches Kontoführungsentgelt",
            },
            {
              uz: "Debit, Girocard yoki kredit karta narxi",
              de: "Kosten für Debitkarte, Girocard oder Kreditkarte",
            },
            {
              uz: "Naqd pul yechish tarmog‘i va to‘lovlari",
              de: "Geldautomatennetz und Abhebegebühren",
            },
            {
              uz: "Xorijga va O‘zbekistonga pul o‘tkazish xarajatlari",
              de: "Kosten für Auslandsüberweisungen",
            },
            {
              uz: "Ilova, ikki bosqichli himoya va mijozlarga xizmat",
              de: "App, Zwei-Faktor-Schutz und Kundenservice",
            },
            {
              uz: "Dispozredit va overdraft foizi",
              de: "Dispozins und Überziehungskosten",
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
              uz: "Pasport",
              de: "Reisepass",
            },
            {
              uz: "Viza yoki Aufenthaltstitel",
              de: "Visum oder Aufenthaltstitel",
            },
            {
              uz: "Meldebescheinigung — bank talabiga qarab",
              de: "Meldebescheinigung – abhängig von der Bank",
            },
            {
              uz: "Steuer-ID — mavjud bo‘lsa yoki keyinroq taqdim etish uchun",
              de: "Steuer-ID – soweit vorhanden oder später nachzureichen",
            },
            {
              uz: "VideoIdent yoki PostIdent uchun mos hujjat",
              de: "Geeignetes Dokument für VideoIdent oder PostIdent",
            },
          ],
        },
        conditions: {
          title: {
            uz: "IBAN, karta va Lastschrift",
            de: "IBAN, Karte und Lastschrift",
          },
          paragraphs: [
            {
              uz: "IBAN ish beruvchi, ijara, sug‘urta va boshqa to‘lovlar uchun ishlatiladi. Lastschrift tashkilotga hisobdan avtomatik yechib olishga ruxsat beradi; noto‘g‘ri yechimlarni muntazam tekshiring.",
              de: "Die IBAN wird für Gehalt, Miete, Versicherungen und weitere Zahlungen genutzt. Eine Lastschrift erlaubt den automatischen Einzug; kontrollieren Sie Kontobewegungen regelmäßig.",
            },
            {
              uz: "Debit karta to‘lovni odatda hisobdan tez yechadi. Kredit kartada esa alohida hisob-kitob va qarz shartlari bo‘lishi mumkin.",
              de: "Bei Debitkarten erfolgt die Belastung grundsätzlich zeitnah vom Konto. Kreditkarten können eigene Abrechnungs- und Kreditbedingungen haben.",
            },
          ],
          items: [
            {
              uz: "Hisobdan yechilgan to‘lovlarni muntazam tekshiring.",
              de: "Kontrollieren Sie Abbuchungen regelmäßig.",
            },
            {
              uz: "Keraksiz Dispokreditni faollashtirmang.",
              de: "Aktivieren Sie keinen unnötigen Dispositionskredit.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Firibgarlikdan himoyalanish",
            de: "Schutz vor Betrug",
          },
          items: [
            {
              uz: "Bank hech qachon PIN yoki to‘liq TANni telefon orqali so‘ramaydi.",
              de: "Eine Bank verlangt telefonisch niemals PIN oder vollständige TAN.",
            },
            {
              uz: "Phishing emaildagi link orqali bankka kirmang.",
              de: "Öffnen Sie Onlinebanking nicht über Links aus Phishing-E-Mails.",
            },
            {
              uz: "Noma’lum ish beruvchiga bank loginini bermang.",
              de: "Geben Sie unbekannten Arbeitgebern keine Onlinebanking-Zugangsdaten.",
            },
            {
              uz: "Hisobingizni boshqa shaxsga pul aylantirish uchun bermang.",
              de: "Stellen Sie Ihr Konto nicht für Geldtransfers fremder Personen zur Verfügung.",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Banklarni solishtiring", de: "Banken vergleichen" },
          description: {
            uz: "To‘lov, karta, naqd pul va xalqaro transfer shartlarini solishtiring.",
            de: "Vergleichen Sie Gebühren, Karten, Bargeldservice und Auslandsüberweisungen.",
          },
        },
        {
          title: { uz: "Hujjatlarni tayyorlang", de: "Unterlagen vorbereiten" },
          description: {
            uz: "Pasport, Aufenthaltstitel va manzil hujjatini tayyorlang.",
            de: "Bereiten Sie Pass, Aufenthaltstitel und Adressnachweis vor.",
          },
        },
        {
          title: { uz: "Identifikatsiyadan o‘ting", de: "Identität bestätigen" },
          description: {
            uz: "Filial, VideoIdent yoki PostIdent orqali shaxsingizni tasdiqlang.",
            de: "Bestätigen Sie Ihre Identität in Filiale, per VideoIdent oder PostIdent.",
          },
        },
        {
          title: { uz: "Xavfsizlikni sozlang", de: "Sicherheit einrichten" },
          description: {
            uz: "Kuchli parol va ikki bosqichli himoyani yoqing.",
            de: "Aktivieren Sie starkes Passwort und Zwei-Faktor-Authentifizierung.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Meldebescheinigungsiz bank hisobi ochsa bo‘ladimi?",
            de: "Kann ich ohne Meldebescheinigung ein Konto eröffnen?",
          },
          answer: {
            uz: "Ba’zi banklarda mumkin, boshqalarida esa talab qilinadi. Bankning rasmiy hujjatlar ro‘yxatini tekshiring.",
            de: "Bei einigen Banken ist dies möglich, andere verlangen sie. Prüfen Sie die offizielle Unterlagenliste der Bank.",
          },
        },
        {
          question: {
            uz: "Basiskonto bepulmi?",
            de: "Ist ein Basiskonto kostenlos?",
          },
          answer: {
            uz: "Majburiy ravishda bepul emas. Bank maqbul hisob yuritish to‘lovi olishi mumkin.",
            de: "Nicht zwingend. Die Bank darf ein angemessenes Kontoführungsentgelt verlangen.",
          },
        },
        {
          question: {
            uz: "Bank Basiskontoni rad etsa nima qilaman?",
            de: "Was tun bei Ablehnung eines Basiskontos?",
          },
          answer: {
            uz: "Yozma rad javobini so‘rang va BaFin yoki iste’molchilar maslahat markaziga murojaat qilish imkoniyatini tekshiring.",
            de: "Verlangen Sie eine schriftliche Ablehnung und prüfen Sie eine Beschwerde bei BaFin oder Verbraucherzentrale.",
          },
        },
      ],
      sources: [
        {
          title: "Girokonto: Was Sie wissen sollten",
          organization: "Verbraucherzentrale",
          url: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/girokonto-was-sie-darueber-wissen-sollten-4990",
          language: "de",
        },
        {
          title: "Das Recht auf ein Basiskonto",
          organization: "Verbraucherzentrale",
          url: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/das-recht-auf-ein-basiskonto-fuer-neu-in-deutschland-angekommene-12224",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "anmeldung-guide",
        "health-insurance-guide",
      ],
    },
  {
      id: "tax-id-guide",
      slug: "tax-id-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Steuer-ID va Steuernummer",
        de: "Steuer-ID und Steuernummer",
      },
      excerpt: {
        uz: "Germaniyadagi soliq raqamlari: 11 xonali Steuer-ID, Steuernummer va Umsatzsteuer-ID farqi, Anmeldungdan keyin raqamni olish, yo‘qolsa qayta so‘rash, ish beruvchiga yuborish va firibgarlikdan himoyalanish.",
        de: "Leitfaden zu deutschen Steuernummern: elfstellige Steuer-ID, Steuernummer und Umsatzsteuer-ID, automatische Vergabe nach Anmeldung, erneute Mitteilung, Übermittlung an Arbeitgeber und Betrugsschutz.",
      },
      intro: {
        uz: "Steuer-ID, Steuernummer va Umsatzsteuer-ID bir xil narsa emas. Yangi kelgan xodim uchun eng muhim raqam — 11 xonali, umrbod amal qiladigan Steuer-ID. U odatda Anmeldungdan keyin avtomatik pochta orqali yuboriladi va ish beruvchi tomonidan ish haqi solig‘ini to‘g‘ri hisoblashda ishlatiladi.",
        de: "Steuer-ID, Steuernummer und Umsatzsteuer-ID sind unterschiedliche Nummern. Für neu eingereiste Beschäftigte ist vor allem die elfstellige, dauerhaft gültige Steuer-ID wichtig. Sie wird nach der Anmeldung grundsätzlich automatisch postalisch mitgeteilt und vom Arbeitgeber für den Lohnsteuerabzug verwendet.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "9 daqiqa", de: "9 Minuten" },
      facts: [
        {
          label: { uz: "Steuer-ID", de: "Steuer-ID" },
          value: {
            uz: "11 xonali va umrbod amal qiladi",
            de: "Elfstellige und dauerhaft gültige Nummer",
          },
        },
        {
          label: { uz: "Olish tartibi", de: "Vergabe" },
          value: {
            uz: "Anmeldungdan keyin odatda avtomatik",
            de: "Nach Anmeldung grundsätzlich automatisch",
          },
        },
        {
          label: { uz: "Steuernummer", de: "Steuernummer" },
          value: {
            uz: "Finanzamt va soliq ishiga bog‘liq raqam",
            de: "Vom Finanzamt und Steuerfall abhängige Nummer",
          },
        },
        {
          label: { uz: "USt-IdNr.", de: "USt-IdNr." },
          value: {
            uz: "Asosan biznes va EU ichidagi QQS jarayonlari uchun",
            de: "Vor allem für Unternehmen und innergemeinschaftliche Umsatzsteuerfälle",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Uchta raqamning farqi",
            de: "Unterschied der drei Nummern",
          },
          paragraphs: [
            {
              uz: "Steuer-ID shaxsga bir marta beriladi, ko‘chish yoki Finanzamt almashishi bilan o‘zgarmaydi. U shaxs haqidagi ma’lumotni raqamning o‘zida saqlamaydi.",
              de: "Die Steuer-ID wird einer Person einmalig zugeteilt und ändert sich weder bei Umzug noch bei Wechsel des Finanzamts. Die Nummer selbst enthält keine persönlichen Informationen.",
            },
            {
              uz: "Steuernummer soliq deklaratsiyasi, mustaqil faoliyat yoki Finanzamt jarayonida beriladi va holatga qarab o‘zgarishi mumkin. Umsatzsteuer-ID esa alohida biznes raqamidir.",
              de: "Die Steuernummer wird im Rahmen von Steuererklärung, Selbstständigkeit oder Finanzamtsverfahren vergeben und kann sich ändern. Die Umsatzsteuer-ID ist eine gesonderte Unternehmensnummer.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kimga qaysi raqam kerak?",
            de: "Wer benötigt welche Nummer?",
          },
          items: [
            {
              uz: "Xodimlar: Steuer-ID",
              de: "Beschäftigte: Steuer-ID",
            },
            {
              uz: "Soliq deklaratsiyasi topshiruvchilar: Steuer-ID va berilgan bo‘lsa Steuernummer",
              de: "Steuererklärende: Steuer-ID und gegebenenfalls Steuernummer",
            },
            {
              uz: "Freelancer yoki Selbstständig: odatda Steuernummer",
              de: "Freelancer oder Selbstständige: regelmäßig Steuernummer",
            },
            {
              uz: "EU ichidagi ayrim biznes operatsiyalari: Umsatzsteuer-ID",
              de: "Bestimmte Geschäfte innerhalb der EU: Umsatzsteuer-ID",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Steuer-ID qanday olinadi?",
            de: "Wie erhält man die Steuer-ID?",
          },
          paragraphs: [
            {
              uz: "Germaniyada Anmeldung qilingandan keyin BZSt Steuer-IDni odatda ro‘yxatdan o‘tgan manzilga avtomatik yuboradi. Yetib kelish vaqti pochta hamda ma’lumot uzatilishiga bog‘liq.",
              de: "Nach der Anmeldung übermittelt das BZSt die Steuer-ID grundsätzlich automatisch an die registrierte Anschrift. Die Zustellung hängt von Datenübermittlung und Postlaufzeit ab.",
            },
            {
              uz: "Raqam kelmasa yoki yo‘qolsa BZSt onlayn xizmati orqali qayta yuborishni so‘rash mumkin. Maxfiylik sabab u odatda email yoki telefon orqali aytilmaydi.",
              de: "Kommt die Nummer nicht an oder geht sie verloren, kann beim BZSt online eine erneute Mitteilung beantragt werden. Aus Datenschutzgründen erfolgt die Mitteilung grundsätzlich nicht per E-Mail oder Telefon.",
            },
          ],
          items: [
            {
              uz: "Steuer-IDni Lohnsteuerbescheinigung yoki oldingi Steuerbescheiddan ham topish mumkin.",
              de: "Die Steuer-ID steht häufig auf Lohnsteuerbescheinigung oder früherem Steuerbescheid.",
            },
            {
              uz: "Yangi Steuer-ID olish uchun pul to‘lash shart emas.",
              de: "Für die erneute Mitteilung der Steuer-ID ist kein privater Vermittler erforderlich.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Ish beruvchiga nima yuboriladi?",
            de: "Was erhält der Arbeitgeber?",
          },
          items: [
            {
              uz: "Steuer-ID",
              de: "Steuer-ID",
            },
            {
              uz: "Tug‘ilgan sana",
              de: "Geburtsdatum",
            },
            {
              uz: "Krankenkasse ma’lumoti",
              de: "Angaben zur Krankenkasse",
            },
            {
              uz: "Bank IBANi",
              de: "IBAN des Bankkontos",
            },
            {
              uz: "Oilaviy holat yoki farzandlar haqida zarur ma’lumot",
              de: "Erforderliche Angaben zu Familienstand oder Kindern",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Steuer-ID kelmasdan ish boshlash",
            de: "Arbeitsbeginn ohne vorliegende Steuer-ID",
          },
          paragraphs: [
            {
              uz: "Steuer-ID hali kelmagan bo‘lsa ham ish beruvchi bilan darhol gaplashing. Ish haqi solig‘i vaqtincha noqulay usulda hisoblanishi mumkin; raqam kelgach ma’lumot yangilanadi.",
              de: "Liegt die Steuer-ID noch nicht vor, informieren Sie den Arbeitgeber unverzüglich. Der Lohnsteuerabzug kann vorläufig ungünstiger erfolgen; nach Mitteilung wird der Datensatz aktualisiert.",
            },
            {
              uz: "Steuer-IDni davlat idoralari va ish beruvchiga faqat zarur rasmiy kanal orqali yuboring.",
              de: "Übermitteln Sie die Steuer-ID an Behörden und Arbeitgeber nur über erforderliche offizielle Kanäle.",
            },
          ],
          items: [
            {
              uz: "Raqamni ochiq guruhga joylamang.",
              de: "Veröffentlichen Sie die Nummer nicht in offenen Gruppen.",
            },
            {
              uz: "Steuer-IDni bank paroli yoki PIN bilan birga saqlamang.",
              de: "Speichern Sie die Steuer-ID nicht gemeinsam mit PIN oder Bankpasswort.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Firibgarlik va chalkashliklar",
            de: "Betrug und Verwechslungen",
          },
          items: [
            {
              uz: "Steuer-IDni «tez olib berish» uchun noma’lum shaxsga pul bermang.",
              de: "Zahlen Sie niemandem für eine angeblich beschleunigte Steuer-ID.",
            },
            {
              uz: "Steuernummerni Steuer-ID deb ish beruvchiga yubormang.",
              de: "Übermitteln Sie dem Arbeitgeber nicht versehentlich die Steuernummer statt der Steuer-ID.",
            },
            {
              uz: "Umsatzsteuer-ID oddiy xodim uchun odatda kerak emas.",
              de: "Eine Umsatzsteuer-ID ist für gewöhnliche Beschäftigte grundsätzlich nicht erforderlich.",
            },
            {
              uz: "Phishing xatlarida ko‘rsatilgan noma’lum saytlarga Steuer-IDni kiritmang.",
              de: "Geben Sie die Steuer-ID nicht auf unbekannten Websites aus Phishing-Nachrichten ein.",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Anmeldung qiling", de: "Wohnsitz anmelden" },
          description: {
            uz: "Steuer-ID avtomatik berilishi uchun manzilni ro‘yxatdan o‘tkazing.",
            de: "Melden Sie den Wohnsitz an, damit die Steuer-ID automatisch mitgeteilt werden kann.",
          },
        },
        {
          title: { uz: "Pochta qutisini tekshiring", de: "Post prüfen" },
          description: {
            uz: "Ismingiz pochta qutisida to‘g‘ri yozilgan bo‘lsin.",
            de: "Achten Sie darauf, dass Ihr Name korrekt am Briefkasten steht.",
          },
        },
        {
          title: { uz: "Raqamni xavfsiz saqlang", de: "Nummer sicher speichern" },
          description: {
            uz: "Xatning raqamli va qog‘oz nusxasini xavfsiz joyda saqlang.",
            de: "Bewahren Sie digitale und gedruckte Kopien sicher auf.",
          },
        },
        {
          title: { uz: "Ish beruvchiga yuboring", de: "Arbeitgeber informieren" },
          description: {
            uz: "Faqat rasmiy va xavfsiz kanal orqali yuboring.",
            de: "Übermitteln Sie die Nummer ausschließlich über einen sicheren offiziellen Kanal.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Steuer-ID o‘zgaradimi?",
            de: "Ändert sich die Steuer-ID?",
          },
          answer: {
            uz: "Yo‘q. U odatda umrbod amal qiladi va ko‘chish bilan o‘zgarmaydi.",
            de: "Nein. Sie gilt grundsätzlich lebenslang und ändert sich bei Umzug nicht.",
          },
        },
        {
          question: {
            uz: "Steuer-ID kelmasa nima qilaman?",
            de: "Was tun, wenn die Steuer-ID nicht kommt?",
          },
          answer: {
            uz: "BZSt onlayn xizmatidan qayta yuborishni so‘rang va Anmeldung ma’lumotlaringizni tekshiring.",
            de: "Beantragen Sie beim BZSt online eine erneute Mitteilung und prüfen Sie Ihre Meldedaten.",
          },
        },
        {
          question: {
            uz: "Steuer-IDni telefon orqali olish mumkinmi?",
            de: "Kann ich die Steuer-ID telefonisch erhalten?",
          },
          answer: {
            uz: "Maxfiylik sabab odatda yo‘q; raqam ro‘yxatdan o‘tgan manzilga yuboriladi.",
            de: "Aus Datenschutzgründen grundsätzlich nein; die Mitteilung erfolgt an die registrierte Anschrift.",
          },
        },
      ],
      sources: [
        {
          title: "Steuerliche Identifikationsnummer",
          organization: "Bundeszentralamt für Steuern",
          url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html",
          language: "de",
        },
        {
          title: "Erneute Mitteilung der Steuer-ID",
          organization: "BZSt online.portal",
          url: "https://online.portal.bzst.de/SharedDocs/Leistungsbeschreibung/DE/erneute_mitteilung_der_ID-Nr.html",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "anmeldung-guide",
        "bank-account-guide",
      ],
    },
  {
      id: "residence-permit-eat-guide",
      slug: "residence-permit-eat-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Aufenthaltstitel, eAT va Ausländerbehörde",
        de: "Aufenthaltstitel, eAT und Ausländerbehörde",
      },
      excerpt: {
        uz: "Milliy vizadan Germaniyadagi yashash ruxsatiga o‘tish: Ausländerbehörde, elektron Aufenthaltstitel, biometrika, Nebenbestimmungen, Fiktionsbescheinigung, hujjatlar, muddatlar va keng tarqalgan xatolar.",
        de: "Leitfaden vom nationalen Visum zum Aufenthaltstitel: Ausländerbehörde, elektronischer Aufenthaltstitel, Biometrie, Nebenbestimmungen, Fiktionsbescheinigung, Unterlagen, Fristen und häufige Fehler.",
      },
      intro: {
        uz: "Milliy viza Germaniyaga kirish va dastlabki yashash uchun xizmat qiladi. Rejalashtirilgan yashash muddati vizadan uzoq bo‘lsa, viza tugashidan oldin mas’ul Ausländerbehördega Aufenthaltstitel uchun murojaat qilinadi. Ko‘pchilik uchinchi davlat fuqarolariga ruxsat elektron Aufenthaltstitel — eAT karta shaklida beriladi.",
        de: "Das nationale Visum dient der Einreise und dem anfänglichen Aufenthalt. Dauert der geplante Aufenthalt länger als das Visum, muss vor dessen Ablauf bei der zuständigen Ausländerbehörde ein Aufenthaltstitel beantragt werden. Für die meisten Drittstaatsangehörigen wird er als elektronischer Aufenthaltstitel – eAT – ausgegeben.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "12 daqiqa", de: "12 Minuten" },
      facts: [
        {
          label: { uz: "Vakolatli idora", de: "Zuständige Behörde" },
          value: {
            uz: "Ro‘yxatdan o‘tgan manzil bo‘yicha Ausländerbehörde",
            de: "Ausländerbehörde am gemeldeten Wohnort",
          },
        },
        {
          label: { uz: "Karta turi", de: "Dokument" },
          value: {
            uz: "Chipli elektron Aufenthaltstitel — eAT",
            de: "Elektronischer Aufenthaltstitel mit Chip – eAT",
          },
        },
        {
          label: { uz: "Muhim muddat", de: "Wichtige Frist" },
          value: {
            uz: "Arizani viza yoki amaldagi ruxsat tugashidan oldin yuborish",
            de: "Antrag vor Ablauf von Visum oder bestehendem Titel stellen",
          },
        },
        {
          label: { uz: "Vaqtinchalik hujjat", de: "Vorläufiger Nachweis" },
          value: {
            uz: "Shartlar bajarilsa Fiktionsbescheinigung berilishi mumkin",
            de: "Unter Voraussetzungen kann eine Fiktionsbescheinigung ausgestellt werden",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Aufenthaltstitel va eAT nima?",
            de: "Was sind Aufenthaltstitel und eAT?",
          },
          paragraphs: [
            {
              uz: "Aufenthaltstitel Germaniyada ma’lum maqsad bilan yashash huquqini beradi. Masalan, Ausbildung, ish, EU Blue Card, Studium yoki oila birlashtirish uchun alohida huquqiy asos mavjud.",
              de: "Ein Aufenthaltstitel erlaubt den Aufenthalt in Deutschland zu einem bestimmten Zweck, etwa Ausbildung, Beschäftigung, Blaue Karte EU, Studium oder Familiennachzug.",
            },
            {
              uz: "eAT plastik karta bo‘lib, unda shaxsiy ma’lumotlar, biometrik foto, barmoq izlari va qo‘shimcha shartlar saqlanadi. Ishlash huquqi yoki cheklovlar karta va Zusatzblattda ko‘rsatilishi mumkin.",
              de: "Der eAT ist eine Plastikkarte mit persönlichen Daten, biometrischem Foto, Fingerabdrücken und Nebenbestimmungen. Erwerbsrechte oder Beschränkungen können auf Karte und Zusatzblatt vermerkt sein.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Kim murojaat qiladi?",
            de: "Wer muss einen Antrag stellen?",
          },
          items: [
            {
              uz: "Milliy vizasi yashash muddatini to‘liq qamramaydigan shaxslar",
              de: "Personen, deren nationales Visum den geplanten Aufenthalt nicht vollständig abdeckt",
            },
            {
              uz: "Amaldagi Aufenthaltstitelini uzaytirayotgan shaxslar",
              de: "Personen, die ihren bestehenden Aufenthaltstitel verlängern",
            },
            {
              uz: "Yashash maqsadini qonuniy ravishda o‘zgartirayotgan shaxslar",
              de: "Personen, die den Aufenthaltszweck rechtmäßig wechseln",
            },
            {
              uz: "Yo‘qolgan yoki buzilgan eAT o‘rniga yangi karta oluvchilar",
              de: "Personen, die einen verlorenen oder beschädigten eAT ersetzen müssen",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Ariza va muddatlar",
            de: "Antrag und Fristen",
          },
          paragraphs: [
            {
              uz: "Ausländerbehörde jarayonini viza tugashiga yaqin qoldirmang. Ko‘plab shaharlarda termin uzoq kutiladi. Rasmiy portal, forma yoki email orqali ariza yuborish imkoniyatini oldindan tekshiring.",
              de: "Warten Sie mit dem Verfahren nicht bis kurz vor Visumablauf. In vielen Städten bestehen lange Wartezeiten. Prüfen Sie frühzeitig Portal, Formular oder offiziellen E-Mail-Antragsweg.",
            },
            {
              uz: "Fiktionsbescheinigung faqat Aufenthaltstitel arizasi mavjud bo‘lsa va qaror hali chiqarilmagan bo‘lsa berilishi mumkin. Uning ishlash va safar huquqiga ta’siri qaysi huquqiy asosda berilganiga bog‘liq.",
              de: "Eine Fiktionsbescheinigung setzt einen gestellten Aufenthaltstitelantrag und eine noch ausstehende Entscheidung voraus. Auswirkungen auf Erwerbstätigkeit und Reisen hängen von der konkreten Rechtsgrundlage ab.",
            },
          ],
          items: [
            {
              uz: "Ariza yuborilgan sana va tasdiqni saqlang.",
              de: "Bewahren Sie Versanddatum und Eingangsbestätigung auf.",
            },
            {
              uz: "Viza tugashidan oldin rasmiy murojaat qiling.",
              de: "Stellen Sie den Antrag vor Ablauf des Visums.",
            },
            {
              uz: "Fiktionsbescheinigung bilan xorijga chiqishdan oldin uning qayta kirish huquqini tekshiring.",
              de: "Prüfen Sie vor Auslandsreisen, ob die Fiktionsbescheinigung zur Wiedereinreise berechtigt.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan hujjatlar",
            de: "Üblicherweise erforderliche Unterlagen",
          },
          items: [
            { uz: "Pasport va amaldagi viza", de: "Reisepass und gültiges Visum" },
            { uz: "Biometrik fotosurat", de: "Biometrisches Passfoto" },
            { uz: "Meldebescheinigung", de: "Meldebescheinigung" },
            {
              uz: "Yashash maqsadi dalili: ish, Ausbildung, universitet yoki oilaviy hujjat",
              de: "Nachweis des Aufenthaltszwecks: Arbeit, Ausbildung, Hochschule oder Familienunterlagen",
            },
            {
              uz: "Tibbiy sug‘urta dalili",
              de: "Nachweis des Krankenversicherungsschutzes",
            },
            {
              uz: "Daromad yoki moliyaviy ta’minot dalili",
              de: "Einkommens- oder Finanzierungsnachweis",
            },
            {
              uz: "Idora so‘ragan qo‘shimcha hujjatlar",
              de: "Weitere von der Behörde verlangte Unterlagen",
            },
          ],
        },
        conditions: {
          title: {
            uz: "eAT kartani olish va tekshirish",
            de: "eAT abholen und prüfen",
          },
          paragraphs: [
            {
              uz: "Biometrika topshirilgach eAT Bundesdruckereida tayyorlanadi. Tayyor bo‘lish muddati shahar va ish holatiga qarab farq qiladi.",
              de: "Nach der Biometrie wird der eAT bei der Bundesdruckerei hergestellt. Die Bearbeitungszeit unterscheidet sich nach Behörde und Einzelfall.",
            },
            {
              uz: "Kartani olganda ism, amal qilish muddati, Aufenthaltstitel paragrafi va Erwerbstätigkeit haqidagi yozuvni tekshiring.",
              de: "Prüfen Sie bei Abholung Name, Gültigkeit, Rechtsgrundlage und Vermerk zur Erwerbstätigkeit.",
            },
          ],
          items: [
            {
              uz: "Zusatzblattni yo‘qotmang.",
              de: "Bewahren Sie das Zusatzblatt sorgfältig auf.",
            },
            {
              uz: "Manzil o‘zgarsa idora va Melderegister ma’lumotlarini yangilang.",
              de: "Aktualisieren Sie bei Umzug Melderegister und erforderliche Behördenangaben.",
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
              uz: "Viza tugagandan keyin ariza topshirish",
              de: "Antrag erst nach Visumablauf stellen",
            },
            {
              uz: "Termin so‘rovini Aufenthaltstitel arizasi deb hisoblash",
              de: "Eine bloße Terminanfrage mit einem Aufenthaltstitelantrag verwechseln",
            },
            {
              uz: "Fiktionsbescheinigung bilan safar huquqini tekshirmaslik",
              de: "Reisewirkung der Fiktionsbescheinigung nicht prüfen",
            },
            {
              uz: "Kartadagi ishlash cheklovlarini e’tiborsiz qoldirish",
              de: "Erwerbsbeschränkungen auf Karte oder Zusatzblatt ignorieren",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Mas’ul idorani toping", de: "Zuständige Behörde finden" },
          description: {
            uz: "Anmeldung manzilingiz bo‘yicha Ausländerbehördeni aniqlang.",
            de: "Ermitteln Sie die Ausländerbehörde am gemeldeten Wohnort.",
          },
        },
        {
          title: { uz: "Arizani erta yuboring", de: "Antrag früh stellen" },
          description: {
            uz: "Viza tugashidan oldin rasmiy kanal orqali ariza yuboring.",
            de: "Reichen Sie den Antrag vor Visumablauf über den offiziellen Weg ein.",
          },
        },
        {
          title: { uz: "Biometrik terminga boring", de: "Biometrietermin wahrnehmen" },
          description: {
            uz: "Asl hujjatlar bilan shaxsan qatnashing.",
            de: "Erscheinen Sie persönlich mit Originalunterlagen.",
          },
        },
        {
          title: { uz: "Kartani tekshirib oling", de: "eAT prüfen und abholen" },
          description: {
            uz: "Karta va Zusatzblattdagi barcha ma’lumotlarni tekshiring.",
            de: "Prüfen Sie alle Angaben auf Karte und Zusatzblatt.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Termin topilmasa viza avtomatik uzayadimi?",
            de: "Verlängert sich das Visum automatisch, wenn kein Termin verfügbar ist?",
          },
          answer: {
            uz: "Yo‘q. Viza tugashidan oldin rasmiy Aufenthaltstitel arizasi yuborilishi kerak. Faqat termin so‘rashning huquqiy ta’siri har doim yetarli emas.",
            de: "Nein. Vor Ablauf muss ein offizieller Aufenthaltstitelantrag gestellt werden. Eine reine Terminanfrage genügt rechtlich nicht immer.",
          },
        },
        {
          question: {
            uz: "Fiktionsbescheinigung bilan ishlash mumkinmi?",
            de: "Darf ich mit einer Fiktionsbescheinigung arbeiten?",
          },
          answer: {
            uz: "Bu oldingi ruxsat va Fiktionsbescheinigung turiga bog‘liq. Hujjatdagi Erwerbstätigkeit yozuvini tekshiring.",
            de: "Das hängt vom bisherigen Titel und der Art der Fiktionswirkung ab. Prüfen Sie den Vermerk zur Erwerbstätigkeit.",
          },
        },
        {
          question: {
            uz: "eAT tayyor bo‘lguncha nima ishlataman?",
            de: "Was gilt bis zur Fertigstellung des eAT?",
          },
          answer: {
            uz: "Amaldagi viza, eski Aufenthaltstitel yoki idora bergan tegishli vaqtinchalik hujjat ishlatiladi.",
            de: "Es gelten gültiges Visum, bisheriger Aufenthaltstitel oder ein von der Behörde ausgestellter vorläufiger Nachweis.",
          },
        },
      ],
      sources: [
        {
          title: "Elektronischer Aufenthaltstitel",
          organization: "Bundesamt für Migration und Flüchtlinge",
          url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/eAufenthaltstitel/eaufenthaltstitel-node.html",
          language: "de",
        },
        {
          title: "Fiktionsbescheinigung",
          organization: "Service Berlin",
          url: "https://service.berlin.de/dienstleistung/326233/",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "anmeldung-guide",
        "national-visa",
      ],
    },
  {
      id: "deutschlandticket-transport-guide",
      slug: "deutschlandticket-transport-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Deutschlandticket va jamoat transporti",
        de: "Deutschlandticket und öffentlicher Nahverkehr",
      },
      excerpt: {
        uz: "Germaniyada avtobus, tramvay, U-Bahn, S-Bahn, RB va REdan foydalanish, Deutschlandticketning 2026-yildagi narxi, amal qilish hududi, ICE/IC cheklovi, obuna, bekor qilish va chipta nazorati.",
        de: "Leitfaden zu Bus, Straßenbahn, U-Bahn, S-Bahn, RB und RE, Preis des Deutschlandtickets 2026, Geltungsbereich, Ausschluss von ICE/IC, Abonnement, Kündigung und Ticketkontrolle.",
      },
      intro: {
        uz: "Deutschlandticket Germaniya bo‘ylab mahalliy va regional jamoat transportidan foydalanish uchun shaxsiy obuna chiptasidir. 2026-yilda uning narxi oyiga 63 yevro. U avtobus, tramvay, U-Bahn, S-Bahn, RB va REda amal qiladi, lekin odatda ICE, IC va EC kabi uzoq masofali poyezdlarda ishlamaydi.",
        de: "Das Deutschlandticket ist ein persönliches Abonnement für den bundesweiten öffentlichen Nah- und Regionalverkehr. Im Jahr 2026 kostet es 63 Euro monatlich. Es gilt in Bus, Straßenbahn, U-Bahn, S-Bahn, RB und RE, grundsätzlich jedoch nicht in ICE, IC oder EC.",
      },
      status: "published",
      featured: true,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "10 daqiqa", de: "10 Minuten" },
      facts: [
        {
          label: { uz: "Narx 2026", de: "Preis 2026" },
          value: { uz: "Oyiga 63 yevro", de: "63 Euro pro Monat" },
        },
        {
          label: { uz: "Amal qiladi", de: "Gültig" },
          value: {
            uz: "Bus, tramvay, U-Bahn, S-Bahn, RB va RE",
            de: "Bus, Straßenbahn, U-Bahn, S-Bahn, RB und RE",
          },
        },
        {
          label: { uz: "Amal qilmaydi", de: "Nicht gültig" },
          value: {
            uz: "Odatda ICE, IC va EC",
            de: "Grundsätzlich ICE, IC und EC",
          },
        },
        {
          label: { uz: "Shartnoma", de: "Vertrag" },
          value: {
            uz: "Avtomatik uzayadigan oylik obuna",
            de: "Monatlich fortlaufendes Abonnement",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Transport turlari",
            de: "Verkehrsmittel verstehen",
          },
          items: [
            { uz: "Bus va tramvay — shahar transporti", de: "Bus und Straßenbahn – Stadtverkehr" },
            { uz: "U-Bahn — metro", de: "U-Bahn – städtische Schnellbahn" },
            { uz: "S-Bahn — shahar va atrof hudud", de: "S-Bahn – Stadt und Umland" },
            { uz: "RB va RE — regional poyezdlar", de: "RB und RE – Regionalzüge" },
            { uz: "ICE, IC va EC — uzoq masofali transport", de: "ICE, IC und EC – Fernverkehr" },
          ],
        },
        eligibility: {
          title: {
            uz: "Deutschlandticket kimga mos?",
            de: "Für wen eignet sich das Deutschlandticket?",
          },
          items: [
            {
              uz: "Har kuni ish yoki o‘qishga jamoat transportida boruvchilar",
              de: "Pendler zu Arbeit, Ausbildung oder Hochschule",
            },
            {
              uz: "Turli shaharlarda regional transportdan foydalanadiganlar",
              de: "Personen mit regelmäßigen Regionalfahrten",
            },
            {
              uz: "Bir nechta Verkehrsverbund hududida qatnaydiganlar",
              de: "Fahrgäste in mehreren Verkehrsverbünden",
            },
            {
              uz: "Mahalliy oylik chipta narxi 63 yevroga yaqin yoki undan yuqori bo‘lganlar",
              de: "Personen, deren lokales Monatsticket ähnlich viel oder mehr kostet",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Sotib olish va bekor qilish",
            de: "Kauf und Kündigung",
          },
          paragraphs: [
            {
              uz: "Deutschlandticket DB Navigator, DB savdo kanallari va ko‘plab mahalliy transport kompaniyalarida sotiladi. U shaxsiy chipta bo‘lib, boshqa odamga berilmaydi.",
              de: "Das Deutschlandticket ist über DB Navigator, DB-Vertrieb und viele lokale Verkehrsunternehmen erhältlich. Es ist personengebunden und nicht übertragbar.",
            },
            {
              uz: "DBda obuna odatda oyning 10-kunigacha bekor qilinsa shu oy oxirida tugaydi; boshqa provayderlarda qoidalar farq qilishi mumkin.",
              de: "Bei der DB endet das Abo bei Kündigung bis zum 10. grundsätzlich zum Monatsende; bei anderen Anbietern können abweichende Regeln gelten.",
            },
          ],
          items: [
            {
              uz: "Chipta kalendar oyiga amal qiladi.",
              de: "Das Ticket gilt für Kalendermonate.",
            },
            {
              uz: "Bekor qilish muddatini provayderdan tekshiring.",
              de: "Prüfen Sie die Kündigungsfrist beim Anbieter.",
            },
            {
              uz: "Telefon almashtirilsa chipta akkauntini oldindan tiklang.",
              de: "Sichern Sie bei Gerätewechsel den Zugriff auf das Kundenkonto.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Chipta nazoratida nima kerak?",
            de: "Was wird bei der Kontrolle benötigt?",
          },
          items: [
            {
              uz: "Amaldagi Deutschlandticket yoki QR-kod",
              de: "Gültiges Deutschlandticket oder QR-Code",
            },
            {
              uz: "Pasport, Aufenthaltstitel yoki boshqa rasmiy foto hujjat",
              de: "Reisepass, Aufenthaltstitel oder anderer amtlicher Lichtbildausweis",
            },
            {
              uz: "Telefon chiptasi bo‘lsa yetarli batareya va ilovaga kirish",
              de: "Bei Handyticket ausreichender Akku und App-Zugang",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Regional va uzoq masofali transport farqi",
            de: "Nahverkehr und Fernverkehr unterscheiden",
          },
          paragraphs: [
            {
              uz: "RE yoki RB belgisi bo‘lgan poyezdlar odatda Deutschlandticketga kiradi. ICE, IC va EC odatda kirmaydi, hatto bir xil yo‘nalishda yursa ham.",
              de: "Züge mit RE- oder RB-Kennung sind grundsätzlich enthalten. ICE, IC und EC sind regelmäßig ausgeschlossen, auch wenn sie auf derselben Strecke fahren.",
            },
            {
              uz: "Ayrim maxsus regional yo‘nalishlarda istisnolar bo‘lishi mumkin. Safardan oldin DB Navigator yoki transport kompaniyasida chipta amal qilishini tekshiring.",
              de: "Auf einzelnen besonderen Strecken können Ausnahmen bestehen. Prüfen Sie vor Fahrt in DB Navigator oder beim Verkehrsunternehmen die Gültigkeit.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Jarima va keng tarqalgan xatolar",
            de: "Kontrolle und häufige Fehler",
          },
          items: [
            {
              uz: "ICEga faqat Deutschlandticket bilan chiqish",
              de: "Mit Deutschlandticket allein in ICE einsteigen",
            },
            {
              uz: "Obunani bekor qilmasdan ilovani o‘chirish",
              de: "App löschen, ohne das Abonnement zu kündigen",
            },
            {
              uz: "Telefon o‘chib qolishi sabab chiptani ko‘rsata olmaslik",
              de: "Ticket wegen leerem Akku nicht vorzeigen können",
            },
            {
              uz: "Chipta boshqa odamga berilishi mumkin deb o‘ylash",
              de: "Annehmen, das Ticket sei übertragbar",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Ehtiyojingizni hisoblang", de: "Bedarf prüfen" },
          description: {
            uz: "Mahalliy tarif va Deutschlandticket narxini solishtiring.",
            de: "Vergleichen Sie lokale Tarife mit dem Deutschlandticket.",
          },
        },
        {
          title: { uz: "Provayderni tanlang", de: "Anbieter wählen" },
          description: {
            uz: "DB yoki mahalliy Verkehrsverbund shartlarini solishtiring.",
            de: "Vergleichen Sie DB und lokale Verkehrsverbünde.",
          },
        },
        {
          title: { uz: "Obunani faollashtiring", de: "Abo aktivieren" },
          description: {
            uz: "Shaxsiy ma’lumot va to‘lov usulini kiriting.",
            de: "Hinterlegen Sie persönliche Daten und Zahlungsmethode.",
          },
        },
        {
          title: { uz: "Safardan oldin yo‘nalishni tekshiring", de: "Verbindung prüfen" },
          description: {
            uz: "Poyezd turi va chipta amal qilishini ilovada tekshiring.",
            de: "Prüfen Sie Zugart und Gültigkeit in der App.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Deutschlandticket ICEda ishlaydimi?",
            de: "Gilt das Deutschlandticket im ICE?",
          },
          answer: {
            uz: "Odatda yo‘q. U mahalliy va regional transport uchun mo‘ljallangan.",
            de: "Grundsätzlich nein. Es gilt im öffentlichen Nah- und Regionalverkehr.",
          },
        },
        {
          question: {
            uz: "Deutschlandticket avtomatik uzayadimi?",
            de: "Verlängert sich das Deutschlandticket automatisch?",
          },
          answer: {
            uz: "Ha. U obuna hisoblanadi va o‘z vaqtida bekor qilinmasa davom etadi.",
            de: "Ja. Es handelt sich um ein Abonnement, das ohne fristgerechte Kündigung weiterläuft.",
          },
        },
        {
          question: {
            uz: "Chipta boshqa odamga beriladimi?",
            de: "Ist das Ticket übertragbar?",
          },
          answer: {
            uz: "Yo‘q. U shaxsiy va nazoratda foto hujjat talab qilinishi mumkin.",
            de: "Nein. Es ist personengebunden; bei Kontrolle kann ein Lichtbildausweis verlangt werden.",
          },
        },
      ],
      sources: [
        {
          title: "Deutschlandticket kaufen",
          organization: "Deutsche Bahn",
          url: "https://www.bahn.de/angebot/regio/deutschland-ticket",
          language: "de",
        },
        {
          title: "Deutschland-Ticket for 63 euros",
          organization: "Deutsche Bahn",
          url: "https://int.bahn.de/en/offers/regional/deutschland-ticket",
          language: "en",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "bank-account-guide",
      ],
    },
  {
      id: "rundfunkbeitrag-guide",
      slug: "rundfunkbeitrag-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Rundfunkbeitrag: GEZ to‘lovi",
        de: "Rundfunkbeitrag: Anmeldung, Zahlung und Befreiung",
      },
      excerpt: {
        uz: "Germaniyadagi Rundfunkbeitrag: bir xonadon uchun 18,36 yevro, WG va oilalar, Beitragsnummer, ro‘yxatdan o‘tish, ko‘chish, ozod qilish, kamaytirish va soxta xatlardan himoyalanish.",
        de: "Leitfaden zum Rundfunkbeitrag: 18,36 Euro pro Wohnung, WG und Familien, Beitragsnummer, Anmeldung, Umzug, Befreiung, Ermäßigung und Schutz vor gefälschten Schreiben.",
      },
      intro: {
        uz: "Rundfunkbeitrag — Germaniyada jamoat teleradio xizmatlarini moliyalashtirish uchun har bir xonadon bo‘yicha olinadigan badal. Hozirgi miqdor oyiga 18,36 yevro. Uyda nechta odam yoki qurilma borligi muhim emas: bir xonadon uchun bitta badal to‘lanadi.",
        de: "Der Rundfunkbeitrag finanziert den öffentlich-rechtlichen Rundfunk und wird grundsätzlich pro Wohnung erhoben. Derzeit beträgt er 18,36 Euro monatlich. Zahl der Bewohner oder Geräte spielt keine Rolle: Pro Wohnung fällt ein Beitrag an.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "9 daqiqa", de: "9 Minuten" },
      facts: [
        {
          label: { uz: "Miqdor", de: "Höhe" },
          value: { uz: "Oyiga 18,36 yevro", de: "18,36 Euro monatlich" },
        },
        {
          label: { uz: "Hisoblash", de: "Grundsatz" },
          value: { uz: "Bir xonadon — bir badal", de: "Eine Wohnung – ein Beitrag" },
        },
        {
          label: { uz: "WG", de: "WG" },
          value: {
            uz: "Bir kishi to‘laydi, qolganlar uning Beitragsnummeridan foydalanadi",
            de: "Eine Person zahlt, andere nutzen deren Beitragsnummer",
          },
        },
        {
          label: { uz: "Ozod qilish", de: "Befreiung" },
          value: {
            uz: "Faqat qonunda belgilangan holatlarda va ariza bilan",
            de: "Nur in gesetzlich geregelten Fällen und auf Antrag",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Kim to‘laydi?",
            de: "Wer zahlt?",
          },
          paragraphs: [
            {
              uz: "Xonadon egasi, ijarachi yoki WGdagi bir shaxs Beitragskonto ochadi. Boshqa yashovchilar alohida to‘lamaydi, lekin ularga kelgan xatga mavjud Beitragsnummer bilan javob berishi kerak bo‘lishi mumkin.",
              de: "Eine Person der Wohnung führt das Beitragskonto. Weitere Bewohner zahlen nicht zusätzlich, müssen aber auf Anschreiben gegebenenfalls mit der bestehenden Beitragsnummer reagieren.",
            },
            {
              uz: "Televizor, radio yoki internetdan foydalanmaslik to‘lovni avtomatik bekor qilmaydi.",
              de: "Der Verzicht auf Fernseher, Radio oder Internet befreit nicht automatisch von der Zahlung.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Ozod qilish yoki kamaytirish",
            de: "Befreiung oder Ermäßigung",
          },
          items: [
            {
              uz: "Ayrim ijtimoiy nafaqa oluvchilar",
              de: "Empfänger bestimmter Sozialleistungen",
            },
            {
              uz: "Qonunda belgilangan ayrim nogironlik holatlari",
              de: "Bestimmte gesetzlich geregelte Behinderungsfälle",
            },
            {
              uz: "Maxsus Härtefall holatlari",
              de: "Besondere Härtefälle",
            },
            {
              uz: "Ozod qilish uchun rasmiy ariza va dalil talab qilinadi",
              de: "Befreiung erfordert offiziellen Antrag und Nachweise",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Ro‘yxatdan o‘tish va Beitragsnummer",
            de: "Anmeldung und Beitragsnummer",
          },
          paragraphs: [
            {
              uz: "Yangi xonadon uchun rasmiy onlayn forma orqali Anmeldung qilinadi. Agar xonadonda boshqa shaxs allaqachon to‘layotgan bo‘lsa, uning Beitragsnummeri ko‘rsatiladi.",
              de: "Eine neue Wohnung wird über das offizielle Onlineformular angemeldet. Zahlt bereits eine andere Person, wird deren Beitragsnummer angegeben.",
            },
            {
              uz: "Beitragsnummerni xavfsiz saqlang. Ko‘chish, ma’lumotni o‘zgartirish yoki xonadonni bekor qilishda kerak bo‘ladi.",
              de: "Bewahren Sie die Beitragsnummer sicher auf. Sie wird bei Umzug, Datenänderung oder Abmeldung benötigt.",
            },
          ],
          items: [
            {
              uz: "Rasmiy domenni tekshiring.",
              de: "Prüfen Sie die offizielle Domain.",
            },
            {
              uz: "Bir xonadon uchun ikki marta to‘lovni oldini oling.",
              de: "Vermeiden Sie doppelte Zahlung für dieselbe Wohnung.",
            },
          ],
        },
        documents: {
          title: {
            uz: "Kerak bo‘ladigan ma’lumotlar",
            de: "Benötigte Angaben",
          },
          items: [
            { uz: "Ism va manzil", de: "Name und Anschrift" },
            { uz: "Ko‘chib kirish sanasi", de: "Einzugsdatum" },
            {
              uz: "Mavjud bo‘lsa boshqa to‘lovchining Beitragsnummeri",
              de: "Gegebenenfalls Beitragsnummer einer bereits zahlenden Person",
            },
            {
              uz: "Ozod qilish uchun tegishli Bescheid yoki dalil",
              de: "Für Befreiung entsprechender Bescheid oder Nachweis",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Ko‘chish va xonadonni bekor qilish",
            de: "Umzug und Abmeldung",
          },
          paragraphs: [
            {
              uz: "Ko‘chganda yangi manzilni rasmiy forma orqali yangilang. Xonadon faqat ma’lum qonuniy holatlarda, masalan Germaniyadan chiqish yoki boshqa to‘lovchi bilan bir xonadonga ko‘chishda bekor qilinadi.",
              de: "Bei Umzug wird die Anschrift offiziell geändert. Eine Wohnung kann nur unter bestimmten Voraussetzungen abgemeldet werden, etwa bei Wegzug ins Ausland oder Einzug zu einer bereits zahlenden Person.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Soxta xatlar va xatolar",
            de: "Gefälschte Schreiben und Fehler",
          },
          items: [
            {
              uz: "Noma’lum IBANga to‘lov yuborish",
              de: "Zahlung an unbekannte IBAN",
            },
            {
              uz: "WGda boshqa odam to‘layotgan bo‘lsa ham alohida konto ochish",
              de: "Eigenes Konto eröffnen, obwohl in der WG bereits gezahlt wird",
            },
            {
              uz: "Ozod qilish avtomatik deb o‘ylash",
              de: "Annehmen, eine Befreiung erfolge automatisch",
            },
            {
              uz: "Rasmiy xatlarni e’tiborsiz qoldirish",
              de: "Offizielle Schreiben ignorieren",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Xonadon holatini tekshiring", de: "Wohnungssituation prüfen" },
          description: {
            uz: "Kimdir allaqachon to‘layotganini aniqlang.",
            de: "Klären Sie, ob bereits jemand für die Wohnung zahlt.",
          },
        },
        {
          title: { uz: "Rasmiy formani yuboring", de: "Offizielles Formular nutzen" },
          description: {
            uz: "Yangi Anmeldung yoki mavjud Beitragsnummer orqali javob bering.",
            de: "Melden Sie neu an oder reagieren Sie mit bestehender Beitragsnummer.",
          },
        },
        {
          title: { uz: "Hujjatlarni saqlang", de: "Unterlagen sichern" },
          description: {
            uz: "Tasdiq, Beitragsnummer va to‘lovlarni saqlang.",
            de: "Bewahren Sie Bestätigung, Beitragsnummer und Zahlungen auf.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "WGdagi har bir odam to‘laydimi?",
            de: "Zahlt in einer WG jede Person?",
          },
          answer: {
            uz: "Yo‘q. Bir xonadon uchun bir marta to‘lanadi.",
            de: "Nein. Pro Wohnung fällt nur ein Beitrag an.",
          },
        },
        {
          question: {
            uz: "Televizorim bo‘lmasa ham to‘laymanmi?",
            de: "Muss ich ohne Fernseher zahlen?",
          },
          answer: {
            uz: "Ha. To‘lov qurilmalar soniga bog‘liq emas.",
            de: "Ja. Der Beitrag hängt nicht von vorhandenen Geräten ab.",
          },
        },
        {
          question: {
            uz: "Talaba avtomatik ozod qilinadimi?",
            de: "Sind Studierende automatisch befreit?",
          },
          answer: {
            uz: "Yo‘q. Faqat tegishli qonuniy asos bo‘lsa va ariza berilsa.",
            de: "Nein. Nur bei passender gesetzlicher Voraussetzung und Antrag.",
          },
        },
      ],
      sources: [
        {
          title: "Informationen für Bürgerinnen und Bürger",
          organization: "ARD ZDF Deutschlandradio Beitragsservice",
          url: "https://www.rundfunkbeitrag.de/informationen",
          language: "de",
        },
        {
          title: "Wohnung anmelden",
          organization: "ARD ZDF Deutschlandradio Beitragsservice",
          url: "https://www.rundfunkbeitrag.de/buergerinnen-und-buerger/formulare/anmelden",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "anmeldung-guide",
        "bank-account-guide",
      ],
    },
  {
      id: "mobile-internet-guide",
      slug: "mobile-internet-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Germaniyada telefon va internet",
        de: "Mobilfunk und Internet in Deutschland",
      },
      excerpt: {
        uz: "Prepaid, mobil shartnoma, eSIM, uy interneti, Mindestlaufzeit, Kündigungsfrist, roaming, SIM aktivlashtirish, tarif tanlash va telefon firibgarligidan himoyalanish.",
        de: "Leitfaden zu Prepaid, Mobilfunkvertrag, eSIM, Festnetz-Internet, Mindestlaufzeit, Kündigungsfrist, Roaming, SIM-Aktivierung, Tarifwahl und Betrugsschutz.",
      },
      intro: {
        uz: "Germaniyada aloqa uchun Prepaid, muddatli mobil shartnoma, eSIM va uy interneti variantlari mavjud. Eng arzon reklama narxiga emas, shartnoma muddati, Kündigungsfrist, aktivlashtirish to‘lovi, internet hajmi va tarmoq qamroviga qarab tanlang.",
        de: "In Deutschland stehen Prepaid, Laufzeitvertrag, eSIM und Festnetz-Internet zur Verfügung. Entscheidend sind nicht nur Werbepreis, sondern Mindestlaufzeit, Kündigungsfrist, Aktivierungsentgelt, Datenvolumen und Netzabdeckung.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "9 daqiqa", de: "9 Minuten" },
      facts: [
        {
          label: { uz: "Moslashuvchan variant", de: "Flexible Option" },
          value: { uz: "Prepaid", de: "Prepaid" },
        },
        {
          label: { uz: "Uzoq shartnoma", de: "Laufzeitvertrag" },
          value: {
            uz: "Ko‘pincha 24 oygacha Mindestlaufzeit",
            de: "Häufig bis zu 24 Monate Mindestlaufzeit",
          },
        },
        {
          label: { uz: "Identifikatsiya", de: "Identifizierung" },
          value: {
            uz: "SIM aktivlashtirishda shaxsni tasdiqlash talab qilinadi",
            de: "Für SIM-Aktivierung ist Identitätsprüfung erforderlich",
          },
        },
        {
          label: { uz: "Raqamni saqlash", de: "Rufnummernmitnahme" },
          value: {
            uz: "Provayder almashtirilganda raqamni ko‘chirish mumkin",
            de: "Rufnummer kann beim Anbieterwechsel mitgenommen werden",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Prepaid, Vertrag va eSIM",
            de: "Prepaid, Vertrag und eSIM",
          },
          paragraphs: [
            {
              uz: "Prepaid yangi kelganlar uchun moslashuvchan: uzoq muddatli majburiyat kam, lekin tarifni muntazam to‘ldirish kerak. Vertrag ko‘proq internet yoki telefon qurilmasi bilan paket berishi mumkin, lekin uzoq muddatli majburiyat tug‘diradi.",
              de: "Prepaid ist für Neuankömmlinge flexibel und bindet weniger langfristig, muss aber regelmäßig aufgeladen werden. Laufzeitverträge bieten oft mehr Daten oder Gerätepakete, schaffen jedoch längerfristige Verpflichtungen.",
            },
            {
              uz: "eSIM fizik karta o‘rniga qurilmaga raqamli profil o‘rnatadi. Telefon va provayder eSIMni qo‘llashini tekshiring.",
              de: "Bei eSIM wird statt einer physischen Karte ein digitales Profil installiert. Gerät und Anbieter müssen eSIM unterstützen.",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Qaysi variant kimga mos?",
            de: "Welche Option passt?",
          },
          items: [
            {
              uz: "Prepaid — yangi kelgan va qisqa muddatli moslashuvchanlik istaganlar uchun",
              de: "Prepaid – für Neuankömmlinge und flexible Nutzung",
            },
            {
              uz: "Oylik bekor qilinadigan tarif — barqarorlik va moslashuvchanlik o‘rtasida",
              de: "Monatlich kündbarer Tarif – zwischen Flexibilität und Komfort",
            },
            {
              uz: "24 oylik Vertrag — uzoq muddat qoladigan va shartlarni tushunadiganlar uchun",
              de: "24-Monats-Vertrag – für langfristigen Aufenthalt bei verstandenen Konditionen",
            },
            {
              uz: "Uy interneti — doimiy manzil va yetarli texnik ulanish mavjud bo‘lsa",
              de: "Festnetz – bei dauerhaftem Wohnsitz und verfügbarer technischer Leitung",
            },
          ],
        },
        requirements: {
          title: {
            uz: "Tarif tanlash mezonlari",
            de: "Kriterien bei der Tarifwahl",
          },
          items: [
            { uz: "Oylik umumiy narx", de: "Monatlicher Gesamtpreis" },
            { uz: "Mindestlaufzeit", de: "Mindestlaufzeit" },
            { uz: "Kündigungsfrist", de: "Kündigungsfrist" },
            { uz: "Internet hajmi va tezligi", de: "Datenvolumen und Geschwindigkeit" },
            { uz: "EU roaming shartlari", de: "EU-Roaming-Bedingungen" },
            { uz: "Aktivlashtirish va router to‘lovi", de: "Aktivierungs- und Routerkosten" },
            { uz: "Manzildagi tarmoq qamrovi", de: "Netzabdeckung am Wohnort" },
          ],
        },
        documents: {
          title: {
            uz: "Odatda kerak bo‘ladigan ma’lumotlar",
            de: "Üblicherweise erforderliche Angaben",
          },
          items: [
            { uz: "Pasport yoki Aufenthaltstitel", de: "Reisepass oder Aufenthaltstitel" },
            { uz: "Germaniyadagi manzil", de: "Deutsche Anschrift" },
            { uz: "Bank IBANi — Vertrag uchun", de: "IBAN – bei Laufzeitvertrag" },
            { uz: "Email va telefon", de: "E-Mail-Adresse und Telefonnummer" },
            { uz: "SIM aktivlashtirish uchun identifikatsiya", de: "Identitätsprüfung für SIM-Aktivierung" },
          ],
        },
        conditions: {
          title: {
            uz: "Uy interneti va bekor qilish",
            de: "Festnetz und Kündigung",
          },
          paragraphs: [
            {
              uz: "Uy internetida ulanish mavjudligini manzil bo‘yicha tekshiring. DSL, kabel yoki optik tolali tarmoq mavjudligi binoga qarab farq qiladi.",
              de: "Prüfen Sie die Verfügbarkeit an der Adresse. DSL, Kabel oder Glasfaser unterscheiden sich je nach Gebäude.",
            },
            {
              uz: "Ko‘chish Vertragni har doim avtomatik bekor qilmaydi. Provayder yangi manzilda xizmat bera olishi va qonuniy bekor qilish shartlari tekshiriladi.",
              de: "Ein Umzug beendet den Vertrag nicht automatisch. Entscheidend sind Versorgung am neuen Wohnort und gesetzliche Kündigungsregeln.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Firibgarlik va yashirin xarajatlar",
            de: "Betrug und versteckte Kosten",
          },
          items: [
            {
              uz: "Telefon orqali aytilgan shartnomani tushunmasdan tasdiqlash",
              de: "Telefonisch angebotenen Vertrag ungeprüft bestätigen",
            },
            {
              uz: "Birinchi oy arzon narxdan keyingi haqiqiy narxni tekshirmaslik",
              de: "Nach Aktionspreis den späteren Normalpreis übersehen",
            },
            {
              uz: "Noma’lum link orqali SIM yoki bank ma’lumotini kiritish",
              de: "SIM- oder Bankdaten über unbekannte Links eingeben",
            },
            {
              uz: "Kündigungni faqat telefon orqali qilgan deb o‘ylash",
              de: "Annehmen, eine telefonische Kündigung sei ausreichend dokumentiert",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Qamrovni tekshiring", de: "Netz prüfen" },
          description: {
            uz: "Uy va ish joyida tarmoq qamrovini tekshiring.",
            de: "Prüfen Sie Netzabdeckung an Wohn- und Arbeitsort.",
          },
        },
        {
          title: { uz: "Tariflarni solishtiring", de: "Tarife vergleichen" },
          description: {
            uz: "Faqat promo narxni emas, butun shartnomani solishtiring.",
            de: "Vergleichen Sie den gesamten Vertrag, nicht nur Aktionspreise.",
          },
        },
        {
          title: { uz: "Shaxsni tasdiqlang", de: "Identität bestätigen" },
          description: {
            uz: "Rasmiy VideoIdent, PostIdent yoki filial orqali.",
            de: "Über offiziellen VideoIdent-, PostIdent- oder Filialweg.",
          },
        },
        {
          title: { uz: "Bekor qilish muddatini saqlang", de: "Kündigungsfrist notieren" },
          description: {
            uz: "Kalendarga shartnoma tugashi va Kündigungsfristni yozing.",
            de: "Notieren Sie Vertragsende und Kündigungsfrist im Kalender.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "Prepaid uchun Anmeldung kerakmi?",
            de: "Brauche ich für Prepaid eine Anmeldung?",
          },
          answer: {
            uz: "Har doim emas, lekin shaxsni rasmiy tasdiqlash majburiy. Provayder hujjat talablari farq qiladi.",
            de: "Nicht immer, aber eine offizielle Identitätsprüfung ist erforderlich. Unterlagen unterscheiden sich je Anbieter.",
          },
        },
        {
          question: {
            uz: "EU roaming cheksizmi?",
            de: "Ist EU-Roaming unbegrenzt?",
          },
          answer: {
            uz: "Yo‘q. Fair-Use va tarif shartlari mavjud bo‘lishi mumkin.",
            de: "Nein. Fair-Use- und Tarifbedingungen können gelten.",
          },
        },
        {
          question: {
            uz: "Raqamimni boshqa provayderga olib o‘ta olamanmi?",
            de: "Kann ich meine Rufnummer mitnehmen?",
          },
          answer: {
            uz: "Ha, shartlarga rioya qilinganda Rufnummernmitnahme mumkin.",
            de: "Ja, unter Einhaltung der Portierungsbedingungen ist eine Rufnummernmitnahme möglich.",
          },
        },
      ],
      sources: [
        {
          title: "Telekommunikation: Verträge und Verbraucherrechte",
          organization: "Bundesnetzagentur",
          url: "https://www.bundesnetzagentur.de/DE/Vportal/TK/InternetTelefon/start.html",
          language: "de",
        },
        {
          title: "Mobilfunkvertrag: Darauf sollten Sie achten",
          organization: "Verbraucherzentrale",
          url: "https://www.verbraucherzentrale.de/wissen/digitale-welt/mobilfunk-und-festnetz",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "bank-account-guide",
      ],
    },
  {
      id: "emergency-public-services-guide",
      slug: "emergency-public-services-guide",
      categorySlug: "after-arrival",
      title: {
        uz: "Favqulodda raqamlar va foydali davlat xizmatlari",
        de: "Notrufnummern und wichtige öffentliche Dienste",
      },
      excerpt: {
        uz: "Germaniyada 112, 110 va 116117 raqamlari, zaharlanish holati, navbatchi dorixona, Bürgeramt, Ausländerbehörde, Bundesportal, Deutsche Post, DHL va DB Navigator xizmatlaridan to‘g‘ri foydalanish.",
        de: "Leitfaden zu 112, 110 und 116117, Giftnotruf, Apothekennotdienst, Bürgeramt, Ausländerbehörde, Bundesportal, Deutsche Post, DHL und DB Navigator.",
      },
      intro: {
        uz: "Germaniyada favqulodda vaziyatda to‘g‘ri raqamga qo‘ng‘iroq qilish hayotiy ahamiyatga ega. 112 tez yordam va yong‘in uchun, 110 politsiya favqulodda holati uchun, 116117 esa shoshilinch, lekin hayot uchun xavfli bo‘lmagan tibbiy yordam uchun ishlatiladi.",
        de: "Im Notfall ist die richtige Rufnummer entscheidend. 112 gilt für Rettungsdienst und Feuerwehr, 110 für Polizeinotfälle und 116117 für dringende, aber nicht lebensbedrohliche medizinische Beschwerden.",
      },
      status: "published",
      featured: false,
      lastReviewedAt: "2026-08-06",
      readingTime: { uz: "9 daqiqa", de: "9 Minuten" },
      facts: [
        {
          label: { uz: "112", de: "112" },
          value: { uz: "Tez yordam va yong‘in", de: "Rettungsdienst und Feuerwehr" },
        },
        {
          label: { uz: "110", de: "110" },
          value: { uz: "Politsiya favqulodda holati", de: "Polizeinotfall" },
        },
        {
          label: { uz: "116117", de: "116117" },
          value: {
            uz: "Hayot uchun xavfli bo‘lmagan shoshilinch tibbiy yordam",
            de: "Dringende, nicht lebensbedrohliche medizinische Hilfe",
          },
        },
        {
          label: { uz: "Davlat xizmatlari", de: "Verwaltung" },
          value: {
            uz: "Bundesportal va mahalliy xizmat portallari",
            de: "Bundesportal und lokale Serviceportale",
          },
        },
      ],
      sections: {
        overview: {
          title: {
            uz: "Qaysi raqam qachon ishlatiladi?",
            de: "Welche Nummer in welcher Situation?",
          },
          items: [
            {
              uz: "112 — hushdan ketish, og‘ir nafas qisilishi, kuchli qon ketish, yong‘in yoki hayot uchun xavf",
              de: "112 – Bewusstlosigkeit, schwere Atemnot, starke Blutung, Feuer oder Lebensgefahr",
            },
            {
              uz: "110 — jinoyat davom etayotgan bo‘lsa, zo‘ravonlik yoki politsiya tez yetib kelishi zarur bo‘lsa",
              de: "110 – laufende Straftat, Gewalt oder dringender Polizeieinsatz",
            },
            {
              uz: "116117 — kechasi yoki dam olish kuni shifokor kerak, lekin hayot uchun bevosita xavf yo‘q",
              de: "116117 – ärztliche Hilfe außerhalb der Sprechzeiten ohne akute Lebensgefahr",
            },
          ],
        },
        eligibility: {
          title: {
            uz: "Yana qaysi xizmatlar foydali?",
            de: "Weitere wichtige Dienste",
          },
          items: [
            { uz: "Apothekennotdienst — navbatchi dorixona", de: "Apothekennotdienst – dienstbereite Apotheke" },
            { uz: "Giftnotruf — zaharlanish markazi", de: "Giftnotruf – Beratung bei Vergiftungen" },
            { uz: "Bürgeramt — Anmeldung va shaxsiy ma’muriy xizmatlar", de: "Bürgeramt – Anmeldung und kommunale Verwaltungsleistungen" },
            { uz: "Ausländerbehörde — yashash huquqi masalalari", de: "Ausländerbehörde – aufenthaltsrechtliche Angelegenheiten" },
            { uz: "Bundesportal — davlat xizmatlarini topish", de: "Bundesportal – Verwaltungsleistungen finden" },
            { uz: "Deutsche Post va DHL — xat va jo‘natmalar", de: "Deutsche Post und DHL – Briefe und Sendungen" },
            { uz: "DB Navigator — poyezd va jamoat transporti yo‘nalishlari", de: "DB Navigator – Bahn- und Nahverkehrsverbindungen" },
          ],
        },
        requirements: {
          title: {
            uz: "Favqulodda qo‘ng‘iroqda nima aytiladi?",
            de: "Was sagt man beim Notruf?",
          },
          items: [
            { uz: "Qayerda sodir bo‘ldi?", de: "Wo ist es passiert?" },
            { uz: "Nima sodir bo‘ldi?", de: "Was ist passiert?" },
            { uz: "Nechta odam zararlangan?", de: "Wie viele Personen sind betroffen?" },
            { uz: "Qanday jarohat yoki xavf bor?", de: "Welche Verletzung oder Gefahr besteht?" },
            { uz: "Operator savollarini kuting va telefonni erta uzmang", de: "Rückfragen abwarten und nicht vorschnell auflegen" },
          ],
        },
        documents: {
          title: {
            uz: "Telefoningizda saqlab qo‘ying",
            de: "Im Telefon speichern",
          },
          items: [
            { uz: "112", de: "112" },
            { uz: "110", de: "110" },
            { uz: "116117", de: "116117" },
            {
              uz: "Shaharingizdagi Giftnotruf raqami",
              de: "Giftnotruf Ihrer Region",
            },
            {
              uz: "Krankenkasse va Hausarzt raqami",
              de: "Krankenkasse und Hausarzt",
            },
            {
              uz: "Elchixona va yaqin inson kontakti",
              de: "Botschaft und Notfallkontakt",
            },
          ],
        },
        conditions: {
          title: {
            uz: "Davlat xizmatlarini to‘g‘ri topish",
            de: "Behördendienste richtig finden",
          },
          paragraphs: [
            {
              uz: "Bundesportal orqali xizmat nomi va manzil bo‘yicha mas’ul idorani topish mumkin. Ko‘plab xizmatlar Bundesland yoki shahar darajasida bo‘lgani sabab aniq mahalliy portal ustuvor bo‘ladi.",
              de: "Über das Bundesportal lassen sich Leistungen und zuständige Stellen nach Wohnort finden. Da viele Verfahren landes- oder kommunal geregelt sind, ist das konkrete lokale Portal maßgeblich.",
            },
            {
              uz: "Google reklamasidagi birinchi link har doim rasmiy emas. `.bund.de`, `.de` rasmiy shahar domenlari va tashkilotning to‘g‘ri domenini tekshiring.",
              de: "Der erste Werbelink in Suchmaschinen ist nicht automatisch offiziell. Prüfen Sie `.bund.de`, offizielle Stadt-Domains und die korrekte Organisationsdomain.",
            },
          ],
        },
        warnings: {
          title: {
            uz: "Favqulodda raqamlardan noto‘g‘ri foydalanmang",
            de: "Notrufnummern nicht missbrauchen",
          },
          items: [
            {
              uz: "Oddiy termin yoki hujjat savoli uchun 112 yoki 110ga qo‘ng‘iroq qilmang",
              de: "112 oder 110 nicht für gewöhnliche Termin- oder Behördenfragen nutzen",
            },
            {
              uz: "Hayot uchun xavf bo‘lsa 116117 bilan vaqt yo‘qotmang — 112ga qo‘ng‘iroq qiling",
              de: "Bei Lebensgefahr nicht über 116117 verzögern – 112 wählen",
            },
            {
              uz: "Soxta DHL yoki davlat xizmati SMS linklariga kirmang",
              de: "Keine Links aus gefälschten DHL- oder Behörden-SMS öffnen",
            },
            {
              uz: "Davlat xizmati uchun noma’lum vositachiga pasport yubormang",
              de: "Passdaten nicht an unbekannte Vermittler für Behördenleistungen senden",
            },
          ],
        },
      },
      steps: [
        {
          title: { uz: "Vaziyatni baholang", de: "Situation einschätzen" },
          description: {
            uz: "Hayot uchun xavf bormi yoki oddiy tibbiy yordam kerakmi aniqlang.",
            de: "Klären Sie, ob Lebensgefahr oder nicht lebensbedrohliche Hilfe vorliegt.",
          },
        },
        {
          title: { uz: "To‘g‘ri raqamni tering", de: "Richtige Nummer wählen" },
          description: {
            uz: "112, 110 yoki 116117dan mosini tanlang.",
            de: "Wählen Sie passend 112, 110 oder 116117.",
          },
        },
        {
          title: { uz: "Aniq ma’lumot bering", de: "Klare Angaben machen" },
          description: {
            uz: "Manzil va vaziyatni qisqa va aniq tushuntiring.",
            de: "Nennen Sie Ort und Situation kurz und eindeutig.",
          },
        },
        {
          title: { uz: "Operator ko‘rsatmasiga amal qiling", de: "Anweisungen befolgen" },
          description: {
            uz: "Telefonni uzmang va xavfsiz bo‘lsa yordam ko‘rsating.",
            de: "Nicht auflegen und, soweit sicher, Erste Hilfe leisten.",
          },
        },
      ],
      faq: [
        {
          question: {
            uz: "116117 tez yordammi?",
            de: "Ist 116117 der Rettungsdienst?",
          },
          answer: {
            uz: "Yo‘q. U hayot uchun xavfli bo‘lmagan shoshilinch tibbiy yordam uchun. Hayot uchun xavf bo‘lsa 112.",
            de: "Nein. Sie ist für dringende, nicht lebensbedrohliche Beschwerden. Bei Lebensgefahr gilt 112.",
          },
        },
        {
          question: {
            uz: "112 bepulmi?",
            de: "Ist 112 kostenlos?",
          },
          answer: {
            uz: "Ha. Germaniyada mobil va stasionar telefondan bepul teriladi.",
            de: "Ja. Die Nummer ist in Deutschland kostenlos erreichbar.",
          },
        },
        {
          question: {
            uz: "Zaharlanishda nima qilaman?",
            de: "Was tun bei Vergiftung?",
          },
          answer: {
            uz: "Og‘ir alomat yoki hayot uchun xavf bo‘lsa 112. Boshqa holatda hududingizdagi Giftnotruf bilan bog‘laning va modda qadoqini saqlang.",
            de: "Bei schweren Symptomen oder Lebensgefahr 112 wählen. Sonst regionalen Giftnotruf kontaktieren und Verpackung des Stoffes bereithalten.",
          },
        },
      ],
      sources: [
        {
          title: "Healthcare numbers to call in an emergency",
          organization: "gesund.bund.de",
          url: "https://gesund.bund.de/en/notfallnummern",
          language: "en",
        },
        {
          title: "Ärztlicher Bereitschaftsdienst",
          organization: "116117",
          url: "https://www.116117.de/de/aerztlicher-bereitschaftsdienst.php",
          language: "de",
        },
        {
          title: "Bundesportal",
          organization: "Bundesrepublik Deutschland",
          url: "https://verwaltung.bund.de/",
          language: "de",
        },
      ],
      relatedArticleSlugs: [
        "first-steps-after-arrival",
        "health-insurance-guide",
        "deutschlandticket-transport-guide",
      ],
    },
] satisfies ReadonlyArray<LocalizedGuideArticle>;
