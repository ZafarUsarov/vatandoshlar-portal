import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import NewsCard from "../../components/cards/NewsCard";
import NewsroomCatalogFilter from "../../components/news/NewsroomCatalogFilter";
import {
  Container,
} from "../../components/ui";
import {
  getPublishedNews,
  getNewsroomFeaturedSlug,
  type PublicNewsLocale,
} from "../../lib/news/public-news-repository";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    await getLocale();

  const t =
    await getTranslations(
      "NewsPage.metadata",
    );

  const title =
    t("title");

  const description =
    t("description");

  const canonicalUrl =
    `/${locale}/news`;

  return {
    title,
    description,
    alternates: {
      canonical:
        canonicalUrl,
      languages: {
        uz: "/uz/news",
        de: "/de/news",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName:
        "UzDe",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
      type: "website",
    },
  };
}

export default async function NewsPage() {
  const locale =
    await getLocale();

  const t =
    await getTranslations(
      "NewsPage",
    );

  const appLocale: PublicNewsLocale =
    locale === "de"
      ? "de"
      : "uz";

  const allNews = await getPublishedNews(appLocale);
  const newsroomSlug = await getNewsroomFeaturedSlug();
  const lead = allNews.find((item) => item.slug === newsroomSlug)
    ?? allNews.find((item) => Boolean(item.imageUrl || item.slug === "vatandoshlar-de-endi-uzde"))
    ?? allNews[0];
  const remaining = allNews.filter((item) => item.slug !== lead?.slug);
  const latest = remaining.slice(0, 2);
  const catalog = allNews;
  const de = appLocale === "de";

  return (
    <>
      <Header />

      <main className="page-main uzde-newsroom-page uzde-newsroom-editorial !text-slate-950 dark:!text-white">
        <Container>
          <header className="pt-8 pb-7 text-center sm:pt-9 sm:pb-8 lg:pt-10 lg:pb-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">UZDE / {de ? "NACHRICHTEN" : "YANGILIKLAR"}</p>
            <h1 className="mx-auto mt-4 max-w-full text-[clamp(2.75rem,8.8vw,8.25rem)] font-semibold leading-[1.02] tracking-[-0.015em] [overflow-wrap:anywhere]">{de ? "Nachrichten." : "Yangiliklar."}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-lg">{de ? "Wichtige Ereignisse. Verlässliche Informationen. Neue Chancen." : "Muhim voqealar. Işonçli ma’lumotlar. Yangi imkoniyatlar."}</p>
          </header>
          {lead && (
            <section aria-labelledby="newsroom-lead-heading" className="border-b border-slate-200 pt-0 pb-10 dark:border-slate-800 sm:pb-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">UZDE / {de ? "TITELTHEMA" : "ASOSIY MAVZU"}</p>
              <Link href={`/news/${lead.slug}`} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500">
                {(lead.imageUrl || lead.slug === "vatandoshlar-de-endi-uzde") ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900 sm:aspect-[16/9] lg:aspect-[2/1]">
                    <Image src={lead.slug === "vatandoshlar-de-endi-uzde" ? "/images/news/uzde-rebranding-2026.webp" : lead.imageUrl!} alt={lead.title} fill priority sizes="(min-width: 1280px) 1152px, 100vw" className="object-cover object-center transition-transform duration-500 motion-safe:group-hover:scale-[1.015]" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/8] items-end bg-slate-100 p-8 dark:bg-slate-900"><span className="text-xs font-semibold uppercase tracking-widest text-slate-500">UZDE / EDITORIAL</span></div>
                )}
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div className="min-w-0 max-w-4xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{lead.category}</p>
                    <h2 id="newsroom-lead-heading" className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">{lead.title}</h2>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">{lead.excerpt}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="mt-1 size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </section>
          )}
          {latest.length > 0 && (
            <section aria-labelledby="newsroom-latest-heading" className="border-b border-slate-200 py-10 dark:border-slate-800 sm:py-14">
              <h2 id="newsroom-latest-heading" className="mb-7 text-sm font-semibold uppercase tracking-[0.14em]">{de ? "NEUESTE NACHRICHTEN" : "SÖNGGI YANGILIKLAR"}</h2>
              <div className="grid items-stretch gap-8 sm:grid-cols-2">
                {latest.map((item, index) => <NewsCard key={item.slug} item={item} index={index} catalog newsroom />)}
              </div>
            </section>
          )}
          <section aria-labelledby="newsroom-all-heading" className="py-10 sm:py-14">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <h2 id="newsroom-all-heading" className="text-sm font-semibold uppercase tracking-[0.14em]">{de ? "ALLE BEITRÄGE" : "BARÇA MATERIALLAR"}</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{t("all.count", { count: catalog.length })}</span>
            </div>
            {catalog.length > 0 ? (
              <NewsroomCatalogFilter
                categories={Array.from(new Set(catalog.map((item) => item.category)))}
                categoryByIndex={catalog.map((item) => item.category)}
                locale={appLocale}
              >
                {catalog.map((item, index) => <NewsCard key={item.slug} item={item} index={index + 2} catalog newsroom />)}
              </NewsroomCatalogFilter>
            ) : (
              <p className="py-8 text-sm text-slate-500 dark:text-slate-400">{de ? "Keine weiteren Beiträge vorhanden." : "Hozircha boshqa materiallar mavjud emas."}</p>
            )}
          </section>
        </Container>
      </main>

      <SectionPromo target="guide" variant="compact" />

      <Footer variant="editorial" />
    </>
  );
}
