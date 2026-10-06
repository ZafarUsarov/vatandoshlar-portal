"use client";

import { useActionState, useEffect, useRef } from "react";

import {
  createAnswerAction,
  type CreateAnswerState,
} from "@/app/savol/[slug]/actions";

const initialState: CreateAnswerState = {
  error: null,
};

type Props = Readonly<{
  locale: "uz" | "de";
  slug: string;
}>;

export default function CreateAnswerForm({ locale, slug }: Props) {
  const [state, formAction, pending] = useActionState(
    createAnswerAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!pending && state.error === null) {
      formRef.current?.reset();
    }
  }, [pending, state]);

  const copy =
    locale === "de"
      ? {
          label: "Ihre Antwort",
          placeholder: "Schreiben Sie eine hilfreiche und konkrete Antwort.",
          submit: "Antwort veröffentlichen",
          pending: "Wird veröffentlicht…",
        }
      : {
          label: "Javobingiz",
          placeholder: "Foydali va aniq javob yozing.",
          submit: "Javobni e’lon qilish",
          pending: "E’lon qilinmoqda…",
        };

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-4" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="slug" value={slug} />

      {state.error ? (
        <div
          id="savol-answer-error"
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="savol-answer" className="mb-2 block text-sm font-semibold">
          {copy.label}
        </label>
        <textarea
          id="savol-answer"
          name="body"
          rows={6}
          minLength={10}
          maxLength={10000}
          required
          disabled={pending}
          placeholder={copy.placeholder}
          aria-describedby={state.error ? "savol-answer-error" : undefined}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 leading-7 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-950"
      >
        {pending ? copy.pending : copy.submit}
      </button>
    </form>
  );
}
