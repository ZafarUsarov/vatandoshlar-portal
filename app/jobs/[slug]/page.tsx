import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import JobGuideCard from "../../../components/cards/JobGuideCard";
import { Link } from "../../../i18n/navigation";
import { formatJobDate } from "../../../lib/jobs/format-job-date";
import {
  getPublishedJobGuideBySlug,
  getRelatedPublishedJobGuides,
} from "../../../lib/jobs/public-jobs-repository";
import type {
  SupportedJobLocale,
} from "../../../types/jobs";

type JobGuidePageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export const dynamic =
  "force-dynamic";

export async function generateMetadata({
  params,
}: JobGuidePageProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedJobLocale;

  const { slug } =
    await params;

  const guide =
    await getPublishedJobGuideBySlug(
      slug,
      locale,
    );

  if (!guide) {
    return {
      title:
        locale === "uz"
          ? "Ish qo‘llanmasi topilmadi | Vatandoshlar.de"
          : "Jobleitfaden nicht gefunden | Vatandoshlar.de",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${guide.title} | Vatandoshlar.de`,
    description:
      guide.description,
    alternates: {
      canonical:
        `/${locale}/jobs/${guide.slug}`,
      languages: {
        uz:
          `/uz/jobs/${guide.slug}`,
        de:
          `/de/jobs/${guide.slug}`,
      },
    },
  };
}

export default async function JobGuidePage({
  params,
}: JobGuidePageProps) {
  const locale =
    (await getLocale()) as SupportedJobLocale;

  const { slug } =
    await params;

  const [
    guide,
    relatedGuides,
  ] = await Promise.all([
    getPublishedJobGuideBySlug(
      slug,
      locale,
    ),
    getRelatedPublishedJobGuides(
      slug,
      locale,
      3,
    ),
  ]);

  if (!guide) {
    notFound();
  }

  const copy =
    locale === "uz"
      ? {
          back:
            "Barcha ish yo‘nalishlari",
          officialBased:
            "Rasmiy manbaga asoslangan",
          audience:
            "Kimlar uchun",
          lastVerified:
            "Oxirgi tekshiruv",
          mainEyebrow:
            "Asosiy ma’lumotlar",
          mainTitle:
            "Ushbu qo‘llanmada nimalarni bilib olasiz?",
          keywordsEyebrow:
            "Qidiruv so‘zlari",
          keywordsTitle:
            "Vakansiyani qanday so‘zlar bilan qidirish kerak?",
          planEyebrow:
            "Amaliy reja",
          planTitle:
            "Bosqichma-bosqich yo‘riqnoma",
          officialSource:
            "Rasmiy manba",
          openOfficial:
            "Rasmiy sahifani ochish",
          warnings:
            "Muhim ogohlantirishlar",
          disclaimer:
            "Mehnat, migratsiya, soliq va sug‘urta qoidalari individual holatga qarab farq qilishi mumkin. Qaror qabul qilishdan oldin rasmiy manbani yoki vakolatli maslahat xizmatini tekshiring.",
          relatedEyebrow:
            "Boshqa yo‘nalishlar",
          relatedTitle:
            "Sizga foydali bo‘lishi mumkin",
          footer:
            "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma",
          card: {
            highlightsAria:
              "Qo‘llanmaning asosiy mavzulari",
            guide:
              "Qo‘llanma",
            explained:
              "Bosqichma-bosqich tushuntirilgan",
            open:
              "Qo‘llanmani ochish",
            openShort:
              "Ochish",
          },
        }
      : {
          back:
            "Alle Jobthemen",
          officialBased:
            "Auf offizieller Quelle basierend",
          audience:
            "Für wen",
          lastVerified:
            "Zuletzt geprüft",
          mainEyebrow:
            "Wichtige Informationen",
          mainTitle:
            "Was erfahren Sie in diesem Leitfaden?",
          keywordsEyebrow:
            "Suchbegriffe",
          keywordsTitle:
            "Mit welchen Begriffen sollten Sie suchen?",
          planEyebrow:
            "Praktischer Plan",
          planTitle:
            "Schritt-für-Schritt-Anleitung",
          officialSource:
            "Offizielle Quelle",
          openOfficial:
            "Offizielle Seite öffnen",
          warnings:
            "Wichtige Hinweise",
          disclaimer:
            "Arbeits-, Aufenthalts-, Steuer- und Versicherungsregeln können je nach Einzelfall abweichen. Prüfen Sie vor einer Entscheidung die offizielle Quelle oder eine zuständige Beratungsstelle.",
          relatedEyebrow:
            "Weitere Themen",
          relatedTitle:
            "Das könnte ebenfalls hilfreich sein",
          footer:
            "Digitale Plattform für Usbeken in Deutschland",
          card: {
            highlightsAria:
              "Wichtige Themen des Leitfadens",
            guide:
              "Leitfaden",
            explained:
              "Schritt für Schritt erklärt",
            open:
              "Leitfaden öffnen",
            openShort:
              "Öffnen",
          },
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950 dark:bg-slate-950 dark:text-white">
        <article>
          <header className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
              <Link
                href="/jobs"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← {copy.back}
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  {
                    guide.category
                  }
                </span>

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {
                    copy.officialBased
                  }
                </span>
              </div>

              <div className="mt-8 flex h-16 min-w-16 w-fit items-center justify-center rounded-2xl bg-slate-950 px-4 text-2xl font-bold text-white dark:bg-black">
                {
                  guide.icon
                }
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
                {
                  guide.title
                }
              </h1>

              <p className="mt-7 text-xl leading-8 text-slate-600 dark:text-slate-400">
                {
                  guide.description
                }
              </p>

              <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <p>
                  {
                    copy.audience
                  }
                  :{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {
                      guide.audience
                    }
                  </span>
                </p>

                <p className="mt-2">
                  {
                    copy.lastVerified
                  }
                  :{" "}
                  <time
                    dateTime={
                      guide.verifiedAt
                    }
                  >
                    {formatJobDate(
                      guide.verifiedAt,
                      locale,
                    )}
                  </time>
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
            <section>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {
                  copy.mainEyebrow
                }
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {
                  copy.mainTitle
                }
              </h2>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {guide.highlights.map(
                  (
                    highlight,
                  ) => (
                    <li
                      key={
                        highlight
                      }
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      <span className="mr-2 font-bold text-emerald-600">
                        ✓
                      </span>

                      {
                        highlight
                      }
                    </li>
                  ),
                )}
              </ul>
            </section>

            <section className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {
                  copy.keywordsEyebrow
                }
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {
                  copy.keywordsTitle
                }
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {guide.searchKeywords.map(
                  (
                    keyword,
                  ) => (
                    <span
                      key={
                        keyword
                      }
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {
                        keyword
                      }
                    </span>
                  ),
                )}
              </div>
            </section>

            <section className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {
                  copy.planEyebrow
                }
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {
                  copy.planTitle
                }
              </h2>

              <ol className="mt-7 space-y-4">
                {guide.steps.map(
                  (
                    step,
                    index,
                  ) => (
                    <li
                      key={
                        step
                      }
                      className="flex gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                        {
                          index +
                          1
                        }
                      </span>

                      <p className="pt-1 leading-7 text-slate-700 dark:text-slate-300">
                        {
                          step
                        }
                      </p>
                    </li>
                  ),
                )}
              </ol>
            </section>

            <section className="mt-14 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 dark:border-emerald-500/20 dark:bg-emerald-500/10 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                {
                  copy.officialSource
                }
              </p>

              <h2 className="mt-3 text-xl font-bold text-emerald-950 dark:text-emerald-100">
                {
                  guide.officialSourceName
                }
              </h2>

              <p className="mt-4 leading-7 text-emerald-900 dark:text-emerald-200">
                {
                  guide.sourceDescription
                }
              </p>

              <a
                href={
                  guide.officialSourceUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                {
                  copy.openOfficial
                }{" "}
                ↗
              </a>
            </section>

            <aside className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7 dark:border-amber-500/20 dark:bg-amber-500/10">
              <h2 className="text-xl font-bold text-amber-950 dark:text-amber-100">
                {
                  copy.warnings
                }
              </h2>

              <ul className="mt-5 space-y-3">
                {guide.importantNotes.map(
                  (
                    note,
                  ) => (
                    <li
                      key={
                        note
                      }
                      className="flex gap-3 leading-7 text-amber-900 dark:text-amber-200"
                    >
                      <span
                        aria-hidden="true"
                      >
                        •
                      </span>

                      <span>
                        {
                          note
                        }
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </aside>

            <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                {
                  copy.disclaimer
                }
              </p>
            </div>
          </div>
        </article>

        {relatedGuides.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {
                  copy.relatedEyebrow
                }
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                {
                  copy.relatedTitle
                }
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedGuides.map(
                  (
                    item,
                  ) => (
                    <JobGuideCard
                      key={
                        item.id
                      }
                      guide={
                        item
                      }
                      labels={
                        copy.card
                      }
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
          <p>
            © 2026
            Vatandoshlar.de
          </p>

          <p>
            {
              copy.footer
            }
          </p>
        </div>
      </footer>
    </>
  );
}
