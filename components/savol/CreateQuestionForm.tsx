"use client";

import { useActionState } from "react";

import {
  createQuestionAction,
  type CreateQuestionState,
} from "@/app/savol/new/actions";
import type { QuestionCategory } from "@/types/savol";

const initialState: CreateQuestionState = {
  error: null,
  errorField: null,
};

type Props = Readonly<{
  locale: "uz" | "de";
  categories: ReadonlyArray<QuestionCategory>;
}>;

export default function CreateQuestionForm({ locale, categories }: Props) {
  const [state, formAction, pending] = useActionState(
    createQuestionAction,
    initialState,
  );

  const copy =
    locale === "de"
      ? {
          category: "Kategorie",
          categoryPlaceholder: "Kategorie auswählen",
          title: "Titel",
          titlePlaceholder: "Was möchten Sie wissen?",
          body: "Ihre Frage",
          bodyPlaceholder:
            "Beschreiben Sie Ihre Situation so konkret wie möglich. Bitte keine sensiblen persönlichen Daten veröffentlichen.",
          submit: "Frage veröffentlichen",
          pending: "Wird veröffentlicht…",
          empty: "Derzeit sind keine Kategorien verfügbar.",
        }
      : {
          category: "Kategoriya",
          categoryPlaceholder: "Kategoriyani tanlang",
          title: "Sarlavha",
          titlePlaceholder: "Nimani bilmoqchisiz?",
          body: "Savolingiz",
          bodyPlaceholder:
            "Vaziyatingizni imkon qadar aniq yozing. Maxfiy shaxsiy ma’lumotlarni joylamang.",
          submit: "Savolni e’lon qilish",
          pending: "E’lon qilinmoqda…",
          empty: "Hozircha kategoriyalar mavjud emas.",
        };

  const controlClass =
    "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {state.error ? (
        <div
          id="savol-create-error"
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="savol-category" className="mb-2 block text-sm font-semibold">
          {copy.category}
        </label>
        <select
          id="savol-category"
          name="categoryId"
          required
          defaultValue=""
          disabled={pending || categories.length === 0}
          aria-invalid={state.errorField === "categoryId" || undefined}
          aria-describedby={state.error ? "savol-create-error" : undefined}
          className={controlClass}
        >
          <option value="" disabled>
            {copy.categoryPlaceholder}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {locale === "de" ? category.labelDe : category.labelUz}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="savol-title" className="mb-2 block text-sm font-semibold">
          {copy.title}
        </label>
        <input
          id="savol-title"
          name="title"
          type="text"
          minLength={10}
          maxLength={180}
          required
          disabled={pending}
          placeholder={copy.titlePlaceholder}
          aria-invalid={state.errorField === "title" || undefined}
          aria-describedby={state.error ? "savol-create-error" : undefined}
          className={controlClass}
        />
      </div>

      <div>
        <label htmlFor="savol-body" className="mb-2 block text-sm font-semibold">
          {copy.body}
        </label>
        <textarea
          id="savol-body"
          name="body"
          minLength={20}
          maxLength={10000}
          required
          disabled={pending}
          rows={9}
          placeholder={copy.bodyPlaceholder}
          aria-invalid={state.errorField === "body" || undefined}
          aria-describedby={state.error ? "savol-create-error" : undefined}
          className={`${controlClass} py-3 leading-7`}
        />
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{copy.empty}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending || categories.length === 0}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-950"
      >
        {pending ? copy.pending : copy.submit}
      </button>
    </form>
  );
}
