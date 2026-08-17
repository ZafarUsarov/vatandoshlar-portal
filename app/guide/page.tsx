import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import GuideCategoryGrid from "../../components/guide/GuideCategoryGrid";
import GuideHero from "../../components/guide/GuideHero";
import BrandedText from "../../components/ui/BrandedText";
import SectionHeroBackground from "../../components/ui/SectionHeroBackground";
import SectionBackground from "../../components/ui/SectionBackground";
import { getGuideCategories } from "../../data/guide";
import { Link } from "../../i18n/navigation";
import {
  getFeaturedPublishedGuideArticles,
  getPublishedGuideArticleCountsByCategory,
  isPublicGuideCategorySlug,
} from "../../lib/guide/public-guide-repository";
import type {
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  return locale === "uz"
    ? {
        title:
          "Germaniya qo‘llanmasi | Vatandoshlar.de",
        description:
          "Germaniyaga kelish, vizalar, ta’lim, ish, oila, hujjatlar va kelgandan keyingi jarayonlar bo‘yicha tizimli qo‘llanmalar.",
        alternates: {
          canonical:
            "/uz/guide",
          languages: {
            uz:
              "/uz/guide",
            de:
              "/de/guide",
          },
        },
      }
    : {
        title:
          "Deutschland-Ratgeber | Vatandoshlar.de",
        description:
          "Strukturierte Leitfäden zu Einreise, Visa, Bildung, Arbeit, Familie, Dokumenten und den ersten Schritten nach der Ankunft.",
        alternates: {
          canonical:
            "/de/guide",
          languages: {
            uz:
              "/uz/guide",
            de:
              "/de/guide",
          },
        },
      };
}

export default async function GuidePage() {
  const locale =
    (await getLocale()) as SupportedGuideLocale;

  const [
    categoryCounts,
    featuredArticles,
  ] =
    await Promise.all([
      getPublishedGuideArticleCountsByCategory(),
      getFeaturedPublishedGuideArticles(
        locale,
        6,
      ),
    ]);

  const categories =
    getGuideCategories(
      locale,
    ).map(
      (
        category,
      ): GuideCategory => {
        const articleCount =
          isPublicGuideCategorySlug(
            category.slug,
          )
            ? categoryCounts[
                category.slug
              ]
            : 0;

        return {
          ...category,

          articleCount,

          status:
            articleCount > 0
              ? "available"
              : "coming-soon",
        };
      },
    );

  const categoryTitleBySlug =
    new Map(
      categories.map(
        (category) => [
          category.slug,
          category.title,
        ],
      ),
    );

  const copy =
    locale === "uz"
      ? {
          hero: {
            eyebrow:
              "Vatandoshlar.de bilim markazi",
            title:
              "Germaniyaga kelish va bu yerda hayot boshlash uchun yagona qo‘llanma",
            description:
              "Au Pair’dan boshlab oila birlashtirish, vizalar, termin olish, ta’lim, ish, hujjatlar va Germaniyaga kelgandan keyingi bosqichlargacha bo‘lgan ma’lumotlar tartibli ravishda bir joyda jamlanadi.",
            primary:
              "Yo‘nalishlarni ko‘rish",
            secondary:
              "Ishonchlilik tamoyili",
          },

          featured: {
            eyebrow:
              "Tavsiya etilgan qo‘llanmalar",
            title:
              "Muhim va dolzarb maqolalar",
            description:
              "Admin tomonidan featured sifatida belgilangan va e’lon qilingan qo‘llanmalar shu yerda ko‘rsatiladi.",
            badge:
              "Featured",
            reviewed:
              "Tekshirildi",
            open:
              "Maqolani ochish",
          },

          categories: {
            eyebrow:
              "Asosiy yo‘nalishlar",
            title:
              "Kerakli mavzuni tanlang",
            description:
              "Mavjud maqolalar rasmiy manbalar asosida muntazam tekshiriladi, yangi yo‘nalishlar esa bosqichma-bosqich qo‘shib boriladi.",
            comingSoon:
              "Tez orada",
            articles:
              "ta maqola",
            open:
              "Ochish",
          },

          principles: {
            eyebrow:
              "Ishonchlilik",
            title:
              "Ma’lumotlar qanday tayyorlanadi?",
            description:
              "Qo‘llanmadagi materiallar foydalanuvchini rasmiy manbaga yo‘naltirish va murakkab jarayonlarni tushunarli tarzda izohlash uchun tayyorlanadi.",
            items: [
              {
                title:
                  "Rasmiy manbalar",
                description:
                  "Asosiy talablar Germaniya idoralari, elchixonalar va vakolatli tashkilotlarning birlamchi manbalari orqali tekshiriladi.",
              },
              {
                title:
                  "Yangilanish sanasi",
                description:
                  "Har bir maqolada ma’lumot qachon tekshirilgani va qaysi manbalardan foydalanilgani ko‘rsatiladi.",
              },
              {
                title:
                  "Amaliy yo‘naltirish",
                description:
                  "Talablar, hujjatlar va keyingi qadamlar ortiqcha murakkabliksiz, izchil shaklda tushuntiriladi.",
              },
            ],
          },

          notice:
            "Qo‘llanma muntazam rivojlantirilmoqda. Tayyor maqolalar muntazam tekshiriladi, bo‘sh yo‘nalishlar esa yangi qo‘llanmalar bilan bosqichma-bosqich to‘ldiriladi.",
        }
      : {
          hero: {
            eyebrow:
              "Wissenszentrum von Vatandoshlar.de",
            title:
              "Der zentrale Ratgeber für Einreise und den Start in Deutschland",
            description:
              "Von Au-pair über Familiennachzug, Visa und Terminbuchung bis zu Bildung, Arbeit, Dokumenten und den ersten Schritten nach der Ankunft werden wichtige Informationen strukturiert an einem Ort gebündelt.",
            primary:
              "Bereiche ansehen",
            secondary:
              "Grundsätze der Verlässlichkeit",
          },

          featured: {
            eyebrow:
              "Empfohlene Leitfäden",
            title:
              "Wichtige und aktuelle Artikel",
            description:
              "Hier erscheinen veröffentlichte Guide-Artikel, die im Admin-Bereich als Featured markiert wurden.",
            badge:
              "Featured",
            reviewed:
              "Geprüft",
            open:
              "Artikel öffnen",
          },

          categories: {
            eyebrow:
              "Hauptbereiche",
            title:
              "Wählen Sie das passende Thema",
            description:
              "Bestehende Artikel werden anhand offizieller Quellen regelmäßig geprüft; weitere Themen werden schrittweise ergänzt.",
            comingSoon:
              "Demnächst",
            articles:
              "Artikel",
            open:
              "Öffnen",
          },

          principles: {
            eyebrow:
              "Verlässlichkeit",
            title:
              "Wie werden die Informationen erstellt?",
            description:
              "Die Inhalte des Ratgebers führen zu offiziellen Quellen und erklären komplexe Abläufe verständlich und strukturiert.",
            items: [
              {
                title:
                  "Offizielle Quellen",
                description:
                  "Zentrale Anforderungen werden anhand primärer Quellen deutscher Behörden, Auslandsvertretungen und zuständiger Organisationen geprüft.",
              },
              {
                title:
                  "Aktualisierungsdatum",
                description:
                  "Jeder Artikel zeigt, wann die Informationen zuletzt geprüft und welche Quellen verwendet wurden.",
              },
              {
                title:
                  "Praktische Orientierung",
                description:
                  "Voraussetzungen, Unterlagen und nächste Schritte werden verständlich und in logischer Reihenfolge erklärt.",
              },
            ],
          },

          notice:
            "Der Ratgeber wird laufend weiterentwickelt. Vorhandene Artikel werden regelmäßig geprüft und noch leere Bereiche schrittweise mit neuen Leitfäden ergänzt.",
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <SectionHeroBackground tone="guide">
          <GuideHero
            eyebrow={
              <span className="text-slate-900 dark:text-slate-100">
                <BrandedText text={copy.hero.eyebrow} />
              </span>
            }
            title={
              copy.hero.title
            }
            description={
              copy.hero.description
            }
            primaryLabel={
              copy.hero.primary
            }
            secondaryLabel={
              copy.hero.secondary
            }
          />
        </SectionHeroBackground>

        {featuredArticles.length >
          0 && (
          <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900 sm:py-24">
            <SectionBackground variant="blue" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                  {
                    copy.featured.eyebrow
                  }
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                  {
                    copy.featured.title
                  }
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  {
                    copy.featured.description
                  }
                </p>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredArticles.map(
                  (
                    article,
                  ) => (
                    <article
                      key={
                        article.id
                      }
                      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-500/30"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                          {
                            copy.featured.badge
                          }
                        </span>

                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                          {categoryTitleBySlug.get(
                            article.categorySlug,
                          ) ??
                            article.categorySlug}
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl font-bold tracking-tight">
                        {
                          article.title
                        }
                      </h3>

                      <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
                        {
                          article.excerpt
                        }
                      </p>

                      <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {
                            copy.featured.reviewed
                          }
                          :{" "}
                          <time
                            dateTime={
                              article.lastReviewedAt
                            }
                          >
                            {
                              article.lastReviewedAt
                            }
                          </time>
                        </p>

                        <Link
                          href={`/guide/${article.categorySlug}/${article.slug}`}
                          className="mt-4 inline-flex items-center text-sm font-bold text-blue-700 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-slate-950"
                        >
                          {
                            copy.featured.open
                          }{" "}
                          →
                        </Link>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

        <section
          id="guide-categories"
          className="relative isolate overflow-hidden py-20 sm:py-24"
        >
          <SectionBackground variant="emerald" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {
                  copy.categories.eyebrow
                }
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                {
                  copy.categories.title
                }
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                {
                  copy.categories.description
                }
              </p>
            </div>

            <div className="mt-12">
              <GuideCategoryGrid
                categories={
                  categories
                }
                comingSoonLabel={
                  copy.categories.comingSoon
                }
                articlesLabel={
                  copy.categories.articles
                }
                openLabel={
                  copy.categories.open
                }
              />
            </div>

            <div className="mt-10 rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50 to-cyan-50/70 p-6 text-blue-950 shadow-sm dark:border-blue-500/20 dark:from-blue-500/10 dark:to-cyan-500/5 dark:text-blue-100">
              <p className="leading-7">
                {copy.notice}
              </p>
            </div>
          </div>
        </section>

        <section
          id="guide-principles"
          className="relative isolate overflow-hidden border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900"
        >
          <SectionBackground variant="blue" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {
                  copy.principles.eyebrow
                }
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                {
                  copy.principles.title
                }
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                {
                  copy.principles.description
                }
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {copy.principles.items.map(
                (
                  item,
                  index,
                ) => (
                  <article
                    key={
                      item.title
                    }
                    className="rounded-3xl border border-slate-200 bg-slate-50/90 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950/90 dark:hover:border-emerald-500/30"
                  >
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <h3 className="mt-4 text-xl font-bold">
                      {
                        item.title
                      }
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                      {
                        item.description
                      }
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <SectionPromo target="news" />

      <Footer />
    </>
  );
}
