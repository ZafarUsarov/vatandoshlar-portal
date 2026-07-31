import type { Metadata } from "next";

import Header from "../../components/Header";
import JobGuideCard from "../../components/JobGuideCard";
import JobPlatformsDirectory from "../../components/JobPlatformsDirectory";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  PageHero,
  Section,
  StatCard,
} from "../../components/ui";
import {
  formatJobDate,
  getFeaturedJobGuide,
  jobGuides,
} from "../../data/jobs";

export const metadata: Metadata = {
  title: "Ish va karyera | Vatandoshlar.de",
  description:
    "Germaniyada talabalar uchun ish, ingliz tilidagi vakansiyalar, Minijob, Werkstudent, amaliyot, Ausbildung va malakali mutaxassislar uchun ish platformalari katalogi.",
};

const safetyItems = [
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
] as const;

export default function JobsPage() {
  const featuredGuide = getFeaturedJobGuide();

  return (
    <>
      <Header />

      <main className="page-main">
        <PageHero
          eyebrow="Vatandoshlar.de ish va karyera markazi"
          title="Germaniyada ish topish uchun aniq va xavfsiz yo‘l"
          description={
            <>
              Talabalar, ingliz tilida ishlashni istaganlar, Minijob
              izlayotganlar, Ausbildung qidirayotganlar va professional
              mutaxassislar uchun rasmiy manbalarga asoslangan qo‘llanmalar
              hamda ish platformalari katalogi.
            </>
          }
          stats={
            <>
              <StatCard
                value={jobGuides.length}
                label="Ish yo‘nalishi"
              />

              <StatCard
                value="100%"
                label="Rasmiy manbalarga asoslangan"
              />

              <StatCard
                value="16"
                label="Bundesland uchun"
              />
            </>
          }
        />

        <Section
          tone="page"
          spacing="sm"
          aria-label="Ish va karyera sahifasi navigatsiyasi"
        >
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#guides"
                className="
                  inline-flex min-h-12 items-center justify-center
                  rounded-full bg-brand px-6 py-3
                  text-sm font-semibold text-white
                  transition duration-200
                  hover:-translate-y-0.5 hover:opacity-90
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-page
                "
              >
                Ish yo‘nalishlarini ko‘rish
              </a>

              <a
                href="#job-platforms"
                className="
                  inline-flex min-h-12 items-center justify-center
                  rounded-full border border-border-default
                  bg-surface px-6 py-3
                  text-sm font-semibold text-text-primary
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:border-border-strong
                  hover:bg-surface-muted
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-page
                "
              >
                Ish saytlarini ko‘rish
              </a>

              <a
                href="https://www.arbeitsagentur.de/jobsuche/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex min-h-12 items-center justify-center
                  rounded-full border border-border-default
                  bg-surface px-6 py-3
                  text-sm font-semibold text-text-primary
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:border-border-strong
                  hover:bg-surface-muted
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-page
                "
              >
                Rasmiy Jobsuche
                <span
                  aria-hidden="true"
                  className="ml-2"
                >
                  ↗
                </span>

                <span className="sr-only">
                  Yangi oynada ochiladi
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
                        Tavsiya etilgan qo‘llanma
                      </Badge>

                      <div
                        aria-hidden="true"
                        className="
                          mt-10 flex size-20 items-center justify-center
                          rounded-3xl border border-white/10
                          bg-white/10 text-4xl
                          shadow-sm backdrop-blur
                        "
                      >
                        {featuredGuide.icon}
                      </div>
                    </div>

                    <div className="mt-12">
                      <p className="text-sm text-slate-400">
                        Oxirgi tekshiruv
                      </p>

                      <time
                        dateTime={featuredGuide.verifiedAt}
                        className="mt-2 block font-semibold text-white"
                      >
                        {formatJobDate(featuredGuide.verifiedAt)}
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
                      <ButtonLink
                        href={`/jobs/${featuredGuide.slug}`}
                        size="lg"
                      >
                        Qo‘llanmani o‘qish
                      </ButtonLink>
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
                Ish yo‘nalishlari
              </p>

              <h2
                id="job-guides-heading"
                className="section-title mt-3"
              >
                Sizga mos yo‘nalishni tanlang
              </h2>

              <p className="section-description mt-4">
                Bu bo‘limda portal uydirma vakansiyalar bermaydi. Har bir
                qo‘llanma ishni qayerdan qidirish, qanday hujjatlar
                tayyorlash, nimalarni tekshirish va qaysi rasmiy manbadan
                foydalanishni tushuntiradi.
              </p>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {jobGuides.map((guide, index) => (
                <JobGuideCard
                  key={guide.id}
                  guide={guide}
                  index={index}
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
                Xavfsizlik
              </p>

              <h2
                id="job-safety-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Ish topish uchun oldindan pul to‘lamang
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Vakansiyani kompaniyaning rasmiy sayti orqali tekshiring.
                Ishga qabul qilish, shartnoma, viza yoki ish joyi va’dasi
                uchun oldindan katta miqdorda pul talab qiladigan
                takliflarga ehtiyot bo‘ling.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {safetyItems.map((item) => (
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

      <footer className="border-t border-border-default bg-surface py-10 text-text-muted transition-colors duration-300">
        <Container className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vatandoshlar.de</p>

          <p>
            Germaniyadagi o‘zbekistonliklar uchun raqamli platforma
          </p>
        </Container>
      </footer>
    </>
  );
}