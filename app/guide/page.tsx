import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import Header from "../../components/Header";
import GuideCategoryGrid from "../../components/guide/GuideCategoryGrid";
import GuideHero from "../../components/guide/GuideHero";
import { getGuideCategories } from "../../data/guide";
import type { SupportedGuideLocale } from "../../types/guide";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as SupportedGuideLocale;

  return locale === "uz"
    ? {
        title: "Germaniya qo‘llanmasi | Vatandoshlar.de",
        description:
          "Germaniyaga kelish, vizalar, ta’lim, ish, oila, hujjatlar va kelgandan keyingi jarayonlar bo‘yicha tizimli qo‘llanmalar.",
        alternates: {
          canonical: "/guide",
        },
      }
    : {
        title: "Deutschland Guide | Vatandoshlar.de",
        description:
          "Strukturierte Leitfäden zu Einreise, Visa, Bildung, Arbeit, Familie, Dokumenten und den ersten Schritten nach der Ankunft.",
        alternates: {
          canonical: "/guide",
        },
      };
}

export default async function GuidePage() {
  const locale = (await getLocale()) as SupportedGuideLocale;
  const categories = getGuideCategories(locale);

  const copy =
    locale === "uz"
      ? {
          hero: {
            eyebrow: "Vatandoshlar.de bilim markazi",
            title:
              "Germaniyaga kelish va bu yerda hayot boshlash uchun yagona qo‘llanma",
            description:
              "Au Pair’dan boshlab oila birlashtirish, vizalar, termin olish, ta’lim, ish, hujjatlar va Germaniyaga kelgandan keyingi bosqichlargacha bo‘lgan ma’lumotlar tartibli ravishda bir joyda jamlanadi.",
            primary: "Yo‘nalishlarni ko‘rish",
            secondary: "Ishonchlilik tamoyili",
          },
          categories: {
            eyebrow: "Asosiy yo‘nalishlar",
            title: "Kerakli mavzuni tanlang",
            description:
              "Har bir bo‘lim bosqichma-bosqich rasmiy manbalar asosidagi maqolalar bilan to‘ldiriladi.",
            comingSoon: "Tez orada",
            articles: "ta maqola",
            open: "Ochish",
          },
          principles: {
            eyebrow: "Ishonchlilik",
            title: "Ma’lumotlar qanday tayyorlanadi?",
            description:
              "Guide’dagi materiallar foydalanuvchini rasmiy manbaga yo‘naltirish va murakkab jarayonlarni tushunarli tarzda izohlash uchun tayyorlanadi.",
            items: [
              {
                title: "Rasmiy manbalar",
                description:
                  "Asosiy talablar Germaniya idoralari, elchixonalar va vakolatli tashkilotlarning birlamchi manbalari orqali tekshiriladi.",
              },
              {
                title: "Yangilanish sanasi",
                description:
                  "Har bir maqolada ma’lumot qachon tekshirilgani va qaysi manbalardan foydalanilgani ko‘rsatiladi.",
              },
              {
                title: "Amaliy yo‘naltirish",
                description:
                  "Talablar, hujjatlar va keyingi qadamlar ortiqcha murakkabliksiz, izchil shaklda tushuntiriladi.",
              },
            ],
          },
          notice:
            "Guide hozir infratuzilma bosqichida. Kategoriyalar tayyor, maqolalar esa keyingi bosqichlarda birma-bir qo‘shiladi.",
          footer:
            "Germaniyadagi o‘zbekistonliklar uchun raqamli platforma",
        }
      : {
          hero: {
            eyebrow: "Wissenszentrum von Vatandoshlar.de",
            title:
              "Der zentrale Leitfaden für Einreise und den Start in Deutschland",
            description:
              "Von Au-pair über Familiennachzug, Visa und Terminbuchung bis zu Bildung, Arbeit, Dokumenten und den ersten Schritten nach der Ankunft werden wichtige Informationen strukturiert an einem Ort gebündelt.",
            primary: "Bereiche ansehen",
            secondary: "Grundsätze der Verlässlichkeit",
          },
          categories: {
            eyebrow: "Hauptbereiche",
            title: "Wählen Sie das passende Thema",
            description:
              "Jeder Bereich wird schrittweise mit Artikeln auf Grundlage offizieller Quellen ergänzt.",
            comingSoon: "Demnächst",
            articles: "Artikel",
            open: "Öffnen",
          },
          principles: {
            eyebrow: "Verlässlichkeit",
            title: "Wie werden die Informationen erstellt?",
            description:
              "Die Inhalte führen zu offiziellen Quellen und erklären komplexe Abläufe verständlich und strukturiert.",
            items: [
              {
                title: "Offizielle Quellen",
                description:
                  "Zentrale Anforderungen werden anhand primärer Quellen deutscher Behörden, Auslandsvertretungen und zuständiger Organisationen geprüft.",
              },
              {
                title: "Aktualisierungsdatum",
                description:
                  "Jeder Artikel zeigt, wann die Informationen zuletzt geprüft und welche Quellen verwendet wurden.",
              },
              {
                title: "Praktische Orientierung",
                description:
                  "Voraussetzungen, Unterlagen und nächste Schritte werden verständlich und in logischer Reihenfolge erklärt.",
              },
            ],
          },
          notice:
            "Der Guide befindet sich derzeit in der Infrastrukturphase. Die Kategorien sind vorbereitet; die Artikel werden in den nächsten Phasen schrittweise ergänzt.",
          footer:
            "Digitale Plattform für Usbeken in Deutschland",
        };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 pt-20 text-slate-950 transition-colors dark:bg-slate-950 dark:text-white">
        <GuideHero
          eyebrow={copy.hero.eyebrow}
          title={copy.hero.title}
          description={copy.hero.description}
          primaryLabel={copy.hero.primary}
          secondaryLabel={copy.hero.secondary}
        />

        <section
          id="guide-categories"
          className="py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {copy.categories.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                {copy.categories.title}
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                {copy.categories.description}
              </p>
            </div>

            <div className="mt-12">
              <GuideCategoryGrid
                categories={categories}
                comingSoonLabel={copy.categories.comingSoon}
                articlesLabel={copy.categories.articles}
                openLabel={copy.categories.open}
              />
            </div>

            <div className="mt-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-blue-950 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-100">
              <p className="leading-7">{copy.notice}</p>
            </div>
          </div>
        </section>

        <section
          id="guide-principles"
          className="border-y border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {copy.principles.eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                {copy.principles.title}
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
                {copy.principles.description}
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {copy.principles.items.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-800 dark:bg-slate-950"
                >
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
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
