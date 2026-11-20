import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import JobsExplorer from "../../components/jobs/JobsExplorer";
import { imprint } from "../../data/legal/imprint";
import { publishedVacancies } from "../../data/jobs-board";
import type { SupportedJobLocale } from "../../types/jobs";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedJobLocale;
  return locale === "uz"
    ? {
        title: "Ish va karyera | UzDe",
        description: "Germaniyada ish imkoniyatlarini qidiring. UzDe vakansiyalar platformasi.",
        alternates: { canonical: "/uz/jobs", languages: { uz: "/uz/jobs", de: "/de/jobs" } },
      }
    : {
        title: "Arbeit und Karriere | UzDe",
        description: "Stellenangebote in Deutschland entdecken. Die Jobplattform von UzDe.",
        alternates: { canonical: "/de/jobs", languages: { uz: "/uz/jobs", de: "/de/jobs" } },
      };
}

export default async function JobsPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  return (
    <>
      <Header />
      <main className="min-h-[65vh] bg-[#f8f8f8] text-text-primary dark:bg-background">
        <JobsExplorer locale={locale} jobs={publishedVacancies} contactEmail={imprint.email} />
      </main>
      <Footer />
    </>
  );
}
