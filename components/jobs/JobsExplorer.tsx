"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Check, ChevronDown, MapPin, Megaphone, Search, SlidersHorizontal, FileCheck2, UsersRound } from "lucide-react";
import { Link } from "../../i18n/navigation";
import type { Vacancy, VacancyEmployment, VacancyWorkMode } from "../../data/jobs-board";

type Props = Readonly<{ locale: "uz" | "de"; jobs: readonly Vacancy[]; contactEmail: string }>;

const workModeLabels: Record<VacancyWorkMode, string> = { remote: "Remote", hybrid: "Hybrid", onsite: "Vor Ort" };
const employmentTypes: VacancyEmployment[] = ["Vollzeit", "Teilzeit", "Minijob", "Ausbildung", "Werkstudent", "Praktikum", "Sonstige"];


type FilterOption = Readonly<{ value: string; label: string }>;
type FilterDropdownProps = Readonly<{
  id: "city" | "employment" | "workMode";
  label: string;
  value: string;
  options: readonly FilterOption[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
}>;

function FilterDropdown({ id, label, value, options, open, onToggle, onClose, onChange }: FilterDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) onClose();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  function focusOption(index: number) {
    const count = options.length;
    if (count) optionsRef.current[(index + count) % count]?.focus();
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={`jobs-filter-${id}`}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) onToggle();
            requestAnimationFrame(() => focusOption(event.key === "ArrowDown" ? Math.max(0, options.findIndex((option) => option.value === value)) : options.length - 1));
          }
        }}
        className="flex h-10 w-full min-w-0 items-center justify-between gap-3 rounded-md bg-white px-3 text-left text-sm font-medium text-slate-900 outline-none transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15 dark:focus-visible:outline-teal-400 sm:w-auto"
      >
        <span className="truncate">{value ? selected?.label ?? label : label}</span>
        <ChevronDown aria-hidden="true" className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={`jobs-filter-${id}`} aria-label={label} className="absolute left-0 top-full z-30 mt-2 max-h-72 w-max min-w-full max-w-[min(20rem,calc(100vw-2.5rem))] overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-white/15 dark:bg-[var(--uzde-page-bg)]">
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(node) => { optionsRef.current[index] = node; }}
              type="button"
              aria-pressed={option.value === value}
              onClick={() => { onChange(option.value); onClose(); triggerRef.current?.focus(); }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  focusOption(index + (event.key === "ArrowDown" ? 1 : -1));
                } else if (event.key === "Home" || event.key === "End") {
                  event.preventDefault();
                  focusOption(event.key === "Home" ? 0 : options.length - 1);
                }
              }}
              className="flex min-h-10 w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-slate-800 outline-none hover:bg-slate-100 focus-visible:bg-teal-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-teal-600 dark:text-slate-100 dark:hover:bg-white/10 dark:focus-visible:bg-white/15"
            >
              <span aria-hidden="true" className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${option.value === value ? "border-teal-600 bg-teal-600 text-white" : "border-slate-300 dark:border-slate-500"}`}>
                {option.value === value && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span className="break-words">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobsExplorer({ locale, jobs, contactEmail }: Props) {
  const uz = locale === "uz";
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [employment, setEmployment] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [openFilter, setOpenFilter] = useState<"city" | "employment" | "workMode" | null>(null);
  const closeFilter = () => setOpenFilter(null);
  const toggleFilter = (id: "city" | "employment" | "workMode") => setOpenFilter((current) => current === id ? null : id);
  const activeFilterCount = [query.trim(), city, employment, workMode].filter(Boolean).length;
  const cities = useMemo(() => [...new Set(jobs.map((job) => job.city))].sort((a, b) => a.localeCompare(b)), [jobs]);
  const filtered = useMemo(() => jobs.filter((job) => {
    if (job.status !== "open") return false;
    const needle = query.trim().toLocaleLowerCase();
    return (!needle || [job.title, job.company, job.city, job.summary].some((value) => value.toLocaleLowerCase().includes(needle)))
      && (!city || job.city === city)
      && (!employment || job.employment === employment)
      && (!workMode || job.workMode === workMode);
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), [jobs, query, city, employment, workMode]);
  const mailto = (subject: string, body: string) => `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const employerSubject = "UzDe — Vakansiya joylashtirish bo‘yicha murojaat";
  const recruitingSubject = "UzDe — Nomzod topish bo‘yicha murojaat";
  return (
    <>
      <style>{`
        @keyframes uzde-hiring-float {
          0%, 100% { transform: translateY(0) rotate(-7deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
        }
        .uzde-hiring-badge { animation: uzde-hiring-float 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .uzde-hiring-badge { animation: none; } }
      `}</style>
      <section className="mx-auto w-full max-w-[var(--uzde-layout-width)] bg-transparent px-5 pb-14 pt-20 dark:text-slate-100 sm:px-8 sm:pt-24 lg:px-14 lg:pb-20 lg:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-300">UZDE / {uz ? "ISH VA KARYERA" : "JOBS & KARRIERE"}</p>
          <div className="mx-auto mt-8 max-w-[1150px] text-center">
            <div className="relative inline-block max-w-full">
              <h1 className={uz ? "text-slate-950 dark:text-slate-100 text-[clamp(34px,9vw,44px)] font-bold uppercase leading-[1.05] tracking-[-0.025em] [text-wrap:balance] sm:text-[clamp(48px,5.1vw,78px)]" : "text-slate-950 dark:text-slate-100 text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[1.08] tracking-[-0.025em] [text-wrap:balance]"}>
                {uz ? <>Germaniyada öz<br className="hidden sm:block" /> örningizni toping.</> : <>Finden Sie Ihren Platz<br className="hidden sm:block" /> in Deutschland.</>}
              </h1>
              <span aria-hidden="true" className="uzde-hiring-badge pointer-events-none mx-auto mt-5 inline-flex rotate-[-7deg] items-center rounded-md border border-teal-500/40 bg-teal-300 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-sm lg:absolute lg:right-0 lg:top-full lg:mt-1">HIRING <Megaphone aria-hidden="true" className="ml-1.5 size-3.5" /></span>
            </div>
          </div>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-text-secondary dark:text-slate-300 sm:text-lg sm:leading-8 lg:mt-12">{uz ? "Tasdiqlangan vakansiyalarni bir joyda qidiring. Ish turi, şahar va işlaş şakli böyiça saralang." : "Entdecken Sie geprüfte Stellenangebote. Filtern Sie nach Ort, Beschäftigungsart und Arbeitsmodell."}</p>
        </div>
        <div className="mt-12 w-full sm:mt-16">
          <label htmlFor="job-search" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-slate-300">{uz ? "Kasb yoki kalit söz" : "Beruf oder Stichwort"}</label>
          <div className="relative">
            <Search aria-hidden="true" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
            <input id="job-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={uz ? "Lavozim, kompaniya, kasb..." : "Stelle, Unternehmen, Beruf..."} className="h-11 w-full rounded-md border border-transparent bg-[#F0F0F0] pl-11 pr-4 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-500 focus:outline-none focus:ring-0 focus-visible:border-teal-600/60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400 dark:focus-visible:border-teal-400/60 dark:focus-visible:outline-teal-400" />
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-lg bg-[#ededed] p-2.5 dark:bg-white/10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            <div className="grid min-w-0 grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
              <FilterDropdown id="city" label={uz ? "Şahar" : "Stadt"} value={city} options={[{ value: "", label: uz ? "Barça şaharlar" : "Alle Städte" }, ...cities.map((value) => ({ value, label: value }))]} open={openFilter === "city"} onToggle={() => toggleFilter("city")} onClose={closeFilter} onChange={setCity} />
              <FilterDropdown id="employment" label={uz ? "Iş turi" : "Beschäftigungsart"} value={employment} options={[{ value: "", label: uz ? "Barça iş turlari" : "Alle Jobarten" }, ...employmentTypes.map((value) => ({ value, label: value }))]} open={openFilter === "employment"} onToggle={() => toggleFilter("employment")} onClose={closeFilter} onChange={setEmployment} />
              <FilterDropdown id="workMode" label={uz ? "Işlaş şakli" : "Arbeitsmodell"} value={workMode} options={[{ value: "", label: uz ? "Barça işlaş şakllari" : "Alle Arbeitsmodelle" }, ...Object.entries(workModeLabels).map(([value, label]) => ({ value, label }))]} open={openFilter === "workMode"} onToggle={() => toggleFilter("workMode")} onClose={closeFilter} onChange={setWorkMode} />
            </div>
            <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-end">
              <span aria-label={uz ? "Faol filtrlar soni" : "Aktive Filter"} className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-white text-xs font-semibold text-teal-700 dark:bg-white/10 dark:text-teal-300">{activeFilterCount}</span>
              <button type="button" onClick={() => { setQuery(""); setCity(""); setEmployment(""); setWorkMode(""); closeFilter(); }} className="min-h-10 rounded-md bg-white px-3 text-sm font-medium text-slate-900 outline-none transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/15 dark:focus-visible:outline-teal-400">{uz ? "Filtrlarni tozalaş" : "Filter zurücksetzen"}</button>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200/80 bg-transparent text-slate-950 dark:border-white/10 dark:text-slate-100"><div className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-5 py-14 sm:px-8 lg:px-14 lg:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300"><SlidersHorizontal className="size-4" aria-hidden="true" />{uz ? "VAKANSIYALAR" : "STELLENANGEBOTE"}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{uz ? "Oçiq vakansiyalar" : "Offene Stellen"}</h2></div><p className="text-sm text-text-secondary dark:text-slate-300" aria-live="polite">{filtered.length} {uz ? "ta natija · Eng yangi" : "Ergebnisse · Neueste zuerst"}</p></div>
        {filtered.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((job) => <article key={job.id} className="flex min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-teal-500/60 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-semibold">{job.company}</span><span className="rounded-full border border-teal-200 px-3 py-1 text-xs text-teal-800 dark:border-teal-800 dark:text-teal-200">{job.kind === "external" ? (uz ? "Taşqi e’lon" : "Extern") : job.kind === "partner" ? (uz ? "Hamkor" : "Partner") : (uz ? "UzDe boshqaruvida" : "UzDe betreut")}</span></div><h3 className="mt-7 break-words text-2xl font-semibold tracking-tight">{job.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary dark:text-slate-300">{job.summary}</p><div className="mt-7 flex flex-wrap gap-2 text-xs text-text-secondary dark:text-slate-300"><span className="flex items-center gap-1"><MapPin className="size-3" aria-hidden="true" />{job.city}</span><span>{job.employment}</span><span>{workModeLabels[job.workMode]}</span>{job.salary && <span>{job.salary}</span>}</div><div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-5 text-sm dark:border-white/10"><time dateTime={job.publishedAt}>{new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "uz-UZ", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(job.publishedAt))}</time>{job.applicationMethod === "external" && job.applicationUrl ? <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-300">{uz ? "E’lonni köriş" : "Stelle ansehen"}<ArrowUpRight className="size-4" /></a> : <span className="text-text-secondary dark:text-slate-300">{uz ? "Batafsil tez kunda" : "Details folgen"}</span>}</div></article>)}</div> : <div className="rounded-lg border border-dashed border-slate-300 px-6 py-14 text-center dark:border-white/20 dark:text-slate-100"><BriefcaseBusiness aria-hidden="true" className="mx-auto size-9 text-teal-700 dark:text-teal-300" /><h3 className="mt-5 text-2xl font-semibold">{jobs.length === 0 ? (uz ? "Hozirça tasdiqlangan vakansiyalar yöq" : "Derzeit keine geprüften Stellenangebote") : (uz ? "Filtrlarga mos vakansiya topilmadi" : "Keine passenden Stellen gefunden")}</h3><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary dark:text-slate-300">{uz ? "Yangi e’lonlar tasdiqlangandan keyin şu yerda körinadi. Hozir iş qidiriş böyiça qöllanmalarimizdan foydalanişingiz mumkin." : "Neue Stellen erscheinen hier nach Prüfung. Bis dahin finden Sie hilfreiche Informationen in unserem Ratgeber."}</p><Link href="/guide" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 underline underline-offset-4 dark:text-teal-300">{uz ? "Qöllanmaga ötiş" : "Zum Ratgeber"}<ArrowUpRight className="size-4" /></Link></div>}
      </div></section>
      {uz ? (
        <>
      <section className="border-t border-slate-200 bg-transparent text-slate-950 dark:border-white/10 dark:text-slate-100">
        <div className="mx-auto w-full max-w-[var(--uzde-layout-width)] grid gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-14 lg:px-14 lg:py-14">
          <div className="min-w-0">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              <FileCheck2 aria-hidden="true" strokeWidth={1.65} className="size-[18px] shrink-0" />UZDE / NOMZODLAR
            </p>
            <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,3vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.035em]">Ariza topşirişda yordam kerakmi?</h2>
          </div>
          <div className="min-w-0 lg:justify-self-end lg:w-full lg:max-w-xl">
            <p className="max-w-xl text-base leading-7 text-text-secondary dark:text-slate-300">CV, Bewerbung va suhbatga tayyorgarlik böyiça xizmatlarimizni köring. Maslahat xizmati vakansiyaga ariza topşirişdan alohida.</p>
            <Link href="/services" className="group mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-md border border-slate-300 px-5 text-sm font-semibold transition-colors hover:border-teal-600 hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-white/20 dark:hover:bg-white/10 dark:focus-visible:outline-teal-400">
              Xizmatlarni köriş <ArrowUpRight aria-hidden="true" strokeWidth={1.65} className="size-4 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
            </Link>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-transparent text-slate-950 dark:border-white/10 dark:text-slate-100">
        <div className="mx-auto w-full max-w-[var(--uzde-layout-width)] grid gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:px-14 lg:py-16">
          <div className="min-w-0">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">
              <UsersRound aria-hidden="true" strokeWidth={1.65} className="size-[18px] shrink-0" />UZDE / IŞ BERUVÇILAR
            </p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,4.2vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] [text-wrap:balance]">Kompaniyangizga xodim kerakmi?</h2>
          </div>
          <div className="min-w-0 lg:justify-self-end lg:w-full lg:max-w-xl">
            <p className="max-w-lg text-base leading-7 text-text-secondary dark:text-slate-300">Vakansiya joylaştiriş yoki nomzod topiş böyiça biz bilan bog‘laning.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={mailto(employerSubject, "Salom, UzDe!\n\nKompaniyamiz vakansiyasini joylashtirish bo‘yicha bog‘lanmoqchimiz.\n")} className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-md bg-teal-300 px-5 text-sm font-semibold text-[#0B1220]! transition-colors hover:bg-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                Vakansiya joylaştiriş <ArrowUpRight aria-hidden="true" strokeWidth={1.65} className="size-4 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
              </a>
              <a href={mailto(recruitingSubject, "Salom, UzDe!\n\nNomzod topish bo‘yicha maslahatlashmoqchimiz.\n")} className="group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-md border border-slate-300 px-5 text-sm font-semibold transition-colors hover:border-teal-600 hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-white/20 dark:hover:bg-white/10 dark:focus-visible:outline-teal-400">
                Nomzod topiş <ArrowUpRight aria-hidden="true" strokeWidth={1.65} className="size-4 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
              </a>
            </div>
          </div>
        </div>
      </section>
        </>
      ) : (
        <>
      <section className="border-t border-slate-200 bg-transparent text-slate-950 dark:border-white/10 dark:text-slate-100"><div className="mx-auto w-full max-w-[var(--uzde-layout-width)] grid gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14 lg:py-16"><div><p className="text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">UZDE / {uz ? "NOMZODLAR" : "BEWERBENDE"}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{uz ? "Ariza topşirişda yordam kerakmi?" : "Hilfe bei Ihrer Bewerbung?"}</h2><p className="mt-4 max-w-2xl leading-7 text-text-secondary dark:text-slate-300">{uz ? "CV, Bewerbung va suhbatga tayyorgarlik böyiça xizmatlarimizni köring. Maslahat xizmati vakansiyaga ariza topşirişdan alohida." : "Unterstützung bei Lebenslauf, Bewerbung und Vorstellungsgespräch. Diese Beratung ist unabhängig von einer Stellenbewerbung."}</p></div><Link href="/services" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-6 font-semibold transition hover:border-teal-600 dark:border-white/20">{uz ? "Xizmatlarni köriş" : "Services ansehen"}<ArrowUpRight className="size-4" /></Link></div></section>
      <section className="border-t border-slate-200 bg-transparent text-slate-950 dark:border-white/10 dark:text-slate-100">
        <div className="mx-auto w-full max-w-[var(--uzde-layout-width)] px-5 py-16 sm:px-8 sm:py-20 lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-300">UZDE / {uz ? "IŞ BERUVÇILAR" : "ARBEITGEBER"}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end">
            <h2 className="max-w-4xl text-[clamp(2.2rem,4.5vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.025em] [text-wrap:balance]">{uz ? "Kompaniyangizga xodim kerakmi?" : "Sie suchen neue Mitarbeitende?"}</h2>
            <div>
              <p className="max-w-lg leading-7 text-text-secondary dark:text-slate-300">{uz ? "Vakansiya joylaştiriş yoki nomzod topiş böyiça biz bilan bog‘laning." : "Kontaktieren Sie uns für Stellenanzeigen oder die Suche nach passenden Kandidatinnen und Kandidaten."}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={mailto(employerSubject, "Salom, UzDe!\n\nKompaniyamiz vakansiyasini joylashtirish bo‘yicha bog‘lanmoqchimiz.\n")} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-teal-300 px-5 font-semibold text-slate-950 transition hover:bg-teal-200">{uz ? "Vakansiya joylaştiriş" : "Stelle veröffentlichen"}<ArrowUpRight className="size-4" /></a>
                <a href={mailto(recruitingSubject, "Salom, UzDe!\n\nNomzod topish bo‘yicha maslahatlashmoqchimiz.\n")} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 px-5 font-semibold transition hover:border-teal-600 dark:border-white/20">{uz ? "Nomzod topiş" : "Personal finden"}<ArrowUpRight className="size-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  );
}
