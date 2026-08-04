"use client";

import { useLocale } from "next-intl";
import { useMemo, useState } from "react";

import {
  getEmploymentTypeOptions,
  getJobPlatforms,
  getLanguageOptions,
  getProfessionOptions,
  type EmploymentType,
  type PlatformLanguageKey,
  type ProfessionKey,
  type SupportedJobPlatformLocale,
} from "../data/jobPlatforms";

type ProfessionFilter = "all" | ProfessionKey;
type LanguageFilter = "all" | PlatformLanguageKey;
type EmploymentFilter = "all" | EmploymentType;

export default function JobPlatformsDirectory() {
  const currentLocale = useLocale();
  const locale: SupportedJobPlatformLocale =
    currentLocale === "de" ? "de" : "uz";

  const [search, setSearch] = useState("");
  const [profession, setProfession] =
    useState<ProfessionFilter>("all");
  const [language, setLanguage] =
    useState<LanguageFilter>("all");
  const [employmentType, setEmploymentType] =
    useState<EmploymentFilter>("all");
  const [officialOnly, setOfficialOnly] = useState(false);

  const platforms = useMemo(
    () => getJobPlatforms(locale),
    [locale],
  );
  const professionOptions = useMemo(
    () => getProfessionOptions(locale),
    [locale],
  );
  const languageOptions = useMemo(
    () => getLanguageOptions(locale),
    [locale],
  );
  const employmentTypeOptions = useMemo(
    () => getEmploymentTypeOptions(locale),
    [locale],
  );

  const copy =
    locale === "uz"
      ? {
          eyebrow: "Ish platformalari katalogi",
          title:
            "Mutaxassisligingizga mos ish saytini toping",
          description:
            "Kasb sohasi, til va ish shaklini tanlang. Katalog sizga mos davlat va xususiy ish platformalarini ko‘rsatadi.",
          searchLabel:
            "Platforma yoki kasb qidirish",
          searchPlaceholder:
            "Masalan: IT, talaba, Pflege, Minijob...",
          professionLabel: "Kasb sohasi",
          languageLabel: "Ish tili",
          employmentLabel: "Ish shakli",
          officialOnly:
            "Faqat rasmiy portallar",
          resultCount: (count: number) =>
            `${count} ta platforma topildi`,
          reset: "Filtrlarni tozalash",
          official: "Rasmiy",
          private: "Xususiy",
          suitableFor: "Kimlar uchun?",
          employmentTypes: "Ish shakllari",
          examples: "Qidiruv namunalari",
          language: "Til:",
          openPlatform: "Platformani ochish",
          noResultsTitle:
            "Mos platforma topilmadi",
          noResultsDescription:
            "Filtrlardan birini o‘zgartiring yoki barcha filtrlarni tozalab, qaytadan qidiring.",
          safetyTitle: "Xavfsizlik eslatmasi",
          safetyDescription:
            "Platformada e’lon mavjudligi ish beruvchi yoki vositachining avtomatik ravishda ishonchli ekanini anglatmaydi. Kompaniyaning rasmiy sayti, Impressum, manzili va aloqa ma’lumotlarini tekshiring. Ishga qabul qilish, shartnoma yoki viza uchun oldindan pul yubormang.",
        }
      : {
          eyebrow: "Verzeichnis der Jobportale",
          title:
            "Finden Sie das passende Jobportal für Ihr Berufsfeld",
          description:
            "Wählen Sie Berufsfeld, Sprache und Beschäftigungsform. Das Verzeichnis zeigt passende staatliche und private Jobplattformen.",
          searchLabel:
            "Plattform oder Beruf suchen",
          searchPlaceholder:
            "Zum Beispiel: IT, Studierende, Pflege, Minijob...",
          professionLabel: "Berufsfeld",
          languageLabel: "Arbeitssprache",
          employmentLabel:
            "Beschäftigungsform",
          officialOnly:
            "Nur offizielle Portale",
          resultCount: (count: number) =>
            `${count} Plattformen gefunden`,
          reset: "Filter zurücksetzen",
          official: "Offiziell",
          private: "Privat",
          suitableFor: "Geeignet für",
          employmentTypes:
            "Beschäftigungsformen",
          examples: "Suchbeispiele",
          language: "Sprache:",
          openPlatform: "Plattform öffnen",
          noResultsTitle:
            "Keine passende Plattform gefunden",
          noResultsDescription:
            "Ändern Sie einen Filter oder setzen Sie alle Filter zurück und suchen Sie erneut.",
          safetyTitle: "Sicherheitshinweis",
          safetyDescription:
            "Eine Anzeige auf einer Plattform bedeutet nicht automatisch, dass Arbeitgeber oder Vermittler vertrauenswürdig sind. Prüfen Sie offizielle Website, Impressum, Anschrift und Kontaktdaten des Unternehmens. Senden Sie niemals im Voraus Geld für Einstellung, Vertrag oder Visum.",
        };

  const filteredPlatforms = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase(
        locale === "uz" ? "uz" : "de",
      );

    return platforms.filter((platform) => {
      const searchableText = [
        platform.name,
        platform.description,
        platform.platformType,
        ...platform.professions,
        ...platform.employmentTypes,
        ...platform.suitableFor,
        ...platform.searchExamples,
      ]
        .join(" ")
        .toLocaleLowerCase(
          locale === "uz" ? "uz" : "de",
        );

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      const matchesProfession =
        profession === "all" ||
        platform.professionKeys.includes(
          profession,
        ) ||
        platform.professionKeys.includes(
          "all-fields",
        );

      const matchesLanguage =
        language === "all" ||
        platform.languageKeys.includes(language) ||
        (language === "german" &&
          platform.languageKeys.includes(
            "german-english",
          )) ||
        (language === "english" &&
          platform.languageKeys.includes(
            "german-english",
          ));

      const matchesEmployment =
        employmentType === "all" ||
        platform.employmentTypes.includes(
          employmentType,
        );

      const matchesOfficial =
        !officialOnly || platform.official;

      return (
        matchesSearch &&
        matchesProfession &&
        matchesLanguage &&
        matchesEmployment &&
        matchesOfficial
      );
    });
  }, [
    employmentType,
    language,
    locale,
    officialOnly,
    platforms,
    profession,
    search,
  ]);

  const resetFilters = () => {
    setSearch("");
    setProfession("all");
    setLanguage("all");
    setEmploymentType("all");
    setOfficialOnly(false);
  };

  return (
    <section
      id="job-platforms"
      className="border-t border-slate-200 bg-white py-24 transition-colors dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
            {copy.eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            {copy.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {copy.description}
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-4">
              <label
                htmlFor="platform-search"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {copy.searchLabel}
              </label>

              <input
                id="platform-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder={copy.searchPlaceholder}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="profession-filter"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {copy.professionLabel}
              </label>

              <select
                id="profession-filter"
                value={profession}
                onChange={(event) =>
                  setProfession(
                    event.target
                      .value as ProfessionFilter,
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-500/20"
              >
                {professionOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="language-filter"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {copy.languageLabel}
              </label>

              <select
                id="language-filter"
                value={language}
                onChange={(event) =>
                  setLanguage(
                    event.target
                      .value as LanguageFilter,
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-500/20"
              >
                {languageOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="employment-filter"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
              >
                {copy.employmentLabel}
              </label>

              <select
                id="employment-filter"
                value={employmentType}
                onChange={(event) =>
                  setEmploymentType(
                    event.target
                      .value as EmploymentFilter,
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-500/20"
              >
                {employmentTypeOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="flex flex-col justify-end gap-3">
              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                <input
                  type="checkbox"
                  checked={officialOnly}
                  onChange={(event) =>
                    setOfficialOnly(
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {copy.officialOnly}
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <p
              className="text-sm text-slate-600 dark:text-slate-400"
              aria-live="polite"
            >
              {copy.resultCount(
                filteredPlatforms.length,
              )}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="w-fit text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {copy.reset}
            </button>
          </div>
        </div>

        {filteredPlatforms.length > 0 ? (
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {filteredPlatforms.map((platform) => (
              <article
                key={platform.id}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400">
                      {platform.platformType}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">
                      {platform.name}
                    </h3>
                  </div>

                  {platform.official ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      {copy.official}
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {copy.private}
                    </span>
                  )}
                </div>

                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                  {platform.description}
                </p>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    {copy.suitableFor}
                  </p>

                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {platform.suitableFor
                      .slice(0, 4)
                      .map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400"
                        >
                          <span
                            className="font-bold text-emerald-600 dark:text-emerald-400"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    {copy.employmentTypes}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {platform.employmentTypes.map(
                      (type) => (
                        <span
                          key={type}
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                        >
                          {type}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    {copy.examples}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {platform.searchExamples
                      .slice(0, 4)
                      .map((example) => (
                        <span
                          key={example}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                        >
                          {example}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-1 flex-col justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>{copy.language}</span>

                    {platform.languages.map((item) => (
                      <span
                        key={item}
                        className="font-medium text-slate-700 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    href={platform.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {copy.openPlatform} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-950 dark:text-white">
              {copy.noResultsTitle}
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-400">
              {copy.noResultsDescription}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {copy.reset}
            </button>
          </div>
        )}

        <aside className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-8 dark:border-amber-500/20 dark:bg-amber-500/10">
          <h3 className="text-xl font-bold text-amber-950 dark:text-amber-100">
            {copy.safetyTitle}
          </h3>

          <p className="mt-3 leading-7 text-amber-900 dark:text-amber-200">
            {copy.safetyDescription}
          </p>
        </aside>
      </div>
    </section>
  );
}
