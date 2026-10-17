"use client";

import { useEffect, useRef, useState } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

type Props = Readonly<{
  locale: "uz" | "de";
  label: string;
  onEdit: () => void;
  onRemove: () => void;
  disabled?: boolean;
}>;

const MENU_EVENT = "savol:owner-menu-open";

export default function OwnerActionDropdown({ locale, label, onEdit, onRemove, disabled = false }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const de = locale === "de";

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); buttonRef.current?.focus(); }
    };
    const closeOther = (event: Event) => {
      if (event instanceof CustomEvent && event.detail !== containerRef.current) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    document.addEventListener(MENU_EVENT, closeOther);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
      document.removeEventListener(MENU_EVENT, closeOther);
    };
  }, [open]);

  const toggle = () => {
    if (!open) document.dispatchEvent(new CustomEvent(MENU_EVENT, { detail: containerRef.current }));
    setOpen((value) => !value);
  };

  return (
    <div ref={containerRef} className="relative z-10 shrink-0">
      <button ref={buttonRef} type="button" disabled={disabled} aria-label={label} aria-haspopup="menu" aria-expanded={open}
        onClick={toggle}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
        <Ellipsis size={19} />
      </button>
      {open && (
        <div role="menu" aria-label={label} className="absolute right-0 top-full z-30 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <button role="menuitem" type="button" onClick={() => { setOpen(false); onEdit(); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"><Pencil size={16} />{de ? "Bearbeiten" : "Tahrirlash"}</button>
          <button role="menuitem" type="button" onClick={() => { setOpen(false); onRemove(); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"><Trash2 size={16} />{de ? "Löschen" : "O‘chirish"}</button>
        </div>
      )}
    </div>
  );
}
