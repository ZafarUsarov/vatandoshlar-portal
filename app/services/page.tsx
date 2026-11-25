import Image from "next/image";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ServicesCatalog from "../../components/services/ServicesCatalog";
import ServicesShareButton from "../../components/services/ServicesShareButton";
import { imprint } from "../../data/legal/imprint";
import { getActiveFeaturedServices } from "../../lib/services/featured-services";
import type { SupportedContentLocale } from "../../types/service";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedContentLocale;
  return {
    title: locale === "uz" ? "Xizmatlar | UzDe" : "Dienstleistungen | UzDe",
    description: locale === "uz" ? "UzDe xizmatlar konsepsiyasi: karyera, ta’lim, web va IT böyiça 20 ta yönaliş." : "20 Dienstleistungskonzepte rund um Karriere, Bildung, Web und IT.",
    alternates: { canonical: `/${locale}/services`, languages: { uz: "/uz/services", de: "/de/services" } },
  };
}

export default async function ServicesPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const uz = locale === "uz";
  const featured = getActiveFeaturedServices(new Date());
  const primary = featured[0];
  const groups = uz ? [
    { id: "web", title: "Web va raqamli xizmatlar", summary: "Biznes va şaxsiy loyihalar uçun raqamli imkoniyatlar.", items: ["Web-sayt yaratiş", "Onlayn dökon yaratiş", "Brending va grafik dizayn", "SEO va Google Business Profile", "Biznes jarayonlarini avtomatlaştiriş"] },
    { id: "it", title: "IT va texnik yordam", summary: "Raqamli iş muhitini sozlaş va saqlaş.", items: ["Kompyuter va dasturlarni sozlaş", "Microsoft 365 va Google Workspace", "E-mail va domen sozlaş", "Web-saytlarga texnik xizmat", "Ma’lumotlarni zaxiralaş va IT xavfsizligi"] },
    { id: "career", title: "Karyera va iş", summary: "Kasbiy rivojlaniş va ariza jarayonlariga tayyorgarlik.", items: ["CV va Bewerbung tayyorlaş", "İş qidirişda yordam", "İş suhbatiga tayyorgarlik", "LinkedIn va XING profilini optimallaştiriş", "Ausbildung va Praktikum arizalari"] },
    { id: "education", title: "Ta’lim va hujjatlar", summary: "Öqiş va akademik jarayonlarni rejalashtiriş.", items: ["Universitetga ariza tayyorlaş", "Studienkolleg va stipendiya arizalari", "Motivatsion xat va akademik CV", "Hujjatlarni tartibga soliş", "Anerkennung jarayoni böyiça taşkiliy yordam"] },
  ] : [
    { id: "web", title: "Web und digitale Dienste", summary: "Digitale Lösungen für Projekte und Unternehmen.", items: ["Websites entwickeln", "Onlineshops erstellen", "Branding und Grafikdesign", "SEO und Google Business Profile", "Geschäftsprozesse automatisieren"] },
    { id: "it", title: "IT und technischer Support", summary: "Digitale Arbeitsumgebungen einrichten und pflegen.", items: ["Computer und Software einrichten", "Microsoft 365 und Google Workspace", "E-Mail und Domains einrichten", "Technische Website-Betreuung", "Datensicherung und IT-Sicherheit"] },
    { id: "career", title: "Karriere und Beruf", summary: "Bewerbung und berufliche Entwicklung.", items: ["Lebenslauf und Bewerbung erstellen", "Unterstützung bei der Jobsuche", "Vorbereitung auf Vorstellungsgespräche", "LinkedIn- und XING-Profil optimieren", "Bewerbungen für Ausbildung und Praktikum"] },
    { id: "education", title: "Bildung und Dokumente", summary: "Studium und Unterlagen strukturieren.", items: ["Hochschulbewerbung vorbereiten", "Studienkolleg- und Stipendienbewerbungen", "Motivationsschreiben und akademischer Lebenslauf", "Unterlagen strukturieren", "Organisatorische Hilfe bei Anerkennungsverfahren"] },
  ];
  return (
    <><Header />
      <main className="min-h-screen bg-[#F7F7F7] pt-20 text-[#202020] dark:bg-[#111419] dark:text-zinc-100">
        <section aria-labelledby="featured-title" className="px-[clamp(16px,3.3vw,112px)] pb-12 pt-10 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-[var(--uzde-layout-width)]">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em]"><span className="text-teal-700 dark:text-teal-300">UZDE / {uz ? "XIZMATLAR" : "DIENSTLEISTUNGEN"}</span></div>
            <div className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 sm:bg-zinc-900 sm:min-h-[610px] sm:justify-end lg:min-h-[680px]">
              <div className="relative aspect-video w-full sm:absolute sm:inset-0 sm:-z-20 sm:aspect-auto">
                <Image src={primary.image} alt={primary.imageAlt[locale]} fill priority sizes="(max-width: 639px) 100vw, 100vw" className="object-contain object-center sm:object-cover" />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden sm:block bg-gradient-to-t from-black/90 via-black/50 to-transparent sm:bg-gradient-to-r sm:from-black/85 sm:via-black/50 sm:to-transparent" />
              <div className="relative z-10 max-w-4xl px-5 pb-5 pt-5 text-zinc-950 dark:text-white sm:p-12 sm:text-white lg:p-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300 sm:text-xs sm:tracking-[0.2em] sm:text-teal-200">{uz ? "ASOSIY YÖNALIŞ / KONSEPT" : "FEATURED / KONZEPT"}</p>
                <h1 id="featured-title" className="mt-2 break-words text-[clamp(1.65rem,7vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.045em] sm:mt-5 sm:text-[clamp(2.5rem,4.8vw,5.2rem)] sm:leading-[1.05] sm:tracking-[-0.055em] xl:whitespace-nowrap">{primary.title[locale]}</h1>
                <p className="mt-3 max-w-[58ch] text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:mt-6 sm:text-zinc-100 sm:text-lg sm:leading-7">{primary.description[locale]}</p>
                <a href={primary.ctaTarget} className="mt-3 inline-flex min-h-11 items-center gap-5 border-b border-teal-700 text-sm font-semibold text-teal-800 transition-colors hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 dark:border-teal-300 dark:text-teal-300 dark:hover:text-teal-200 sm:mt-8 sm:min-h-12 sm:border-teal-200 sm:text-white sm:hover:text-teal-200 sm:focus-visible:outline-white motion-reduce:transition-none">{primary.ctaLabel[locale]} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            {featured.length > 1 && <nav aria-label={uz ? "Asosiy xizmatlar" : "Featured Services"} className="mt-4 flex flex-wrap gap-4">{featured.map((item) => <a key={item.id} href={item.ctaTarget} className="border-b border-zinc-400 py-2 text-sm font-medium hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:hover:text-teal-300">{item.title[locale]} ↗</a>)}</nav>}
          </div>
        </section>
        <section id="services-catalog" aria-labelledby="services-catalog-title" className="scroll-mt-28 border-t border-zinc-300 px-[clamp(16px,3.3vw,112px)] py-10 sm:py-20 dark:border-zinc-700">
          <div className="mx-auto max-w-[var(--uzde-layout-width)]">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">{uz ? "XIZMATLAR / 20 YÖNALIŞ" : "DIENSTLEISTUNGEN / 20 BEREICHE"}</p>
            <div className="relative">
              <div className="absolute right-0 top-0 z-10">
                <ServicesShareButton locale={locale} />
              </div>
              <h2 id="services-catalog-title" className="mx-auto mt-4 max-w-[calc(100%-3.5rem)] text-center text-[clamp(2rem,8vw,3rem)] font-semibold leading-[1.08] tracking-[-0.05em] sm:mt-5 sm:max-w-none sm:text-[clamp(2.5rem,5vw,5rem)] sm:leading-[1.05]">{uz ? "Barça xizmatlar" : "Alle Dienstleistungen"}</h2>
            </div>
            <p className="mx-auto mb-8 mt-4 max-w-[72ch] text-center text-sm leading-6 sm:mb-10 sm:mt-5 sm:text-base sm:leading-7 text-zinc-600 dark:text-zinc-300">{uz ? "Bu 20 yönaliş hozirça xizmat konsepsiyasidir. Tasdiqlangan buyurtma yoki kafolat mavjud emas." : "Diese 20 Bereiche sind Konzepte, keine bestätigten oder buchbaren Angebote."}</p>
              <ServicesCatalog groups={groups} locale={locale} contactEmail={imprint.email} />
              <section aria-labelledby="services-contact-title" className="mt-20 border-t border-zinc-300 pb-4 pt-12 dark:border-zinc-700 sm:mt-28 sm:pt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">{uz ? "UZDE / BOǴLANIŞ" : "UZDE / KONTAKT"}</p>
                <div className="mt-5 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                  <div className="max-w-3xl">
                    <h2 id="services-contact-title" className="text-[clamp(2rem,6vw,4rem)] font-semibold leading-[1.1] tracking-[-0.05em]">{uz ? "Loyihangizni birgalikda boşlaymiz." : "Starten wir Ihr Projekt gemeinsam."}</h2>
                    <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">{uz ? "Web-sayt, IT yeçimlari, karyera yoki hujjatlar böyiça savolingiz bormi? Bizga yozing." : "Fragen zu Websites, IT-Lösungen, Karriere oder Dokumenten? Schreiben Sie uns."}</p>
                  </div>
                  <a href={`mailto:${imprint.email}?subject=${encodeURIComponent(uz ? "UzDe — Xizmatlar böyiça murojaat" : "UzDe — Anfrage zu Dienstleistungen")}`} className="inline-flex min-h-12 shrink-0 items-center gap-5 border-b border-teal-700 pb-2 text-sm font-semibold text-teal-800 transition-colors hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 dark:border-teal-300 dark:text-teal-300 dark:hover:text-teal-200">{uz ? "Email orqali boǵlaniş" : "Kontakt per E-Mail"}<span aria-hidden="true">↗</span></a>
                </div>
              </section>
          </div>
        </section>
      </main><Footer /></>
  );
}
