"use client";

import { useEffect, useRef, useState } from "react";

type Props = Readonly<{
  email: string;
  label: string;
  copyLabel: string;
  composeLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
}>;

export default function SpecialistEmailPopover({
  email, label, copyLabel, composeLabel, copiedLabel, copyFailedLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const iconClass = "flex size-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:border-emerald-400/30 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:focus-visible:ring-offset-slate-900";

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        title={email}
        aria-label={`${label}: ${email}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "specialist-email-popover" : undefined}
        onClick={() => { setStatus("idle"); setOpen((current) => !current); }}
        className={iconClass}
      >
        <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </button>
      {open && (
        <div
          id="specialist-email-popover"
          role="dialog"
          aria-label={label}
          className="absolute bottom-full left-0 z-30 mb-3 w-[min(19rem,calc(100vw-3rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900"
        >
          <p className="break-all text-sm font-semibold text-slate-800 dark:text-slate-100">{email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button ref={copyRef} type="button" onClick={copyEmail} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-white/20 dark:text-slate-100 dark:hover:bg-white/10">
              {copyLabel}
            </button>
            <a href={`mailto:${email}`} className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
              {composeLabel}
            </a>
          </div>
          <p role="status" aria-live="polite" className="mt-2 min-h-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            {status === "copied" ? copiedLabel : status === "failed" ? copyFailedLabel : ""}
          </p>
        </div>
      )}
    </div>
  );
}
