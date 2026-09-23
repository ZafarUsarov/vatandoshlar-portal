import type { GuideArticle, SupportedGuideLocale } from "../../../types/guide";

type Props = Readonly<{ article: GuideArticle; locale: SupportedGuideLocale }>;

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function DrivingLicenceExchangeGuide({ article, locale }: Props) {
  const uz = locale === "uz";
  const documents = article.sections.documents?.items ?? [];
  const stages = article.steps.slice(0, 8);

  return (
    <div className="mt-8 space-y-8">
      <section id="guide-section-driving-timeline" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
          {uz ? "Jarayon xaritasi" : "Ablauf auf einen Blick"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {uz ? "Wohnsitzdan nemis Führerscheinigacha" : "Vom Wohnsitz zum deutschen Führerschein"}
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold">
          {(uz
            ? ["Wohnsitz", "6 oy", "Fahrerlaubnisbehörde", "Antrag", "Theorie", "Praxis", "Deutscher Führerschein"]
            : ["Wohnsitz", "6 Monate", "Fahrerlaubnisbehörde", "Antrag", "Theorie", "Praxis", "Deutscher Führerschein"]
          ).map((item, index, items) => (
            <div key={item} className="contents">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">{item}</span>
              {index < items.length - 1 ? <span className="text-emerald-600 dark:text-emerald-400"><ArrowIcon /></span> : null}
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>{uz ? "6 oy:" : "6 Monate:"}</strong>{" "}
          {uz
            ? "bu Umschreibungni yakunlash uchun kafolatlangan muddat emas. O‘zbekiston guvohnomasi bilan Germaniyada haydash huquqi odatiy Wohnsitz tashkil qilingandan keyin odatda olti oy davom etadi. Arizani erta boshlang."
            : "Das ist keine garantierte Bearbeitungsfrist für die Umschreibung. Mit einer usbekischen Fahrerlaubnis besteht die Fahrberechtigung nach Begründung des ordentlichen Wohnsitzes in Deutschland grundsätzlich noch sechs Monate. Beginnen Sie das Verfahren frühzeitig."}
        </div>
      </section>

      {documents.length > 0 ? (
        <section id="guide-section-driving-checklist" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Checklist</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {uz ? "Hujjatlarni tayyorlash" : "Unterlagen vorbereiten"}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {documents.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"><CheckIcon /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section id="guide-section-driving-code-70" className="scroll-mt-32 overflow-hidden rounded-3xl border border-amber-300 bg-amber-50 shadow-sm dark:border-amber-800 dark:bg-amber-950/30">
        <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
          <div className="flex min-h-44 flex-col justify-center bg-amber-100 p-6 dark:bg-amber-900/30">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-amber-800 dark:text-amber-200">Feld 12</span>
            <span className="mt-3 font-mono text-3xl font-black tracking-tight text-slate-950 dark:text-white">70.…UZ</span>
            <span className="mt-2 text-sm text-slate-600 dark:text-slate-300">Schlüsselzahl 70</span>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {uz ? "70 kodi nimani anglatadi?" : "Was bedeutet die Schlüsselzahl 70?"}
            </h2>
            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-200">
              {uz
                ? "70 — guvohnoma boshqa guvohnomani almashtirish asosida berilganini ko‘rsatuvchi EU ma’muriy kodi. Masalan, 70.…UZ yozuvi asl guvohnoma O‘zbekistonda berilganini ko‘rsatishi mumkin."
                : "70 ist ein harmonisierter EU-Verwaltungscode und kennzeichnet, dass der Führerschein durch Umtausch eines anderen Führerscheins erteilt wurde. Ein Eintrag wie 70.…UZ kann auf einen ursprünglich in Usbekistan ausgestellten Führerschein hinweisen."}
            </p>
            <p className="mt-3 font-semibold leading-7 text-amber-950 dark:text-amber-100">
              {uz
                ? "Muhim: 70 kodining o‘zi Germaniyada avtomatik ravishda «tan olinadi» yoki «tan olinmaydi» degan xulosa bermaydi. 2026-yildagi amaldagi FeV §28 bo‘yicha EU/EWR guvohnomasining holati barcha tegishli istisnolar bilan birga tekshiriladi. Shubha bo‘lsa Fahrerlaubnisbehörde yozma aniqlik bersin."
                : "Wichtig: Aus der Schlüsselzahl 70 allein folgt nicht automatisch, dass der Führerschein in Deutschland anerkannt oder nicht anerkannt wird. Nach der 2026 geltenden Fassung des § 28 FeV ist die EU-/EWR-Fahrerlaubnis unter Berücksichtigung der dort geregelten Ausnahmen zu prüfen. Lassen Sie Zweifelsfälle von der Fahrerlaubnisbehörde klären."}
            </p>
          </div>
        </div>
      </section>

      <section id="guide-section-driving-exams" className="scroll-mt-32 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
          {uz ? "Imtihon yo‘li" : "Prüfungsweg"}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {uz ? "Theorie va Praxis" : "Theorie und Praxis"}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {stages.slice(5, 7).map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white dark:bg-emerald-400 dark:text-slate-950">{index + 1}</span>
              <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="guide-section-driving-finish" className="scroll-mt-32 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8 dark:border-emerald-900/70 dark:bg-emerald-950/30">
        <div className="flex gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-400 dark:text-slate-950"><CheckIcon /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{uz ? "Yakun" : "Abschluss"}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{uz ? "Nemis Führerscheinini olish" : "Deutschen Führerschein erhalten"}</h2>
            <p className="mt-3 leading-7 text-slate-700 dark:text-slate-200">
              {uz
                ? "Talablar bajarilib, zarur imtihonlar muvaffaqiyatli topshirilgach, nemis guvohnomasi odatda xorijiy original guvohnomani topshirish evaziga beriladi."
                : "Nach Erfüllung der Voraussetzungen und Bestehen der erforderlichen Prüfungen wird der deutsche Führerschein grundsätzlich nur gegen Abgabe des ausländischen Originalführerscheins ausgehändigt."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
