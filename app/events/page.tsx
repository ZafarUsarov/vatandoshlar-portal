import type { Metadata } from "next";
import Link from "next/link";

import EventCard from "../../components/cards/EventCard";
import Header from "../../components/Header";
import {
  getPastEvents,
  getUpcomingEvents,
} from "../../data/events";

export const metadata: Metadata = {
  title: "Tadbirlar | Vatandoshlar.de",
  description:
    "Germaniyadagi o‘zbekistonliklar uchun tekshirilgan madaniy, ta’lim, karyera, biznes va jamoat tadbirlari.",
};

const eventCategories = [
  {
    title: "Madaniyat",
    description:
      "Konsertlar, bayramlar, ko‘rgazmalar va milliy madaniyat tadbirlari.",
    icon: "◈",
  },
  {
    title: "Ta’lim",
    description:
      "Seminarlar, kurslar, ochiq darslar va talabalar uchun uchrashuvlar.",
    icon: "▤",
  },
  {
    title: "Karyera",
    description:
      "Ish yarmarkalari, networking, Ausbildung va professional uchrashuvlar.",
    icon: "◇",
  },
  {
    title: "Jamiyat",
    description:
      "Vatandoshlar uchrashuvlari, oilaviy tadbirlar va jamoat loyihalari.",
    icon: "◎",
  },
];

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 pt-20 text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute -bottom-40 left-10 h-96 w-96 rounded-full bg-emerald-500 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Vatandoshlar.de tadbirlar kalendari
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl sm:leading-tight">
                Uchrashing, o‘rganing va hamjamiyat bilan
                bog‘laning
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
                Germaniyadagi o‘zbekistonliklar uchun madaniy,
                ta’limiy, professional va jamoat tadbirlari.
                Har bir e’lon rasmiy manba orqali tekshiriladi.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#upcoming-events"
                  className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Yaqin tadbirlarni ko‘rish
                </a>

                <a
                  href="#event-policy"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Tekshirish tartibi
                </a>
              </div>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold">
                  {upcomingEvents.length}
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  Yaqin tadbir
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold">
                  {eventCategories.length}
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  Asosiy yo‘nalish
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-3xl font-bold">100%</p>

                <p className="mt-2 text-sm text-slate-300">
                  Rasmiy manbasi tekshirilgan
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {eventCategories.map((category) => (
                <article
                  key={category.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-700">
                    {category.icon}
                  </div>

                  <h2 className="mt-6 text-xl font-bold">
                    {category.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="upcoming-events"
          className="py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Yaqin tadbirlar
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Rejalashtirilgan tadbirlar
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Sana, manzil, tashkilotchi va ro‘yxatdan
                o‘tish havolasi tekshirilgan tadbirlar shu
                yerda ko‘rsatiladi.
              </p>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
                  <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-blue-700 to-slate-950 p-10 text-white">
                    <div className="text-center">
                      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/10 text-5xl">
                        ◷
                      </div>

                      <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                        Tadbirlar kalendari
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                    <span className="w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                      Hozircha tasdiqlangan tadbir yo‘q
                    </span>

                    <h3 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                      Yangi tadbirlar tekshirilgandan keyin
                      e’lon qilinadi
                    </h3>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                      Vatandoshlar.de foydalanuvchilarni
                      chalg‘itmaslik uchun uydirma sana,
                      manzil yoki ro‘yxatdan o‘tish
                      havolalarini joylashtirmaydi.
                    </p>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <p className="font-semibold text-slate-950">
                        Tadbir e’lon qilinishi uchun:
                      </p>

                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                        <li>• Rasmiy tashkilotchi ko‘rsatilishi</li>
                        <li>• Sana va manzil tasdiqlanishi</li>
                        <li>• Rasmiy manba havolasi mavjud bo‘lishi</li>
                        <li>• Ro‘yxatdan o‘tish tartibi aniq bo‘lishi</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section
          id="event-policy"
          className="border-y border-slate-200 bg-white py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Ishonchlilik
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Tadbirlar qanday tekshiriladi?
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Har bir tadbir portalga joylashtirilishidan
                  oldin asosiy ma’lumotlari va rasmiy manbasi
                  tekshiriladi.
                </p>
              </div>

              <ol className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    number: "01",
                    title: "Tashkilotchi",
                    description:
                      "Tashkilot yoki mas’ul shaxsning rasmiy sahifasi tekshiriladi.",
                  },
                  {
                    number: "02",
                    title: "Sana va manzil",
                    description:
                      "Tadbir sanasi, vaqti va manzili manba bilan solishtiriladi.",
                  },
                  {
                    number: "03",
                    title: "Ro‘yxatdan o‘tish",
                    description:
                      "Ariza havolasi va qatnashish shartlari tekshiriladi.",
                  },
                  {
                    number: "04",
                    title: "Tekshiruv sanasi",
                    description:
                      "Har bir tadbirda ma’lumot oxirgi marta qachon tekshirilgani ko‘rsatiladi.",
                  },
                ].map((step) => (
                  <li
                    key={step.number}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
                  >
                    <span className="text-sm font-bold text-blue-600">
                      {step.number}
                    </span>

                    <h3 className="mt-4 text-xl font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {pastEvents.length > 0 && (
          <section className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Arxiv
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  O‘tgan tadbirlar
                </h2>
              </div>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
                  Muhim eslatma
                </p>

                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Yo‘lga chiqishdan oldin tadbirni qayta
                  tekshiring
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Tashkilotchilar sana, manzil yoki dasturga
                  o‘zgartirish kiritishi mumkin. Tadbirga
                  borishdan oldin rasmiy manba sahifasini
                  yana bir marta oching.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex w-fit rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Vatandoshlar.de</p>

          <p>
            Germaniyadagi o‘zbekistonliklar uchun raqamli
            platforma
          </p>
        </div>
      </footer>
    </>
  );
}