"use client";

import { useMemo, useState } from "react";
import PremiumBadge from "@/components/specialists/PremiumBadge";
import { PREMIUM_CONTACT_EMAIL, PREMIUM_PRICING, PREMIUM_SAVINGS, type PremiumContext, type PremiumPlan } from "@/lib/premium/config";
import { premiumContent } from "@/lib/premium/content";

type Locale = "uz" | "de";
const formatMoney = (cents: number, locale: Locale) => new Intl.NumberFormat(locale === "de" ? "de-DE" : "de-DE", { style: "currency", currency: "EUR" }).format(cents / 100);

export default function PremiumPricing({ locale, initialContext, profileUrl }: Readonly<{ locale: Locale; initialContext: PremiumContext; profileUrl?: string }>) {
  const t = premiumContent[locale];
  const [context, setContext] = useState<PremiumContext>(initialContext);
  const [plan, setPlan] = useState<PremiumPlan>("yearly");
  const pricing = PREMIUM_PRICING[plan];
  const mailto = useMemo(() => {
    const subject = `${t.subject} — ${context === "specialist" ? t.specialist : t.organization} — ${plan === "yearly" ? t.yearly : t.monthly}`;
    const body = [t.contactRequest, "", `${t.typeLabel}: ${context === "specialist" ? t.specialist : t.organization}`, `${t.planLabel}: ${plan === "yearly" ? t.yearly : t.monthly}`, `${t.priceLabel}: ${formatMoney(pricing.billingCents, locale)} / ${plan === "yearly" ? t.yearly : t.monthly}`, `${t.linkLabel}: ${profileUrl ?? t.profileLink + ": __________________"}`, "", t.thanks].join("\n");
    return `mailto:${PREMIUM_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [context, plan, pricing.billingCents, locale, profileUrl, t]);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.18em] text-emerald-700 dark:text-emerald-300">{t.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.045em] text-zinc-950 dark:text-white sm:text-5xl">{t.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">{t.description}</p>
          </div>
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center justify-self-center rounded-xl border border-[#D9DFDE] bg-white dark:border-[#303B40] dark:bg-[#181E22] sm:h-40 sm:w-40" aria-label="UzDe. Premium">
            <PremiumBadge size="hero" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-[#D9DFDE] bg-white p-6 dark:border-[#303B40] dark:bg-[#181E22] sm:p-8">
            <h2 className="text-xl font-bold tracking-tight">{t.benefitsTitle}</h2>
            <ul className="mt-6 space-y-4">{t.benefits.map((benefit) => <li key={benefit} className="flex gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200"><span aria-hidden="true" className="mt-1 text-emerald-600 dark:text-emerald-400">✓</span>{benefit}</li>)}</ul>
            <p className="mt-7 border-t border-zinc-100 pt-5 text-xs leading-5 text-zinc-500 dark:border-white/10 dark:text-zinc-400">{t.future}</p>
          </div>
          <div className="rounded-xl border border-[#A9CFC1] bg-white p-6 dark:border-[#36584E] dark:bg-[#181E22] sm:p-8">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.typeLabel}>
              {(["specialist", "organization"] as const).map((value) => <button key={value} type="button" aria-pressed={context === value} onClick={() => setContext(value)} className={`min-h-11 rounded-lg border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${context === value ? "border-[#008F78] bg-[#E7F7F1] text-[#006B55] dark:border-[#4A8878] dark:bg-[#203B37] dark:text-[#B5E8D8]" : "border-[#D9DFDE] bg-white text-zinc-700 hover:bg-zinc-50 dark:border-[#303B40] dark:bg-[#202528] dark:text-zinc-200 dark:hover:bg-[#26302F]"}`}>{t[value]}</button>)}
            </div>
            <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label={t.planLabel}>
              {(["monthly", "yearly"] as const).map((value) => <button key={value} type="button" aria-pressed={plan === value} onClick={() => setPlan(value)} className={`min-h-11 flex-1 rounded-lg border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${plan === value ? "border-[#008F78] bg-[#E7F7F1] text-[#006B55] dark:border-[#4A8878] dark:bg-[#203B37] dark:text-[#B5E8D8]" : "border-[#D9DFDE] bg-zinc-50 text-zinc-700 hover:bg-[#F1F7F4] dark:border-[#303B40] dark:bg-[#202528] dark:text-zinc-200 dark:hover:bg-[#26302F]"}`}>{t[value]}</button>)}
            </div>
            <div aria-live="polite" className="mt-8">
              {plan === "yearly" && <div className="mb-3"><span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{t.bestValue}</span></div>}
              <div className="flex flex-wrap items-baseline gap-3">
                {plan === "yearly" && <span className="text-lg text-zinc-400 line-through">{formatMoney(PREMIUM_PRICING.monthly.monthlyCents, locale)}</span>}
                <strong className="text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">{formatMoney(pricing.monthlyCents, locale)}</strong>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{t.perMonth}</span>
              </div>
              <p className="mt-4 text-base font-semibold">{plan === "yearly" ? `${formatMoney(pricing.billingCents, locale)} / ${t.yearly.toLowerCase()} — ${t.yearlyPayment}` : `${formatMoney(pricing.billingCents, locale)} — ${t.monthlyPayment}`}</p>
              <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300">
                <p>{t.annualEstimate}: <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatMoney(PREMIUM_SAVINGS.annualMonthlyTotalCents, locale)}</span></p>
                {plan === "yearly" && <><p>{t.savedYearly}: <strong>{formatMoney(PREMIUM_SAVINGS.yearlySavingsCents, locale)}</strong></p><p>{t.savingPercent}: {PREMIUM_SAVINGS.yearlySavingsPercent}%</p></>}
              </div>
            </div>
            <a href={mailto} className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-[#B8C8C3] bg-[#F4FAF8] px-5 text-center text-sm font-semibold !text-[#064E3B] no-underline transition-colors hover:border-[#008F78] hover:bg-[#E7F7F1] hover:!text-[#064E3B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008F78] active:bg-[#D8EFE6] dark:border-[#40534F] dark:bg-[#202D2C] dark:!text-[#D8F5EA] dark:hover:border-[#65CBB6] dark:hover:bg-[#294039] dark:hover:!text-white">{t.apply}</a>
            <p className="mt-4 text-xs leading-5 text-zinc-500 dark:text-zinc-400">{t.note}</p>
          </div>
        </div>
      </section>
    </>
  );
}
