import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  getAdminSpecialists,
  type AdminSpecialistStatus,
} from "@/lib/specialists/admin-specialists-repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Specialists Admin | Vatandoshlar.de",
  robots: {
    index: false,
    follow: false,
  },
};

const copy = {
  uz: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN · MUTAXASSISLAR",
    title: "Mutaxassislarni boshqarish",
    description:
      "PostgreSQL’dagi mutaxassis profillarini boshqaring. Hozirgi bosqichda yangi profil yaratish va uni draft sifatida saqlash ishlaydi.",
    publicStatic:
      "Public Mutaxassislar bo‘limi hozircha static data’dan foydalanadi. Admin’da yaratilgan yangi draft public sahifada ko‘rinmaydi.",
    back: "Admin panelga qaytish",
    publicPage: "Public mutaxassislar",
    create: "Yangi mutaxassis yaratish",
    total: "Jami",
    drafts: "Qoralama",
    published: "E’lon qilingan",
    archived: "Arxivlangan",
    verified: "Tasdiqlangan",
    featured: "Featured",
    premium: "Premium",
    sponsored: "Sponsored",
    emptyTitle: "PostgreSQL’da mutaxassislar hali mavjud emas",
    emptyDescription:
      "Yangi mutaxassis yaratib, uni draft sifatida PostgreSQL’ga saqlashingiz mumkin.",
    code: "Kod",
    slug: "Slug",
    location: "Hudud",
    updated: "Yangilangan",
    statuses: {
      draft: "Qoralama",
      published: "E’lon qilingan",
      archived: "Arxivlangan",
    },
  },
  de: {
    eyebrow: "VATANDOSHLAR.DE · ADMIN · FACHKRÄFTE",
    title: "Fachkräfte verwalten",
    description:
      "Verwalten Sie Fachkraftprofile in PostgreSQL. In diesem Schritt können neue Profile erstellt und als Entwurf gespeichert werden.",
    publicStatic:
      "Der öffentliche Fachkräftebereich verwendet vorerst weiterhin statische Daten. Neue Admin-Entwürfe erscheinen dort nicht.",
    back: "Zur Admin-Übersicht",
    publicPage: "Öffentliche Fachkräfte",
    create: "Neue Fachkraft erstellen",
    total: "Gesamt",
    drafts: "Entwürfe",
    published: "Veröffentlicht",
    archived: "Archiviert",
    verified: "Verifiziert",
    featured: "Featured",
    premium: "Premium",
    sponsored: "Sponsored",
    emptyTitle: "Noch keine Fachkräfte in PostgreSQL",
    emptyDescription:
      "Erstellen Sie eine neue Fachkraft und speichern Sie sie als Entwurf in PostgreSQL.",
    code: "Code",
    slug: "Slug",
    location: "Ort",
    updated: "Aktualisiert",
    statuses: {
      draft: "Entwurf",
      published: "Veröffentlicht",
      archived: "Archiviert",
    },
  },
} as const;

type AppLocale = "uz" | "de";

function formatDate(
  value: string,
  locale: AppLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz" ? "uz-UZ" : "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(new Date(value));
}

function getStatusClasses(
  status: AdminSpecialistStatus,
): string {
  if (status === "published") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (status === "archived") {
    return "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300";
}

function getLocationLabel(
  city: string | null,
  bundesland: string | null,
): string {
  const values = [city, bundesland].filter(Boolean);

  return values.length > 0
    ? values.join(", ")
    : "—";
}

export default async function AdminSpecialistsPage() {
  const locale = await getLocale();
  const appLocale: AppLocale = locale === "de" ? "de" : "uz";

  await requireAdmin(appLocale);

  const currentCopy = appLocale === "de" ? copy.de : copy.uz;
  const specialists = await getAdminSpecialists();

  const draftCount = specialists.filter(
    (specialist) => specialist.status === "draft",
  ).length;
  const publishedCount = specialists.filter(
    (specialist) => specialist.status === "published",
  ).length;
  const archivedCount = specialists.filter(
    (specialist) => specialist.status === "archived",
  ).length;
  const verifiedCount = specialists.filter(
    (specialist) => specialist.verified,
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-fuchsia-600 dark:text-fuchsia-400">
                {currentCopy.eyebrow}
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {currentCopy.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.description}
              </p>

              <p className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
                {currentCopy.publicStatic}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.back}
              </Link>

              <Link
                href="/specialists"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-fuchsia-200 bg-fuchsia-50 px-4 text-sm font-bold text-fuchsia-700 transition hover:bg-fuchsia-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:border-fuchsia-500/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:hover:bg-fuchsia-500/15 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.publicPage}
              </Link>

              <Link
                href="/admin/specialists/new"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-fuchsia-600 px-4 text-sm font-bold text-white transition hover:bg-fuchsia-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: currentCopy.total, value: specialists.length },
            { label: currentCopy.drafts, value: draftCount },
            { label: currentCopy.published, value: publishedCount },
            { label: currentCopy.archived, value: archivedCount },
            { label: currentCopy.verified, value: verifiedCount },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-6">
          {specialists.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900 sm:p-12">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                {currentCopy.emptyTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {currentCopy.emptyDescription}
              </p>
              <Link
                href="/admin/specialists/new"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-fuchsia-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                {currentCopy.create}
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {specialists.map((specialist) => (
                <article
                  key={specialist.id}
                  className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${getStatusClasses(
                        specialist.status,
                      )}`}
                    >
                      {currentCopy.statuses[specialist.status]}
                    </span>

                    {specialist.verified && (
                      <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                        {currentCopy.verified}
                      </span>
                    )}
                    {specialist.featured && (
                      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300">
                        {currentCopy.featured}
                      </span>
                    )}
                    {specialist.premium && (
                      <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                        {currentCopy.premium}
                      </span>
                    )}
                    {specialist.sponsored && (
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
                        {currentCopy.sponsored}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-black text-slate-950 dark:text-white">
                    {specialist.name}
                  </h2>

                  <p className="mt-2 text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                    {appLocale === "de"
                      ? specialist.professionDe
                      : specialist.professionUz}
                  </p>

                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="font-medium text-slate-500 dark:text-slate-400">{currentCopy.code}</dt>
                      <dd className="mt-1 font-mono text-xs text-slate-700 dark:text-slate-300">{specialist.code}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500 dark:text-slate-400">{currentCopy.slug}</dt>
                      <dd className="mt-1 break-all font-mono text-xs text-slate-700 dark:text-slate-300">{specialist.slug}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500 dark:text-slate-400">{currentCopy.location}</dt>
                      <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                        {getLocationLabel(specialist.city, specialist.bundesland)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-500 dark:text-slate-400">{currentCopy.updated}</dt>
                      <dd className="mt-1 font-semibold text-slate-700 dark:text-slate-300">
                        {formatDate(specialist.updatedAt, appLocale)}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {specialist.categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
