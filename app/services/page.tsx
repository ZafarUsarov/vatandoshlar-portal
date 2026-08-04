import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Header from "../../components/Header";
import ServiceCard from "../../components/cards/ServiceCard";
import FeaturedSpecialistsSection from "../../components/home/FeaturedSpecialistsSection";
import {
  Card,
  Container,
  PageHero,
  Section,
  StatCard,
} from "../../components/ui";
import { getServices } from "../../data/services";
import type { SupportedContentLocale } from "../../types/service";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedContentLocale;

  if (locale === "uz") {
    return {
      title: "Xizmatlar | Vatandoshlar.de",
      description:
        "Germaniyada tarjimon, soliq maslahatchisi, huquqiy yordam, shifokor va hunarmandlarni rasmiy manbalar orqali topish bo‘yicha yo‘riqnomalar.",
    };
  }

  return {
    title: "Dienstleistungen | Vatandoshlar.de",
    description:
      "Orientierung zur Suche nach Übersetzern, Steuerberatern, rechtlicher Hilfe, Ärzten und Handwerksbetrieben über offizielle Quellen in Deutschland.",
  };
}

export default async function ServicesPage() {
  const locale =
    (await getLocale()) as SupportedContentLocale;

  const services = getServices(locale);

  const copy =
    locale === "uz"
      ? {
          eyebrow: "Tekshirilgan yo‘nalishlar",
          title:
            "Germaniyada ishonchli xizmatlarni rasmiy manbalar orqali toping",
          description:
            "Har bir yo‘nalishda xizmat ko‘rsatuvchini qayerdan qidirish, vakolatini qanday tekshirish va nimalarga e’tibor berish kerakligi tushuntiriladi.",
          servicesCount: "Xizmat yo‘nalishi",
          officialSources: "Rasmiy manba",
          germanyWide: "Germaniya bo‘ylab",
          listEyebrow: "Xizmatlar katalogi",
          listTitle: "Kerakli yo‘nalishni tanlang",
          details: "Batafsil",
          safetyEyebrow: "Xavfsiz foydalanish",
          safetyTitle:
            "Xizmat buyurtma qilishdan oldin tekshiring",
          safetyItems: [
            {
              title: "Vakolatni tekshiring",
              description:
                "Mutaxassisning rasmiy ro‘yxatda borligini, litsenziyasi, manzili va aloqa ma’lumotlarini tekshiring.",
            },
            {
              title: "Yozma narx oling",
              description:
                "Narx, muddat, xizmat hajmi va qo‘shimcha xarajatlarni yozma ravishda kelishib oling.",
            },
            {
              title: "Hujjatlarni saqlang",
              description:
                "Shartnoma, hisob-faktura, elektron xat va to‘lov tasdiqlarini saqlang.",
            },
            {
              title: "Shubhali taklifni rad eting",
              description:
                "Faqat naqd pul talab qiladigan yoki rasmiy ma’lumot bermaydigan takliflardan ehtiyot bo‘ling.",
            },
          ],
        }
      : {
          eyebrow: "Geprüfte Orientierung",
          title:
            "Verlässliche Dienstleistungen in Deutschland über offizielle Quellen finden",
          description:
            "Für jeden Bereich wird erklärt, wo Sie Anbieter suchen, Befugnisse prüfen und welche Sicherheitsaspekte Sie beachten sollten.",
          servicesCount: "Leistungsbereiche",
          officialSources: "Offizielle Quellen",
          germanyWide: "Deutschlandweit",
          listEyebrow: "Dienstleistungsverzeichnis",
          listTitle: "Wählen Sie den passenden Bereich",
          details: "Details",
          safetyEyebrow: "Sichere Nutzung",
          safetyTitle:
            "Vor der Beauftragung sorgfältig prüfen",
          safetyItems: [
            {
              title: "Befugnis prüfen",
              description:
                "Prüfen Sie Registereintrag, Zulassung, Anschrift und Kontaktdaten des Anbieters.",
            },
            {
              title: "Schriftliches Angebot einholen",
              description:
                "Vereinbaren Sie Preis, Frist, Leistungsumfang und Zusatzkosten schriftlich.",
            },
            {
              title: "Unterlagen aufbewahren",
              description:
                "Bewahren Sie Vertrag, Rechnung, E-Mails und Zahlungsnachweise auf.",
            },
            {
              title: "Zweifelhafte Angebote ablehnen",
              description:
                "Seien Sie vorsichtig bei reiner Barzahlung oder fehlenden offiziellen Angaben.",
            },
          ],
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 text-slate-950 transition-colors lg:pt-28 dark:bg-slate-950 dark:text-white">
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          stats={
            <>
              <StatCard
                value={String(services.length)}
                label={copy.servicesCount}
              />

              <StatCard
                value={String(services.length)}
                label={copy.officialSources}
              />

              <StatCard
                value="16"
                label={copy.germanyWide}
              />
            </>
          }
        />

        <Section>
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                {copy.listEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-text-primary sm:text-4xl">
                {copy.listTitle}
              </h2>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  detailsLabel={copy.details}
                />
              ))}
            </div>
          </Container>
        </Section>

        <FeaturedSpecialistsSection />

        <Section className="bg-surface-muted">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                {copy.safetyEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-text-primary sm:text-4xl">
                {copy.safetyTitle}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {copy.safetyItems.map((item, index) => (
                <Card
                  key={item.title}
                  className="p-6"
                >
                  <span className="text-sm font-bold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-text-primary">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-text-secondary">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}