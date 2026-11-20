export type FeaturedService = Readonly<{
  id: string;
  serviceId: string;
  title: { uz: string; de: string };
  description: { uz: string; de: string };
  image: string;
  imageAlt: { uz: string; de: string };
  ctaLabel: { uz: string; de: string };
  ctaTarget: string;
  activeFrom: string;
  activeUntil: string;
  priority: number;
}>;

// UTC calendar dates, inclusive. A scheduled item is shown for the entire UTC day.
// Images are existing local assets already used by the home service cards.
export const featuredServices: ReadonlyArray<FeaturedService> = [
  {
    id: "featured-web", serviceId: "web-development",
    title: { uz: "Professional web-sayt yaratiş", de: "Professionelle Websites entwickeln" },
    description: { uz: "Şaxsiy loyiha va bizneslar uçun zamonaviy raqamli yeçimlar konsepsiyasi.", de: "Digitale Weblösungen für Projekte und Unternehmen – als Angebotskonzept." },
    image: "/images/services/featured-web-editorial.jpg",
    imageAlt: { uz: "Web-sayt yaratiş uçun professional iş muhiti", de: "Professioneller Arbeitsplatz für Webentwicklung" },
    ctaLabel: { uz: "Batafsil", de: "Mehr erfahren" },
    ctaTarget: "#services-catalog", activeFrom: "2026-11-16", activeUntil: "2026-11-22", priority: 10,
  },
  {
    id: "featured-career", serviceId: "bewerbung",
    title: { uz: "CV va Bewerbung hujjatlarini tayyorlaş", de: "Lebenslauf und Bewerbungsunterlagen" },
    description: { uz: "Nemis standartlariga mos ariza hujjatlari böyiça taklif etilayotgan yönaliş.", de: "Konzept für Bewerbungsunterlagen nach deutschen Standards." },
    image: "/images/home/services/bewerbung-v2.webp",
    imageAlt: { uz: "Stol ustidagi CV va ariza hujjatlari", de: "Lebenslauf und Bewerbungsunterlagen auf einem Tisch" },
    ctaLabel: { uz: "Batafsil", de: "Mehr erfahren" },
    ctaTarget: "#services-catalog", activeFrom: "2026-11-23", activeUntil: "2026-11-29", priority: 10,
  },
];

export function getActiveFeaturedServices(now: Date): ReadonlyArray<FeaturedService> {
  const today = now.toISOString().slice(0, 10);
  const active = featuredServices.filter((item) => item.activeFrom <= today && today <= item.activeUntil);
  const candidates = active.length > 0 ? active : [featuredServices[0]];
  return [...candidates].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
}
