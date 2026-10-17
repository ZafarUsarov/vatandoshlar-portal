"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, Paperclip, X } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

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

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const maxBytes = 5 * 1024 * 1024;
type SelectedFile = { file: File; preview?: string };

export default function CreateQuestionForm({ locale, categories }: Props) {
  const router = useRouter();
  const imageInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const queuedRef = useRef<SelectedFile[]>([]);
  const handled = useRef<string | null>(null);
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    if (queuedRef.current.length + incoming.length > 3 || incoming.some(f => !allowedTypes.includes(f.type) || f.size < 1 || f.size > maxBytes)) {
      setUploadMessage(locale === "de" ? "Maximal 3 Dateien, je 5 MB (JPG, PNG, WebP, PDF)." : "Ko‘pi bilan 3 ta fayl, har biri 5 MB (JPG, PNG, WebP, PDF).");
      return;
    }
    setUploadMessage("");
    const next = [...queuedRef.current, ...incoming.map(file => ({ file, preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined }))];
    queuedRef.current = next;
    setFiles(next);
  }
  function removeFile(index: number) {
    const next = queuedRef.current.filter((entry, i) => { if (i === index && entry.preview) URL.revokeObjectURL(entry.preview); return i !== index; });
    queuedRef.current = next;
    setFiles(next);
  }

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [state, formAction, pending] = useActionState(
    createQuestionAction,
    initialState,
  );

  useEffect(() => {
    if (!state.created || handled.current === state.created.id) return;
    handled.current = state.created.id;
    const { id: questionId, slug } = state.created;
    const selected = [...queuedRef.current];
    if (!selected.length) { router.push(`/savol/${slug}`); return; }
    let active = true;
    async function uploadAll() {
      setUploading(true);
      const failed: string[] = [];
      for (const { file } of selected) {
        let attachmentId: string | undefined;
        try {
          const reserved = await fetch(`/api/savol/questions/${questionId}/attachments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileName: file.name, contentType: file.type, byteSize: file.size }) });
          const data = await reserved.json();
          if (!reserved.ok || !data.attachmentId) throw new Error(data.error || "Reservation failed");
          attachmentId = data.attachmentId;
          const sent = await fetch(`/api/savol/attachments/${attachmentId}/upload`, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
          if (!sent.ok) throw new Error("Upload failed");
          const confirmed = await fetch(`/api/savol/attachments/${attachmentId}/confirm`, { method: "POST" });
          if (!confirmed.ok || (await confirmed.json()).ok !== true) throw new Error("Confirmation failed");
        } catch {
          failed.push(file.name);
          if (attachmentId) await fetch(`/api/savol/attachments/${attachmentId}`, { method: "DELETE" }).catch(() => {});
        }
      }
      if (!active) return;
      setUploading(false);
      if (failed.length) {
        setUploadMessage(`${locale === "de" ? "Frage veröffentlicht, aber Dateien konnten nicht hochgeladen werden" : "Savol e’lon qilindi, ammo fayllar yuklanmadi"}: ${failed.join(", ")}`);
      } else {
        selected.forEach(item => { if (item.preview) URL.revokeObjectURL(item.preview); });
        router.push(`/savol/${slug}`);
      }
    }
    void uploadAll();
    return () => { active = false; };
  }, [state.created, router, locale]);

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
      {uploadMessage && <p role="alert" className="text-sm text-amber-700 dark:text-amber-300">{uploadMessage}{state.created && <a className="ml-2 underline" href={`/${locale}/savol/${state.created.slug}`}>{locale === "de" ? "Frage öffnen" : "Savolni ochish"}</a>}</p>}
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

      <div className="space-y-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG, WebP, PDF · {locale === "de" ? "max. 3 Dateien, je 5 MB" : "3 ta faylgacha, har biri 5 MB"}</p>
        {files.length > 0 && <ul className="flex flex-wrap gap-2">{files.map((entry, index) => <li key={`${entry.file.name}-${index}`} className="flex items-center gap-2 rounded-xl border border-slate-200 p-2 text-xs dark:border-slate-700">{entry.preview ? <span className="inline-block size-12 rounded-lg bg-cover bg-center" style={{backgroundImage: `url("${entry.preview}")`}} aria-label={entry.file.name} /> : <Paperclip size={20}/>}<span className="max-w-32 truncate">{entry.file.name}</span><button type="button" disabled={pending || uploading || !!state.created} onClick={() => removeFile(index)} aria-label={locale === "de" ? "Entfernen" : "O‘chirish"}><X size={16}/></button></li>)}</ul>}
        <div className="flex items-center gap-2">
          <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={e => {addFiles(e.target.files); e.target.value = "";}} />
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" multiple className="sr-only" onChange={e => {addFiles(e.target.files); e.target.value = "";}} />
          <button type="button" disabled={pending || uploading || !!state.created || files.length >= 3} onClick={() => imageInput.current?.click()} className="rounded-xl p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 dark:text-emerald-400" aria-label={locale === "de" ? "Bild anhängen" : "Rasm biriktirish"}><ImagePlus size={21}/></button>
          <button type="button" disabled={pending || uploading || !!state.created || files.length >= 3} onClick={() => fileInput.current?.click()} className="rounded-xl p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 dark:text-emerald-400" aria-label={locale === "de" ? "Datei anhängen" : "Fayl biriktirish"}><Paperclip size={21}/></button>
        </div>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">{copy.empty}</p>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <span aria-hidden="true" />
      <button
        type="submit"
        disabled={pending || uploading || !!state.created || categories.length === 0}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-950"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/></svg>
        {pending || uploading ? copy.pending : copy.submit}
      </button>
      </div>
    </form>
  );
}
