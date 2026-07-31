"use client";

import { useMemo, useState } from "react";

import {
  employmentTypeOptions,
  jobPlatforms,
  languageOptions,
  professionOptions,
  type EmploymentType,
  type PlatformLanguage,
  type Profession,
} from "../data/jobPlatforms";

type ProfessionFilter = "Barchasi" | Profession;
type LanguageFilter = "Barchasi" | PlatformLanguage;
type EmploymentFilter = "Barchasi" | EmploymentType;

export default function JobPlatformsDirectory() {
  const [search, setSearch] = useState("");
  const [profession, setProfession] =
    useState<ProfessionFilter>("Barchasi");
  const [language, setLanguage] =
    useState<LanguageFilter>("Barchasi");
  const [employmentType, setEmploymentType] =
    useState<EmploymentFilter>("Barchasi");
  const [officialOnly, setOfficialOnly] = useState(false);

  const filteredPlatforms = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("uz");

    return jobPlatforms.filter((platform) => {
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
        .toLocaleLowerCase("uz");

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      const matchesProfession =
        profession === "Barchasi" ||
        platform.professions.includes(profession) ||
        platform.professions.includes("Barcha sohalar");

      const matchesLanguage =
        language === "Barchasi" ||
        platform.languages.includes(language) ||
        (language === "Nemis tili" &&
          platform.languages.includes("Nemis va ingliz")) ||
        (language === "Ingliz tili" &&
          platform.languages.includes("Nemis va ingliz"));

      const matchesEmployment =
        employmentType === "Barchasi" ||
        platform.employmentTypes.includes(employmentType);

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
    search,
    profession,
    language,
    employmentType,
    officialOnly,
  ]);

  const resetFilters = () => {
    setSearch("");
    setProfession("Barchasi");
    setLanguage("Barchasi");
    setEmploymentType("Barchasi");
    setOfficialOnly(false);
  };

  return (
    <section
      id="job-platforms"
      className="border-t border-slate-200 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Ish platformalari katalogi
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Mutaxassisligingizga mos ish saytini toping
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Kasb sohasi, til va ish shaklini tanlang. Katalog
            sizga mos davlat va xususiy ish platformalarini
            ko‘rsatadi.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-4">
              <label
                htmlFor="platform-search"
                className="block text-sm font-semibold text-slate-700"
              >
                Platforma yoki kasb qidirish
              </label>

              <input
                id="platform-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Masalan: IT, talaba, Pflege, Minijob..."
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="profession-filter"
                className="block text-sm font-semibold text-slate-700"
              >
                Kasb sohasi
              </label>

              <select
                id="profession-filter"
                value={profession}
                onChange={(event) =>
                  setProfession(
                    event.target.value as ProfessionFilter,
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                {professionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="language-filter"
                className="block text-sm font-semibold text-slate-700"
              >
                Ish tili
              </label>

              <select
                id="language-filter"
                value={language}
                onChange={(event) =>
                  setLanguage(
                    event.target.value as LanguageFilter,
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                {languageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="employment-filter"
                className="block text-sm font-semibold text-slate-700"
              >
                Ish shakli
              </label>

              <select
                id="employment-filter"
                value={employmentType}
                onChange={(event) =>
                  setEmploymentType(
                    event.target.value as EmploymentFilter,
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                {employmentTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end gap-3">
              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={officialOnly}
                  onChange={(event) =>
                    setOfficialOnly(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />

                <span className="text-sm font-medium text-slate-700">
                  Faqat rasmiy portallar
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-sm text-slate-600"
              aria-live="polite"
            >
              <span className="font-semibold text-slate-950">
                {filteredPlatforms.length}
              </span>{" "}
              ta platforma topildi
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="w-fit text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Filtrlarni tozalash
            </button>
          </div>
        </div>

        {filteredPlatforms.length > 0 ? (
          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {filteredPlatforms.map((platform) => (
              <article
                key={platform.id}
                className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-600">
                      {platform.platformType}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-950">
                      {platform.name}
                    </h3>
                  </div>

                  {platform.official ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                      Rasmiy
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600">
                      Xususiy
                    </span>
                  )}
                </div>

                <p className="mt-5 leading-7 text-slate-600">
                  {platform.description}
                </p>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-950">
                    Kimlar uchun?
                  </p>

                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {platform.suitableFor
                      .slice(0, 4)
                      .map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-6 text-slate-600"
                        >
                          <span
                            className="font-bold text-emerald-600"
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
                  <p className="text-sm font-semibold text-slate-950">
                    Ish shakllari
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {platform.employmentTypes.map((type) => (
                      <span
                        key={type}
                        className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-950">
                    Qidiruv namunalari
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {platform.searchExamples
                      .slice(0, 4)
                      .map((example) => (
                        <span
                          key={example}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600"
                        >
                          {example}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="mt-7 flex flex-1 flex-col justify-end border-t border-slate-100 pt-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>Til:</span>

                    {platform.languages.map((item) => (
                      <span
                        key={item}
                        className="font-medium text-slate-700"
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
                    Platformani ochish ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <h3 className="text-xl font-bold text-slate-950">
              Mos platforma topilmadi
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Filtrlardan birini o‘zgartiring yoki barcha
              filtrlarni tozalab, qaytadan qidiring.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Filtrlarni tozalash
            </button>
          </div>
        )}

        <aside className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-8">
          <h3 className="text-xl font-bold text-amber-950">
            Xavfsizlik eslatmasi
          </h3>

          <p className="mt-3 leading-7 text-amber-900">
            Platformada e’lon mavjudligi ish beruvchi yoki
            vositachining avtomatik ravishda ishonchli ekanini
            anglatmaydi. Kompaniyaning rasmiy sayti, Impressum,
            manzili va aloqa ma’lumotlarini tekshiring. Ishga
            qabul qilish, shartnoma yoki viza uchun oldindan pul
            yubormang.
          </p>
        </aside>
      </div>
    </section>
  );
}