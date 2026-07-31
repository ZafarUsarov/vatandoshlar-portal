export type PlatformType =
  | "Rasmiy davlat portali"
  | "Yevropa rasmiy portali"
  | "Xususiy ish platformasi"
  | "Professional tarmoq"
  | "Maxsus platforma";

export type Profession =
  | "Barcha sohalar"
  | "IT va texnologiya"
  | "Muhandislik"
  | "Tibbiyot va parvarish"
  | "Logistika va ishlab chiqarish"
  | "Savdo va xizmat ko‘rsatish"
  | "Ofis va boshqaruv"
  | "Talabalar"
  | "Ausbildung";

export type PlatformLanguage =
  | "Nemis tili"
  | "Ingliz tili"
  | "Nemis va ingliz";

export type EmploymentType =
  | "Vollzeit"
  | "Teilzeit"
  | "Minijob"
  | "Werkstudent"
  | "Praktikum"
  | "Ausbildung"
  | "Remote";

export type JobPlatform = {
  id: number;
  name: string;
  slug: string;
  description: string;
  platformType: PlatformType;
  official: boolean;
  websiteUrl: string;
  languages: PlatformLanguage[];
  professions: Profession[];
  employmentTypes: EmploymentType[];
  suitableFor: string[];
  searchExamples: string[];
  advantages: string[];
  limitations: string[];
  featured?: boolean;
};

export const jobPlatforms: JobPlatform[] = [
  {
    id: 1,
    name: "Bundesagentur für Arbeit Jobsuche",
    slug: "bundesagentur-fuer-arbeit",
    description:
      "Germaniya Federal bandlik agentligining rasmiy ish qidiruv portali. Turli kasblar, Ausbildung, Vollzeit, Teilzeit, Minijob va talabalar ishlarini qidirish mumkin.",
    platformType: "Rasmiy davlat portali",
    official: true,
    websiteUrl: "https://www.arbeitsagentur.de/jobsuche/",
    languages: ["Nemis tili"],
    professions: [
      "Barcha sohalar",
      "IT va texnologiya",
      "Muhandislik",
      "Tibbiyot va parvarish",
      "Logistika va ishlab chiqarish",
      "Savdo va xizmat ko‘rsatish",
      "Ofis va boshqaruv",
      "Talabalar",
      "Ausbildung",
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
      "Germaniyada yashayotgan ish izlovchilar",
      "Talabalar va bitiruvchilar",
      "Ausbildung izlayotganlar",
      "Malakali va malakasiz ish qidiruvchilar",
    ],
    searchExamples: [
      "Softwareentwickler Berlin",
      "Lagerhelfer Köln",
      "Werkstudent Informatik",
      "Pflegefachkraft Hamburg",
      "Ausbildung Elektroniker",
    ],
    advantages: [
      "Germaniya davlatining rasmiy portali",
      "Ko‘plab kasb va ish turlarini qamrab oladi",
      "Shahar va radius bo‘yicha qidiruv mavjud",
      "Ausbildung va amaliyot e’lonlari ham mavjud",
    ],
    limitations: [
      "Asosiy interfeys va e’lonlarning katta qismi nemis tilida",
      "Har bir e’lonning ishonchliligini baribir alohida tekshirish kerak",
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Make it in Germany",
    slug: "make-it-in-germany",
    description:
      "Xorijiy mutaxassislar uchun Germaniya federal hukumatining rasmiy portali. Ish e’lonlari bilan birga viza, malakani tan olish va Germaniyada yashash bo‘yicha ma’lumot beradi.",
    platformType: "Rasmiy davlat portali",
    official: true,
    websiteUrl:
      "https://www.make-it-in-germany.com/en/working-in-germany/job-listings",
    languages: ["Nemis va ingliz"],
    professions: [
      "Barcha sohalar",
      "IT va texnologiya",
      "Muhandislik",
      "Tibbiyot va parvarish",
      "Logistika va ishlab chiqarish",
      "Ausbildung",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Ausbildung",
    ],
    suitableFor: [
      "Germaniyadan tashqarida yashayotgan mutaxassislar",
      "Blue Card yoki boshqa ish vizasini ko‘rib chiqayotganlar",
      "Kasbiy malakaga ega nomzodlar",
      "Ausbildung izlayotgan xorijiy fuqarolar",
    ],
    searchExamples: [
      "IT specialist",
      "Mechanical engineer",
      "Nursing professional",
      "Electrical engineer",
      "Vocational training",
    ],
    advantages: [
      "Xorijiy mutaxassislar uchun mo‘ljallangan",
      "Ingliz tilidagi interfeys mavjud",
      "Viza va yashash huquqi bo‘yicha rasmiy ma’lumotlar mavjud",
      "Ish bilan birga malakani tan olish jarayoni tushuntiriladi",
    ],
    limitations: [
      "Barcha mahalliy va qisqa muddatli ishlar mavjud emas",
      "Ko‘proq malakali mutaxassislarga yo‘naltirilgan",
    ],
    featured: true,
  },
  {
    id: 3,
    name: "EURES",
    slug: "eures",
    description:
      "Yevropa mehnat mobilligi rasmiy portali. Germaniya va boshqa Yevropa mamlakatlaridagi vakansiyalarni qidirish hamda EURES maslahatchilaridan yordam olish mumkin.",
    platformType: "Yevropa rasmiy portali",
    official: true,
    websiteUrl: "https://eures.europa.eu/jobseekers_en",
    languages: ["Nemis va ingliz"],
    professions: [
      "Barcha sohalar",
      "IT va texnologiya",
      "Muhandislik",
      "Tibbiyot va parvarish",
      "Logistika va ishlab chiqarish",
      "Savdo va xizmat ko‘rsatish",
      "Ofis va boshqaruv",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Praktikum",
      "Ausbildung",
    ],
    suitableFor: [
      "Yevropada ish qidirayotganlar",
      "Boshqa Yevropa mamlakatiga ko‘chishni istaganlar",
      "Xalqaro tajribaga ega nomzodlar",
      "Ko‘p tilli mutaxassislar",
    ],
    searchExamples: [
      "Software engineer Germany",
      "Nurse Germany",
      "Warehouse worker Germany",
      "English speaking Germany",
    ],
    advantages: [
      "Yevropa Ittifoqining rasmiy xizmati",
      "Bir nechta Yevropa davlatlaridagi e’lonlarni qamrab oladi",
      "Mehnat mobilligi bo‘yicha maslahat xizmatlari mavjud",
      "Ko‘p tilli interfeys mavjud",
    ],
    limitations: [
      "Ayrim e’lonlar tashqi ish beruvchi sahifasiga olib boradi",
      "Germaniyadagi barcha mahalliy e’lonlarni qamrab olmaydi",
    ],
  },
  {
    id: 4,
    name: "Stepstone",
    slug: "stepstone",
    description:
      "Germaniyadagi yirik xususiy ish platformalaridan biri. Professional, texnik, ofis, boshqaruv va boshqa ko‘plab yo‘nalishlarda vakansiyalar mavjud.",
    platformType: "Xususiy ish platformasi",
    official: false,
    websiteUrl: "https://www.stepstone.de/",
    languages: ["Nemis tili"],
    professions: [
      "Barcha sohalar",
      "IT va texnologiya",
      "Muhandislik",
      "Tibbiyot va parvarish",
      "Logistika va ishlab chiqarish",
      "Savdo va xizmat ko‘rsatish",
      "Ofis va boshqaruv",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Werkstudent",
      "Praktikum",
      "Remote",
    ],
    suitableFor: [
      "Professional tajribaga ega nomzodlar",
      "Ofis va boshqaruv lavozimlarini izlayotganlar",
      "Muhandis va IT mutaxassislari",
      "Nemis tilida ishlay oladiganlar",
    ],
    searchExamples: [
      "Frontend Entwickler",
      "Projektmanager",
      "Buchhalter",
      "Elektroingenieur",
      "Werkstudent Marketing",
    ],
    advantages: [
      "Kasb va shahar bo‘yicha keng qidiruv",
      "Ish e’lonlari uchun bildirishnoma yaratish mumkin",
      "Professional lavozimlar ko‘p",
      "Kompaniyalar haqida qo‘shimcha ma’lumotlar mavjud",
    ],
    limitations: [
      "Ko‘pchilik e’lonlar nemis tilida",
      "Ayrim oddiy yoki qisqa muddatli ishlar kamroq bo‘lishi mumkin",
    ],
  },
  {
    id: 5,
    name: "LinkedIn Jobs",
    slug: "linkedin-jobs",
    description:
      "Professional profil, kompaniyalar va ish e’lonlarini birlashtiruvchi xalqaro platforma. Ayniqsa IT, muhandislik, marketing, moliya va xalqaro kompaniyalar uchun foydali.",
    platformType: "Professional tarmoq",
    official: false,
    websiteUrl: "https://www.linkedin.com/jobs/",
    languages: ["Ingliz tili", "Nemis va ingliz"],
    professions: [
      "IT va texnologiya",
      "Muhandislik",
      "Ofis va boshqaruv",
      "Savdo va xizmat ko‘rsatish",
      "Talabalar",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Werkstudent",
      "Praktikum",
      "Remote",
    ],
    suitableFor: [
      "IT va texnologiya mutaxassislari",
      "Ingliz tilida ish izlayotganlar",
      "Xalqaro kompaniyalarga ariza beruvchilar",
      "Professional tarmoq yaratishni istaganlar",
    ],
    searchExamples: [
      "English speaking software engineer Germany",
      "Working student data analyst",
      "Remote customer success Germany",
      "Internship marketing Berlin",
    ],
    advantages: [
      "Ingliz tilidagi e’lonlar ko‘p uchraydi",
      "Professional profil orqali ish beruvchilarga ko‘rinish mumkin",
      "Kompaniya xodimlari va recruiterlar bilan bog‘lanish mumkin",
      "Remote va xalqaro ishlar mavjud",
    ],
    limitations: [
      "Yaxshi natija uchun to‘liq profil talab qilinadi",
      "Barcha e’lonlar platformaning o‘zida ariza qabul qilmaydi",
      "Har bir recruiter va kompaniyani alohida tekshirish kerak",
    ],
  },
  {
    id: 6,
    name: "XING Jobs",
    slug: "xing-jobs",
    description:
      "Nemis tilida so‘zlashuvchi mehnat bozoriga yo‘naltirilgan professional tarmoq va ish platformasi. Germaniya, Avstriya va Shveytsariyada keng qo‘llanadi.",
    platformType: "Professional tarmoq",
    official: false,
    websiteUrl: "https://www.xing.com/jobs",
    languages: ["Nemis tili"],
    professions: [
      "Barcha sohalar",
      "IT va texnologiya",
      "Muhandislik",
      "Logistika va ishlab chiqarish",
      "Savdo va xizmat ko‘rsatish",
      "Ofis va boshqaruv",
    ],
    employmentTypes: [
      "Vollzeit",
      "Teilzeit",
      "Minijob",
      "Werkstudent",
      "Remote",
    ],
    suitableFor: [
      "Nemis tilida ish izlayotgan mutaxassislar",
      "Germaniyadagi professional kompaniyalar",
      "Recruiterlar bilan aloqa o‘rnatishni istaganlar",
      "Karyera o‘zgartirayotgan nomzodlar",
    ],
    searchExamples: [
      "Data Analyst",
      "Projektmanager",
      "Logistik",
      "Werkstudent",
      "Quereinsteiger",
    ],
    advantages: [
      "Germaniya mehnat bozoriga kuchli yo‘naltirilgan",
      "Professional profil yaratish mumkin",
      "Recruiterlar nomzodlarni bevosita topishi mumkin",
      "Turli ish shakllari bo‘yicha filtrlar mavjud",
    ],
    limitations: [
      "Asosan nemis tilidagi bozor uchun",
      "Profilni muntazam yangilab turish kerak",
    ],
  },
  {
    id: 7,
    name: "Jobmensa",
    slug: "jobmensa",
    description:
      "Talabalar uchun Nebenjob, Werkstudent, Minijob, qisqa muddatli ish va amaliyotlarni qidirishga ixtisoslashgan platforma.",
    platformType: "Maxsus platforma",
    official: false,
    websiteUrl: "https://www.jobmensa.de/",
    languages: ["Nemis tili"],
    professions: [
      "Talabalar",
      "Savdo va xizmat ko‘rsatish",
      "Logistika va ishlab chiqarish",
      "Ofis va boshqaruv",
      "IT va texnologiya",
    ],
    employmentTypes: [
      "Teilzeit",
      "Minijob",
      "Werkstudent",
      "Praktikum",
    ],
    suitableFor: [
      "Universitet talabalari",
      "Werkstudent lavozimini izlayotganlar",
      "Semestr davomida qo‘shimcha ishlashni istaganlar",
      "Moslashuvchan ish vaqti izlayotganlar",
    ],
    searchExamples: [
      "Werkstudent Informatik",
      "Studentenjob Berlin",
      "Servicekraft Student",
      "Bürohilfe Werkstudent",
      "Lager Student",
    ],
    advantages: [
      "Talabalarga maxsus yo‘naltirilgan",
      "Nebenjob va Werkstudent e’lonlari mavjud",
      "Turli shaharlardagi talabalar ishlari mavjud",
      "Ba’zi ishlar uchun ariza jarayoni soddalashtirilgan",
    ],
    limitations: [
      "Ko‘pchilik e’lonlar nemis tilini talab qiladi",
      "Vakansiyalar soni shahar va davrga qarab farq qiladi",
    ],
  },
  {
    id: 8,
    name: "Ausbildung.de",
    slug: "ausbildung-de",
    description:
      "Ausbildung, duales Studium va Schülerpraktikum izlayotganlar uchun maxsus platforma. Kasblar, maoshlar va ariza jarayoni haqida ma’lumot beradi.",
    platformType: "Maxsus platforma",
    official: false,
    websiteUrl: "https://www.ausbildung.de/",
    languages: ["Nemis tili"],
    professions: [
      "Ausbildung",
      "IT va texnologiya",
      "Muhandislik",
      "Tibbiyot va parvarish",
      "Logistika va ishlab chiqarish",
      "Savdo va xizmat ko‘rsatish",
      "Ofis va boshqaruv",
    ],
    employmentTypes: [
      "Ausbildung",
      "Praktikum",
    ],
    suitableFor: [
      "Ausbildung boshlashni istaganlar",
      "Maktab bitiruvchilari",
      "Kasbini almashtirmoqchi bo‘lganlar",
      "Duales Studium izlayotganlar",
    ],
    searchExamples: [
      "Ausbildung Fachinformatiker",
      "Ausbildung Pflegefachkraft",
      "Ausbildung Elektroniker",
      "Ausbildung Verkäufer",
      "Duales Studium Informatik",
    ],
    advantages: [
      "Ausbildung yo‘nalishlariga ixtisoslashgan",
      "Kasblar haqida tushuntiruvchi sahifalar mavjud",
      "Ausbildung maoshi va talablar haqida ma’lumot beradi",
      "Duales Studium va amaliyotlar ham mavjud",
    ],
    limitations: [
      "Asosiy til nemis tili",
      "Xususiy platforma bo‘lgani uchun rasmiy migratsiya manbasi hisoblanmaydi",
      "Viza talablarini alohida rasmiy manbadan tekshirish kerak",
    ],
  },
];

export const professionOptions: Array<
  "Barchasi" | Profession
> = [
  "Barchasi",
  "Barcha sohalar",
  "IT va texnologiya",
  "Muhandislik",
  "Tibbiyot va parvarish",
  "Logistika va ishlab chiqarish",
  "Savdo va xizmat ko‘rsatish",
  "Ofis va boshqaruv",
  "Talabalar",
  "Ausbildung",
];

export const languageOptions: Array<
  "Barchasi" | PlatformLanguage
> = [
  "Barchasi",
  "Nemis tili",
  "Ingliz tili",
  "Nemis va ingliz",
];

export const employmentTypeOptions: Array<
  "Barchasi" | EmploymentType
> = [
  "Barchasi",
  "Vollzeit",
  "Teilzeit",
  "Minijob",
  "Werkstudent",
  "Praktikum",
  "Ausbildung",
  "Remote",
];