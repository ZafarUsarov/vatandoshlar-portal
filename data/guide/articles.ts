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
