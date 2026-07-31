import Link from "next/link";

import { jobGuides } from "../data/jobs";
import JobGuideCard from "./JobGuideCard";

export default function JobsSection() {
  const homepageGuides = jobGuides.slice(0, 3);

  return (
    <section id="jobs" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Ish va karyera
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Germaniyada ishni ishonchli toping
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              Talabalar, ingliz tilida ishlovchilar, Minijob
              izlayotganlar va malakali mutaxassislar uchun
              rasmiy manbalarga asoslangan yo‘riqnomalar.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex w-fit font-semibold text-emerald-400 transition hover:text-emerald-300"
          >
            Barcha yo‘nalishlar →
          </Link>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {homepageGuides.map((guide) => (
            <JobGuideCard
              key={guide.id}
              guide={guide}
            />
          ))}
        </div>
      </div>
    </section>
  );
}