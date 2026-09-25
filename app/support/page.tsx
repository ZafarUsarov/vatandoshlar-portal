import type { Metadata } from "next";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SupportHero from "@/components/support/SupportHero";
import SupportOptions from "@/components/support/SupportOptions";
import SupporterRecognition from "@/components/support/SupporterRecognition";
import { getPublicSupportSummary } from "@/lib/support/public-support-repository";

export const dynamic = "force-dynamic";

const paymentLinks = {
  paypal: "https://paypal.me/ZafarUsarov",
  taps: "https://taps.so/zafar_usarov",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as "uz" | "de";
  const t = await getTranslations(
    "SupportPage.metadata",
  );

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/support`,
      languages: {
        uz: "/uz/support",
        de: "/de/support",
      },
    },
    openGraph: {
      type: "website",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
      siteName: "Vatandoshlar.de",
      title,
      description,
      url: `/${locale}/support`,
    },
  };
}

export default async function SupportPage() {
  const t = await getTranslations("SupportPage");
  const locale = (await getLocale()) as "uz" | "de";
  const supportSummary = await getPublicSupportSummary();

  const options = [
    {
      name: t("options.paypal.name"),
      description: t("options.paypal.description"),
      action: t("options.paypal.action"),
      href: paymentLinks.paypal,
      variant: "paypal" as const,
    },
    {
      name: t("options.taps.name"),
      description: t("options.taps.description"),
      action: t("options.taps.action"),
      href: paymentLinks.taps,
      variant: "taps" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="pt-20">
        <SupportHero
          badge={t("hero.badge")}
          title={t("hero.title")}
          description={t("hero.description")}
          action={t("hero.action")}
          imageSrc="/images/support/support-platform-hero.webp"
          imageAlt={t("hero.imageAlt")}
        />

        <SupportOptions
          title={t("options.title")}
          description={t("options.description")}
          secondaryText={t("options.secondaryText")}
          options={options}
          privacy={t("privacy")}
        />

        <SupporterRecognition
          locale={locale}
          summary={supportSummary}
        />
      </main>

      <Footer />
    </div>
  );
}
