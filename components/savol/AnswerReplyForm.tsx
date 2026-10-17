"use client";
import { useActionState, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { createReplyAction, type CreateReplyState } from "@/app/savol/[slug]/actions";

const initialState: CreateReplyState = { error: null, success: false };
export default function AnswerReplyForm({ locale, slug, answerId }: { locale: "uz" | "de"; slug: string; answerId: string }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [state, action, pending] = useActionState(createReplyAction, initialState);
  const de = locale === "de";
  return <div className="mt-4">
    {!state.success && <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950">
      <MessageCircle size={17} aria-hidden="true" />{de ? "Kommentieren" : "Javob qaytarish"}
    </button>}
    {state.success && <p role="status" className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">{de ? "Kommentar veröffentlicht." : "Izoh yuborildi."}</p>}
    {open && !state.success && <form action={action} className="mt-3 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950">
      <input type="hidden" name="locale" value={locale} /><input type="hidden" name="slug" value={slug} /><input type="hidden" name="answerId" value={answerId} />
      <label className="block text-sm font-semibold" htmlFor={`reply-${answerId}`}>{de ? "Ihr Kommentar" : "Izohingiz"}</label>
      <textarea id={`reply-${answerId}`} name="body" value={body} onChange={e => setBody(e.target.value)} rows={3} minLength={2} maxLength={3000} required disabled={pending} placeholder={de ? "Antworten Sie auf diesen Beitrag…" : "Ushbu javobga munosabat bildiring…"} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm leading-6 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
      {state.error && <p role="alert" className="text-sm text-red-700 dark:text-red-400">{state.error}</p>}
      <button type="submit" disabled={pending || body.trim().length < 2} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"><Send size={16} aria-hidden="true" />{pending ? (de ? "Wird gesendet…" : "Yuborilmoqda…") : (de ? "Veröffentlichen" : "Yuborish")}</button>
    </form>}
  </div>;
}
