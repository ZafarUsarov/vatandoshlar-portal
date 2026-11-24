import { getLocale } from "next-intl/server";
import { Inter_Tight } from "next/font/google";

import TelegramCard from "@/components/cards/TelegramCard";
import TelegramCultureGuide from "@/components/telegram/TelegramCultureGuide";
import { getPublicTelegramGroups } from "@/lib/telegram/public-telegram-repository";
import type { SupportedTelegramLocale } from "@/types/telegram";

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
});

interface IconProps {
  className?: string;
}

function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21.5 3.5 2.8 10.7c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.9 6c.2.6.1.8.8.8.5 0 .8-.2 1.1-.5l2.7-2.6 5.6 4.1c1 .6 1.8.3 2.1-.9L23 4.8c.4-1.7-.6-2.5-1.5-1.3Z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default async function TelegramSection() {
  const locale =
    (await getLocale()) as SupportedTelegramLocale;

  const telegramGroups =
    await getPublicTelegramGroups(
      locale,
    );

  const regionalGroups =
    telegramGroups.filter(
      (group) =>
        group.communityType === "regional",
    );

  const professionalGroups =
    telegramGroups.filter(
      (group) =>
        group.communityType === "professional",
    );

  // One card per supported Bundesland; city groups remain on its detail page.
  const regionalDetailPages: Record<string, string> = {
    "Baden-Württemberg": "/telegram/baden-wuerttemberg",
    Bayern: "/telegram/bayern",
    Niedersachsen: "/telegram/niedersachsen",
  };
  const generalShortNames: Record<string, string> = {
    "Baden-Württemberg": "BW",
    Bayern: "BY",
    Niedersachsen: "NI",
  };
  const visibleRegionalGroups = regionalGroups
    .filter((group) => {
      const generalCode = generalShortNames[group.bundesland];
      return !generalCode || group.shortName === generalCode;
    })
    .map((group) => {
      const detailPage = regionalDetailPages[group.bundesland];
      const hasActiveGroup = detailPage && regionalGroups.some(
        (item) => item.bundesland === group.bundesland && item.status === "active",
      );
      const isRegionalDetail = group.bundesland === "Bayern" || group.bundesland === "Niedersachsen";
      return {
        ...group,
        state: isRegionalDetail ? group.bundesland : group.state,
        description: isRegionalDetail
          ? locale === "uz"
            ? `${group.bundesland} hududidagi umumiy va shahar Telegram guruhlarini ko‘ring.`
            : `Entdecken Sie landesweite und lokale Telegram-Gruppen in ${group.bundesland}.`
          : group.description,
        status: hasActiveGroup ? "active" as const : group.status,
        statusLabel: hasActiveGroup
          ? locale === "uz" ? "Faol" : "Aktiv"
          : group.statusLabel,
      };
    });

  // A state can have city groups before its statewide group is available.
  for (const bundesland of ["Bayern", "Niedersachsen"]) {
    const stateGroups = regionalGroups.filter(
      (group) => group.bundesland === bundesland,
    );
    if (
      stateGroups.length > 0 &&
      !visibleRegionalGroups.some((group) => group.bundesland === bundesland)
    ) {
      const firstGroup = stateGroups[0];
      const hasActiveCity = stateGroups.some((group) => group.status === "active");
      visibleRegionalGroups.push({
        ...firstGroup,
        shortName: generalShortNames[bundesland],
        state: bundesland,
        description: locale === "uz"
          ? `${bundesland} hududidagi o‘zbek Telegram guruhlarini ko‘ring.`
          : `Usbekische Telegram-Gruppen in ${bundesland} entdecken.`,
        href: null,
        status: hasActiveCity ? "active" : "coming-soon",
        statusLabel: locale === "uz"
          ? hasActiveCity ? "Faol" : "Tez orada"
          : hasActiveCity ? "Aktiv" : "Demnächst",
      });
    }
  }

  const copy =
    locale === "uz"
      ? {
          groups: {
            badge: "Telegram hamjamiyati",
            title:
              "Germaniya bo‘ylab vatandoshlar Telegram hamjamiyatlari",
            description:
              "O‘zingiz yashayotgan federal yer guruhiga qo‘shiling, tajriba almashing, foydali ma’lumotlar va e’lonlarni birinchi bo‘lib oling.",
            officialChannel: "UzDe. rasmiy Telegram kanali",
            officialChannelAria:
              "UzDe rasmiy Telegram kanalini ochish",
          },
          professional: {
            eyebrow: "Professional hamjamiyatlar",
            title:
              "Kasbiy yo‘nalishdagi hamjamiyatlar",
            description:
              "Germaniyada o‘z sohasi bo‘yicha tajriba almashish, professional aloqalar o‘rnatish va bir-birini qo‘llab-quvvatlash uchun o‘zbek hamjamiyatlari.",
          },
        }
      : {
          groups: {
            badge: "Telegram-Community",
            title:
              "Usbekische Telegram-Communitys in ganz Deutschland",
            description:
              "Finden Sie die passende regionale Gruppe, tauschen Sie Erfahrungen aus und erhalten Sie hilfreiche Hinweise und lokale Informationen.",
            officialChannel: "Offizieller Telegram-Kanal von UzDe.",
            officialChannelAria:
              "Offiziellen Telegram-Kanal von UzDe öffnen",
          },
          professional: {
            eyebrow: "Professionelle Communitys",
            title:
              "Berufliche Netzwerke",
            description:
              "Usbekische Communitys für fachlichen Austausch, berufliche Vernetzung und gegenseitige Unterstützung in Deutschland.",
          },
        };

  return (
    <>
      <section
        id="telegram"
        aria-labelledby="telegram-heading"
        className="bg-slate-50/70 py-9 sm:py-10 lg:py-12 dark:bg-[var(--telegram-section,#020617)]"
      >
        <div className="relative mx-auto w-full px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <div className="mx-auto w-full max-w-4xl text-center">
              <p className="flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-teal-700 dark:text-[var(--telegram-accent,#5eead4)]">
                <TelegramIcon className="size-3.5" />
                {copy.groups.badge}
              </p>

              <h2
                id="telegram-heading"
                className={`${interTight.className} mt-3 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl dark:text-white`}
              >
                {copy.groups.title}
              </h2>

              <p
                className="
                  mt-3
                  mx-auto max-w-2xl
                  text-base
                  leading-7
                  text-slate-600
                  dark:text-[var(--telegram-secondary,#94a3b8)]
                "
              >
                {copy.groups.description}
              </p>
            </div>

            <a
              href="https://t.me/UzDe_de"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.groups.officialChannelAria}
              className="group inline-flex w-fit self-end items-center gap-2 border-b border-slate-300 pb-1 text-sm font-semibold text-slate-800 transition-colors hover:border-sky-600 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:border-[var(--telegram-border,#334155)] dark:text-[var(--telegram-text,#e2e8f0)] dark:hover:text-[var(--telegram-accent,#5eead4)]"
            >
              {copy.groups.officialChannel}
              <ArrowUpRightIcon className="size-4 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleRegionalGroups.map((group, index) => (
              <TelegramCard
                key={group.shortName}
                group={group}
                index={index}
                variant="directory"
                detailsHref={regionalDetailPages[group.bundesland]}
                detailsLabel={
                  regionalDetailPages[group.bundesland]
                    ? locale === "uz" ? "Guruhlarni ko‘rish" : "Gruppen ansehen"
                    : undefined
                }
              />
            ))}
          </div>


          {professionalGroups.length > 0 && (
            <section
              aria-labelledby="telegram-professional-heading"
              className="mt-16 border-t border-slate-200/80 pt-10 dark:border-[var(--telegram-border,#1e293b)]"
            >
              <div className="mx-auto w-full max-w-4xl text-center">
                <p
                  className="text-sm font-medium uppercase tracking-[0.16em] text-teal-700 dark:text-[var(--telegram-accent,#5eead4)]"
                >
                  {copy.professional.eyebrow}
                </p>

                <h3
                  id="telegram-professional-heading"
                  className={`${interTight.className} mt-3 text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl dark:text-white`}
                >
                  {copy.professional.title}
                </h3>

                <p
                  className="
                    mt-3
                    mx-auto max-w-2xl
                    text-base leading-8
                    text-slate-600
                    dark:text-[var(--telegram-secondary,#94a3b8)]
                  "
                >
                  {copy.professional.description}
                </p>
              </div>

              <div className="mt-9 grid gap-5 md:grid-cols-2 lg:gap-6">
                {professionalGroups.map((group, index) => (
                  <TelegramCard
                    key={group.shortName}
                    group={group}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <TelegramCultureGuide />
    </>
  );
}
