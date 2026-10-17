"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight, Minus } from "lucide-react";

type Props = Readonly<{
  locale: "uz" | "de";
  count: number;
  children: ReactNode;
}>;

export default function ThreadBranch({ locale, count, children }: Props) {
  const [expanded, setExpanded] = useState(true);
  const label = locale === "de" ? "Kommentare" : "Izohlar";
  return (
    <div className="mt-3 min-w-0">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="inline-flex min-h-7 items-center gap-1.5 rounded-md px-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-emerald-300"
      >
        {expanded ? <Minus size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
        {label} ({count})
        {expanded && <ChevronDown size={13} aria-hidden="true" />}
      </button>
      {expanded && (
        <div className="relative mt-1 min-w-0">
          {children}
        </div>
      )}
    </div>
  );
}
