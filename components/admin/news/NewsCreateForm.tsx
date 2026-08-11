"use client";

import { useActionState } from "react";

import {
  createNewsAction,
  type NewsCreateActionState,
} from "@/app/[locale]/admin/news/new/actions";

const initialState: NewsCreateActionState = {
  error: null,
};

type NewsCreateFormProps = {
  locale: "uz" | "de";
};

const contentTypeOptions = [
  {
    value: "official_info",
    uz: "Rasmiy ma’lumot",
    de: "Offizielle Information",
  },
  {
    value: "guide",
    uz: "Foydali qo‘llanma",
    de: "Praktischer Ratgeber",
  },
  {
    value: "education",
    uz: "Ta’lim",
    de: "Bildung",
  },
  {
    value: "work_migration",
    uz: "Ish va migratsiya",
    de: "Arbeit und Migration",
  },
  {
    value: "consular",
    uz: "Konsullik",
    de: "Konsularisches",
  },
] as const;

const copy = {
  uz: {
    save: "Qoralama sifatida saqlash",
    saving: "Saqlanmoqda…",
    required: "Majburiy",
    optional: "Ixtiyoriy",
    uzSection: "O‘zbekcha kontent",
    deSection: "Nemischa kontent",
    commonSection: "Umumiy ma’lumotlar",
    title: "Sarlavha",
    excerpt: "Qisqa tavsif",
    content: "Maqola matni",
    contentHint:
      "Har bir paragraf orasida bitta bo‘sh qator qoldiring.",
    category: "Kategoriya",
    readingTime: "O‘qish vaqti",
    sourceLanguage: "Manba tili",
    location: "Hudud",
    slug: "Slug",
    slugHint:
      "Masalan: germaniyada-yangi-qoida. Saqlashda avtomatik normallashtiriladi.",
    contentType: "Kontent turi",
    sourceName: "Manba nomi",
    sourceUrl: "Manba URL",
    verifiedAt: "Oxirgi tekshiruv sanasi",
    draftNote:
      "Yangi maqola avtomatik ravishda qoralama holatida saqlanadi va hozircha public News sahifasiga chiqmaydi.",
  },
  de: {
    save: "Als Entwurf speichern",
    saving: "Wird gespeichert…",
    required: "Pflichtfeld",
    optional: "Optional",
    uzSection: "Usbekischer Inhalt",
    deSection: "Deutscher Inhalt",
    commonSection: "Gemeinsame Angaben",
    title: "Titel",
    excerpt: "Kurzbeschreibung",
    content: "Artikeltext",
    contentHint:
      "Lassen Sie zwischen zwei Absätzen jeweils eine Leerzeile.",
    category: "Kategorie",
    readingTime: "Lesezeit",
    sourceLanguage: "Sprache der Quelle",
    location: "Region",
    slug: "Slug",
    slugHint:
      "Zum Beispiel: neue-regel-in-deutschland. Der Wert wird beim Speichern normalisiert.",
    contentType: "Inhaltstyp",
    sourceName: "Name der Quelle",
    sourceUrl: "Quellen-URL",
    verifiedAt: "Zuletzt geprüft am",
    draftNote:
      "Neue Beiträge werden automatisch als Entwurf gespeichert und erscheinen vorerst nicht im öffentlichen Nachrichtenbereich.",
  },
} as const;

function FieldLabel({
  children,
  optional = false,
  locale,
}: {
  children: React.ReactNode;
  optional?: boolean;
  locale: "uz" | "de";
}) {
  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  return (
    <span className="flex items-center justify-between gap-3">
      <span>{children}</span>
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {optional
          ? currentCopy.optional
          : currentCopy.required}
      </span>
    </span>
  );
}

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

export default function NewsCreateForm({
  locale,
}: NewsCreateFormProps) {
  const [state, formAction, pending] =
    useActionState(
      createNewsAction,
      initialState,
    );

  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.commonSection}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.slug}
            </FieldLabel>

            <input
              name="slug"
              type="text"
              required
              disabled={pending}
              placeholder="germaniyada-yangi-qoida"
              className={inputClassName}
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.slugHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.contentType}
            </FieldLabel>

            <select
              name="contentType"
              required
              disabled={pending}
              defaultValue="official_info"
              className={inputClassName}
            >
              {contentTypeOptions.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {locale === "de"
                      ? option.de
                      : option.uz}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.verifiedAt}
            </FieldLabel>

            <input
              name="verifiedAt"
              type="date"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.sourceName}
            </FieldLabel>

            <input
              name="sourceName"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.sourceUrl}
            </FieldLabel>

            <input
              name="sourceUrl"
              type="url"
              required
              disabled={pending}
              placeholder="https://..."
              className={inputClassName}
            />
          </label>
        </div>

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {currentCopy.draftNote}
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.uzSection}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.title}
            </FieldLabel>
            <input
              name="titleUz"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.excerpt}
            </FieldLabel>
            <textarea
              name="excerptUz"
              rows={3}
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.content}
            </FieldLabel>
            <textarea
              name="contentUz"
              rows={10}
              required
              disabled={pending}
              className={inputClassName}
            />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.contentHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.category}
            </FieldLabel>
            <input
              name="categoryUz"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.readingTime}
            </FieldLabel>
            <input
              name="readingTimeUz"
              type="text"
              required
              disabled={pending}
              placeholder="5 daqiqa"
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.sourceLanguage}
            </FieldLabel>
            <input
              name="sourceLanguageUz"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
              optional
            >
              {currentCopy.location}
            </FieldLabel>
            <input
              name="locationUz"
              type="text"
              disabled={pending}
              className={inputClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.deSection}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.title}
            </FieldLabel>
            <input
              name="titleDe"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.excerpt}
            </FieldLabel>
            <textarea
              name="excerptDe"
              rows={3}
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.content}
            </FieldLabel>
            <textarea
              name="contentDe"
              rows={10}
              required
              disabled={pending}
              className={inputClassName}
            />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.contentHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.category}
            </FieldLabel>
            <input
              name="categoryDe"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.readingTime}
            </FieldLabel>
            <input
              name="readingTimeDe"
              type="text"
              required
              disabled={pending}
              placeholder="5 Minuten"
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.sourceLanguage}
            </FieldLabel>
            <input
              name="sourceLanguageDe"
              type="text"
              required
              disabled={pending}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
              optional
            >
              {currentCopy.location}
            </FieldLabel>
            <input
              name="locationDe"
              type="text"
              disabled={pending}
              className={inputClassName}
            />
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
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? currentCopy.saving
            : currentCopy.save}
        </button>
      </div>
    </form>
  );
}
