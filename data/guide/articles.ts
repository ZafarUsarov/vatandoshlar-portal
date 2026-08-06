import type {
  GuideArticle,
  LocalizedGuideArticle,
  SupportedGuideLocale,
} from "../../types/guide";

export const localizedGuideArticles: ReadonlyArray<LocalizedGuideArticle> = [
  {
    id: "au-pair",
    slug: "au-pair",
    categorySlug: "coming-to-germany",
    title: {
      uz: "Germaniyada Au Pair",
      de: "Au-pair in Deutschland",
    },
    excerpt: {
      uz: "Au Pair sifatida Germaniyaga kelish talablari, mezbon oila, ish vaqti, cho‘ntak puli, til kursi, sug‘urta va viza jarayoni bo‘yicha rasmiy manbalarga asoslangan qo‘llanma.",
      de: "Offizieller Leitfaden zu Voraussetzungen, Gastfamilie, Arbeitszeit, Taschengeld, Sprachkurs, Versicherung und Visum für einen Au-pair-Aufenthalt in Deutschland.",
    },
    intro: {
      uz: "Au Pair — yosh insonning mezbon oilada yashab, asosan bolalarni parvarish qilish va yengil uy ishlarida yordam berish evaziga nemis tilini yaxshilashi hamda Germaniya madaniyati bilan tanishishi uchun mo‘ljallangan dastur. Bu oddiy to‘liq stavkali ish emas; madaniy almashinuv va til o‘rganish asosiy maqsad hisoblanadi.",
      de: "Ein Au-pair-Aufenthalt ermöglicht jungen Menschen, in einer Gastfamilie zu leben, vor allem bei der Kinderbetreuung und leichten Hausarbeit zu helfen, Deutsch zu lernen und den Alltag in Deutschland kennenzulernen. Es handelt sich nicht um eine gewöhnliche Vollzeitbeschäftigung; der kulturelle Austausch steht im Mittelpunkt.",
    },
    status: "published",
    featured: true,
    lastReviewedAt: "2026-08-05",
    readingTime: {
      uz: "10 daqiqa",
      de: "10 Minuten",
    },
    facts: [
      {
        label: { uz: "Yosh", de: "Alter" },
        value: {
          uz: "Ish boshlanganda kamida 18 yosh; yashash ruxsatiga ariza berishda 27 yoshga to‘lmagan",
          de: "Mindestens 18 Jahre bei Beginn; bei Beantragung des Aufenthaltstitels noch nicht 27 Jahre alt",
        },
      },
      {
        label: { uz: "Davomiylik", de: "Dauer" },
        value: {
          uz: "Kamida 6 oy, ko‘pi bilan 12 oy",
          de: "Mindestens 6, höchstens 12 Monate",
        },
      },
      {
        label: { uz: "Nemis tili", de: "Deutschkenntnisse" },
        value: {
          uz: "Kamida A1 daraja kutiladi",
          de: "Mindestens Niveau A1 wird erwartet",
        },
      },
      {
        label: { uz: "Ish vaqti", de: "Arbeitszeit" },
        value: {
          uz: "Kuniga ko‘pi bilan 6 soat, haftasiga 30 soat",
          de: "Höchstens 6 Stunden täglich und 30 Stunden wöchentlich",
        },
      },
      {
        label: { uz: "Cho‘ntak puli", de: "Taschengeld" },
        value: {
          uz: "Oyiga 280 yevro",
          de: "280 Euro monatlich",
        },
      },
      {
        label: { uz: "Til kursi yordami", de: "Sprachkurszuschuss" },
        value: {
          uz: "Mezbon oila kamida 840 yevro yoki oyiga 70 yevro hissa qo‘shadi",
          de: "Mindestens 840 Euro insgesamt oder 70 Euro monatlich durch die Gastfamilie",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Au Pair nima?",
          de: "Was ist ein Au-pair?",
        },
        paragraphs: [
          {
            uz: "Au Pair mezbon oila bilan bir uyda yashaydi. Asosiy vazifalar bolalarni kuzatish, bog‘cha yoki maktabga olib borish, ular bilan o‘ynash, oddiy taom tayyorlash va yengil uy ishlariga yordam berishdan iborat bo‘lishi mumkin.",
            de: "Ein Au-pair lebt im Haushalt der Gastfamilie. Zu den typischen Aufgaben gehören Kinderbetreuung, das Begleiten zu Kita oder Schule, Spielen mit den Kindern, einfache Mahlzeiten und leichte Hausarbeit.",
          },
          {
            uz: "Kasal yoki parvarishga muhtoj keksa odamlarni professional tarzda parvarish qilish Au Pair vazifasiga kirmaydi.",
            de: "Die Pflege kranker oder pflegebedürftiger älterer Menschen gehört nicht zu den Aufgaben eines Au-pairs.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Kimlar qatnasha oladi?",
          de: "Wer kann teilnehmen?",
        },
        items: [
          {
            uz: "Ish boshlanishida kamida 18 yosh bo‘lganlar",
            de: "Personen, die bei Beginn mindestens 18 Jahre alt sind",
          },
          {
            uz: "Yashash ruxsatiga ariza berish vaqtida 27 yoshga to‘lmaganlar",
            de: "Personen, die bei Beantragung des Aufenthaltstitels noch nicht 27 Jahre alt sind",
          },
          {
            uz: "Kamida A1 darajadagi boshlang‘ich nemis tiliga ega bo‘lganlar",
            de: "Personen mit grundlegenden Deutschkenntnissen, mindestens Niveau A1",
          },
          {
            uz: "Mezbon oila bilan qarindosh bo‘lmaganlar",
            de: "Personen, die nicht mit der Gastfamilie verwandt sind",
          },
          {
            uz: "6–12 oy davomida mezbon oilada yashashga tayyor bo‘lganlar",
            de: "Personen, die bereit sind, 6 bis 12 Monate in der Gastfamilie zu leben",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Mezbon oila va asosiy shartlar",
          de: "Gastfamilie und zentrale Bedingungen",
        },
        items: [
          {
            uz: "Mezbon oilada kamida 18 yoshga to‘lmagan bitta bola doimiy yashashi kerak.",
            de: "In der Gastfamilie muss mindestens ein Kind unter 18 Jahren dauerhaft leben.",
          },
          {
            uz: "Au Pair uchun odatda oilaning uyida alohida xona va bepul ovqat taqdim etiladi.",
            de: "Das Au-pair erhält grundsätzlich ein eigenes Zimmer im Haushalt der Familie sowie kostenlose Verpflegung.",
          },
          {
            uz: "Haftasiga kamida 1,5 kun dam olish, oyiga kamida bir yakshanba va haftasiga kamida to‘rtta bo‘sh kecha beriladi.",
            de: "Es bestehen Ansprüche auf mindestens 1,5 freie Tage pro Woche, mindestens einen freien Sonntag pro Monat und mindestens vier freie Abende pro Woche.",
          },
          {
            uz: "12 oylik Au Pair davri uchun to‘rt hafta haq to‘lanadigan ta’til beriladi; qisqaroq muddatda har to‘liq oy uchun ikki ish kuni.",
            de: "Bei einem vollen Jahr bestehen vier Wochen bezahlter Urlaub; bei kürzerer Dauer zwei Werktage pro vollem Monat.",
          },
          {
            uz: "Mezbon oila kasallik, homiladorlik, tug‘ruq va baxtsiz hodisa holatlarini qoplaydigan sug‘urtani to‘lashi kerak.",
            de: "Die Gastfamilie trägt die Kosten einer Versicherung für Krankheit, Schwangerschaft, Geburt und Unfall.",
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
            uz: "Imzolangan Au Pair shartnomasi",
            de: "Unterzeichneter Au-pair-Vertrag",
          },
          {
            uz: "Mezbon oila to‘ldirgan rasmiy savolnoma yoki mezbon oila ma’lumotlari",
            de: "Fragebogen beziehungsweise Angaben der Gastfamilie",
          },
          {
            uz: "Nemis tili bo‘yicha A1 darajasini ko‘rsatuvchi dalil yoki vakolatxona tekshiruvi",
            de: "Nachweis beziehungsweise Prüfung grundlegender Deutschkenntnisse auf Niveau A1",
          },
          {
            uz: "Milliy viza arizasi uchun mas’ul Germaniya vakolatxonasi talab qilgan shaxsiy hujjatlar",
            de: "Persönliche Unterlagen nach der aktuellen Checkliste der zuständigen deutschen Auslandsvertretung",
          },
          {
            uz: "Sug‘urta va yashash sharoiti bo‘yicha tasdiqlar, agar vakolatxona talab qilsa",
            de: "Nachweise zu Versicherung und Unterbringung, sofern von der Auslandsvertretung verlangt",
          },
        ],
        paragraphs: [
          {
            uz: "Aniq hujjatlar ro‘yxati yashash joyingiz uchun mas’ul Germaniya elchixonasi yoki konsulligiga qarab farq qilishi mumkin. Ariza berishdan oldin aynan o‘sha vakolatxonaning amaldagi checklistini tekshiring.",
            de: "Die genaue Unterlagenliste kann je nach zuständiger deutscher Auslandsvertretung variieren. Prüfen Sie vor der Antragstellung immer die aktuelle Checkliste der zuständigen Stelle.",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Ish va yashash sharoitlari",
          de: "Arbeits- und Lebensbedingungen",
        },
        items: [
          {
            uz: "Uy ishlari va bola parvarishi birgalikda haftasiga 30 soatdan oshmasligi kerak.",
            de: "Hausarbeit und Kinderbetreuung dürfen zusammen 30 Stunden pro Woche nicht überschreiten.",
          },
          {
            uz: "Qo‘shimcha ish vaqti oldindan kelishilishi va bo‘sh vaqt bilan qoplanishi kerak.",
            de: "Mehrarbeit muss vorher vereinbart und durch Freizeit ausgeglichen werden.",
          },
          {
            uz: "Mezbon oila nemis tili kursi xarajatlariga kamida 840 yevro hissa qo‘shadi va eng yaqin mos kursga zarur yo‘l xarajatlarini ham to‘laydi.",
            de: "Die Gastfamilie beteiligt sich mit mindestens 840 Euro an den Sprachkurskosten und übernimmt zusätzlich notwendige Fahrtkosten zum nächstgelegenen geeigneten Kurs.",
          },
          {
            uz: "Au Pairning Germaniyaga kelish va qaytish yo‘l xarajatlari odatda Au Pairning o‘z zimmasida bo‘ladi.",
            de: "Die Kosten für An- und Rückreise trägt das Au-pair in der Regel selbst.",
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
            uz: "Uchinchi davlat fuqarolari Au Pair faoliyatini boshlashdan oldin tegishli milliy viza yoki yashash ruxsatini olishlari kerak.",
            de: "Drittstaatsangehörige benötigen vor Beginn der Au-pair-Tätigkeit das erforderliche nationale Visum beziehungsweise den passenden Aufenthaltstitel.",
          },
          {
            uz: "Viza chiqmasdan turib katta miqdorda vositachilik puli yubormang va shartnoma hamda mezbon oilani tekshiring.",
            de: "Zahlen Sie vor Erteilung des Visums keine hohen Vermittlungsgebühren und prüfen Sie Vertrag sowie Gastfamilie sorgfältig.",
          },
          {
            uz: "Rasmiy termin tizimi bepul. Termin uchun maxsus kirish va’da qiladigan vositachilarga ishonmang.",
            de: "Das offizielle Terminbuchungssystem ist kostenlos. Misstrauen Sie Vermittlern, die einen besonderen Zugang zu Terminen versprechen.",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Mezbon oilani toping",
          de: "Gastfamilie finden",
        },
        description: {
          uz: "Oilani o‘zingiz yoki ishonchli agentlik orqali topishingiz mumkin. Oilaning tarkibi, bolalar, vazifalar, xona va yashash sharoitlarini oldindan tekshiring.",
          de: "Sie können selbst oder über eine seriöse Vermittlungsstelle suchen. Klären Sie Familienstruktur, Kinder, Aufgaben, Zimmer und Lebensbedingungen im Voraus.",
        },
      },
      {
        title: {
          uz: "Shartlarni yozma ravishda kelishib oling",
          de: "Bedingungen schriftlich vereinbaren",
        },
        description: {
          uz: "Ish vaqti, vazifalar, dam olish, cho‘ntak puli, til kursi, sug‘urta va boshlanish sanasini shartnomada aniq yozing.",
          de: "Halten Sie Arbeitszeit, Aufgaben, Freizeit, Taschengeld, Sprachkurs, Versicherung und Beginn eindeutig im Vertrag fest.",
        },
      },
      {
        title: {
          uz: "Rasmiy Au Pair shartnomasini imzolang",
          de: "Au-pair-Vertrag unterschreiben",
        },
        description: {
          uz: "Bundesagentur für Arbeit taqdim etgan namunaviy Au Pair shartnomasidan foydalanish mumkin.",
          de: "Sie können den Mustervertrag der Bundesagentur für Arbeit verwenden.",
        },
      },
      {
        title: {
          uz: "Viza hujjatlarini tayyorlang",
          de: "Visumunterlagen vorbereiten",
        },
        description: {
          uz: "Mas’ul Germaniya vakolatxonasining joriy hujjatlar ro‘yxatini tekshiring va barcha talablarni aynan shu ro‘yxat bo‘yicha bajaring.",
          de: "Prüfen Sie die aktuelle Unterlagenliste der zuständigen deutschen Auslandsvertretung und richten Sie sich nach deren Anforderungen.",
        },
      },
      {
        title: {
          uz: "Ariza va termin jarayonini boshlang",
          de: "Antrag und Termin starten",
        },
        description: {
          uz: "Mavjud bo‘lsa Konsullik xizmatlari portali orqali onlayn ariza yuboring. Keyin biometrika, asl hujjatlar va to‘lov uchun shaxsan termin talab qilinadi.",
          de: "Reichen Sie den Antrag, sofern verfügbar, über das Auslandsportal ein. Für Biometrie, Originalunterlagen und Gebühren bleibt ein persönlicher Termin erforderlich.",
        },
      },
      {
        title: {
          uz: "Faqat ruxsat berilgandan keyin yo‘lga chiqing",
          de: "Erst nach Erteilung einreisen",
        },
        description: {
          uz: "Viza yoki yashash huquqi berilmasdan Au Pair faoliyatini boshlamang va qaytarib bo‘lmaydigan xarajatlarni ehtiyotkorlik bilan qiling.",
          de: "Beginnen Sie die Tätigkeit nicht ohne erteiltes Visum beziehungsweise Aufenthaltsrecht und gehen Sie mit nicht erstattbaren Kosten vorsichtig um.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "Au Pair sifatida necha soat ishlash mumkin?",
          de: "Wie viele Stunden darf ein Au-pair arbeiten?",
        },
        answer: {
          uz: "Uy ishlari va bola parvarishi birgalikda odatda kuniga 6 soat va haftasiga 30 soatdan oshmasligi kerak.",
          de: "Hausarbeit und Kinderbetreuung dürfen grundsätzlich 6 Stunden täglich und 30 Stunden wöchentlich nicht überschreiten.",
        },
      },
      {
        question: {
          uz: "Au Pair maosh oladimi?",
          de: "Erhält ein Au-pair Gehalt?",
        },
        answer: {
          uz: "Oddiy ish haqi emas, oyiga 280 yevro cho‘ntak puli beriladi. Uy-joy va ovqat mezbon oila tomonidan bepul taqdim etiladi.",
          de: "Es handelt sich nicht um regulären Arbeitslohn. Das Au-pair erhält 280 Euro Taschengeld pro Monat; Unterkunft und Verpflegung stellt die Gastfamilie kostenlos.",
        },
      },
      {
        question: {
          uz: "Nemis tili sertifikati shartmi?",
          de: "Ist ein Deutschzertifikat zwingend erforderlich?",
        },
        answer: {
          uz: "Rasmiy qo‘llanmada kamida A1 darajadagi boshlang‘ich nemis tili kutilishi aytiladi. Til bilimi elchixona yoki Ausländerbehörde tomonidan baholanishi mumkin. Qaysi dalil qabul qilinishini mas’ul vakolatxonadan tekshiring.",
          de: "Erwartet werden mindestens grundlegende Deutschkenntnisse auf Niveau A1. Die Kenntnisse können durch Auslandsvertretung oder Ausländerbehörde bewertet werden. Prüfen Sie bei der zuständigen Stelle, welcher Nachweis akzeptiert wird.",
        },
      },
      {
        question: {
          uz: "Au Pair dasturi qancha davom etadi?",
          de: "Wie lange dauert ein Au-pair-Aufenthalt?",
        },
        answer: {
          uz: "Kamida 6 oy va ko‘pi bilan 12 oy. Uchinchi davlat fuqarolari uchun Au Pair sifatida qayta ishlash odatda mumkin emas.",
          de: "Mindestens 6 und höchstens 12 Monate. Für Drittstaatsangehörige ist eine erneute Au-pair-Beschäftigung grundsätzlich nicht vorgesehen.",
        },
      },
      {
        question: {
          uz: "Viza arizasini to‘liq onlayn yakunlash mumkinmi?",
          de: "Kann das Visum vollständig online beantragt werden?",
        },
        answer: {
          uz: "Ayrim milliy vizalar bo‘yicha hujjatlarni Konsullik xizmatlari portali orqali onlayn yuborish mumkin. Lekin biometrika, asl hujjatlarni tekshirish va to‘lov uchun shaxsan termin baribir talab qilinadi.",
          de: "Für bestimmte nationale Visa können Unterlagen über das Auslandsportal online eingereicht werden. Für Biometrie, Prüfung der Originale und Gebühren ist weiterhin ein persönlicher Termin erforderlich.",
        },
      },
    ],
    sources: [
      {
        title: "Au-pair in deutschen Familien",
        organization: "Bundesagentur für Arbeit",
        url: "https://www.arbeitsagentur.de/datei/au-pair-merkblatt_ba031460.pdf",
        language: "de",
      },
      {
        title: "Au pairs in German families",
        organization: "Federal Employment Agency",
        url: "https://www.arbeitsagentur.de/datei/au-pair-in-germany-en_ba030535.pdf",
        language: "en",
      },
      {
        title: "Au-pair-Vertrag",
        organization: "Bundesagentur für Arbeit",
        url: "https://www.arbeitsagentur.de/datei/aupair-vertrag_ba030510.pdf",
        language: "de",
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
    id: "fsj",
    slug: "fsj",
    categorySlug: "coming-to-germany",
    title: {
      uz: "Germaniyada FSJ",
      de: "FSJ in Deutschland",
    },
    excerpt: {
      uz: "Freiwilliges Soziales Jahr (FSJ) uchun yosh chegarasi, davomiylik, faoliyat sohasi, cho‘ntak puli, ijtimoiy sug‘urta, seminarlar, ariza va viza jarayoni bo‘yicha rasmiy manbalarga asoslangan qo‘llanma.",
      de: "Offizieller Leitfaden zu Altersgrenze, Dauer, Einsatzbereichen, Taschengeld, Sozialversicherung, Seminaren, Bewerbung und Visum für ein Freiwilliges Soziales Jahr.",
    },
    intro: {
      uz: "FSJ — majburiy maktab ta’limini tugatgan yoshlar uchun qonun bilan tartibga solingan ixtiyoriy ijtimoiy va ta’lim xizmatidir. Ishtirokchilar kasalxona, qariyalar uyi, bolalar bog‘chasi, nogironligi bo‘lgan insonlar muassasasi, sport klubi, madaniyat yoki boshqa ijtimoiy sohalarda amaliy yordam ko‘rsatadi. FSJ oddiy ish yoki Ausbildung emas; amaliy faoliyat pedagogik kuzatuv va seminarlar bilan birga olib boriladi.",
      de: "Das FSJ ist ein gesetzlich geregelter Jugendfreiwilligen- und Bildungsdienst für junge Menschen nach Erfüllung der Vollzeitschulpflicht. Freiwillige unterstützen praktisch in Krankenhäusern, Pflegeeinrichtungen, Kitas, Einrichtungen für Menschen mit Behinderung, Sportvereinen, Kulturangeboten oder anderen sozialen Bereichen. Das FSJ ist weder ein reguläres Arbeitsverhältnis noch eine Ausbildung; die praktische Tätigkeit wird pädagogisch begleitet und durch Seminare ergänzt.",
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
        label: { uz: "Yosh", de: "Alter" },
        value: {
          uz: "Majburiy to‘liq maktab ta’limini tugatgan va xizmat yakunigacha 27 yoshga to‘lmagan yoshlar",
          de: "Nach erfüllter Vollzeitschulpflicht und bis zum Dienstende noch nicht 27 Jahre alt",
        },
      },
      {
        label: { uz: "Davomiylik", de: "Dauer" },
        value: {
          uz: "Odatda 12 oy; kamida 6, ko‘pi bilan 18 oy",
          de: "In der Regel 12 Monate; mindestens 6 und höchstens 18 Monate",
        },
      },
      {
        label: { uz: "Ish vaqti", de: "Einsatzzeit" },
        value: {
          uz: "Odatda to‘liq vaqt; kelishuv asosida haftasiga 20 soatdan ko‘p Teilzeit mumkin",
          de: "Grundsätzlich ganztägig; Teilzeit mit mehr als 20 Wochenstunden ist nach Vereinbarung möglich",
        },
      },
      {
        label: { uz: "Cho‘ntak puli", de: "Taschengeld" },
        value: {
          uz: "Miqdor tashkilotga bog‘liq; 2026-yil qonuniy yuqori chegarasi oyiga 676 yevro",
          de: "Die Höhe hängt vom Träger ab; gesetzliche Höchstgrenze 2026: 676 Euro monatlich",
        },
      },
      {
        label: { uz: "Sug‘urta", de: "Sozialversicherung" },
        value: {
          uz: "Sog‘liq, parvarish, ishsizlik, pensiya va baxtsiz hodisa sug‘urtasi",
          de: "Kranken-, Pflege-, Arbeitslosen-, Renten- und Unfallversicherung",
        },
      },
      {
        label: { uz: "Seminarlar", de: "Seminare" },
        value: {
          uz: "12 oylik xizmatda kamida 25 seminar kuni",
          de: "Bei zwölf Monaten mindestens 25 Seminartage",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "FSJ nima?",
          de: "Was ist ein FSJ?",
        },
        paragraphs: [
          {
            uz: "Freiwilliges Soziales Jahr yosh insonlarga jamiyat uchun foydali faoliyat bilan shug‘ullanish, kasbiy yo‘nalishni sinab ko‘rish va shaxsiy hamda ijtimoiy ko‘nikmalarni rivojlantirish imkonini beradi.",
            de: "Das Freiwillige Soziale Jahr ermöglicht jungen Menschen, sich für die Gesellschaft zu engagieren, berufliche Felder kennenzulernen und persönliche sowie soziale Kompetenzen zu entwickeln.",
          },
          {
            uz: "FSJ davomida ishtirokchi asosan amaliy yordamchi vazifalarni bajaradi. U malakali xodimning o‘rnini bosmasligi va mustaqil professional mas’uliyatni o‘z zimmasiga olmasligi kerak.",
            de: "Während des FSJ werden überwiegend praktische Hilfstätigkeiten übernommen. Freiwillige dürfen reguläre Fachkräfte nicht ersetzen und keine eigenständige professionelle Verantwortung übernehmen.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Kimlar qatnasha oladi?",
          de: "Wer kann teilnehmen?",
        },
        items: [
          {
            uz: "Majburiy to‘liq maktab ta’limini tugatgan yoshlar",
            de: "Junge Menschen nach Erfüllung der Vollzeitschulpflicht",
          },
          {
            uz: "Xizmat yakunigacha 27 yoshga to‘lmaganlar",
            de: "Personen, die bis zum Dienstende noch nicht 27 Jahre alt sind",
          },
          {
            uz: "Maktab diplomi turi, kelib chiqishi yoki daromadidan qat’i nazar qatnashishni istaganlar",
            de: "Interessierte unabhängig von Schulabschluss, Herkunft oder Einkommenssituation",
          },
          {
            uz: "Ijtimoiy, sport, madaniyat, ta’lim yoki sog‘liqni saqlash sohasida amaliy tajriba olishni istaganlar",
            de: "Personen, die praktische Erfahrung in sozialen, sportlichen, kulturellen, pädagogischen oder gesundheitlichen Bereichen sammeln möchten",
          },
          {
            uz: "Chet eldan keluvchilar FSJ faoliyatiga ruxsat beradigan yashash huquqiga ega bo‘lishi kerak",
            de: "Teilnehmende aus dem Ausland benötigen einen Aufenthaltstitel, der die Tätigkeit erlaubt",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Asosiy shartlar va xizmat shakli",
          de: "Zentrale Bedingungen und Dienstform",
        },
        items: [
          {
            uz: "FSJ tan olingan Träger va unga biriktirilgan Einsatzstelle orqali amalga oshiriladi.",
            de: "Das FSJ wird über einen anerkannten Träger und eine angeschlossene Einsatzstelle durchgeführt.",
          },
          {
            uz: "Xizmat odatda uzluksiz 12 oy davom etadi, biroq 6–18 oy oralig‘ida kelishilishi mumkin.",
            de: "Der Dienst dauert in der Regel zwölf zusammenhängende Monate, kann aber zwischen sechs und 18 Monaten vereinbart werden.",
          },
          {
            uz: "To‘liq vaqt odatiy shakl hisoblanadi; Träger va Einsatzstelle rozi bo‘lsa haftasiga 20 soatdan ko‘p Teilzeit ham mumkin.",
            de: "Der Dienst wird grundsätzlich ganztägig geleistet; mit Zustimmung von Träger und Einsatzstelle ist Teilzeit mit mehr als 20 Wochenstunden möglich.",
          },
          {
            uz: "12 oylik FSJda pedagogik kuzatuv va kamida 25 seminar kuni mavjud.",
            de: "Bei einem zwölfmonatigen FSJ gehören pädagogische Begleitung und mindestens 25 Seminartage dazu.",
          },
          {
            uz: "18 yoshgacha bo‘lgan ishtirokchilar uchun Jugendarbeitsschutzgesetz himoya qoidalari qo‘llanadi.",
            de: "Für Minderjährige gelten die Schutzvorschriften des Jugendarbeitsschutzgesetzes.",
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
            uz: "Träger yoki Einsatzstelle talab qilgan ariza va motivatsion xat",
            de: "Bewerbung und Motivationsschreiben nach Vorgabe von Träger oder Einsatzstelle",
          },
          {
            uz: "Tarjimai hol (Lebenslauf)",
            de: "Lebenslauf",
          },
          {
            uz: "Maktab yoki ta’lim hujjatlari nusxalari",
            de: "Kopien von Schul- oder Bildungsnachweisen",
          },
          {
            uz: "FSJ joyi tasdiqlangach, Träger va Einsatzstelle bilan tuzilgan yozma Vereinbarung",
            de: "Nach Zusage eine schriftliche Vereinbarung mit Träger und Einsatzstelle",
          },
          {
            uz: "Chet eldan keluvchilar uchun mas’ul Germaniya vakolatxonasi talab qilgan milliy viza hujjatlari",
            de: "Für Einreisende aus dem Ausland die Unterlagen für das nationale Visum nach Vorgabe der zuständigen deutschen Auslandsvertretung",
          },
        ],
        paragraphs: [
          {
            uz: "Talab qilinadigan hujjatlar Träger, Einsatzstelle va mas’ul Germaniya elchixonasi yoki konsulligiga qarab farq qilishi mumkin. Har doim aynan shu tashkilotlarning joriy ro‘yxatini tekshiring.",
            de: "Die erforderlichen Unterlagen können je nach Träger, Einsatzstelle und zuständiger deutscher Auslandsvertretung variieren. Prüfen Sie immer die aktuellen Vorgaben der jeweiligen Stellen.",
          },
        ],
      },
      conditions: {
        title: {
          uz: "To‘lov va ijtimoiy himoya",
          de: "Leistungen und soziale Absicherung",
        },
        items: [
          {
            uz: "FSJ oddiy ish haqi to‘lanadigan mehnat munosabati emas; ishtirokchi cho‘ntak puli oladi.",
            de: "Das FSJ ist kein regulär vergütetes Arbeitsverhältnis; Freiwillige erhalten Taschengeld.",
          },
          {
            uz: "2026-yilda qonuniy cho‘ntak puli yuqori chegarasi oyiga 676 yevro. Amaldagi summa Träger yoki Einsatzstelle bilan kelishiladi va kamroq bo‘lishi mumkin.",
            de: "Die gesetzliche Taschengeld-Höchstgrenze liegt 2026 bei 676 Euro monatlich. Der tatsächlich gezahlte Betrag wird mit Träger oder Einsatzstelle vereinbart und kann niedriger sein.",
          },
          {
            uz: "Uy-joy, ovqat, ish kiyimi yoki mobilitet yordami qo‘shimcha pul yoki natura shaklida berilishi mumkin.",
            de: "Unterkunft, Verpflegung, Arbeitskleidung oder Mobilitätsleistungen können zusätzlich als Geld- oder Sachleistung gewährt werden.",
          },
          {
            uz: "Kranken-, Pflege-, Arbeitslosen-, Renten- va Unfallversicherung badallari Träger yoki Einsatzstelle tomonidan to‘lanadi.",
            de: "Die Beiträge zur Kranken-, Pflege-, Arbeitslosen-, Renten- und Unfallversicherung tragen Träger beziehungsweise Einsatzstelle.",
          },
          {
            uz: "Teilzeit xizmatida cho‘ntak puli to‘liq vaqt xizmatiga nisbatan kamaytirilishi mumkin.",
            de: "Bei einem Teilzeitdienst wird das Taschengeld gegenüber einem Vollzeitdienst entsprechend gekürzt.",
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
            uz: "FSJ joyi va shartlarini faqat tan olingan Träger yoki rasmiy Einsatzstelle orqali tekshiring.",
            de: "Prüfen Sie FSJ-Platz und Bedingungen nur über anerkannte Träger oder offizielle Einsatzstellen.",
          },
          {
            uz: "O‘zbekiston fuqarolari Germaniyaga uzoq muddatli FSJ uchun kirishda odatda milliy vizaga muhtoj.",
            de: "Staatsangehörige Usbekistans benötigen für ein längerfristiges FSJ in Deutschland grundsätzlich ein nationales Visum.",
          },
          {
            uz: "Viza topshirishdan oldin yozma FSJ kelishuvi va yashash xarajatlari qanday qoplanishini aniq tekshiring.",
            de: "Prüfen Sie vor dem Visumantrag die schriftliche FSJ-Vereinbarung und die Sicherung des Lebensunterhalts genau.",
          },
          {
            uz: "Rasmiy termin tizimi bepul; maxsus yoki tezlashtirilgan termin va’da qiladigan vositachilarga ishonmang.",
            de: "Das offizielle Terminbuchungssystem ist kostenlos; misstrauen Sie Vermittlern, die besondere oder beschleunigte Termine versprechen.",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Yo‘nalish va hududni tanlang",
          de: "Einsatzbereich und Region wählen",
        },
        description: {
          uz: "Sog‘liqni saqlash, bolalar, parvarish, sport, madaniyat yoki boshqa ijtimoiy sohalardan sizga mosini tanlang.",
          de: "Wählen Sie einen passenden Bereich wie Gesundheit, Kinderbetreuung, Pflege, Sport, Kultur oder ein anderes soziales Feld.",
        },
      },
      {
        title: {
          uz: "Tan olingan Trägerlarni toping",
          de: "Anerkannte Träger finden",
        },
        description: {
          uz: "Rasmiy Jugendfreiwilligendienste manbalari orqali Träger va bo‘sh Einsatzstellelarni izlang.",
          de: "Suchen Sie über die offiziellen Angebote der Jugendfreiwilligendienste nach anerkannten Trägern und freien Einsatzstellen.",
        },
      },
      {
        title: {
          uz: "Arizani erta yuboring",
          de: "Frühzeitig bewerben",
        },
        description: {
          uz: "Trägerlarning muddatlari bir xil emas. Chet eldan kelish va viza uchun ko‘proq vaqt kerak bo‘lgani sababli arizani erta boshlang.",
          de: "Die Bewerbungsfristen unterscheiden sich. Beginnen Sie besonders bei Einreise aus dem Ausland und Visum frühzeitig.",
        },
      },
      {
        title: {
          uz: "Suhbat va joy tanlashdan o‘ting",
          de: "Gespräch und Platzwahl durchlaufen",
        },
        description: {
          uz: "Träger siz bilan suhbat o‘tkazishi, mos Einsatzstelle taklif qilishi yoki qo‘shimcha hujjat so‘rashi mumkin.",
          de: "Der Träger kann ein Gespräch führen, eine passende Einsatzstelle vermitteln oder weitere Unterlagen anfordern.",
        },
      },
      {
        title: {
          uz: "Yozma kelishuvni tekshiring",
          de: "Schriftliche Vereinbarung prüfen",
        },
        description: {
          uz: "Boshlanish va tugash sanasi, ish vaqti, cho‘ntak puli, uy-joy, ovqat, seminar va sug‘urta shartlarini tekshiring.",
          de: "Prüfen Sie Beginn, Ende, Einsatzzeit, Taschengeld, Unterkunft, Verpflegung, Seminare und Versicherung.",
        },
      },
      {
        title: {
          uz: "Zarur bo‘lsa milliy vizaga ariza bering",
          de: "Falls erforderlich nationales Visum beantragen",
        },
        description: {
          uz: "Mas’ul Germaniya vakolatxonasining joriy talablarini tekshiring. Onlayn ariza imkoniyati mavjud bo‘lsa ham, biometrika va asl hujjatlar uchun shaxsiy termin talab qilinishi mumkin.",
          de: "Prüfen Sie die aktuellen Vorgaben der zuständigen deutschen Auslandsvertretung. Auch bei Online-Anträgen kann ein persönlicher Termin für Biometrie und Originalunterlagen erforderlich sein.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "FSJ uchun eng yuqori yosh nechchi?",
          de: "Wie hoch ist die Altersgrenze für ein FSJ?",
        },
        answer: {
          uz: "Xizmat tugaydigan vaqtga qadar 27 yoshga to‘lmagan bo‘lish kerak. Ya’ni FSJ 27 yoshga to‘lishdan oldin yakunlanishi kerak.",
          de: "Bis zum Dienstende darf das 27. Lebensjahr noch nicht vollendet sein. Das FSJ muss also vor dem 27. Geburtstag abgeschlossen werden.",
        },
      },
      {
        question: {
          uz: "FSJ qancha davom etadi?",
          de: "Wie lange dauert ein FSJ?",
        },
        answer: {
          uz: "Odatda 12 oy. Qonuniy doira kamida 6 va ko‘pi bilan 18 oy; alohida pedagogik holatlarda uzoqroq bo‘lishi mumkin.",
          de: "In der Regel zwölf Monate. Der gesetzliche Rahmen liegt grundsätzlich zwischen sechs und 18 Monaten; in besonderen pädagogischen Fällen kann eine längere Dauer möglich sein.",
        },
      },
      {
        question: {
          uz: "FSJda qancha pul beriladi?",
          de: "Wie viel Geld erhält man im FSJ?",
        },
        answer: {
          uz: "Ish haqi emas, cho‘ntak puli beriladi. 2026-yildagi qonuniy yuqori chegara oyiga 676 yevro, ammo aniq summa Träger yoki Einsatzstellega bog‘liq va kamroq bo‘lishi mumkin.",
          de: "Es wird kein regulärer Lohn, sondern Taschengeld gezahlt. Die gesetzliche Höchstgrenze liegt 2026 bei 676 Euro monatlich; die konkrete Höhe hängt vom Träger beziehungsweise der Einsatzstelle ab und kann niedriger sein.",
        },
      },
      {
        question: {
          uz: "FSJni Teilzeit qilish mumkinmi?",
          de: "Kann ein FSJ in Teilzeit geleistet werden?",
        },
        answer: {
          uz: "Ha. Träger va Einsatzstelle rozi bo‘lsa, haftasiga 20 soatdan ko‘p bo‘lgan Teilzeit xizmat mumkin. Cho‘ntak puli mos ravishda kamaytirilishi mumkin.",
          de: "Ja. Mit Zustimmung von Träger und Einsatzstelle ist Teilzeit mit mehr als 20 Wochenstunden möglich. Das Taschengeld kann entsprechend reduziert werden.",
        },
      },
      {
        question: {
          uz: "Chet elliklar FSJ qila oladimi?",
          de: "Können ausländische Personen ein FSJ machen?",
        },
        answer: {
          uz: "Ha. Chet ellik yoshlar ham qatnashishi mumkin, lekin FSJ faoliyatiga ruxsat beradigan yashash huquqi kerak. Chet eldan keluvchilar aniq viza talablarini mas’ul Germaniya vakolatxonasidan tekshirishi zarur.",
          de: "Ja. Junge Menschen aus dem Ausland können teilnehmen, benötigen jedoch einen Aufenthaltstitel, der die Tätigkeit erlaubt. Die konkreten Visumvorgaben sind bei der zuständigen deutschen Auslandsvertretung zu prüfen.",
        },
      },
      {
        question: {
          uz: "FSJ Ausbildung yoki oddiy ish hisoblanadimi?",
          de: "Ist ein FSJ eine Ausbildung oder ein normales Arbeitsverhältnis?",
        },
        answer: {
          uz: "Yo‘q. FSJ qonuniy ta’lim va ixtiyoriy xizmat shakli bo‘lib, oddiy mehnat yoki Ausbildung munosabati hisoblanmaydi.",
          de: "Nein. Das FSJ ist ein gesetzlich geregelter Bildungs- und Freiwilligendienst und weder ein reguläres Arbeitsverhältnis noch eine Ausbildung.",
        },
      },
    ],
    sources: [
      {
        title: "Freiwilliges Soziales Jahr",
        organization: "Jugendfreiwilligendienste / BAFzA",
        url: "https://www.jugendfreiwilligendienste.de/jugendfreiwilligendienste/jugendfreiwilligendienste/freiwilliges-soziales-jahr",
        language: "de",
      },
      {
        title: "Glossar: Dauer und Taschengeld",
        organization: "Jugendfreiwilligendienste / BAFzA",
        url: "https://www.jugendfreiwilligendienste.de/jugendfreiwilligendienste/service/glossar",
        language: "de",
      },
      {
        title: "Gesetz zur Förderung von Jugendfreiwilligendiensten",
        organization: "Bundesministerium der Justiz",
        url: "https://www.gesetze-im-internet.de/jfdg/BJNR084210008.html",
        language: "de",
      },
      {
        title: "Visas for Germany",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/215870-215870",
        language: "en",
      },
      {
        title: "Visa requirements overview",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/231148-231148",
        language: "en",
      },
    ],
    relatedArticleSlugs: ["au-pair"],
  },

  {
    id: "bfd",
    slug: "bfd",
    categorySlug: "coming-to-germany",
    title: { uz: "Germaniyada BFD", de: "BFD in Deutschland" },
    excerpt: {
      uz: "Bundesfreiwilligendienst uchun yosh, davomiylik, Teilzeit, cho‘ntak puli, sug‘urta, seminarlar, ariza va viza bo‘yicha rasmiy qo‘llanma.",
      de: "Offizieller Leitfaden zu Alter, Dauer, Teilzeit, Taschengeld, Sozialversicherung, Seminaren, Bewerbung und Visum im Bundesfreiwilligendienst.",
    },
    intro: {
      uz: "BFD — Germaniyada umumiy manfaat uchun bajariladigan qonun bilan tartibga solingan ixtiyoriy xizmat. Majburiy to‘liq maktab ta’limini tugatgan barcha yoshdagi insonlar qatnasha oladi; yuqori yosh chegarasi yo‘q.",
      de: "Der Bundesfreiwilligendienst ist ein gesetzlich geregelter Freiwilligendienst für das Gemeinwohl. Teilnehmen können Menschen jeden Alters nach Erfüllung der Vollzeitschulpflicht; eine obere Altersgrenze gibt es nicht.",
    },
    status: "published",
    featured: true,
    lastReviewedAt: "2026-08-06",
    readingTime: { uz: "8 daqiqa", de: "8 Minuten" },
    facts: [
      {
        label: { uz: "Yosh", de: "Alter" },
        value: {
          uz: "Majburiy maktab ta’limi tugagan; yuqori yosh chegarasi yo‘q",
          de: "Vollzeitschulpflicht erfüllt; keine obere Altersgrenze",
        },
      },
      {
        label: { uz: "Davomiylik", de: "Dauer" },
        value: {
          uz: "Odatda 12 oy; kamida 6 va odatda ko‘pi bilan 18 oy",
          de: "In der Regel 12 Monate; mindestens 6 und grundsätzlich höchstens 18 Monate",
        },
      },
      {
        label: { uz: "Teilzeit", de: "Teilzeit" },
        value: {
          uz: "Kelishuv bilan haftasiga 20 soatdan ko‘p",
          de: "Nach Vereinbarung mit mehr als 20 Wochenstunden",
        },
      },
      {
        label: { uz: "Cho‘ntak puli", de: "Taschengeld" },
        value: {
          uz: "2026-yil yuqori chegarasi oyiga 676 yevro",
          de: "Höchstgrenze 2026: 676 Euro monatlich",
        },
      },
      {
        label: { uz: "Sug‘urta", de: "Sozialversicherung" },
        value: {
          uz: "Sog‘liq, parvarish, ishsizlik, pensiya va baxtsiz hodisa sug‘urtasi",
          de: "Kranken-, Pflege-, Arbeitslosen-, Renten- und Unfallversicherung",
        },
      },
      {
        label: { uz: "Seminarlar", de: "Seminare" },
        value: {
          uz: "27 yoshgacha: 12 oyda 25 kun; 27 yoshdan katta: oyiga kamida 1 kun",
          de: "Unter 27: 25 Tage bei 12 Monaten; über 27: mindestens 1 Tag pro Monat",
        },
      },
    ],
    sections: {
      overview: {
        title: { uz: "BFD nima?", de: "Was ist der BFD?" },
        paragraphs: [
          {
            uz: "BFD ijtimoiy, sog‘liqni saqlash, ekologiya, madaniyat, sport, integratsiya va boshqa jamoat manfaatiga xizmat qiluvchi sohalarda bajariladi.",
            de: "Der BFD wird unter anderem in sozialen, gesundheitlichen, ökologischen, kulturellen, sportlichen und integrativen Bereichen geleistet.",
          },
          {
            uz: "Bu oddiy mehnat shartnomasi yoki Ausbildung emas; ko‘ngilli xizmat bo‘lib, pedagogik kuzatuv va seminarlar bilan birga olib boriladi.",
            de: "Er ist weder ein reguläres Arbeitsverhältnis noch eine Ausbildung, sondern ein pädagogisch begleiteter Freiwilligendienst.",
          },
        ],
      },
      eligibility: {
        title: { uz: "Kimlar qatnasha oladi?", de: "Wer kann teilnehmen?" },
        items: [
          {
            uz: "Majburiy to‘liq maktab ta’limini tugatgan barcha yoshdagi insonlar",
            de: "Menschen jeden Alters nach Erfüllung der Vollzeitschulpflicht",
          },
          {
            uz: "Maktab diplomi turi, jins, millat yoki kasbiy tajribasidan qat’i nazar qatnashishni istaganlar",
            de: "Interessierte unabhängig von Schulabschluss, Geschlecht, Nationalität oder Berufserfahrung",
          },
          {
            uz: "27 yoshdan katta insonlar ham Vollzeit yoki kelishuv asosida Teilzeit qatnasha oladi",
            de: "Auch Personen über 27 können in Vollzeit oder nach Vereinbarung in Teilzeit teilnehmen",
          },
          {
            uz: "Chet el fuqarolari BFD faoliyatiga ruxsat beradigan yashash huquqiga ega bo‘lishi kerak",
            de: "Ausländische Staatsangehörige benötigen einen Aufenthaltstitel, der die Tätigkeit erlaubt",
          },
        ],
      },
      requirements: {
        title: { uz: "Asosiy shartlar", de: "Zentrale Bedingungen" },
        items: [
          {
            uz: "BFD tan olingan Einsatzstelle va rasmiy Vereinbarung orqali amalga oshiriladi.",
            de: "Der BFD wird bei einer anerkannten Einsatzstelle und auf Grundlage einer offiziellen Vereinbarung geleistet.",
          },
          {
            uz: "Xizmat odatda 12 oy, kamida 6 va odatda ko‘pi bilan 18 oy davom etadi.",
            de: "Der Dienst dauert in der Regel zwölf Monate, mindestens sechs und grundsätzlich höchstens 18 Monate.",
          },
          {
            uz: "Teilzeit haftasiga 20 soatdan ko‘p bo‘lishi va barcha tomonlar roziligiga asoslanishi kerak.",
            de: "Teilzeit muss mehr als 20 Wochenstunden umfassen und das Einverständnis aller Beteiligten voraussetzen.",
          },
          {
            uz: "Teilzeit BFDga qonuniy talab huquqi yo‘q.",
            de: "Ein Rechtsanspruch auf einen BFD in Teilzeit besteht nicht.",
          },
        ],
      },
      documents: {
        title: { uz: "Odatda kerak bo‘ladigan hujjatlar", de: "Üblicherweise erforderliche Unterlagen" },
        items: [
          { uz: "Ariza va motivatsion xat", de: "Bewerbung und Motivationsschreiben" },
          { uz: "Tarjimai hol (Lebenslauf)", de: "Lebenslauf" },
          { uz: "Maktab, ta’lim yoki kasbiy hujjatlar nusxalari", de: "Kopien von Schul-, Bildungs- oder Berufsunterlagen" },
          { uz: "Rasmiy BFD-Vereinbarung", de: "Offizielle BFD-Vereinbarung" },
          {
            uz: "Chet eldan keluvchilar uchun milliy viza hujjatlari",
            de: "Für Einreisende aus dem Ausland die Unterlagen für das nationale Visum",
          },
        ],
        paragraphs: [
          {
            uz: "Aniq hujjatlar Einsatzstelle va mas’ul Germaniya vakolatxonasiga qarab farq qilishi mumkin.",
            de: "Die genaue Unterlagenliste kann je nach Einsatzstelle und zuständiger deutscher Auslandsvertretung variieren.",
          },
        ],
      },
      conditions: {
        title: { uz: "To‘lov va ijtimoiy himoya", de: "Leistungen und soziale Absicherung" },
        items: [
          {
            uz: "BFD oddiy ish haqi to‘lanadigan ish emas; kelishilgan cho‘ntak puli beriladi.",
            de: "Der BFD ist keine regulär vergütete Beschäftigung; es wird ein vereinbartes Taschengeld gezahlt.",
          },
          {
            uz: "2026-yilda cho‘ntak pulining qonuniy yuqori chegarasi oyiga 676 yevro.",
            de: "Die gesetzliche Taschengeld-Höchstgrenze beträgt 2026 monatlich 676 Euro.",
          },
          {
            uz: "Uy-joy, ovqat, ish kiyimi yoki mobilitet yordami qo‘shimcha berilishi mumkin.",
            de: "Unterkunft, Verpflegung, Arbeitskleidung oder Mobilitätsleistungen können zusätzlich gewährt werden.",
          },
          {
            uz: "Ijtimoiy sug‘urta badallari Einsatzstelle tomonidan to‘lanadi.",
            de: "Die Sozialversicherungsbeiträge werden von der Einsatzstelle getragen.",
          },
          {
            uz: "27 yoshgacha bo‘lganlar 12 oyda 25 seminar kuni; 27 yoshdan kattalar oyiga kamida 1 seminar kunida qatnashadi.",
            de: "Unter 27-Jährige nehmen bei zwölf Monaten an 25 Seminartagen teil; über 27-Jährige an mindestens einem Seminartag pro Monat.",
          },
        ],
      },
      warnings: {
        title: { uz: "Muhim ogohlantirishlar", de: "Wichtige Hinweise" },
        items: [
          {
            uz: "Faqat tan olingan Einsatzstelle va yozma BFD-Vereinbarung asosida ish boshlang.",
            de: "Beginnen Sie nur bei einer anerkannten Einsatzstelle und auf Grundlage einer schriftlichen BFD-Vereinbarung.",
          },
          {
            uz: "O‘zbekiston fuqarolari odatda oldindan milliy viza yoki mos yashash ruxsatiga muhtoj.",
            de: "Staatsangehörige Usbekistans benötigen grundsätzlich vorab ein nationales Visum oder einen geeigneten Aufenthaltstitel.",
          },
          {
            uz: "Cho‘ntak puli, uy-joy, ovqat, ish vaqti va sug‘urta shartlarini viza topshirishdan oldin tekshiring.",
            de: "Prüfen Sie Taschengeld, Unterkunft, Verpflegung, Einsatzzeit und Versicherung vor dem Visumantrag.",
          },
        ],
      },
    },
    steps: [
      {
        title: { uz: "Faoliyat sohasini tanlang", de: "Einsatzbereich auswählen" },
        description: {
          uz: "Ijtimoiy xizmat, sog‘liqni saqlash, ekologiya, sport, madaniyat yoki integratsiya sohalaridan mosini tanlang.",
          de: "Wählen Sie einen Bereich wie Soziales, Gesundheit, Umwelt, Sport, Kultur oder Integration.",
        },
      },
      {
        title: { uz: "Rasmiy Einsatzstelle qidiring", de: "Offizielle Einsatzstelle suchen" },
        description: {
          uz: "Bundesfreiwilligendienstning rasmiy joy qidiruv tizimidan foydalaning.",
          de: "Nutzen Sie die offizielle Platzsuche des Bundesfreiwilligendienstes.",
        },
      },
      {
        title: { uz: "Ariza yuboring", de: "Bewerbung einreichen" },
        description: {
          uz: "Lebenslauf, motivatsion xat va so‘ralgan hujjatlarni yuboring.",
          de: "Senden Sie Lebenslauf, Motivationsschreiben und die verlangten Unterlagen.",
        },
      },
      {
        title: { uz: "Shartlarni aniqlashtiring", de: "Bedingungen klären" },
        description: {
          uz: "Vazifalar, ish vaqti, Vollzeit yoki Teilzeit, cho‘ntak puli va boshlanish sanasini kelishib oling.",
          de: "Klären Sie Aufgaben, Einsatzzeit, Voll- oder Teilzeit, Taschengeld und Beginn.",
        },
      },
      {
        title: { uz: "BFD-Vereinbarungni tekshiring", de: "BFD-Vereinbarung prüfen" },
        description: {
          uz: "Barcha shartlar yozma ravishda to‘g‘ri ko‘rsatilganini tekshiring.",
          de: "Prüfen Sie, ob alle Bedingungen korrekt schriftlich festgehalten sind.",
        },
      },
      {
        title: { uz: "Zarur bo‘lsa milliy vizaga ariza bering", de: "Falls erforderlich nationales Visum beantragen" },
        description: {
          uz: "Mas’ul Germaniya vakolatxonasining amaldagi checklisti bo‘yicha ariza topshiring.",
          de: "Beantragen Sie das Visum nach der aktuellen Checkliste der zuständigen deutschen Auslandsvertretung.",
        },
      },
    ],
    faq: [
      {
        question: { uz: "BFD uchun yosh chegarasi bormi?", de: "Gibt es eine Altersgrenze für den BFD?" },
        answer: {
          uz: "Yuqori yosh chegarasi yo‘q. Majburiy to‘liq maktab ta’limini tugatgan har qanday yoshdagi inson qatnasha oladi.",
          de: "Es gibt keine obere Altersgrenze. Teilnehmen können Menschen jeden Alters nach Erfüllung der Vollzeitschulpflicht.",
        },
      },
      {
        question: { uz: "BFD va FSJ o‘rtasidagi asosiy farq nima?", de: "Was ist der wichtigste Unterschied zwischen BFD und FSJ?" },
        answer: {
          uz: "FSJ xizmat tugaguniga qadar 27 yoshga to‘lmagan yoshlar uchun. BFDda yuqori yosh chegarasi yo‘q.",
          de: "Beim FSJ darf das 27. Lebensjahr bis zum Dienstende noch nicht vollendet sein. Beim BFD gibt es keine obere Altersgrenze.",
        },
      },
      {
        question: { uz: "BFD qancha davom etadi?", de: "Wie lange dauert der BFD?" },
        answer: {
          uz: "Odatda 12 oy, kamida 6 va odatda ko‘pi bilan 18 oy.",
          de: "In der Regel zwölf Monate, mindestens sechs und grundsätzlich höchstens 18 Monate.",
        },
      },
      {
        question: { uz: "BFDni Teilzeit qilish mumkinmi?", de: "Kann der BFD in Teilzeit geleistet werden?" },
        answer: {
          uz: "Ha, barcha tomonlar rozi bo‘lsa haftasiga 20 soatdan ko‘p Teilzeit mumkin. Bunga qonuniy talab huquqi yo‘q.",
          de: "Ja. Mit Zustimmung aller Beteiligten ist Teilzeit mit mehr als 20 Wochenstunden möglich. Ein Rechtsanspruch besteht nicht.",
        },
      },
      {
        question: { uz: "BFDda qancha pul beriladi?", de: "Wie viel Taschengeld gibt es im BFD?" },
        answer: {
          uz: "Aniq summa Einsatzstelle bilan kelishiladi. 2026-yilda yuqori chegara oyiga 676 yevro.",
          de: "Die konkrete Höhe wird mit der Einsatzstelle vereinbart. Die Höchstgrenze liegt 2026 bei 676 Euro monatlich.",
        },
      },
      {
        question: { uz: "Chet elliklar BFD qila oladimi?", de: "Können ausländische Personen einen BFD leisten?" },
        answer: {
          uz: "Ha, lekin BFD faoliyatiga ruxsat beradigan yashash huquqi kerak. Maxsus BFD yashash ruxsati berilishi mumkin.",
          de: "Ja, sie benötigen aber einen Aufenthaltstitel, der die Tätigkeit erlaubt. Eine besondere Aufenthaltserlaubnis für den BFD kann erteilt werden.",
        },
      },
    ],
    sources: [
      {
        title: "Über den Bundesfreiwilligendienst",
        organization: "Bundesamt für Familie und zivilgesellschaftliche Aufgaben",
        url: "https://www.bundesfreiwilligendienst.de/bundesfreiwilligendienst/ueber-den-bfd",
        language: "de",
      },
      {
        title: "Fragen und Antworten zum BFD",
        organization: "Bundesamt für Familie und zivilgesellschaftliche Aufgaben",
        url: "https://www.bundesfreiwilligendienst.de/bundesfreiwilligendienst/fragen-antworten",
        language: "de",
      },
      {
        title: "A bis Z zum Bundesfreiwilligendienst",
        organization: "Bundesamt für Familie und zivilgesellschaftliche Aufgaben",
        url: "https://www.bundesfreiwilligendienst.de/bundesfreiwilligendienst/a-bis-z",
        language: "de",
      },
      {
        title: "Bundesfreiwilligendienstgesetz",
        organization: "Bundesministerium der Justiz",
        url: "https://www.gesetze-im-internet.de/bfdg/BJNR068710011.html",
        language: "de",
      },
      {
        title: "Wehrdienst und Bundesfreiwilligendienst",
        organization: "Auswärtiges Amt",
        url: "https://www.auswaertiges-amt.de/de/service/konsularinfo/wehrdienst-bfd",
        language: "de",
      },
    ],
    relatedArticleSlugs: ["au-pair", "fsj"],
  },
];

function localizeArticle(
  article: LocalizedGuideArticle,
  locale: SupportedGuideLocale,
): GuideArticle {
  const localizedSections = Object.fromEntries(
    Object.entries(article.sections).flatMap(
      ([key, section]) => {
        if (!section) {
          return [];
        }

        return [
          [
            key,
            {
              title: section.title[locale],
              paragraphs:
                section.paragraphs?.map(
                  (paragraph) => paragraph[locale],
                ) ?? [],
              items:
                section.items?.map(
                  (item) => item[locale],
                ) ?? [],
            },
          ],
        ];
      },
    ),
  ) as GuideArticle["sections"];

  return {
    id: article.id,
    slug: article.slug,
    categorySlug: article.categorySlug,
    title: article.title[locale],
    excerpt: article.excerpt[locale],
    intro: article.intro[locale],
    status: article.status,
    featured: article.featured,
    lastReviewedAt: article.lastReviewedAt,
    readingTime: article.readingTime[locale],
    facts: article.facts.map((fact) => ({
      label: fact.label[locale],
      value: fact.value[locale],
    })),
    sections: localizedSections,
    steps: article.steps.map((step) => ({
      title: step.title[locale],
      description: step.description[locale],
    })),
    faq: article.faq.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale],
    })),
    sources: article.sources,
    relatedArticleSlugs: article.relatedArticleSlugs,
  };
}

export function getGuideArticlesByCategory(
  categorySlug: string,
  locale: SupportedGuideLocale,
): ReadonlyArray<GuideArticle> {
  return localizedGuideArticles
    .filter(
      (article) =>
        article.categorySlug === categorySlug &&
        article.status === "published",
    )
    .map((article) => localizeArticle(article, locale));
}

export function getGuideArticleBySlug(
  categorySlug: string,
  articleSlug: string,
  locale: SupportedGuideLocale,
): GuideArticle | undefined {
  const article = localizedGuideArticles.find(
    (item) =>
      item.categorySlug === categorySlug &&
      item.slug === articleSlug &&
      item.status === "published",
  );

  return article
    ? localizeArticle(article, locale)
    : undefined;
}

export function getGuideArticleStaticParams(): Array<{
  category: string;
  article: string;
}> {
  return localizedGuideArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      category: article.categorySlug,
      article: article.slug,
    }));
}
