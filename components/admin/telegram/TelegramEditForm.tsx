"use client";

import { useActionState } from "react";

import type {
  AdminTelegramGroup,
} from "@/lib/telegram/admin-telegram-repository";

import type {
  TelegramEditActionState,
} from "@/app/[locale]/admin/telegram/[id]/actions";

type TelegramEditFormProps = {
  locale: "uz" | "de";
  group: AdminTelegramGroup;
  formAction: (
    previousState: TelegramEditActionState,
    formData: FormData,
  ) => Promise<TelegramEditActionState>;
};

const initialState: TelegramEditActionState = {
  error: null,
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export default function TelegramEditForm({
  locale,
  group,
  formAction,
}: TelegramEditFormProps) {
  const [state, action, pending] =
    useActionState(
      formAction,
      initialState,
    );

  const copy =
    locale === "de"
      ? {
          core: "Grunddaten",
          localized: "Lokalisierte Inhalte",
          bundesland: "Bundesland",
          shortName: "Kurzcode",
          href: "Telegram-Link",
          buttonType: "Typ",
          groupStatus: "Gruppenstatus",
          sortOrder: "Sortierung",
          customNameUz: "Benutzerdefinierter Name (UZ)",
          customNameDe: "Benutzerdefinierter Name (DE)",
          customDescriptionUz: "Benutzerdefinierte Beschreibung (UZ)",
          customDescriptionDe: "Benutzerdefinierte Beschreibung (DE)",
          bot: "Bot",
          group: "Gruppe",
          active: "Aktiv",
          comingSoon: "Demnächst",
          save: "Änderungen speichern",
          saving: "Wird gespeichert…",
          note:
            "Bei aktivem Status ist ein Telegram-Link erforderlich. Benutzerdefinierte Namen und Beschreibungen müssen jeweils in UZ und DE gemeinsam ausgefüllt werden.",
        }
      : {
          core: "Asosiy ma’lumotlar",
          localized: "Lokalizatsiya qilingan kontent",
          bundesland: "Bundesland",
          shortName: "Qisqa kod",
          href: "Telegram havolasi",
          buttonType: "Turi",
          groupStatus: "Guruh holati",
          sortOrder: "Tartib raqami",
          customNameUz: "Custom nom (UZ)",
          customNameDe: "Custom nom (DE)",
          customDescriptionUz: "Custom tavsif (UZ)",
          customDescriptionDe: "Custom tavsif (DE)",
          bot: "Bot",
          group: "Guruh",
          active: "Faol",
          comingSoon: "Tez orada",
          save: "O‘zgarishlarni saqlash",
          saving: "Saqlanmoqda…",
          note:
            "Faol holat uchun Telegram havolasi majburiy. Custom nom va tavsiflar UZ va DE tillarida juft holda to‘ldirilishi kerak.",
        };

  return (
    <form
      action={action}
      className="space-y-6"
    >
      <input
        type="hidden"
        name="groupId"
        value={group.id}
      />

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {copy.core}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.bundesland}
            <input
              name="bundesland"
              required
              disabled={pending}
              defaultValue={group.bundesland}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.shortName}
            <input
              name="shortName"
              required
              disabled={pending}
              defaultValue={group.shortName}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100 md:col-span-2">
            {copy.href}
            <input
              name="href"
              type="url"
              disabled={pending}
              defaultValue={group.href ?? ""}
              placeholder="https://t.me/..."
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.buttonType}
            <select
              name="buttonType"
              required
              disabled={pending}
              defaultValue={group.buttonType}
              className={inputClassName}
            >
              <option value="group">
                {copy.group}
              </option>
              <option value="bot">
                {copy.bot}
              </option>
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.groupStatus}
            <select
              name="groupStatus"
              required
              disabled={pending}
              defaultValue={group.groupStatus}
              className={inputClassName}
            >
              <option value="active">
                {copy.active}
              </option>
              <option value="coming-soon">
                {copy.comingSoon}
              </option>
            </select>
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.sortOrder}
            <input
              name="sortOrder"
              type="number"
              min={0}
              step={1}
              required
              disabled={pending}
              defaultValue={group.sortOrder}
              className={inputClassName}
            />
          </label>
        </div>

        <p className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-800 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
          {copy.note}
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          {copy.localized}
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.customNameUz}
            <input
              name="customNameUz"
              disabled={pending}
              defaultValue={group.customNameUz ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.customNameDe}
            <input
              name="customNameDe"
              disabled={pending}
              defaultValue={group.customNameDe ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.customDescriptionUz}
            <textarea
              name="customDescriptionUz"
              rows={5}
              disabled={pending}
              defaultValue={group.customDescriptionUz ?? ""}
              className={inputClassName}
            />
          </label>

          <label className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {copy.customDescriptionDe}
            <textarea
              name="customDescriptionDe"
              rows={5}
              disabled={pending}
              defaultValue={group.customDescriptionDe ?? ""}
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
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/15 transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950"
        >
          {pending
            ? copy.saving
            : copy.save}
        </button>
      </div>
    </form>
  );
}
