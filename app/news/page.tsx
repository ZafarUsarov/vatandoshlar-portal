import Image from "next/image";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import NewsCard from "../../components/cards/NewsCard";
import BrandName from "../../components/ui/BrandName";
import {
  Container,
  PageHero,
  Section,
} from "../../components/ui";
import {
  getPublishedNews,
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

  return (
    <>
      <Header />

      <main className="page-main">
        <div className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          >
            <Image
              src="/images/news/news-master-visual.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={88}
              className="object-cover object-[72%_center] opacity-42 sm:object-[70%_center] sm:opacity-50 lg:object-[68%_center] lg:opacity-62 dark:opacity-34 dark:sm:opacity-42 dark:lg:opacity-52"
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,250,252,0.995)_0%,rgba(248,250,252,0.97)_34%,rgba(248,250,252,0.84)_52%,rgba(248,250,252,0.46)_72%,rgba(248,250,252,0.18)_100%)] dark:bg-[linear-gradient(90deg,rgba(2,6,23,0.995)_0%,rgba(2,6,23,0.97)_34%,rgba(2,6,23,0.86)_52%,rgba(2,6,23,0.58)_72%,rgba(2,6,23,0.30)_100%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(248,250,252,0.06),rgba(248,250,252,0.44))] dark:bg-[linear-gradient(to_bottom,rgba(2,6,23,0.04),rgba(2,6,23,0.28))]" />

            <div className="absolute -left-40 top-8 size-[32rem] rounded-full bg-cyan-200/16 blur-[120px] sm:size-[38rem] lg:size-[44rem] dark:bg-cyan-400/[0.025]" />
            <div className="absolute -right-32 -top-20 size-[34rem] rounded-full bg-emerald-200/14 blur-[130px] sm:size-[40rem] lg:size-[46rem] dark:bg-emerald-400/[0.025]" />

            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-slate-50/55 dark:to-slate-950/30" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.18),rgba(16,185,129,0.16),rgba(56,189,248,0.14),transparent)]" />
          </div>

          <PageHero
            eyebrow={<span className="normal-case"><BrandName /></span>}
            title={t(
              "hero.title",
            )}
            description={t(
              "hero.description",
            )}
            actions={
              <div
                className="flex flex-wrap items-center gap-2"
                aria-label={
                  locale === "de"
                    ? "Informationsmerkmale"
                    : "Ma’lumot xususiyatlari"
                }
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/85 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-[0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:shadow-none">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-emerald-500"
                  />
                  {locale === "de"
                    ? "Offizielle Quellen"
                    : "Rasmiy manbalar"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface/85 px-3 py-1.5 text-xs font-semibold text-text-secondary shadow-[0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-sm dark:shadow-none">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-3.5 text-brand"
                  >
                    <path
                      d="m6.75 10 2.1 2.1 4.4-4.7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {locale === "de"
                    ? "Geprüft"
                    : "Tekshirilgan"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-border-default bg-surface/85 px-3 py-1.5 text-xs font-semibold text-text-secondary shadow-[0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-sm dark:shadow-none">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="size-3.5 text-brand"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M3.4 10h13.2M10 3c1.7 1.9 2.6 4.2 2.6 7S11.7 15.1 10 17M10 3C8.3 4.9 7.4 7.2 7.4 10s.9 5.1 2.6 7"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>

                  {locale === "de"
                    ? "Deutschland"
                    : "Germaniya"}
                </span>
              </div>
            }
            className="relative z-10 !bg-transparent !pb-6 sm:!pb-8 lg:!pb-10"
            contentClassName="relative z-10"
          />
        </div>


        <Section
          tone="page"
          spacing="none"
          className="pb-12 pt-5 sm:pb-16 sm:pt-7"
          aria-labelledby="all-news-heading"
        >
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="page-eyebrow">
                  {t(
                    "all.eyebrow",
                  )}
                </p>

                <h2
                  id="all-news-heading"
                  className="section-title mt-2"
                >
                  {t(
                    "all.title",
                  )}
                </h2>

                <p className="section-description mt-2">
                  {t(
                    "all.description",
                  )}
                </p>
              </div>

              <p className="shrink-0 text-sm text-text-muted">
                {t(
                  "all.count",
                  {
                    count:
                      allNews.length,
                  },
                )}
              </p>
            </div>

            {allNews.length > 0 ? (
              <div className="mt-6 space-y-5">
                <div className="grid gap-4">
                  {allNews.slice(0, 2).map((item, index) => (
                    <NewsCard key={item.slug} item={{
                        ...item,
                        imageUrl:
                          item.slug === "vatandoshlar-de-endi-uzde"
                            ? "/images/brand/uzde/uzde-logo-original-transparent.webp"
                            : item.imageUrl,
                      }} index={index} horizontal />
                  ))}
                </div>
                {allNews.length > 2 && (
                  <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {allNews.slice(2).map((item, index) => (
                      <NewsCard key={item.slug} item={item} index={index + 2} catalog />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-border-default bg-surface p-8 text-center sm:p-10">
                <p className="text-base font-semibold text-text-primary">
                  {locale === "de"
                    ? "Derzeit sind keine veröffentlichten Nachrichten vorhanden."
                    : "Hozircha e’lon qilingan yangiliklar mavjud emas."}
                </p>
              </div>
            )}
          </Container>
        </Section>
      </main>

      <SectionPromo target="services" />

      <Footer />
    </>
  );
}
