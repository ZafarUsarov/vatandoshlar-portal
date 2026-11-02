"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, MapPin } from "lucide-react";

type Props = Readonly<{ address: string; locale: "de" | "uz" }>;

export default function PlaceAddressPopover({ address, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const isDe = locale === "de";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    copyRef.current?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${isDe ? "Adresse" : "Manzil"}: ${address}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => { setStatus("idle"); setOpen(value => !value); }}
        className="inline-flex items-center gap-1.5 rounded-md text-left text-sm text-slate-600 underline-offset-4 transition hover:text-emerald-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-300 dark:hover:text-emerald-300"
      >
        <MapPin aria-hidden="true" className="size-4 shrink-0 text-emerald-700" />
        <span>{address}</span>
      </button>
      {open && (
        <div role="dialog" aria-label={isDe ? "Adressaktionen" : "Manzil amallari"} className="absolute bottom-full left-0 z-40 mb-2 w-[min(18rem,calc(100vw-3rem))] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <p className="mb-3 break-words text-xs font-medium text-slate-600 dark:text-slate-300">{address}</p>
          <div className="grid grid-cols-2 gap-2">
            <button ref={copyRef} type="button" onClick={copyAddress} className="inline-flex min-h-10 items-center justify-center gap-1 rounded-xl border border-slate-200 px-2 text-xs font-semibold hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:hover:bg-slate-800">
              {status === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
              {status === "copied" ? (isDe ? "Kopiert" : "Nusxalandi") : (isDe ? "Kopieren" : "Nusxalash")}
            </button>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ", Berlin, Germany")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center justify-center gap-1 rounded-xl bg-emerald-600 px-2 text-xs font-semibold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              <MapPin aria-hidden="true" className="size-4" />{isDe ? "Karte" : "Xarita"}
            </a>
          </div>
          {status === "failed" && <p role="status" className="mt-2 text-xs text-rose-600">{isDe ? "Kopieren fehlgeschlagen" : "Nusxalab bo‘lmadi"}</p>}
        </div>
      )}
    </div>
  );
}
