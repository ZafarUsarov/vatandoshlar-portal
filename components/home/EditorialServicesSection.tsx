import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const entries = [
  {
    slug: "bewerbung",
    categoryUz: "KARYERA",
    categoryDe: "KARRIERE",
    uz: "Rezyume va işga ariza",
    de: "Lebenslauf und Bewerbung",
    descUz: "Nemis standartlariga mos CV, motivatsion xat va ariza hujjatlari.",
    descDe: "Lebenslauf, Anschreiben und Bewerbungsunterlagen.",
  },
  {
    slug: "academic-documents",
    categoryUz: "TA’LIM",
    categoryDe: "BILDUNG",
    uz: "Akademik hujjatlar",
    de: "Akademische Unterlagen",
    descUz: "Universitet hujjatlarini tartibga kelti­riş va jarayon böyiça yönal­tiriş.",
    descDe: "Unterlagen für Hochschulbewerbungen vorbereiten und formal prüfen.",
  },
  {
    slug: "web-development",
    categoryUz: "WEB",
    categoryDe: "WEB",
    uz: "Web-sayt yaratiş",
    de: "Webentwicklung",
    descUz: "Şaxsiy loyihalar va bizneslar uçun zamonaviy web-saytlar.",
    descDe: "Moderne Websites für Projekte, Fachkräfte und Unternehmen.",
  },
  {
    slug: "it-support",
    categoryUz: "IT",
    categoryDe: "IT",
    uz: "IT va texnik yordam",
    de: "IT und technischer Support",
    descUz: "Microsoft 365, kompyuterlar, serverlar va tarmoqlar böyiça yordam.",
    descDe: "Unterstützung bei Microsoft 365, Systemen, Servern und Netzwerken.",
  },
] as const;

export default async function EditorialServicesSection() {
  const de = (await getLocale()) === "de";

  return (
    <section
      aria-labelledby="uzde-services-title"
      className="border-b border-[#DADADA] bg-[#F7F7F7] px-[clamp(16px,3.3vw,112px)] py-12 text-[#202020] sm:py-16 lg:py-20 dark:border-[var(--uzde-home-border)] dark:bg-[var(--uzde-home-surface)] dark:text-zinc-100"
    >
      <div className="mx-auto max-w-[var(--uzde-layout-width)]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">UZDE / KASBIY XIZMATLAR</p>
        <h2
          id="uzde-services-title"
          className="mx-auto mt-5 w-full text-center text-[clamp(24px,3vw,64px)] font-semibold leading-[1.05] tracking-[-0.01em] [word-spacing:0.08em] xl:whitespace-nowrap"
        >
          {de ? "IHR ZIEL. UNSERE LÖSUNG." : "SIZNING MAQSADINGIZ. BIZNING YEÇIMIMIZ."}
        </h2>
        <p className="mx-auto mt-6 max-w-[65ch] text-center text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
          {de
            ? "Praktische Dienstleistungen rund um Karriere, Bildung und digitale Technologien."
            : "Germaniyada karyera, ta’lim va raqamli texnologiyalar böyiça amaliy xizmatlar."}
        </p>

        <div className="mt-9 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {entries.map((entry, index) => (
            <Link
              key={entry.slug}
              href={`/uzde-services/${entry.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:border-[var(--uzde-home-border)] dark:bg-[var(--uzde-home-card)] dark:hover:border-zinc-600"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={`/images/home/services/${entry.slug}-v2.webp`}
                  alt={de ? entry.de : entry.uz}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
              </div>
              <div className="flex flex-col p-5 sm:p-6">
                <p className="text-xs font-medium tracking-[0.14em] text-teal-700 dark:text-teal-400">
                  {String(index + 1).padStart(2, "0")} / {de ? entry.categoryDe : entry.categoryUz}
                </p>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="min-w-0 text-[clamp(20px,1.6vw,28px)] font-semibold leading-tight tracking-[-0.03em]">
                    {de ? entry.de : entry.uz}
                  </h3>
                  <span aria-hidden="true" className="shrink-0 text-2xl leading-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {de ? entry.descDe : entry.descUz}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/uzde-services"
          className="mt-10 inline-flex min-h-11 items-center border-b border-current text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600"
        >
          {de ? "Alle Dienstleistungen" : "Barça xizmatlar"} <span aria-hidden="true" className="ml-3">↗</span>
        </Link>
      </div>
    </section>
  );
}
