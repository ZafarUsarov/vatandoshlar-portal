"use client";

import { useState } from "react";
import { UserRound } from "lucide-react";

export default function ProfileAvatarUpload({
  locale,
  initialUrl,
}: {
  locale: "uz" | "de";
  initialUrl: string | null;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const de = locale === "de";

  async function upload(file: File) {
    setPending(true);
    setMessage("");
    const data = new FormData();
    data.append("avatar", file);
    try {
      const response = await fetch("/api/account/avatar", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok || typeof result.avatarUrl !== "string") {
        throw new Error("Upload failed");
      }
      setUrl(result.avatarUrl);
      setMessage(de ? "Profilbild gespeichert." : "Profil rasmi saqlandi.");
    } catch {
      setMessage(de ? "Bild konnte nicht hochgeladen werden."
        : "Rasmni yuklab bo‘lmadi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {url ? <img src={url} alt="" className="h-full w-full object-cover" />
            : <UserRound size={32} aria-hidden="true" />}
        </div>
        <div className="min-w-0">
          <p className="font-bold">
            {de ? "Profilbild" : "Profil rasmi"}
          </p>
          <label className="mt-2 inline-flex cursor-pointer rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
            {pending ? (de ? "Wird hochgeladen…" : "Yuklanmoqda…")
              : (de ? "Bild auswählen" : "Rasm tanlash")}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={pending}
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
                event.target.value = "";
              }}
            />
          </label>
          <p className="mt-2 text-xs text-slate-500">
            JPG, PNG, WebP — max. 10 MB
          </p>
        </div>
      </div>
      {message && <p role="status" className="mt-3 text-sm">{message}</p>}
    </section>
  );
}
