import type { Metadata } from "next";
import { Globe, Mail } from "lucide-react";
import FounderAvatar from "./FounderAvatar";
import { specialists } from "@/data/specialists";
import { getLocale } from "next-intl/server";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BrandName from "@/components/ui/BrandName";
import { imprint } from "@/data/legal/imprint";
import { Link } from "@/i18n/navigation";

const copy = {
  uz: {
    eyebrow: "HUQUQIY MA’LUMOT",
    title: "Impressum",
    description:
      "UzDe — Germaniyada yashayotgan hamda Germaniyaga kelishni rejalashtirayotgan o‘zbekistonliklar uchun axborot va hamjamiyat platformasi.",
    operator: "Platforma operatori",
    founderRole: "UzDe asoschisi va platforma boshqaruvchisi",
    founderPlatform:
      "UzDe — Germaniyadagi o‘zbekistonliklar uchun mustaqil axborot va hamjamiyat platformasi.",
    operatorText:
      "UzDe xususiy, notijorat axborot va hamjamiyat loyihasidir.",
    address: "Pochta manzili",
    editorial: "§ 18 Abs. 2 MStV bo‘yicha jurnalistik-tahririy mas’ul",
    editorialAddressReference: "Manzil yuqorida ko‘rsatilgan.",
    contact: "Aloqa",
    website: "Veb-sayt",
    metadataDescription: "UzDe platformasining operatori, aloqa manzili va tahririy mas’ul shaxs haqidagi huquqiy ma’lumotlar.",
  },
  de: {
    eyebrow: "RECHTLICHE INFORMATIONEN",
    title: "Impressum",
    description:
      "UzDe ist eine Informations- und Community-Plattform für Menschen aus Usbekistan, die bereits in Deutschland leben oder planen, nach Deutschland zu kommen.",
    operator: "Angaben zum Diensteanbieter",
    founderRole: "Gründer und Betreiber der Plattform UzDe",
    founderPlatform:
      "UzDe — eine unabhängige Informations- und Community-Plattform für Menschen aus Usbekistan in Deutschland.",
    operatorText:
      "UzDe ist ein privat betriebenes, nicht kommerzielles Informations- und Community-Projekt.",
    address: "Postanschrift",
    editorial: "Verantwortlich für journalistisch-redaktionelle Inhalte gemäß § 18 Abs. 2 MStV",
    editorialAddressReference: "Anschrift wie oben.",
    contact: "Kontakt",
    website: "Website",
    metadataDescription: "Rechtliche Angaben zum Betreiber, zur Kontaktanschrift und zur redaktionell verantwortlichen Person von UzDe.",
  },
} as const;

const founderAvatarUrl =
  specialists.find((specialist) => specialist.slug === "zafar-usarov")
    ?.avatarUrl ?? null;

export default async function ImpressumPage() {
  const locale = await getLocale();
  const t = locale === "de" ? copy.de : copy.uz;

  return (
    <>
      <Header />
      <main
        id="top"
        className="relative overflow-hidden bg-slate-50 px-4 pb-10 pt-28 dark:bg-slate-950 sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pb-16 lg:pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.13),transparent_42%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_34%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <header className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-7 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.5)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:p-9 lg:p-11">
            <div className="relative">
              <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1 text-xs font-black leading-6 uppercase tracking-[0.16em]">
                <span className="inline-flex items-center normal-case tracking-normal"><BrandName className="text-slate-950 dark:text-white" /></span>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                <span className="inline-flex items-center leading-6 text-emerald-600 dark:text-emerald-400">{t.eyebrow}</span>
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {t.title}
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {t.description.startsWith("UzDe") ? <><BrandName className="text-inherit" />{t.description.slice(4)}</> : t.description}
              </p>
            </div>
          </header>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="group rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_18px_45px_-30px_rgba(15,23,42,0.3)] motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-500/30 dark:hover:shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] sm:p-8">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">{t.operator}</h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                {t.founderPlatform.startsWith("UzDe") ? (
                  <>
                    <BrandName className="text-inherit" />
                    {t.founderPlatform.slice(4)}
                  </>
                ) : (
                  t.founderPlatform
                )}
              </p>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{t.operatorText.startsWith("UzDe") ? <><BrandName className="text-inherit" />{t.operatorText.slice(4)}</> : t.operatorText}</p>
              <div className="mt-5 not-italic leading-7 text-slate-700 dark:text-slate-200">
                <p className="font-semibold">{imprint.operatorName}</p>
                <address className="not-italic">
                  {imprint.serviceAddress.map((line) => <span key={line} className="block">{line}</span>)}
                </address>
              </div>
            </section>

            <section className="group rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_18px_45px_-30px_rgba(15,23,42,0.3)] motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-500/30 dark:hover:shadow-[0_18px_45px_-30px_rgba(0,0,0,0.5)] sm:p-8">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">{t.contact}</h2>
              <div className="mt-5 flex items-start gap-3">
                <FounderAvatar
                  src={founderAvatarUrl}
                  alt="Zafar Usarov"
                />
                <div className="min-w-0">
                  <Link
                    href="/about/founder"
                    className="inline-flex rounded-sm font-bold text-slate-950 underline decoration-emerald-500/40 underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-white dark:hover:text-emerald-300"
                  >
                    Zafar Usarov
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t.founderRole}
                  </p>
                </div>
              </div>
              <div aria-hidden="true" className="my-5 h-px bg-slate-200/80 dark:bg-slate-700/70" />
              <div className="space-y-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Globe aria-hidden="true" size={19} strokeWidth={1.8} />
                  </span>
                  <a
                    href={imprint.website}
                    className="min-w-0 break-all text-sm font-medium text-slate-700 underline decoration-transparent underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-slate-200 dark:hover:text-emerald-300 sm:text-base"
                  >
                    {imprint.website}
                  </a>
                </div>
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Mail aria-hidden="true" size={19} strokeWidth={1.8} />
                  </span>
                  <a
                    href={`mailto:${imprint.email}`}
                    className="min-w-0 break-all text-sm font-medium text-slate-700 underline decoration-transparent underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-slate-200 dark:hover:text-emerald-300 sm:text-base"
                  >
                    {imprint.email}
                  </a>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="editorial-responsibility" className="mt-6 rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-8">
            <h2 id="editorial-responsibility" className="text-xl font-bold text-slate-950 dark:text-white">{t.editorial}</h2>
            <div className="mt-4 leading-7 text-slate-700 dark:text-slate-200">
              <p className="font-semibold">{imprint.editorialResponsible}</p>
              <p>{t.editorialAddressReference}</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = locale === "de" ? copy.de : copy.uz;

  return {
    title: t.title,
    description: t.metadataDescription,
    robots: { index: true, follow: true },
  };
}
