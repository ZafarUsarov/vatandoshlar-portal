"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Cropper, { type Area } from "react-easy-crop";
import { Minus, Plus, RotateCcw, UserRound, X } from "lucide-react";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

async function cropImage(
  source: string,
  area: Area,
): Promise<File> {
  const image = new Image();
  image.src = source;

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Image load failed"));
  });

  const canvas = document.createElement("canvas");
  const size = 512;
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    size,
    size,
  );

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => result
        ? resolve(result)
        : reject(new Error("Image conversion failed")),
      "image/jpeg",
      0.9,
    );
  });

  return new File([blob], "avatar.jpg", {
    type: "image/jpeg",
  });
}

export default function ProfileAvatarUpload({
  locale,
  initialUrl,
}: {
  locale: "uz" | "de";
  initialUrl: string | null;
}) {
  const de = locale === "de";

  const [url, setUrl] = useState(initialUrl);
  const [source, setSource] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const closeEditor = useCallback(() => {
    setSource(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setArea(null);
  }, []);

  useEffect(() => {
    if (!source) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) closeEditor();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [source, pending, closeEditor]);

  function selectFile(file: File) {
    setMessage("");

    if (!TYPES.includes(file.type) || file.size > MAX_BYTES || file.size === 0) {
      setMessage(de
        ? "Bitte JPG, PNG oder WebP bis 10 MB auswählen."
        : "JPG, PNG yoki WebP formatida, 10 MB gacha rasm tanlang.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setArea(null);
      setSource(reader.result);
    };

    reader.onerror = () => {
      setMessage(de
        ? "Bild konnte nicht geöffnet werden."
        : "Rasmni ochib bo‘lmadi.");
    };

    reader.readAsDataURL(file);
  }

  async function save() {
    if (!source || !area || pending) return;

    setPending(true);
    setMessage("");

    try {
      const file = await cropImage(source, area);
      const data = new FormData();
      data.append("avatar", file);

      const response = await fetch("/api/account/avatar", {
        method: "POST",
        body: data,
      });

      const result: { avatarUrl?: string } = await response.json();

      if (!response.ok || typeof result.avatarUrl !== "string") {
        throw new Error("Upload failed");
      }

      setUrl(result.avatarUrl);
      closeEditor();

      setMessage(de
        ? "Profilbild gespeichert."
        : "Profil rasmi saqlandi.");
    } catch {
      setMessage(de
        ? "Bild konnte nicht gespeichert werden."
        : "Rasmni saqlab bo‘lmadi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            {url
              ? <img src={url} alt="" className="h-full w-full object-cover" />
              : <UserRound size={32} aria-hidden="true" />}
          </div>

          <div className="min-w-0">
            <p className="font-bold">
              {de ? "Profilbild" : "Profil rasmi"}
            </p>

            <label className="mt-2 inline-flex cursor-pointer rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
              {de ? "Bild auswählen" : "Rasm tanlash"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={pending}
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) selectFile(file);
                  event.target.value = "";
                }}
              />
            </label>

            <p className="mt-2 text-xs text-slate-500">
              JPG, PNG, WebP — max. 10 MB
            </p>
          </div>
        </div>

        {message && (
          <p role="status" className="mt-3 text-sm">
            {message}
          </p>
        )}
      </section>

      {source && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/75 p-3 sm:items-center"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="avatar-editor-title"
            className="flex w-full max-w-lg flex-col overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl dark:bg-slate-900"
            style={{ maxHeight: "calc(100dvh - 24px)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="avatar-editor-title"
                className="text-lg font-bold"
              >
                {de ? "Profilbild anpassen" : "Profil rasmini moslashtirish"}
              </h2>

              <button
                type="button"
                disabled={pending}
                onClick={closeEditor}
                aria-label={de ? "Schließen" : "Yopish"}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative h-44 shrink-0 overflow-hidden rounded-2xl bg-slate-950 sm:h-52">
              <Cropper
                image={source}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                minZoom={1}
                maxZoom={3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setArea(pixels)}
              />
            </div>

            <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
              {de
                ? "Bild verschieben und Größe anpassen."
                : "Rasmni suring va kattaligini moslashtiring."}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                aria-label={de ? "Verkleinern" : "Uzoqlashtirish"}
                onClick={() => setZoom((value) => Math.max(1, value - 0.1))}
                className="rounded-xl border border-slate-300 p-2 dark:border-slate-700"
              >
                <Minus size={20} />
              </button>

              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                aria-label="Zoom"
                className="w-full accent-emerald-600"
              />

              <button
                type="button"
                aria-label={de ? "Vergrößern" : "Yaqinlashtirish"}
                onClick={() => setZoom((value) => Math.min(3, value + 0.1))}
                className="rounded-xl border border-slate-300 p-2 dark:border-slate-700"
              >
                <Plus size={20} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                }}
                aria-label={de ? "Zurücksetzen" : "Tiklash"}
                className="rounded-xl border border-slate-300 p-2 dark:border-slate-700"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            {message && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {message}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={pending}
                onClick={closeEditor}
                className="rounded-xl border border-slate-300 px-4 py-2 font-semibold dark:border-slate-700"
              >
                {de ? "Abbrechen" : "Bekor qilish"}
              </button>

              <button
                type="button"
                disabled={pending || !area}
                onClick={() => void save()}
                className="rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white disabled:opacity-50"
              >
                {pending
                  ? (de ? "Speichern…" : "Saqlanmoqda…")
                  : (de ? "Speichern" : "Saqlash")}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
