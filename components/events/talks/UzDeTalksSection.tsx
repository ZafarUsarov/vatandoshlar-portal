import TalksOrbitalGraphic from "./TalksOrbitalGraphic";
import type { SupportedEventLocale } from "../../../types/event";

export default function UzDeTalksSection({ locale, headingClassName }: { locale: SupportedEventLocale; headingClassName: string }) {
  const uz = locale === "uz";
  return (
    <section aria-labelledby="uzde-talks-title" style={{ backgroundColor: "#102b2a", color: "#f1f0e9", borderRadius: 24 }} className="relative isolate overflow-hidden rounded-3xl bg-[#102b2a] px-5 py-5 text-[#f1f0e9] sm:px-8 sm:py-7 lg:px-14 lg:py-8 dark:border dark:border-[#bcd4c6]/20">
      <div className="grid items-center gap-3 sm:gap-5 md:grid-cols-[minmax(0,1fr)_200px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
        <div className="min-w-0">
          <p style={{ color: "#bcd4c6" }} className="text-[11px] font-medium tracking-[0.025em] leading-4 sm:text-xs sm:font-semibold sm:uppercase sm:tracking-[0.16em] sm:leading-normal">{uz ? "Mustaqil intellektual taşabbus" : "Eine unabhängige Wissensinitiative"}</p>
          <h2 id="uzde-talks-title" className={`${headingClassName} mt-2 text-[40px] sm:mt-3 sm:text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tight`}>UzDe. Talks</h2>
          <p className={`${headingClassName} mt-2 max-w-xl text-[21px] sm:mt-3 sm:text-[clamp(1.4rem,2.3vw,1.75rem)] font-medium sm:font-semibold max-sm:![font-family:inherit] leading-tight [text-wrap:balance]`}>{uz ? "Bilim çegaralarni bilmaydi." : "Wissen kennt keine Grenzen."}</p>
          <p style={{ color: "#d4e2d9" }} className="mt-2 max-w-xl text-sm leading-[1.6] sm:mt-3 sm:text-[15px] sm:leading-6 lg:text-base">{uz ? "Ilmiy tafakkur, tajriba va ǵoyalar almashinuvi." : "Wissenschaftliches Denken, Erfahrungs- und Ideenaustausch."}</p>
        </div>
        <div className="mx-auto w-full max-w-[160px] md:max-w-[200px] lg:max-w-[240px]" style={{ width: "100%", minWidth: 0, maxWidth: "clamp(160px, 19vw, 240px)" }}>
          <TalksOrbitalGraphic />
        </div>
      </div>
      <div style={{ borderColor: "rgba(188,212,198,.3)" }} className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <p style={{ color: "#bcd4c6" }} className="text-[13px] font-medium tracking-normal sm:text-xs sm:font-semibold sm:uppercase sm:tracking-[0.14em]">{uz ? "Ilm. Tafakkur. Taraqqiyot." : "Wissenschaft. Denken. Fortschritt."}</p>
        <p style={{ color: "#d4e2d9" }} className="text-xs opacity-80 sm:text-sm sm:opacity-100">{uz ? "Taşabbus şakllantirilmoqda." : "Die Initiative befindet sich im Aufbau."}</p>
      </div>
    </section>
  );
}
