"use client";

import {
  useActionState,
  type ReactNode,
} from "react";

import type {
  AdminSpecialist,
  AdminSpecialistCategory,
  AdminSpecialistLanguage,
} from "@/lib/specialists/admin-specialists-repository";

type SpecialistFormState = {
  error: string | null;
};

type SpecialistFormAction = (
  previousState: SpecialistFormState,
  formData: FormData,
) => Promise<SpecialistFormState>;

type SpecialistFormProps = {
  locale: "uz" | "de";
  formAction: SpecialistFormAction;
  mode: "create" | "edit";
  specialist?: AdminSpecialist;
};

const initialState: SpecialistFormState = {
  error: null,
};

const categories: ReadonlyArray<{
  value: AdminSpecialistCategory;
  uz: string;
  de: string;
}> = [
  {
    value: "medical",
    uz: "Tibbiyot",
    de: "Medizin",
  },
  {
    value: "legal",
    uz: "Huquq",
    de: "Recht",
  },
  {
    value: "technology",
    uz: "Texnologiya",
    de: "Technologie",
  },
  {
    value: "automotive",
    uz: "Avtomobil",
    de: "Automobil",
  },
  {
    value: "home",
    uz: "Uy va maishiy xizmatlar",
    de: "Haus & Alltag",
  },
  {
    value: "education",
    uz: "Ta’lim",
    de: "Bildung",
  },
  {
    value: "language-teaching",
    uz: "Til o‘qitish",
    de: "Sprachunterricht",
  },
  {
    value: "academic-documents",
    uz: "Akademik hujjatlar",
    de: "Akademische Unterlagen",
  },
  {
    value: "beauty",
    uz: "Go‘zallik",
    de: "Beauty",
  },
  {
    value: "finance",
    uz: "Moliya",
    de: "Finanzen",
  },
  {
    value: "creative",
    uz: "Ijodiy xizmatlar",
    de: "Kreative Dienstleistungen",
  },
];

const languages: ReadonlyArray<{
  value: AdminSpecialistLanguage;
  label: string;
}> = [
  {
    value: "uz",
    label: "O‘zbek / Usbekisch",
  },
  {
    value: "de",
    label: "Deutsch",
  },
  {
    value: "ru",
    label: "Русский",
  },
  {
    value: "en",
    label: "English",
  },
  {
    value: "tr",
    label: "Türkçe",
  },
];

const bundeslaender = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
] as const;

const copy = {
  uz: {
    common: "Asosiy ma’lumotlar",
    uzContent: "O‘zbekcha kontent",
    deContent: "Nemischa kontent",
    location: "Joylashuv va xizmat hududi",
    contact: "Aloqa ma’lumotlari",
    optionalMeta: "Qo‘shimcha metadata",
    required: "Majburiy",
    optional: "Ixtiyoriy",
    code: "Profil kodi",
    codeHint:
      "Masalan: UZ-IT-0002. Kod noyob bo‘lishi kerak.",
    slug: "Slug",
    slugHint:
      "Masalan: ali-valiyev. Saqlash vaqtida normallashtiriladi.",
    name: "Ism-familiya / nom",
    categories: "Kategoriyalar",
    categoriesHint:
      "Kamida bitta kategoriya tanlang.",
    languages: "Tillar",
    languagesHint:
      "Agar tillar tasdiqlanmagan bo‘lsa bo‘sh qoldirish mumkin.",
    profession: "Kasb / mutaxassislik",
    shortDescription: "Qisqa tavsif",
    services: "Xizmatlar",
    servicesHint:
      "Har bir xizmatni yangi qatordan yozing. UZ va DE ro‘yxatlar soni teng bo‘lishi kerak.",
    city: "Shahar",
    bundesland: "Bundesland",
    noBundesland: "Tanlanmagan",
    postalCode: "Pochta indeksi",
    serviceArea: "Xizmat hududi",
    email: "E-mail",
    phone: "Telefon",
    website: "Website",
    whatsapp: "WhatsApp URL",
    telegram: "Telegram URL",
    instagram: "Instagram URL",
    youtube: "YouTube URL",
    facebook: "Facebook URL",
    pricingNote: "Narx bo‘yicha eslatma",
    avatarUrl: "Profil rasmi path / URL",
    avatarHint:
      "Masalan: /images/specialists/ali-valiyev.webp",
    yearsOfExperience: "Tajriba yili",
    rating: "Rating (0–5)",
    reviewCount: "Review soni",
    createNote:
      "Yangi profil avtomatik draft holatida va barcha status flaglari o‘chirilgan holda yaratiladi.",
    editNote:
      "Tahrirlash profil kontentini o‘zgartiradi; lifecycle va status flaglari alohida boshqariladi.",
    saveCreate: "Qoralama sifatida saqlash",
    saveEdit: "O‘zgarishlarni saqlash",
    saving: "Saqlanmoqda…",
  },

  de: {
    common: "Grunddaten",
    uzContent: "Usbekischer Inhalt",
    deContent: "Deutscher Inhalt",
    location: "Standort und Servicegebiet",
    contact: "Kontaktdaten",
    optionalMeta: "Zusätzliche Metadaten",
    required: "Pflichtfeld",
    optional: "Optional",
    code: "Profilcode",
    codeHint:
      "Zum Beispiel: UZ-IT-0002. Der Code muss eindeutig sein.",
    slug: "Slug",
    slugHint:
      "Zum Beispiel: ali-valiyev. Der Wert wird beim Speichern normalisiert.",
    name: "Name",
    categories: "Kategorien",
    categoriesHint:
      "Wählen Sie mindestens eine Kategorie.",
    languages: "Sprachen",
    languagesHint:
      "Kann leer bleiben, wenn die Sprachen noch nicht bestätigt sind.",
    profession: "Beruf / Fachgebiet",
    shortDescription: "Kurzbeschreibung",
    services: "Leistungen",
    servicesHint:
      "Jede Leistung in eine neue Zeile schreiben. UZ- und DE-Listen müssen gleich lang sein.",
    city: "Stadt",
    bundesland: "Bundesland",
    noBundesland: "Nicht ausgewählt",
    postalCode: "Postleitzahl",
    serviceArea: "Servicegebiet",
    email: "E-Mail",
    phone: "Telefon",
    website: "Website",
    whatsapp: "WhatsApp-URL",
    telegram: "Telegram-URL",
    instagram: "Instagram-URL",
    youtube: "YouTube-URL",
    facebook: "Facebook-URL",
    pricingNote: "Preishinweis",
    avatarUrl: "Profilbild-Pfad / URL",
    avatarHint:
      "Zum Beispiel: /images/specialists/ali-valiyev.webp",
    yearsOfExperience:
      "Berufserfahrung in Jahren",
    rating: "Bewertung (0–5)",
    reviewCount: "Anzahl Bewertungen",
    createNote:
      "Neue Profile werden automatisch als Entwurf erstellt; alle Status-Flags sind zunächst deaktiviert.",
    editNote:
      "Die Bearbeitung ändert den Profilinhalt; Lifecycle und Status-Flags werden separat verwaltet.",
    saveCreate: "Als Entwurf speichern",
    saveEdit: "Änderungen speichern",
    saving: "Wird gespeichert…",
  },
} as const;

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

function FieldLabel({
  children,
  required,
  locale,
}: {
  children: ReactNode;
  required?: boolean;
  locale: "uz" | "de";
}) {
  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  return (
    <span className="flex items-center justify-between gap-3">
      <span>
        {children}
      </span>

      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {required
          ? currentCopy.required
          : currentCopy.optional}
      </span>
    </span>
  );
}

export default function SpecialistForm({
  locale,
  formAction,
  mode,
  specialist,
}: SpecialistFormProps) {
  const [
    state,
    action,
    pending,
  ] = useActionState(
    formAction,
    initialState,
  );

  const currentCopy =
    locale === "de"
      ? copy.de
      : copy.uz;

  const listValue = (
    values?: string[],
  ) =>
    values?.join("\n") ?? "";

  const contactFields =
    [
      [
        "email",
        currentCopy.email,
        specialist?.email,
      ],
      [
        "phone",
        currentCopy.phone,
        specialist?.phone,
      ],
      [
        "website",
        currentCopy.website,
        specialist?.website,
      ],
      [
        "whatsapp",
        currentCopy.whatsapp,
        specialist?.whatsapp,
      ],
      [
        "telegram",
        currentCopy.telegram,
        specialist?.telegram,
      ],
      [
        "instagram",
        currentCopy.instagram,
        specialist?.instagram,
      ],
      [
        "youtube",
        currentCopy.youtube,
        specialist?.youtube,
      ],
      [
        "facebook",
        currentCopy.facebook,
        specialist?.facebook,
      ],
    ] satisfies ReadonlyArray<
      readonly [
        string,
        string,
        string | null | undefined,
      ]
    >;

  return (
    <form
      action={action}
      className="space-y-6"
    >
      {mode === "edit" &&
        specialist && (
          <input
            type="hidden"
            name="specialistId"
            value={specialist.id}
          />
        )}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.common}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
              required
            >
              {currentCopy.code}
            </FieldLabel>

            <input
              name="code"
              required
              disabled={pending}
              defaultValue={
                specialist?.code
              }
              placeholder="UZ-IT-0002"
              className={
                inputClassName
              }
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {
                currentCopy.codeHint
              }
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
              required
            >
              {currentCopy.slug}
            </FieldLabel>

            <input
              name="slug"
              required
              disabled={pending}
              defaultValue={
                specialist?.slug
              }
              placeholder="ali-valiyev"
              className={
                inputClassName
              }
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {
                currentCopy.slugHint
              }
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel
              locale={locale}
              required
            >
              {currentCopy.name}
            </FieldLabel>

            <input
              name="name"
              required
              disabled={pending}
              defaultValue={
                specialist?.name
              }
              className={
                inputClassName
              }
            />
          </label>
        </div>

        <div className="mt-6">
          <FieldLabel
            locale={locale}
            required
          >
            {currentCopy.categories}
          </FieldLabel>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(
              (category) => (
                <label
                  key={
                    category.value
                  }
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={
                      category.value
                    }
                    disabled={
                      pending
                    }
                    defaultChecked={
                      specialist?.categories.includes(
                        category.value,
                      )
                    }
                    className="size-4 accent-fuchsia-600"
                  />

                  {locale === "de"
                    ? category.de
                    : category.uz}
                </label>
              ),
            )}
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {
              currentCopy.categoriesHint
            }
          </p>
        </div>

        <div className="mt-6">
          <FieldLabel
            locale={locale}
          >
            {currentCopy.languages}
          </FieldLabel>

          <div className="mt-3 flex flex-wrap gap-3">
            {languages.map(
              (language) => (
                <label
                  key={
                    language.value
                  }
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  <input
                    type="checkbox"
                    name="languages"
                    value={
                      language.value
                    }
                    disabled={
                      pending
                    }
                    defaultChecked={
                      specialist?.languages.includes(
                        language.value,
                      )
                    }
                    className="size-4 accent-fuchsia-600"
                  />

                  {
                    language.label
                  }
                </label>
              ),
            )}
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {
              currentCopy.languagesHint
            }
          </p>
        </div>

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {mode === "edit"
            ? currentCopy.editNote
            : currentCopy.createNote}
        </p>
      </section>

      {(
        [
          "uz",
          "de",
        ] as const
      ).map(
        (
          contentLocale,
        ) => {
          const isUz =
            contentLocale ===
            "uz";

          return (
            <section
              key={
                contentLocale
              }
              className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
            >
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                {isUz
                  ? currentCopy.uzContent
                  : currentCopy.deContent}
              </h2>

              <div className="mt-6 grid gap-5">
                <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  <FieldLabel
                    locale={
                      locale
                    }
                    required
                  >
                    {
                      currentCopy.profession
                    }
                  </FieldLabel>

                  <input
                    name={
                      isUz
                        ? "professionUz"
                        : "professionDe"
                    }
                    required
                    disabled={
                      pending
                    }
                    defaultValue={
                      isUz
                        ? specialist?.professionUz
                        : specialist?.professionDe
                    }
                    className={
                      inputClassName
                    }
                  />
                </label>

                <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  <FieldLabel
                    locale={
                      locale
                    }
                    required
                  >
                    {
                      currentCopy.shortDescription
                    }
                  </FieldLabel>

                  <textarea
                    name={
                      isUz
                        ? "shortDescriptionUz"
                        : "shortDescriptionDe"
                    }
                    rows={4}
                    required
                    disabled={
                      pending
                    }
                    defaultValue={
                      isUz
                        ? specialist?.shortDescriptionUz
                        : specialist?.shortDescriptionDe
                    }
                    className={
                      inputClassName
                    }
                  />
                </label>

                <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  <FieldLabel
                    locale={
                      locale
                    }
                    required
                  >
                    {
                      currentCopy.services
                    }
                  </FieldLabel>

                  <textarea
                    name={
                      isUz
                        ? "servicesUz"
                        : "servicesDe"
                    }
                    rows={7}
                    required
                    disabled={
                      pending
                    }
                    defaultValue={listValue(
                      isUz
                        ? specialist?.servicesUz
                        : specialist?.servicesDe,
                    )}
                    className={
                      inputClassName
                    }
                  />

                  <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                    {
                      currentCopy.servicesHint
                    }
                  </span>
                </label>

                <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  <FieldLabel
                    locale={
                      locale
                    }
                  >
                    {
                      currentCopy.serviceArea
                    }
                  </FieldLabel>

                  <input
                    name={
                      isUz
                        ? "serviceAreaUz"
                        : "serviceAreaDe"
                    }
                    disabled={
                      pending
                    }
                    defaultValue={
                      (
                        isUz
                          ? specialist?.serviceAreaUz
                          : specialist?.serviceAreaDe
                      ) ?? ""
                    }
                    className={
                      inputClassName
                    }
                  />
                </label>

                <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  <FieldLabel
                    locale={
                      locale
                    }
                  >
                    {
                      currentCopy.pricingNote
                    }
                  </FieldLabel>

                  <textarea
                    name={
                      isUz
                        ? "pricingNoteUz"
                        : "pricingNoteDe"
                    }
                    rows={3}
                    disabled={
                      pending
                    }
                    defaultValue={
                      (
                        isUz
                          ? specialist?.pricingNoteUz
                          : specialist?.pricingNoteDe
                      ) ?? ""
                    }
                    className={
                      inputClassName
                    }
                  />
                </label>
              </div>
            </section>
          );
        },
      )}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.location}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
            >
              {currentCopy.city}
            </FieldLabel>

            <input
              name="city"
              disabled={pending}
              defaultValue={
                specialist?.city ??
                ""
              }
              className={
                inputClassName
              }
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
            >
              {
                currentCopy.bundesland
              }
            </FieldLabel>

            <select
              name="bundesland"
              disabled={pending}
              defaultValue={
                specialist?.bundesland ??
                ""
              }
              className={
                inputClassName
              }
            >
              <option value="">
                {
                  currentCopy.noBundesland
                }
              </option>

              {bundeslaender.map(
                (item) => (
                  <option
                    key={
                      item
                    }
                    value={
                      item
                    }
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
            >
              {
                currentCopy.postalCode
              }
            </FieldLabel>

            <input
              name="postalCode"
              disabled={pending}
              defaultValue={
                specialist?.postalCode ??
                ""
              }
              className={
                inputClassName
              }
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.contact}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {contactFields.map(
            (
              [
                name,
                label,
                value,
              ],
            ) => (
              <label
                key={
                  name
                }
                className="text-sm font-bold text-slate-800 dark:text-slate-100"
              >
                <FieldLabel
                  locale={
                    locale
                  }
                >
                  {label}
                </FieldLabel>

                <input
                  name={
                    name
                  }
                  type={
                    name ===
                    "email"
                      ? "email"
                      : "text"
                  }
                  disabled={
                    pending
                  }
                  defaultValue={
                    value ??
                    ""
                  }
                  className={
                    inputClassName
                  }
                />
              </label>
            ),
          )}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {
            currentCopy.optionalMeta
          }
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2 lg:col-span-4">
            <FieldLabel
              locale={locale}
            >
              {
                currentCopy.avatarUrl
              }
            </FieldLabel>

            <input
              name="avatarUrl"
              disabled={pending}
              defaultValue={
                specialist?.avatarUrl ??
                ""
              }
              placeholder="/images/specialists/..."
              className={
                inputClassName
              }
            />

            <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
              {
                currentCopy.avatarHint
              }
            </span>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
            >
              {
                currentCopy.yearsOfExperience
              }
            </FieldLabel>

            <input
              name="yearsOfExperience"
              type="number"
              min="0"
              step="1"
              disabled={pending}
              defaultValue={
                specialist?.yearsOfExperience ??
                ""
              }
              className={
                inputClassName
              }
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
            >
              {
                currentCopy.rating
              }
            </FieldLabel>

            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.01"
              disabled={pending}
              defaultValue={
                specialist?.rating ??
                ""
              }
              className={
                inputClassName
              }
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel
              locale={locale}
            >
              {
                currentCopy.reviewCount
              }
            </FieldLabel>

            <input
              name="reviewCount"
              type="number"
              min="0"
              step="1"
              disabled={pending}
              defaultValue={
                specialist?.reviewCount ??
                ""
              }
              className={
                inputClassName
              }
            />
          </label>
        </div>
      </section>

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
        >
          {
            state.error
          }
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-fuchsia-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-600/15 transition hover:bg-fuchsia-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? currentCopy.saving
            : mode ===
                "edit"
              ? currentCopy.saveEdit
              : currentCopy.saveCreate}
        </button>
      </div>
    </form>
  );
}