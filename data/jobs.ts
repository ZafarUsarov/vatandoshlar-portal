export type JobCategory =
  | "Talabalar"
  | "Ingliz tilida"
  | "Minijob"
  | "Amaliyot"
  | "Malakali mutaxassislar"
  | "Xavfsiz ish qidirish";

export type JobGuide = {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: JobCategory;
  icon: string;
  audience: string;
  highlights: string[];
  searchKeywords: string[];
  steps: string[];
  importantNotes: string[];
  officialSourceName: string;
  officialSourceUrl: string;
  sourceDescription: string;
  verifiedAt: string;
  featured?: boolean;
};

export const jobGuides: JobGuide[] = [
  {
    id: 1,
    slug: "germaniyada-talabalar-uchun-ish",
    title: "Germaniyada xalqaro talabalar uchun ishlash qoidalari",
    shortTitle: "Talabalar uchun ish",
    description:
      "Talabalarga Nebenjob, Werkstudent, universitetdagi student-assistant ishlari va amaliyot imkoniyatlarini qonuniy talablar asosida topishga yordam beruvchi qo‘llanma.",
    category: "Talabalar",
    icon: "🎓",
    audience:
      "Germaniyada oliy ta’lim muassasasida tahsil olayotgan xalqaro talabalar",
    highlights: [
      "140 to‘liq yoki 280 yarim ish kuni qoidasi",
      "Haftasiga 20 soatlik muqobil hisoblash imkoniyati",
      "Universitetdagi student-assistant ishlarini qidirish",
      "Werkstudent va Nebenjob o‘rtasidagi farq",
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
      "Avvalo yashash ruxsatnomangizning Zusatzblatt yoki Nebenbestimmungen qismidagi ishlash shartlarini tekshiring.",
      "Universitetingizning Career Center, Stellenportal va institutlar e’lonlarini ko‘rib chiqing.",
      "Bundesagentur für Arbeit Jobsuche platformasida Werkstudent, studentische Hilfskraft yoki Nebenjob so‘zlari bilan qidiring.",
      "CV, qisqa motivatsion xat, Immatrikulationsbescheinigung va zarur bo‘lsa baholar ro‘yxatini tayyorlang.",
      "Ish beruvchidan haftalik ish vaqti, brutto maosh, shartnoma muddati va ta’til huquqini yozma ravishda so‘rang.",
      "Ishni boshlashdan oldin universitet, Ausländerbehörde yoki mas’ul maslahat xizmatidan individual holatingizni aniqlashtiring.",
    ],
    importantNotes: [
      "Uchinchi davlat fuqarosi bo‘lgan talabalar uchun ishlash huquqi yashash maqomiga bog‘liq.",
      "Majburiy va ixtiyoriy amaliyotlar bir xil tartibda hisoblanmasligi mumkin.",
      "Semestr vaqtida ko‘p ishlash talabalik sug‘urtasi va ijtimoiy sug‘urta maqomiga ta’sir qilishi mumkin.",
      "O‘zini o‘zi band qilish yoki freelance faoliyati uchun alohida ruxsat talab qilinishi mumkin.",
    ],
    officialSourceName:
      "Make it in Germany — Study and work",
    officialSourceUrl:
      "https://www.make-it-in-germany.com/en/study-vocational-training/studies-in-germany/work",
    sourceDescription:
      "Germaniya federal hukumatining rasmiy portalida xalqaro talabalarning ishlash huquqi, ish kunlarini hisoblash va amaliyotlar haqidagi ma’lumotlar berilgan.",
    verifiedAt: "2026-07-30",
    featured: true,
  },
  {
    id: 2,
    slug: "germaniyada-ingliz-tilida-ish-topish",
    title: "Germaniyada ingliz tilida ish topish bo‘yicha qo‘llanma",
    shortTitle: "Ingliz tilidagi ishlar",
    description:
      "Nemis tilini hali yaxshi bilmaydiganlar uchun ingliz tili ishlatiladigan vakansiyalarni to‘g‘ri qidirish, e’lon talablarini tekshirish va ariza tayyorlash yo‘llari.",
    category: "Ingliz tilida",
    icon: "EN",
    audience:
      "Ingliz tilida ishlay oladigan talabalar, yangi kelganlar va xalqaro mutaxassislar",
    highlights: [
      "English-speaking vakansiyalarni qidirish",
      "Xalqaro kompaniyalarni aniqlash",
      "Ingliz tilidagi CV va cover letter",
      "Nemis tili talabini to‘g‘ri baholash",
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
      "Bundesagentur für Arbeit va Make it in Germany platformalarida kasb nomini inglizcha va nemischa variantlarda qidiring.",
      "Qidiruv so‘ziga English speaking, international team yoki working language English iboralarini qo‘shing.",
      "Vakansiyaning language requirements bo‘limini diqqat bilan o‘qing.",
      "CVni vakansiya tilida tayyorlang va unda Germaniyadagi yashash hamda ishlash huquqingizni aniq ko‘rsating.",
      "Arizada nemis tilini o‘rganayotgan bo‘lsangiz, amaldagi darajangiz va rejangizni yozing.",
      "Suhbatdan oldin kompaniyaning rasmiy sayti, Impressum sahifasi va aloqa ma’lumotlarini tekshiring.",
    ],
    importantNotes: [
      "Vakansiya matni ingliz tilida yozilgani ish joyida nemis tili umuman talab qilinmaydi degani emas.",
      "Mijozlar bilan ishlash, tibbiyot, ta’lim va davlat bilan bog‘liq kasblarda nemis tili ko‘pincha zarur.",
      "IT, ilmiy tadqiqot, startup va xalqaro kompaniyalarda ingliz tili bilan imkoniyatlar ko‘proq uchrashi mumkin.",
      "Nemis tilini o‘rganish uzoq muddatli ish va karyera imkoniyatlarini yaxshilaydi.",
    ],
    officialSourceName:
      "Bundesagentur für Arbeit — Working in Germany",
    officialSourceUrl:
      "https://www.arbeitsagentur.de/en/working-in-germany/how-to-find-a-job",
    sourceDescription:
      "Federal Employment Agency rasmiy sahifasi Germaniyada ishonchli ish platformalari, ariza berish va ish qidirish bo‘yicha ko‘rsatmalar beradi.",
    verifiedAt: "2026-07-30",
  },
  {
    id: 3,
    slug: "germaniyada-minijob",
    title: "Germaniyada Minijob: daromad chegarasi va huquqlar",
    shortTitle: "Minijob",
    description:
      "2026-yildagi Minijob daromad chegarasi, minimal ish haqi, ish vaqti, ta’til va mehnat shartnomasi bo‘yicha asosiy ma’lumotlar.",
    category: "Minijob",
    icon: "€",
    audience:
      "Talabalar, qo‘shimcha daromad izlayotganlar va qisqa vaqt ishlashni istaganlar",
    highlights: [
      "2026-yilda oyiga o‘rtacha 603 yevrogacha",
      "Soatiga kamida 13,90 yevro minimal ish haqi",
      "Yillik haq to‘lanadigan ta’til huquqi",
      "Yozma mehnat shartnomasini tekshirish",
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
      "Bundesagentur für Arbeit Jobsuche platformasida Minijob yoki Aushilfe so‘zi va yashash joyingizni kiriting.",
      "Vakansiyada soatlik maosh, oylik ish soati va smena jadvali ko‘rsatilganini tekshiring.",
      "2026-yil uchun oylik muntazam daromad Minijob chegarasiga mos kelishini hisoblang.",
      "Ish beruvchidan yozma shartnoma, ish vaqti qaydi va maosh hisob-kitobini talab qiling.",
      "Bir nechta Minijob mavjud bo‘lsa, ularning daromadi birgalikda hisoblanishi mumkinligini tekshiring.",
      "Talaba bo‘lsangiz, ish vaqti talabalik maqomingizga ta’sir qilmasligini aniqlang.",
    ],
    importantNotes: [
      "Minijob ham mehnat munosabati hisoblanadi va xodimning asosiy mehnat huquqlari mavjud.",
      "Minijob xodimlari ham qonuniy minimal ish haqi va haq to‘lanadigan ta’til huquqiga ega.",
      "Naqd pul bilan norasmiy ishlash soliqqa, sug‘urtaga va yashash maqomiga oid muammolar tug‘dirishi mumkin.",
      "Daromad chegarasi qonuniy minimal ish haqiga bog‘liq holda kelajakda o‘zgarishi mumkin.",
    ],
    officialSourceName: "Minijob-Zentrale",
    officialSourceUrl:
      "https://www.minijob-zentrale.de/EN/Home",
    sourceDescription:
      "Minijob-Zentrale Germaniyadagi Minijob daromad chegarasi, mehnat huquqlari, sug‘urta va ish beruvchining majburiyatlari bo‘yicha rasmiy ma’lumot beradi.",
    verifiedAt: "2026-07-30",
  },
  {
    id: 4,
    slug: "werkstudent-praktikum-va-student-assistant",
    title: "Werkstudent, Praktikum va student-assistant ishlarini topish",
    shortTitle: "Werkstudent va amaliyot",
    description:
      "O‘qish yo‘nalishiga mos tajriba orttirish uchun Werkstudent, Praktikum, studentische Hilfskraft va ilmiy yordamchi lavozimlarini qidirish bo‘yicha yo‘riqnoma.",
    category: "Amaliyot",
    icon: "💼",
    audience:
      "O‘qish davomida professional tajriba va kelajakdagi karyera uchun imkoniyat izlayotgan talabalar",
    highlights: [
      "O‘qish yo‘nalishiga mos tajriba",
      "Universitet va kompaniya vakansiyalari",
      "Majburiy hamda ixtiyoriy amaliyot farqi",
      "Bitiruvdan keyingi ishga tayyorgarlik",
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
      "Universitetingiz Career Center va fakultet e’lonlarini muntazam tekshiring.",
      "O‘qish yo‘nalishingizga mos kasb nomlarini nemischa va inglizcha shaklda qidiring.",
      "Majburiy amaliyot bo‘lsa, universitetdan Pflichtpraktikum tasdiqnomasini oling.",
      "CV, baholar ro‘yxati, Immatrikulationsbescheinigung va kerakli portfolio yoki GitHub havolasini tayyorlang.",
      "Shartnomada ish vazifalari, mentor, ish vaqti, maosh va amaliyot muddati ko‘rsatilganini tekshiring.",
      "Amaliyotning ishlash kunlari hisobiga kirishi yoki kirmasligini individual holatingiz bo‘yicha aniqlashtiring.",
    ],
    importantNotes: [
      "Majburiy va ixtiyoriy amaliyot uchun migratsiya hamda minimal ish haqi qoidalari farq qilishi mumkin.",
      "Bepul amaliyotga rozi bo‘lishdan oldin uning qonuniy asosini tekshiring.",
      "Werkstudent maqomi avtomatik ravishda migratsiya cheklovlarini bekor qilmaydi.",
      "Universitetdagi student-assistant lavozimlari uchun alohida hisoblash qoidalari bo‘lishi mumkin.",
    ],
    officialSourceName:
      "Bundesagentur für Arbeit — Internships and holiday jobs",
    officialSourceUrl:
      "https://www.arbeitsagentur.de/en/working-in-germany/internships-holiday-jobs-for-students",
    sourceDescription:
      "Federal Employment Agency xalqaro talabalar uchun amaliyot va ta’til davridagi ish imkoniyatlari haqida rasmiy ma’lumot beradi.",
    verifiedAt: "2026-07-30",
  },
  {
    id: 5,
    slug: "it-va-malakali-mutaxassislar-uchun-ish",
    title: "IT va malakali mutaxassislar uchun Germaniyada ish qidirish",
    shortTitle: "IT va mutaxassislar",
    description:
      "Dasturchi, data mutaxassisi, muhandis va boshqa malakali kadrlar uchun rasmiy vakansiyalarni topish, malakani tekshirish va ariza berish bo‘yicha yo‘riqnoma.",
    category: "Malakali mutaxassislar",
    icon: "⌘",
    audience:
      "IT, muhandislik, texnika, sog‘liqni saqlash va boshqa professional yo‘nalishdagi nomzodlar",
    highlights: [
      "Rasmiy ish qidiruv platformalari",
      "IT va texnik kasblar",
      "Diplom va malakani tan olish",
      "Viza va yashash ruxsati talablarini tekshirish",
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
      "Kasbingiz Germaniyada tartibga solinadigan kasb ekanini tekshiring.",
      "Make it in Germany va Bundesagentur für Arbeit Jobsuche platformalarida vakansiyalarni qidiring.",
      "Diplom yoki kasbiy malakani tan olish zarur bo‘lsa, Recognition in Germany portalidan foydalaning.",
      "CVni aniq, ikki sahifadan oshmaydigan va vakansiyaga mos shaklda tayyorlang.",
      "Texnik yo‘nalishda portfolio, GitHub, loyiha tavsifi yoki sertifikatlarni qo‘shing.",
      "Arizadan oldin ish beruvchining rasmiy sayti, kompaniya manzili va vakansiya ma’lumotlarini tekshiring.",
    ],
    importantNotes: [
      "IT sohasida ingliz tili bilan ish topish mumkin, ammo barcha vakansiyalar uchun bu yetarli emas.",
      "Tartibga solinadigan kasblarda rasmiy tan olish yoki kasbiy ruxsat talab qilinishi mumkin.",
      "Ish taklifi viza yoki yashash ruxsatining avtomatik tasdiqlanishini anglatmaydi.",
      "Ishga joylashtirish uchun oldindan katta pul talab qiladigan vositachilarga ehtiyot bo‘ling.",
    ],
    officialSourceName:
      "Make it in Germany — Job listings",
    officialSourceUrl:
      "https://www.make-it-in-germany.com/en/working-in-germany/job-listings",
    sourceDescription:
      "Germaniya federal hukumatining rasmiy portalida xorijiy mutaxassislar uchun vakansiyalar va kasblar bo‘yicha ma’lumotlar mavjud.",
    verifiedAt: "2026-07-30",
  },
  {
    id: 6,
    slug: "ish-elonidagi-firibgarlikdan-himoyalanish",
    title: "Soxta ish e’lonlari va firibgarlikdan himoyalanish",
    shortTitle: "Xavfsiz ish qidirish",
    description:
      "Ish e’lonini tekshirish, shaxsiy hujjatlarni xavfsiz yuborish, vositachilik to‘lovlari va soxta shartnomalarni aniqlash bo‘yicha amaliy qo‘llanma.",
    category: "Xavfsiz ish qidirish",
    icon: "✓",
    audience:
      "Germaniyada ish, amaliyot, Minijob yoki Ausbildung izlayotgan barcha foydalanuvchilar",
    highlights: [
      "Kompaniya va vakansiyani tekshirish",
      "Shaxsiy ma’lumotlarni himoyalash",
      "Oldindan pul talab qiluvchi takliflarni aniqlash",
      "Yozma shartnomani tekshirish",
    ],
    searchKeywords: [
      "Bundesagentur für Arbeit Jobsuche",
      "Make it in Germany jobs",
      "EURES jobs Germany",
      "company Impressum",
      "Handelsregister company search",
    ],
    steps: [
      "Vakansiyani kompaniyaning rasmiy saytidan ham topish mumkinligini tekshiring.",
      "Kompaniya saytida Impressum, manzil, telefon va mas’ul shaxs ma’lumotlarini ko‘ring.",
      "Faqat messenjer orqali suhbat o‘tkazadigan yoki anonim elektron pochta ishlatadigan shaxslarga ehtiyot bo‘ling.",
      "Pasport, Aufenthaltstitel, bank va soliq ma’lumotlarini faqat zarur bosqichda hamda ishonchli kanal orqali yuboring.",
      "Ishga qabul qilish, viza yoki shartnoma uchun oldindan pul yubormang.",
      "Ish boshlashdan oldin ish vazifasi, brutto maosh, ish vaqti, ta’til va sinov muddati yozilgan shartnomani oling.",
    ],
    importantNotes: [
      "Haqiqiy ish beruvchi odatda oddiy suhbatdan oldin bank paroli yoki karta PIN-kodini so‘ramaydi.",
      "Pul o‘tkazish, paket qabul qilish yoki o‘z bank hisobingizdan foydalanishni talab qiladigan ishlar xavfli bo‘lishi mumkin.",
      "Juda yuqori maosh va juda kam talab va’da qiladigan e’lonlarni sinchiklab tekshiring.",
      "Shubhali holatda Bundesagentur für Arbeit yoki maslahat markaziga murojaat qiling.",
    ],
    officialSourceName:
      "Bundesagentur für Arbeit — How to find a job",
    officialSourceUrl:
      "https://www.arbeitsagentur.de/en/working-in-germany/how-to-find-a-job",
    sourceDescription:
      "Federal Employment Agency ishonchli ish qidirish manbalari va Germaniyada ishga ariza berish jarayoni haqida rasmiy yo‘riqnomalar beradi.",
    verifiedAt: "2026-07-30",
  },
];

export function getJobGuideBySlug(
  slug: string,
): JobGuide | undefined {
  return jobGuides.find((guide) => guide.slug === slug);
}

export function getFeaturedJobGuide(): JobGuide | undefined {
  return jobGuides.find((guide) => guide.featured);
}

export function formatJobDate(date: string): string {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}