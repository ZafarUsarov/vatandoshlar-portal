import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Header from "@/components/Header";
import SupportHero from "@/components/support/SupportHero";
import SupportOptions from "@/components/support/SupportOptions";

const paymentLinks = {
  paypal: "https://paypal.me/ZafarUsarov",
  taps: "https://taps.so/zafar_usarov",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SupportPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SupportPage() {
  const t = await getTranslations("SupportPage");
  const footerT = await getTranslations("Footer");

  const costs = [
    {
      title: t("costs.items.hosting.title"),
      description: t("costs.items.hosting.description"),
      icon: "hosting" as const,
    },
    {
      title: t("costs.items.domain.title"),
      description: t("costs.items.domain.description"),
      icon: "domain" as const,
    },
    {
      title: t("costs.items.development.title"),
      description: t("costs.items.development.description"),
      icon: "development" as const,
    },
  ];

  const options = [
    {
      name: t("options.paypal.name"),
      description: t("options.paypal.description"),
      action: t("options.paypal.action"),
      href: paymentLinks.paypal,
      variant: "paypal" as const,
      noteTitle: t("options.paypal.noteTitle"),
      note: t("options.paypal.note"),
    },
    {
      name: t("options.taps.name"),
      description: t("options.taps.description"),
      action: t("options.taps.action"),
      href: paymentLinks.taps,
      variant: "taps" as const,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main className="pt-20">
        <SupportHero
          badge={t("hero.badge")}
          title={t("hero.title")}
          description={t("hero.description")}
          voluntary={t("hero.voluntary")}
          costsTitle={t("costs.title")}
          costs={costs}
        />

        <SupportOptions
          title={t("options.title")}
          description={t("options.description")}
          options={options}
          privacy={t("privacy")}
        />
      </main>

      <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/[0.08] dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            {footerT("bottom.copyright", {
              year: currentYear,
            })}
          </p>

          <p className="max-w-xl text-xs leading-5 sm:text-right">
            {footerT("bottom.disclaimer")}
          </p>
        </div>
      </footer>
    </div>
  );
}
