"use client";

import {
  useActionState,
  type ChangeEvent,
} from "react";

import type {
  SupportContributionStatus,
  SupportCurrency,
  SupportPaymentMethod,
  SupportVisibility,
} from "@/lib/support/admin-support-repository";

export type SupportContributionActionState = {
  error: string | null;
};

type SupportContributionFormAction = (
  previousState: SupportContributionActionState,
  formData: FormData,
) => Promise<SupportContributionActionState>;

type SupportContributionInitialValues = {
  supporterName: string;
  amount: string;
  currency: SupportCurrency;
  amountEur: string;
  paymentMethod: SupportPaymentMethod;
  visibility: SupportVisibility;
  status: SupportContributionStatus;
  contributedDate: string;
  note: string;
};

type SupportContributionFormProps = {
  locale: "uz" | "de";
  mode: "create" | "edit";
  formAction: SupportContributionFormAction;
  initialValues?: SupportContributionInitialValues;
};

const copy = {
  uz: {
    supporterName: "Qo‘llab-quvvatlovchi nomi",
    supporterNameHint:
      "Public holatda majburiy. Anonymous holatda bo‘sh qoldirish mumkin.",
    amount: "Original summa",
    currency: "Valyuta",
    amountEur: "EUR ekvivalenti",
    amountEurHint:
      "Ranking uchun transaction kiritilgan paytdagi EUR qiymati.",
    paymentMethod: "To‘lov usuli",
    visibility: "Public ko‘rinish",
    status: "Holat",
    contributedDate: "To‘lov sanasi",
    note: "Ichki izoh",
    noteHint:
      "Faqat admin uchun. Public sahifada ko‘rsatilmaydi.",
    public: "Public",
    anonymous: "Anonymous",
    confirmed: "Tasdiqlangan",
    cancelled: "Bekor qilingan",
    paypal: "PayPal",
    taps: "Taps",
    save: "Saqlash",
    create: "Contribution qo‘shish",
    saving: "Saqlanmoqda…",
  },
  de: {
    supporterName: "Name des Unterstützers",
    supporterNameHint:
      "Bei Public erforderlich. Bei Anonymous kann das Feld leer bleiben.",
    amount: "Originalbetrag",
    currency: "Währung",
    amountEur: "EUR-Gegenwert",
    amountEurHint:
      "EUR-Wert zum Zeitpunkt der Erfassung für die Rangliste.",
    paymentMethod: "Zahlungsmethode",
    visibility: "Öffentliche Sichtbarkeit",
    status: "Status",
    contributedDate: "Zahlungsdatum",
    note: "Interne Notiz",
    noteHint:
      "Nur für Admins. Wird öffentlich nicht angezeigt.",
    public: "Öffentlich",
    anonymous: "Anonym",
    confirmed: "Bestätigt",
    cancelled: "Storniert",
    paypal: "PayPal",
    taps: "Taps",
    save: "Speichern",
    create: "Beitrag hinzufügen",
    saving: "Wird gespeichert…",
  },
} as const;

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function SupportContributionForm({
  locale,
  mode,
  formAction,
  initialValues,
}: SupportContributionFormProps) {
  const currentCopy =
    locale === "de" ? copy.de : copy.uz;

  const defaults: SupportContributionInitialValues =
    initialValues ?? {
      supporterName: "",
      amount: "",
      currency: "EUR",
      amountEur: "",
      paymentMethod: "paypal",
      visibility: "public",
      status: "confirmed",
      contributedDate: todayIsoDate(),
      note: "",
    };

  const [state, action, pending] =
    useActionState(formAction, {
      error: null,
    });

  function handleCurrencyChange(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    const form = event.currentTarget.form;

    if (!form) {
      return;
    }

    const amountInput = form.elements.namedItem(
      "amount",
    );

    const eurInput = form.elements.namedItem(
      "amountEur",
    );

    if (
      event.currentTarget.value === "EUR" &&
      amountInput instanceof HTMLInputElement &&
      eurInput instanceof HTMLInputElement &&
      !eurInput.value
    ) {
      eurInput.value = amountInput.value;
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500";

  const labelClass =
    "text-sm font-bold text-slate-800 dark:text-slate-200";

  return (
    <form
      action={action}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
    >
      {state.error && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className={labelClass}>
            {currentCopy.supporterName}
          </span>
          <input
            name="supporterName"
            type="text"
            maxLength={120}
            defaultValue={defaults.supporterName}
            className={inputClass}
          />
          <span className="mt-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {currentCopy.supporterNameHint}
          </span>
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.amount}
          </span>
          <input
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder={
              defaults.currency === "UZS"
                ? "100000"
                : "10.00"
            }
            defaultValue={defaults.amount}
            required
            className={inputClass}
          />
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.currency}
          </span>
          <select
            name="currency"
            defaultValue={defaults.currency}
            onChange={handleCurrencyChange}
            className={inputClass}
          >
            <option value="EUR">EUR</option>
            <option value="UZS">UZS</option>
          </select>
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.amountEur}
          </span>
          <input
            name="amountEur"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="10.00"
            defaultValue={defaults.amountEur}
            required
            className={inputClass}
          />
          <span className="mt-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {currentCopy.amountEurHint}
          </span>
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.paymentMethod}
          </span>
          <select
            name="paymentMethod"
            defaultValue={defaults.paymentMethod}
            className={inputClass}
          >
            <option value="paypal">
              {currentCopy.paypal}
            </option>
            <option value="taps">
              {currentCopy.taps}
            </option>
          </select>
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.visibility}
          </span>
          <select
            name="visibility"
            defaultValue={defaults.visibility}
            className={inputClass}
          >
            <option value="public">
              {currentCopy.public}
            </option>
            <option value="anonymous">
              {currentCopy.anonymous}
            </option>
          </select>
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.status}
          </span>
          <select
            name="status"
            defaultValue={defaults.status}
            className={inputClass}
          >
            <option value="confirmed">
              {currentCopy.confirmed}
            </option>
            <option value="cancelled">
              {currentCopy.cancelled}
            </option>
          </select>
        </label>

        <label>
          <span className={labelClass}>
            {currentCopy.contributedDate}
          </span>
          <input
            name="contributedDate"
            type="date"
            defaultValue={defaults.contributedDate}
            required
            className={inputClass}
          />
        </label>

        <label className="sm:col-span-2">
          <span className={labelClass}>
            {currentCopy.note}
          </span>
          <textarea
            name="note"
            rows={4}
            maxLength={1000}
            defaultValue={defaults.note}
            className={`${inputClass} resize-y`}
          />
          <span className="mt-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">
            {currentCopy.noteHint}
          </span>
        </label>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
        >
          {pending
            ? currentCopy.saving
            : mode === "create"
              ? currentCopy.create
              : currentCopy.save}
        </button>
      </div>
    </form>
  );
}
