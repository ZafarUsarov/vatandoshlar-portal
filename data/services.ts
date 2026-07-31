import type { ServiceItem } from "@/types/service";

export const services: ServiceItem[] = [
  {
    id: 1,
    slug: "qasamyod-qilgan-tarjimonlar",
    title: "Qasamyod qilgan tarjimon va og‘zaki tarjimonlarni topish",
    shortTitle: "Tarjimonlar",
    description:
      "Sud, elchixona, universitet yoki davlat idorasi uchun rasmiy tarjima kerak bo‘lsa, vakolatli tarjimonni Germaniya adliya tizimining rasmiy bazasidan qidiring.",
    category: "Tarjima",
    icon: "文",
    services: [
      "Tug‘ilganlik va nikoh guvohnomalarini tarjima qilish",
      "Diplom, attestat va ilovalarni tarjima qilish",
      "Sud va davlat idoralari uchun og‘zaki tarjima",
      "Notarial va boshqa rasmiy hujjatlar tarjimasi",
    ],
    verificationSteps: [
      "Kerakli til juftligini tanlang.",
      "Tarjimon yoki og‘zaki tarjimon faoliyat turini belgilang.",
      "Bundesland, shahar yoki pochta indeksi bo‘yicha qidiring.",
      "Tarjimonning vakolati va aloqa ma’lumotlarini rasmiy bazada tekshiring.",
      "Buyurtmadan oldin narx, muddat va hujjatni topshirish shaklini yozma ravishda kelishib oling.",
    ],
    importantNotes: [
      "Har bir tashkilot tarjimaga bir xil talab qo‘ymaydi.",
      "Hujjatni qabul qiluvchi idoradan tasdiqlangan tarjima zarurligini oldindan so‘rang.",
      "Asl hujjatni pochta orqali yuborishdan oldin xavfsizlik va qaytarish tartibini aniqlang.",
    ],
    officialSourceName:
      "Germaniya adliya tizimining tarjimonlar va og‘zaki tarjimonlar bazasi",
    officialSourceUrl:
      "https://www.justiz-dolmetscher.de/Recherche/de/Suchen",
    sourceDescription:
      "Rasmiy bazada umumiy qasamyod qilgan, vakolatli yoki davlat tomonidan tan olingan tarjimon va og‘zaki tarjimonlarni til, hudud va faoliyat turi bo‘yicha qidirish mumkin.",
    location: "Butun Germaniya",
    featured: true,
  },
  {
    id: 2,
    slug: "yuridik-yordam-va-huquqiy-xizmatlar",
    title: "Yuridik yordam va huquqiy xizmat ko‘rsatuvchilarni tekshirish",
    shortTitle: "Huquqiy yordam",
    description:
      "Migratsiya, shartnoma, qarzdorlik yoki boshqa huquqiy masalalarda xizmat ko‘rsatuvchi shaxsning vakolatini tekshirmasdan turib hujjat yoki pul topshirmang.",
    category: "Huquq",
    icon: "§",
    services: [
      "Migratsiya va yashash huquqi bo‘yicha maslahat",
      "Mehnat va ish shartnomalari bo‘yicha yordam",
      "Qarzdorlik va inkasso masalalari",
      "Shartnomalar va iste’molchi huquqlari",
    ],
    verificationSteps: [
      "Xizmat ko‘rsatuvchining to‘liq ismi yoki tashkilot nomini so‘rang.",
      "Uning qaysi turdagi huquqiy xizmatga vakolatli ekanini aniqlang.",
      "Rechtsdienstleistungsregister orqali ro‘yxatdan o‘tganini tekshiring.",
      "Narx va xizmat hajmini yozma shartnomada belgilang.",
      "Muhim yoki murakkab ishda litsenziyaga ega advokatga murojaat qiling.",
    ],
    importantNotes: [
      "Reyestrdagi ro‘yxat barcha turdagi yuridik masalalarni yuritish vakolatini anglatmaydi.",
      "Sud ishi yoki murakkab migratsiya masalasida advokat zarur bo‘lishi mumkin.",
      "Natijani kafolatlaydigan yoki oldindan katta miqdorda naqd pul talab qiladigan takliflarga ehtiyot bo‘ling.",
    ],
    officialSourceName:
      "Bundesamt für Justiz — Rechtsdienstleistungsregister",
    officialSourceUrl: "https://www.rechtsdienstleistungsregister.de/",
    sourceDescription:
      "Ushbu rasmiy reyestrda Germaniyada ayrim yo‘nalishlarda huquqiy xizmat ko‘rsatishga ruxsat berilgan shaxslar haqidagi ma’lumotlar mavjud.",
    location: "Butun Germaniya",
  },
  {
    id: 3,
    slug: "soliq-maslahatchisini-topish",
    title: "Rasmiy soliq maslahatchisini topish va tekshirish",
    shortTitle: "Soliq maslahatchisi",
    description:
      "Soliq deklaratsiyasi, biznes, daromad yoki Finanzamt bilan bog‘liq masalalarda xizmat ko‘rsatuvchining rasmiy Steuerberater ekanini tekshiring.",
    category: "Soliq",
    icon: "€",
    services: [
      "Yillik soliq deklaratsiyasini tayyorlash",
      "Yakka tartibdagi tadbirkorlar uchun maslahat",
      "Finanzamt xatlari va qarorlarini tushuntirish",
      "Buxgalteriya va biznes soliqlari bo‘yicha yordam",
    ],
    verificationSteps: [
      "Maslahatchining to‘liq ismi yoki firma nomini oling.",
      "Rasmiy Steuerberaterverzeichnis bazasida qidiring.",
      "Manzil va kasbiy maqom ma’lumotlarini solishtiring.",
      "Dastlabki maslahat va xizmat narxini oldindan so‘rang.",
      "Topshiriladigan hujjatlar va vakolatnoma hajmini yozma ravishda belgilang.",
    ],
    importantNotes: [
      "Rasmiy reyestr mutaxassisning ma’lum bir tilni bilishini kafolatlamaydi.",
      "Soliq deklaratsiyasi uchun barcha kvitansiya va hujjatlarni to‘liq taqdim etish kerak.",
      "Shaxsiy ELSTER ma’lumotlari va parollarini himoya qiling.",
    ],
    officialSourceName:
      "Bundessteuerberaterkammer — Amtliches Steuerberaterverzeichnis",
    officialSourceUrl: "https://steuerberaterverzeichnis.berufs-org.de/",
    sourceDescription:
      "Rasmiy reyestr Germaniyada tayinlangan soliq maslahatchilari, soliq vakillari va ro‘yxatdan o‘tgan soliq maslahat kompaniyalarini qamrab oladi.",
    location: "Butun Germaniya",
  },
  {
    id: 4,
    slug: "shifokor-va-psixoterapevt-topish",
    title: "Shifokor yoki psixoterapevtni rasmiy bazadan topish",
    shortTitle: "Shifokorlar",
    description:
      "Yashash joyingizga yaqin oilaviy shifokor, mutaxassis yoki psixoterapevtni hududiy shifokorlar palatasi va Kassenärztliche Vereinigung qidiruvlari orqali toping.",
    category: "Tibbiyot",
    icon: "+",
    services: [
      "Hausarzt va oilaviy shifokor qidiruvi",
      "Mutaxassis shifokor qidiruvi",
      "Psixoterapevt qidiruvi",
      "Hudud va ayrim hollarda til bo‘yicha qidiruv",
    ],
    verificationSteps: [
      "Bundeslandni tanlang.",
      "Kerakli mutaxassislik yoki xizmat turini belgilang.",
      "Pochta indeksi va qidiruv radiusini kiriting.",
      "Sug‘urta turi qabul qilinishini amaliyot bilan tasdiqlang.",
      "Qabul vaqti va yo‘llanma zarurligini oldindan so‘rang.",
    ],
    importantNotes: [
      "Barcha hududiy qidiruv tizimlarida bir xil filtrlar mavjud emas.",
      "Ro‘yxatda chiqishi bo‘sh qabul vaqti borligini anglatmaydi.",
      "Shoshilinch, ammo hayot uchun xavfli bo‘lmagan holatlarda 116117 xizmatidan foydalaniladi; hayot uchun xavfli holatda 112 ga qo‘ng‘iroq qilinadi.",
    ],
    officialSourceName: "Bundesärztekammer — Arztsuche",
    officialSourceUrl: "https://www.bundesaerztekammer.de/arztsuche",
    sourceDescription:
      "Bundesärztekammer sahifasi foydalanuvchini tegishli Ärztekammer yoki Kassenärztliche Vereinigungning hududiy shifokor qidiruv tizimiga yo‘naltiradi.",
    location: "Butun Germaniya",
  },
  {
    id: 5,
    slug: "elektrik-santexnik-va-hunarmand-topish",
    title: "Elektrik, santexnik va boshqa hunarmandlarni topish",
    shortTitle: "Hunarmandlar",
    description:
      "Elektrik, isitish tizimi, santexnika, tom yopish yoki boshqa hunarmandchilik xizmatlari uchun hududingizdagi Handwerkskammer qidiruvidan foydalaning.",
    category: "Hunarmandchilik",
    icon: "⚒",
    services: [
      "Elektrik va elektr tizimlari",
      "Santexnika, isitish va suv tizimlari",
      "Ta’mirlash va qurilish ishlari",
      "Tom, deraza, eshik va boshqa hunarmandchilik xizmatlari",
    ],
    verificationSteps: [
      "Pochta indeksi yoki shaharni kiriting.",
      "Mas’ul Handwerkskammer sahifasini oching.",
      "Kerakli kasb yoki xizmat turi bo‘yicha qidiring.",
      "Kamida ikki yoki uchta yozma taklif oling.",
      "Narx, material, ish muddati va kafolatni shartnomada belgilang.",
    ],
    importantNotes: [
      "Favqulodda xizmat chaqirishdan oldin yo‘l haqi, minimal tarif va qo‘shimcha to‘lovlarni so‘rang.",
      "Telefon orqali aytilgan narx bilan yakuniy hisob o‘rtasida farq bo‘lmasligi uchun yozma taklif oling.",
      "Katta summani ish boshlanishidan oldin to‘liq to‘lamang.",
    ],
    officialSourceName:
      "Handwerkskammern in Deutschland — Handwerkersuche",
    officialSourceUrl:
      "https://www.handwerkskammer.de/artikel/handwerkersuche-5620,0,15.html",
    sourceDescription:
      "Rasmiy portal pochta indeksi yoki shahar asosida mas’ul Handwerkskammerni topish va uning mahalliy hunarmand qidiruviga o‘tish imkonini beradi.",
    location: "Butun Germaniya",
  },
  {
    id: 6,
    slug: "istemolchi-huquqlari-boyicha-maslahat",
    title: "Iste’molchi huquqlari bo‘yicha mustaqil maslahat",
    shortTitle: "Iste’molchi himoyasi",
    description:
      "Shartnoma, internet savdosi, mobil aloqa, energiya, sug‘urta yoki boshqa xizmat bilan bog‘liq muammolarda Verbraucherzentrale maslahatidan foydalaning.",
    category: "Iste’molchi huquqlari",
    icon: "✓",
    services: [
      "Shartnoma va obunalarni bekor qilish",
      "Internet savdosi va qaytarish masalalari",
      "Telefon, internet va energiya shartnomalari",
      "Shubhali hisoblar va xizmatlar bo‘yicha maslahat",
    ],
    verificationSteps: [
      "Muammo turini va Bundeslandni tanlang.",
      "Mahalliy Verbraucherzentrale maslahat xizmatini toping.",
      "Shartnoma, hisob, yozishmalar va to‘lov hujjatlarini tayyorlang.",
      "Maslahat shakli va narxini oldindan tekshiring.",
      "Belgilangan muddatlarni o‘tkazib yubormaslik uchun tez murojaat qiling.",
    ],
    importantNotes: [
      "Barcha maslahatlar bepul bo‘lavermaydi.",
      "Verbraucherzentrale sudda advokat o‘rnini har doim ham bosa olmaydi.",
      "Bekor qilish, e’tiroz yoki to‘lov muddatlarini tekshirish muhim.",
    ],
    officialSourceName: "Verbraucherzentrale",
    officialSourceUrl: "https://www.verbraucherzentrale.de/",
    sourceDescription:
      "Germaniyaning 16 Bundeslandidagi Verbraucherzentralelar iste’molchilarni onlayn, telefon yoki shaxsan maslahat bilan qo‘llab-quvvatlaydi.",
    location: "Butun Germaniya",
  },
];

export function getServiceBySlug(
  slug: string,
): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

export function getFeaturedService(): ServiceItem | undefined {
  return services.find((service) => service.featured);
}