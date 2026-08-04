export type SupportedJobLocale = "uz" | "de";

export type LocalizedText = Readonly<
  Record<SupportedJobLocale, string>
>;

export type JobCategory =
  | "students"
  | "english"
  | "minijob"
  | "internship"
  | "professionals"
  | "safety";

export type LocalizedJobGuide = Readonly<{
  id: number;
  slug: string;
  title: LocalizedText;
  shortTitle: LocalizedText;
  description: LocalizedText;
  category: JobCategory;
  icon: string;
  audience: LocalizedText;
  highlights: ReadonlyArray<LocalizedText>;
  searchKeywords: ReadonlyArray<string>;
  steps: ReadonlyArray<LocalizedText>;
  importantNotes: ReadonlyArray<LocalizedText>;
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: LocalizedText;
  verifiedAt: string;
  featured?: boolean;
}>;

export type JobGuide = Readonly<{
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  icon: string;
  audience: string;
  highlights: ReadonlyArray<string>;
  searchKeywords: ReadonlyArray<string>;
  steps: ReadonlyArray<string>;
  importantNotes: ReadonlyArray<string>;
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: string;
  verifiedAt: string;
  featured?: boolean;
}>;

const categoryLabels: Readonly<
  Record<SupportedJobLocale, Record<JobCategory, string>>
> = {
  uz: {
    students: "Talabalar",
    english: "Ingliz tilida",
    minijob: "Minijob",
    internship: "Amaliyot",
    professionals: "Malakali mutaxassislar",
    safety: "Xavfsiz ish qidirish",
  },
  de: {
    students: "Studierende",
    english: "Englischsprachige Stellen",
    minijob: "Minijob",
    internship: "Praktikum",
    professionals: "Fachkräfte",
    safety: "Sichere Jobsuche",
  },
};

export const localizedJobGuides: ReadonlyArray<LocalizedJobGuide> = [
  {
    id: 1,
    slug: "germaniyada-talabalar-uchun-ish",
    title: {
      uz: "Germaniyada xalqaro talabalar uchun ishlash qoidalari",
      de: "Arbeitsregeln für internationale Studierende in Deutschland",
    },
    shortTitle: {
      uz: "Talabalar uchun ish",
      de: "Jobs für Studierende",
    },
    description: {
      uz: "Talabalarga Nebenjob, Werkstudent, universitetdagi student-assistant ishlari va amaliyot imkoniyatlarini qonuniy talablar asosida topishga yordam beruvchi qo‘llanma.",
      de: "Ein Leitfaden zu Nebenjobs, Werkstudentenstellen, studentischen Hilfstätigkeiten und Praktika unter Beachtung der rechtlichen Vorgaben.",
    },
    category: "students",
    icon: "🎓",
    audience: {
      uz: "Germaniyada oliy ta’lim muassasasida tahsil olayotgan xalqaro talabalar",
      de: "Internationale Studierende an Hochschulen in Deutschland",
    },
    highlights: [
      {
        uz: "140 to‘liq yoki 280 yarim ish kuni qoidasi",
        de: "Regelung mit 140 vollen oder 280 halben Arbeitstagen",
      },
      {
        uz: "Haftasiga 20 soatlik muqobil hisoblash imkoniyati",
        de: "Alternative Berechnung über bis zu 20 Stunden pro Woche",
      },
      {
        uz: "Universitetdagi student-assistant ishlarini qidirish",
        de: "Suche nach studentischen Hilfstätigkeiten an Hochschulen",
      },
      {
        uz: "Werkstudent va Nebenjob o‘rtasidagi farq",
        de: "Unterschied zwischen Werkstudentenstelle und Nebenjob",
      },
    ],
    searchKeywords: [
      "Werkstudent",
      "Studentische Hilfskraft",
      "Wissenschaftliche Hilfskraft",
      "Aushilfe Student",
      "Nebenjob Student",
      "Teilzeit Student",
    ],
    steps: [
      {
        uz: "Avvalo yashash ruxsatnomangizning Zusatzblatt yoki Nebenbestimmungen qismidagi ishlash shartlarini tekshiring.",
        de: "Prüfen Sie zuerst die Arbeitsbedingungen im Zusatzblatt oder in den Nebenbestimmungen Ihres Aufenthaltstitels.",
      },
      {
        uz: "Universitetingizning Career Center, Stellenportal va institutlar e’lonlarini ko‘rib chiqing.",
        de: "Prüfen Sie Career Center, Stellenportal und Ausschreibungen der Institute Ihrer Hochschule.",
      },
      {
        uz: "Bundesagentur für Arbeit Jobsuche platformasida Werkstudent, studentische Hilfskraft yoki Nebenjob so‘zlari bilan qidiring.",
        de: "Suchen Sie in der Jobsuche der Bundesagentur für Arbeit nach Werkstudent, studentische Hilfskraft oder Nebenjob.",
      },
      {
        uz: "CV, qisqa motivatsion xat, Immatrikulationsbescheinigung va zarur bo‘lsa baholar ro‘yxatini tayyorlang.",
        de: "Bereiten Sie Lebenslauf, kurzes Anschreiben, Immatrikulationsbescheinigung und gegebenenfalls Notenübersicht vor.",
      },
      {
        uz: "Ish beruvchidan haftalik ish vaqti, brutto maosh, shartnoma muddati va ta’til huquqini yozma ravishda so‘rang.",
        de: "Lassen Sie sich Wochenarbeitszeit, Bruttolohn, Vertragsdauer und Urlaubsanspruch schriftlich bestätigen.",
      },
      {
        uz: "Ishni boshlashdan oldin universitet, Ausländerbehörde yoki mas’ul maslahat xizmatidan individual holatingizni aniqlashtiring.",
        de: "Klären Sie Ihre individuelle Situation vor Arbeitsbeginn mit Hochschule, Ausländerbehörde oder einer zuständigen Beratungsstelle.",
      },
    ],
    importantNotes: [
      {
        uz: "Uchinchi davlat fuqarosi bo‘lgan talabalar uchun ishlash huquqi yashash maqomiga bog‘liq.",
        de: "Bei Studierenden aus Drittstaaten hängt die Arbeitserlaubnis vom Aufenthaltsstatus ab.",
      },
      {
        uz: "Majburiy va ixtiyoriy amaliyotlar bir xil tartibda hisoblanmasligi mumkin.",
        de: "Pflichtpraktika und freiwillige Praktika können unterschiedlich behandelt werden.",
      },
      {
        uz: "Semestr vaqtida ko‘p ishlash talabalik sug‘urtasi va ijtimoiy sug‘urta maqomiga ta’sir qilishi mumkin.",
        de: "Eine hohe Arbeitszeit im Semester kann studentische Krankenversicherung und Sozialversicherungsstatus beeinflussen.",
      },
      {
        uz: "O‘zini o‘zi band qilish yoki freelance faoliyati uchun alohida ruxsat talab qilinishi mumkin.",
        de: "Für Selbstständigkeit oder freiberufliche Tätigkeit kann eine gesonderte Erlaubnis erforderlich sein.",
      },
    ],
    officialSourceName: "Make it in Germany — Study and work",
    officialSourceUrl:
      "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
    sourceDescription: {
      uz: "Germaniya federal hukumatining rasmiy portalida xalqaro talabalarning ishlash huquqi, ish kunlarini hisoblash va amaliyotlar haqidagi ma’lumotlar berilgan.",
      de: "Das offizielle Portal der Bundesregierung erläutert Arbeitsrechte, die Berechnung von Arbeitstagen und Praktika für internationale Studierende.",
    },
    verifiedAt: "2026-07-30",
    featured: true,
  },
  {
    id: 2,
    slug: "germaniyada-ingliz-tilida-ish-topish",
    title: {
      uz: "Germaniyada ingliz tilida ish topish bo‘yicha qo‘llanma",
      de: "Leitfaden für die Suche nach englischsprachigen Jobs in Deutschland",
    },
    shortTitle: {
      uz: "Ingliz tilidagi ishlar",
      de: "Englischsprachige Jobs",
    },
    description: {
      uz: "Nemis tilini hali yaxshi bilmaydiganlar uchun ingliz tili ishlatiladigan vakansiyalarni to‘g‘ri qidirish, e’lon talablarini tekshirish va ariza tayyorlash yo‘llari.",
      de: "Hinweise zur gezielten Suche nach englischsprachigen Stellen, zur Prüfung der Anforderungen und zur Vorbereitung einer passenden Bewerbung.",
    },
    category: "english",
    icon: "EN",
    audience: {
      uz: "Ingliz tilida ishlay oladigan talabalar, yangi kelganlar va xalqaro mutaxassislar",
      de: "Studierende, Neuankömmlinge und internationale Fachkräfte mit guten Englischkenntnissen",
    },
    highlights: [
      {
        uz: "English-speaking vakansiyalarni qidirish",
        de: "Gezielte Suche nach englischsprachigen Stellen",
      },
      {
        uz: "Xalqaro kompaniyalarni aniqlash",
        de: "Internationale Unternehmen identifizieren",
      },
      {
        uz: "Ingliz tilidagi CV va cover letter",
        de: "Lebenslauf und Anschreiben auf Englisch",
      },
      {
        uz: "Nemis tili talabini to‘g‘ri baholash",
        de: "Deutsch-Anforderungen realistisch einschätzen",
      },
    ],
    searchKeywords: [
      "English speaking",
      "English language",
      "International team",
      "Working student English",
      "English customer support",
      "Junior developer English",
      "Data analyst English",
      "Internship English",
    ],
    steps: [
      {
        uz: "Bundesagentur für Arbeit va Make it in Germany platformalarida kasb nomini inglizcha va nemischa variantlarda qidiring.",
        de: "Suchen Sie bei Bundesagentur für Arbeit und Make it in Germany mit englischen und deutschen Berufsbezeichnungen.",
      },
      {
        uz: "Qidiruv so‘ziga English speaking, international team yoki working language English iboralarini qo‘shing.",
        de: "Ergänzen Sie Suchbegriffe wie English speaking, international team oder working language English.",
      },
      {
        uz: "Vakansiyaning language requirements bo‘limini diqqat bilan o‘qing.",
        de: "Lesen Sie die Sprachvoraussetzungen der Stellenanzeige sorgfältig.",
      },
      {
        uz: "CVni vakansiya tilida tayyorlang va unda Germaniyadagi yashash hamda ishlash huquqingizni aniq ko‘rsating.",
        de: "Erstellen Sie den Lebenslauf in der Sprache der Anzeige und nennen Sie Aufenthalts- und Arbeitserlaubnis klar.",
      },
      {
        uz: "Arizada nemis tilini o‘rganayotgan bo‘lsangiz, amaldagi darajangiz va rejangizni yozing.",
        de: "Nennen Sie in der Bewerbung Ihr aktuelles Deutschniveau und Ihren Lernplan.",
      },
      {
        uz: "Suhbatdan oldin kompaniyaning rasmiy sayti, Impressum sahifasi va aloqa ma’lumotlarini tekshiring.",
        de: "Prüfen Sie vor dem Gespräch offizielle Website, Impressum und Kontaktdaten des Unternehmens.",
      },
    ],
    importantNotes: [
      {
        uz: "Vakansiya matni ingliz tilida yozilgani ish joyida nemis tili umuman talab qilinmaydi degani emas.",
        de: "Eine englische Stellenanzeige bedeutet nicht automatisch, dass am Arbeitsplatz kein Deutsch benötigt wird.",
      },
      {
        uz: "Mijozlar bilan ishlash, tibbiyot, ta’lim va davlat bilan bog‘liq kasblarda nemis tili ko‘pincha zarur.",
        de: "In kundenbezogenen, medizinischen, pädagogischen und behördlichen Berufen ist Deutsch häufig erforderlich.",
      },
      {
        uz: "IT, ilmiy tadqiqot, startup va xalqaro kompaniyalarda ingliz tili bilan imkoniyatlar ko‘proq uchrashi mumkin.",
        de: "In IT, Forschung, Start-ups und internationalen Unternehmen gibt es häufiger englischsprachige Möglichkeiten.",
      },
      {
        uz: "Nemis tilini o‘rganish uzoq muddatli ish va karyera imkoniyatlarini yaxshilaydi.",
        de: "Deutschkenntnisse verbessern langfristig Job- und Karrierechancen.",
      },
    ],
    officialSourceName:
      "Bundesagentur für Arbeit — Working in Germany",
    officialSourceUrl:
      "https://www.arbeitsagentur.de/en/working-in-germany/how-to-find-a-job",
    sourceDescription: {
      uz: "Federal Employment Agency rasmiy sahifasi Germaniyada ishonchli ish platformalari, ariza berish va ish qidirish bo‘yicha ko‘rsatmalar beradi.",
      de: "Die offizielle Seite der Bundesagentur für Arbeit informiert über verlässliche Jobportale, Bewerbungen und Jobsuche in Deutschland.",
    },
    verifiedAt: "2026-07-30",
  },
  {
    id: 3,
    slug: "germaniyada-minijob",
    title: {
      uz: "Germaniyada Minijob: daromad chegarasi va huquqlar",
      de: "Minijob in Deutschland: Verdienstgrenze und Rechte",
    },
    shortTitle: {
      uz: "Minijob",
      de: "Minijob",
    },
    description: {
      uz: "2026-yildagi Minijob daromad chegarasi, minimal ish haqi, ish vaqti, ta’til va mehnat shartnomasi bo‘yicha asosiy ma’lumotlar.",
      de: "Wichtige Informationen zu Verdienstgrenze, Mindestlohn, Arbeitszeit, Urlaub und Arbeitsvertrag im Jahr 2026.",
    },
    category: "minijob",
    icon: "€",
    audience: {
      uz: "Talabalar, qo‘shimcha daromad izlayotganlar va qisqa vaqt ishlashni istaganlar",
      de: "Studierende und Personen, die einen Nebenverdienst oder eine geringfügige Beschäftigung suchen",
    },
    highlights: [
      {
        uz: "2026-yilda oyiga o‘rtacha 603 yevrogacha",
        de: "2026 durchschnittlich bis zu 603 Euro monatlich",
      },
      {
        uz: "Soatiga kamida 13,90 yevro minimal ish haqi",
        de: "Mindestens 13,90 Euro gesetzlicher Mindestlohn pro Stunde",
      },
      {
        uz: "Yillik haq to‘lanadigan ta’til huquqi",
        de: "Anspruch auf bezahlten Jahresurlaub",
      },
      {
        uz: "Yozma mehnat shartnomasini tekshirish",
        de: "Schriftlichen Arbeitsvertrag prüfen",
      },
    ],
    searchKeywords: [
      "Minijob",
      "Aushilfe",
      "Nebenjob",
      "Servicekraft Minijob",
      "Lagerhelfer Minijob",
      "Verkäufer Minijob",
      "Reinigungskraft Minijob",
    ],
    steps: [
      {
        uz: "Bundesagentur für Arbeit Jobsuche platformasida Minijob yoki Aushilfe so‘zi va yashash joyingizni kiriting.",
        de: "Suchen Sie in der Jobsuche der Bundesagentur für Arbeit nach Minijob oder Aushilfe und Ihrem Wohnort.",
      },
      {
        uz: "Vakansiyada soatlik maosh, oylik ish soati va smena jadvali ko‘rsatilganini tekshiring.",
        de: "Prüfen Sie Stundenlohn, monatliche Arbeitszeit und Schichtplan in der Anzeige.",
      },
      {
        uz: "2026-yil uchun oylik muntazam daromad Minijob chegarasiga mos kelishini hisoblang.",
        de: "Berechnen Sie, ob das regelmäßige Monatseinkommen 2026 innerhalb der Minijob-Grenze liegt.",
      },
      {
        uz: "Ish beruvchidan yozma shartnoma, ish vaqti qaydi va maosh hisob-kitobini talab qiling.",
        de: "Verlangen Sie schriftlichen Vertrag, Arbeitszeitnachweis und Lohnabrechnung.",
      },
      {
        uz: "Bir nechta Minijob mavjud bo‘lsa, ularning daromadi birgalikda hisoblanishi mumkinligini tekshiring.",
        de: "Prüfen Sie bei mehreren Minijobs, ob die Einkommen zusammengerechnet werden.",
      },
      {
        uz: "Talaba bo‘lsangiz, ish vaqti talabalik maqomingizga ta’sir qilmasligini aniqlang.",
        de: "Klären Sie als Student, ob die Arbeitszeit Ihren Studierendenstatus beeinflusst.",
      },
    ],
    importantNotes: [
      {
        uz: "Minijob ham mehnat munosabati hisoblanadi va xodimning asosiy mehnat huquqlari mavjud.",
        de: "Auch ein Minijob ist ein Arbeitsverhältnis mit grundlegenden Arbeitnehmerrechten.",
      },
      {
        uz: "Minijob xodimlari ham qonuniy minimal ish haqi va haq to‘lanadigan ta’til huquqiga ega.",
        de: "Minijobber haben Anspruch auf Mindestlohn und bezahlten Urlaub.",
      },
      {
        uz: "Naqd pul bilan norasmiy ishlash soliqqa, sug‘urtaga va yashash maqomiga oid muammolar tug‘dirishi mumkin.",
        de: "Nicht angemeldete Bararbeit kann steuerliche, versicherungsrechtliche und aufenthaltsrechtliche Probleme verursachen.",
      },
      {
        uz: "Daromad chegarasi qonuniy minimal ish haqiga bog‘liq holda kelajakda o‘zgarishi mumkin.",
        de: "Die Verdienstgrenze kann sich mit dem gesetzlichen Mindestlohn künftig ändern.",
      },
    ],
    officialSourceName: "Minijob-Zentrale",
    officialSourceUrl:
      "https://www.minijob-zentrale.de/EN/Home",
    sourceDescription: {
      uz: "Minijob-Zentrale Germaniyadagi Minijob daromad chegarasi, mehnat huquqlari, sug‘urta va ish beruvchining majburiyatlari bo‘yicha rasmiy ma’lumot beradi.",
      de: "Die Minijob-Zentrale informiert offiziell über Verdienstgrenzen, Arbeitsrechte, Versicherungen und Pflichten von Arbeitgebern.",
    },
    verifiedAt: "2026-07-30",
  },
  {
    id: 4,
    slug: "werkstudent-praktikum-va-student-assistant",
    title: {
      uz: "Werkstudent, Praktikum va student-assistant ishlarini topish",
      de: "Werkstudentenstellen, Praktika und studentische Hilfstätigkeiten finden",
    },
    shortTitle: {
      uz: "Werkstudent va amaliyot",
      de: "Werkstudent und Praktikum",
    },
    description: {
      uz: "O‘qish yo‘nalishiga mos tajriba orttirish uchun Werkstudent, Praktikum, studentische Hilfskraft va ilmiy yordamchi lavozimlarini qidirish bo‘yicha yo‘riqnoma.",
      de: "Leitfaden zur Suche nach Werkstudentenstellen, Praktika sowie studentischen und wissenschaftlichen Hilfstätigkeiten.",
    },
    category: "internship",
    icon: "💼",
    audience: {
      uz: "O‘qish davomida professional tajriba va kelajakdagi karyera uchun imkoniyat izlayotgan talabalar",
      de: "Studierende, die während des Studiums Berufserfahrung sammeln möchten",
    },
    highlights: [
      {
        uz: "O‘qish yo‘nalishiga mos tajriba",
        de: "Berufserfahrung passend zum Studienfach",
      },
      {
        uz: "Universitet va kompaniya vakansiyalari",
        de: "Stellen an Hochschulen und in Unternehmen",
      },
      {
        uz: "Majburiy hamda ixtiyoriy amaliyot farqi",
        de: "Unterschied zwischen Pflicht- und freiwilligem Praktikum",
      },
      {
        uz: "Bitiruvdan keyingi ishga tayyorgarlik",
        de: "Vorbereitung auf den Berufseinstieg",
      },
    ],
    searchKeywords: [
      "Werkstudent",
      "Praktikum",
      "Pflichtpraktikum",
      "Studentische Hilfskraft",
      "Wissenschaftliche Hilfskraft",
      "Working Student",
      "Internship",
    ],
    steps: [
      {
        uz: "Universitetingiz Career Center va fakultet e’lonlarini muntazam tekshiring.",
        de: "Prüfen Sie regelmäßig Career Center und Fakultätsausschreibungen Ihrer Hochschule.",
      },
      {
        uz: "O‘qish yo‘nalishingizga mos kasb nomlarini nemischa va inglizcha shaklda qidiring.",
        de: "Suchen Sie nach passenden Berufsbezeichnungen auf Deutsch und Englisch.",
      },
      {
        uz: "Majburiy amaliyot bo‘lsa, universitetdan Pflichtpraktikum tasdiqnomasini oling.",
        de: "Besorgen Sie bei einem Pflichtpraktikum eine Bestätigung der Hochschule.",
      },
      {
        uz: "CV, baholar ro‘yxati, Immatrikulationsbescheinigung va kerakli portfolio yoki GitHub havolasini tayyorlang.",
        de: "Bereiten Sie Lebenslauf, Notenübersicht, Immatrikulationsbescheinigung und gegebenenfalls Portfolio oder GitHub-Link vor.",
      },
      {
        uz: "Shartnomada ish vazifalari, mentor, ish vaqti, maosh va amaliyot muddati ko‘rsatilganini tekshiring.",
        de: "Prüfen Sie, ob Aufgaben, Betreuung, Arbeitszeit, Vergütung und Dauer im Vertrag stehen.",
      },
      {
        uz: "Amaliyotning ishlash kunlari hisobiga kirishi yoki kirmasligini individual holatingiz bo‘yicha aniqlashtiring.",
        de: "Klären Sie individuell, ob das Praktikum auf erlaubte Arbeitstage angerechnet wird.",
      },
    ],
    importantNotes: [
      {
        uz: "Majburiy va ixtiyoriy amaliyot uchun migratsiya hamda minimal ish haqi qoidalari farq qilishi mumkin.",
        de: "Für Pflicht- und freiwillige Praktika können unterschiedliche Aufenthalts- und Mindestlohnregeln gelten.",
      },
      {
        uz: "Bepul amaliyotga rozi bo‘lishdan oldin uning qonuniy asosini tekshiring.",
        de: "Prüfen Sie vor einem unbezahlten Praktikum die rechtliche Grundlage.",
      },
      {
        uz: "Werkstudent maqomi avtomatik ravishda migratsiya cheklovlarini bekor qilmaydi.",
        de: "Der Werkstudentenstatus hebt aufenthaltsrechtliche Beschränkungen nicht automatisch auf.",
      },
      {
        uz: "Universitetdagi student-assistant lavozimlari uchun alohida hisoblash qoidalari bo‘lishi mumkin.",
        de: "Für studentische Hilfstätigkeiten an Hochschulen können besondere Anrechnungsregeln gelten.",
      },
    ],
    officialSourceName:
      "Bundesagentur für Arbeit — Internships and holiday jobs",
    officialSourceUrl:
      "https://www.arbeitsagentur.de/en/working-in-germany/internships-holiday-jobs-for-students",
    sourceDescription: {
      uz: "Federal Employment Agency xalqaro talabalar uchun amaliyot va ta’til davridagi ish imkoniyatlari haqida rasmiy ma’lumot beradi.",
      de: "Die Bundesagentur für Arbeit informiert offiziell über Praktika und Ferienjobs für internationale Studierende.",
    },
    verifiedAt: "2026-07-30",
  },
  {
    id: 5,
    slug: "it-va-malakali-mutaxassislar-uchun-ish",
    title: {
      uz: "IT va malakali mutaxassislar uchun Germaniyada ish qidirish",
      de: "Jobsuche in Deutschland für IT- und andere Fachkräfte",
    },
    shortTitle: {
      uz: "IT va mutaxassislar",
      de: "IT und Fachkräfte",
    },
    description: {
      uz: "Dasturchi, data mutaxassisi, muhandis va boshqa malakali kadrlar uchun rasmiy vakansiyalarni topish, malakani tekshirish va ariza berish bo‘yicha yo‘riqnoma.",
      de: "Leitfaden zur Suche nach offiziellen Stellenangeboten, zur Anerkennung von Qualifikationen und zur Bewerbung für IT-, Daten- und Ingenieurberufe.",
    },
    category: "professionals",
    icon: "⌘",
    audience: {
      uz: "IT, muhandislik, texnika, sog‘liqni saqlash va boshqa professional yo‘nalishdagi nomzodlar",
      de: "Bewerber aus IT, Ingenieurwesen, Technik, Gesundheitswesen und weiteren Fachbereichen",
    },
    highlights: [
      {
        uz: "Rasmiy ish qidiruv platformalari",
        de: "Offizielle Plattformen für die Jobsuche",
      },
      {
        uz: "IT va texnik kasblar",
        de: "IT- und technische Berufe",
      },
      {
        uz: "Diplom va malakani tan olish",
        de: "Anerkennung von Abschluss und Qualifikation",
      },
      {
        uz: "Viza va yashash ruxsati talablarini tekshirish",
        de: "Visa- und Aufenthaltserfordernisse prüfen",
      },
    ],
    searchKeywords: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Data Analyst",
      "Data Engineer",
      "DevOps Engineer",
      "Cyber Security",
      "Elektroingenieur",
      "Mechanical Engineer",
    ],
    steps: [
      {
        uz: "Kasbingiz Germaniyada tartibga solinadigan kasb ekanini tekshiring.",
        de: "Prüfen Sie, ob Ihr Beruf in Deutschland reglementiert ist.",
      },
      {
        uz: "Make it in Germany va Bundesagentur für Arbeit Jobsuche platformalarida vakansiyalarni qidiring.",
        de: "Suchen Sie bei Make it in Germany und in der Jobsuche der Bundesagentur für Arbeit.",
      },
      {
        uz: "Diplom yoki kasbiy malakani tan olish zarur bo‘lsa, Recognition in Germany portalidan foydalaning.",
        de: "Nutzen Sie Recognition in Germany, falls eine Anerkennung erforderlich ist.",
      },
      {
        uz: "CVni aniq, ikki sahifadan oshmaydigan va vakansiyaga mos shaklda tayyorlang.",
        de: "Erstellen Sie einen klaren, stellenbezogenen Lebenslauf mit höchstens zwei Seiten.",
      },
      {
        uz: "Texnik yo‘nalishda portfolio, GitHub, loyiha tavsifi yoki sertifikatlarni qo‘shing.",
        de: "Ergänzen Sie in technischen Berufen Portfolio, GitHub, Projektbeschreibungen oder Zertifikate.",
      },
      {
        uz: "Arizadan oldin ish beruvchining rasmiy sayti, kompaniya manzili va vakansiya ma’lumotlarini tekshiring.",
        de: "Prüfen Sie vor der Bewerbung offizielle Website, Firmenanschrift und Stellenangaben.",
      },
    ],
    importantNotes: [
      {
        uz: "IT sohasida ingliz tili bilan ish topish mumkin, ammo barcha vakansiyalar uchun bu yetarli emas.",
        de: "In der IT sind englischsprachige Jobs möglich, aber Englisch reicht nicht für jede Stelle aus.",
      },
      {
        uz: "Tartibga solinadigan kasblarda rasmiy tan olish yoki kasbiy ruxsat talab qilinishi mumkin.",
        de: "In reglementierten Berufen können Anerkennung oder Berufserlaubnis erforderlich sein.",
      },
      {
        uz: "Ish taklifi viza yoki yashash ruxsatining avtomatik tasdiqlanishini anglatmaydi.",
        de: "Ein Jobangebot führt nicht automatisch zu Visum oder Aufenthaltserlaubnis.",
      },
      {
        uz: "Ishga joylashtirish uchun oldindan katta pul talab qiladigan vositachilarga ehtiyot bo‘ling.",
        de: "Seien Sie vorsichtig bei Vermittlern, die hohe Vorauszahlungen verlangen.",
      },
    ],
    officialSourceName:
      "Make it in Germany — Job listings",
    officialSourceUrl:
      "https://www.make-it-in-germany.com/en/working-in-germany/job-listings",
    sourceDescription: {
      uz: "Germaniya federal hukumatining rasmiy portalida xorijiy mutaxassislar uchun vakansiyalar va kasblar bo‘yicha ma’lumotlar mavjud.",
      de: "Das offizielle Portal der Bundesregierung bietet Stellenangebote und Berufsinformationen für internationale Fachkräfte.",
    },
    verifiedAt: "2026-07-30",
  },
  {
    id: 6,
    slug: "ish-elonidagi-firibgarlikdan-himoyalanish",
    title: {
      uz: "Soxta ish e’lonlari va firibgarlikdan himoyalanish",
      de: "Schutz vor gefälschten Stellenanzeigen und Betrug",
    },
    shortTitle: {
      uz: "Xavfsiz ish qidirish",
      de: "Sichere Jobsuche",
    },
    description: {
      uz: "Ish e’lonini tekshirish, shaxsiy hujjatlarni xavfsiz yuborish, vositachilik to‘lovlari va soxta shartnomalarni aniqlash bo‘yicha amaliy qo‘llanma.",
      de: "Praktischer Leitfaden zur Prüfung von Stellenanzeigen, zum sicheren Versand persönlicher Dokumente und zum Erkennen betrügerischer Angebote.",
    },
    category: "safety",
    icon: "✓",
    audience: {
      uz: "Germaniyada ish, amaliyot, Minijob yoki Ausbildung izlayotgan barcha foydalanuvchilar",
      de: "Alle Personen, die in Deutschland Arbeit, Praktikum, Minijob oder Ausbildung suchen",
    },
    highlights: [
      {
        uz: "Kompaniya va vakansiyani tekshirish",
        de: "Unternehmen und Stellenanzeige prüfen",
      },
      {
        uz: "Shaxsiy ma’lumotlarni himoyalash",
        de: "Persönliche Daten schützen",
      },
      {
        uz: "Oldindan pul talab qiluvchi takliflarni aniqlash",
        de: "Angebote mit Vorauszahlungen erkennen",
      },
      {
        uz: "Yozma shartnomani tekshirish",
        de: "Schriftlichen Vertrag prüfen",
      },
    ],
    searchKeywords: [
      "Bundesagentur für Arbeit Jobsuche",
      "Make it in Germany jobs",
      "EURES jobs Germany",
      "company Impressum",
      "Handelsregister company search",
    ],
    steps: [
      {
        uz: "Vakansiyani kompaniyaning rasmiy saytidan ham topish mumkinligini tekshiring.",
        de: "Prüfen Sie, ob die Stelle auch auf der offiziellen Unternehmenswebsite veröffentlicht ist.",
      },
      {
        uz: "Kompaniya saytida Impressum, manzil, telefon va mas’ul shaxs ma’lumotlarini ko‘ring.",
        de: "Prüfen Sie Impressum, Anschrift, Telefon und verantwortliche Person.",
      },
      {
        uz: "Faqat messenjer orqali suhbat o‘tkazadigan yoki anonim elektron pochta ishlatadigan shaxslarga ehtiyot bo‘ling.",
        de: "Seien Sie vorsichtig bei ausschließlich über Messenger geführten Gesprächen oder anonymen E-Mail-Adressen.",
      },
      {
        uz: "Pasport, Aufenthaltstitel, bank va soliq ma’lumotlarini faqat zarur bosqichda hamda ishonchli kanal orqali yuboring.",
        de: "Senden Sie Pass-, Aufenthalts-, Bank- und Steuerdaten nur wenn erforderlich und über sichere Kanäle.",
      },
      {
        uz: "Ishga qabul qilish, viza yoki shartnoma uchun oldindan pul yubormang.",
        de: "Zahlen Sie nicht im Voraus für Einstellung, Visum oder Vertrag.",
      },
      {
        uz: "Ish boshlashdan oldin ish vazifasi, brutto maosh, ish vaqti, ta’til va sinov muddati yozilgan shartnomani oling.",
        de: "Verlangen Sie vor Arbeitsbeginn einen Vertrag mit Aufgaben, Bruttolohn, Arbeitszeit, Urlaub und Probezeit.",
      },
    ],
    importantNotes: [
      {
        uz: "Haqiqiy ish beruvchi odatda oddiy suhbatdan oldin bank paroli yoki karta PIN-kodini so‘ramaydi.",
        de: "Seriöse Arbeitgeber verlangen vor einem normalen Gespräch keine Bankpasswörter oder Karten-PIN.",
      },
      {
        uz: "Pul o‘tkazish, paket qabul qilish yoki o‘z bank hisobingizdan foydalanishni talab qiladigan ishlar xavfli bo‘lishi mumkin.",
        de: "Jobs mit Geldtransfers, Paketannahme oder Nutzung des eigenen Bankkontos können gefährlich sein.",
      },
      {
        uz: "Juda yuqori maosh va juda kam talab va’da qiladigan e’lonlarni sinchiklab tekshiring.",
        de: "Prüfen Sie Anzeigen mit ungewöhnlich hohem Lohn und sehr geringen Anforderungen besonders sorgfältig.",
      },
      {
        uz: "Shubhali holatda Bundesagentur für Arbeit yoki maslahat markaziga murojaat qiling.",
        de: "Wenden Sie sich bei Zweifeln an die Bundesagentur für Arbeit oder eine Beratungsstelle.",
      },
    ],
    officialSourceName:
      "Bundesagentur für Arbeit — How to find a job",
    officialSourceUrl:
      "https://www.arbeitsagentur.de/en/working-in-germany/how-to-find-a-job",
    sourceDescription: {
      uz: "Federal Employment Agency ishonchli ish qidirish manbalari va Germaniyada ishga ariza berish jarayoni haqida rasmiy yo‘riqnomalar beradi.",
      de: "Die Bundesagentur für Arbeit gibt offizielle Hinweise zu verlässlichen Quellen und zum Bewerbungsprozess in Deutschland.",
    },
    verifiedAt: "2026-07-30",
  },
];

export function localizeJobGuide(
  guide: LocalizedJobGuide,
  locale: SupportedJobLocale,
): JobGuide {
  return {
    ...guide,
    title: guide.title[locale],
    shortTitle: guide.shortTitle[locale],
    description: guide.description[locale],
    category: categoryLabels[locale][guide.category],
    audience: guide.audience[locale],
    highlights: guide.highlights.map((item) => item[locale]),
    steps: guide.steps.map((item) => item[locale]),
    importantNotes: guide.importantNotes.map(
      (item) => item[locale],
    ),
    sourceDescription: guide.sourceDescription[locale],
  };
}

export function getJobGuides(
  locale: SupportedJobLocale,
): ReadonlyArray<JobGuide> {
  return localizedJobGuides.map((guide) =>
    localizeJobGuide(guide, locale),
  );
}

export function getJobGuideBySlug(
  slug: string,
  locale: SupportedJobLocale,
): JobGuide | undefined {
  const guide = localizedJobGuides.find(
    (item) => item.slug === slug,
  );

  return guide ? localizeJobGuide(guide, locale) : undefined;
}

export function getFeaturedJobGuide(
  locale: SupportedJobLocale,
): JobGuide | undefined {
  const guide = localizedJobGuides.find(
    (item) => item.featured,
  );

  return guide ? localizeJobGuide(guide, locale) : undefined;
}

export function formatJobDate(
  date: string,
  locale: SupportedJobLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz" ? "uz-UZ" : "de-DE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(`${date}T12:00:00`));
}
