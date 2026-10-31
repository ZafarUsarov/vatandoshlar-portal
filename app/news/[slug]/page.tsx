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
  "https://vatandoshlar.de";

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

      <main className="min-h-screen bg-white pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <article className="mx-auto max-w-5xl px-5 pb-10 pt-5 sm:px-7 sm:pt-7 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-emerald-700 dark:text-slate-300">
            ← {t("backToAll")}
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">{article.category}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{article.contentType}</span>

            <time className="ml-auto hidden sm:inline" dateTime={article.verifiedAt}>{formatNewsDate(article.verifiedAt, locale)}</time>
          </div>

          <h1 className="mt-4 max-w-4xl text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.13] tracking-tight">{article.title}</h1>
          <p className="mt-3 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">{article.excerpt}</p>

          {(article.imageUrl || article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026") && (
            <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-[16/7] dark:bg-slate-800">
              <Image
                src={article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" ? "/images/news/medical-recognition-2026.webp" : article.imageUrl!}
                alt={isPegasus ? (appLocale === "de" ? "Pegasus Airlines Airbus A320neo am Flughafen Köln/Bonn" : "Köln/Bonn aeroportidagi Pegasus Airlines Airbus A320neo samolyoti") : article.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          {isPegasus && (
            <p className="mt-1 text-right text-[10px] leading-4 text-slate-500 dark:text-slate-400">
              Foto: © Raimond Spekking / <a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> (via <a className="underline underline-offset-2" href="https://commons.wikimedia.org/wiki/File:Pegasus_Airlines_-_Airbus_A320-251N_-_TC-NBM_-_Cologne_Bonn_Airport-6670.jpg" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>; 1920 × 1080 versiya)
            </p>
          )}

          {article.slug === "vatandoshlar-de-endi-uzde" && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5" aria-label={appLocale === "de" ? "Bisheriges und neues Logo" : "Eski va yangi logo"}>
              {[
                { src: "/images/brand/Logo_New_Transparent.png", label: appLocale === "de" ? "Bisher: Vatandoshlar.de" : "Avval: Vatandoshlar.de" },
                { src: "/images/brand/uzde/uzde-logo-original-transparent.png", label: appLocale === "de" ? "Jetzt: UzDe" : "Hozir: UzDe" },
              ].map(({ src, label }) => (
                <figure key={src} className={`flex min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border p-4 sm:p-7 ${src.includes("uzde-logo-original") ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"}`}>
                  <div className="relative h-28 w-full sm:h-44">
                    <Image src={src} alt={label} fill sizes="(max-width: 640px) 50vw, 360px" className="object-contain" />
                  </div>
                  <figcaption className={`text-center text-xs font-semibold sm:text-sm ${src.includes("uzde-logo-original") ? "text-white" : "text-slate-700"}`}>{label}</figcaption>
                </figure>
              ))}
            </div>
          )}

          <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-3 border-y border-slate-200 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div className="flex shrink-0 items-center justify-center gap-4 text-xs text-slate-600 sm:justify-start sm:text-sm dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5"><Clock3 size={15} aria-hidden="true" />{article.readingTime}</span>
                <ViewCount count={article.viewCount} locale={locale} />
              </div>
              <NewsShareActions locale={appLocale} title={article.title} url={articleUrl} />
            </div>

          <div className="mx-auto mt-7 max-w-4xl">
            {article.slug === "germaniyada-tibbiyot-diplomlarini-tan-olish-2026" ? (
              <>
                <p className="text-base leading-7 text-slate-700 sm:text-[17px] dark:text-slate-300">{article.content[0]}</p>
                <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/30">
                  <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">{appLocale === "de" ? "Das Wichtigste auf einen Blick" : "Asosiy yangilik"}</h2>
                  <p className="mt-2 text-[15px] leading-7 text-slate-700 dark:text-slate-300">{article.content[2] ?? article.content[1]}</p>
                </div>
                <h2 className="mt-7 text-2xl font-bold tracking-tight">{appLocale === "de" ? "Was ändert sich?" : "Nimalar o‘zgaradi?"}</h2>
                <div className="mt-4 space-y-4">
                  {article.content.slice(1).filter((_, i) => i !== 1).map((paragraph, index) => (
                    <div key={`${article.slug}-${index}`} className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">{index + 1}</span>
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
              <Link href="/guide/recognition/regulated-professions" className="mt-7 flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50/70 px-4 py-4 text-blue-950 transition hover:border-blue-400 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
                <BookOpen className="size-7 shrink-0 text-blue-600" aria-hidden="true" />
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">{appLocale === "de" ? "Hilfreicher Ratgeber" : "Foydali qo‘llanma"}</span><span className="block text-sm font-bold sm:text-base">{appLocale === "de" ? "Anerkennung reglementierter Berufe" : "Shifokorlar uchun qo‘llanma: diplomni tan oldirish"}</span></span>
                <ArrowUpRight className="size-5 shrink-0" aria-hidden="true" />
              </Link>
            )}

            {!isPegasus && (
              <div className="mt-7 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-[1fr_auto] dark:border-slate-800">
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
          <section className="border-t border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {t(
                  "related.eyebrow",
                )}
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {t(
                  "related.title",
                )}
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedNews.map(
                  (
                    item,
                    index,
                  ) => (
                    <NewsCard
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

      <footer className="border-t border-slate-200 bg-white py-10 transition-colors dark:border-slate-800 dark:bg-slate-950">
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
