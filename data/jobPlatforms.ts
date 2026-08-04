export type SupportedJobPlatformLocale = "uz" | "de";

export type LocalizedText = Readonly<
  Record<SupportedJobPlatformLocale, string>
>;

export type PlatformTypeKey =
  | "official-government"
  | "official-european"
  | "private-job-platform"
  | "professional-network"
  | "specialized-platform";

export type ProfessionKey =
  | "all-fields"
  | "it-technology"
  | "engineering"
  | "healthcare"
  | "logistics-production"
  | "sales-services"
  | "office-management"
  | "students"
  | "ausbildung";

export type PlatformLanguageKey =
  | "german"
  | "english"
  | "german-english";

export type EmploymentType =
  | "Vollzeit"
  | "Teilzeit"
  | "Minijob"
  | "Werkstudent"
  | "Praktikum"
  | "Ausbildung"
  | "Remote";

type LocalizedJobPlatform = Readonly<{
  id: number;
  name: string;
  slug: string;
  description: LocalizedText;
  platformType: PlatformTypeKey;
  official: boolean;
  websiteUrl: string;
  languages: ReadonlyArray<PlatformLanguageKey>;
  professions: ReadonlyArray<ProfessionKey>;
  employmentTypes: ReadonlyArray<EmploymentType>;
  suitableFor: ReadonlyArray<LocalizedText>;
  searchExamples: ReadonlyArray<string>;
  advantages: ReadonlyArray<LocalizedText>;
  limitations: ReadonlyArray<LocalizedText>;
  featured?: boolean;
}>;

export type JobPlatform = Readonly<{
  id: number;
  name: string;
  slug: string;
  description: string;
  platformType: string;
  platformTypeKey: PlatformTypeKey;
  official: boolean;
  websiteUrl: string;
  languages: ReadonlyArray<string>;
  languageKeys: ReadonlyArray<PlatformLanguageKey>;
  professions: ReadonlyArray<string>;
  professionKeys: ReadonlyArray<ProfessionKey>;
  employmentTypes: ReadonlyArray<EmploymentType>;
  suitableFor: ReadonlyArray<string>;
  searchExamples: ReadonlyArray<string>;
  advantages: ReadonlyArray<string>;
  limitations: ReadonlyArray<string>;
  featured?: boolean;
}>;

export type LocalizedFilterOption<T extends string> = Readonly<{
  value: T;
  label: string;
}>;

const platformTypeLabels: Readonly<
  Record<
    SupportedJobPlatformLocale,
    Record<PlatformTypeKey, string>
  >
> = {
  uz: {
    "official-government": "Rasmiy davlat portali",
    "official-european": "Yevropa rasmiy portali",
    "private-job-platform": "Xususiy ish platformasi",
    "professional-network": "Professional tarmoq",
    "specialized-platform": "Maxsus platforma",
  },
  de: {
    "official-government": "Offizielles staatliches Portal",
    "official-european": "Offizielles europäisches Portal",
    "private-job-platform": "Private Jobplattform",
    "professional-network": "Berufliches Netzwerk",
    "specialized-platform": "Spezialisierte Plattform",
  },
};

const professionLabels: Readonly<
  Record<
    SupportedJobPlatformLocale,
    Record<ProfessionKey, string>
  >
> = {
  uz: {
    "all-fields": "Barcha sohalar",
    "it-technology": "IT va texnologiya",
    engineering: "Muhandislik",
    healthcare: "Tibbiyot va parvarish",
    "logistics-production": "Logistika va ishlab chiqarish",
    "sales-services": "Savdo va xizmat ko‘rsatish",
    "office-management": "Ofis va boshqaruv",
    students: "Talabalar",
    ausbildung: "Ausbildung",
  },
  de: {
    "all-fields": "Alle Berufsfelder",
    "it-technology": "IT und Technologie",
    engineering: "Ingenieurwesen",
    healthcare: "Gesundheit und Pflege",
    "logistics-production": "Logistik und Produktion",
    "sales-services": "Verkauf und Dienstleistungen",
    "office-management": "Büro und Verwaltung",
    students: "Studierende",
    ausbildung: "Ausbildung",
  },
};

const languageLabels: Readonly<
  Record<
    SupportedJobPlatformLocale,
    Record<PlatformLanguageKey, string>
  >
> = {
  uz: {
    german: "Nemis tili",
    english: "Ingliz tili",
    "german-english": "Nemis va ingliz",
  },
  de: {
    german: "Deutsch",
    english: "Englisch",
    "german-english": "Deutsch und Englisch",
  },
};

const localizedJobPlatforms: ReadonlyArray<LocalizedJobPlatform> = [
  {
    id: 1,
    name: "Bundesagentur für Arbeit Jobsuche",
    slug: "bundesagentur-fuer-arbeit",
    description: {
      uz: "Germaniya Federal bandlik agentligining rasmiy ish qidiruv portali. Turli kasblar, Ausbildung, Vollzeit, Teilzeit, Minijob va talabalar ishlarini qidirish mumkin.",
      de: "Das offizielle Stellenportal der Bundesagentur für Arbeit. Es bietet Stellen in vielen Berufen sowie Ausbildung, Vollzeit, Teilzeit, Minijob und Beschäftigungen für Studierende.",
    },
    platformType: "official-government",
    official: true,
    websiteUrl: "https://www.arbeitsagentur.de/jobsuche/",
    languages: ["german"],
    professions: [
      "all-fields",
      "it-technology",
      "engineering",
      "healthcare",
      "logistics-production",
      "sales-services",
      "office-management",
      "students",
      "ausbildung",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Minijob",
      "Werkstudent",
      "Praktikum",
      "Ausbildung",
      "Remote",
    ],
    suitableFor: [
      {
        uz: "Germaniyada yashayotgan ish izlovchilar",
        de: "Arbeitssuchende mit Wohnsitz in Deutschland",
      },
      {
        uz: "Talabalar va bitiruvchilar",
        de: "Studierende und Absolventen",
      },
      {
        uz: "Ausbildung izlayotganlar",
        de: "Ausbildungssuchende",
      },
      {
        uz: "Malakali va malakasiz ish qidiruvchilar",
        de: "Qualifizierte und ungelernte Arbeitssuchende",
      },
    ],
    searchExamples: [
      "Softwareentwickler Berlin",
      "Lagerhelfer Köln",
      "Werkstudent Informatik",
      "Pflegefachkraft Hamburg",
      "Ausbildung Elektroniker",
    ],
    advantages: [
      {
        uz: "Germaniya davlatining rasmiy portali",
        de: "Offizielles Portal des deutschen Staates",
      },
      {
        uz: "Ko‘plab kasb va ish turlarini qamrab oladi",
        de: "Deckt zahlreiche Berufe und Beschäftigungsformen ab",
      },
      {
        uz: "Shahar va radius bo‘yicha qidiruv mavjud",
        de: "Suche nach Ort und Umkreis verfügbar",
      },
      {
        uz: "Ausbildung va amaliyot e’lonlari ham mavjud",
        de: "Enthält auch Ausbildungs- und Praktikumsstellen",
      },
    ],
    limitations: [
      {
        uz: "Asosiy interfeys va e’lonlarning katta qismi nemis tilida",
        de: "Oberfläche und die meisten Anzeigen sind auf Deutsch",
      },
      {
        uz: "Har bir e’lonning ishonchliligini baribir alohida tekshirish kerak",
        de: "Jede einzelne Anzeige sollte dennoch separat geprüft werden",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Make it in Germany",
    slug: "make-it-in-germany",
    description: {
      uz: "Xorijiy mutaxassislar uchun Germaniya federal hukumatining rasmiy portali. Ish e’lonlari bilan birga viza, malakani tan olish va Germaniyada yashash bo‘yicha ma’lumot beradi.",
      de: "Das offizielle Portal der Bundesregierung für internationale Fachkräfte. Neben Stellenangeboten bietet es Informationen zu Visum, Anerkennung und Leben in Deutschland.",
    },
    platformType: "official-government",
    official: true,
    websiteUrl:
      "https://www.make-it-in-germany.com/en/working-in-germany/job-listings",
    languages: ["german-english"],
    professions: [
      "all-fields",
      "it-technology",
      "engineering",
      "healthcare",
      "logistics-production",
      "ausbildung",
    ],
    employmentTypes: ["Vollzeit", "Teilzeit", "Ausbildung"],
    suitableFor: [
      {
        uz: "Germaniyadan tashqarida yashayotgan mutaxassislar",
        de: "Fachkräfte mit Wohnsitz außerhalb Deutschlands",
      },
      {
        uz: "Blue Card yoki boshqa ish vizasini ko‘rib chiqayotganlar",
        de: "Personen, die eine Blue Card oder ein anderes Arbeitsvisum prüfen",
      },
      {
        uz: "Kasbiy malakaga ega nomzodlar",
        de: "Bewerber mit beruflicher Qualifikation",
      },
      {
        uz: "Ausbildung izlayotgan xorijiy fuqarolar",
        de: "Internationale Ausbildungssuchende",
      },
    ],
    searchExamples: [
      "IT specialist",
      "Mechanical engineer",
      "Nursing professional",
      "Electrical engineer",
      "Vocational training",
    ],
    advantages: [
      {
        uz: "Xorijiy mutaxassislar uchun mo‘ljallangan",
        de: "Speziell für internationale Fachkräfte",
      },
      {
        uz: "Ingliz tilidagi interfeys mavjud",
        de: "Englischsprachige Oberfläche verfügbar",
      },
      {
        uz: "Viza va yashash huquqi bo‘yicha rasmiy ma’lumotlar mavjud",
        de: "Offizielle Informationen zu Visum und Aufenthalt",
      },
      {
        uz: "Ish bilan birga malakani tan olish jarayoni tushuntiriladi",
        de: "Erklärt zusätzlich das Anerkennungsverfahren",
      },
    ],
    limitations: [
      {
        uz: "Barcha mahalliy va qisqa muddatli ishlar mavjud emas",
        de: "Nicht alle lokalen oder kurzfristigen Stellen sind enthalten",
      },
      {
        uz: "Ko‘proq malakali mutaxassislarga yo‘naltirilgan",
        de: "Vor allem auf qualifizierte Fachkräfte ausgerichtet",
      },
    ],
    featured: true,
  },
  {
    id: 3,
    name: "EURES",
    slug: "eures",
    description: {
      uz: "Yevropa mehnat mobilligi rasmiy portali. Germaniya va boshqa Yevropa mamlakatlaridagi vakansiyalarni qidirish hamda EURES maslahatchilaridan yordam olish mumkin.",
      de: "Das offizielle europäische Portal für berufliche Mobilität. Es ermöglicht die Suche nach Stellen in Deutschland und anderen europäischen Ländern sowie Beratung durch EURES.",
    },
    platformType: "official-european",
    official: true,
    websiteUrl: "https://eures.europa.eu/jobseekers_en",
    languages: ["german-english"],
    professions: [
      "all-fields",
      "it-technology",
      "engineering",
      "healthcare",
      "logistics-production",
      "sales-services",
      "office-management",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Praktikum",
      "Ausbildung",
    ],
    suitableFor: [
      {
        uz: "Yevropada ish qidirayotganlar",
        de: "Arbeitssuchende in Europa",
      },
      {
        uz: "Boshqa Yevropa mamlakatiga ko‘chishni istaganlar",
        de: "Personen, die in ein anderes europäisches Land umziehen möchten",
      },
      {
        uz: "Xalqaro tajribaga ega nomzodlar",
        de: "Bewerber mit internationaler Erfahrung",
      },
      {
        uz: "Ko‘p tilli mutaxassislar",
        de: "Mehrsprachige Fachkräfte",
      },
    ],
    searchExamples: [
      "Software engineer Germany",
      "Nurse Germany",
      "Warehouse worker Germany",
      "English speaking Germany",
    ],
    advantages: [
      {
        uz: "Yevropa Ittifoqining rasmiy xizmati",
        de: "Offizieller Dienst der Europäischen Union",
      },
      {
        uz: "Bir nechta Yevropa davlatlaridagi e’lonlarni qamrab oladi",
        de: "Umfasst Stellenanzeigen aus mehreren europäischen Ländern",
      },
      {
        uz: "Mehnat mobilligi bo‘yicha maslahat xizmatlari mavjud",
        de: "Beratung zur beruflichen Mobilität verfügbar",
      },
      {
        uz: "Ko‘p tilli interfeys mavjud",
        de: "Mehrsprachige Oberfläche",
      },
    ],
    limitations: [
      {
        uz: "Ayrim e’lonlar tashqi ish beruvchi sahifasiga olib boradi",
        de: "Einige Anzeigen führen zu externen Arbeitgeberseiten",
      },
      {
        uz: "Germaniyadagi barcha mahalliy e’lonlarni qamrab olmaydi",
        de: "Deckt nicht alle lokalen Stellen in Deutschland ab",
      },
    ],
  },
  {
    id: 4,
    name: "Stepstone",
    slug: "stepstone",
    description: {
      uz: "Germaniyadagi yirik xususiy ish platformalaridan biri. Professional, texnik, ofis, boshqaruv va boshqa ko‘plab yo‘nalishlarda vakansiyalar mavjud.",
      de: "Eine der größten privaten Jobplattformen in Deutschland. Sie bietet Stellen in professionellen, technischen, administrativen und vielen weiteren Bereichen.",
    },
    platformType: "private-job-platform",
    official: false,
    websiteUrl: "https://www.stepstone.de/",
    languages: ["german"],
    professions: [
      "all-fields",
      "it-technology",
      "engineering",
      "healthcare",
      "logistics-production",
      "sales-services",
      "office-management",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Werkstudent",
      "Praktikum",
      "Remote",
    ],
    suitableFor: [
      {
        uz: "Professional tajribaga ega nomzodlar",
        de: "Bewerber mit Berufserfahrung",
      },
      {
        uz: "Ofis va boshqaruv lavozimlarini izlayotganlar",
        de: "Suchende nach Büro- und Verwaltungsstellen",
      },
      {
        uz: "Muhandis va IT mutaxassislari",
        de: "Ingenieure und IT-Fachkräfte",
      },
      {
        uz: "Nemis tilida ishlay oladiganlar",
        de: "Personen mit guten Deutschkenntnissen",
      },
    ],
    searchExamples: [
      "Frontend Entwickler",
      "Projektmanager",
      "Buchhalter",
      "Elektroingenieur",
      "Werkstudent Marketing",
    ],
    advantages: [
      {
        uz: "Kasb va shahar bo‘yicha keng qidiruv",
        de: "Umfangreiche Suche nach Beruf und Ort",
      },
      {
        uz: "Ish e’lonlari uchun bildirishnoma yaratish mumkin",
        de: "Job-Alerts können eingerichtet werden",
      },
      {
        uz: "Professional lavozimlar ko‘p",
        de: "Große Auswahl an qualifizierten Stellen",
      },
      {
        uz: "Kompaniyalar haqida qo‘shimcha ma’lumotlar mavjud",
        de: "Zusätzliche Unternehmensinformationen verfügbar",
      },
    ],
    limitations: [
      {
        uz: "Ko‘pchilik e’lonlar nemis tilida",
        de: "Die meisten Anzeigen sind auf Deutsch",
      },
      {
        uz: "Ayrim oddiy yoki qisqa muddatli ishlar kamroq bo‘lishi mumkin",
        de: "Einfachere oder kurzfristige Jobs können weniger vertreten sein",
      },
    ],
  },
  {
    id: 5,
    name: "LinkedIn Jobs",
    slug: "linkedin-jobs",
    description: {
      uz: "Professional profil, kompaniyalar va ish e’lonlarini birlashtiruvchi xalqaro platforma. Ayniqsa IT, muhandislik, marketing, moliya va xalqaro kompaniyalar uchun foydali.",
      de: "Eine internationale Plattform, die berufliche Profile, Unternehmen und Stellenangebote verbindet. Besonders nützlich für IT, Ingenieurwesen, Marketing, Finanzen und internationale Unternehmen.",
    },
    platformType: "professional-network",
    official: false,
    websiteUrl: "https://www.linkedin.com/jobs/",
    languages: ["english", "german-english"],
    professions: [
      "it-technology",
      "engineering",
      "office-management",
      "sales-services",
      "students",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Werkstudent",
      "Praktikum",
      "Remote",
    ],
    suitableFor: [
      {
        uz: "IT va texnologiya mutaxassislari",
        de: "IT- und Technologiefachkräfte",
      },
      {
        uz: "Ingliz tilida ish izlayotganlar",
        de: "Personen, die englischsprachige Stellen suchen",
      },
      {
        uz: "Xalqaro kompaniyalarga ariza beruvchilar",
        de: "Bewerber bei internationalen Unternehmen",
      },
      {
        uz: "Professional tarmoq yaratishni istaganlar",
        de: "Personen, die ein berufliches Netzwerk aufbauen möchten",
      },
    ],
    searchExamples: [
      "English speaking software engineer Germany",
      "Working student data analyst",
      "Remote customer success Germany",
      "Internship marketing Berlin",
    ],
    advantages: [
      {
        uz: "Ingliz tilidagi e’lonlar ko‘p uchraydi",
        de: "Viele englischsprachige Stellenanzeigen",
      },
      {
        uz: "Professional profil orqali ish beruvchilarga ko‘rinish mumkin",
        de: "Sichtbarkeit bei Arbeitgebern durch ein berufliches Profil",
      },
      {
        uz: "Kompaniya xodimlari va recruiterlar bilan bog‘lanish mumkin",
        de: "Direkter Kontakt zu Mitarbeitern und Recruitern möglich",
      },
      {
        uz: "Remote va xalqaro ishlar mavjud",
        de: "Remote- und internationale Stellen verfügbar",
      },
    ],
    limitations: [
      {
        uz: "Yaxshi natija uchun to‘liq profil talab qilinadi",
        de: "Ein vollständiges Profil ist für gute Ergebnisse wichtig",
      },
      {
        uz: "Barcha e’lonlar platformaning o‘zida ariza qabul qilmaydi",
        de: "Nicht alle Bewerbungen werden direkt auf der Plattform angenommen",
      },
      {
        uz: "Har bir recruiter va kompaniyani alohida tekshirish kerak",
        de: "Recruiter und Unternehmen sollten einzeln geprüft werden",
      },
    ],
  },
  {
    id: 6,
    name: "XING Jobs",
    slug: "xing-jobs",
    description: {
      uz: "Nemis tilida so‘zlashuvchi mehnat bozoriga yo‘naltirilgan professional tarmoq va ish platformasi. Germaniya, Avstriya va Shveytsariyada keng qo‘llanadi.",
      de: "Ein berufliches Netzwerk und Stellenportal für den deutschsprachigen Arbeitsmarkt. Es wird in Deutschland, Österreich und der Schweiz breit genutzt.",
    },
    platformType: "professional-network",
    official: false,
    websiteUrl: "https://www.xing.com/jobs",
    languages: ["german"],
    professions: [
      "all-fields",
      "it-technology",
      "engineering",
      "logistics-production",
      "sales-services",
      "office-management",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Minijob",
      "Werkstudent",
      "Remote",
    ],
    suitableFor: [
      {
        uz: "Nemis tilida ish izlayotgan mutaxassislar",
        de: "Fachkräfte auf dem deutschsprachigen Arbeitsmarkt",
      },
      {
        uz: "Germaniyadagi professional kompaniyalar",
        de: "Bewerber bei professionellen Unternehmen in Deutschland",
      },
      {
        uz: "Recruiterlar bilan aloqa o‘rnatishni istaganlar",
        de: "Personen, die Kontakt zu Recruitern aufbauen möchten",
      },
      {
        uz: "Karyera o‘zgartirayotgan nomzodlar",
        de: "Bewerber in beruflicher Neuorientierung",
      },
    ],
    searchExamples: [
      "Data Analyst",
      "Projektmanager",
      "Logistik",
      "Werkstudent",
      "Quereinsteiger",
    ],
    advantages: [
      {
        uz: "Germaniya mehnat bozoriga kuchli yo‘naltirilgan",
        de: "Starke Ausrichtung auf den deutschen Arbeitsmarkt",
      },
      {
        uz: "Professional profil yaratish mumkin",
        de: "Berufliches Profil kann erstellt werden",
      },
      {
        uz: "Recruiterlar nomzodlarni bevosita topishi mumkin",
        de: "Recruiter können Kandidaten direkt finden",
      },
      {
        uz: "Turli ish shakllari bo‘yicha filtrlar mavjud",
        de: "Filter für verschiedene Beschäftigungsformen",
      },
    ],
    limitations: [
      {
        uz: "Asosan nemis tilidagi bozor uchun",
        de: "Vor allem für den deutschsprachigen Markt",
      },
      {
        uz: "Profilni muntazam yangilab turish kerak",
        de: "Das Profil sollte regelmäßig aktualisiert werden",
      },
    ],
  },
  {
    id: 7,
    name: "Jobmensa",
    slug: "jobmensa",
    description: {
      uz: "Talabalar uchun Nebenjob, Werkstudent, Minijob, qisqa muddatli ish va amaliyotlarni qidirishga ixtisoslashgan platforma.",
      de: "Eine Plattform für Studierende, spezialisiert auf Nebenjobs, Werkstudentenstellen, Minijobs, kurzfristige Beschäftigung und Praktika.",
    },
    platformType: "specialized-platform",
    official: false,
    websiteUrl: "https://www.jobmensa.de/",
    languages: ["german"],
    professions: [
      "students",
      "sales-services",
      "logistics-production",
      "office-management",
      "it-technology",
    ],
    employmentTypes: [
      "Teilzeit",
      "Minijob",
      "Werkstudent",
      "Praktikum",
    ],
    suitableFor: [
      {
        uz: "Universitet talabalari",
        de: "Hochschulstudierende",
      },
      {
        uz: "Werkstudent lavozimini izlayotganlar",
        de: "Suchende nach Werkstudentenstellen",
      },
      {
        uz: "Semestr davomida qo‘shimcha ishlashni istaganlar",
        de: "Studierende, die während des Semesters arbeiten möchten",
      },
      {
        uz: "Moslashuvchan ish vaqti izlayotganlar",
        de: "Personen, die flexible Arbeitszeiten suchen",
      },
    ],
    searchExamples: [
      "Werkstudent Informatik",
      "Studentenjob Berlin",
      "Servicekraft Student",
      "Bürohilfe Werkstudent",
      "Lager Student",
    ],
    advantages: [
      {
        uz: "Talabalarga maxsus yo‘naltirilgan",
        de: "Speziell auf Studierende ausgerichtet",
      },
      {
        uz: "Nebenjob va Werkstudent e’lonlari mavjud",
        de: "Nebenjobs und Werkstudentenstellen verfügbar",
      },
      {
        uz: "Turli shaharlardagi talabalar ishlari mavjud",
        de: "Studentenjobs in verschiedenen Städten",
      },
      {
        uz: "Ba’zi ishlar uchun ariza jarayoni soddalashtirilgan",
        de: "Teilweise vereinfachter Bewerbungsprozess",
      },
    ],
    limitations: [
      {
        uz: "Ko‘pchilik e’lonlar nemis tilini talab qiladi",
        de: "Viele Stellen setzen Deutschkenntnisse voraus",
      },
      {
        uz: "Vakansiyalar soni shahar va davrga qarab farq qiladi",
        de: "Das Angebot variiert nach Stadt und Zeitraum",
      },
    ],
  },
  {
    id: 8,
    name: "Ausbildung.de",
    slug: "ausbildung-de",
    description: {
      uz: "Ausbildung, duales Studium va Schülerpraktikum izlayotganlar uchun maxsus platforma. Kasblar, maoshlar va ariza jarayoni haqida ma’lumot beradi.",
      de: "Eine spezialisierte Plattform für Ausbildung, duales Studium und Schülerpraktikum. Sie informiert über Berufe, Vergütung und Bewerbungsabläufe.",
    },
    platformType: "specialized-platform",
    official: false,
    websiteUrl: "https://www.ausbildung.de/",
    languages: ["german"],
    professions: [
      "ausbildung",
      "it-technology",
      "engineering",
      "healthcare",
      "logistics-production",
      "sales-services",
      "office-management",
    ],
    employmentTypes: ["Ausbildung", "Praktikum"],
    suitableFor: [
      {
        uz: "Ausbildung boshlashni istaganlar",
        de: "Personen, die eine Ausbildung beginnen möchten",
      },
      {
        uz: "Maktab bitiruvchilari",
        de: "Schulabgänger",
      },
      {
        uz: "Kasbini almashtirmoqchi bo‘lganlar",
        de: "Personen in beruflicher Neuorientierung",
      },
      {
        uz: "Duales Studium izlayotganlar",
        de: "Suchende nach einem dualen Studium",
      },
    ],
    searchExamples: [
      "Ausbildung Fachinformatiker",
      "Ausbildung Pflegefachkraft",
      "Ausbildung Elektroniker",
      "Ausbildung Verkäufer",
      "Duales Studium Informatik",
    ],
    advantages: [
      {
        uz: "Ausbildung yo‘nalishlariga ixtisoslashgan",
        de: "Auf Ausbildungsberufe spezialisiert",
      },
      {
        uz: "Kasblar haqida tushuntiruvchi sahifalar mavjud",
        de: "Erklärende Seiten zu Ausbildungsberufen",
      },
      {
        uz: "Ausbildung maoshi va talablar haqida ma’lumot beradi",
        de: "Informationen zu Ausbildungsvergütung und Voraussetzungen",
      },
      {
        uz: "Duales Studium va amaliyotlar ham mavjud",
        de: "Auch duales Studium und Praktika verfügbar",
      },
    ],
    limitations: [
      {
        uz: "Asosiy til nemis tili",
        de: "Die Hauptsprache ist Deutsch",
      },
      {
        uz: "Xususiy platforma bo‘lgani uchun rasmiy migratsiya manbasi hisoblanmaydi",
        de: "Als private Plattform keine offizielle Migrationsquelle",
      },
      {
        uz: "Viza talablarini alohida rasmiy manbadan tekshirish kerak",
        de: "Visavoraussetzungen müssen über offizielle Quellen geprüft werden",
      },
    ],
  },
];

function localizeTextList(
  items: ReadonlyArray<LocalizedText>,
  locale: SupportedJobPlatformLocale,
): ReadonlyArray<string> {
  return items.map((item) => item[locale]);
}

export function getJobPlatforms(
  locale: SupportedJobPlatformLocale,
): ReadonlyArray<JobPlatform> {
  return localizedJobPlatforms.map((platform) => ({
    ...platform,
    description: platform.description[locale],
    platformType:
      platformTypeLabels[locale][platform.platformType],
    platformTypeKey: platform.platformType,
    languages: platform.languages.map(
      (language) => languageLabels[locale][language],
    ),
    languageKeys: platform.languages,
    professions: platform.professions.map(
      (profession) => professionLabels[locale][profession],
    ),
    professionKeys: platform.professions,
    suitableFor: localizeTextList(
      platform.suitableFor,
      locale,
    ),
    advantages: localizeTextList(
      platform.advantages,
      locale,
    ),
    limitations: localizeTextList(
      platform.limitations,
      locale,
    ),
  }));
}

export function getProfessionOptions(
  locale: SupportedJobPlatformLocale,
): ReadonlyArray<
  LocalizedFilterOption<"all" | ProfessionKey>
> {
  return [
    {
      value: "all",
      label: locale === "uz" ? "Barchasi" : "Alle",
    },
    ...(
      Object.keys(
        professionLabels[locale],
      ) as ProfessionKey[]
    ).map((value) => ({
      value,
      label: professionLabels[locale][value],
    })),
  ];
}

export function getLanguageOptions(
  locale: SupportedJobPlatformLocale,
): ReadonlyArray<
  LocalizedFilterOption<"all" | PlatformLanguageKey>
> {
  return [
    {
      value: "all",
      label: locale === "uz" ? "Barchasi" : "Alle",
    },
    ...(
      Object.keys(
        languageLabels[locale],
      ) as PlatformLanguageKey[]
    ).map((value) => ({
      value,
      label: languageLabels[locale][value],
    })),
  ];
}

export function getEmploymentTypeOptions(
  locale: SupportedJobPlatformLocale,
): ReadonlyArray<
  LocalizedFilterOption<"all" | EmploymentType>
> {
  const values: ReadonlyArray<EmploymentType> = [
    "Vollzeit",
    "Teilzeit",
    "Minijob",
    "Werkstudent",
    "Praktikum",
    "Ausbildung",
    "Remote",
  ];

  return [
    {
      value: "all",
      label: locale === "uz" ? "Barchasi" : "Alle",
    },
    ...values.map((value) => ({
      value,
      label: value,
    })),
  ];
}

/**
 * Backward-compatible Uzbek exports.
 * New code should use the locale-aware getter functions.
 */
export const jobPlatforms = getJobPlatforms("uz");

export const professionOptions = getProfessionOptions("uz");

export const languageOptions = getLanguageOptions("uz");

export const employmentTypeOptions =
  getEmploymentTypeOptions("uz");
