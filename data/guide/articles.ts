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
  {
    id: "ausbildung",
    slug: "ausbildung",
    categorySlug: "coming-to-germany",
    title: {
      uz: "Germaniyada Ausbildung",
      de: "Ausbildung in Deutschland",
    },
    excerpt: {
      uz: "Dual va schulische Ausbildung, chet eldan ariza topshirish, real til talablari, IT va boshqa yo‘nalishlardagi raqobat, Ausbildungsvergütung, hujjatlar, viza va bosqichma-bosqich ariza jarayoni bo‘yicha batafsil qo‘llanma.",
      de: "Ausführlicher Leitfaden zu dualer und schulischer Ausbildung, Bewerbung aus dem Ausland, realistischen Sprachanforderungen, Wettbewerb in IT und anderen Bereichen, Ausbildungsvergütung, Unterlagen, Visum und Bewerbungsablauf.",
    },
    intro: {
      uz: "Ausbildung — Germaniyada tan olingan kasbni amaliy va nazariy tarzda o‘rganish yo‘lidir. Dual Ausbildungda ishtirokchi korxonada ishlaydi va Berufsschulega qatnaydi; schulische Ausbildung esa asosan kasb maktabida olib boriladi va amaliyotlar bilan to‘ldiriladi. O‘zbekiston kabi uchinchi davlatlardan topshirayotgan nomzod uchun faqat rasmiy minimumni bajarish yetarli bo‘lmasligi mumkin: ish beruvchi, Berufsschule, suhbat, viza va kundalik ishdagi til talablari birgalikda baholanadi.",
      de: "Eine Ausbildung vermittelt einen anerkannten Beruf in Deutschland praktisch und theoretisch. In der dualen Ausbildung arbeiten Auszubildende im Betrieb und besuchen die Berufsschule; eine schulische Ausbildung findet überwiegend an einer Berufsfachschule statt und wird durch Praxisphasen ergänzt. Für Bewerbende aus Drittstaaten wie Usbekistan reicht es häufig nicht, nur formale Mindestvoraussetzungen zu erfüllen: Betrieb, Berufsschule, Vorstellungsgespräch, Visum und sprachliche Anforderungen im Arbeitsalltag wirken zusammen.",
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
        label: { uz: "Asosiy shakllar", de: "Hauptformen" },
        value: {
          uz: "Dual Ausbildung va schulische Ausbildung",
          de: "Duale Ausbildung und schulische Ausbildung",
        },
      },
      {
        label: { uz: "Til — rasmiy qoida", de: "Sprache — formale Regel" },
        value: {
          uz: "Malakali Ausbildung vizasida odatda B1; Ausbildung joyi tilni o‘zi tekshirgan bo‘lsa istisno bo‘lishi mumkin",
          de: "Für das Visum zur qualifizierten Berufsausbildung in der Regel B1; Ausnahmen sind möglich, wenn die Ausbildungsstelle die Kenntnisse selbst geprüft hat",
        },
      },
      {
        label: { uz: "Til — amaliy tavsiya", de: "Sprache — praktische Empfehlung" },
        value: {
          uz: "Chet eldan topshirishda ko‘pchilik yo‘nalishlar uchun B2; IT, Pflege, Büro va mijoz bilan ishlanadigan kasblarda B2ni maqsad qilish kerak",
          de: "Bei Bewerbung aus dem Ausland für viele Berufe B2; besonders für IT, Pflege, Büro und kundennahe Berufe sollte B2 angestrebt werden",
        },
      },
      {
        label: { uz: "2026 minimum to‘lov", de: "Mindestvergütung 2026" },
        value: {
          uz: "Dual Ausbildung boshlanishida: 1-yil 724 €, 2-yil 854 €, 3-yil 977 €, 4-yil 1 014 € brutto",
          de: "Bei Ausbildungsbeginn 2026: 724 €, 854 €, 977 € und 1.014 € brutto in den Ausbildungsjahren 1 bis 4",
        },
      },
      {
        label: { uz: "Qo‘shimcha ish", de: "Nebenbeschäftigung" },
        value: {
          uz: "§16a bo‘yicha Ausbildungdan tashqari haftasiga 20 soatgacha ishlash mumkin",
          de: "Nach § 16a AufenthG ist eine unabhängige Nebenbeschäftigung bis zu 20 Stunden wöchentlich möglich",
        },
      },
      {
        label: { uz: "Ausbildungsplatz qidirish vizasi", de: "Visum zur Ausbildungsplatzsuche" },
        value: {
          uz: "Alohida yo‘l: 35 yoshdan kichik, odatda B1 va moliyaviy ta’minot talab qilinadi",
          de: "Eigener Aufenthaltstitel: unter 35 Jahre, grundsätzlich B1 und gesicherter Lebensunterhalt",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Ausbildung nima va uning turlari",
          de: "Was ist eine Ausbildung und welche Formen gibt es?",
        },
        paragraphs: [
          {
            uz: "Dual Ausbildungda odatda haftaning bir qismi korxonada amaliy ishga, qolgan qismi Berufsschuledagi nazariy ta’limga ajratiladi. Auszubildende korxona bilan Ausbildungsvertrag tuzadi va oyma-oy Ausbildungsvergütung oladi.",
            de: "In der dualen Ausbildung findet ein Teil der Woche praktisch im Betrieb und der andere Teil theoretisch in der Berufsschule statt. Auszubildende schließen einen Ausbildungsvertrag mit dem Betrieb und erhalten eine monatliche Ausbildungsvergütung.",
          },
          {
            uz: "Schulische Ausbildung asosan Berufsfachschule yoki Fachschule orqali amalga oshiriladi. Pflege kabi ayrim yo‘nalishlarda haq to‘lanishi mumkin, boshqa maktab yo‘nalishlarida esa to‘lov bo‘lmasligi yoki maktab xarajatlari yuzaga kelishi mumkin. Har bir kasb uchun moliyaviy shartlarni alohida tekshirish kerak.",
            de: "Eine schulische Ausbildung findet überwiegend an einer Berufsfachschule oder Fachschule statt. In Bereichen wie Pflege kann eine Vergütung gezahlt werden; in anderen schulischen Berufen kann sie fehlen oder es können Schulkosten entstehen. Die finanziellen Bedingungen müssen für jeden Beruf einzeln geprüft werden.",
          },
          {
            uz: "Ausbildung oddiy til kursi yoki Germaniyaga kirishning oson yo‘li emas. Korxona haqiqiy xodim sifatida rivojlana oladigan, Berufsschule darslari va imtihonlarini bajara oladigan nomzodni tanlaydi.",
            de: "Eine Ausbildung ist weder ein Sprachkurs noch ein einfacher Einreiseweg. Betriebe wählen Personen aus, die sich als zukünftige Fachkräfte entwickeln und Unterricht sowie Prüfungen der Berufsschule bewältigen können.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Kimlar topshira oladi?",
          de: "Wer kann sich bewerben?",
        },
        items: [
          {
            uz: "Tanlangan kasb uchun yetarli maktab yoki ta’lim hujjatiga ega bo‘lganlar",
            de: "Personen mit einem für den gewählten Beruf ausreichenden Schul- oder Bildungsabschluss",
          },
          {
            uz: "Korxona va Berufsschule talab qiladigan nemis tilida o‘qish, yozish va muloqot qila oladiganlar",
            de: "Personen, die auf dem vom Betrieb und der Berufsschule verlangten Niveau Deutsch sprechen, lesen und schreiben können",
          },
          {
            uz: "Ausbildungsvertrag yoki schulische Ausbildung uchun qabul xatini olganlar",
            de: "Personen mit Ausbildungsvertrag oder Zulassung zu einer schulischen Ausbildung",
          },
          {
            uz: "Chet eldan topshirishda viza, yashash xarajatlari va hujjatlarni o‘z vaqtida tayyorlay oladiganlar",
            de: "Bewerbende aus dem Ausland, die Visum, Lebensunterhalt und Unterlagen rechtzeitig sichern können",
          },
          {
            uz: "Kasbga qiziqishi va motivatsiyasini suhbat hamda ariza hujjatlarida ishonchli ko‘rsata oladiganlar",
            de: "Personen, die Interesse und Motivation für den Beruf in Bewerbung und Gespräch überzeugend darstellen können",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Nemis tili: rasmiy minimum va Germaniyadagi real holat",
          de: "Deutschkenntnisse: formales Minimum und praktische Realität",
        },
        paragraphs: [
          {
            uz: "Malakali Berufsausbildung uchun yashash ruxsatida odatda yetarli nemis tili talab qilinadi. Aufenthaltsgesetzda «ausreichende Deutschkenntnisse» B1 darajaga tenglashtiriladi. Agar korxona yoki ta’lim muassasasi tilni o‘zi tekshirgan bo‘lsa yoki tayyorlov til kursi rejalashtirilgan bo‘lsa, alohida B1 dalili har doim ham bir xil shaklda talab qilinmasligi mumkin.",
            de: "Für die Aufenthaltserlaubnis zur qualifizierten Berufsausbildung werden grundsätzlich ausreichende Deutschkenntnisse verlangt. Im Aufenthaltsgesetz entsprechen ausreichende Kenntnisse dem Niveau B1. Hat der Betrieb oder die Bildungseinrichtung die Sprachkenntnisse selbst geprüft oder ist ein vorbereitender Sprachkurs vorgesehen, kann ein gesonderter B1-Nachweis anders behandelt werden.",
          },
          {
            uz: "Bu rasmiy minimum ish beruvchi sizni B1 bilan qabul qilishi shart degani emas. Ausbildung joyini berish qarorini korxona qabul qiladi, Berufsschule darslari va imtihonlari esa nemis tilida bo‘ladi.",
            de: "Dieses formale Minimum verpflichtet keinen Betrieb, Bewerbende mit B1 einzustellen. Über den Ausbildungsplatz entscheidet der Betrieb; Unterricht und Prüfungen in der Berufsschule finden auf Deutsch statt.",
          },
          {
            uz: "Vatandoshlar.de amaliy tavsiyasi: O‘zbekistondan turib hujjat topshirayotgan nomzod uchun B2ni maqsad qilish kerak. A2 bilan malakali Ausbildung vizasi va real o‘qish jarayoni uchun imkoniyat juda past. B1 bilan qonuniy yo‘l mavjud bo‘lishi mumkin, ammo chet eldan turib raqobatli sohalarda joy topish, nemischa suhbatdan o‘tish va Berufsschuleni muvaffaqiyatli tugatish juda qiyin.",
            de: "Praktische Empfehlung von Vatandoshlar.de: Wer sich aus Usbekistan bewirbt, sollte B2 anstreben. Mit A2 sind die Chancen auf eine qualifizierte Ausbildung samt Visum und erfolgreichem Ausbildungsalltag sehr gering. B1 kann formal ausreichen, ist bei einer Bewerbung aus dem Ausland in umkämpften Bereichen, im deutschsprachigen Vorstellungsgespräch und in der Berufsschule jedoch häufig nicht ausreichend.",
          },
        ],
        items: [
          {
            uz: "A2: ayrim e’lon yoki tayyorlov holatida uchrashi mumkin, ammo chet eldan malakali Ausbildung boshlash uchun real va xavfsiz daraja emas.",
            de: "A2: kann in einzelnen Anzeigen oder Vorbereitungskonzepten vorkommen, ist für den direkten Beginn einer qualifizierten Ausbildung aus dem Ausland aber kein realistisches und sicheres Niveau.",
          },
          {
            uz: "B1: viza uchun odatiy rasmiy daraja; oddiyroq muloqotli ayrim kasblarda imkon bo‘lishi mumkin, lekin chet eldan topshirishda ko‘pincha zaif.",
            de: "B1: übliches formales Niveau für das Visum; in einzelnen Berufen mit geringeren Kommunikationsanforderungen möglich, bei Bewerbung aus dem Ausland jedoch oft zu schwach.",
          },
          {
            uz: "B2: ko‘pchilik chet ellik nomzodlar uchun eng real boshlang‘ich maqsad; suhbat, ish va Berufsschule uchun ancha barqaror.",
            de: "B2: für viele internationale Bewerbende das realistischste Einstiegsziel; deutlich stabiler für Gespräch, Betrieb und Berufsschule.",
          },
          {
            uz: "IT Ausbildung: B1 qonuniy jihatdan mutlaq taqiqlanmagan, lekin O‘zbekistondan turib faqat B1 bilan Fachinformatiker kabi raqobatli joyni olish amalda juda past ehtimolli. B2, kuchli texnik portfolio va yaxshi nemischa suhbat tayyorgarligi kerak.",
            de: "IT-Ausbildung: B1 ist rechtlich nicht grundsätzlich ausgeschlossen, doch die Chance, sich aus Usbekistan mit ausschließlich B1 in umkämpften Berufen wie Fachinformatiker durchzusetzen, ist praktisch sehr gering. Empfehlenswert sind B2, ein starkes technisches Portfolio und gute Vorbereitung auf ein deutschsprachiges Gespräch.",
          },
          {
            uz: "Pflege va sog‘liq yo‘nalishlari: bemorlar bilan xavfsiz muloqot, tibbiy hujjatlar va maktab sababli odatda B2ni rejalashtirish kerak.",
            de: "Pflege und Gesundheit: Wegen sicherer Kommunikation mit Patientinnen und Patienten, Dokumentation und Schule sollte grundsätzlich B2 eingeplant werden.",
          },
          {
            uz: "Büro, savdo va mijoz bilan ishlash: telefon, xat, hujjat va mijoz muloqoti sababli B2 katta amaliy ustunlik beradi.",
            de: "Büro, Handel und kundennahe Berufe: Telefonate, Schriftverkehr, Dokumente und Kundenkontakt machen B2 zu einem deutlichen praktischen Vorteil.",
          },
          {
            uz: "Handwerk va gastronomiya: ayrim ish beruvchilar B1 bilan qabul qilishi mumkin, ammo xavfsizlik ko‘rsatmalari va Berufsschule uchun mustahkam B1 yoki B2 maqsad qilinishi kerak.",
            de: "Handwerk und Gastronomie: Einzelne Betriebe können B1 akzeptieren; für Sicherheitsanweisungen und Berufsschule sollte jedoch ein stabiles B1 oder B2 angestrebt werden.",
          },
        ],
      },
      documents: {
        title: {
          uz: "Ariza va viza uchun odatda kerak bo‘ladigan hujjatlar",
          de: "Üblicherweise erforderliche Bewerbungs- und Visumunterlagen",
        },
        items: [
          {
            uz: "Nemis standartiga mos, aniq va xatosiz Lebenslauf",
            de: "Übersichtlicher und fehlerfreier Lebenslauf nach deutschem Standard",
          },
          {
            uz: "Har bir kompaniya va kasbga moslashtirilgan Anschreiben yoki motivatsion xat",
            de: "An Betrieb und Beruf angepasstes Anschreiben beziehungsweise Motivationsschreiben",
          },
          {
            uz: "Maktab, kollej, universitet yoki kasbiy hujjatlar va talab qilinsa ularning tarjimasi",
            de: "Schul-, Hochschul- oder Berufsunterlagen und erforderlichenfalls deren Übersetzungen",
          },
          {
            uz: "Nemis tili sertifikati yoki korxona tomonidan til tekshirilganini tasdiqlovchi dalil",
            de: "Deutschzertifikat oder Nachweis, dass der Betrieb die Sprachkenntnisse geprüft hat",
          },
          {
            uz: "Imzolangan Ausbildungsvertrag yoki schulische Ausbildung uchun qabul xati",
            de: "Unterzeichneter Ausbildungsvertrag oder Zulassung zu einer schulischen Ausbildung",
          },
          {
            uz: "Pasport, milliy viza arizasi, biometrik surat va mas’ul vakolatxona checklistidagi boshqa hujjatlar",
            de: "Pass, nationaler Visumantrag, biometrisches Foto und weitere Unterlagen nach Checkliste der zuständigen Auslandsvertretung",
          },
          {
            uz: "Ausbildungsvergütung yetarli bo‘lmasa, qo‘shimcha moliyaviy ta’minot dalili",
            de: "Zusätzlicher Finanzierungsnachweis, wenn die Ausbildungsvergütung den Lebensunterhalt nicht vollständig sichert",
          },
        ],
        paragraphs: [
          {
            uz: "Aniq hujjatlar kasb, Bundesland, korxona, maktab va mas’ul Germaniya vakolatxonasiga qarab farq qiladi. Ayniqsa Anerkennung, sog‘liq ma’lumotnomasi yoki Führungszeugnis talab qilinadigan kasblarni alohida tekshiring.",
            de: "Die genaue Unterlagenliste unterscheidet sich nach Beruf, Bundesland, Betrieb, Schule und zuständiger deutscher Auslandsvertretung. Prüfen Sie besonders Berufe mit Anforderungen an Anerkennung, Gesundheitsnachweis oder Führungszeugnis.",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Ausbildungsvergütung va moliyaviy reja",
          de: "Ausbildungsvergütung und Finanzplanung",
        },
        paragraphs: [
          {
            uz: "2026-yilda boshlanadigan, Berufsbildungsgesetz yoki Handwerksordnung doirasidagi dual Ausbildung uchun qonuniy minimum brutto miqdorlar 1-yilda 724 yevro, 2-yilda 854 yevro, 3-yilda 977 yevro va 4-yilda 1 014 yevroni tashkil qiladi. Tarif shartnomasi yoki kasb bo‘yicha amaldagi to‘lovlar bundan ancha yuqori bo‘lishi mumkin.",
            de: "Für duale Ausbildungen nach Berufsbildungsgesetz oder Handwerksordnung, die 2026 beginnen, gelten monatliche Brutto-Mindestvergütungen von 724 Euro im ersten, 854 Euro im zweiten, 977 Euro im dritten und 1.014 Euro im vierten Ausbildungsjahr. Tarifliche oder berufsspezifische Vergütungen können deutlich höher liegen.",
          },
          {
            uz: "Brutto summa qo‘lga tushadigan Netto summa emas. Sog‘liq sug‘urtasi va boshqa ijtimoiy badallar ushlab qolinadi. Netto miqdor shaxsiy holat, sug‘urta va soliq omillariga bog‘liq.",
            de: "Die Bruttovergütung entspricht nicht dem ausgezahlten Nettobetrag. Beiträge zur Krankenversicherung und weiteren Sozialversicherungen werden abgezogen. Der Nettobetrag hängt von der persönlichen Situation, Versicherung und steuerlichen Faktoren ab.",
          },
        ],
        items: [
          {
            uz: "Shahar bo‘yicha ijara, transport, ovqat va sug‘urta xarajatlarini oldindan hisoblang.",
            de: "Berechnen Sie Miete, Verkehr, Verpflegung und Versicherung für den konkreten Wohnort.",
          },
          {
            uz: "Viza uchun Ausbildung daromadi yashash xarajatlarini to‘liq qoplamasa, blocked account yoki Verpflichtungserklärung kabi qo‘shimcha dalil talab qilinishi mumkin.",
            de: "Deckt die Ausbildungsvergütung den Lebensunterhalt für das Visum nicht vollständig, kann ein zusätzlicher Nachweis wie Sperrkonto oder Verpflichtungserklärung erforderlich sein.",
          },
          {
            uz: "Schulische Ausbildungda har doim ham Ausbildungsvergütung mavjud emas; ayrim maktablarda qo‘shimcha xarajatlar bo‘lishi mumkin.",
            de: "Bei schulischen Ausbildungen besteht nicht immer Anspruch auf Ausbildungsvergütung; bei einzelnen Schulen können zusätzliche Kosten entstehen.",
          },
          {
            uz: "Ausbildung uchun yashash ruxsati asosiy ta’limdan tashqari haftasiga 20 soatgacha qo‘shimcha ishga ruxsat beradi.",
            de: "Die Aufenthaltserlaubnis zur Ausbildung erlaubt neben der Ausbildung eine unabhängige Beschäftigung bis zu 20 Stunden wöchentlich.",
          },
        ],
      },
      warnings: {
        title: {
          uz: "Muhim ogohlantirishlar va noto‘g‘ri tushunchalar",
          de: "Wichtige Hinweise und häufige Missverständnisse",
        },
        items: [
          {
            uz: "«A2 bilan bemalol Ausbildung topiladi» degan umumiy va’da ishonchli emas. A2 ayrim alohida vaziyatlarda uchrashi mumkin, ammo O‘zbekistondan bevosita topshirayotgan nomzod uchun real imkoniyat juda past.",
            de: "Die pauschale Aussage, mit A2 problemlos einen Ausbildungsplatz zu finden, ist nicht verlässlich. A2 kann in Einzelfällen vorkommen, die realistischen Chancen bei direkter Bewerbung aus Usbekistan sind jedoch sehr gering.",
          },
          {
            uz: "«Viza uchun B1 yetarli» va «ish beruvchi B1 bilan qabul qiladi» bir xil narsa emas. Birinchisi huquqiy minimum bo‘lishi mumkin, ikkinchisi esa korxonaning raqobatli tanlovidir.",
            de: "„B1 reicht für das Visum“ und „ein Betrieb stellt mit B1 ein“ sind nicht dasselbe. Das eine kann ein formales Minimum sein, das andere ist eine wettbewerbliche Auswahlentscheidung des Betriebs.",
          },
          {
            uz: "ITda ingliz tilini bilish nemis tilini avtomatik almashtirmaydi. Berufsschule, imtihonlar, Ausbildung hujjatlari, jamoa va ko‘plab mijozlar bilan muloqot nemis tilida bo‘ladi.",
            de: "Englischkenntnisse ersetzen in der IT nicht automatisch Deutsch. Berufsschule, Prüfungen, Ausbildungsdokumentation, Teamkommunikation und viele Kundenkontakte finden auf Deutsch statt.",
          },
          {
            uz: "Ausbildungsplatz yoki viza kafolati uchun katta oldindan to‘lov talab qiladigan vositachilarni tekshirmasdan pul yubormang.",
            de: "Zahlen Sie keine hohen Vorausgebühren an Vermittler, die einen Ausbildungsplatz oder ein Visum garantieren.",
          },
          {
            uz: "Shartnoma, korxona, kasbning tan olinganligi va vakolatxona talablarini rasmiy manbalarda mustaqil tekshiring.",
            de: "Prüfen Sie Vertrag, Betrieb, Anerkennung des Ausbildungsberufs und Vorgaben der Auslandsvertretung selbstständig anhand offizieller Quellen.",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Kasbni real tanlang",
          de: "Beruf realistisch auswählen",
        },
        description: {
          uz: "Qiziqishdan tashqari maktab darajasi, til, jismoniy talab, mijoz muloqoti, Berufsschule va mehnat bozorini ham baholang.",
          de: "Bewerten Sie neben Interesse auch Schulniveau, Sprache, körperliche Anforderungen, Kundenkontakt, Berufsschule und Arbeitsmarkt.",
        },
      },
      {
        title: {
          uz: "Tilni B2gacha rivojlantiring",
          de: "Deutsch möglichst bis B2 ausbauen",
        },
        description: {
          uz: "B1 sertifikat bilan ariza berish qonuniy mumkin bo‘lishi mumkin, lekin chet eldan muvaffaqiyatli tanlov va o‘qish uchun B2ni maqsad qiling.",
          de: "Eine Bewerbung mit B1 kann formal möglich sein; für eine erfolgreiche Auswahl und Ausbildung aus dem Ausland sollte jedoch B2 angestrebt werden.",
        },
      },
      {
        title: {
          uz: "Hujjatlarni nemis standartida tayyorlang",
          de: "Unterlagen nach deutschem Standard erstellen",
        },
        description: {
          uz: "Lebenslauf, Anschreiben, diplomlar, tarjimalar, sertifikat va portfolio xatosiz, aniq va har bir joyga mos bo‘lsin.",
          de: "Lebenslauf, Anschreiben, Zeugnisse, Übersetzungen, Zertifikate und Portfolio müssen fehlerfrei, klar und auf jede Stelle angepasst sein.",
        },
      },
      {
        title: {
          uz: "Ko‘p va sifatli ariza yuboring",
          de: "Breit und hochwertig bewerben",
        },
        description: {
          uz: "Faqat yirik shaharlarga emas, kichik shahar va hududlardagi korxonalarga ham erta ariza yuboring. IT kabi raqobatli sohada ko‘p rad javobi normal.",
          de: "Bewerben Sie sich frühzeitig nicht nur in Großstädten, sondern auch bei Betrieben in kleineren Städten und Regionen. Viele Absagen sind in umkämpften Bereichen wie IT normal.",
        },
      },
      {
        title: {
          uz: "Nemischa suhbatga tayyorlaning",
          de: "Auf das deutschsprachige Gespräch vorbereiten",
        },
        description: {
          uz: "Kasb motivatsiyasi, kompaniya, kuchli va zaif tomonlar, texnik yoki amaliy savollar hamda Germaniyaga kelish rejasini ravon tushuntira oling.",
          de: "Erklären Sie Berufsmotivation, Betrieb, Stärken und Schwächen, technische oder praktische Fragen sowie Ihren Einreiseplan sicher auf Deutsch.",
        },
      },
      {
        title: {
          uz: "Shartnoma va moliyani tekshiring",
          de: "Vertrag und Finanzierung prüfen",
        },
        description: {
          uz: "Vergütung, Ausbildung muddati, sinov davri, ish joyi, Berufsschule, ta’til, uy-joy va yashash xarajatlarini tekshiring.",
          de: "Prüfen Sie Vergütung, Ausbildungsdauer, Probezeit, Einsatzort, Berufsschule, Urlaub, Unterkunft und Lebenshaltungskosten.",
        },
      },
      {
        title: {
          uz: "Milliy vizaga to‘g‘ri hujjat topshiring",
          de: "Nationales Visum korrekt beantragen",
        },
        description: {
          uz: "Imzolangan shartnoma bilan mas’ul Germaniya vakolatxonasining amaldagi checklistiga amal qiling. Moliyaviy ta’minot va til dalilini oldindan tayyorlang.",
          de: "Folgen Sie mit dem unterzeichneten Vertrag der aktuellen Checkliste der zuständigen deutschen Auslandsvertretung. Bereiten Sie Finanzierung und Sprachnachweis rechtzeitig vor.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "Ausbildung uchun A2 yetarlimi?",
          de: "Reicht A2 für eine Ausbildung?",
        },
        answer: {
          uz: "Umumiy javob — ishonchli ravishda yo‘q. Ayrim e’lon yoki tayyorlov holatida A2 uchrashi mumkin, ammo malakali Ausbildung vizasida odatda B1 kutiladi. O‘zbekistondan bevosita topshirishda A2 bilan ish beruvchi topish, suhbat va Berufsschuleni bajarish imkoniyati juda past.",
          de: "Als allgemeine Antwort: nicht verlässlich. A2 kann in einzelnen Anzeigen oder Vorbereitungskonzepten vorkommen, für das Visum zur qualifizierten Ausbildung wird grundsätzlich B1 erwartet. Bei direkter Bewerbung aus Usbekistan sind die Chancen mit A2 auf Betrieb, Gespräch und erfolgreiche Berufsschule sehr gering.",
        },
      },
      {
        question: {
          uz: "B1 bilan IT Ausbildung qilish mumkinmi?",
          de: "Ist eine IT-Ausbildung mit B1 möglich?",
        },
        answer: {
          uz: "Qonuniy jihatdan mutlaq taqiq yo‘q va ayrim istisnolar bo‘lishi mumkin. Lekin O‘zbekistondan turib faqat B1 bilan Fachinformatiker kabi raqobatli IT joyini olish amalda juda qiyin. B2, texnik portfolio, yaxshi baholar va kuchli nemischa suhbat tayyorgarligi real imkoniyatni oshiradi.",
          de: "Rechtlich besteht kein generelles Verbot und Einzelfälle sind möglich. Praktisch ist es jedoch sehr schwierig, sich aus Usbekistan mit ausschließlich B1 in einem umkämpften IT-Beruf wie Fachinformatiker durchzusetzen. B2, ein technisches Portfolio, gute Leistungen und ein starkes deutschsprachiges Gespräch erhöhen die Chancen.",
        },
      },
      {
        question: {
          uz: "Qaysi til darajasini maqsad qilish kerak?",
          de: "Welches Sprachniveau sollte angestrebt werden?",
        },
        answer: {
          uz: "Chet eldan topshirayotgan ko‘pchilik nomzod uchun B2 eng real maqsad. Pflege, sog‘liq, Erzieher, Büro, savdo va IT kabi kuchli muloqotli yoki raqobatli sohalarda B2ni minimum amaliy maqsad sifatida ko‘rish kerak.",
          de: "Für viele Bewerbende aus dem Ausland ist B2 das realistischste Ziel. In kommunikationsintensiven oder umkämpften Bereichen wie Pflege, Gesundheit, Erziehung, Büro, Handel und IT sollte B2 als praktisches Mindestziel betrachtet werden.",
        },
      },
      {
        question: {
          uz: "Ausbildung uchun yosh chegarasi bormi?",
          de: "Gibt es eine Altersgrenze für eine Ausbildung?",
        },
        answer: {
          uz: "Ausbildungning o‘zi uchun umumiy yuqori yosh chegarasi yo‘q. Ammo Ausbildungsplatz qidirish vizasi uchun alohida shart sifatida 35 yoshdan kichik bo‘lish talab qilinadi. Tayyor shartnoma bilan Ausbildung vizasi boshqa qoidalarga ega.",
          de: "Für die Ausbildung selbst gibt es keine allgemeine obere Altersgrenze. Beim Visum zur Suche nach einem Ausbildungsplatz gilt jedoch die besondere Voraussetzung, unter 35 Jahre alt zu sein. Das Visum mit bereits vorhandenem Ausbildungsvertrag folgt anderen Regeln.",
        },
      },
      {
        question: {
          uz: "Ausbildung maoshi yashash uchun yetadimi?",
          de: "Reicht die Ausbildungsvergütung zum Leben?",
        },
        answer: {
          uz: "Kasb, yil va shaharga bog‘liq. Katta shaharda qonuniy minimum ko‘pincha ijara va barcha xarajatlar uchun yetmasligi mumkin. Viza uchun ham qo‘shimcha moliyaviy ta’minot talab qilinishi ehtimoli bor.",
          de: "Das hängt von Beruf, Ausbildungsjahr und Wohnort ab. In Großstädten reicht die gesetzliche Mindestvergütung häufig nicht für Miete und alle Kosten. Auch für das Visum kann ein zusätzlicher Finanzierungsnachweis erforderlich sein.",
        },
      },
      {
        question: {
          uz: "Dual va schulische Ausbildungning farqi nima?",
          de: "Was ist der Unterschied zwischen dualer und schulischer Ausbildung?",
        },
        answer: {
          uz: "Dual Ausbildung korxona va Berufsschuleni birlashtiradi hamda odatda haq to‘lanadi. Schulische Ausbildung asosan kasb maktabida bo‘ladi; to‘lov mavjudligi kasbga bog‘liq va ayrim hollarda maktab xarajatlari ham bo‘lishi mumkin.",
          de: "Die duale Ausbildung verbindet Betrieb und Berufsschule und wird grundsätzlich vergütet. Die schulische Ausbildung findet überwiegend an einer Berufsfachschule statt; eine Vergütung hängt vom Beruf ab und teilweise können Schulkosten entstehen.",
        },
      },
      {
        question: {
          uz: "Ausbildung paytida qo‘shimcha ishlash mumkinmi?",
          de: "Darf man während der Ausbildung zusätzlich arbeiten?",
        },
        answer: {
          uz: "§16a bo‘yicha Ausbildung maqsadidagi yashash ruxsati asosiy Ausbildungdan mustaqil ravishda haftasiga 20 soatgacha qo‘shimcha ishlashga ruxsat beradi. Shartnoma, ish va dam olish qoidalariga ham rioya qilish kerak.",
          de: "Die Aufenthaltserlaubnis nach § 16a erlaubt unabhängig von der Ausbildung eine Nebenbeschäftigung bis zu 20 Stunden pro Woche. Zusätzlich sind Vertrag sowie Arbeits- und Ruhezeitvorschriften zu beachten.",
        },
      },
    ],
    sources: [
      {
        title: "Visa for vocational training",
        organization: "Make it in Germany",
        url: "https://www.make-it-in-germany.com/en/visa-residence/types/training",
        language: "en",
      },
      {
        title: "Requirements for vocational training",
        organization: "Make it in Germany",
        url: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany/requirements-for-vocational-training",
        language: "en",
      },
      {
        title: "§ 16a AufenthG — Berufsausbildung",
        organization: "Bundesministerium der Justiz",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__16a.html",
        language: "de",
      },
      {
        title: "§ 2 AufenthG — Definition der Sprachkenntnisse",
        organization: "Bundesministerium der Justiz",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__2.html",
        language: "de",
      },
      {
        title: "Mindestausbildungsvergütung 2026",
        organization: "Bundesinstitut für Berufsbildung",
        url: "https://www.bibb.de/de/199658.php",
        language: "de",
      },
      {
        title: "Ausbildungsplatzsuche",
        organization: "Bundesagentur für Arbeit",
        url: "https://www.arbeitsagentur.de/bildung/ausbildung",
        language: "de",
      },
      {
        title: "Visa requirements overview",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/231148-231148",
        language: "en",
      },
    ],
    relatedArticleSlugs: ["au-pair", "fsj", "bfd"],
  },
  {
    id: "chancenkarte",
    slug: "chancenkarte",
    categorySlug: "coming-to-germany",
    title: {
      uz: "Germaniya Chancenkarte",
      de: "Chancenkarte für Deutschland",
    },
    excerpt: {
      uz: "Chancenkarte orqali Germaniyada ish qidirish: tan olingan mutaxassis yo‘li, 6 ballik tizim, diplom va kasbiy malaka, til, tajriba, yosh, moliyaviy ta’minot, 20 soatlik ish va Probearbeit bo‘yicha rasmiy va amaliy qo‘llanma.",
      de: "Offizieller und praktischer Leitfaden zur Chancenkarte: anerkannte Fachkraft oder Punktesystem, Qualifikation, Sprache, Berufserfahrung, Alter, Finanzierung, 20-Stunden-Beschäftigung und Probearbeit.",
    },
    intro: {
      uz: "Chancenkarte — Germaniyada malakali ish yoki xorijiy kasbiy malakani tan oldirishga olib boradigan choralarni qidirish uchun beriladigan yashash ruxsatidir. Uni olishning ikki asosiy yo‘li mavjud: Germaniyada to‘liq tan olingan malakaga ega Fachkraft sifatida yoki davlat tan olgan xorijiy malaka, boshlang‘ich til talabi va kamida 6 ball asosidagi ball tizimi orqali. Chancenkarte ishni kafolatlamaydi; u Germaniyada cheklangan muddat davomida ish qidirish imkonini beradi.",
      de: "Die Chancenkarte ist ein Aufenthaltstitel zur Suche nach einer qualifizierten Beschäftigung oder nach Maßnahmen zur Anerkennung ausländischer Berufsqualifikationen. Es gibt zwei Hauptwege: als Fachkraft mit einer in Deutschland voll anerkannten Qualifikation oder über das Punktesystem mit staatlich anerkannter ausländischer Qualifikation, grundlegenden Sprachkenntnissen und mindestens sechs Punkten. Die Chancenkarte garantiert keinen Arbeitsplatz; sie ermöglicht eine zeitlich begrenzte Arbeitssuche in Deutschland.",
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
        label: { uz: "Ikki yo‘l", de: "Zwei Wege" },
        value: {
          uz: "Germaniyada to‘liq tan olingan Fachkraft yoki kamida 6 ballik tizim",
          de: "Voll anerkannte Fachkraft oder mindestens 6 Punkte im Punktesystem",
        },
      },
      {
        label: { uz: "Til — ball yo‘li", de: "Sprache — Punkteweg" },
        value: {
          uz: "Kamida nemis tili A1 yoki ingliz tili B2; yuqoriroq nemis tili qo‘shimcha ball beradi",
          de: "Mindestens Deutsch A1 oder Englisch B2; bessere Deutschkenntnisse bringen zusätzliche Punkte",
        },
      },
      {
        label: { uz: "Davomiylik", de: "Dauer" },
        value: {
          uz: "Dastlab ish qidirish uchun ko‘pi bilan 12 oy",
          de: "Zunächst höchstens 12 Monate zur Arbeitssuche",
        },
      },
      {
        label: { uz: "Qo‘shimcha ish", de: "Nebenbeschäftigung" },
        value: {
          uz: "Haftasiga o‘rtacha jami 20 soatgacha",
          de: "Durchschnittlich insgesamt höchstens 20 Stunden pro Woche",
        },
      },
      {
        label: { uz: "Probearbeit", de: "Probebeschäftigung" },
        value: {
          uz: "Har bir ish beruvchida ko‘pi bilan 2 hafta, maqsadli malakali ish yoki Ausbildung uchun",
          de: "Je Arbeitgeber höchstens 2 Wochen für qualifizierte Beschäftigung, Ausbildung oder Anerkennungsmaßnahme",
        },
      },
      {
        label: { uz: "Moliyaviy ta’minot 2026", de: "Finanzierung 2026" },
        value: {
          uz: "Oyiga kamida 1 091 yevro netto: Sperrkonto, Verpflichtungserklärung yoki mos Teilzeit daromadi orqali",
          de: "Mindestens 1.091 Euro netto pro Monat über Sperrkonto, Verpflichtungserklärung oder ausreichendes Teilzeiteinkommen",
        },
      },
    ],
    sections: {
      overview: {
        title: {
          uz: "Chancenkarte nima va kim uchun?",
          de: "Was ist die Chancenkarte und für wen ist sie gedacht?",
        },
        paragraphs: [
          {
            uz: "Chancenkarte ish taklifi bo‘lmagan malakali nomzodlarga Germaniyaga kelib, joyida ish qidirish imkonini beradi. U malakali Beschäftigung, Ausbildung yoki xorijiy malakani tan oldirish choralariga olib boradigan imkoniyatlarni izlash uchun ishlatiladi.",
            de: "Die Chancenkarte ermöglicht qualifizierten Personen ohne konkretes Vollzeitjobangebot, nach Deutschland einzureisen und vor Ort nach Arbeit zu suchen. Gesucht werden kann nach qualifizierter Beschäftigung, Ausbildung oder geeigneten Maßnahmen zur Anerkennung einer ausländischen Qualifikation.",
          },
          {
            uz: "Bu karta oddiy turistik viza yoki istalgan ishni cheklanmasdan bajarish ruxsati emas. Ish qidirish davrida faqat qonunda belgilangan 20 soatlik Nebenjob va cheklangan Probearbeit imkoniyatlari mavjud.",
            de: "Die Karte ist weder ein Touristenvisum noch eine uneingeschränkte Arbeitserlaubnis. Während der Suche sind nur die gesetzlich erlaubte Nebenbeschäftigung bis 20 Stunden und begrenzte Probebeschäftigungen möglich.",
          },
          {
            uz: "Agar sizda allaqachon haftasiga 20 soatdan ko‘p malakali ish taklifi bo‘lsa, ko‘pincha Chancenkarte emas, to‘g‘ridan-to‘g‘ri mos ish vizasi yoki boshqa yashash ruxsati maqsadga muvofiq bo‘ladi.",
            de: "Liegt bereits ein qualifiziertes Jobangebot mit mehr als 20 Wochenstunden vor, ist häufig nicht die Chancenkarte, sondern direkt ein passender Beschäftigungstitel sinnvoll.",
          },
        ],
      },
      eligibility: {
        title: {
          uz: "Ikki asosiy yo‘l: Fachkraft yoki ball tizimi",
          de: "Zwei Hauptwege: Fachkraft oder Punktesystem",
        },
        items: [
          {
            uz: "1-yo‘l — Fachkraft: xorijiy oliy yoki kasbiy malakangiz Germaniyada to‘liq tan olingan bo‘lsa, ball to‘plash shart emas.",
            de: "Weg 1 — Fachkraft: Ist Ihr ausländischer Hochschul- oder Berufsabschluss in Deutschland voll anerkannt, müssen Sie keine Punkte sammeln.",
          },
          {
            uz: "Fachkraft yo‘lida Chancenkarte uchun alohida til sertifikati qonuniy shart emas, lekin ish topish uchun nemis tili amalda juda muhim.",
            de: "Auf dem Fachkraft-Weg ist für die Chancenkarte kein gesonderter Sprachnachweis gesetzlich erforderlich; für die Arbeitssuche sind Deutschkenntnisse praktisch dennoch sehr wichtig.",
          },
          {
            uz: "2-yo‘l — ball tizimi: xorijda davlat tan olgan oliy ma’lumot yoki kamida 2 yillik kasbiy malaka talab qilinadi.",
            de: "Weg 2 — Punktesystem: Erforderlich ist ein im Ausbildungsstaat staatlich anerkannter Hochschulabschluss oder eine mindestens zweijährige Berufsqualifikation.",
          },
          {
            uz: "Ball yo‘lida oliy diplom uchun anabin ijobiy natijasi yoki ZAB Zeugnisbewertung, kasbiy malaka uchun esa ZAB Digitale Auskunft zur Berufsqualifikation talab qilinishi mumkin.",
            de: "Beim Punkteweg kann für Hochschulabschlüsse ein positives anabin-Ergebnis oder eine ZAB-Zeugnisbewertung und für Berufsqualifikationen eine Digitale Auskunft zur Berufsqualifikation erforderlich sein.",
          },
          {
            uz: "Ball yo‘lida kamida nemis tili A1 yoki ingliz tili B2 hamda jami kamida 6 ball talab qilinadi.",
            de: "Beim Punkteweg sind mindestens Deutsch A1 oder Englisch B2 sowie insgesamt mindestens sechs Punkte erforderlich.",
          },
          {
            uz: "Har ikki yo‘lda ham Germaniyada yashash xarajatlarini mustaqil qoplash isbotlanishi kerak.",
            de: "Auf beiden Wegen muss der Lebensunterhalt in Deutschland gesichert sein.",
          },
        ],
      },
      requirements: {
        title: {
          uz: "Ball tizimi qanday ishlaydi?",
          de: "Wie funktioniert das Punktesystem?",
        },
        paragraphs: [
          {
            uz: "Ball tizimi faqat Germaniyada to‘liq tan olingan Fachkraft bo‘lmagan nomzodlar uchun qo‘llanadi. Asosiy malaka va til sharti ballardan alohida bajarilishi kerak; keyin quyidagi mezonlardan jami kamida 6 ball to‘planadi.",
            de: "Das Punktesystem gilt nur für Personen, die nicht bereits als voll anerkannte Fachkraft gelten. Grundqualifikation und sprachliche Basisanforderung müssen zusätzlich erfüllt sein; anschließend sind mindestens sechs Punkte aus den folgenden Kriterien erforderlich.",
          },
        ],
        items: [
          {
            uz: "Qisman tan olingan malaka yoki reglementierte kasbda kompensatsiya chorasi talab qilinishi: 4 ball.",
            de: "Teilweise anerkannte Qualifikation oder erforderliche Ausgleichsmaßnahme in einem reglementierten Beruf: 4 Punkte.",
          },
          {
            uz: "Malaka Germaniyadagi Engpassberuf ro‘yxatiga kirsa: 1 ball.",
            de: "Qualifikation in einem Engpassberuf: 1 Punkt.",
          },
          {
            uz: "So‘nggi 5 yilda malakaga bog‘liq kamida 2 yil tajriba: 2 ball; so‘nggi 7 yilda kamida 5 yil tajriba: 3 ball.",
            de: "Mindestens 2 Jahre einschlägige Berufserfahrung in den letzten 5 Jahren: 2 Punkte; mindestens 5 Jahre in den letzten 7 Jahren: 3 Punkte.",
          },
          {
            uz: "Nemis tili A2: 1 ball; B1: 2 ball; B2 yoki yuqori: 3 ball.",
            de: "Deutsch A2: 1 Punkt; B1: 2 Punkte; B2 oder höher: 3 Punkte.",
          },
          {
            uz: "Ingliz tili C1 yoki undan yuqori: qo‘shimcha 1 ball.",
            de: "Englisch C1 oder höher: zusätzlich 1 Punkt.",
          },
          {
            uz: "Ariza vaqtida 35 yoshdan katta bo‘lmaganlar: 2 ball; 35 yoshdan katta va 40 yoshdan katta bo‘lmaganlar: 1 ball.",
            de: "Bei Antragstellung höchstens 35 Jahre alt: 2 Punkte; älter als 35 und höchstens 40 Jahre alt: 1 Punkt.",
          },
          {
            uz: "So‘nggi 5 yilda Germaniyada uzluksiz kamida 6 oy qonuniy yashaganlik: 1 ball; turistik yoki mehmon tashrifi hisoblanmaydi.",
            de: "In den letzten 5 Jahren mindestens 6 Monate ununterbrochener rechtmäßiger Aufenthalt in Deutschland: 1 Punkt; touristische oder Besuchsaufenthalte zählen nicht.",
          },
          {
            uz: "Turmush o‘rtog‘i yoki ro‘yxatdan o‘tgan hamkor ham Chancenkarte talablariga javob berib, birga ariza va kirishni rejalashtirsa: 1 ball.",
            de: "Ehe- oder eingetragener Lebenspartner erfüllt ebenfalls die Voraussetzungen, beantragt gemeinsam und plant die gemeinsame Einreise: 1 Punkt.",
          },
          {
            uz: "Barcha ballar hujjatlar, sertifikatlar va tajriba dalillari bilan isbotlanishi kerak.",
            de: "Alle Punkte müssen durch geeignete Unterlagen, Zertifikate und Erfahrungsnachweise belegt werden.",
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
            uz: "Amaldagi pasport va milliy viza arizasi",
            de: "Gültiger Reisepass und Antrag auf ein nationales Visum",
          },
          {
            uz: "Oliy yoki kasbiy malaka hujjatlari va talab qilinsa nemis yoki ingliz tilidagi tarjimalar",
            de: "Hochschul- oder Berufsqualifikationsnachweise und erforderlichenfalls Übersetzungen ins Deutsche oder Englische",
          },
          {
            uz: "Yo‘lga qarab Germaniyada to‘liq Anerkennung, anabin/ZAB Zeugnisbewertung yoki Digitale Auskunft zur Berufsqualifikation",
            de: "Je nach Weg vollständige Anerkennung in Deutschland, anabin/ZAB-Zeugnisbewertung oder Digitale Auskunft zur Berufsqualifikation",
          },
          {
            uz: "Ball yo‘lida nemis A1 yoki ingliz B2 til dalili; qo‘shimcha ball talab qilinsa yuqoriroq darajadagi sertifikat",
            de: "Beim Punkteweg Nachweis Deutsch A1 oder Englisch B2; für weitere Sprachpunkte ein höheres Zertifikat",
          },
          {
            uz: "Ish tajribasi uchun vazifalar va mas’uliyatlar batafsil yozilgan Arbeitszeugnis yoki ish beruvchi ma’lumotnomalari",
            de: "Für Berufserfahrung Arbeitszeugnisse oder Arbeitgeberbescheinigungen mit detaillierten Aufgaben und Verantwortungsbereichen",
          },
          {
            uz: "Sperrkonto, Verpflichtungserklärung yoki yetarli Teilzeit shartnomasi orqali moliyaviy ta’minot",
            de: "Finanzierungsnachweis über Sperrkonto, Verpflichtungserklärung oder ausreichenden Teilzeitvertrag",
          },
          {
            uz: "Viza davri uchun mos kirish tibbiy sug‘urtasi",
            de: "Geeignete Incoming-Krankenversicherung für den Visumzeitraum",
          },
          {
            uz: "Mas’ul Germaniya vakolatxonasi talab qilgan qo‘shimcha hujjatlar",
            de: "Weitere Unterlagen nach Vorgabe der zuständigen deutschen Auslandsvertretung",
          },
        ],
        paragraphs: [
          {
            uz: "Til sertifikatlari odatda ALTE sertifikatiga ega yoki tan olingan imtihon tashkiloti tomonidan berilgan bo‘lishi kerak. Rasmiy FAQga ko‘ra, til sertifikati odatda imtihon sanasidan bir yildan oshmagan bo‘lsa qabul qilinadi. Yakuniy talabni mas’ul elchixona yoki konsullikdan tekshiring.",
            de: "Sprachzertifikate müssen grundsätzlich von einer ALTE-zertifizierten oder sonst anerkannten Prüfungsinstitution stammen. Laut offizieller FAQ werden Sprachzertifikate in der Regel akzeptiert, wenn die Prüfung nicht länger als ein Jahr zurückliegt. Die endgültigen Anforderungen sind bei der zuständigen Auslandsvertretung zu prüfen.",
          },
        ],
      },
      conditions: {
        title: {
          uz: "Moliyaviy ta’minot, ishlash va Germaniyadagi real holat",
          de: "Finanzierung, Beschäftigung und praktische Realität in Deutschland",
        },
        paragraphs: [
          {
            uz: "2026-yilda Chancenkarte uchun yashash xarajatlarini qoplash maqsadida oyiga kamida 1 091 yevro netto moliyaviy ta’minot ko‘rsatiladi. Buni Sperrkonto, Verpflichtungserklärung yoki haftasiga 20 soatgacha bo‘lgan ish shartnomasi orqali to‘liq yoki qisman isbotlash mumkin.",
            de: "Für 2026 sind zur Sicherung des Lebensunterhalts mindestens 1.091 Euro netto pro Monat nachzuweisen. Dies kann vollständig oder teilweise über Sperrkonto, Verpflichtungserklärung oder einen Arbeitsvertrag bis 20 Wochenstunden erfolgen.",
          },
          {
            uz: "Vatandoshlar.de amaliy tavsiyasi: A1 nemis tili yoki faqat B2 ingliz tili Chancenkarte olishning qonuniy boshlang‘ich sharti bo‘lishi mumkin, lekin Germaniyada ish topish uchun ko‘pincha yetarli emas. ITdagi ayrim xalqaro lavozimlar bundan mustasno bo‘lishi mumkin, biroq ko‘pchilik kasblarda va kundalik hayotda kamida mustahkam B1, yaxshisi B2 nemis tili real imkoniyatni ancha oshiradi.",
            de: "Praktische Empfehlung von Vatandoshlar.de: Deutsch A1 oder ausschließlich Englisch B2 kann eine formale Zugangsvoraussetzung sein, reicht für die tatsächliche Arbeitssuche in Deutschland aber häufig nicht aus. Einzelne internationale IT-Stellen können Ausnahmen bilden; in den meisten Berufen und im Alltag erhöhen ein stabiles B1, besser B2 Deutsch, die realistischen Chancen deutlich.",
          },
          {
            uz: "Chancenkarte bilan kelish ish beruvchi topilishini kafolatlamaydi. Turar joy, transport, sug‘urta, kundalik xarajatlar, ariza hujjatlari va ehtimol bir necha oylik ish qidirish davrini oldindan rejalashtirish kerak.",
            de: "Die Einreise mit Chancenkarte garantiert keinen Arbeitgeber. Unterkunft, Verkehr, Versicherung, Alltag, Bewerbungsunterlagen und eine möglicherweise mehrmonatige Suchphase müssen realistisch vorfinanziert und geplant werden.",
          },
        ],
        items: [
          {
            uz: "Bir yoki bir nechta Nebenjobda haftasiga o‘rtacha jami 20 soatgacha ishlash mumkin.",
            de: "Eine oder mehrere Nebenbeschäftigungen sind durchschnittlich insgesamt bis zu 20 Stunden pro Woche erlaubt.",
          },
          {
            uz: "Har bir ish beruvchida ko‘pi bilan 2 haftalik Probearbeit mumkin; u malakali ish, Ausbildung yoki Anerkennung chorasi bilan bog‘liq bo‘lishi kerak.",
            de: "Je Arbeitgeber ist eine Probebeschäftigung von höchstens zwei Wochen möglich; sie muss auf qualifizierte Beschäftigung, Ausbildung oder eine Anerkennungsmaßnahme abzielen.",
          },
          {
            uz: "To‘liq yoki 20 soatdan ko‘p muntazam ish topilgach, odatda mos ish yashash ruxsatiga o‘tish kerak.",
            de: "Nach Aufnahme einer regulären Beschäftigung mit mehr als 20 Stunden ist grundsätzlich in einen passenden Beschäftigungstitel zu wechseln.",
          },
          {
            uz: "Dastlabki Such-Chancenkarte ko‘pi bilan 12 oy beriladi; to‘liq davr uchun moliya isbotlanmasa qisqaroq muddat berilishi mumkin.",
            de: "Die erste Such-Chancenkarte wird für höchstens zwölf Monate erteilt; bei kürzer nachgewiesener Finanzierung kann sie entsprechend kürzer ausgestellt werden.",
          },
          {
            uz: "Nemis tilini Germaniyaga kelishdan oldin rivojlantirish, CV va Anschreibenni nemis bozoriga moslash, hamda ish beruvchilar bilan oldindan aloqa boshlash tavsiya etiladi.",
            de: "Empfehlenswert sind Deutschlernen vor der Einreise, Anpassung von Lebenslauf und Anschreiben an den deutschen Markt sowie frühzeitiger Kontakt zu Arbeitgebern.",
          },
        ],
      },
      warnings: {
        title: {
          uz: "Muhim ogohlantirishlar va noto‘g‘ri tushunchalar",
          de: "Wichtige Hinweise und häufige Missverständnisse",
        },
        items: [
          {
            uz: "Chancenkarte «malakasiz istalgan odam uchun ish vizasi» emas. Rasmiy malaka va moliyaviy ta’minot har doim asosiy shartlar qatorida qoladi.",
            de: "Die Chancenkarte ist kein Arbeitsvisum für beliebige Personen ohne Qualifikation. Formale Qualifikation und gesicherter Lebensunterhalt bleiben zentrale Voraussetzungen.",
          },
          {
            uz: "6 ballning o‘zi yetmaydi: davlat tan olgan malaka, tilning boshlang‘ich sharti va moliyaviy ta’minot ham alohida bajarilishi kerak.",
            de: "Sechs Punkte allein reichen nicht: Grundqualifikation, sprachliche Basisanforderung und Finanzierung müssen zusätzlich erfüllt sein.",
          },
          {
            uz: "A1 nemis tili qonuniy kirish sharti bo‘lishi mumkin, lekin ko‘pchilik nemis ish beruvchilari uchun amaliy ish darajasi emas.",
            de: "Deutsch A1 kann eine formale Zugangsvoraussetzung sein, ist für die meisten deutschen Arbeitgeber aber kein praktisch ausreichendes Arbeitsniveau.",
          },
          {
            uz: "Chancenkarte bilan kelib istalgan Vollzeit ishni darhol boshlash mumkin emas; avval mos yashash ruxsatiga o‘tish talab qilinadi.",
            de: "Mit der Chancenkarte darf nicht sofort jede beliebige Vollzeitbeschäftigung aufgenommen werden; zunächst ist ein passender Aufenthaltstitel erforderlich.",
          },
          {
            uz: "Ish yoki vizani kafolatlaydigan vositachilarga katta oldindan to‘lov yubormang. Rasmiy onlayn termin tizimida maxsus yoki imtiyozli kirish mavjud emas.",
            de: "Zahlen Sie keine hohen Vorausgebühren an Vermittler, die Arbeit oder Visum garantieren. Im offiziellen Terminbuchungssystem gibt es keinen besonderen oder bevorzugten Zugang.",
          },
          {
            uz: "Chancenkarte Ausbildung yoki universitet joyini qidirish uchun asosiy maxsus viza o‘rnini bosmaydi; bu maqsadlar uchun alohida viza yo‘llari mavjud.",
            de: "Die Chancenkarte ersetzt nicht die besonderen Visa zur Suche nach einem Ausbildungs- oder Studienplatz; dafür bestehen eigene Aufenthaltstitel.",
          },
        ],
      },
    },
    steps: [
      {
        title: {
          uz: "Qaysi yo‘lga kirishingizni aniqlang",
          de: "Passenden Zugangsweg bestimmen",
        },
        description: {
          uz: "Malakangiz Germaniyada to‘liq tan olingan Fachkraftmi yoki 6 ballik tizim orqali topshirasizmi — avval shuni aniq tekshiring.",
          de: "Prüfen Sie zuerst, ob Sie als voll anerkannte Fachkraft gelten oder über das Punktesystem mit mindestens sechs Punkten gehen.",
        },
      },
      {
        title: {
          uz: "Diplom va malakani tekshirtiring",
          de: "Qualifikation prüfen lassen",
        },
        description: {
          uz: "Oliy ma’lumot uchun anabin yoki ZAB Zeugnisbewertungni, kasbiy malaka uchun Anerkennung yoki Digitale Auskunft talablarini tekshiring.",
          de: "Prüfen Sie für Hochschulabschlüsse anabin oder ZAB-Zeugnisbewertung und für Berufsqualifikationen Anerkennung oder Digitale Auskunft.",
        },
      },
      {
        title: {
          uz: "Ballarni faqat dalillar bilan hisoblang",
          de: "Punkte nur mit Nachweisen berechnen",
        },
        description: {
          uz: "Til, tajriba, yosh, Germaniyadagi oldingi yashash va boshqa mezonlarni rasmiy hujjatlar bilan isbotlay olishingizni tekshiring.",
          de: "Berechnen Sie Sprache, Erfahrung, Alter, frühere Deutschlandaufenthalte und weitere Kriterien nur, wenn Sie diese offiziell belegen können.",
        },
      },
      {
        title: {
          uz: "Moliyaviy ta’minotni tayyorlang",
          de: "Finanzierung vorbereiten",
        },
        description: {
          uz: "2026 uchun oyiga 1 091 yevro netto mezonini Sperrkonto, Verpflichtungserklärung yoki mos Teilzeit shartnomasi bilan qoplash rejasini tuzing.",
          de: "Planen Sie für 2026 den Nachweis von 1.091 Euro netto monatlich über Sperrkonto, Verpflichtungserklärung oder passenden Teilzeitvertrag.",
        },
      },
      {
        title: {
          uz: "Ish qidirishni vizadan oldin boshlang",
          de: "Arbeitssuche vor dem Visum beginnen",
        },
        description: {
          uz: "Nemis standartidagi CV, Anschreiben va professional profillarni tayyorlang; ish bozori, shahar va kasb talablarini oldindan o‘rganing.",
          de: "Erstellen Sie Lebenslauf, Anschreiben und professionelle Profile nach deutschem Standard und recherchieren Sie Arbeitsmarkt, Regionen und Berufsanforderungen frühzeitig.",
        },
      },
      {
        title: {
          uz: "Konsullik xizmatlari portali orqali ariza bering",
          de: "Über das Auslandsportal beantragen",
        },
        description: {
          uz: "Mavjud bo‘lsa onlayn ariza yuboring, hujjatlarni oldindan tekshirtiring va keyin biometrika hamda asl hujjatlar uchun shaxsiy termin talablariga amal qiling.",
          de: "Reichen Sie den Antrag, sofern verfügbar, online ein, lassen Sie Unterlagen vorprüfen und folgen Sie anschließend den Vorgaben für Biometrie und Originaldokumente beim persönlichen Termin.",
        },
      },
      {
        title: {
          uz: "Germaniyada vaqtni aniq reja bilan ishlating",
          de: "Suchzeit in Deutschland strukturiert nutzen",
        },
        description: {
          uz: "Nebenjobni asosiy maqsadga aylantirmang: malakali ish arizalari, tarmoq yaratish, til, Jobmesse, Probearbeit va Anerkennung jarayoniga ustuvorlik bering.",
          de: "Machen Sie den Nebenjob nicht zum Hauptziel: Priorisieren Sie qualifizierte Bewerbungen, Netzwerk, Deutsch, Jobmessen, Probearbeit und gegebenenfalls Anerkennung.",
        },
      },
    ],
    faq: [
      {
        question: {
          uz: "Chancenkarte uchun albatta 6 ball kerakmi?",
          de: "Braucht man für die Chancenkarte immer sechs Punkte?",
        },
        answer: {
          uz: "Yo‘q. Agar xorijiy oliy yoki kasbiy malakangiz Germaniyada to‘liq tan olingan va siz Fachkraft hisoblasangiz, ball tizimi qo‘llanmaydi. To‘liq tan olinmagan yo‘lda esa asosiy shartlar bilan birga kamida 6 ball kerak.",
          de: "Nein. Wenn Ihre ausländische Hochschul- oder Berufsqualifikation in Deutschland voll anerkannt ist und Sie als Fachkraft gelten, findet das Punktesystem keine Anwendung. Auf dem anderen Weg sind zusätzlich zu den Grundvoraussetzungen mindestens sechs Punkte erforderlich.",
        },
      },
      {
        question: {
          uz: "A1 nemis tili bilan Chancenkarte olish mumkinmi?",
          de: "Kann man die Chancenkarte mit Deutsch A1 erhalten?",
        },
        answer: {
          uz: "Ball tizimi yo‘lida nemis A1 yoki ingliz B2 boshlang‘ich til shartini bajaradi. Ammo A1 qo‘shimcha ball bermaydi va Germaniyada malakali ish topish uchun amalda ko‘pincha yetarli emas. B1 yoki B2 nemis tili ish imkoniyatini sezilarli oshiradi.",
          de: "Beim Punkteweg erfüllt Deutsch A1 oder Englisch B2 die sprachliche Grundvoraussetzung. A1 bringt jedoch keinen zusätzlichen Punkt und reicht für die qualifizierte Arbeitssuche praktisch häufig nicht aus. Deutsch B1 oder B2 verbessert die Chancen deutlich.",
        },
      },
      {
        question: {
          uz: "Faqat ingliz tili B2 bilan borish realmi?",
          de: "Ist die Einreise nur mit Englisch B2 realistisch?",
        },
        answer: {
          uz: "Qonuniy jihatdan ball yo‘lining boshlang‘ich til sharti bajarilishi mumkin. Amalda faqat ingliz tilida ish topish kasb va shaharga juda bog‘liq; xalqaro IT, ilmiy yoki ayrim mutaxassisliklarda imkon ko‘proq, ko‘pchilik nemis korxonalarida esa nemis tili talab qilinadi.",
          de: "Rechtlich kann damit die sprachliche Grundvoraussetzung des Punktewegs erfüllt sein. Praktisch hängt eine rein englischsprachige Arbeitssuche stark von Beruf und Region ab; Chancen bestehen eher in internationaler IT, Forschung oder bestimmten Fachgebieten, während viele deutsche Betriebe Deutsch erwarten.",
        },
      },
      {
        question: {
          uz: "Chancenkarte bilan Vollzeit ishlash mumkinmi?",
          de: "Darf man mit der Chancenkarte Vollzeit arbeiten?",
        },
        answer: {
          uz: "Ish qidirish Chancenkarte bilan muntazam Nebenjob o‘rtacha haftasiga jami 20 soat bilan cheklangan. To‘liq ish topilgach, ishni boshlash uchun odatda mos mehnat yashash ruxsatiga o‘tish kerak.",
          de: "Mit der Such-Chancenkarte ist reguläre Nebenbeschäftigung durchschnittlich auf insgesamt 20 Wochenstunden begrenzt. Nach einem Vollzeitjobangebot ist grundsätzlich in einen passenden Beschäftigungstitel zu wechseln.",
        },
      },
      {
        question: {
          uz: "Probearbeit qancha davom etishi mumkin?",
          de: "Wie lange darf eine Probebeschäftigung dauern?",
        },
        answer: {
          uz: "Har bir ish beruvchida ko‘pi bilan 2 hafta. Probearbeit malakali ish, Ausbildung yoki malakani tan oldirish chorasi bilan bog‘liq bo‘lishi kerak.",
          de: "Je Arbeitgeber höchstens zwei Wochen. Die Probebeschäftigung muss auf qualifizierte Beschäftigung, Ausbildung oder eine Anerkennungsmaßnahme abzielen.",
        },
      },
      {
        question: {
          uz: "2026-yilda qancha mablag‘ ko‘rsatish kerak?",
          de: "Wie viel Finanzierung muss 2026 nachgewiesen werden?",
        },
        answer: {
          uz: "Rasmiy ma’lumotga ko‘ra oyiga kamida 1 091 yevro netto. Yetarli Teilzeit daromadi bu summani to‘liq yoki qisman qoplashi, qolgan qismi esa Sperrkonto bilan to‘ldirilishi mumkin. Verpflichtungserklärung ham muqobil yo‘l hisoblanadi.",
          de: "Nach offizieller Information mindestens 1.091 Euro netto pro Monat. Ausreichendes Teilzeiteinkommen kann den Betrag ganz oder teilweise decken; eine Differenz kann über ein Sperrkonto ausgeglichen werden. Alternativ ist eine Verpflichtungserklärung möglich.",
        },
      },
      {
        question: {
          uz: "Chancenkarte bilan Ausbildung joyini qidirish mumkinmi?",
          de: "Kann man mit der Chancenkarte einen Ausbildungsplatz suchen?",
        },
        answer: {
          uz: "Chancenkarte doirasidagi Probearbeit Ausbildungga qaratilgan bo‘lishi mumkin, ammo faqat Ausbildung joyini qidirish uchun alohida viza yo‘li mavjud. Asosiy maqsad Ausbildung bo‘lsa, aynan shu maxsus vizani tekshirish kerak.",
          de: "Eine Probebeschäftigung im Rahmen der Chancenkarte kann auf eine Ausbildung abzielen. Für die gezielte Suche nach einem Ausbildungsplatz existiert jedoch ein eigener Aufenthaltstitel, der bei entsprechendem Hauptzweck geprüft werden sollte.",
        },
      },
      {
        question: {
          uz: "Chancenkarte bilan oila birlashtirish mumkinmi?",
          de: "Ist Familiennachzug mit der Chancenkarte möglich?",
        },
        answer: {
          uz: "Turmush o‘rtog‘i o‘zining Chancenkarte talablariga javob bersa, birga ariza berib kirishi mumkin. Aks holda vaqtinchalik Such-Chancenkarte asosida oddiy turmush o‘rtog‘i qo‘shilishi odatda mumkin emas; malakali ish topib, barqaror yashash maqomiga o‘tgach oila birlashtirish yo‘li tekshiriladi.",
          de: "Erfüllt der Ehepartner selbst die Voraussetzungen der Chancenkarte, kann gemeinsam beantragt und eingereist werden. Andernfalls ist ein gewöhnlicher Ehegattennachzug zur befristeten Such-Chancenkarte grundsätzlich nicht vorgesehen; nach Aufnahme qualifizierter Beschäftigung und Wechsel des Aufenthaltstitels kann Familiennachzug geprüft werden.",
        },
      },
    ],
    sources: [
      {
        title: "Job search opportunity card",
        organization: "Make it in Germany",
        url: "https://www.make-it-in-germany.com/en/visa-residence/opportunity-card/job-search",
        language: "en",
      },
      {
        title: "Questions and answers regarding the opportunity card",
        organization: "Make it in Germany",
        url: "https://www.make-it-in-germany.com/en/visa-residence/opportunity-card/questions-answers",
        language: "en",
      },
      {
        title: "§ 20a AufenthG — Chancenkarte",
        organization: "Bundesministerium der Justiz",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__20a.html",
        language: "de",
      },
      {
        title: "§ 20b AufenthG — Punktevergabe",
        organization: "Bundesministerium der Justiz",
        url: "https://www.gesetze-im-internet.de/aufenthg_2004/__20b.html",
        language: "de",
      },
      {
        title: "Consular Services Portal",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/visa-service/consular-services-portal",
        language: "en",
      },
      {
        title: "Opening and closing a blocked bank account",
        organization: "Federal Foreign Office",
        url: "https://www.auswaertiges-amt.de/en/sperrkonto-388600",
        language: "en",
      },
    ],
    relatedArticleSlugs: ["ausbildung", "fsj", "bfd", "au-pair"],
  },
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
          uz: "2025-yil 1-iyuldan remonstratsiya bekor qilingan; odatda yangi ariza yoki sud yo‘li qoladi",
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
            uz: "2025-yil 1-iyuldan Germaniya vizalari bo‘yicha remonstratsiya jarayoni butun dunyo bo‘ylab bekor qilingan. Rad javobidan keyin odatda kamchiliklarni tuzatib yangi ariza berish yoki qonuniy muddat ichida sud yo‘lini tekshirish mumkin.",
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
          uz: "Viza rad etilsa remonstratsiya qilish mumkinmi?",
          de: "Kann man nach einer Ablehnung remonstrieren?",
        },
        answer: {
          uz: "Yo‘q. 2025-yil 1-iyuldan remonstratsiya jarayoni bekor qilingan. Rad sababini tuzatib yangi ariza berish yoki ko‘rsatilgan muddatda sud yo‘lini tekshirish mumkin.",
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
            uz: "Viza maqsadini noto‘g‘ri tanlab bron qilingan termin bilan kelish xavfli. Masalan, Schengen mehmon vizasi, Ausbildung, Chancenkarte va Familiennachzug uchun bir xil termin kategoriyasidan foydalanilmaydi.",
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
