"use client";

import {
  useActionState,
  type ReactNode,
} from "react";

import type {
  AdminServiceCategory,
} from "@/lib/services/admin-services-repository";

type ServiceFormState = {
  error: string | null;
};

type ServiceFormAction = (
  previousState: ServiceFormState,
  formData: FormData,
) => Promise<ServiceFormState>;

type ServiceFormProps = {
  locale: "uz" | "de";
  formAction: ServiceFormAction;
};

const initialState: ServiceFormState = {
  error: null,
};

const categoryOptions: ReadonlyArray<{
  value: AdminServiceCategory;
  uz: string;
  de: string;
}> = [
  {
    value: "translation",
    uz: "Tarjima",
    de: "Übersetzung",
  },
  {
    value: "legal",
    uz: "Huquq",
    de: "Recht",
  },
  {
    value: "tax",
    uz: "Soliq",
    de: "Steuern",
  },
  {
    value: "medical",
    uz: "Tibbiyot",
    de: "Medizin",
  },
  {
    value: "craft",
    uz: "Hunarmandchilik",
    de: "Handwerk",
  },
  {
    value: "consumer",
    uz: "Iste’molchi huquqlari",
    de: "Verbraucherschutz",
  },
];

const copy = {
  uz: {
    save: "Qoralama sifatida saqlash",
    saving: "Saqlanmoqda…",
    required: "Majburiy",
    commonSection: "Umumiy ma’lumotlar",
    uzSection: "O‘zbekcha kontent",
    deSection: "Nemischa kontent",
    slug: "Slug",
    slugHint:
      "Masalan: yangi-xizmat-qollanmasi. Saqlash vaqtida avtomatik normallashtiriladi.",
    category: "Kategoriya",
    icon: "Icon / qisqa belgi",
    iconHint:
      "Masalan: TR, §, €, + yoki 🔧.",
    sourceName: "Rasmiy manba nomi",
    sourceUrl: "Rasmiy manba URL",
    title: "Sarlavha",
    shortTitle: "Qisqa sarlavha",
    description: "Tavsif",
    services: "Xizmat turlari",
    servicesHint:
      "Har bir xizmatni yangi qatordan yozing. UZ va DE ro‘yxatlar soni bir xil bo‘lishi kerak.",
    verificationSteps:
      "Tekshirish bosqichlari",
    verificationStepsHint:
      "Har bir bosqichni yangi qatordan yozing. UZ va DE ro‘yxatlar soni bir xil bo‘lishi kerak.",
    notes: "Muhim eslatmalar",
    notesHint:
      "Har bir eslatmani yangi qatordan yozing. UZ va DE ro‘yxatlar soni bir xil bo‘lishi kerak.",
    sourceDescription:
      "Manba tavsifi",
    location: "Hudud / qamrov",
    note:
      "Yangi xizmat avtomatik ravishda qoralama holatida PostgreSQL’ga saqlanadi. Public Xizmatlar bo‘limi hozircha static data bilan ishlaydi.",
  },
  de: {
    save: "Als Entwurf speichern",
    saving: "Wird gespeichert…",
    required: "Pflichtfeld",
    commonSection: "Gemeinsame Angaben",
    uzSection: "Usbekischer Inhalt",
    deSection: "Deutscher Inhalt",
    slug: "Slug",
    slugHint:
      "Zum Beispiel: neuer-dienstleistungsleitfaden. Der Wert wird beim Speichern normalisiert.",
    category: "Kategorie",
    icon: "Icon / Kurzzeichen",
    iconHint:
      "Zum Beispiel: TR, §, €, + oder 🔧.",
    sourceName:
      "Name der offiziellen Quelle",
    sourceUrl:
      "URL der offiziellen Quelle",
    title: "Titel",
    shortTitle: "Kurztitel",
    description: "Beschreibung",
    services: "Dienstleistungen",
    servicesHint:
      "Jede Dienstleistung in eine neue Zeile schreiben. Die UZ- und DE-Listen müssen gleich viele Einträge enthalten.",
    verificationSteps:
      "Prüfschritte",
    verificationStepsHint:
      "Jeden Prüfschritt in eine neue Zeile schreiben. Die UZ- und DE-Listen müssen gleich viele Einträge enthalten.",
    notes: "Wichtige Hinweise",
    notesHint:
      "Jeden Hinweis in eine neue Zeile schreiben. Die UZ- und DE-Listen müssen gleich viele Einträge enthalten.",
    sourceDescription:
      "Beschreibung der Quelle",
    location:
      "Gebiet / Geltungsbereich",
    note:
      "Neue Dienstleistungen werden automatisch als Entwurf in PostgreSQL gespeichert. Der öffentliche Bereich Dienstleistungen verwendet vorerst weiterhin statische Daten.",
  },
} as const;

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

function FieldLabel({
  children,
  locale,
}: {
  children: ReactNode;
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
        {currentCopy.required}
      </span>
    </span>
  );
}

export default function ServiceForm({
  locale,
  formAction,
}: ServiceFormProps) {
  const [
    state,
    action,
    pending,
  ] = useActionState(
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
              placeholder="yangi-xizmat-qollanmasi"
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
              defaultValue="translation"
              className={inputClassName}
            >
              {categoryOptions.map(
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
              {currentCopy.icon}
            </FieldLabel>

            <input
              name="icon"
              type="text"
              required
              disabled={pending}
              placeholder="TR"
              className={inputClassName}
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.iconHint}
            </span>
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
              placeholder="https://..."
              className={inputClassName}
            />
          </label>
        </div>

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {currentCopy.note}
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.uzSection}
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.title}
            </FieldLabel>
            <input name="titleUz" type="text" required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.shortTitle}
            </FieldLabel>
            <input name="shortTitleUz" type="text" required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.description}
            </FieldLabel>
            <textarea name="descriptionUz" rows={4} required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.services}
            </FieldLabel>
            <textarea name="servicesUz" rows={7} required disabled={pending} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.servicesHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.verificationSteps}
            </FieldLabel>
            <textarea name="verificationStepsUz" rows={9} required disabled={pending} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.verificationStepsHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.notes}
            </FieldLabel>
            <textarea name="importantNotesUz" rows={7} required disabled={pending} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.notesHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.sourceDescription}
            </FieldLabel>
            <textarea name="sourceDescriptionUz" rows={4} required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.location}
            </FieldLabel>
            <input name="locationUz" type="text" required disabled={pending} className={inputClassName} />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.deSection}
        </h2>

        <div className="mt-6 grid gap-5">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.title}
            </FieldLabel>
            <input name="titleDe" type="text" required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.shortTitle}
            </FieldLabel>
            <input name="shortTitleDe" type="text" required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.description}
            </FieldLabel>
            <textarea name="descriptionDe" rows={4} required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.services}
            </FieldLabel>
            <textarea name="servicesDe" rows={7} required disabled={pending} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.servicesHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.verificationSteps}
            </FieldLabel>
            <textarea name="verificationStepsDe" rows={9} required disabled={pending} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.verificationStepsHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.notes}
            </FieldLabel>
            <textarea name="importantNotesDe" rows={7} required disabled={pending} className={inputClassName} />
            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {currentCopy.notesHint}
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.sourceDescription}
            </FieldLabel>
            <textarea name="sourceDescriptionDe" rows={4} required disabled={pending} className={inputClassName} />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.location}
            </FieldLabel>
            <input name="locationDe" type="text" required disabled={pending} className={inputClassName} />
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
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/15 transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? currentCopy.saving
            : currentCopy.save}
        </button>
      </div>
    </form>
  );
}
