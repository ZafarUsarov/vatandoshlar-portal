"use client";

import { useRef, useState, useTransition } from "react";
import { Ellipsis, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { removeOwnQuestionAction } from "@/app/savol/[slug]/actions";

type Props = { locale: "uz" | "de"; slug: string };

export default function OwnQuestionMenu({ locale, slug }: Props) {
  const de = locale === "de";
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const closeMenu = () => setOpen(false);
  const closeDialog = () => { if (!pending) dialogRef.current?.close(); };
  const remove = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await removeOwnQuestionAction({ locale, slug });
        if (result.error) { setError(result.error); return; }
        dialogRef.current?.close();
        router.replace("/savol");
        router.refresh();
      } catch {
        setError(de ? "Löschen fehlgeschlagen. Bitte versuchen Sie es erneut." : "O‘chirishda xatolik yuz berdi. Qayta urinib ko‘ring.");
      }
    });
  };

  return (
    <>
      <div className="relative shrink-0">
        <button type="button" aria-label={de ? "Frage verwalten" : "Savolni boshqarish"} aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          <Ellipsis size={20} />
        </button>
        {open && (
          <div className="absolute right-0 top-11 z-20 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <Link href={`/savol/${slug}/edit`} onClick={closeMenu} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <Pencil size={16} />{de ? "Bearbeiten" : "Tahrirlash"}
            </Link>
            <button type="button" onClick={() => { closeMenu(); setError(null); dialogRef.current?.showModal(); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30">
              <Trash2 size={16} />{de ? "Frage löschen" : "Savolni o‘chirish"}
            </button>
          </div>
        )}
      </div>
      <dialog ref={dialogRef} onCancel={(event) => { if (pending) event.preventDefault(); }}
        className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
        <div className="space-y-4 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold"><Trash2 size={21} className="text-red-600" />{de ? "Frage wirklich löschen?" : "Savolni o‘chirmoqchimisiz?"}</h2>
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{de
            ? "Wenn Sie diese Frage löschen, werden auch alle Antworten und Kommentare dazu gelöscht."
            : "Savolingizni o‘chirsangiz, unga yozilgan barcha javoblar va izohlar ham o‘chiriladi."}</p>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">{de ? "Diese Aktion kann nicht rückgängig gemacht werden." : "Bu amalni ortga qaytarib bo‘lmaydi."}</p>
          {error && <p role="alert" className="text-sm text-red-700 dark:text-red-400">{error}</p>}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button type="button" autoFocus disabled={pending} onClick={closeDialog}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60">
              <ShieldCheck size={17} />{de ? "Abbrechen" : "Bekor qilish"}
            </button>
            <button type="button" disabled={pending} onClick={remove}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-red-600 bg-white px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30">
              {pending ? (de ? "Wird gelöscht…" : "O‘chirilmoqda…") : (de ? "Frage löschen" : "Savolni o‘chirish")}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
