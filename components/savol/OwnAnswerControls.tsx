"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { removeOwnAnswerAction, updateOwnAnswerAction } from "@/app/savol/[slug]/actions";

type Props = Readonly<{
  locale: "uz" | "de";
  slug: string;
  answerId: string;
  body: string;
  isOwner: boolean;
}>;

export default function OwnAnswerControls({ locale, slug, answerId, body, isOwner }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(body);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const de = locale === "de";

  const save = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await updateOwnAnswerAction({ locale, slug, answerId, body: draft });
        if (result.error) { setError(result.error); return; }
        setEditing(false);
        router.refresh();
      } catch {
        setError(de ? "Speichern fehlgeschlagen. Bitte erneut versuchen." : "Saqlashda xatolik yuz berdi. Qayta urinib ko‘ring.");
      }
    });
  };

  const remove = () => {
    if (!window.confirm(de ? "Antwort wirklich entfernen? Dieser Vorgang kann nicht rückgängig gemacht werden." : "Javobni o‘chirishni tasdiqlaysizmi? Bu amalni ortga qaytarib bo‘lmaydi.")) return;
    setError(null);
    startTransition(async () => {
      try {
        const result = await removeOwnAnswerAction({ locale, slug, answerId });
        if (result.error) { setError(result.error); return; }
        router.refresh();
      } catch {
        setError(de ? "Entfernen fehlgeschlagen. Bitte erneut versuchen." : "O‘chirishda xatolik yuz berdi. Qayta urinib ko‘ring.");
      }
    });
  };

  return (
    <div className="mt-1.5 min-w-0">
      {editing && isOwner ? (
        <div className="space-y-2">
          <label className="sr-only" htmlFor={`edit-answer-${answerId}`}>{de ? "Antwort bearbeiten" : "Javobni tahrirlash"}</label>
          <textarea id={`edit-answer-${answerId}`} value={draft} onChange={(event) => setDraft(event.target.value)}
            minLength={10} maxLength={10000} rows={5} disabled={pending}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-emerald-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={save} disabled={pending || draft.trim().length < 10 || draft.trim().length > 10000}
              className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">{de ? "Speichern" : "Saqlash"}</button>
            <button type="button" onClick={() => { setEditing(false); setDraft(body); setError(null); }} disabled={pending}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700">{de ? "Abbrechen" : "Bekor qilish"}</button>
          </div>
        </div>
      ) : (
        <p className="whitespace-pre-wrap break-words text-sm leading-[1.55rem] font-normal text-slate-800 dark:text-slate-200">{body}</p>
      )}
      {isOwner && !editing && (
        <details className="relative mt-2 inline-block text-sm">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" aria-label={de ? "Antwort verwalten" : "Javobni boshqarish"}>
            <MoreHorizontal size={17} /> <span>{de ? "Optionen" : "Amallar"}</span>
          </summary>
          <div className="mt-1 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
            <button type="button" disabled={pending} onClick={(event) => { setEditing(true); setError(null); event.currentTarget.closest("details")?.removeAttribute("open"); }} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-slate-800"><Pencil size={15} />{de ? "Bearbeiten" : "Tahrirlash"}</button>
            <button type="button" disabled={pending} onClick={remove} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-800"><Trash2 size={15} />{de ? "Entfernen" : "O‘chirish"}</button>
          </div>
        </details>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
