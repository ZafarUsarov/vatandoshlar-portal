import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import ServiceCard from "../../../components/cards/ServiceCard";
import { Link } from "../../../i18n/navigation";
import {
  getPublishedServiceBySlug,
  getRelatedPublishedServices,
} from "../../../lib/services/public-services-repository";
import type { SupportedContentLocale } from "../../../types/service";

type ServiceDetailPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export const dynamic =
  "force-dynamic";

const baseUrl =
  "https://vatandoshlar.de";

function serializeStructuredData(
  data: object,
): string {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  );
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const locale =
    (await getLocale()) as SupportedContentLocale;

  const { slug } =
    await params;

  const service =
    await getPublishedServiceBySlug(
      slug,
      locale,
    );

  if (!service) {
    return {
      title:
        locale === "uz"
          ? "Xizmat topilmadi | Vatandoshlar.de"
          : "Dienstleistung nicht gefunden | Vatandoshlar.de",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title:
      `${service.title} | Vatandoshlar.de`,
    description:
      service.description,
    alternates: {
      canonical:
        `/${locale}/services/${service.slug}`,
      languages: {
        uz:
          `/uz/services/${service.slug}`,
        de:
          `/de/services/${service.slug}`,
      },
    },
    openGraph: {
      type: "website",
      title:
        service.title,
      description:
        service.description,
      url:
        `/${locale}/services/${service.slug}`,
      siteName:
        "Vatandoshlar.de",
      locale:
        locale === "de"
          ? "de_DE"
          : "uz_UZ",
    },
    twitter: {
      card: "summary",
      title:
        service.title,
      description:
        service.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const locale =
    (await getLocale()) as SupportedContentLocale;

  const { slug } =
    await params;

  const [
    service,
    relatedServices,
  ] = await Promise.all([
    getPublishedServiceBySlug(
      slug,
      locale,
    ),
    getRelatedPublishedServices(
      slug,
      locale,
      3,
    ),
  ]);

  if (!service) {
    notFound();
  }

  const serviceUrl =
    `${baseUrl}/${locale}/services/${service.slug}`;

  const serviceStructuredData = {
    "@context":
      "https://schema.org",
    "@type":
      "Service",
    name:
      service.title,
    description:
      service.description,
    url:
      serviceUrl,
    serviceType:
      service.category,
    areaServed: {
      "@type":
        "Country",
      name:
        "Germany",
    },
    mainEntityOfPage: {
      "@type":
        "WebPage",
      "@id":
        serviceUrl,
    },
  };

  const copy =
    locale === "uz"
      ? {
          back: "Barcha xizmatlar",
          verified: "Rasmiy tekshiruv mavjud",
          servicesEyebrow: "Xizmatlar",
          servicesTitle:
            "Ushbu yo‘nalishda nimalar mavjud?",
          verificationEyebrow: "Tekshirish",
          verificationTitle:
            "Xizmat ko‘rsatuvchini qanday tekshirish kerak?",
          sourceEyebrow: "Rasmiy manba",
          sourceTitle:
            "Ma’lumotni rasmiy manbadan tekshiring",
          openSource: "Rasmiy sahifani ochish",
          opensNew:
            "Havola yangi oynada ochiladi",
          notesEyebrow: "Muhim eslatmalar",
          notesTitle:
            "Buyurtma berishdan oldin e’tibor bering",
          disclaimer:
            "Vatandoshlar.de xizmat ko‘rsatuvchini tavsiya qilish yoki uning natijasiga kafolat berish o‘rniga, foydalanuvchiga rasmiy manbalar orqali mustaqil tekshirish yo‘lini ko‘rsatadi.",
          relatedEyebrow: "Boshqa yo‘nalishlar",
          relatedTitle:
            "Sizga foydali bo‘lishi mumkin",
          details: "Batafsil",
          footer:
            "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma",
        }
      : {
          back: "Alle Dienstleistungen",
          verified: "Offizielle Prüfung möglich",
          servicesEyebrow: "Leistungen",
          servicesTitle:
            "Welche Leistungen gehören zu diesem Bereich?",
          verificationEyebrow: "Prüfung",
          verificationTitle:
            "Wie können Sie den Anbieter überprüfen?",
          sourceEyebrow: "Offizielle Quelle",
          sourceTitle:
            "Informationen über die offizielle Quelle prüfen",
          openSource: "Offizielle Seite öffnen",
          opensNew:
            "Der Link wird in einem neuen Fenster geöffnet",
          notesEyebrow: "Wichtige Hinweise",
          notesTitle:
            "Das sollten Sie vor der Beauftragung beachten",
          disclaimer:
            "Vatandoshlar.de garantiert weder Anbieter noch Ergebnisse. Die Plattform zeigt, wie Nutzer Angaben selbstständig über offizielle Quellen prüfen können.",
          relatedEyebrow: "Weitere Bereiche",
          relatedTitle:
            "Das könnte ebenfalls hilfreich sein",
          details: "Details",
          footer:
            "Digitale Plattform für Usbeken in Deutschland",
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
              serviceStructuredData,
            ),
        }}
      />

      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <article>
          <header className="border-b border-slate-200 bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 dark:text-blue-400 dark:hover:text-blue-300 dark:focus-visible:ring-offset-slate-900"
              >
                <span
                  aria-hidden="true"
                  className="mr-2"
                >
                  ←
                </span>
                {copy.back}
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  {service.category}
                </span>

                <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  {copy.verified}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="mt-8 flex size-16 items-center justify-center rounded-2xl bg-slate-950 text-3xl font-bold text-white shadow-sm dark:bg-black"
              >
                {service.icon}
              </div>

              <h1 className="mt-7 text-4xl font-bold tracking-[-0.04em] sm:text-5xl sm:leading-tight">
                {service.title}
              </h1>

              <p className="mt-7 text-xl leading-8 text-slate-600 dark:text-slate-400">
                {service.description}
              </p>

              <p className="mt-7 text-sm font-medium text-slate-500 dark:text-slate-400">
                {service.location}
              </p>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
            <section aria-labelledby="service-offerings-heading">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {copy.servicesEyebrow}
              </p>

              <h2
                id="service-offerings-heading"
                className="mt-3 text-2xl font-bold"
              >
                {copy.servicesTitle}
              </h2>

              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {service.services.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="service-verification-heading"
              className="mt-14"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {copy.verificationEyebrow}
              </p>

              <h2
                id="service-verification-heading"
                className="mt-3 text-2xl font-bold"
              >
                {copy.verificationTitle}
              </h2>

              <ol className="mt-7 space-y-4">
                {service.verificationSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {index + 1}
                    </span>

                    <p className="pt-1 leading-7 text-slate-700 dark:text-slate-300">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="service-source-heading"
              className="mt-14 rounded-3xl border border-emerald-200 bg-emerald-50 p-7 dark:border-emerald-500/20 dark:bg-emerald-500/10 sm:p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                {copy.sourceEyebrow}
              </p>

              <h2
                id="service-source-heading"
                className="mt-3 text-xl font-bold text-emerald-950 dark:text-emerald-100"
              >
                {copy.sourceTitle}
              </h2>

              <p className="mt-4 font-semibold text-emerald-950 dark:text-emerald-100">
                {service.officialSourceName}
              </p>

              <p className="mt-3 leading-7 text-emerald-900 dark:text-emerald-200">
                {service.sourceDescription}
              </p>

              <a
                href={service.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-50 dark:focus-visible:ring-offset-slate-900"
              >
                {copy.openSource}
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
            </section>

            <aside
              aria-labelledby="service-notes-heading"
              className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-7 dark:border-amber-500/20 dark:bg-amber-500/10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
                {copy.notesEyebrow}
              </p>

              <h2
                id="service-notes-heading"
                className="mt-3 text-xl font-bold text-amber-950 dark:text-amber-100"
              >
                {copy.notesTitle}
              </h2>

              <ul className="mt-5 space-y-3">
                {service.importantNotes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-3 leading-7 text-amber-900 dark:text-amber-200"
                  >
                    <span aria-hidden="true">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                {copy.disclaimer}
              </p>
            </div>
          </div>
        </article>

        {relatedServices.length > 0 && (
          <section
            aria-labelledby="related-services-heading"
            className="border-t border-slate-200 bg-slate-50 py-20 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                {copy.relatedEyebrow}
              </p>

              <h2
                id="related-services-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.03em]"
              >
                {copy.relatedTitle}
              </h2>

              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((item, index) => (
                  <ServiceCard
                    key={item.id}
                    service={item}
                    index={index}
                    detailsLabel={copy.details}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-slate-400">
          <p>© 2026 Vatandoshlar.de</p>
          <p>{copy.footer}</p>
        </div>
      </footer>
    </>
  );
}
