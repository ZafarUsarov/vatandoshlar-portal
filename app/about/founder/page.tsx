import type { Metadata } from "next";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import Footer from "@/components/Footer";
import FounderContent from "@/components/founder/FounderContent";
import FounderHero from "@/components/founder/FounderHero";
import Header from "@/components/Header";
import { founderProfile } from "@/data/founder";

type SupportedFounderLocale = "uz" | "de";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedFounderLocale;

  const t = await getTranslations(
    "FounderPage.metadata",
  );

  const title = t("title");
  const description =
    t("description");

  return {
    title,
    description,
    keywords: [
      "Vatandoshlar.de",
      "Zafar Usarov",
      "Uzbekistan",
      "Deutschland",
      "Softwareentwickler",
      "Software Engineer",
      "Wirtschaftsinformatik",
      "Next.js",
    ],
    alternates: {
      canonical:
        `/${locale}/about/founder`,
      languages: {
        uz: "/uz/about/founder",
        de: "/de/about/founder",
      },
    },
    openGraph: {
      title,
      description,
      type: "profile",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
      siteName:
        "Vatandoshlar.de",
      url:
        `/${locale}/about/founder`,
    },
  };
}

export default async function FounderPage() {
  const t = await getTranslations("FounderPage");
  const locale =
    (await getLocale()) as SupportedFounderLocale;

  const professionalCopy =
    locale === "uz"
      ? {
          storyParagraph:
            "Hozir Germaniyada Software Engineer sifatida faoliyat yuritaman. Shu bilan birga Wirtschaftsinformatik yo‘nalishida magistratura bosqichida tahsil olyapman. Amaliy dasturiy ta’minot ishlab chiqish tajribasi bilan biznes va axborot texnologiyalarini birlashtiruvchi akademik bilimlarni parallel rivojlantirib boraman.",
          workDescription:
            "Faoliyatim amalda foydalanishga tayyor dasturiy mahsulotlar, barqaror IT infratuzilmasi, avtomatlashtirish va tushunarli texnik yechimlarni birlashtirishga qaratilgan.",
        }
      : {
          storyParagraph:
            "Aktuell arbeite ich in Deutschland als Software Engineer und studiere parallel im Masterstudiengang Wirtschaftsinformatik. Dabei verbinde ich praktische Erfahrung in der Softwareentwicklung mit akademischem Wissen an der Schnittstelle von Wirtschaft und Informationstechnologie.",
          workDescription:
            "Meine Tätigkeit verbindet produktionsreife Softwareentwicklung, stabile IT-Infrastruktur, Automatisierung und nachvollziehbare technische Lösungen.",
        };

  const engineeringCopy =
    locale === "uz"
      ? {
          title: "Muhandislik kompetensiyalari",
          description:
            "Dasturiy mahsulot yaratishdan tashqari server, tarmoq, xavfsizlik, virtualizatsiya va avtomatlashtirish yo‘nalishlarida ham amaliy tajribaga egaman. Bu tajriba mahsulotni faqat kod darajasida emas, balki ishlaydigan tizim sifatida ko‘rishga yordam beradi.",
          competencies: [
            {
              title: "Software & Product Engineering",
              accent: "emerald" as const,
              items: [
                "Next.js, React, TypeScript, Node.js va PostgreSQL asosidagi amalda foydalanishga tayyor veb-ilovalar",
                "Qo‘llab-quvvatlashga qulay arxitektura, qat’iy tiplash va Git/GitHub ish jarayoni",
                "Foydalanuvchi ehtiyoji, foydalanish imkoniyati, SEO va unumdorlikni birgalikda hisobga olish",
              ],
            },
            {
              title: "Microsoft & Server",
              accent: "sky" as const,
              items: [
                "Microsoft 365, Exchange Online va Teams",
                "Windows Server 2019 / 2022 / 2025",
                "Active Directory, GPO, DNS, DHCP va WSUS",
              ],
            },
            {
              title: "Network & Security",
              accent: "violet" as const,
              items: [
                "Fortinet FortiGate: qoidalar, VPN, NAT va siyosatlar",
                "UniFi kommutatorlari, kirish nuqtalari va VLANlar",
                "Trellix XDR va oxirgi qurilmalar xavfsizligi",
              ],
            },
            {
              title: "Virtualization, Automation & Support",
              accent: "amber" as const,
              items: [
                "VMware, Hyper-V va Synology NAS",
                "Active Backup for Business, Hyper Backup va saqlash tizimini boshqarish",
                "PowerShell avtomatlashtirish, nosozliklarni aniqlash, hujjatlashtirish va masofaviy yordam",
              ],
            },
          ],
          approachTitle: "Ishlash usuli",
          approachItems: [
            "Strukturali",
            "Yechimga yo‘naltirilgan",
            "Hujjatlashtirishga e’tiborli",
            "Masofadan ishlashga mos",
          ],
        }
      : {
          title: "Engineering-Kompetenzen",
          description:
            "Neben der Softwareentwicklung bringe ich praktische Erfahrung in Server-, Netzwerk-, Security-, Virtualisierungs- und Automatisierungsumgebungen mit. Dadurch betrachte ich digitale Produkte nicht nur auf Code-Ebene, sondern als zuverlässig betriebene Gesamtsysteme.",
          competencies: [
            {
              title: "Software & Product Engineering",
              accent: "emerald" as const,
              items: [
                "Produktionsreife Webanwendungen mit Next.js, React, TypeScript, Node.js und PostgreSQL",
                "Wartbare Architektur, strikte Typisierung und professionelle Git/GitHub-Workflows",
                "Gemeinsame Betrachtung von Nutzerbedürfnissen, Accessibility, SEO und Performance",
              ],
            },
            {
              title: "Microsoft & Server",
              accent: "sky" as const,
              items: [
                "Microsoft 365, Exchange Online und Teams",
                "Windows Server 2019 / 2022 / 2025",
                "Active Directory, GPO, DNS, DHCP und WSUS",
              ],
            },
            {
              title: "Netzwerk & Security",
              accent: "violet" as const,
              items: [
                "Fortinet FortiGate: Regeln, VPN, NAT und Policies",
                "UniFi Switches, Access Points und VLANs",
                "Trellix XDR und Endpoint Security",
              ],
            },
            {
              title: "Virtualisierung, Automation & Support",
              accent: "amber" as const,
              items: [
                "VMware, Hyper-V und Synology NAS",
                "Active Backup for Business, Hyper Backup und Speicherverwaltung",
                "PowerShell-Automatisierung, Troubleshooting, Dokumentation und Remote-Support",
              ],
            },
          ],
          approachTitle: "Arbeitsweise",
          approachItems: [
            "Strukturiert",
            "Lösungsorientiert",
            "Dokumentationsstark",
            "Remote-fähig",
          ],
        };

  const storyParagraphs = [
    t("story.paragraphs.0"),
    professionalCopy.storyParagraph,
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
          imageUrl="/images/founder/vatandoshlar-project-hero.webp"
          imageAlt={
            locale === "de"
              ? "Editoriale Darstellung des Projekts Vatandoshlar.de"
              : "Vatandoshlar.de loyihasining editorial vizuali"
          }
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
            workDescription:
              professionalCopy.workDescription,
            workItems,
            competenciesTitle:
              engineeringCopy.title,
            competenciesDescription:
              engineeringCopy.description,
            competencies:
              engineeringCopy.competencies,
            approachTitle:
              engineeringCopy.approachTitle,
            approachItems:
              engineeringCopy.approachItems,
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

      <Footer showSupportCta />
    </div>
  );
}
