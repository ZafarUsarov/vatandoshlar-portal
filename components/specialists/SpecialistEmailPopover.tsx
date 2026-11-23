"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Send } from "lucide-react";

type Props = Readonly<{
  email: string;
  minimal?: boolean;
  label: string;
  copyLabel: string;
  composeLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
}>;

export default function SpecialistEmailPopover({
  email, label, copyLabel, composeLabel, copiedLabel, copyFailedLabel, minimal = false,
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

  const iconClass = "flex size-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition duration-300 motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-1 hover:scale-105 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-[#303B4B] dark:bg-[#263344] dark:text-[#B8C3D1] dark:hover:border-[#52647B] dark:hover:bg-[#263344] dark:hover:text-[#34D5B0] dark:focus-visible:ring-offset-[#19212D]";

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
        className={minimal ? "flex size-[38px] shrink-0 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-[#B8C3D1] dark:hover:bg-[#263344] dark:hover:text-[#34D5B0]" : iconClass}
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
          className="absolute bottom-full left-0 z-30 mb-2 w-[min(16.75rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl dark:border-[#303B4B] dark:bg-[#19212D]"
        >
          <p className="break-all text-sm font-semibold text-slate-800 dark:text-[#F5F7FA]">{email}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button ref={copyRef} type="button" onClick={copyEmail} className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 px-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#34445D] dark:text-[#F5F7FA] dark:hover:bg-[#263344] dark:hover:text-[#34D5B0]">
              {status === "copied" ? <Check aria-hidden="true" className="size-3.5 shrink-0" /> : <Copy aria-hidden="true" className="size-3.5 shrink-0" />}
              <span>{status === "copied" ? copiedLabel : copyLabel}</span>
            </button>
            <a href={`mailto:${email}`} className="inline-flex h-9 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-600 px-2 text-xs font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#19212D]">
              <Send aria-hidden="true" className="size-3.5 shrink-0" />
              <span>{composeLabel}</span>
            </a>
          </div>
          {status === "failed" && (
            <p role="status" aria-live="polite" className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
              {copyFailedLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
