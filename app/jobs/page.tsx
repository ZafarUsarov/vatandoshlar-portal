import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Footer from "../../components/Footer";
import SectionPromo from "../../components/SectionPromo";
import Header from "../../components/Header";
import JobGuideCard from "../../components/cards/JobGuideCard";
import JobPlatformsDirectory from "../../components/JobPlatformsDirectory";
import {
  Badge,
  Card,
  Container,
  PageHero,
  Section,
  StatCard,
} from "../../components/ui";
import { Link } from "../../i18n/navigation";
import {
  formatJobDate,
  getFeaturedJobGuide,
  getJobGuides,
  type SupportedJobLocale,
} from "../../data/jobs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedJobLocale;

  return locale === "uz"
    ? {
        title: "Ish va karyera | Vatandoshlar.de",
        description:
          "Germaniyada talabalar uchun ish, ingliz tilidagi vakansiyalar, Minijob, Werkstudent, amaliyot, Ausbildung va malakali mutaxassislar uchun qo‘llanmalar.",
      }
    : {
        title: "Arbeit und Karriere | Vatandoshlar.de",
        description:
          "Leitfäden zu Studentenjobs, englischsprachigen Stellen, Minijob, Werkstudent, Praktikum, Ausbildung und qualifizierter Beschäftigung in Deutschland.",
      };
}

export default async function JobsPage() {
  const locale = (await getLocale()) as SupportedJobLocale;
  const jobGuides = getJobGuides(locale);
  const featuredGuide = getFeaturedJobGuide(locale);

  const copy =
    locale === "uz"
      ? {
          eyebrow:
            "Vatandoshlar.de ish va karyera markazi",
          title:
            "Germaniyada ish topish uchun aniq va xavfsiz yo‘l",
          description:
            "Talabalar, ingliz tilida ishlashni istaganlar, Minijob izlayotganlar, Ausbildung qidirayotganlar va professional mutaxassislar uchun rasmiy manbalarga asoslangan qo‘llanmalar.",
          stats: {
            guides: "Ish yo‘nalishi",
            official: "Rasmiy manbalarga asoslangan",
            states: "Bundesland uchun",
          },
          navigationAria:
            "Ish va karyera sahifasi navigatsiyasi",
          seeGuides: "Ish yo‘nalishlarini ko‘rish",
          seePlatforms: "Ish saytlarini ko‘rish",
          officialJobsuche: "Rasmiy Jobsuche",
          opensNew: "Yangi oynada ochiladi",
          featured: "Tavsiya etilgan qo‘llanma",
          lastVerified: "Oxirgi tekshiruv",
          readGuide: "Qo‘llanmani o‘qish",
          listEyebrow: "Ish yo‘nalishlari",
          listTitle: "Sizga mos yo‘nalishni tanlang",
          listDescription:
            "Bu bo‘lim uydirma vakansiyalar bermaydi. Har bir qo‘llanma ishni qayerdan qidirish, qanday hujjatlar tayyorlash, nimalarni tekshirish va qaysi rasmiy manbadan foydalanishni tushuntiradi.",
          safetyEyebrow: "Xavfsizlik",
          safetyTitle:
            "Ish topish uchun oldindan pul to‘lamang",
          safetyDescription:
            "Vakansiyani kompaniyaning rasmiy sayti orqali tekshiring. Ishga qabul qilish, shartnoma, viza yoki ish joyi va’dasi uchun oldindan katta miqdorda pul talab qiladigan takliflarga ehtiyot bo‘ling.",
          safetyItems: [
            {
              title: "Kompaniyani tekshiring",
              description:
                "Rasmiy sayt, Impressum, manzil, telefon va kompaniya elektron pochtasini tekshiring.",
            },
            {
              title: "Shartnomani o‘qing",
              description:
                "Brutto maosh, ish vaqti, sinov muddati, ta’til va ish vazifalari yozilgan bo‘lishi kerak.",
            },
            {
              title: "Hujjatlarni himoya qiling",
              description:
                "Pasport, bank va soliq ma’lumotlarini faqat zarur bosqichda va ishonchli kanal orqali yuboring.",
            },
            {
              title: "Shubhali taklifni rad eting",
              description:
                "Juda yuqori maosh, juda kam talab yoki faqat messenjer orqali muloqot qiladigan takliflarga ehtiyot bo‘ling.",
            },
          ],
          footer:
            "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma",
          card: {
            highlightsAria:
              "Qo‘llanmaning asosiy mavzulari",
            guide: "Qo‘llanma",
            explained:
              "Bosqichma-bosqich tushuntirilgan",
            open: "Qo‘llanmani ochish",
            openShort: "Ochish",
          },
        }
      : {
          eyebrow:
            "Vatandoshlar.de Zentrum für Arbeit und Karriere",
          title:
            "Ein klarer und sicherer Weg zur Jobsuche in Deutschland",
          description:
            "Offizielle Leitfäden für Studierende, englischsprachige Bewerber, Minijob-Suchende, Ausbildungssuchende und qualifizierte Fachkräfte.",
          stats: {
            guides: "Themenbereiche",
            official: "Auf offiziellen Quellen",
            states: "Für alle Bundesländer",
          },
          navigationAria:
            "Navigation der Seite Arbeit und Karriere",
          seeGuides: "Leitfäden ansehen",
          seePlatforms: "Jobportale ansehen",
          officialJobsuche: "Offizielle Jobsuche",
          opensNew: "Wird in einem neuen Fenster geöffnet",
          featured: "Empfohlener Leitfaden",
          lastVerified: "Zuletzt geprüft",
          readGuide: "Leitfaden lesen",
          listEyebrow: "Jobthemen",
          listTitle: "Wählen Sie den passenden Bereich",
          listDescription:
            "Dieser Bereich veröffentlicht keine erfundenen Stellen. Jeder Leitfaden erklärt Suchquellen, Unterlagen, Prüfschritte und offizielle Informationsquellen.",
          safetyEyebrow: "Sicherheit",
          safetyTitle:
            "Zahlen Sie niemals im Voraus für eine Stelle",
          safetyDescription:
            "Prüfen Sie die Stelle über die offizielle Website des Unternehmens. Seien Sie vorsichtig bei hohen Vorauszahlungen für Einstellung, Vertrag, Visum oder Arbeitsplatzversprechen.",
          safetyItems: [
            {
              title: "Unternehmen prüfen",
              description:
                "Prüfen Sie offizielle Website, Impressum, Anschrift, Telefon und Unternehmens-E-Mail.",
            },
            {
              title: "Vertrag lesen",
              description:
                "Bruttolohn, Arbeitszeit, Probezeit, Urlaub und Aufgaben müssen schriftlich festgehalten sein.",
            },
            {
              title: "Dokumente schützen",
              description:
                "Senden Sie Pass-, Bank- und Steuerdaten nur wenn erforderlich und über sichere Kanäle.",
            },
            {
              title: "Zweifelhafte Angebote ablehnen",
              description:
                "Seien Sie vorsichtig bei extrem hohem Lohn, sehr geringen Anforderungen oder ausschließlicher Messenger-Kommunikation.",
            },
          ],
          footer:
            "Digitale Plattform für Usbeken in Deutschland",
          card: {
            highlightsAria:
              "Wichtige Themen des Leitfadens",
            guide: "Leitfaden",
            explained: "Schritt für Schritt erklärt",
            open: "Leitfaden öffnen",
            openShort: "Öffnen",
          },
        };

  return (
    <>
      <Header />

      <main className="page-main">
        <PageHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          stats={
            <>
              <StatCard
                value={jobGuides.length}
                label={copy.stats.guides}
              />
              <StatCard
                value="100%"
                label={copy.stats.official}
              />
              <StatCard
                value="16"
                label={copy.stats.states}
              />
            </>
          }
        />

        <Section
          tone="page"
          spacing="sm"
          aria-label={copy.navigationAria}
        >
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#guides"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                {copy.seeGuides}
              </a>

              <a
                href="#job-platforms"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-default bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                {copy.seePlatforms}
              </a>

              <a
                href="https://www.arbeitsagentur.de/jobsuche/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-default bg-surface px-6 py-3 text-sm font-semibold text-text-primary transition duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                {copy.officialJobsuche}
                <span
                  aria-hidden="true"
                  className="ml-2"
                >
                  ↗
                </span>
                <span className="sr-only">
                  {copy.opensNew}
                </span>
              </a>
            </div>
          </Container>
        </Section>

        {featuredGuide && (
          <Section
            tone="page"
            spacing="lg"
            aria-labelledby="featured-job-guide-heading"
          >
            <Container>
              <article className="overflow-hidden rounded-[2rem] border border-border-default bg-surface shadow-md transition-colors duration-300">
                <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                  <div className="flex min-h-80 flex-col justify-between bg-slate-950 p-8 text-white sm:p-12 lg:min-h-[460px] dark:bg-black">
                    <div>
                      <Badge
                        variant="neutral"
                        className="border-white/10 bg-white/10 text-white"
                      >
                        {copy.featured}
                      </Badge>

                      <div
                        aria-hidden="true"
                        className="mt-10 flex size-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-4xl shadow-sm backdrop-blur"
                      >
                        {featuredGuide.icon}
                      </div>
                    </div>

                    <div className="mt-12">
                      <p className="text-sm text-slate-400">
                        {copy.lastVerified}
                      </p>
                      <time
                        dateTime={featuredGuide.verifiedAt}
                        className="mt-2 block font-semibold text-white"
                      >
                        {formatJobDate(
                          featuredGuide.verifiedAt,
                          locale,
                        )}
                      </time>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center bg-surface p-8 sm:p-12 lg:p-14">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand">
                      {featuredGuide.category}
                    </p>
                    <h2
                      id="featured-job-guide-heading"
                      className="mt-5 text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl"
                    >
                      {featuredGuide.title}
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-text-secondary">
                      {featuredGuide.description}
                    </p>
                    <div className="mt-8">
                      <Link
                        href={`/jobs/${featuredGuide.slug}`}
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        {copy.readGuide}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Container>
          </Section>
        )}

        <Section
          id="guides"
          tone="page"
          spacing="xl"
          aria-labelledby="job-guides-heading"
        >
          <Container>
            <div>
              <p className="page-eyebrow">
                {copy.listEyebrow}
              </p>
              <h2
                id="job-guides-heading"
                className="section-title mt-3"
              >
                {copy.listTitle}
              </h2>
              <p className="section-description mt-4">
                {copy.listDescription}
              </p>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {jobGuides.map((guide, index) => (
                <JobGuideCard
                  key={guide.id}
                  guide={guide}
                  index={index}
                  labels={copy.card}
                />
              ))}
            </div>
          </Container>
        </Section>

        <JobPlatformsDirectory />

        <Section
          tone="dark"
          spacing="xl"
          borderedTop
          aria-labelledby="job-safety-heading"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                {copy.safetyEyebrow}
              </p>
              <h2
                id="job-safety-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {copy.safetyTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                {copy.safetyDescription}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {copy.safetyItems.map((item) => (
                <Card
                  key={item.title}
                  as="article"
                  variant="dark"
                  padding="md"
                  className="hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <SectionPromo target="telegram" />

      <Footer />
    </>
  );
}
