import type {
  GuideArticle,
  GuideArticleSectionKey,
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";
import GuideArticleSection from "./GuideArticleSection";
import GuideFAQ from "./GuideFAQ";
import GuideInfoBox from "./GuideInfoBox";
import GuideReadingProgress from "./GuideReadingProgress";
import GuideArticleNavigation from "./GuideArticleNavigation";
import RelatedGuideArticles from "./RelatedGuideArticles";
import GuideSourceList from "./GuideSourceList";
import GuideStepList from "./GuideStepList";
import GuideTableOfContents, {
  type GuideTableOfContentsItem,
} from "./GuideTableOfContents";

type GuideArticlePageProps = Readonly<{
  article: GuideArticle;
  category: GuideCategory;
  relatedArticles: ReadonlyArray<GuideArticle>;
  previousArticle?: GuideArticle;
  nextArticle?: GuideArticle;
  locale: SupportedGuideLocale;
}>;

function formatReviewDate(
  value: string,
  locale: SupportedGuideLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz" ? "uz-UZ" : "de-DE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(`${value}T12:00:00`));
}

export default function GuideArticlePage({
  article,
  category,
  relatedArticles,
  previousArticle,
  nextArticle,
  locale,
}: GuideArticlePageProps) {
  const copy =
    locale === "uz"
      ? {
          guide: "Qo‘llanma",
          lastReviewed: "Oxirgi tekshiruv",
          readingTime: "O‘qish vaqti",
          keyFacts: "Asosiy ma’lumotlar",
          steps: "Bosqichma-bosqich jarayon",
          faqSection: "Ko‘p so‘raladigan savollar",
          sourcesSection: "Rasmiy manbalar",
          faq: "Ko‘p so‘raladigan savollar",
          sources: "Rasmiy manbalar",
          sourceDescription:
            "Ushbu qo‘llanma quyidagi birlamchi rasmiy manbalar asosida tayyorlandi. Ariza topshirishdan oldin amaldagi talablarni rasmiy sahifalarda qayta tekshiring.",
          openSource: "Manbani ochish",
          readingProgress: "Maqola o‘qildi",
          disclaimerTitle: "Muhim huquqiy eslatma",
          disclaimer:
            "Bu maqola umumiy axborot beradi va individual yuridik yoki migratsion maslahat o‘rnini bosmaydi. Viza talablari, hujjatlar va idora jarayonlari shaxsiy holat hamda mas’ul vakolatxonaga qarab farq qilishi va o‘zgarishi mumkin.",
        }
      : {
          guide: "Guide",
          lastReviewed: "Zuletzt geprüft",
          readingTime: "Lesezeit",
          keyFacts: "Wichtige Eckdaten",
          steps: "Schrittweiser Ablauf",
          faqSection: "Häufig gestellte Fragen",
          sourcesSection: "Offizielle Quellen",
          faq: "Häufig gestellte Fragen",
          sources: "Offizielle Quellen",
          sourceDescription:
            "Dieser Leitfaden wurde anhand der folgenden offiziellen Primärquellen erstellt. Prüfen Sie die aktuellen Anforderungen vor einer Antragstellung erneut auf den offiziellen Seiten.",
          openSource: "Quelle öffnen",
          readingProgress: "Artikel gelesen",
          disclaimerTitle: "Wichtiger rechtlicher Hinweis",
          disclaimer:
            "Dieser Artikel bietet allgemeine Informationen und ersetzt keine individuelle Rechts- oder Migrationsberatung. Visumvoraussetzungen, Unterlagen und behördliche Abläufe können je nach persönlicher Situation und zuständiger Stelle abweichen und sich ändern.",
        };

  const sectionOrder: ReadonlyArray<GuideArticleSectionKey> = [
    "overview",
    "eligibility",
    "requirements",
    "documents",
    "conditions",
    "warnings",
  ];

  const tocItems: ReadonlyArray<GuideTableOfContentsItem> = [
    ...sectionOrder.flatMap((key) => {
      const section = article.sections[key];

      return section
        ? [
            {
              id: `guide-section-${key}`,
              label: section.title,
            },
          ]
        : [];
    }),
    ...(article.steps.length > 0
      ? [
          {
            id: "guide-section-steps",
            label: copy.steps,
          },
        ]
      : []),
    ...(article.faq.length > 0
      ? [
          {
            id: "guide-section-faq",
            label: copy.faqSection,
          },
        ]
      : []),
    ...(article.sources.length > 0
      ? [
          {
            id: "guide-section-sources",
            label: copy.sourcesSection,
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-20 text-slate-950 dark:bg-slate-950 dark:text-white">
      <GuideReadingProgress
        targetId="guide-article-content"
        label={copy.readingProgress}
      />

      <article id="guide-article-content">
        <header className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -right-32 -top-40 size-[32rem] rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-48 left-8 size-[30rem] rounded-full bg-blue-500/15 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-slate-300"
            >
              <Link
                href="/guide"
                className="font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                {copy.guide}
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/guide/${category.slug}`}
                className="font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                {category.title}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.title}</span>
            </nav>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              {category.title}
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] sm:text-6xl sm:leading-[1.08]">
              {article.title}
            </h1>

            <p className="mt-7 max-w-4xl text-xl leading-9 text-slate-300">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
                {copy.readingTime}: {article.readingTime}
              </span>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                {copy.lastReviewed}:{" "}
                {formatReviewDate(
                  article.lastReviewedAt,
                  locale,
                )}
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <GuideTableOfContents
              items={tocItems}
              locale={locale}
            />

            <div className="min-w-0">
              <p className="text-xl leading-9 text-slate-700 dark:text-slate-300">
                {article.intro}
              </p>

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">
              {copy.keyFacts}
            </h2>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {article.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950"
                >
                  <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-bold leading-7 text-slate-950 dark:text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-8 space-y-8">
            {sectionOrder.map((key) => {
              const section = article.sections[key];

              if (!section) {
                return null;
              }

              if (key === "warnings") {
                return (
                  <div
                    key={key}
                    id={`guide-section-${key}`}
                    className="scroll-mt-32"
                  >
                    <GuideInfoBox
                      title={section.title}
                      variant="warning"
                    >
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3"
                        >
                          <span aria-hidden="true">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      </ul>
                    </GuideInfoBox>
                  </div>
                );
              }

              return (
                <div
                  key={key}
                  id={`guide-section-${key}`}
                  className="scroll-mt-32"
                >
                  <GuideArticleSection
                    title={section.title}
                    paragraphs={section.paragraphs}
                    items={section.items}
                  />
                </div>
              );
            })}

            {article.steps.length > 0 && (
              <div
                id="guide-section-steps"
                className="scroll-mt-32"
              >
                <GuideStepList
                  title={copy.steps}
                  steps={article.steps}
                />
              </div>
            )}

            {article.faq.length > 0 && (
              <div
                id="guide-section-faq"
                className="scroll-mt-32"
              >
                <GuideFAQ
                  title={copy.faq}
                  items={article.faq}
                />
              </div>
            )}

            {article.sources.length > 0 && (
              <div
                id="guide-section-sources"
                className="scroll-mt-32"
              >
                <GuideSourceList
                  title={copy.sources}
                  description={copy.sourceDescription}
                  sources={article.sources}
                  openLabel={copy.openSource}
                />
              </div>
            )}

            <RelatedGuideArticles
              articles={relatedArticles}
              locale={locale}
            />

            <GuideInfoBox
              title={copy.disclaimerTitle}
              variant="warning"
            >
              <p>{copy.disclaimer}</p>
            </GuideInfoBox>

            <GuideArticleNavigation
              category={category}
              previous={previousArticle}
              next={nextArticle}
              locale={locale}
            />
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
