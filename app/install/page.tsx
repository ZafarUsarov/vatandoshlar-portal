import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InstallVideo from "../../components/install/InstallVideo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  return {
    title: locale === "de" ? "UzDe installieren" : "UzDe ilovasini o‘rnatish",
    description: locale === "de" ? "UzDe auf dem iPhone oder Android-Startbildschirm hinzufügen." : "UzDe’ni iPhone yoki Android bosh ekraniga qo‘shish bo‘yicha qo‘llanma.",
    alternates: { canonical: `/${locale}/install`, languages: { uz: "/uz/install", de: "/de/install" } },
  };
}

function emphasizeInstructions(text: string) {
  return text.split(/(uzde\.de|\(Share\)|«[^»]+»|„[^“]+“)/g).map((part, index) =>
    /^(?:uzde\.de|\(Share\)|«[^»]+»|„[^“]+“)$/.test(part)
      ? <strong key={index} className="font-semibold text-slate-900 dark:text-white">{part}</strong>
      : part,
  );
}

export default async function InstallPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const de = locale === "de";
  const steps = de
    ? [
        { title: "iPhone · Safari", intro: "Öffne uzde.de in Safari.", items: ["Tippe auf Teilen (Quadrat mit Pfeil).", "Wähle „Zum Home-Bildschirm“ (gegebenenfalls unter „Mehr“).", "Tippe auf „Hinzufügen“. Das UzDe-Symbol erscheint auf dem Home-Bildschirm."] },
        { title: "Android · Chrome", intro: "Öffne uzde.de in Google Chrome.", items: ["Tippe auf das Drei-Punkte-Menü oben rechts.", "Wähle „App installieren“ oder „Zum Startbildschirm hinzufügen“.", "Bestätige mit „Installieren“ oder „Hinzufügen“."] },
      ]
    : [
        { title: "iPhone · Safari", intro: "Safari brauzerida uzde.de saytini oching.", items: ["Ulashish (Share) belgisini bosing — kvadrat ichidan yuqoriga yo‘nalgan strelka.", "«Add to Home Screen» («Bosh ekranga qo‘shish») bandini tanlang. Zarur bo‘lsa, menyuni pastga suring.", "«Add» («Qo‘shish») tugmasini bosing. UzDe belgisi bosh ekranda paydo bo‘ladi."] },
        { title: "Android · Chrome", intro: "Google Chrome brauzerida uzde.de saytini oching.", items: ["Yuqori o‘ngdagi uch nuqtali menyuni oching.", "«Install app» («Ilovani o‘rnatish») yoki «Add to Home screen» («Bosh ekranga qo‘shish») bandini tanlang.", "«Install» yoki «Add» tugmasi bilan tasdiqlang."] },
      ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-white sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#0e172b] text-white shadow-xl shadow-slate-900/10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 size-[28rem] rounded-full bg-emerald-500/15 hidden sm:block sm:blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 size-80 rounded-full bg-cyan-500/10 hidden sm:block sm:blur-3xl" />
            <div className="relative grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-16">
              <div>
                <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2">
                  <img src="/images/brand/uzde/uzde-icon-192.png" alt="" width={30} height={30} className="size-8 rounded-lg object-contain" />
                  <span className="text-lg font-extrabold tracking-tight">UzDe</span>
                  <span className="h-4 w-px bg-white/20" />
                  <span className="text-xs font-medium tracking-wide text-emerald-300">uzde.de</span>
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">{de ? "Immer griffbereit" : "Har doim yoningizda"}</p>
                <h1 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{de ? "UzDe auf deinem Smartphone. Wie eine App." : "UzDe telefoningizda. Xuddi ilovadek."}</h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">{de ? "Füge UzDe deinem Startbildschirm hinzu und öffne die Plattform mit nur einem Fingertipp – ganz ohne App Store." : "UzDe’ni bosh ekranga qo‘shing va bir tegish bilan oching. App Store yoki Play Market’dan yuklab olish shart emas."}</p>
                <a href="#anleitung" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-6 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">{de ? "Anleitung ansehen" : "O‘rnatish qo‘llanmasi"}<span aria-hidden="true" className="ml-2">↓</span></a>
                <p className="mt-4 text-xs text-slate-400">{de ? "Für iPhone und Android · Kostenlos" : "iPhone va Android uchun · Bepul"}</p>
              </div>
              <div className="flex justify-center lg:justify-end" aria-label={de ? "Illustration: UzDe auf einem Smartphone" : "UzDe telefon bosh ekranidagi ko‘rinishining illustratsiyasi"}>
                <div className="relative w-[225px] rotate-[-5deg] rounded-[2.7rem] border-[7px] border-slate-700 bg-slate-900 p-[5px] shadow-2xl shadow-black/40 sm:w-[250px]">
                  <div className="relative aspect-[9/18] overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-[#172c48] via-[#1b4052] to-[#0d655a] px-5 pt-12">
                    <div aria-hidden="true" className="absolute left-1/2 top-3 h-5 w-20 -translate-x-1/2 rounded-full bg-slate-950" />
                    <p className="text-center text-xs font-medium tracking-widest text-white/70">{de ? "Startbildschirm" : "Bosh ekran"}</p>
                    <div className="mt-16 flex justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex size-[84px] items-center justify-center rounded-[1.4rem] bg-white p-3 shadow-xl shadow-black/30">
                          <img src="/images/brand/uzde/uzde-icon-192.png" alt="UzDe" width={68} height={68} className="size-full object-contain" />
                        </div>
                        <span className="text-sm font-semibold text-white">UzDe</span>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute bottom-5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70" />
                  </div>
                </div>
              </div>
            </div>
          </section>


            <section id="anleitung" className="scroll-mt-28 pt-16 sm:pt-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">{de ? "In drei Schritten" : "Atigi uch qadam"}</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{de ? "So installierst du UzDe" : "UzDe’ni qanday o‘rnatasiz?"}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{de ? "Wähle die Anleitung für dein Smartphone." : "Telefoningizga mos qo‘llanmani tanlang."}</p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {steps.map((section, sectionIndex) => (
                <section key={section.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-6 dark:border-slate-800 dark:bg-slate-900 sm:px-8">
                    <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#0e172b] text-white">
                    {sectionIndex === 0 ? (
                      <svg viewBox="0 0 24 24" className="relative -translate-x-px size-8 fill-current" aria-hidden="true"><path d="M17.05 12.54c.02 2.12 1.87 2.83 1.89 2.84-.02.05-.3 1.03-.98 2.05-.58.88-1.18 1.75-2.13 1.77-.93.02-1.23-.57-2.3-.57-1.06 0-1.4.55-2.28.59-.92.03-1.62-.94-2.21-1.82-1.2-1.77-2.12-5-.88-7.17a3.43 3.43 0 0 1 2.88-1.77c.9-.02 1.76.62 2.31.62.55 0 1.58-.76 2.66-.65.45.02 1.7.18 2.5 1.36-.06.04-1.49.87-1.46 2.75ZM15.3 7.32a3.5 3.5 0 0 0 .81-2.55 3.53 3.53 0 0 0-2.35 1.21 3.35 3.35 0 0 0-.84 2.47 2.95 2.95 0 0 0 2.38-1.13Z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true"><path d="M6.3 8.2 4.9 5.8a.45.45 0 0 1 .78-.45L7.1 7.8a9.4 9.4 0 0 1 9.8 0l1.42-2.45a.45.45 0 0 1 .78.45l-1.4 2.4a8.5 8.5 0 0 1 3.5 6.8H2.8a8.5 8.5 0 0 1 3.5-6.8ZM8 12.2a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Zm8 0a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8ZM3 16h18v1.8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V16Z"/></svg>
                    )}
                  </span>
                    <div><h3 className="text-xl font-bold">{section.title}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{emphasizeInstructions(section.intro)}</p></div>
                  </div>
                  <ol className="space-y-0 px-6 py-4 sm:px-8">
                    {section.items.map((item, index) => (
                      <li key={item} className="flex gap-4 border-b border-slate-100 py-5 last:border-0 dark:border-slate-800">
                        <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-extrabold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{index + 1}</span>
                        <p className="pt-1 text-sm leading-7 text-slate-700 dark:text-slate-200">{emphasizeInstructions(item)}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
            <p className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{de ? "Hinweis: Die Menünamen können je nach iOS-/Android-Version abweichen. Bei Android kann Chrome statt „Installieren“ nur „Zum Startbildschirm hinzufügen“ anbieten. Eine Offline-Nutzung ist nicht garantiert." : "Eslatma: menyu nomlari iOS yoki Android versiyasiga qarab farq qilishi mumkin. Android’da «Install» o‘rniga «Add to Home screen» chiqishi mumkin. Internet bo‘lmaganda ishlashi kafolatlanmaydi."}</p>
          </section>

            <InstallVideo de={de} />
        </div>
      </main>
      <Footer />
    </>
  );
}
