"use client";

import { useActionState, useState } from "react";

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
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
          titleHint: "10–180 Zeichen",
          writing: "Beschreibung",
          privacy: "Bitte keine sensiblen persönlichen Daten veröffentlichen.",
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
          titleHint: "10–180 belgi",
          writing: "Savol tafsilotlari",
          privacy: "Maxfiy shaxsiy ma’lumotlarni joylamang.",
        };

  const controlClass =
    "min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <form action={formAction} className="space-y-5">
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
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          minLength={10}
          maxLength={180}
          required
          disabled={pending}
          placeholder={copy.titlePlaceholder}
          aria-invalid={state.errorField === "title" || undefined}
          aria-describedby={state.error ? "savol-create-error" : undefined}
          className={controlClass}
        />
        <p className="mt-1.5 text-right text-xs tabular-nums text-slate-500 dark:text-slate-400">{title.length}/180 · {copy.titleHint}</p>
      </div>

      <div>
        <label htmlFor="savol-body" className="mb-2 block text-sm font-semibold">
          {copy.body}
        </label>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-emerald-600"><path d="M4 20h16M6 16l10-10 3 3-10 10H6v-3Z"/></svg>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{copy.writing}</span>
          </div>
        <textarea
          id="savol-body"
          name="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          minLength={20}
          maxLength={10000}
          required
          disabled={pending}
          rows={7}
          placeholder={copy.bodyPlaceholder}
          aria-invalid={state.errorField === "body" || undefined}
          aria-describedby={state.error ? "savol-create-error" : undefined}
          className="block min-h-48 w-full resize-y border-0 bg-transparent px-4 py-4 text-sm leading-7 text-slate-950 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-white sm:text-base"
        />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M12 3 3 7v5c0 5 3.5 8 9 9 5.5-1 9-4 9-9V7l-9-4Z"/><path d="m9 12 2 2 4-4"/></svg>{copy.privacy}</span>
            <span className="tabular-nums">{body.length}/10000</span>
          </div>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{copy.empty}</p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <span aria-hidden="true" />
      <button
        type="submit"
        disabled={pending || categories.length === 0}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-950"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/></svg>
        {pending ? copy.pending : copy.submit}
      </button>
      </div>
    </form>
  );
}
