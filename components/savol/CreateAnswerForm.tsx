/* eslint-disable @next/next/no-img-element -- Local preview uses temporary blob URLs. */
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, Paperclip, Send, X } from "lucide-react";
import { createAnswerAction, type CreateAnswerState } from "@/app/savol/[slug]/actions";

const initialState: CreateAnswerState = { error: null };
const types = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const maxSize = 5 * 1024 * 1024;

type Queued = { file: File; url?: string };
export default function CreateAnswerForm({ locale, slug }: { locale: "uz" | "de"; slug: string }) {
  const [state, formAction, pending] = useActionState(createAnswerAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [queued, setQueued] = useState<Queued[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const handled = useRef<string | null>(null);
  const queuedRef = useRef<Queued[]>([]);
  const de = locale === "de";
  function addFiles(files: FileList | null) {
    if (!files) return;
    setMessage("");
    const selected = Array.from(files);
    if (queuedRef.current.length + selected.length > 3 || selected.some(f => !types.includes(f.type) || f.size < 1 || f.size > maxSize)) {
      setMessage(de ? "Maximal 3 Dateien à 5 MB (JPG, PNG, WebP, PDF)." : "Ko‘pi bilan 3 ta fayl, har biri 5 MB (JPG, PNG, WebP, PDF).");
      return;
    }
    const next = [...queuedRef.current, ...selected.map(file => ({ file, url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined }))];
    queuedRef.current = next;
    setQueued(next);
  }
  function remove(index: number) {
    const next = queuedRef.current.filter((item, i) => { if (i === index && item.url) URL.revokeObjectURL(item.url); return i !== index; });
    queuedRef.current = next;
    setQueued(next);
  }
  useEffect(() => {
    if (!state.answerId || handled.current === state.answerId) return;
    handled.current = state.answerId;
    const answerId = state.answerId;
    const files = queuedRef.current;
    formRef.current?.reset();
    if (!files.length) { setMessage(de ? "Antwort veröffentlicht." : "Javob e’lon qilindi."); return; }
    let active = true;
    async function upload() {
      setUploading(true);
      let success = 0;
      for (const { file } of files) {
        let id: string | undefined;
        try {
          const res = await fetch(`/api/savol/answers/${answerId}/attachments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileName: file.name, contentType: file.type, byteSize: file.size }) });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error ?? "Reservation failed");
          id = data.attachmentId;
          const sent = await fetch(`/api/savol/answer-attachments/${id}/upload`, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
          if (!sent.ok) throw new Error((await sent.json()).error ?? "Upload failed");
          const confirmed = await fetch(`/api/savol/answer-attachments/${id}/confirm`, { method: "POST" });
          if (!confirmed.ok || (await confirmed.json()).ok !== true) throw new Error("Confirmation failed");
          success++;
        } catch (error) {
          if (id) await fetch(`/api/savol/answer-attachments/${id}`, { method: "DELETE" }).catch(() => {});
          if (active) setMessage(`${de ? "Antwort veröffentlicht, aber Datei-Upload fehlgeschlagen" : "Javob e’lon qilindi, ammo fayl yuklanmadi"}: ${file.name} — ${error instanceof Error ? error.message : "Error"}`);
        }
      }
      if (active) {
        if (success === files.length) setMessage(de ? "Antwort und Dateien veröffentlicht." : "Javob va fayllar e’lon qilindi.");
        files.forEach(f => { if (f.url) URL.revokeObjectURL(f.url); });
        queuedRef.current = [];
        setQueued([]);
        setUploading(false);
        if (success === files.length) window.location.reload();
      }
    }
    void upload();
    return () => { active = false; };
  }, [state.answerId, de]);
  const busy = pending || uploading;
  return <form ref={formRef} action={formAction} className="mt-3 space-y-3" noValidate>
    <input type="hidden" name="locale" value={locale}/><input type="hidden" name="slug" value={slug}/>
    {state.error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    {message && <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400">{message}</p>}
    <div><label htmlFor="savol-answer" className="mb-2 block text-sm font-semibold">{de ? "Ihre Antwort" : "Javobingiz"}</label>
      <textarea id="savol-answer" name="body" rows={3} minLength={10} maxLength={10000} required disabled={busy} placeholder={de ? "Schreiben Sie eine hilfreiche und konkrete Antwort." : "Foydali va aniq javob yozing."} className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 leading-7 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"/>
    </div>
    {queued.length > 0 && <ul className="flex flex-wrap gap-2">{queued.map((item, index) => <li key={`${item.file.name}-${index}`} className="flex max-w-full items-center gap-2 rounded-xl border border-slate-200 p-2 text-xs dark:border-slate-700">{item.url ?   <img src={item.url} alt="" className="size-12 rounded-lg object-cover"/> : <Paperclip size={20}/>}<span className="max-w-32 truncate" title={item.file.name}>{item.file.name}</span><button type="button" disabled={busy} onClick={() => remove(index)} aria-label={de ? "Entfernen" : "O‘chirish"}><X size={16}/></button></li>)}</ul>}
    <p className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG, WebP, PDF · {de ? "max. 3 Dateien, je 5 MB" : "3 ta faylgacha, har biri 5 MB"}</p>
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-1">
      <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={e => {addFiles(e.target.files);e.target.value="";}}/>
      <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" multiple className="sr-only" onChange={e => {addFiles(e.target.files);e.target.value="";}}/>
      <button type="button" disabled={busy || queued.length >= 3} onClick={() => imageInput.current?.click()} aria-label={de ? "Bild anhängen" : "Rasm biriktirish"} className="rounded-xl p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 dark:text-emerald-400"><ImagePlus size={21}/></button>
      <button type="button" disabled={busy || queued.length >= 3} onClick={() => fileInput.current?.click()} aria-label={de ? "Datei anhängen" : "Fayl biriktirish"} className="rounded-xl p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 dark:text-emerald-400"><Paperclip size={21}/></button>
    </div><button type="submit" disabled={busy} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-6 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60 dark:bg-emerald-600"><Send size={16} className="mr-2"/>{busy ? (de ? "Wird veröffentlicht…" : "E’lon qilinmoqda…") : (de ? "Antwort veröffentlichen" : "Javobni e’lon qilish")}</button></div>
  </form>;
}
