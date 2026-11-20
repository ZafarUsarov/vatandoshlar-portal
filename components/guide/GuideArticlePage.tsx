import type {
  GuideArticle,
  GuideArticleSectionKey,
  GuideCategory,
  SupportedGuideLocale,
} from "../../types/guide";
import { Link } from "../../i18n/navigation";
import BrandedText from "../ui/BrandedText";
import ViewCount from "../content-views/ViewCount";
import GuideArticleSection from "./GuideArticleSection";
import GuideFAQ from "./GuideFAQ";
import GuideInfoBox from "./GuideInfoBox";
import GuideReadingProgress from "./GuideReadingProgress";
import GuideArticleNavigation from "./GuideArticleNavigation";
import RelatedGuideArticles from "./RelatedGuideArticles";
import OfficialSourcesAccordion from "./OfficialSourcesAccordion";
import GuideStepList from "./GuideStepList";
import GuideTableOfContents, {
  type GuideTableOfContentsItem,
} from "./GuideTableOfContents";
import GuideRichContent from "./rich-content/GuideRichContent";
import GuideAuthor from "./GuideAuthor";
import GuideArticleShareButton from "./GuideArticleShareButton";

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
          backToCategory: "Kategoriyaga qaytiş",
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
          backToCategory: "Zur Kategorie",
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

  const richTocItems: ReadonlyArray<GuideTableOfContentsItem> =
    article.slug === "email-yozishni-organamiz"
      ? locale === "uz"
        ? [
            { id: "guide-section-email-basics", label: "E-mail nima?" },
            { id: "guide-section-email-anatomy", label: "E-mail anatomiyasi" },
            { id: "guide-section-email-writing", label: "E-mailni 6 qadamda yozish" },
            { id: "guide-section-email-subject", label: "Subject yozish" },
            { id: "guide-section-email-comparison", label: "Yaxshi va yomon E-mail" },
            { id: "guide-section-email-style", label: "Rasmiy va norasmiy E-mail" },
            { id: "guide-section-email-attachments", label: "Fayl biriktirish" },
            { id: "guide-section-email-cc-bcc", label: "CC va BCC" },
            { id: "guide-section-email-reply", label: "Reply, Reply all va Forward" },
            { id: "guide-section-email-security", label: "Xavfsizlik" },
            { id: "guide-section-email-checklist", label: "Yuborishdan oldingi tekshiruv" },
            { id: "guide-section-email-templates", label: "Tayyor shablonlar" },
          ]
        : [
            { id: "guide-section-email-basics", label: "Was ist eine E-Mail?" },
            { id: "guide-section-email-anatomy", label: "Aufbau einer E-Mail" },
            { id: "guide-section-email-writing", label: "E-Mail in 6 Schritten" },
            { id: "guide-section-email-subject", label: "Betreff schreiben" },
            { id: "guide-section-email-comparison", label: "Gute und schlechte E-Mail" },
            { id: "guide-section-email-style", label: "Formell und informell" },
            { id: "guide-section-email-attachments", label: "Dateien anhängen" },
            { id: "guide-section-email-cc-bcc", label: "CC und BCC" },
            { id: "guide-section-email-reply", label: "Antworten und Weiterleiten" },
            { id: "guide-section-email-security", label: "Sicherheit" },
            { id: "guide-section-email-checklist", label: "Kontrolle vor dem Senden" },
            { id: "guide-section-email-templates", label: "Vorlagen" },
          ]
      : article.slug === "uzbek-driving-licence-umschreibung"
        ? locale === "uz"
          ? [
              { id: "guide-section-driving-timeline", label: "Jarayon xaritasi" },
              { id: "guide-section-driving-checklist", label: "Hujjatlar checklisti" },
              { id: "guide-section-driving-code-70", label: "Schlüsselzahl 70" },
              { id: "guide-section-driving-exams", label: "Theorie va Praxis" },
              { id: "guide-section-driving-finish", label: "Nemis Führerscheini" },
            ]
          : [
              { id: "guide-section-driving-timeline", label: "Ablauf auf einen Blick" },
              { id: "guide-section-driving-checklist", label: "Unterlagen-Checkliste" },
              { id: "guide-section-driving-code-70", label: "Schlüsselzahl 70" },
              { id: "guide-section-driving-exams", label: "Theorie und Praxis" },
              { id: "guide-section-driving-finish", label: "Deutscher Führerschein" },
            ]
        : article.slug === "housing-in-germany"
          ? locale === "uz"
            ? [
                { id: "guide-section-housing-situation", label: "Vaziyatingizni tanlang" },
                { id: "guide-section-housing-abroad", label: "Chet eldan uy qidirish" },
                { id: "guide-section-housing-types", label: "Turar joy turlari" },
                { id: "guide-section-housing-channels", label: "Qayerdan qidirish" },
                { id: "guide-section-housing-contact", label: "Kontakt va Besichtigung" },
                { id: "guide-section-housing-contract", label: "Mietvertrag va xarajatlar" },
                { id: "guide-section-housing-scam", label: "Scam va Anmeldung" },
              ]
            : [
                { id: "guide-section-housing-situation", label: "Situation wählen" },
                { id: "guide-section-housing-abroad", label: "Aus dem Ausland suchen" },
                { id: "guide-section-housing-types", label: "Wohnformen" },
                { id: "guide-section-housing-channels", label: "Wo suchen" },
                { id: "guide-section-housing-contact", label: "Kontakt und Besichtigung" },
                { id: "guide-section-housing-contract", label: "Mietvertrag und Kosten" },
                { id: "guide-section-housing-scam", label: "Betrug und Anmeldung" },
              ]
          : [];

  const tocItems: ReadonlyArray<GuideTableOfContentsItem> =
    article.slug === "housing-in-germany"
      ? richTocItems
      : [
          ...richTocItems,
          ...sectionOrder.flatMap((key) => {
            const section = article.sections[key];
            return section
              ? [{ id: `guide-section-${key}`, label: section.title }]
              : [];
          }),
          ...(article.steps.length > 0
            ? [{ id: "guide-section-steps", label: copy.steps }]
            : []),
          ...(article.faq.length > 0
            ? [{ id: "guide-section-faq", label: copy.faqSection }]
            : []),
          ...(article.sources.length > 0
            ? [{ id: "guide-section-sources", label: copy.sourcesSection }]
            : []),
        ];

  return (
    <main className="min-h-screen bg-[#F7FAFB] pt-20 text-slate-950 dark:bg-[#111419] dark:text-slate-200">
      <GuideReadingProgress
        targetId="guide-article-content"
        label={copy.readingProgress}
      />

      <article id="guide-article-content">
        <header className="relative border-b border-slate-200 bg-[#f7f7f7] text-slate-950 dark:border-slate-700 dark:bg-[#111419] dark:text-slate-100">
          <div className="relative mx-auto w-full max-w-[1600px] px-[clamp(16px,3.3vw,112px)] py-5 sm:py-7 lg:py-8">
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href={`/guide/${category.slug}`}
                aria-label={`${copy.backToCategory}: ${category.title}`}
                className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#008F78] transition-colors hover:text-[#006D5D] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008F78] sm:text-sm dark:text-[#65CBB6] dark:hover:text-[#91E5D3] dark:focus-visible:outline-[#65CBB6] motion-reduce:transition-none"
              >
                <span aria-hidden="true">←</span>
                {copy.backToCategory}
              </Link>
              <nav
                aria-label="Breadcrumb"
                className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden border-l border-slate-300 pl-4 text-xs text-slate-500 sm:text-sm dark:border-slate-700 dark:text-slate-400"
              >
              <Link
                href="/guide"
                className="shrink-0 font-medium text-emerald-700 transition-colors hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                {copy.guide}
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={`/guide/${category.slug}`}
                className="max-w-[35%] shrink-0 truncate font-medium text-emerald-700 transition hover:text-emerald-600 dark:text-emerald-300 dark:hover:text-emerald-200"
              >
                {category.title}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="min-w-0 truncate" aria-current="page"><BrandedText text={article.title} /></span>
              </nav>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
              {category.title}
            </p>

            <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              <BrandedText text={article.title} />
            </h1>

            <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
              <BrandedText text={article.excerpt} />
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-0.5 border-t border-slate-200 pt-2 text-sm dark:border-slate-700">
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {copy.readingTime}: {article.readingTime}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {copy.lastReviewed}:{" "}
                {formatReviewDate(
                  article.lastReviewedAt,
                  locale,
                )}
              </span>

              <div className="flex items-center">
                  <GuideArticleShareButton title={article.title} locale={locale} />
              </div>
              <ViewCount
                count={article.viewCount}
                locale={locale}
                className="text-sm text-slate-500 dark:text-slate-400"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1600px] px-[clamp(16px,3.3vw,112px)] py-6 sm:py-8 lg:py-9">
          <div className="grid gap-5 lg:grid-cols-[13rem_minmax(0,1fr)] xl:gap-8">
            <GuideTableOfContents
              items={tocItems}
              locale={locale}
            />

            <div className="min-w-0 w-full max-w-[880px]">
              <p className="max-w-[75ch] text-base leading-7 text-slate-700 sm:text-lg sm:leading-8 dark:text-slate-300">
                <BrandedText text={article.intro} />
              </p>

          <section className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
            <h2 className="text-2xl font-bold">
              {copy.keyFacts}
            </h2>

            <dl className="mt-3 grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {article.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-slate-200 py-2.5 dark:border-slate-700"
                >
                  <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <BrandedText text={fact.label} />
                  </dt>
                  <dd className="mt-1 font-semibold leading-6 text-slate-950 dark:text-white">
                    <BrandedText text={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <GuideRichContent
            article={article}
            locale={locale}
          />

          <div className="mt-6 space-y-6">
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
                          <span><BrandedText text={item} /></span>
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
                <OfficialSourcesAccordion
                  title={copy.sources}
                  description={copy.sourceDescription}
                  sources={article.sources}
                  openLabel={copy.openSource}
                />
              </div>
            )}
            <GuideAuthor locale={locale} />

            <div className="[&_aside]:rounded-none [&_aside]:border-x-0 [&_aside]:border-b-0 [&_aside]:border-t-2 [&_aside]:bg-amber-50/40 [&_aside]:px-3 [&_aside]:py-3 [&_aside_h2]:text-base [&_aside_div]:mt-1 [&_aside_div]:text-sm [&_aside_div]:leading-6 dark:[&_aside]:bg-amber-500/5 sm:[&_aside]:px-4">
              <GuideInfoBox
                title={copy.disclaimerTitle}
                variant="warning"
              >
                <p>{copy.disclaimer}</p>
              </GuideInfoBox>
            </div>

            <RelatedGuideArticles
              articles={relatedArticles}
              locale={locale}
              category={category}
              compact={article.slug === "housing-in-germany"}
            />

            {article.slug !== "housing-in-germany" && (
              <GuideArticleNavigation
                category={category}
                previous={previousArticle}
                next={nextArticle}
                locale={locale}
              />
            )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
