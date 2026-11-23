export type PremiumContext = "specialist" | "organization";
export type PremiumPlan = "monthly" | "yearly";

// The existing public specialists directory uses this contact address.
// Replace here if the official contact configuration changes.
export const PREMIUM_CONTACT_EMAIL = "info@uzde.de";

export const PREMIUM_PRICING = {
  monthly: { id: "monthly", monthlyCents: 499, billingCents: 499, months: 1 },
  yearly: { id: "yearly", monthlyCents: 299, billingCents: 3588, months: 12 },
} as const;

export const PREMIUM_SAVINGS = {
  annualMonthlyTotalCents: PREMIUM_PRICING.monthly.billingCents * 12,
  yearlySavingsCents: PREMIUM_PRICING.monthly.billingCents * 12 - PREMIUM_PRICING.yearly.billingCents,
  yearlySavingsPercent: Math.round((1 - PREMIUM_PRICING.yearly.billingCents / (PREMIUM_PRICING.monthly.billingCents * 12)) * 100),
};

// Future payment integration: activate premium only from a verified server-side
// payment confirmation; never from a URL, email click, or client-side state.
export type FuturePremiumSubscriptionStatus = "pending" | "active" | "expired" | "cancelled";
