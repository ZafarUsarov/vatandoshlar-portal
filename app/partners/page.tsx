import mobile from "@/components/partners/PartnersMobile.module.css";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnersAccordion from "@/components/partners/PartnersAccordion";
import EcosystemGallery from "@/components/partners/EcosystemGallery";
import PartnersNetwork from "@/components/partners/PartnersNetwork";
import PartnersAudience from "@/components/partners/PartnersAudience";
import PartnersContact from "@/components/partners/PartnersContact";
import { content } from "@/data/partners/content";
import { Inter_Tight } from "next/font/google";
import { imprint } from "@/data/legal/imprint";

const heading = Inter_Tight({ subsets: ["latin", "latin-ext"], weight: "600", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const de = (await getLocale()) === "de";
  const locale = de ? "de" : "uz";
  const title = de ? "Partnerschaft mit UzDe" : "UzDe bilan hamkorlik";
  const description = de ? "Entdecken Sie Möglichkeiten für eine Zusammenarbeit mit UzDe." : "UzDe bilan hamkorlik imkoniyatlarini keşf eting.";
  return { title, description, alternates: { canonical: `/${locale}/partners`, languages: { uz: "/uz/partners", de: "/de/partners" } } };
}

export default async function PartnersPage() {
  const de = (await getLocale()) === "de";
  const copy = content[de ? "de" : "uz"];
  const subject = de ? "Partnerschaftsanfrage an UzDe" : "UzDe bilan hamkorlik taklifi";
  const emailHref = `mailto:${imprint.email}?subject=${encodeURIComponent(subject)}`;
  return (
    <div className="min-h-screen bg-[var(--uzde-editorial-bg)] text-zinc-900 dark:bg-[var(--uzde-home-surface,#111419)] dark:text-white">
      <Header />
      <main className={`${mobile.page} mx-auto w-full max-w-[var(--uzde-layout-width)] px-[clamp(16px,3.3vw,112px)] pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pt-32`}>
        <PartnersHero locale={de ? "de" : "uz"} email={imprint.email} emailHref={emailHref} />
        <section aria-labelledby="partners-ecosystem" className={`${mobile.ecosystem} mt-5 sm:mt-7`}>
          <h2 id="partners-ecosystem" className={`${heading.className} text-[clamp(28px,3.5vw,56px)] font-semibold leading-tight tracking-tight`}>{copy.ecosystemTitle}</h2>
          <p className="mb-4 mt-1 text-base sm:text-lg text-[var(--text-secondary)]">{copy.ecosystemDescription}</p>
          <EcosystemGallery brands={copy.brands} caption={copy.internal} pause={copy.pause} play={copy.play}/>
        </section>
        <section aria-labelledby="partners-benefits" className={`${mobile.benefits} mt-8 w-full sm:mt-10 lg:mt-12`}>
          <h2 id="partners-benefits" className={`${heading.className} mb-5 text-left text-[30px] font-semibold leading-tight tracking-tight sm:mb-7 sm:text-[40px] lg:mb-8 lg:text-[clamp(48px,3.5vw,56px)]`}>{copy.benefitsTitle}</h2>
          <PartnersAccordion items={copy.benefits} />
        </section>

        <div className={`${mobile.network} mt-10`}><PartnersNetwork title={copy.networkTitle} emptyTitle={copy.networkEmptyTitle} description={copy.networkDescription} action={copy.action} emailHref={emailHref} headingClassName={heading.className}/></div>
        <PartnersAudience title={copy.audienceTitle} description={copy.audienceDescription} items={copy.audience} headingClassName={heading.className} />
        <PartnersContact title={copy.contactTitle} description={copy.contactDescription} action={copy.contact} emailHref={emailHref} email={imprint.email}/>
      </main>
      <Footer />
    </div>
  );
}
