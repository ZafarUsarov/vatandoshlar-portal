"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, Phone, PhoneCall } from "lucide-react";

type Props = Readonly<{
  number: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
  callLabel: string;
}>;

export default function SpecialistPhonePopover({ number, label, copyLabel, copiedLabel, copyFailedLabel, callLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const tel = number.replace(/[^\d+*#]/g, "");

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    copyRef.current?.focus();
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(number);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        title={`${label}: ${number}`}
        aria-label={`${label}: ${number}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => { setStatus("idle"); setOpen(value => !value); }}
        className="flex size-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300"
      >
        <Phone aria-hidden="true" className="size-5" />
      </button>
      {open && (
        <div id={id} role="dialog" aria-label={label} className="absolute bottom-full left-0 z-30 mb-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl dark:border-white/10 dark:bg-slate-900">
          <p className="break-words text-sm font-semibold text-slate-800 dark:text-slate-100">{number}</p>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] gap-2">
            <button ref={copyRef} type="button" onClick={copyNumber} className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 px-2.5 text-[13px] font-medium leading-none text-slate-800 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/20 dark:text-slate-100 dark:hover:bg-white/10">
              {status === "copied" ? <Check aria-hidden="true" className="size-3.5 shrink-0" /> : <Copy aria-hidden="true" className="size-3.5 shrink-0" />}
              <span>{status === "copied" ? copiedLabel : copyLabel}</span>
            </button>
            <a href={`tel:${tel}`} className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-600 px-2.5 text-[13px] font-medium leading-none text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              <PhoneCall aria-hidden="true" className="size-3.5 shrink-0" />
              <span>{callLabel}</span>
            </a>
          </div>
          {status === "failed" && <p role="status" aria-live="polite" className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400">{copyFailedLabel}</p>}
        </div>
      )}
    </div>
  );
}
