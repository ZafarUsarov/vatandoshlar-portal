import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import ServiceCard from "../../components/cards/ServiceCard";
import Card from "../../components/ui/Card";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import Section from "../../components/ui/Section";
import SectionHeroBackground from "../../components/ui/SectionHeroBackground";
import { Link } from "../../i18n/navigation";
import {
  getPublishedServices,
} from "../../lib/services/public-services-repository";
import type { SupportedContentLocale } from "../../types/service";

export const dynamic =
  "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedContentLocale;

  return locale === "uz"
    ? {
        title: "Xizmatlar | Vatandoshlar.de",
        description:
          "Germaniyada tarjima, huquq, soliq, tibbiyot, hunarmandchilik va boshqa xizmat yo‘nalishlarini topish hamda rasmiy manbalar orqali tekshirish bo‘yicha qo‘llanmalar.",
        alternates: {
          canonical: "/uz/services",
          languages: {
            uz: "/uz/services",
            de: "/de/services",
          },
        },
      }
    : {
        title: "Dienstleistungen | Vatandoshlar.de",
        description:
          "Leitfäden zu Dienstleistungen in Deutschland: Übersetzung, Recht, Steuern, Medizin, Handwerk und weitere Bereiche finden und über offizielle Quellen prüfen.",
        alternates: {
          canonical: "/de/services",
          languages: {
            uz: "/uz/services",
            de: "/de/services",
          },
        },
      };
}

export default async function ServicesPage() {
  const locale =
    (await getLocale()) as SupportedContentLocale;

  const services =
    await getPublishedServices(
      locale,
    );

  const copy =
    locale === "uz"
      ? {
          eyebrow: "Xizmatlar katalogi",
          title:
            "Germaniyada kerakli xizmat turini toping va rasmiy manbalar orqali tekshiring",
          description:
            "Bu bo‘lim xizmat ko‘rsatuvchi odamlar katalogi emas. Bu yerda tarjima, huquq, soliq, tibbiyot, hunarmandchilik va boshqa xizmat yo‘nalishlari bo‘yicha qayerdan izlash, qanday tekshirish va nimalarga e’tibor berish kerakligi tushuntiriladi.",
          servicesCount: "Xizmat yo‘nalishi",
          officialSources: "Rasmiy tekshiruv",
          germanyWide: "Bundesland",
          listEyebrow: "Yo‘nalishlar",
          listTitle: "Kerakli xizmat turini tanlang",
          listDescription:
            "Har bir karta alohida xizmat yo‘nalishiga olib boradi. U yerda xizmat tarkibi, rasmiy tekshirish usullari va muhim ogohlantirishlar beriladi.",
          details: "Batafsil",
          empty:
            "Hozircha e’lon qilingan xizmat yo‘nalishlari mavjud emas.",
          distinctionEyebrow: "Muhim farq",
          distinctionTitle:
            "Xizmat va mutaxassis — ikki xil tushuncha",
          distinctionDescription:
            "Xizmat — siz izlayotgan yordam turi. Mutaxassis esa shu xizmatni ko‘rsatadigan shaxs yoki tashkilot. Mutaxassislarni alohida katalog orqali topishingiz mumkin.",
          specialistsAction: "Mutaxassislar katalogini ochish",
          safetyEyebrow: "Xavfsiz foydalanish",
          safetyTitle:
            "Xizmat buyurtma qilishdan oldin tekshiring",
          safetyItems: [
            {
              title: "Vakolatni tekshiring",
              description:
                "Xizmat ko‘rsatuvchining rasmiy ro‘yxatda borligini, litsenziyasi, manzili va aloqa ma’lumotlarini tekshiring.",
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
          eyebrow: "Dienstleistungsverzeichnis",
          title:
            "Passende Dienstleistungen in Deutschland finden und über offizielle Quellen prüfen",
          description:
            "Dieser Bereich ist kein Personenverzeichnis. Hier erfahren Sie für Übersetzung, Recht, Steuern, Medizin, Handwerk und weitere Leistungsbereiche, wo Sie suchen, wie Sie Anbieter prüfen und worauf Sie achten sollten.",
          servicesCount: "Leistungsbereiche",
          officialSources: "Offizielle Prüfung",
          germanyWide: "Bundesländer",
          listEyebrow: "Bereiche",
          listTitle: "Wählen Sie die passende Dienstleistung",
          listDescription:
            "Jede Karte führt zu einem eigenen Leistungsbereich mit Leistungsumfang, offiziellen Prüfmöglichkeiten und wichtigen Hinweisen.",
          details: "Details",
          empty:
            "Derzeit sind keine veröffentlichten Dienstleistungsbereiche vorhanden.",
          distinctionEyebrow: "Wichtiger Unterschied",
          distinctionTitle:
            "Dienstleistung und Fachkraft sind zwei verschiedene Dinge",
          distinctionDescription:
            "Eine Dienstleistung beschreibt die gesuchte Hilfe. Eine Fachkraft ist die Person oder Organisation, die diese Leistung anbietet. Fachkräfte finden Sie im separaten Verzeichnis.",
          specialistsAction: "Fachkräfteverzeichnis öffnen",
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

  const heroStats = (
    <>
      <div className="rounded-3xl border border-border-default bg-surface-soft p-5 text-center">
        <strong className="block text-3xl font-bold text-text-primary">
          {services.length}
        </strong>
        <span className="mt-1 block text-sm text-text-muted">
          {copy.servicesCount}
        </span>
      </div>

      <div className="rounded-3xl border border-border-default bg-surface-soft p-5 text-center">
        <strong className="block text-3xl font-bold text-text-primary">
          ✓
        </strong>
        <span className="mt-1 block text-sm text-text-muted">
          {copy.officialSources}
        </span>
      </div>

      <div className="rounded-3xl border border-border-default bg-surface-soft p-5 text-center">
        <strong className="block text-3xl font-bold text-text-primary">
          16
        </strong>
        <span className="mt-1 block text-sm text-text-muted">
          {copy.germanyWide}
        </span>
      </div>
    </>
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-page pt-20 text-foreground">
        <SectionHeroBackground tone="services">
          <PageHero
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
            stats={heroStats}
            className="!bg-transparent"
          />
        </SectionHeroBackground>

        <Section tone="page" spacing="xl">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                {copy.listEyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-text-primary sm:text-4xl">
                {copy.listTitle}
              </h2>

              <p className="mt-5 text-base leading-8 text-text-secondary sm:text-lg">
                {copy.listDescription}
              </p>
            </div>

            {services.length > 0 ? (
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
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-border-default bg-surface p-8 text-center sm:p-10">
                <p className="text-base font-semibold text-text-primary">
                  {copy.empty}
                </p>
              </div>
            )}
          </Container>
        </Section>

        <Section tone="muted" spacing="lg">
          <Container>
            <Card padding="lg">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                    {copy.distinctionEyebrow}
                  </p>

                  <h2 className="mt-4 text-2xl font-bold tracking-[-0.035em] text-text-primary sm:text-3xl">
                    {copy.distinctionTitle}
                  </h2>

                  <p className="mt-4 leading-7 text-text-secondary">
                    {copy.distinctionDescription}
                  </p>
                </div>

                <Link
                  href="/specialists"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                >
                  {copy.specialistsAction}
                </Link>
              </div>
            </Card>
          </Container>
        </Section>

        <Section tone="muted" spacing="xl">
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
                  variant="default"
                  padding="md"
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

      <SectionPromo target="specialists" />

      <Footer />
    </>
  );
}
