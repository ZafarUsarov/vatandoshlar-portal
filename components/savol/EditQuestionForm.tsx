"use client";

import { useActionState, useState } from "react";
import QuestionAttachmentManager from "@/components/savol/QuestionAttachmentManager";
import { editQuestionAction, type EditQuestionState } from "@/app/savol/[slug]/edit/actions";
import type { Question, QuestionCategory } from "@/types/savol";

type Attachment = { id: string; fileName: string; contentType: string; byteSize: number };

export default function EditQuestionForm({ question, categories, locale, attachments }: {
  question: Question; categories: ReadonlyArray<QuestionCategory>; locale: "uz" | "de"; attachments: Attachment[];
}) {
  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.body);
  const [categoryId, setCategoryId] = useState(question.categoryId);
  const action = editQuestionAction.bind(null, question.slug, locale);
  const [state, formAction, pending] = useActionState<EditQuestionState, FormData>(action, { error: null });
  const de = locale === "de";
  const field = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white";
  return (
    <form action={formAction} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      {state.error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{state.error}</p>}
      <div><label htmlFor="edit-category" className="mb-2 block font-semibold">{de ? "Kategorie" : "Kategoriya"}</label>
        <select id="edit-category" name="categoryId" required value={categoryId} onChange={e => setCategoryId(e.target.value)} className={field}>
          {categories.map(c => <option key={c.id} value={c.id}>{de ? c.labelDe : c.labelUz}</option>)}
        </select></div>
      <div><label htmlFor="edit-title" className="mb-2 block font-semibold">{de ? "Titel" : "Sarlavha"}</label>
        <input id="edit-title" name="title" minLength={10} maxLength={180} required value={title} onChange={e => setTitle(e.target.value)} className={field} /></div>
      <div><label htmlFor="edit-body" className="mb-2 block font-semibold">{de ? "Frage" : "Savol matni"}</label>
        <textarea id="edit-body" name="body" minLength={20} maxLength={10000} required rows={9} value={body} onChange={e => setBody(e.target.value)} className={field} /></div>
      <QuestionAttachmentManager questionId={question.id} locale={locale} initial={attachments} />
      <button type="submit" disabled={pending} className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">
        {pending ? (de ? "Speichern…" : "Saqlanmoqda…") : (de ? "Änderungen speichern" : "O‘zgarishlarni saqlash")}
      </button>
    </form>
  );
}
