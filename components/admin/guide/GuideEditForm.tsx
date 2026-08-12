"use client";

import {
  useActionState,
  type ReactNode,
} from "react";

import type {
  AdminGuideArticle,
  AdminGuideCategorySlug,
} from "@/lib/guide/admin-guide-repository";

type GuideEditFormState = {
  error: string | null;
};

type GuideEditFormAction = (
  previousState: GuideEditFormState,
  formData: FormData,
) => Promise<GuideEditFormState>;

type GuideEditFormProps = {
  locale: "uz" | "de";
  article: AdminGuideArticle;
  formAction: GuideEditFormAction;
};

const initialState: GuideEditFormState = {
  error: null,
};

const categories:
  ReadonlyArray<{
    value: AdminGuideCategorySlug;
    uz: string;
    de: string;
  }> = [
    {
      value:
        "coming-to-germany",
      uz:
        "Germaniyaga kelish",
      de:
        "Nach Deutschland kommen",
    },
    {
      value:
        "visas",
      uz:
        "Vizalar",
      de:
        "Visa",
    },
    {
      value:
        "family",
      uz:
        "Oila",
      de:
        "Familie",
    },
    {
      value:
        "invitation",
      uz:
        "Taklifnoma",
      de:
        "Einladung",
    },
    {
      value:
        "embassy-and-appointments",
      uz:
        "Elchixona va terminlar",
      de:
        "Botschaft und Termine",
    },
    {
      value:
        "documents",
      uz:
        "Hujjatlar",
      de:
        "Dokumente",
    },
    {
      value:
        "language-and-certificates",
      uz:
        "Til va sertifikatlar",
      de:
        "Sprache und Zertifikate",
    },
    {
      value:
        "education",
      uz:
        "Ta’lim",
      de:
        "Bildung",
    },
    {
      value:
        "work-and-career",
      uz:
        "Ish va karyera",
      de:
        "Arbeit und Karriere",
    },
    {
      value:
        "after-arrival",
      uz:
        "Kelgandan keyin",
      de:
        "Nach der Ankunft",
    },
    {
      value:
        "recognition",
      uz:
        "Tan olish",
      de:
        "Anerkennung",
    },
    {
      value:
        "integration",
      uz:
        "Integratsiya",
      de:
        "Integration",
    },
  ];

const copy = {
  uz: {
    core:
      "Asosiy ma’lumotlar",
    uzContent:
      "O‘zbekcha kontent",
    deContent:
      "Nemischa kontent",
    structured:
      "Strukturali kontent",
    sources:
      "Manbalar va bog‘lanishlar",
    slug:
      "Slug",
    category:
      "Kategoriya",
    title:
      "Sarlavha",
    excerpt:
      "Qisqa tavsif",
    intro:
      "Kirish",
    readingTime:
      "O‘qish vaqti",
    reviewed:
      "Oxirgi tekshiruv sanasi",
    facts:
      "Faktlar",
    factsHint:
      "Har qatorda: Label | Value",
    sections:
      "Sections JSON",
    sectionsHint:
      'Masalan: {"requirements":{"title":"Talablar","paragraphs":["..."],"items":["..."]}}',
    steps:
      "Bosqichlar",
    stepsHint:
      "Har qatorda: Title | Description",
    faq:
      "FAQ",
    faqHint:
      "Har qatorda: Question | Answer",
    officialSources:
      "Rasmiy manbalar",
    officialSourcesHint:
      "Har qatorda: Title | Organization | https://... | de yoki en",
    related:
      "Related article slugs",
    relatedHint:
      "Vergul yoki yangi qator bilan ajrating.",
    editNote:
      "Bu forma maqola kontentini yangilaydi. Publish/archive/featured holati Guide boshqaruv sahifasida alohida boshqariladi.",
    save:
      "O‘zgarishlarni saqlash",
    saving:
      "Saqlanmoqda…",
    required:
      "Majburiy",
    optional:
      "Ixtiyoriy",
  },

  de: {
    core:
      "Grunddaten",
    uzContent:
      "Usbekischer Inhalt",
    deContent:
      "Deutscher Inhalt",
    structured:
      "Strukturierter Inhalt",
    sources:
      "Quellen und Verknüpfungen",
    slug:
      "Slug",
    category:
      "Kategorie",
    title:
      "Titel",
    excerpt:
      "Kurzbeschreibung",
    intro:
      "Einleitung",
    readingTime:
      "Lesezeit",
    reviewed:
      "Zuletzt geprüft am",
    facts:
      "Fakten",
    factsHint:
      "Pro Zeile: Label | Value",
    sections:
      "Sections JSON",
    sectionsHint:
      'Beispiel: {"requirements":{"title":"Voraussetzungen","paragraphs":["..."],"items":["..."]}}',
    steps:
      "Schritte",
    stepsHint:
      "Pro Zeile: Titel | Beschreibung",
    faq:
      "FAQ",
    faqHint:
      "Pro Zeile: Frage | Antwort",
    officialSources:
      "Offizielle Quellen",
    officialSourcesHint:
      "Pro Zeile: Titel | Organisation | https://... | de oder en",
    related:
      "Verwandte Artikel-Slugs",
    relatedHint:
      "Mit Komma oder neuer Zeile trennen.",
    editNote:
      "Dieses Formular aktualisiert den Artikelinhalt. Publish/Archiv/Featured wird separat in der Guide-Verwaltung gesteuert.",
    save:
      "Änderungen speichern",
    saving:
      "Wird gespeichert…",
    required:
      "Pflichtfeld",
    optional:
      "Optional",
  },
} as const;

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

function Label({
  children,
  required,
  locale,
}: {
  children: ReactNode;
  required?: boolean;
  locale: "uz" | "de";
}) {
  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  return (
    <span className="flex items-center justify-between gap-3">
      <span>
        {children}
      </span>

      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {required
          ? currentCopy.required
          : currentCopy.optional}
      </span>
    </span>
  );
}

function factsToText(
  facts: AdminGuideArticle["factsUz"],
): string {
  return facts
    .map(
      (fact) =>
        `${fact.label} | ${fact.value}`,
    )
    .join("\n");
}

function stepsToText(
  steps: AdminGuideArticle["stepsUz"],
): string {
  return steps
    .map(
      (step) =>
        `${step.title} | ${step.description}`,
    )
    .join("\n");
}

function faqToText(
  faq: AdminGuideArticle["faqUz"],
): string {
  return faq
    .map(
      (item) =>
        `${item.question} | ${item.answer}`,
    )
    .join("\n");
}

function sourcesToText(
  sources: AdminGuideArticle["sources"],
): string {
  return sources
    .map(
      (source) =>
        `${source.title} | ${source.organization} | ${source.url} | ${source.language}`,
    )
    .join("\n");
}

function sectionsToText(
  sections: AdminGuideArticle["sectionsUz"],
): string {
  return Object.keys(
    sections,
  ).length === 0
    ? ""
    : JSON.stringify(
        sections,
        null,
        2,
      );
}

export default function GuideEditForm({
  locale,
  article,
  formAction,
}: GuideEditFormProps) {
  const [
    state,
    action,
    pending,
  ] =
    useActionState(
      formAction,
      initialState,
    );

  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  return (
    <form
      action={action}
      className="space-y-6"
    >
      <input
        type="hidden"
        name="articleId"
        value={article.id}
      />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.core}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <Label
              locale={locale}
              required
            >
              {currentCopy.slug}
            </Label>

            <input
              name="slug"
              required
              disabled={pending}
              defaultValue={article.slug}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <Label
              locale={locale}
              required
            >
              {currentCopy.category}
            </Label>

            <select
              name="categorySlug"
              required
              disabled={pending}
              defaultValue={
                article.categorySlug
              }
              className={inputClassName}
            >
              {categories.map(
                (category) => (
                  <option
                    key={
                      category.value
                    }
                    value={
                      category.value
                    }
                  >
                    {locale === "de"
                      ? category.de
                      : category.uz}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <Label
              locale={locale}
              required
            >
              {currentCopy.reviewed}
            </Label>

            <input
              name="lastReviewedAt"
              type="date"
              required
              disabled={pending}
              defaultValue={
                article.lastReviewedAt
              }
              className={inputClassName}
            />
          </label>
        </div>

        <p className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm leading-6 text-teal-800 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-200">
          {currentCopy.editNote}
        </p>
      </section>

      {(
        [
          {
            code: "Uz",
            heading:
              currentCopy.uzContent,
            title:
              article.titleUz,
            excerpt:
              article.excerptUz,
            intro:
              article.introUz,
            readingTime:
              article.readingTimeUz,
          },
          {
            code: "De",
            heading:
              currentCopy.deContent,
            title:
              article.titleDe,
            excerpt:
              article.excerptDe,
            intro:
              article.introDe,
            readingTime:
              article.readingTimeDe,
          },
        ] as const
      ).map(
        ({
          code,
          heading,
          title,
          excerpt,
          intro,
          readingTime,
        }) => (
          <section
            key={code}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
          >
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              {heading}
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <Label
                  locale={locale}
                  required
                >
                  {currentCopy.title}
                </Label>

                <input
                  name={`title${code}`}
                  required
                  disabled={pending}
                  defaultValue={title}
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <Label
                  locale={locale}
                  required
                >
                  {currentCopy.excerpt}
                </Label>

                <textarea
                  name={`excerpt${code}`}
                  rows={3}
                  required
                  disabled={pending}
                  defaultValue={excerpt}
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <Label
                  locale={locale}
                  required
                >
                  {currentCopy.intro}
                </Label>

                <textarea
                  name={`intro${code}`}
                  rows={5}
                  required
                  disabled={pending}
                  defaultValue={intro}
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <Label
                  locale={locale}
                  required
                >
                  {currentCopy.readingTime}
                </Label>

                <input
                  name={`readingTime${code}`}
                  required
                  disabled={pending}
                  defaultValue={readingTime}
                  className={inputClassName}
                />
              </label>
            </div>
          </section>
        ),
      )}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.structured}
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {(
            [
              {
                code: "Uz",
                localeLabel:
                  "UZ",
                facts:
                  article.factsUz,
                sections:
                  article.sectionsUz,
                steps:
                  article.stepsUz,
                faq:
                  article.faqUz,
              },
              {
                code: "De",
                localeLabel:
                  "DE",
                facts:
                  article.factsDe,
                sections:
                  article.sectionsDe,
                steps:
                  article.stepsDe,
                faq:
                  article.faqDe,
              },
            ] as const
          ).map(
            ({
              code,
              localeLabel,
              facts,
              sections,
              steps,
              faq,
            }) => (
              <div
                key={code}
                className="space-y-5 rounded-3xl border border-slate-200 p-5 dark:border-slate-700"
              >
                <p className="text-xs font-black uppercase tracking-[0.15em] text-teal-600 dark:text-teal-400">
                  {localeLabel}
                </p>

                <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                  <Label
                    locale={locale}
                  >
                    {currentCopy.facts}
                  </Label>

                  <textarea
                    name={`facts${code}`}
                    rows={6}
                    disabled={pending}
                    defaultValue={
                      factsToText(
                        facts,
                      )
                    }
                    className={inputClassName}
                  />

                  <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                    {currentCopy.factsHint}
                  </span>
                </label>

                <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                  <Label
                    locale={locale}
                  >
                    {currentCopy.sections}
                  </Label>

                  <textarea
                    name={`sections${code}`}
                    rows={14}
                    disabled={pending}
                    defaultValue={
                      sectionsToText(
                        sections,
                      )
                    }
                    className={`${inputClassName} font-mono text-xs`}
                  />

                  <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                    {currentCopy.sectionsHint}
                  </span>
                </label>

                <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                  <Label
                    locale={locale}
                  >
                    {currentCopy.steps}
                  </Label>

                  <textarea
                    name={`steps${code}`}
                    rows={7}
                    disabled={pending}
                    defaultValue={
                      stepsToText(
                        steps,
                      )
                    }
                    className={inputClassName}
                  />

                  <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                    {currentCopy.stepsHint}
                  </span>
                </label>

                <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                  <Label
                    locale={locale}
                  >
                    {currentCopy.faq}
                  </Label>

                  <textarea
                    name={`faq${code}`}
                    rows={7}
                    disabled={pending}
                    defaultValue={
                      faqToText(
                        faq,
                      )
                    }
                    className={inputClassName}
                  />

                  <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                    {currentCopy.faqHint}
                  </span>
                </label>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.sources}
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <Label
              locale={locale}
            >
              {currentCopy.officialSources}
            </Label>

            <textarea
              name="sources"
              rows={6}
              disabled={pending}
              defaultValue={
                sourcesToText(
                  article.sources,
                )
              }
              className={inputClassName}
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {
                currentCopy.officialSourcesHint
              }
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <Label
              locale={locale}
            >
              {currentCopy.related}
            </Label>

            <textarea
              name="relatedArticleSlugs"
              rows={4}
              disabled={pending}
              defaultValue={
                article.relatedArticleSlugs.join(
                  "\n",
                )
              }
              className={inputClassName}
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {
                currentCopy.relatedHint
              }
            </span>
          </label>
        </div>
      </section>

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/15 transition hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? currentCopy.saving
            : currentCopy.save}
        </button>
      </div>
    </form>
  );
}
