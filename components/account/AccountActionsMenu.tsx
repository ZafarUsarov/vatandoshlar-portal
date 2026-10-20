"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Ellipsis, Pencil } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Props = Readonly<{ locale: "uz" | "de"; children: ReactNode }>;

export default function AccountActionsMenu({ locale, children }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const de = locale === "de";

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-label={de ? "Kontomenü öffnen" : "Akkaunt menyusini ochish"}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <Ellipsis size={23} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <Link
            href="/account/profile"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center gap-3 rounded-xl bg-emerald-50 px-3 text-sm font-bold text-emerald-700 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            <Pencil size={18} />
            {de ? "Profil bearbeiten" : "Profilni tahrirlash"}
          </Link>
          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />
          {children}
        </div>
      )}
    </div>
  );
}
