import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PremiumPricing from "@/components/premium/PremiumPricing";
import { premiumContent } from "@/lib/premium/content";
import type { PremiumContext } from "@/lib/premium/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const t = premiumContent[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: { canonical: `/${locale}/premium`, languages: { uz: "/uz/premium", de: "/de/premium" } }, openGraph: { title: t.metaTitle, description: t.metaDescription, url: `/${locale}/premium`, siteName: "UzDe" } };
}

export default async function PremiumPage({ searchParams }: Readonly<{ searchParams: Promise<{ context?: string; profile?: string }> }>) {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const params = await searchParams;
  const context: PremiumContext = params.context === "organization" ? "organization" : "specialist";
  // A link is only copied into an email draft. It never grants Premium status.
  const profileUrl = typeof params.profile === "string" && /^https:\/\/[a-z0-9.-]+\//i.test(params.profile) && params.profile.length < 500 ? params.profile : undefined;
  return <div className="min-h-screen bg-white text-zinc-950 dark:bg-[#111419] dark:text-zinc-100"><Header /><main className="pt-[66px] lg:pt-20"><PremiumPricing locale={locale} initialContext={context} profileUrl={profileUrl} /></main><Footer variant="compact" /></div>;
}
