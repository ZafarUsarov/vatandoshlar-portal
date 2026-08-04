import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Footer from "@/components/Footer";
import FounderContent from "@/components/founder/FounderContent";
import FounderHero from "@/components/founder/FounderHero";
import Header from "@/components/Header";
import { founderProfile } from "@/data/founder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(
    "FounderPage.metadata",
  );

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Vatandoshlar.de",
      "Zafar Usarov",
      "Uzbekistan",
      "Deutschland",
      "Softwareentwickler",
      "Next.js",
    ],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "profile",
    },
  };
}

export default async function FounderPage() {
  const t = await getTranslations("FounderPage");

  const storyParagraphs = [
    t("story.paragraphs.0"),
    t("story.paragraphs.1"),
  ];

  const missionItems = [
    t("mission.items.0"),
    t("mission.items.1"),
    t("mission.items.2"),
    t("mission.items.3"),
  ];

  const workItems = [
    {
      title: t("work.items.platform.title"),
      description: t(
        "work.items.platform.description",
      ),
    },
    {
      title: t("work.items.academic.title"),
      description: t(
        "work.items.academic.description",
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Header />

      <main>
        <FounderHero
          name={founderProfile.name}
          avatarUrl={founderProfile.avatarUrl}
          labels={{
            badge: t("hero.badge"),
            title: t("hero.title"),
            profession: t("hero.profession"),
            description: t("hero.description"),
            contactButton: t("hero.contactButton"),
            specialistButton: t(
              "hero.specialistButton",
            ),
          }}
        />

        <FounderContent
          founder={founderProfile}
          labels={{
            storyTitle: t("story.title"),
            storyParagraphs,
            missionTitle: t("mission.title"),
            missionDescription: t(
              "mission.description",
            ),
            missionItems,
            workTitle: t("work.title"),
            workDescription: t(
              "work.description",
            ),
            workItems,
            technologiesTitle: t(
              "technologies.title",
            ),
            contactTitle: t("contact.title"),
            contactDescription: t(
              "contact.description",
            ),
            socials: {
              email: t("contact.socials.email"),
              telegram: t(
                "contact.socials.telegram",
              ),
              instagram: t(
                "contact.socials.instagram",
              ),
              youtube: t(
                "contact.socials.youtube",
              ),
              facebook: t(
                "contact.socials.facebook",
              ),
            },
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
