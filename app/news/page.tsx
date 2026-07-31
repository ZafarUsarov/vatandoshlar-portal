import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import NewsCard from "../../components/NewsCard";
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

export const metadata: Metadata = {
  title:
    "Yangiliklar va foydali ma’lumotlar | Vatandoshlar.de",
  description:
    "Germaniyadagi o‘zbekistonliklar uchun rasmiy manbalarga asoslangan integratsiya, ish, ta’lim va konsullik ma’lumotlari.",
};

export default function NewsPage() {
  const allNews = getLatestNews();
  const featuredNews = getFeaturedNews();

  return (
    <>
      <Header />

      <main className="page-main">
        <PageHero
          eyebrow="Vatandoshlar.de"
          title="Yangiliklar va foydali ma’lumotlar"
          description={
            <>
              Germaniyada yashash, o‘qish va ishlashga oid materiallar faqat
              tekshiriladigan rasmiy manbalar asosida tayyorlanadi.
            </>
          }
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
                        Tavsiya etilgan material
                      </Badge>

                      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-400">
                        {featuredNews.contentType}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-300">
                        Rasmiy manba
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
                        className="transition-colors hover:text-brand"
                      >
                        {featuredNews.title}
                      </Link>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-text-secondary">
                      {featuredNews.excerpt}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                      <ButtonLink
                        href={`/news/${featuredNews.slug}`}
                        size="lg"
                      >
                        Batafsil o‘qish
                      </ButtonLink>

                      <p className="text-sm text-text-muted">
                        Tekshirildi:{" "}
                        <time dateTime={featuredNews.verifiedAt}>
                          {formatNewsDate(
                            featuredNews.verifiedAt,
                          )}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Container>
          </Section>
        )}

        <Section
          tone="page"
          spacing="xl"
          aria-labelledby="all-news-heading"
        >
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="page-eyebrow">
                  Barcha materiallar
                </p>

                <h2
                  id="all-news-heading"
                  className="section-title mt-3"
                >
                  Tekshirilgan ma’lumotlar
                </h2>

                <p className="section-description mt-4">
                  Integratsiya, ish, ta’lim, huquqiy masalalar va konsullik
                  xizmatlariga oid ishonchli materiallarni bir joyda toping.
                </p>
              </div>

              <p className="shrink-0 text-sm text-text-muted">
                Jami {allNews.length} ta material
              </p>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {allNews.map((item) => (
                <NewsCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <footer className="border-t border-border-default bg-surface py-10 text-text-muted transition-colors duration-300">
        <Container className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vatandoshlar.de</p>

          <p>
            Germaniyadagi o‘zbekistonliklar uchun raqamli platforma
          </p>
        </Container>
      </footer>
    </>
  );
}