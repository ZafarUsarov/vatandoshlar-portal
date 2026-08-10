import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import NewsCard from "../../components/cards/NewsCard";
import {
  Badge,
  ButtonLink,
  Container,
  PageHero,
  Section,
} from "../../components/ui";
import {
  formatNewsDate,
  getFeaturedNews,
  getLatestNews,
} from "../../data/news";
import { Link } from "../../i18n/navigation";
import type { NewsItem } from "../../types/news";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("NewsPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/news`,
      languages: {
        uz: "/uz/news",
        de: "/de/news",
      },
    },
  };
}

export default async function NewsPage() {
  const locale = await getLocale();
  const t = await getTranslations("NewsPage");

  const localizeItem = (item: NewsItem): NewsItem => {
    const key = String(item.id);

    return {
      ...item,
      title: t(`items.${key}.title`),
      excerpt: t(`items.${key}.excerpt`),
      category: t(`items.${key}.category`),
      contentType: t(`items.${key}.contentType`) as NewsItem["contentType"],
      readingTime: t(`items.${key}.readingTime`),
      sourceLanguage: t(`items.${key}.sourceLanguage`),
      location: item.location ? t(`items.${key}.location`) : undefined,
    };
  };

  const allNews = getLatestNews().map(localizeItem);
  const featuredBase = getFeaturedNews();
  const featuredNews = featuredBase ? localizeItem(featuredBase) : undefined;

  return (
    <>
      <Header />

      <main className="page-main">
        <PageHero
          eyebrow="Vatandoshlar.de"
          title={t("hero.title")}
          description={t("hero.description")}
        />

        {featuredNews && (
          <Section
            tone="page"
            spacing="lg"
            aria-labelledby="featured-news-heading"
          >
            <Container>
              <article className="overflow-hidden rounded-[2rem] border border-border-default bg-surface shadow-md transition-colors duration-300">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex min-h-80 flex-col justify-between bg-slate-950 p-8 text-white sm:p-12 lg:min-h-[460px] dark:bg-black">
                    <div>
                      <Badge
                        variant="neutral"
                        className="border-white/10 bg-white/10 text-white"
                      >
                        {t("featured.badge")}
                      </Badge>

                      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-400">
                        {featuredNews.contentType}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-300">
                        {t("featured.officialSource")}
                      </p>

                      <p className="mt-2 text-lg font-semibold text-white">
                        {featuredNews.sourceName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center bg-surface p-8 sm:p-12 lg:p-14">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                      <span className="font-semibold text-brand">
                        {featuredNews.category}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{featuredNews.readingTime}</span>

                      {featuredNews.location && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{featuredNews.location}</span>
                        </>
                      )}
                    </div>

                    <h2
                      id="featured-news-heading"
                      className="mt-6 text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl"
                    >
                      <Link
                        href={`/news/${featuredNews.slug}`}
                        className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
                      >
                        {featuredNews.title}
                      </Link>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-text-secondary">
                      {featuredNews.excerpt}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <ButtonLink href={`/news/${featuredNews.slug}`} size="lg">
                        {t("featured.readMore")}
                      </ButtonLink>

                      <p className="text-sm text-text-muted">
                        {t("featured.verified")}{" "}
                        <time dateTime={featuredNews.verifiedAt}>
                          {formatNewsDate(featuredNews.verifiedAt, locale)}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Container>
          </Section>
        )}

        <Section tone="page" spacing="xl" aria-labelledby="all-news-heading">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="page-eyebrow">{t("all.eyebrow")}</p>
                <h2 id="all-news-heading" className="section-title mt-3">
                  {t("all.title")}
                </h2>
                <p className="section-description mt-4">
                  {t("all.description")}
                </p>
              </div>

              <p className="shrink-0 text-sm text-text-muted">
                {t("all.count", { count: allNews.length })}
              </p>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {allNews.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <SectionPromo target="services" />

      <Footer />
    </>
  );
}
