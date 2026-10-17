"use client";

import { useFormStatus } from "react-dom";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { voteOnAnswerAction } from "@/app/savol/[slug]/vote-actions";

type Props = Readonly<{ locale: "uz" | "de"; slug: string; answerId: string; upCount: number; downCount: number }>;

function Vote({ direction, count, locale }: { direction: "up" | "down"; count: number; locale: "uz" | "de" }) {
  const { pending } = useFormStatus();
  const positive = direction === "up";
  const label = positive ? (locale === "de" ? "Hilfreich" : "Foydali") : (locale === "de" ? "Nicht hilfreich" : "Foydali emas");
  const Icon = positive ? ThumbsUp : ThumbsDown;
  return <button type="submit" name="direction" value={direction} disabled={pending}
    aria-label={`${label}: ${count}`}
    title={label}
    className="inline-flex min-h-7 items-center gap-1 rounded-md px-2 text-[11px] font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300">
    <Icon size={14} aria-hidden="true" />
    <span className="tabular-nums">{count}</span>
  </button>;
}

export default function AnswerVoteButtons({ locale, slug, answerId, upCount, downCount }: Props) {
  return <form action={voteOnAnswerAction} className="inline-flex items-center gap-0.5 rounded-full border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800/70">
    <input type="hidden" name="locale" value={locale} />
    <input type="hidden" name="slug" value={slug} />
    <input type="hidden" name="answerId" value={answerId} />
    <Vote direction="up" count={upCount} locale={locale} />
    <span aria-hidden="true" className="h-3.5 w-px bg-slate-200 dark:bg-slate-600" />
    <Vote direction="down" count={downCount} locale={locale} />
  </form>;
}
