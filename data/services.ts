import type {
  LocalizedServiceItem,
  ServiceItem,
  SupportedContentLocale,
} from "@/types/service";

const categoryLabels = {
  uz: {
    translation: "Tarjima",
    legal: "Huquq",
    tax: "Soliq",
    medical: "Tibbiyot",
    craft: "Hunarmandchilik",
    consumer: "Iste’molchi huquqlari",
  },
  de: {
    translation: "Übersetzung",
    legal: "Recht",
    tax: "Steuern",
    medical: "Medizin",
    craft: "Handwerk",
    consumer: "Verbraucherschutz",
  },
} as const;

export const localizedServices: ReadonlyArray<LocalizedServiceItem> = [
  {
    id: 1,
    slug: "qasamyod-qilgan-tarjimonlar",
    title: {
      uz: "Qasamyod qilgan tarjimon va og‘zaki tarjimonlarni topish",
      de: "Beeidigte Übersetzer und Dolmetscher finden",
    },
    shortTitle: {
      uz: "Tarjimonlar",
      de: "Übersetzer",
    },
    description: {
      uz: "Sud, elchixona, universitet yoki davlat idorasi uchun rasmiy tarjima kerak bo‘lsa, vakolatli tarjimonni Germaniya adliya tizimining rasmiy bazasidan qidiring.",
      de: "Wenn Sie für ein Gericht, eine Botschaft, eine Hochschule oder eine Behörde eine amtliche Übersetzung benötigen, suchen Sie in der offiziellen Datenbank der deutschen Justiz nach einer befugten Fachkraft.",
    },
    category: "translation",
    icon: "文",
    services: [
      {
        uz: "Tug‘ilganlik va nikoh guvohnomalarini tarjima qilish",
        de: "Übersetzung von Geburts- und Heiratsurkunden",
      },
      {
        uz: "Diplom, attestat va ilovalarni tarjima qilish",
        de: "Übersetzung von Diplomen, Zeugnissen und Anlagen",
      },
      {
        uz: "Sud va davlat idoralari uchun og‘zaki tarjima",
        de: "Dolmetschen für Gerichte und Behörden",
      },
      {
        uz: "Notarial va boshqa rasmiy hujjatlar tarjimasi",
        de: "Übersetzung notarieller und anderer amtlicher Dokumente",
      },
    ],
    verificationSteps: [
      {
        uz: "Kerakli til juftligini tanlang.",
        de: "Wählen Sie das benötigte Sprachenpaar.",
      },
      {
        uz: "Tarjimon yoki og‘zaki tarjimon faoliyat turini belgilang.",
        de: "Wählen Sie Übersetzen oder Dolmetschen als Tätigkeitsart.",
      },
      {
        uz: "Bundesland, shahar yoki pochta indeksi bo‘yicha qidiring.",
        de: "Suchen Sie nach Bundesland, Ort oder Postleitzahl.",
      },
      {
        uz: "Tarjimonning vakolati va aloqa ma’lumotlarini rasmiy bazada tekshiring.",
        de: "Prüfen Sie Befugnis und Kontaktdaten in der offiziellen Datenbank.",
      },
      {
        uz: "Buyurtmadan oldin narx, muddat va hujjatni topshirish shaklini yozma ravishda kelishib oling.",
        de: "Vereinbaren Sie Preis, Frist und Übergabeform vorab schriftlich.",
      },
    ],
    importantNotes: [
      {
        uz: "Har bir tashkilot tarjimaga bir xil talab qo‘ymaydi.",
        de: "Nicht jede Stelle stellt dieselben Anforderungen an Übersetzungen.",
      },
      {
        uz: "Hujjatni qabul qiluvchi idoradan tasdiqlangan tarjima zarurligini oldindan so‘rang.",
        de: "Klären Sie vorab mit der empfangenden Stelle, ob eine beglaubigte Übersetzung erforderlich ist.",
      },
      {
        uz: "Asl hujjatni pochta orqali yuborishdan oldin xavfsizlik va qaytarish tartibini aniqlang.",
        de: "Klären Sie Sicherheit und Rücksendung, bevor Sie Originale per Post versenden.",
      },
    ],
    officialSourceName:
      "Germaniya adliya tizimining tarjimonlar va og‘zaki tarjimonlar bazasi",
    officialSourceUrl:
      "https://www.justiz-dolmetscher.de/Recherche/de/Suchen",
    sourceDescription: {
      uz: "Rasmiy bazada umumiy qasamyod qilgan, vakolatli yoki davlat tomonidan tan olingan tarjimon va og‘zaki tarjimonlarni til, hudud va faoliyat turi bo‘yicha qidirish mumkin.",
      de: "In der offiziellen Datenbank können allgemein beeidigte, ermächtigte oder staatlich anerkannte Übersetzer und Dolmetscher nach Sprache, Region und Tätigkeitsart gesucht werden.",
    },
    location: {
      uz: "Butun Germaniya",
      de: "Deutschlandweit",
    },
    featured: true,
  },
  {
    id: 2,
    slug: "yuridik-yordam-va-huquqiy-xizmatlar",
    title: {
      uz: "Yuridik yordam va huquqiy xizmat ko‘rsatuvchilarni tekshirish",
      de: "Anbieter rechtlicher Dienstleistungen prüfen",
    },
    shortTitle: {
      uz: "Huquqiy yordam",
      de: "Rechtliche Hilfe",
    },
    description: {
      uz: "Migratsiya, shartnoma, qarzdorlik yoki boshqa huquqiy masalalarda xizmat ko‘rsatuvchi shaxsning vakolatini tekshirmasdan turib hujjat yoki pul topshirmang.",
      de: "Übergeben Sie bei Fragen zu Migration, Verträgen, Schulden oder anderen Rechtsthemen keine Dokumente oder Zahlungen, bevor Sie die Befugnis des Anbieters geprüft haben.",
    },
    category: "legal",
    icon: "§",
    services: [
      {
        uz: "Migratsiya va yashash huquqi bo‘yicha maslahat",
        de: "Beratung zu Migration und Aufenthaltsrecht",
      },
      {
        uz: "Mehnat va ish shartnomalari bo‘yicha yordam",
        de: "Unterstützung bei Arbeitsrecht und Arbeitsverträgen",
      },
      {
        uz: "Qarzdorlik va inkasso masalalari",
        de: "Fragen zu Schulden und Inkasso",
      },
      {
        uz: "Shartnomalar va iste’molchi huquqlari",
        de: "Verträge und Verbraucherrechte",
      },
    ],
    verificationSteps: [
      {
        uz: "Xizmat ko‘rsatuvchining to‘liq ismi yoki tashkilot nomini so‘rang.",
        de: "Erfragen Sie den vollständigen Namen oder die genaue Organisationsbezeichnung.",
      },
      {
        uz: "Uning qaysi turdagi huquqiy xizmatga vakolatli ekanini aniqlang.",
        de: "Klären Sie, für welche Art von Rechtsdienstleistung eine Befugnis besteht.",
      },
      {
        uz: "Rechtsdienstleistungsregister orqali ro‘yxatdan o‘tganini tekshiring.",
        de: "Prüfen Sie die Registrierung im Rechtsdienstleistungsregister.",
      },
      {
        uz: "Narx va xizmat hajmini yozma shartnomada belgilang.",
        de: "Halten Sie Preis und Leistungsumfang schriftlich fest.",
      },
      {
        uz: "Muhim yoki murakkab ishda litsenziyaga ega advokatga murojaat qiling.",
        de: "Wenden Sie sich bei wichtigen oder komplexen Fällen an einen zugelassenen Rechtsanwalt.",
      },
    ],
    importantNotes: [
      {
        uz: "Reyestrdagi ro‘yxat barcha turdagi yuridik masalalarni yuritish vakolatini anglatmaydi.",
        de: "Eine Registrierung berechtigt nicht automatisch zur Bearbeitung aller Rechtsgebiete.",
      },
      {
        uz: "Sud ishi yoki murakkab migratsiya masalasida advokat zarur bo‘lishi mumkin.",
        de: "Bei Gerichtsverfahren oder komplexen Migrationsfragen kann anwaltliche Hilfe erforderlich sein.",
      },
      {
        uz: "Natijani kafolatlaydigan yoki oldindan katta miqdorda naqd pul talab qiladigan takliflarga ehtiyot bo‘ling.",
        de: "Seien Sie vorsichtig bei Erfolgsgarantien oder hohen Barforderungen im Voraus.",
      },
    ],
    officialSourceName:
      "Bundesamt für Justiz — Rechtsdienstleistungsregister",
    officialSourceUrl:
      "https://www.rechtsdienstleistungsregister.de/",
    sourceDescription: {
      uz: "Ushbu rasmiy reyestrda Germaniyada ayrim yo‘nalishlarda huquqiy xizmat ko‘rsatishga ruxsat berilgan shaxslar haqidagi ma’lumotlar mavjud.",
      de: "Das offizielle Register enthält Angaben zu Personen, die in Deutschland für bestimmte Bereiche Rechtsdienstleistungen erbringen dürfen.",
    },
    location: {
      uz: "Butun Germaniya",
      de: "Deutschlandweit",
    },
  },
  {
    id: 3,
    slug: "soliq-maslahatchisini-topish",
    title: {
      uz: "Rasmiy soliq maslahatchisini topish va tekshirish",
      de: "Steuerberater finden und amtlich prüfen",
    },
    shortTitle: {
      uz: "Soliq maslahatchisi",
      de: "Steuerberater",
    },
    description: {
      uz: "Soliq deklaratsiyasi, biznes, daromad yoki Finanzamt bilan bog‘liq masalalarda xizmat ko‘rsatuvchining rasmiy Steuerberater ekanini tekshiring.",
      de: "Prüfen Sie bei Steuererklärungen, Unternehmen, Einkommen oder Angelegenheiten mit dem Finanzamt, ob der Anbieter tatsächlich als Steuerberater bestellt ist.",
    },
    category: "tax",
    icon: "€",
    services: [
      {
        uz: "Yillik soliq deklaratsiyasini tayyorlash",
        de: "Erstellung der jährlichen Steuererklärung",
      },
      {
        uz: "Yakka tartibdagi tadbirkorlar uchun maslahat",
        de: "Beratung für Selbstständige",
      },
      {
        uz: "Finanzamt xatlari va qarorlarini tushuntirish",
        de: "Erläuterung von Schreiben und Bescheiden des Finanzamts",
      },
      {
        uz: "Buxgalteriya va biznes soliqlari bo‘yicha yordam",
        de: "Unterstützung bei Buchhaltung und Unternehmenssteuern",
      },
    ],
    verificationSteps: [
      {
        uz: "Maslahatchining to‘liq ismi yoki firma nomini oling.",
        de: "Erfragen Sie den vollständigen Namen oder die Firmenbezeichnung.",
      },
      {
        uz: "Rasmiy Steuerberaterverzeichnis bazasida qidiring.",
        de: "Suchen Sie im amtlichen Steuerberaterverzeichnis.",
      },
      {
        uz: "Manzil va kasbiy maqom ma’lumotlarini solishtiring.",
        de: "Vergleichen Sie Anschrift und beruflichen Status.",
      },
      {
        uz: "Dastlabki maslahat va xizmat narxini oldindan so‘rang.",
        de: "Erfragen Sie vorab die Kosten der Erstberatung und der Leistung.",
      },
      {
        uz: "Topshiriladigan hujjatlar va vakolatnoma hajmini yozma ravishda belgilang.",
        de: "Halten Sie Unterlagen und Umfang der Vollmacht schriftlich fest.",
      },
    ],
    importantNotes: [
      {
        uz: "Rasmiy reyestr mutaxassisning ma’lum bir tilni bilishini kafolatlamaydi.",
        de: "Das Register garantiert keine bestimmten Sprachkenntnisse.",
      },
      {
        uz: "Soliq deklaratsiyasi uchun barcha kvitansiya va hujjatlarni to‘liq taqdim etish kerak.",
        de: "Für die Steuererklärung müssen Belege und Unterlagen vollständig vorgelegt werden.",
      },
      {
        uz: "Shaxsiy ELSTER ma’lumotlari va parollarini himoya qiling.",
        de: "Schützen Sie persönliche ELSTER-Zugangsdaten und Passwörter.",
      },
    ],
    officialSourceName:
      "Bundessteuerberaterkammer — Amtliches Steuerberaterverzeichnis",
    officialSourceUrl:
      "https://steuerberaterverzeichnis.berufs-org.de/",
    sourceDescription: {
      uz: "Rasmiy reyestr Germaniyada tayinlangan soliq maslahatchilari, soliq vakillari va ro‘yxatdan o‘tgan soliq maslahat kompaniyalarini qamrab oladi.",
      de: "Das amtliche Verzeichnis umfasst bestellte Steuerberater, Steuerbevollmächtigte und anerkannte Steuerberatungsgesellschaften.",
    },
    location: {
      uz: "Butun Germaniya",
      de: "Deutschlandweit",
    },
  },
  {
    id: 4,
    slug: "shifokor-va-psixoterapevt-topish",
    title: {
      uz: "Shifokor yoki psixoterapevtni rasmiy bazadan topish",
      de: "Ärzte oder Psychotherapeuten über offizielle Suchen finden",
    },
    shortTitle: {
      uz: "Shifokorlar",
      de: "Ärztesuche",
    },
    description: {
      uz: "Yashash joyingizga yaqin oilaviy shifokor, mutaxassis yoki psixoterapevtni hududiy shifokorlar palatasi va Kassenärztliche Vereinigung qidiruvlari orqali toping.",
      de: "Finden Sie Hausärzte, Fachärzte oder Psychotherapeuten in Ihrer Nähe über die regionalen Suchen der Ärztekammern und Kassenärztlichen Vereinigungen.",
    },
    category: "medical",
    icon: "+",
    services: [
      {
        uz: "Hausarzt va oilaviy shifokor qidiruvi",
        de: "Suche nach Hausärzten",
      },
      {
        uz: "Mutaxassis shifokor qidiruvi",
        de: "Suche nach Fachärzten",
      },
      {
        uz: "Psixoterapevt qidiruvi",
        de: "Suche nach Psychotherapeuten",
      },
      {
        uz: "Hudud va ayrim hollarda til bo‘yicha qidiruv",
        de: "Suche nach Region und teilweise nach Sprache",
      },
    ],
    verificationSteps: [
      {
        uz: "Bundeslandni tanlang.",
        de: "Wählen Sie das Bundesland.",
      },
      {
        uz: "Kerakli mutaxassislik yoki xizmat turini belgilang.",
        de: "Wählen Sie Fachgebiet oder Leistungsart.",
      },
      {
        uz: "Pochta indeksi va qidiruv radiusini kiriting.",
        de: "Geben Sie Postleitzahl und Suchradius ein.",
      },
      {
        uz: "Sug‘urta turi qabul qilinishini amaliyot bilan tasdiqlang.",
        de: "Klären Sie mit der Praxis, welche Versicherungsart akzeptiert wird.",
      },
      {
        uz: "Qabul vaqti va yo‘llanma zarurligini oldindan so‘rang.",
        de: "Fragen Sie nach Terminverfügbarkeit und einer möglichen Überweisung.",
      },
    ],
    importantNotes: [
      {
        uz: "Barcha hududiy qidiruv tizimlarida bir xil filtrlar mavjud emas.",
        de: "Regionale Suchsysteme bieten nicht überall dieselben Filter.",
      },
      {
        uz: "Ro‘yxatda chiqishi bo‘sh qabul vaqti borligini anglatmaydi.",
        de: "Ein Listeneintrag bedeutet nicht, dass kurzfristig Termine frei sind.",
      },
      {
        uz: "Shoshilinch, ammo hayot uchun xavfli bo‘lmagan holatlarda 116117 xizmatidan foydalaniladi; hayot uchun xavfli holatda 112 ga qo‘ng‘iroq qilinadi.",
        de: "In dringenden, aber nicht lebensbedrohlichen Fällen gilt 116117; bei Lebensgefahr 112.",
      },
    ],
    officialSourceName:
      "Bundesärztekammer — Arztsuche",
    officialSourceUrl:
      "https://www.bundesaerztekammer.de/arztsuche",
    sourceDescription: {
      uz: "Bundesärztekammer sahifasi foydalanuvchini tegishli Ärztekammer yoki Kassenärztliche Vereinigungning hududiy shifokor qidiruv tizimiga yo‘naltiradi.",
      de: "Die Bundesärztekammer verweist auf die regionalen Arztsuchen der zuständigen Ärztekammern und Kassenärztlichen Vereinigungen.",
    },
    location: {
      uz: "Butun Germaniya",
      de: "Deutschlandweit",
    },
  },
  {
    id: 5,
    slug: "elektrik-santexnik-va-hunarmand-topish",
    title: {
      uz: "Elektrik, santexnik va boshqa hunarmandlarni topish",
      de: "Elektriker, Installateure und weitere Handwerksbetriebe finden",
    },
    shortTitle: {
      uz: "Hunarmandlar",
      de: "Handwerker",
    },
    description: {
      uz: "Elektrik, isitish tizimi, santexnika, tom yopish yoki boshqa hunarmandchilik xizmatlari uchun hududingizdagi Handwerkskammer qidiruvidan foydalaning.",
      de: "Nutzen Sie für Elektroarbeiten, Heizung, Sanitär, Dacharbeiten oder andere Gewerke die Suche der zuständigen Handwerkskammer.",
    },
    category: "craft",
    icon: "⚒",
    services: [
      {
        uz: "Elektrik va elektr tizimlari",
        de: "Elektroarbeiten und elektrische Anlagen",
      },
      {
        uz: "Santexnika, isitish va suv tizimlari",
        de: "Sanitär-, Heizungs- und Wassersysteme",
      },
      {
        uz: "Ta’mirlash va qurilish ishlari",
        de: "Reparatur- und Bauarbeiten",
      },
      {
        uz: "Tom, deraza, eshik va boshqa hunarmandchilik xizmatlari",
        de: "Dach-, Fenster-, Tür- und weitere Handwerksleistungen",
      },
    ],
    verificationSteps: [
      {
        uz: "Pochta indeksi yoki shaharni kiriting.",
        de: "Geben Sie Postleitzahl oder Ort ein.",
      },
      {
        uz: "Mas’ul Handwerkskammer sahifasini oching.",
        de: "Öffnen Sie die Seite der zuständigen Handwerkskammer.",
      },
      {
        uz: "Kerakli kasb yoki xizmat turi bo‘yicha qidiring.",
        de: "Suchen Sie nach Gewerk oder Leistungsart.",
      },
      {
        uz: "Kamida ikki yoki uchta yozma taklif oling.",
        de: "Holen Sie mindestens zwei oder drei schriftliche Angebote ein.",
      },
      {
        uz: "Narx, material, ish muddati va kafolatni shartnomada belgilang.",
        de: "Regeln Sie Preis, Material, Dauer und Gewährleistung im Vertrag.",
      },
    ],
    importantNotes: [
      {
        uz: "Favqulodda xizmat chaqirishdan oldin yo‘l haqi, minimal tarif va qo‘shimcha to‘lovlarni so‘rang.",
        de: "Fragen Sie vor einem Notdiensteinsatz nach Anfahrt, Mindestpreis und Zuschlägen.",
      },
      {
        uz: "Telefon orqali aytilgan narx bilan yakuniy hisob o‘rtasida farq bo‘lmasligi uchun yozma taklif oling.",
        de: "Lassen Sie sich ein schriftliches Angebot geben, um Abweichungen zur Endrechnung zu vermeiden.",
      },
      {
        uz: "Katta summani ish boshlanishidan oldin to‘liq to‘lamang.",
        de: "Zahlen Sie größere Beträge nicht vollständig vor Arbeitsbeginn.",
      },
    ],
    officialSourceName:
      "Handwerkskammern in Deutschland — Handwerkersuche",
    officialSourceUrl:
      "https://www.handwerkskammer.de/artikel/handwerkersuche-5620,0,15.html",
    sourceDescription: {
      uz: "Rasmiy portal pochta indeksi yoki shahar asosida mas’ul Handwerkskammerni topish va uning mahalliy hunarmand qidiruviga o‘tish imkonini beradi.",
      de: "Das offizielle Portal hilft, anhand von Postleitzahl oder Ort die zuständige Handwerkskammer und deren regionale Betriebssuche zu finden.",
    },
    location: {
      uz: "Butun Germaniya",
      de: "Deutschlandweit",
    },
  },
  {
    id: 6,
    slug: "istemolchi-huquqlari-boyicha-maslahat",
    title: {
      uz: "Iste’molchi huquqlari bo‘yicha mustaqil maslahat",
      de: "Unabhängige Beratung zum Verbraucherschutz",
    },
    shortTitle: {
      uz: "Iste’molchi himoyasi",
      de: "Verbraucherschutz",
    },
    description: {
      uz: "Shartnoma, internet savdosi, mobil aloqa, energiya, sug‘urta yoki boshqa xizmat bilan bog‘liq muammolarda Verbraucherzentrale maslahatidan foydalaning.",
      de: "Nutzen Sie bei Problemen mit Verträgen, Onlinehandel, Mobilfunk, Energie, Versicherungen oder anderen Dienstleistungen die Beratung der Verbraucherzentrale.",
    },
    category: "consumer",
    icon: "✓",
    services: [
      {
        uz: "Shartnoma va obunalarni bekor qilish",
        de: "Kündigung von Verträgen und Abonnements",
      },
      {
        uz: "Internet savdosi va qaytarish masalalari",
        de: "Onlinehandel, Widerruf und Rückgabe",
      },
      {
        uz: "Telefon, internet va energiya shartnomalari",
        de: "Telefon-, Internet- und Energieverträge",
      },
      {
        uz: "Shubhali hisoblar va xizmatlar bo‘yicha maslahat",
        de: "Beratung zu zweifelhaften Rechnungen und Dienstleistungen",
      },
    ],
    verificationSteps: [
      {
        uz: "Muammo turini va Bundeslandni tanlang.",
        de: "Wählen Sie Problemtyp und Bundesland.",
      },
      {
        uz: "Mahalliy Verbraucherzentrale maslahat xizmatini toping.",
        de: "Finden Sie die zuständige Verbraucherzentrale.",
      },
      {
        uz: "Shartnoma, hisob, yozishmalar va to‘lov hujjatlarini tayyorlang.",
        de: "Bereiten Sie Vertrag, Rechnungen, Schriftverkehr und Zahlungsnachweise vor.",
      },
      {
        uz: "Maslahat shakli va narxini oldindan tekshiring.",
        de: "Prüfen Sie Beratungsform und Kosten vorab.",
      },
      {
        uz: "Belgilangan muddatlarni o‘tkazib yubormaslik uchun tez murojaat qiling.",
        de: "Wenden Sie sich frühzeitig an die Beratung, um Fristen nicht zu versäumen.",
      },
    ],
    importantNotes: [
      {
        uz: "Barcha maslahatlar bepul bo‘lavermaydi.",
        de: "Nicht jede Beratung ist kostenlos.",
      },
      {
        uz: "Verbraucherzentrale sudda advokat o‘rnini har doim ham bosa olmaydi.",
        de: "Die Verbraucherzentrale ersetzt in Gerichtsverfahren nicht immer einen Rechtsanwalt.",
      },
      {
        uz: "Bekor qilish, e’tiroz yoki to‘lov muddatlarini tekshirish muhim.",
        de: "Kündigungs-, Widerspruchs- und Zahlungsfristen müssen beachtet werden.",
      },
    ],
    officialSourceName: "Verbraucherzentrale",
    officialSourceUrl:
      "https://www.verbraucherzentrale.de/",
    sourceDescription: {
      uz: "Germaniyaning 16 Bundeslandidagi Verbraucherzentralelar iste’molchilarni onlayn, telefon yoki shaxsan maslahat bilan qo‘llab-quvvatlaydi.",
      de: "Die Verbraucherzentralen der 16 Bundesländer beraten Verbraucher online, telefonisch oder persönlich.",
    },
    location: {
      uz: "Butun Germaniya",
      de: "Deutschlandweit",
    },
  },
];

export function localizeService(
  service: LocalizedServiceItem,
  locale: SupportedContentLocale,
): ServiceItem {
  return {
    ...service,
    title: service.title[locale],
    shortTitle: service.shortTitle[locale],
    description: service.description[locale],
    category: categoryLabels[locale][service.category],
    services: service.services.map((item) => item[locale]),
    verificationSteps: service.verificationSteps.map(
      (item) => item[locale],
    ),
    importantNotes: service.importantNotes.map(
      (item) => item[locale],
    ),
    sourceDescription:
      service.sourceDescription[locale],
    location: service.location[locale],
  };
}

export function getServices(
  locale: SupportedContentLocale,
): ReadonlyArray<ServiceItem> {
  return localizedServices.map((service) =>
    localizeService(service, locale),
  );
}

export function getServiceBySlug(
  slug: string,
  locale: SupportedContentLocale,
): ServiceItem | undefined {
  const service = localizedServices.find(
    (item) => item.slug === slug,
  );

  return service
    ? localizeService(service, locale)
    : undefined;
}

export function getFeaturedService(
  locale: SupportedContentLocale,
): ServiceItem | undefined {
  const service = localizedServices.find(
    (item) => item.featured,
  );

  return service
    ? localizeService(service, locale)
    : undefined;
}
