import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import JobGuideCard from "../../../components/JobGuideCard";
import {
  formatJobDate,
  getJobGuideBySlug,
  jobGuides,
} from "../../../data/jobs";

type JobGuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return jobGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: JobGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getJobGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Ish qo‘llanmasi topilmadi | Vatandoshlar.de",
    };
  }

  return {
    title: `${guide.title} | Vatandoshlar.de`,
    description: guide.description,
    alternates: {
      canonical: `/jobs/${guide.slug}`,
    },
  };
}

export default async function JobGuidePage({
  params,
}: JobGuidePageProps) {
  const { slug } = await params;
  const guide = getJobGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = jobGuides
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950">
        <article>
          <header className="border-b border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
              <Link
                href="/jobs"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                ← Barcha ish yo‘nalishlari
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  {guide.category}
                </span>

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  Rasmiy manbaga asoslangan
                </span>
              </div>

              <div className="mt-8 flex h-16 min-w-16 w-fit items-center justify-center rounded-2xl bg-slate-950 px-4 text-2xl font-bold text-white">
                {guide.icon}
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
                {guide.title}
              </h1>

              <p className="mt-7 text-xl leading-8 text-slate-600">
                {guide.description}
              </p>

              <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
                <p>
                  Kimlar uchun:{" "}
                  <span className="font-medium text-slate-700">
                    {guide.audience}
                  </span>
                </p>

                <p className="mt-2">
                  Oxirgi tekshiruv:{" "}
                  <time dateTime={guide.verifiedAt}>
                    {formatJobDate(guide.verifiedAt)}
                  </time>
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
            <section>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Asosiy ma’lumotlar
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Ushbu qo‘llanmada nimalarni bilib olasiz?
              </h2>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {guide.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700"
                  >
                    <span className="mr-2 font-bold text-emerald-600">
                      ✓
                    </span>

                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Qidiruv so‘zlari
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Vakansiyani qanday so‘zlar bilan qidirish kerak?
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                {guide.searchKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                Amaliy reja
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Bosqichma-bosqich yo‘riqnoma
              </h2>

              <ol className="mt-7 space-y-4">
                {guide.steps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-slate-200 p-5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {index + 1}
                    </span>

                    <p className="pt-1 leading-7 text-slate-700">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-14 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Rasmiy manba
              </p>

              <h2 className="mt-3 text-xl font-bold text-emerald-950">
                {guide.officialSourceName}
              </h2>

              <p className="mt-4 leading-7 text-emerald-900">
                {guide.sourceDescription}
              </p>

              <a
                href={guide.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Rasmiy sahifani ochish ↗
              </a>
            </section>

            <aside className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7">
              <h2 className="text-xl font-bold text-amber-950">
                Muhim ogohlantirishlar
              </h2>

              <ul className="mt-5 space-y-3">
                {guide.importantNotes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 leading-7 text-amber-900"
                  >
                    <span aria-hidden="true">•</span>

                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="mt-12 border-t border-slate-200 pt-8">
              <p className="text-sm leading-6 text-slate-500">
                Mehnat, migratsiya, soliq va sug‘urta
                qoidalari individual holatga qarab farq
                qilishi mumkin. Qaror qabul qilishdan oldin
                rasmiy manbani yoki vakolatli maslahat
                xizmatini tekshiring.
              </p>
            </div>
          </div>
        </article>

        <section className="border-t border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Boshqa yo‘nalishlar
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Sizga foydali bo‘lishi mumkin
            </h2>

            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((item) => (
                <JobGuideCard
                  key={item.id}
                  guide={item}
                />
              ))}
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