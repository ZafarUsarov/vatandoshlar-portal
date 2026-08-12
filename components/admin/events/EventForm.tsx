"use client";

import {
  useActionState,
  type ReactNode,
} from "react";

import type {
  AdminEvent,
  AdminEventCategory,
  AdminEventFormat,
  AdminEventRegistrationStatus,
} from "@/lib/events/admin-events-repository";

type EventFormState = {
  error: string | null;
};

type EventFormAction = (
  previousState: EventFormState,
  formData: FormData,
) => Promise<EventFormState>;

type EventFormProps = {
  locale: "uz" | "de";
  formAction: EventFormAction;
  mode: "create" | "edit";
  event?: AdminEvent;
};

const initialState: EventFormState = {
  error: null,
};

const categories: ReadonlyArray<{
  value: AdminEventCategory;
  uz: string;
  de: string;
}> = [
  { value: "culture", uz: "Madaniyat", de: "Kultur" },
  { value: "education", uz: "Ta’lim", de: "Bildung" },
  { value: "career", uz: "Karyera", de: "Karriere" },
  { value: "business", uz: "Biznes", de: "Business" },
  { value: "community", uz: "Jamiyat", de: "Community" },
  { value: "sport", uz: "Sport", de: "Sport" },
  { value: "children", uz: "Bolalar uchun", de: "Für Kinder" },
  { value: "consular", uz: "Konsullik", de: "Konsularisches" },
];

const formats: ReadonlyArray<{
  value: AdminEventFormat;
  uz: string;
  de: string;
}> = [
  { value: "offline", uz: "Oflayn", de: "Offline" },
  { value: "online", uz: "Onlayn", de: "Online" },
  { value: "hybrid", uz: "Gibrid", de: "Hybrid" },
];

const registrationStatuses: ReadonlyArray<{
  value: AdminEventRegistrationStatus;
  uz: string;
  de: string;
}> = [
  { value: "open", uz: "Ro‘yxatdan o‘tish ochiq", de: "Anmeldung geöffnet" },
  { value: "not_required", uz: "Ro‘yxatdan o‘tish shart emas", de: "Keine Anmeldung erforderlich" },
  { value: "sold_out", uz: "Joylar tugagan", de: "Ausgebucht" },
  { value: "closed", uz: "Ro‘yxatdan o‘tish yopilgan", de: "Anmeldung geschlossen" },
];

const languages = [
  { value: "uz", label: "O‘zbek / Usbekisch" },
  { value: "de", label: "Deutsch" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
] as const;

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
    schedule: "Sana va vaqt",
    location: "Joylashuv",
    organizer: "Tashkilotchi va ro‘yxatdan o‘tish",
    source: "Rasmiy manba va tekshiruv",
    required: "Majburiy",
    optional: "Ixtiyoriy",
    slug: "Slug",
    title: "Sarlavha",
    excerpt: "Qisqa tavsif",
    description: "Tavsif bo‘limlari",
    descriptionHint: "Har bir bo‘limni yangi qatordan yozing. UZ va DE qatorlari soni teng bo‘lishi kerak.",
    category: "Kategoriya",
    format: "Format",
    startDate: "Boshlanish sanasi",
    endDate: "Tugash sanasi",
    startTime: "Boshlanish vaqti",
    endTime: "Tugash vaqti",
    timezone: "Timezone",
    city: "Shahar",
    bundesland: "Bundesland",
    noBundesland: "Tanlanmagan",
    venueName: "Joy nomi",
    address: "Manzil",
    onlineUrl: "Online URL",
    organizerName: "Tashkilotchi nomi",
    organizerUrl: "Tashkilotchi URL",
    registrationStatus: "Ro‘yxatdan o‘tish holati",
    registrationUrl: "Ro‘yxatdan o‘tish URL",
    registrationDeadline: "Ro‘yxatdan o‘tish muddati",
    languages: "Tillar",
    priceLabel: "Narx yozuvi",
    officialSourceName: "Rasmiy manba nomi",
    officialSourceUrl: "Rasmiy manba URL",
    verifiedAt: "Oxirgi tekshirilgan sana",
    importantNotes: "Muhim eslatmalar",
    importantNotesHint: "Har bir eslatmani yangi qatordan yozing. UZ va DE qatorlari soni teng bo‘lishi kerak.",
    createNote: "Yangi tadbir avtomatik draft holatida yaratiladi va public Events sahifasida hali ko‘rinmaydi.",
    editNote: "Tahrirlash tadbir kontentini o‘zgartiradi; lifecycle alohida boshqariladi.",
    saveCreate: "Qoralama sifatida saqlash",
    saveEdit: "O‘zgarishlarni saqlash",
    saving: "Saqlanmoqda…",
  },
  de: {
    common: "Grunddaten",
    uzContent: "Usbekischer Inhalt",
    deContent: "Deutscher Inhalt",
    schedule: "Datum und Uhrzeit",
    location: "Ort",
    organizer: "Veranstalter und Anmeldung",
    source: "Offizielle Quelle und Prüfung",
    required: "Pflichtfeld",
    optional: "Optional",
    slug: "Slug",
    title: "Titel",
    excerpt: "Kurzbeschreibung",
    description: "Beschreibungsabschnitte",
    descriptionHint: "Jeden Abschnitt in eine neue Zeile schreiben. UZ- und DE-Listen müssen gleich lang sein.",
    category: "Kategorie",
    format: "Format",
    startDate: "Startdatum",
    endDate: "Enddatum",
    startTime: "Startzeit",
    endTime: "Endzeit",
    timezone: "Zeitzone",
    city: "Stadt",
    bundesland: "Bundesland",
    noBundesland: "Nicht ausgewählt",
    venueName: "Veranstaltungsort",
    address: "Adresse",
    onlineUrl: "Online-URL",
    organizerName: "Veranstalter",
    organizerUrl: "Veranstalter-URL",
    registrationStatus: "Anmeldestatus",
    registrationUrl: "Anmelde-URL",
    registrationDeadline: "Anmeldefrist",
    languages: "Sprachen",
    priceLabel: "Preisangabe",
    officialSourceName: "Name der offiziellen Quelle",
    officialSourceUrl: "URL der offiziellen Quelle",
    verifiedAt: "Zuletzt geprüft am",
    importantNotes: "Wichtige Hinweise",
    importantNotesHint: "Jeden Hinweis in eine neue Zeile schreiben. UZ- und DE-Listen müssen gleich lang sein.",
    createNote: "Neue Veranstaltungen werden automatisch als Entwurf erstellt und erscheinen noch nicht im öffentlichen Events-Bereich.",
    editNote: "Die Bearbeitung ändert den Inhalt; der Lifecycle wird separat verwaltet.",
    saveCreate: "Als Entwurf speichern",
    saveEdit: "Änderungen speichern",
    saving: "Wird gespeichert…",
  },
} as const;

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

function FieldLabel({
  children,
  locale,
  required = false,
}: {
  children: ReactNode;
  locale: "uz" | "de";
  required?: boolean;
}) {
  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  return (
    <span className="flex items-center justify-between gap-3">
      <span>{children}</span>
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {required ? currentCopy.required : currentCopy.optional}
      </span>
    </span>
  );
}

export default function EventForm({
  locale,
  formAction,
  mode,
  event,
}: EventFormProps) {
  const [state, action, pending] =
    useActionState(
      formAction,
      initialState,
    );

  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  const listValue = (
    values?: string[],
  ) => values?.join("\n") ?? "";

  return (
    <form
      action={action}
      className="space-y-6"
    >
      {mode === "edit" && event && (
        <input
          type="hidden"
          name="eventId"
          value={event.id}
        />
      )}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.common}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale} required>
              {currentCopy.slug}
            </FieldLabel>
            <input
              name="slug"
              required
              disabled={pending}
              defaultValue={event?.slug}
              placeholder="berlin-uzbek-community-meetup"
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.category}
            </FieldLabel>
            <select
              name="category"
              required
              disabled={pending}
              defaultValue={event?.category ?? "community"}
              className={inputClassName}
            >
              {categories.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {locale === "de" ? item.de : item.uz}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.format}
            </FieldLabel>
            <select
              name="format"
              required
              disabled={pending}
              defaultValue={event?.format ?? "offline"}
              className={inputClassName}
            >
              {formats.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {locale === "de" ? item.de : item.uz}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {mode === "edit"
            ? currentCopy.editNote
            : currentCopy.createNote}
        </p>
      </section>

      {(["uz", "de"] as const).map((contentLocale) => {
        const isUz =
          contentLocale === "uz";

        return (
          <section
            key={contentLocale}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8"
          >
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              {isUz
                ? currentCopy.uzContent
                : currentCopy.deContent}
            </h2>

            <div className="mt-6 grid gap-5">
              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <FieldLabel locale={locale} required>
                  {currentCopy.title}
                </FieldLabel>
                <input
                  name={isUz ? "titleUz" : "titleDe"}
                  required
                  disabled={pending}
                  defaultValue={
                    isUz
                      ? event?.titleUz
                      : event?.titleDe
                  }
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <FieldLabel locale={locale} required>
                  {currentCopy.excerpt}
                </FieldLabel>
                <textarea
                  name={isUz ? "excerptUz" : "excerptDe"}
                  rows={3}
                  required
                  disabled={pending}
                  defaultValue={
                    isUz
                      ? event?.excerptUz
                      : event?.excerptDe
                  }
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <FieldLabel locale={locale} required>
                  {currentCopy.description}
                </FieldLabel>
                <textarea
                  name={isUz ? "descriptionUz" : "descriptionDe"}
                  rows={8}
                  required
                  disabled={pending}
                  defaultValue={listValue(
                    isUz
                      ? event?.descriptionUz
                      : event?.descriptionDe,
                  )}
                  className={inputClassName}
                />
                <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                  {currentCopy.descriptionHint}
                </span>
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <FieldLabel locale={locale} required>
                  {currentCopy.priceLabel}
                </FieldLabel>
                <input
                  name={isUz ? "priceLabelUz" : "priceLabelDe"}
                  required
                  disabled={pending}
                  defaultValue={
                    isUz
                      ? event?.priceLabelUz
                      : event?.priceLabelDe
                  }
                  placeholder={isUz ? "Bepul" : "Kostenlos"}
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
                <FieldLabel locale={locale}>
                  {currentCopy.importantNotes}
                </FieldLabel>
                <textarea
                  name={isUz ? "importantNotesUz" : "importantNotesDe"}
                  rows={5}
                  disabled={pending}
                  defaultValue={listValue(
                    isUz
                      ? event?.importantNotesUz
                      : event?.importantNotesDe,
                  )}
                  className={inputClassName}
                />
                <span className="mt-2 block text-xs font-normal leading-5 text-slate-500 dark:text-slate-400">
                  {currentCopy.importantNotesHint}
                </span>
              </label>
            </div>
          </section>
        );
      })}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.schedule}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.startDate}
            </FieldLabel>
            <input
              name="startDate"
              type="date"
              required
              disabled={pending}
              defaultValue={event?.startDate}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.endDate}
            </FieldLabel>
            <input
              name="endDate"
              type="date"
              disabled={pending}
              defaultValue={event?.endDate ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.timezone}
            </FieldLabel>
            <input
              name="timezone"
              required
              disabled={pending}
              defaultValue={event?.timezone ?? "Europe/Berlin"}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.startTime}
            </FieldLabel>
            <input
              name="startTime"
              type="time"
              disabled={pending}
              defaultValue={event?.startTime ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.endTime}
            </FieldLabel>
            <input
              name="endTime"
              type="time"
              disabled={pending}
              defaultValue={event?.endTime ?? ""}
              className={inputClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.location}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.city}
            </FieldLabel>
            <input
              name="city"
              disabled={pending}
              defaultValue={event?.city ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.bundesland}
            </FieldLabel>
            <select
              name="bundesland"
              disabled={pending}
              defaultValue={event?.bundesland ?? ""}
              className={inputClassName}
            >
              <option value="">
                {currentCopy.noBundesland}
              </option>
              {bundeslaender.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.venueName}
            </FieldLabel>
            <input
              name="venueName"
              disabled={pending}
              defaultValue={event?.venueName ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.address}
            </FieldLabel>
            <input
              name="address"
              disabled={pending}
              defaultValue={event?.address ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.onlineUrl}
            </FieldLabel>
            <input
              name="onlineUrl"
              type="url"
              disabled={pending}
              defaultValue={event?.onlineUrl ?? ""}
              placeholder="https://..."
              className={inputClassName}
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.organizer}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.organizerName}
            </FieldLabel>
            <input
              name="organizerName"
              required
              disabled={pending}
              defaultValue={event?.organizerName}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.organizerUrl}
            </FieldLabel>
            <input
              name="organizerUrl"
              type="url"
              disabled={pending}
              defaultValue={event?.organizerUrl ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.registrationStatus}
            </FieldLabel>
            <select
              name="registrationStatus"
              required
              disabled={pending}
              defaultValue={event?.registrationStatus ?? "open"}
              className={inputClassName}
            >
              {registrationStatuses.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {locale === "de" ? item.de : item.uz}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale}>
              {currentCopy.registrationDeadline}
            </FieldLabel>
            <input
              name="registrationDeadline"
              type="date"
              disabled={pending}
              defaultValue={event?.registrationDeadline ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale}>
              {currentCopy.registrationUrl}
            </FieldLabel>
            <input
              name="registrationUrl"
              type="url"
              disabled={pending}
              defaultValue={event?.registrationUrl ?? ""}
              className={inputClassName}
            />
          </label>
        </div>

        <div className="mt-6">
          <FieldLabel locale={locale}>
            {currentCopy.languages}
          </FieldLabel>

          <div className="mt-3 flex flex-wrap gap-3">
            {languages.map((language) => (
              <label
                key={language.value}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <input
                  type="checkbox"
                  name="languages"
                  value={language.value}
                  disabled={pending}
                  defaultChecked={event?.languages.includes(language.value)}
                  className="size-4 accent-orange-600"
                />
                {language.label}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {currentCopy.source}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.officialSourceName}
            </FieldLabel>
            <input
              name="officialSourceName"
              required
              disabled={pending}
              defaultValue={event?.officialSourceName}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            <FieldLabel locale={locale} required>
              {currentCopy.verifiedAt}
            </FieldLabel>
            <input
              name="verifiedAt"
              type="date"
              required
              disabled={pending}
              defaultValue={event?.verifiedAt}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            <FieldLabel locale={locale} required>
              {currentCopy.officialSourceUrl}
            </FieldLabel>
            <input
              name="officialSourceUrl"
              type="url"
              required
              disabled={pending}
              defaultValue={event?.officialSourceUrl}
              placeholder="https://..."
              className={inputClassName}
            />
          </label>
        </div>
      </section>

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
        >
          {state.error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/15 transition hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? currentCopy.saving
            : mode === "edit"
              ? currentCopy.saveEdit
              : currentCopy.saveCreate}
        </button>
      </div>
    </form>
  );
}
