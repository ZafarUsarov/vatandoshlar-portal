"use client";

import {
  useActionState,
  type ReactNode,
} from "react";

import type {
  AdminJobCategory,
  AdminJobGuide,
} from "@/lib/jobs/admin-jobs-repository";

type JobFormState = {
  error: string | null;
};

type JobFormAction = (
  previousState: JobFormState,
  formData: FormData,
) => Promise<JobFormState>;

type JobGuideFormProps = {
  locale: "uz" | "de";
  formAction: JobFormAction;
  mode: "create" | "edit";
  guide?: AdminJobGuide;
};

const initialState: JobFormState = {
  error: null,
};

const categoryOptions: ReadonlyArray<{
  value: AdminJobCategory;
  uz: string;
  de: string;
}> = [
  {
    value: "students",
    uz: "Talabalar",
    de: "Studierende",
  },
  {
    value: "english",
    uz: "Ingliz tilida",
    de: "Englischsprachige Stellen",
  },
  {
    value: "minijob",
    uz: "Minijob",
    de: "Minijob",
  },
  {
    value: "internship",
    uz: "Amaliyot",
    de: "Praktikum",
  },
  {
    value: "professionals",
    uz: "Malakali mutaxassislar",
    de: "Fachkräfte",
  },
  {
    value: "safety",
    uz: "Xavfsiz ish qidirish",
    de: "Sichere Jobsuche",
  },
];

const copy = {
  uz: {
    saveCreate: "Qoralama sifatida saqlash",
    saveEdit: "O‘zgarishlarni saqlash",
    saving: "Saqlanmoqda…",
    required: "Majburiy",
    commonSection: "Umumiy ma’lumotlar",
    uzSection: "O‘zbekcha kontent",
    deSection: "Nemischa kontent",
    slug: "Slug",
    slugHint:
      "Masalan: germaniyada-yangi-ish-qollanmasi. Saqlashda avtomatik normallashtiriladi.",
    category: "Kategoriya",
    icon: "Icon / qisqa belgi",
    iconHint: "Masalan: 💼, €, EN yoki IT.",
    verifiedAt: "Oxirgi tekshiruv sanasi",
    sourceName: "Rasmiy manba nomi",
    sourceUrl: "Rasmiy manba URL",
    keywords: "Qidiruv so‘zlari",
    keywordsHint:
      "Har bir qidiruv so‘zini yangi qatordan yozing.",
    title: "Sarlavha",
    shortTitle: "Qisqa sarlavha",
    description: "Tavsif",
    audience: "Kimlar uchun",
    highlights: "Asosiy mavzular",
    highlightsHint:
      "Har bir mavzuni yangi qatordan yozing. UZ va DE ro‘yxatlar soni bir xil bo‘lishi kerak.",
    steps: "Bosqichma-bosqich yo‘riqnoma",
    stepsHint:
      "Har bir bosqichni yangi qatordan yozing. UZ va DE ro‘yxatlar soni bir xil bo‘lishi kerak.",
    notes: "Muhim ogohlantirishlar",
    notesHint:
      "Har bir ogohlantirishni yangi qatordan yozing. UZ va DE ro‘yxatlar soni bir xil bo‘lishi kerak.",
    sourceDescription: "Manba tavsifi",
    createNote:
      "Yangi Jobs qo‘llanmasi avtomatik ravishda qoralama holatida saqlanadi. Public Ish bo‘limi hozircha static data bilan ishlaydi.",
    editNote:
      "Tahrirlash admin PostgreSQL yozuvini o‘zgartiradi. Public Ish bo‘limi hozircha static data bilan ishlaydi.",
  },
  de: {
    saveCreate: "Als Entwurf speichern",
    saveEdit: "Änderungen speichern",
    saving: "Wird gespeichert…",
    required: "Pflichtfeld",
    commonSection: "Gemeinsame Angaben",
    uzSection: "Usbekischer Inhalt",
    deSection: "Deutscher Inhalt",
    slug: "Slug",
    slugHint:
      "Zum Beispiel: neuer-jobleitfaden-deutschland. Der Wert wird beim Speichern normalisiert.",
    category: "Kategorie",
    icon: "Icon / Kurzzeichen",
    iconHint: "Zum Beispiel: 💼, €, EN oder IT.",
    verifiedAt: "Zuletzt geprüft am",
    sourceName: "Name der offiziellen Quelle",
    sourceUrl: "URL der offiziellen Quelle",
    keywords: "Suchbegriffe",
    keywordsHint:
      "Jeden Suchbegriff in eine neue Zeile schreiben.",
    title: "Titel",
    shortTitle: "Kurztitel",
    description: "Beschreibung",
    audience: "Für wen",
    highlights: "Wichtige Themen",
    highlightsHint:
      "Jeden Punkt in eine neue Zeile schreiben. Die UZ- und DE-Listen müssen gleich viele Einträge enthalten.",
    steps: "Schritt-für-Schritt-Anleitung",
    stepsHint:
      "Jeden Schritt in eine neue Zeile schreiben. Die UZ- und DE-Listen müssen gleich viele Einträge enthalten.",
    notes: "Wichtige Hinweise",
    notesHint:
      "Jeden Hinweis in eine neue Zeile schreiben. Die UZ- und DE-Listen müssen gleich viele Einträge enthalten.",
    sourceDescription: "Beschreibung der Quelle",
    createNote:
      "Neue Jobleitfäden werden automatisch als Entwurf gespeichert. Der öffentliche Bereich Arbeit verwendet vorerst weiterhin statische Daten.",
    editNote:
      "Die Bearbeitung ändert den PostgreSQL-Eintrag im Admin-Bereich. Der öffentliche Bereich Arbeit verwendet vorerst weiterhin statische Daten.",
  },
} as const;

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

function FieldLabel({
  children,
  locale,
}: {
  children: ReactNode;
  locale: "uz" | "de";
}) {
  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  return (
    <span className="flex items-center justify-between gap-3">
      <span>{children}</span>
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {currentCopy.required}
      </span>
    </span>
  );
}

export default function JobGuideForm({
  locale,
  formAction,
  mode,
  guide,
}: JobGuideFormProps) {
  const [state, action, pending] =
    useActionState(
      formAction,
      initialState,
    );

  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  const listValue = (
    values?: string[],
  ) => values?.join("\n") ?? "";

  return (
    <form action={action} className="space-y-6">
      {mode === "edit" && guide && (
        <input
          type="hidden"
          name="guideId"
          value={guide.id}
        />
      )}

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
              defaultValue={guide?.slug}
              placeholder="germaniyada-yangi-ish-qollanmasi"
              className={inputClassName}
            />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.slugHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.category}
            </FieldLabel>
            <select
              name="category"
              required
              disabled={pending}
              defaultValue={guide?.category ?? "students"}
              className={inputClassName}
            >
              {categoryOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {locale === "de"
                    ? option.de
                    : option.uz}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.icon}
            </FieldLabel>
            <input
              name="icon"
              type="text"
              required
              disabled={pending}
              defaultValue={guide?.icon}
              placeholder="💼"
              className={inputClassName}
            />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.iconHint}
            </span>
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
              defaultValue={guide?.verifiedAt}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.sourceName}
            </FieldLabel>
            <input
              name="officialSourceName"
              type="text"
              required
              disabled={pending}
              defaultValue={guide?.officialSourceName}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.sourceUrl}
            </FieldLabel>
            <input
              name="officialSourceUrl"
              type="url"
              required
              disabled={pending}
              defaultValue={guide?.officialSourceUrl}
              placeholder="https://..."
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.keywords}
            </FieldLabel>
            <textarea
              name="searchKeywords"
              rows={6}
              required
              disabled={pending}
              defaultValue={listValue(
                guide?.searchKeywords,
              )}
              className={inputClassName}
            />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.keywordsHint}
            </span>
          </label>
        </div>

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {mode === "edit"
            ? currentCopy.editNote
            : currentCopy.createNote}
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.uzSection}
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.title}</FieldLabel>
            <input name="titleUz" type="text" required disabled={pending} defaultValue={guide?.titleUz} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.shortTitle}</FieldLabel>
            <input name="shortTitleUz" type="text" required disabled={pending} defaultValue={guide?.shortTitleUz} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.description}</FieldLabel>
            <textarea name="descriptionUz" rows={4} required disabled={pending} defaultValue={guide?.descriptionUz} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.audience}</FieldLabel>
            <textarea name="audienceUz" rows={3} required disabled={pending} defaultValue={guide?.audienceUz} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.highlights}</FieldLabel>
            <textarea name="highlightsUz" rows={7} required disabled={pending} defaultValue={listValue(guide?.highlightsUz)} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{currentCopy.highlightsHint}</span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.steps}</FieldLabel>
            <textarea name="stepsUz" rows={10} required disabled={pending} defaultValue={listValue(guide?.stepsUz)} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{currentCopy.stepsHint}</span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.notes}</FieldLabel>
            <textarea name="importantNotesUz" rows={8} required disabled={pending} defaultValue={listValue(guide?.importantNotesUz)} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{currentCopy.notesHint}</span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.sourceDescription}</FieldLabel>
            <textarea name="sourceDescriptionUz" rows={4} required disabled={pending} defaultValue={guide?.sourceDescriptionUz} className={inputClassName} />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.deSection}
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.title}</FieldLabel>
            <input name="titleDe" type="text" required disabled={pending} defaultValue={guide?.titleDe} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.shortTitle}</FieldLabel>
            <input name="shortTitleDe" type="text" required disabled={pending} defaultValue={guide?.shortTitleDe} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.description}</FieldLabel>
            <textarea name="descriptionDe" rows={4} required disabled={pending} defaultValue={guide?.descriptionDe} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.audience}</FieldLabel>
            <textarea name="audienceDe" rows={3} required disabled={pending} defaultValue={guide?.audienceDe} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.highlights}</FieldLabel>
            <textarea name="highlightsDe" rows={7} required disabled={pending} defaultValue={listValue(guide?.highlightsDe)} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{currentCopy.highlightsHint}</span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.steps}</FieldLabel>
            <textarea name="stepsDe" rows={10} required disabled={pending} defaultValue={listValue(guide?.stepsDe)} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{currentCopy.stepsHint}</span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.notes}</FieldLabel>
            <textarea name="importantNotesDe" rows={8} required disabled={pending} defaultValue={listValue(guide?.importantNotesDe)} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">{currentCopy.notesHint}</span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>{currentCopy.sourceDescription}</FieldLabel>
            <textarea name="sourceDescriptionDe" rows={4} required disabled={pending} defaultValue={guide?.sourceDescriptionDe} className={inputClassName} />
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
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? currentCopy.saving
            : mode === "edit"
              ? currentCopy.saveEdit
              : currentCopy.saveCreate}
        </button>
      </div>
    </form>
  );
}
