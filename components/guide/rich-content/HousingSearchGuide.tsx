"use client";

import Image from "next/image";
import { useState } from "react";

import type {
  GuideArticle,
  SupportedGuideLocale,
} from "../../../types/guide";

type Props = Readonly<{
  article: GuideArticle;
  locale: SupportedGuideLocale;
}>;

const images = {
  abroad: "/images/guide/housing/search-from-abroad.webp",
  types: "/images/guide/housing/housing-types.webp",
  viewing: "/images/guide/housing/apartment-viewing.webp",
  contract: "/images/guide/housing/rental-contract-keys.webp",
  scam: "/images/guide/housing/housing-scam-warning.webp",
} as const;

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const interactive =
  "transition duration-200 motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-within:border-emerald-400 dark:hover:border-emerald-700";

export default function HousingSearchGuide({ article, locale }: Props) {
  const uz = locale === "uz";
  const [copied, setCopied] = useState(false);

  const message = uz
    ? `Guten Tag,\n\nmein Name ist [Name]. Ich bin [berufstätig / Student/in / in Ausbildung] und suche ab [Datum] eine Wohnung für [Anzahl] Person(en). Mein Einkommen / meine Finanzierung kann ich bei Bedarf nachweisen.\n\nIch interessiere mich sehr für Ihre Wohnung und bin für einen Besichtigungstermin flexibel. Über eine Rückmeldung würde ich mich freuen.\n\nMit freundlichen Grüßen\n[Name]`
    : `Guten Tag,\n\nmein Name ist [Name]. Ich bin [berufstätig / Student/in / in Ausbildung] und suche ab [Datum] eine Wohnung für [Anzahl] Person(en). Mein Einkommen / meine Finanzierung kann ich bei Bedarf nachweisen.\n\nIch interessiere mich sehr für Ihre Wohnung und bin für einen Besichtigungstermin flexibel. Über eine Rückmeldung würde ich mich freuen.\n\nMit freundlichen Grüßen\n[Name]`;

  const housingTypes = uz
    ? [
        ["Wohnung", "Mustaqil yashash", "Ko‘pincha uzoq", "Mebelli yoki mebelsiz", "Ko‘proq maxfiylik · odatda qimmatroq"],
        ["WG / WG-Zimmer", "Yangi kelganlar, talabalar", "Qisqa yoki uzoq", "Turlicha", "Arzonroq · umumiy joylar bo‘lishiladi"],
        ["Zwischenmiete", "Vaqtinchalik yechim", "Qisqa/o‘rta", "Ko‘pincha mebelli", "Tez kirish · muddati cheklangan"],
        ["Möbliertes Apartment", "Ish, o‘qish, relocation", "Qisqa/o‘rta/uzoq", "Ha", "Tayyor holat · narxi yuqoriroq bo‘lishi mumkin"],
        ["Monteurzimmer", "Ishchi, pendler, sayohatchi", "Qisqa/o‘rta", "Odatda ha", "Amaliy · klassik Wohnung komforti bo‘lmasligi mumkin"],
        ["Studentenwohnheim", "Talabalar", "O‘rta/uzoq", "Ko‘pincha", "Nisbatan arzon · kutish ro‘yxati bo‘lishi mumkin"],
        ["Gastfamilie", "Au-pair va ayrim dasturlar", "Dasturga bog‘liq", "Ha", "Integratsiya · mustaqillik kamroq"],
        ["Hostel / Hotel / Ferienwohnung", "Dastlabki kun/haftalar", "Qisqa", "Ha", "Tez yechim · uzoq muddatga qimmat"],
      ]
    : [
        ["Wohnung", "Eigenständiges Wohnen", "Meist langfristig", "Möbliert oder unmöbliert", "Mehr Privatsphäre · meist teurer"],
        ["WG / WG-Zimmer", "Neuankommende, Studierende", "Kurz oder lang", "Unterschiedlich", "Günstiger · Gemeinschaftsflächen"],
        ["Zwischenmiete", "Übergangslösung", "Kurz/mittel", "Oft möbliert", "Schneller Einzug · zeitlich begrenzt"],
        ["Möbliertes Apartment", "Arbeit, Studium, Relocation", "Kurz/mittel/lang", "Ja", "Bezugsfertig · oft teurer"],
        ["Monteurzimmer", "Pendler, Beschäftigte, Reisende", "Kurz/mittel", "Meist ja", "Praktisch · nicht immer klassischer Wohnkomfort"],
        ["Studentenwohnheim", "Studierende", "Mittel/lang", "Häufig", "Preiswert · Wartezeiten möglich"],
        ["Gastfamilie", "Au-pair und einzelne Programme", "Programmabhängig", "Ja", "Integration · weniger Unabhängigkeit"],
        ["Hostel / Hotel / Ferienwohnung", "Erste Tage/Wochen", "Kurz", "Ja", "Schnell verfügbar · langfristig teuer"],
      ];

  const abroad = uz
    ? [
        "Wohnung, WG/Zimmer va vaqtinchalik turar joyni parallel qidiring.",
        "Online Besichtigung so‘rang; manzil va Vermieter/Anbieter ma’lumotlarini tekshiring.",
        "Ish beruvchi, universitet yoki mahalliy Studierendenwerkdan Unterkunft imkoniyatini so‘rang.",
        "Ausbildung, FSJ/BFD yoki Au-pair bo‘lsa, tashkilot/Gastfamilie turar joy beradimi — oldindan aniqlang.",
        "Doimiy uy topilmasa, avval vaqtinchalik joy bilan kelish mumkin.",
        "Anmeldung uchun Wohnungsgeberbestätigung berilishini bron qilishdan oldin aniqlang.",
        "Ko‘rmagan uy uchun oldindan pul yubormang; fake payment linklardan saqlaning.",
      ]
    : [
        "Suchen Sie parallel nach Wohnung, WG/Zimmer und einer Übergangsunterkunft.",
        "Bitten Sie um eine Online-Besichtigung und prüfen Sie Adresse sowie Anbieter.",
        "Fragen Sie Arbeitgeber, Hochschule oder örtliches Studierendenwerk nach Unterkunftsmöglichkeiten.",
        "Bei Ausbildung, FSJ/BFD oder Au-pair vorab klären, ob Träger oder Gastfamilie Wohnraum stellt.",
        "Falls noch keine Dauerwohnung gefunden ist, kann eine Übergangsunterkunft den Start erleichtern.",
        "Vor der Buchung klären, ob für eine Anmeldung eine Wohnungsgeberbestätigung ausgestellt werden kann.",
        "Kein Geld für eine ungesehene Wohnung vorab überweisen; keine fremden Zahlungslinks nutzen.",
      ];

  const steps = article.steps.slice(0, 10);
  const documents = article.sections.documents?.items ?? [];
  const scams = article.sections.warnings?.items ?? [];

  async function copyMessage() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-8 space-y-8">
      <section id="guide-section-housing-situation" className="scroll-mt-28 border-l-2 border-emerald-500 pl-5 sm:pl-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
          {uz ? "Qaysi vaziyatdasiz?" : "Wo befinden Sie sich gerade?"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {uz
            ? "Vaziyatingizni tanlang — sizga mos bosqichga o‘tasiz."
            : "Wählen Sie Ihre Situation – Sie springen direkt zum passenden Abschnitt."}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <a
            href="#guide-section-housing-abroad"
            className="group cursor-pointer rounded-2xl border border-emerald-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:border-emerald-900/70 dark:bg-slate-900 dark:hover:border-emerald-600 dark:focus-visible:ring-offset-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-2xl" aria-hidden="true">🌍</span>
              <span className="text-emerald-700 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none dark:text-emerald-300" aria-hidden="true">→</span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-950 dark:text-white">
              {uz ? "Men hali Germaniyada emasman" : "Ich bin noch nicht in Deutschland"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {uz ? "Chet eldan turib qidirish bo‘limiga o‘ting." : "Direkt zur Wohnungssuche aus dem Ausland."}
            </p>
          </a>
          <a
            href="#guide-section-housing-process"
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-600 dark:focus-visible:ring-offset-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-2xl" aria-hidden="true">🇩🇪</span>
              <span className="text-emerald-700 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none dark:text-emerald-300" aria-hidden="true">→</span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-950 dark:text-white">
              {uz ? "Men Germaniyadaman" : "Ich bin in Deutschland"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {uz ? "Qidiruvdan Anmeldunggacha bo‘lgan bosqichlarga o‘ting." : "Direkt zum Ablauf von der Suche bis zur Anmeldung."}
            </p>
          </a>
        </div>
      </section>

      <section id="guide-section-housing-abroad" className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {uz ? "Chet eldan turib" : "Aus dem Ausland"}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {uz ? "Kelishdan oldin nima qilish kerak?" : "Was vor der Einreise sinnvoll ist"}
            </h2>
            <ul className="mt-5 space-y-3">
              {abroad.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"><CheckIcon /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <Image src={images.abroad} alt={uz ? "Chet eldan turib Germaniyada uy qidirish" : "Wohnungssuche in Deutschland aus dem Ausland"} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {steps.length > 0 ? (
        <section id="guide-section-housing-process" className="scroll-mt-28 border-l-2 border-teal-500 pl-5 sm:pl-7">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
            {uz ? "Germaniyada turib" : "Vor Ort in Deutschland"}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {uz ? "Qidiruvdan Anmeldunggacha" : "Von der Suche bis zur Anmeldung"}
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {steps.map((step, index) => (
              <div key={step.title} className="contents">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  {step.title}
                </span>
                {index < steps.length - 1 ? <span className="text-teal-600 dark:text-teal-400"><ArrowIcon /></span> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section id="guide-section-housing-types" className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="relative aspect-[16/7] min-h-56">
          <Image src={images.types} alt={uz ? "Germaniyadagi turli turar joy variantlari" : "Verschiedene Wohnformen in Deutschland"} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
            {uz ? "Tez taqqoslash" : "Schnellvergleich"}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {uz ? "Qanday turar joy izlash mumkin?" : "Welche Wohnform passt?"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {uz ? "Anmeldung imkoniyatini turar joy nomiga qarab taxmin qilmang: konkret Vermieter/Anbieter Wohnungsgeberbestätigung bera olishini oldindan tekshiring." : "Leiten Sie die Anmeldemöglichkeit nicht allein aus der Wohnform ab: Klären Sie vorab, ob der konkrete Vermieter/Anbieter eine Wohnungsgeberbestätigung ausstellen kann."}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {housingTypes.map(([name, who, duration, furnished, tradeoff]) => (
              <article key={name} className={`rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950 ${interactive}`}>
                <h3 className="font-bold text-slate-950 dark:text-white">{name}</h3>
                <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  <dt className="font-semibold">{uz ? "Mos:" : "Geeignet:"}</dt><dd>{who}</dd>
                  <dt className="font-semibold">{uz ? "Muddat:" : "Dauer:"}</dt><dd>{duration}</dd>
                  <dt className="font-semibold">{uz ? "Mebel:" : "Möbliert:"}</dt><dd>{furnished}</dd>
                </dl>
                <p className="mt-3 border-t border-slate-100 pt-3 text-xs font-medium text-slate-700 dark:border-slate-800 dark:text-slate-200">{tradeoff}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guide-section-housing-channels" className="scroll-mt-28 border-l-2 border-emerald-500 pl-5 sm:pl-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
          {uz ? "Qidiruv kanallari" : "Suchkanäle"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {uz ? "Qayerdan qidirish mumkin?" : "Wo kann man suchen?"}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(uz
            ? [
                ["Wohnung", "ImmobilienScout24 · Immowelt · Kleinanzeigen"],
                ["WG / Zwischenmiete", "WG-Gesucht · Kleinanzeigen"],
                ["Monteurzimmer", "Monteurzimmer.de · lokale Anbieter"],
                ["Studentenwohnheim", "Mahalliy Studierendenwerk"],
                ["Gastfamilie", "Au-pair agentligi / dastur tashkilotchisi"],
                ["Mahalliy uy-joy", "Wohnungsunternehmen · Genossenschaften · shahar portallari"],
              ]
            : [
                ["Wohnung", "ImmobilienScout24 · Immowelt · Kleinanzeigen"],
                ["WG / Zwischenmiete", "WG-Gesucht · Kleinanzeigen"],
                ["Monteurzimmer", "Monteurzimmer.de · lokale Anbieter"],
                ["Studentenwohnheim", "Örtliches Studierendenwerk"],
                ["Gastfamilie", "Au-pair-Agentur / Programmträger"],
                ["Lokaler Wohnraum", "Wohnungsunternehmen · Genossenschaften · Stadtportale"],
              ]).map(([title, value]) => (
                <div key={title} className={`rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 ${interactive}`}>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{value}</p>
                </div>
              ))}
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {uz ? "Commercial platformalar — qidiruv vositasi, rasmiy huquqiy manba emas." : "Kommerzielle Plattformen sind Suchwerkzeuge, keine amtlichen Rechtsquellen."}
        </p>
      </section>

      <section id="guide-section-housing-contact" className="scroll-mt-28 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-72 overflow-hidden rounded-3xl">
          <Image src={images.viewing} alt={uz ? "Germaniyada kvartirani ko‘rish jarayoni" : "Wohnungsbesichtigung in Deutschland"} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{uz ? "Birinchi kontakt" : "Erster Kontakt"}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{uz ? "Vermieterga qisqa va aniq yozing" : "Kurz und klar an den Vermieter schreiben"}</h2>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-700 dark:bg-slate-950 dark:text-slate-200">{message}</pre>
            <button type="button" onClick={copyMessage} className="mt-3 rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-950">
              {copied ? (uz ? "Nusxalandi" : "Kopiert") : (uz ? "Matnni nusxalash" : "Text kopieren")}
            </button>
          </div>
          {documents.length > 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">{uz ? "Bewerbungsmappe" : "Bewerbungsmappe"}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {documents.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-400"><CheckIcon /></span><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <section id="guide-section-housing-contract" className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">{uz ? "Mietvertrag va xarajatlar" : "Mietvertrag und Kosten"}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Kaltmiete + Nebenkosten = Warmmiete</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(uz
                ? [
                    ["Kaltmiete", "Kvartiraning asosiy ijarasi; Betriebskosten kirmaydi."],
                    ["Nebenkosten", "Shartnomada ko‘rsatilgan Betriebskosten/Vorauszahlung."],
                    ["Warmmiete", "Odatda Kaltmiete + Nebenkosten; elektr va internet avtomatik kirmaydi."],
                    ["Kaution", "Uy-joy ijarasida maksimal 3 oylik Kaltmiete; pul kautioni 3 teng oylik bo‘lib to‘lanishi mumkin."],
                    ["Strom / Internet", "Ko‘pincha alohida shartnoma; Mietvertragni tekshiring."],
                    ["Heizung", "Nebenkosten tarkibida bo‘lishi mumkin; aniq tarkib shartnomada."],
                  ]
                : [
                    ["Kaltmiete", "Grundmiete der Wohnung ohne ausgewiesene Betriebskosten."],
                    ["Nebenkosten", "Im Vertrag ausgewiesene Betriebskosten/Vorauszahlungen."],
                    ["Warmmiete", "Typischerweise Kaltmiete + Nebenkosten; Strom und Internet sind nicht automatisch enthalten."],
                    ["Kaution", "Bei Wohnraum höchstens 3 Monats-Kaltmieten; eine Geldkaution darf in 3 gleichen Monatsraten gezahlt werden."],
                    ["Strom / Internet", "Häufig separate Verträge; Mietvertrag prüfen."],
                    ["Heizung", "Kann Teil der Nebenkosten sein; maßgeblich ist der Vertrag."],
                  ]).map(([term, text]) => (
                    <div key={term} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{term}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{text}</p>
                    </div>
                  ))}
            </div>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <Image src={images.contract} alt={uz ? "Mietvertrag va kvartira kalitlari" : "Mietvertrag und Wohnungsschlüssel"} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="guide-section-housing-scam" className="scroll-mt-28 overflow-hidden rounded-3xl border border-amber-200 bg-amber-50/70 dark:border-amber-900/70 dark:bg-amber-950/20">
        <div className="grid lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative min-h-64">
            <Image src={images.scam} alt={uz ? "Uy-joy qidirishda onlayn firibgarlikdan himoyalanish" : "Schutz vor Betrug bei der Wohnungssuche"} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800 dark:text-amber-300">{uz ? "Scam warning" : "Betrugswarnung"}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{uz ? "Pul va hujjatni shoshilib yubormang" : "Geld und Dokumente nicht vorschnell senden"}</h2>
            <ul className="mt-5 space-y-2">
              {scams.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-amber-950 dark:text-amber-100">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="guide-section-housing-registration" className="scroll-mt-28 border-l-2 border-emerald-500 pl-5 sm:pl-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{uz ? "Ko‘chib kirgandan keyin" : "Nach dem Einzug"}</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{uz ? "Kalit → Wohnungsgeberbestätigung → Anmeldung" : "Schlüssel → Wohnungsgeberbestätigung → Anmeldung"}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 dark:text-slate-200">
          {uz
            ? "Wohnungga haqiqatan ko‘chib kirgach, odatda ikki hafta ichida Meldebehördeda Anmeldung qilinadi. Wohnungsgeber ko‘chib kirishni tasdiqlashi kerak. Agar tasdiq vaqtida berilmasa, Meldebehördega darhol xabar berish kerak."
            : "Nach dem tatsächlichen Einzug ist die Wohnung grundsätzlich innerhalb von zwei Wochen bei der Meldebehörde anzumelden. Der Wohnungsgeber muss den Einzug bestätigen. Wird die Bestätigung nicht rechtzeitig erteilt, ist die Meldebehörde unverzüglich zu informieren."}
        </p>
      </section>
    </div>
  );
}
