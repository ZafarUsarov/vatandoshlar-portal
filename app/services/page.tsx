import type { Metadata } from "next";

import Header from "../../components/Header";
import ServiceCard from "../../components/cards/ServiceCard";
import {
  Card,
  Container,
  PageHero,
  Section,
  StatCard,
} from "../../components/ui";
import { services } from "../../data/services";

export const metadata: Metadata = {
  title: "Xizmatlar | Vatandoshlar.de",
  description:
    "Germaniyada tarjimon, soliq maslahatchisi, huquqiy yordam, shifokor va hunarmandlarni rasmiy manbalar orqali topish bo‘yicha yo‘riqnomalar.",
};

const safetyItems = [
  {
    title: "Vakolatni tekshiring",
    description:
      "Mutaxassisning rasmiy ro‘yxatda borligini, litsenziyasi, manzili va aloqa ma’lumotlarini tekshiring.",
  },
  {
    title: "Yozma narx oling",
    description:
      "Xizmat boshlanishidan oldin narx, muddat, xizmat hajmi va qo‘shimcha xarajatlarni yozma ravishda kelishib oling.",
  },
  {
    title: "Hujjatlarni saqlang",
    description:
      "Shartnoma, hisob-faktura, elektron xatlar va to‘lov tasdiqlarining nusxalarini saqlab qo‘ying.",
  },
  {
    title: "Shubhali taklifni rad eting",
    description:
      "Faqat naqd pul talab qiladigan yoki rasmiy ma’lumot bermaydigan xizmatlardan ehtiyot bo‘ling.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main className="page-main">
        <PageHero
          eyebrow="Vatandoshlar.de xizmatlar katalogi"
          title="Ishonchli xizmatni topish uchun aniq yo‘l"
          description={
            <>
              Bu sahifa tasdiqlanmagan reklama e’lonlarini bermaydi. Har bir
              yo‘nalishda mutaxassisni qayerdan rasmiy tekshirish va xizmat
              olishdan oldin nimalarga e’tibor berish kerakligi ko‘rsatiladi.
            </>
          }
          stats={
            <>
              <StatCard
                value={services.length}
                label="Xizmat yo‘nalishi"
              />

              <StatCard
                value="100%"
                label="Rasmiy manbalar"
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
          spacing="xl"
          aria-labelledby="services-heading"
        >
          <Container>
            <div>
              <p className="page-eyebrow">Xizmat turlari</p>

              <h2
                id="services-heading"
                className="section-title mt-3"
              >
                Kerakli yo‘nalishni tanlang
              </h2>

              <p className="section-description mt-4">
                Har bir yo‘nalishda mutaxassisni topish, uning vakolatini
                tekshirish va xizmatdan xavfsiz foydalanish bo‘yicha amaliy
                tavsiyalar berilgan.
              </p>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          </Container>
        </Section>

        <Section
          tone="dark"
          spacing="xl"
          borderedTop
          aria-labelledby="service-safety-heading"
        >
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Xavfsizlik
              </p>

              <h2
                id="service-safety-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Xizmat uchun pul to‘lashdan oldin
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Mutaxassisning vakolatini tekshiring, yozma narx taklifini
                oling, xizmat hajmini kelishib oling va muhim hujjatlarning
                nusxasini saqlang.
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