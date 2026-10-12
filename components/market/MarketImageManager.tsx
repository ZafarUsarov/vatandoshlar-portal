"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Image = { id: string; status: "pending" | "ready"; position: number };
type Props = { listingId: string; initialImages: Image[]; locale: "uz" | "de" };
const LIMIT = 5;
const MAX_BYTES = 5 * 1024 * 1024;
const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

export default function MarketImageManager({ listingId, initialImages, locale }: Props) {
  const [images, setImages] = useState(initialImages);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const previewUrls = useRef<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const de = locale === "de";
  const slots = Math.max(0, LIMIT - images.length);
  const endpoint = `/api/market/listings/${listingId}/images`;

  useEffect(() => {
    return () => {
      previewUrls.current.forEach(url => URL.revokeObjectURL(url));
      previewUrls.current = [];
    };
  }, []);

  function clearPreviews() {
    previewUrls.current.forEach(url => URL.revokeObjectURL(url));
    previewUrls.current = [];
    setPreviews([]);
  }

  function clearSelection() {
    clearPreviews();
    setFiles([]);
    if (input.current) input.current.value = "";
  }

  function selectFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    setError("");
    if (selected.length > slots) { setError(de ? `Maximal ${slots} weitere Bilder.` : `Yana ko‘pi bilan ${slots} ta rasm qo‘shish mumkin.`); clearSelection(); return; }
    if (selected.some(file => !allowed.has(file.type) || file.size < 1 || file.size > MAX_BYTES)) {
      setError(de ? "Nur JPEG, PNG oder WebP bis 5 MiB." : "Faqat JPEG, PNG yoki WebP, 5 MiB gacha."); clearSelection(); return;
    }
    clearPreviews();
    const urls = selected.map(file => URL.createObjectURL(file));
    previewUrls.current = urls;
    setPreviews(urls);
    setFiles(selected);
  }

  async function upload() {
    setBusy(true); setError(""); setMessage("");
    try {

      for (const file of files) {
        const reserved = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contentType: file.type, byteSize: file.size }) });
        if (!reserved.ok) throw new Error(de ? "Upload konnte nicht vorbereitet werden." : "Yuklashni boshlash imkonsiz.");
        const data = await reserved.json() as { imageId: string; uploadUrl: string; headers: Record<string, string> };
        try {
          const put = await fetch(data.uploadUrl, { method: "PUT", headers: data.headers, body: file });
          if (!put.ok) throw new Error(de ? "Speicher-Upload fehlgeschlagen." : "Rasmni saqlashda xatolik.");
          const confirmed = await fetch(`${endpoint}/${data.imageId}/confirm`, { method: "POST" });
          if (!confirmed.ok) throw new Error(de ? "Bild konnte nicht bestätigt werden." : "Rasm tasdiqlanmadi.");
          setImages(current => [...current, { id: data.imageId, position: current.length, status: "ready" }]);

        } catch (uploadError) {
          await fetch(`${endpoint}/${data.imageId}`, { method: "DELETE" }).catch(() => undefined);
          throw uploadError;
        }
      }
      clearSelection();
      setMessage(de ? "Bilder hochgeladen." : "Rasmlar yuklandi.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed"); }
    finally { setBusy(false); }
  }

  async function reorder(next: Image[]) {
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch(`${endpoint}/order`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageIds: next.map(image => image.id) }),
      });
      if (!response.ok) throw new Error(de ? "Reihenfolge konnte nicht gespeichert werden." : "Rasmlar tartibini saqlab bo‘lmadi.");
      setImages(next.map((image, position) => ({ ...image, position })));
      setMessage(de ? "Reihenfolge gespeichert." : "Rasmlar tartibi saqlandi.");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Reorder failed"); }
    finally { setBusy(false); }
  }

  function move(index: number, target: number) {
    if (target < 0 || target >= images.length || busy) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    void reorder(next);
  }

  async function remove(id: string) {
    if (!window.confirm(de ? "Bild wirklich löschen?" : "Rasm o‘chirilsinmi?")) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(de ? "Löschen fehlgeschlagen." : "Rasmni o‘chirib bo‘lmadi.");
      setImages(current => current.filter(item => item.id !== id));
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Delete failed"); }
    finally { setBusy(false); }
  }

  return <section aria-label={de ? "Bilder verwalten" : "Rasmlarni boshqarish"} className="mt-10 rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
    <h2 className="text-xl font-bold">{de ? "Bilder" : "Rasmlar"} ({images.length}/{LIMIT})</h2>
    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{de ? "JPEG, PNG oder WebP. Maximal 5 MiB pro Bild. Das erste Bild ist das Titelbild." : "JPEG, PNG yoki WebP. Har bir rasm 5 MiB gacha. Birinchi rasm muqova hisoblanadi."}</p>
    {images.length > 0 && <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{images.map((item, index) => <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
      {item.status === "ready" ? <div className="relative aspect-square"><Image unoptimized fill sizes="(max-width: 640px) 50vw, 33vw" src={`/api/market/images/${item.id}`} alt={`${de ? "Bild" : "Rasm"} ${index + 1}`} className="object-cover" /></div> : <div className="flex aspect-square items-center justify-center text-sm">{de ? "Ausstehend" : "Kutilmoqda"}</div>}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 text-xs"><span>{index === 0 ? (de ? "Titelbild" : "Muqova") : `#${index + 1}`}</span><div className="flex flex-wrap gap-1">
        <button type="button" disabled={busy || index === 0} onClick={() => move(index, index - 1)} aria-label={de ? `Bild ${index + 1} nach links` : `${index + 1}-rasmni oldinga`} className="min-h-10 rounded-lg border border-slate-300 px-3 disabled:opacity-40 dark:border-slate-600">←</button>
        <button type="button" disabled={busy || index === images.length - 1} onClick={() => move(index, index + 1)} aria-label={de ? `Bild ${index + 1} nach rechts` : `${index + 1}-rasmni keyinga`} className="min-h-10 rounded-lg border border-slate-300 px-3 disabled:opacity-40 dark:border-slate-600">→</button>
        {index > 0 && <button type="button" disabled={busy} onClick={() => void reorder([item, ...images.filter(image => image.id !== item.id)])} className="min-h-10 rounded-lg border border-emerald-700 px-2 font-semibold text-emerald-700 disabled:opacity-40 dark:text-emerald-300">{de ? "Als Titelbild" : "Muqova qilish"}</button>}
      </div><button type="button" disabled={busy} onClick={() => remove(item.id)} className="min-h-10 rounded-lg px-2 font-semibold text-red-700 underline disabled:opacity-50 dark:text-red-300">{de ? "Entfernen" : "O‘chirish"}</button></div>
    </div>)}</div>}
    {slots > 0 && <div className="mt-5"><label htmlFor="market-image-files" className="mb-2 block font-semibold">{de ? "Bilder auswählen" : "Rasm tanlash"}</label><input ref={input} id="market-image-files" type="file" multiple accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={selectFiles} className="block w-full rounded-xl border border-slate-300 p-3 text-sm dark:border-slate-700" />
      {files.length > 0 && <><div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{previews.map((url, index) => <div key={url} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"><div className="relative aspect-square"><Image unoptimized fill sizes="(max-width: 640px) 50vw, 33vw" src={url} alt={`${de ? "Vorschau" : "Oldindan ko‘rish"} ${index + 1}`} className="object-cover" /></div><p className="truncate p-2 text-xs" title={files[index]?.name}>{files[index]?.name}</p></div>)}</div><div className="mt-3 flex flex-wrap gap-2">{files.map((file, index) => <span key={`${file.name}-${index}`} className="max-w-full truncate rounded-lg bg-slate-100 px-3 py-2 text-xs dark:bg-slate-800">{file.name}</span>)}</div><button type="button" disabled={busy} onClick={upload} className="mt-4 min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white disabled:opacity-50">{busy ? (de ? "Wird hochgeladen…" : "Yuklanmoqda…") : (de ? "Bilder hochladen" : "Rasmlarni yuklash")}</button></>}
    </div>}
    {error && <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-300">{error}</p>}{message && <p role="status" className="mt-3 text-sm text-emerald-700 dark:text-emerald-300">{message}</p>}
  </section>;
}
