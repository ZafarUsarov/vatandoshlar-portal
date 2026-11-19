import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, BookOpen, ExternalLink, Clock3 } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import NewsShareActions from "../../../components/news/NewsShareActions";
import Header from "../../../components/Header";
import ContentViewTracker from "../../../components/content-views/ContentViewTracker";
import ViewCount from "../../../components/content-views/ViewCount";
import NewsCard from "../../../components/cards/NewsCard";
import BrandName from "../../../components/ui/BrandName";
import { Link } from "../../../i18n/navigation";
import { formatNewsDate } from "../../../lib/news/format-news-date";
import {
  getPublishedNewsBySlug,
  getRelatedPublishedNews,
  type PublicNewsLocale,
} from "../../../lib/news/public-news-repository";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic =
  "force-dynamic";

const baseUrl =
  "https://uzde.de";

function serializeStructuredData(
  data: object,
): string {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  );
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const locale =
    await getLocale();

  const appLocale: PublicNewsLocale =
    locale === "de"
      ? "de"
      : "uz";

  const t =
    await getTranslations(
      "NewsDetailPage",
    );

  const article =
    await getPublishedNewsBySlug(
      slug,
      appLocale,
    );

  if (!article) {
    return {
      title: t(
        "metadata.notFound",
      ),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    article.title;

  const canonicalUrl =
    `/${locale}/news/${article.slug}`;

  const imageUrl = article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026"
    ? `${baseUrl}/images/news/medical-recognition-2026.webp`
    : article.imageUrl ? new URL(article.imageUrl, baseUrl).toString() : null;

  return {
    title,
    description:
      article.excerpt,
    alternates: {
      canonical:
        canonicalUrl,
      languages: {
        uz:
          `/uz/news/${article.slug}`,
        de:
          `/de/news/${article.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title:
        article.title,
      description:
        article.excerpt,
      url:
        canonicalUrl,
      siteName:
        "UzDe",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
      modifiedTime:
        article.updatedAt,
      ...(imageUrl ? { images: [{ url: imageUrl, alt: article.title }] } : {}),
      ...(article.publishedAt
        ? {
            publishedTime:
              article.publishedAt,
          }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      ...(imageUrl ? { images: [imageUrl] } : {}),
      title:
        article.title,
      description:
        article.excerpt,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } =
    await params;

  const locale =
    await getLocale();

  const appLocale: PublicNewsLocale =
    locale === "de"
      ? "de"
      : "uz";

  const t =
    await getTranslations(
      "NewsDetailPage",
    );

  const [
    article,
    relatedNews,
  ] = await Promise.all([
    getPublishedNewsBySlug(
      slug,
      appLocale,
    ),
    getRelatedPublishedNews(
      slug,
      appLocale,
      3,
    ),
  ]);

  if (!article) {
    notFound();
  }

  const isPegasus = article.slug === "pegasus-ozbekiston-germaniya-aviachiptalar-2026";
  const articleUrl =
    `${baseUrl}/${locale}/news/${article.slug}`;

  const newsArticleStructuredData = {
    "@context":
      "https://schema.org",
    "@type":
      "NewsArticle",
    headline:
      article.title,
    description:
      article.excerpt,
    ...(article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" ? { image: `${baseUrl}/images/news/medical-recognition-2026.webp` } : article.imageUrl ? { image: new URL(article.imageUrl, baseUrl).toString() } : {}),
    url:
      articleUrl,
    mainEntityOfPage: {
      "@type":
        "WebPage",
      "@id":
        articleUrl,
    },
    inLanguage:
      locale === "de"
        ? "de-DE"
        : "uz-UZ",
    dateModified:
      article.updatedAt,
    ...(article.publishedAt
      ? {
          datePublished:
            article.publishedAt,
        }
      : {}),
    publisher: {
      "@type":
        "Organization",
      name:
        "UzDe",
      url:
        baseUrl,
      logo: {
        "@type":
          "ImageObject",
        url:
          `${baseUrl}/images/brand/uzde/uzde-icon-512.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
              newsArticleStructuredData,
            ),
        }}
      />

      <Header />

      <ContentViewTracker
        contentType="news"
        contentId={article.id}
      />

      <main className="min-h-screen bg-[#f7f7f7] pt-20 text-zinc-950 transition-colors dark:bg-[var(--uzde-home-surface,#111419)] dark:text-zinc-100">
        <article className="mx-auto max-w-6xl px-5 pb-16 pt-7 sm:px-7 sm:pt-10 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-zinc-600 transition-colors hover:border-emerald-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white">
            ← {t("backToAll")}
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-300 pt-5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            <span className="border-l-2 border-emerald-600 pl-3 text-zinc-800 dark:text-zinc-200">{article.category}</span>
            <span className="text-zinc-500 dark:text-zinc-400">{article.contentType}</span>

            <time className="ml-auto" dateTime={article.verifiedAt}>{formatNewsDate(article.verifiedAt, locale)}</time>
          </div>

          <h1 className="mt-7 max-w-5xl text-[clamp(2.4rem,5vw,5.5rem)] font-semibold leading-[1.06] tracking-[-0.045em]">{article.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl dark:text-zinc-300">{article.excerpt}</p>

          {(article.imageUrl || article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" || article.slug === "vatandoshlar-de-endi-uzde") && (
            <div className={`relative mt-9 aspect-[16/9] overflow-hidden rounded-sm bg-zinc-200 dark:bg-zinc-800 ${article.slug === "vatandoshlar-de-endi-uzde" ? "" : "sm:aspect-[16/7]"}`}>
              <Image
                src={article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" ? "/images/news/medical-recognition-2026.webp" : article.slug === "vatandoshlar-de-endi-uzde" ? "/images/news/uzde-rebranding-2026.webp" : article.imageUrl!}
                alt={isPegasus ? (appLocale === "de" ? "Pegasus Airlines Airbus A320neo am Flughafen Köln/Bonn" : "Köln/Bonn aeroportidagi Pegasus Airlines Airbus A320neo samolyoti") : article.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className={article.slug === "vatandoshlar-de-endi-uzde" ? "object-contain" : "object-cover"}
              />
            </div>
          )}

          {isPegasus && (
            <p className="mt-1 text-right text-[10px] leading-4 text-slate-500 dark:text-slate-400">
              Foto: © Raimond Spekking / <a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> (via <a className="underline underline-offset-2" href="https://commons.wikimedia.org/wiki/File:Pegasus_Airlines_-_Airbus_A320-251N_-_TC-NBM_-_Cologne_Bonn_Airport-6670.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>; 1920 × 1080 versiya)
            </p>
          )}


          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 border-y border-zinc-300 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-700">
              <div className="flex shrink-0 items-center justify-center gap-4 text-xs text-slate-600 sm:justify-start sm:text-sm dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" />{article.readingTime}</span>
                <ViewCount count={article.viewCount} locale={locale} />
              </div>
              <NewsShareActions locale={appLocale} title={article.title} url={articleUrl} />
            </div>

          <div className="mx-auto mt-10 max-w-3xl">
            {article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" ? (
              <>
                <p className="text-base leading-7 text-slate-700 sm:text-[17px] dark:text-slate-300">{article.content[0]}</p>
                <div className="mt-8 border-l-2 border-emerald-600 bg-white/60 px-6 py-6 dark:bg-white/[0.04]">
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-100">{appLocale === "de" ? "Das Wichtigste auf einen Blick" : "Asosiy yangilik"}</h2>
                  <p className="mt-2 text-[15px] leading-7 text-slate-700 dark:text-slate-300">{article.content[2] ?? article.content[1]}</p>
                </div>
                <h2 className="mt-12 border-t border-zinc-300 pt-8 text-2xl font-semibold tracking-tight dark:border-zinc-700">{appLocale === "de" ? "Was ändert sich?" : "Nimalar o‘zgaradi?"}</h2>
                <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {article.content.slice(1).filter((_, i) => i !== 1).map((paragraph, index) => (
                    <div key={`${article.slug}-${index}`} className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 py-5">
                      <span className="flex w-11 shrink-0 flex-col items-start gap-2 pt-0.5 text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true" className="h-0.5 w-7 bg-emerald-600 dark:bg-emerald-400" /></span>
                      <p className="pt-1 text-[15px] leading-7 text-slate-700 sm:text-base dark:text-slate-300">{paragraph}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : isPegasus ? (
              <div className="space-y-4">
                {article.content.map((paragraph, index) => paragraph.startsWith("## ") ? (
                  <h2 key={`${article.slug}-${index}`} className="pt-4 text-xl font-bold tracking-tight sm:text-2xl">{paragraph.slice(3)}</h2>
                ) : paragraph.startsWith("SOURCE|") ? (
                  index === article.content.findIndex((item) => item.startsWith("SOURCE|")) ? (
                    <div key={`${article.slug}-sources`} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-5">
                      {article.content.filter((item) => item.startsWith("SOURCE|")).map((item) => {
                        const [, label, url] = item.split("|");
                        const approvedSources = [
                          "https://uza.uz/sp/posts/istanbuldan-buxoro-andijon-va-termizga-togridan-togri-reyslar-ochiladi_929724",
                          "https://www.spot.uz/en/2026/10/29/pegasus-airlines/",
                          "https://www.uzdaily.uz/en/pegasus-airlines-to-launch-flights-to-three-uzbek-cities/",
                          "https://www.flypgs.com/en/pegasus-baggage-allowance",
                        ];
                        return approvedSources.includes(url) ? (
                          <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-400">{label}</a>
                        ) : null;
                      })}
                    </div>
                  ) : null
                ) : (
                  <p key={`${article.slug}-${index}`} className="text-base leading-7 text-slate-700 dark:text-slate-300">{paragraph}</p>
                ))}
                <p className="border-t border-slate-200 pt-5 text-sm dark:border-slate-800">
                  {appLocale === "de" ? "Artikel von: " : "Maqolani tayyorladi: "}
                  <Link href="/about/founder" className="font-semibold text-blue-700 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-blue-400">Zafar Usarov</Link>
                </p>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400"><strong className="font-bold">UzDe</strong>{appLocale === "de" ? " ist eine Plattform für verlässliche Informationen und praktische Hinweise für Menschen aus Usbekistan, die in Deutschland leben oder einen Aufenthalt planen." : " — Germaniyada yashayotgan o‘zbekistonliklar hamda Germaniyaga kelishni rejalashtirayotganlar uchun ishonchli axborot va foydali ma’lumotlar platformasi."}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {article.content.map((paragraph, index) => <p key={`${article.slug}-${index}`} className="text-base leading-7 text-slate-700 dark:text-slate-300">{paragraph}</p>)}
              </div>
            )}

            {article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" && (
              <Link href="/guide/recognition/regulated-professions" className="mt-10 flex items-center gap-4 border-y border-zinc-300 py-6 text-zinc-950 transition-colors hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-100 dark:hover:text-emerald-300">
                <BookOpen className="size-6 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{appLocale === "de" ? "Hilfreicher Ratgeber" : "Foydali qo‘llanma"}</span><span className="block text-sm font-bold sm:text-base">{appLocale === "de" ? "Anerkennung reglementierter Berufe" : "Shifokorlar uchun qo‘llanma: diplomni tan oldirish"}</span></span>
                <ArrowUpRight className="size-5 shrink-0" aria-hidden="true" />
              </Link>
            )}

            {!isPegasus && (
              <div className="mt-10 grid gap-4 border-t border-zinc-300 pt-6 sm:grid-cols-[1fr_auto] dark:border-zinc-700">
                <div className="text-sm">
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:underline dark:text-blue-400">
                    {appLocale === "de" ? "Offizielle Quelle:" : "Rasmiy manba:"} {article.sourceName}<ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("lastVerified", { date: formatNewsDate(article.verifiedAt, locale) })}</p>
                </div>
              </div>
            )}
          </div>
        </article>

        {relatedNews.length > 0 && (
          <section className="border-t border-zinc-300 bg-[#f7f7f7] py-16 transition-colors dark:border-zinc-700 dark:bg-[var(--uzde-home-surface,#111419)]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {t(
                  "related.eyebrow",
                )}
              </p>

              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-[-0.04em]">
                {t(
                  "related.title",
                )}
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3 dark:[&_article]:!border-[#292e36] dark:[&_article]:!bg-[#191c21]">
                {relatedNews.map(
                  (
                    item,
                    index,
                  ) => (
                    <NewsCard
                      relatedRecommendation
                      key={
                        item.slug
                      }
                      item={
                        item
                      }
                      index={
                        index
                      }
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-zinc-300 bg-[#f7f7f7] py-10 transition-colors dark:border-zinc-700 dark:bg-[var(--uzde-home-surface,#111419)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
          <p>
            © 2026 <BrandName />
          </p>

          <p>
            {t(
              "footer",
            )}
          </p>
        </div>
      </footer>
    </>
  );
}
