"use server";

import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  createAdminSupportContribution,
  type SupportContributionStatus,
  type SupportCurrency,
  type SupportPaymentMethod,
  type SupportVisibility,
} from "@/lib/support/admin-support-repository";

export type SupportCreateActionState = {
  error: string | null;
};

function getString(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isCurrency(
  value: string,
): value is SupportCurrency {
  return value === "EUR" || value === "UZS";
}

function isPaymentMethod(
  value: string,
): value is SupportPaymentMethod {
  return value === "paypal" || value === "taps";
}

function isVisibility(
  value: string,
): value is SupportVisibility {
  return (
    value === "public" ||
    value === "anonymous"
  );
}

function isStatus(
  value: string,
): value is SupportContributionStatus {
  return (
    value === "confirmed" ||
    value === "cancelled"
  );
}

function parseEurCents(
  value: string,
): number | null {
  const normalized = value
    .replace(",", ".")
    .trim();

  if (
    !/^\d+(?:\.\d{1,2})?$/.test(
      normalized,
    )
  ) {
    return null;
  }

  const [whole, fraction = ""] =
    normalized.split(".");

  const cents =
    Number(whole) * 100 +
    Number(fraction.padEnd(2, "0"));

  return Number.isSafeInteger(cents) &&
    cents > 0
    ? cents
    : null;
}

function parseOriginalAmount(
  value: string,
  currency: SupportCurrency,
): number | null {
  if (currency === "EUR") {
    return parseEurCents(value);
  }

  const normalized = value
    .replace(/\s+/g, "")
    .trim();

  if (!/^\d+$/.test(normalized)) {
    return null;
  }

  const amount = Number(normalized);

  return Number.isSafeInteger(amount) &&
    amount > 0
    ? amount
    : null;
}

function isValidDate(
  value: string,
): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(
    value,
  );
}

function toContributionTimestamp(
  value: string,
): string {
  return `${value}T12:00:00.000Z`;
}


export async function createSupportContributionAction(
  _previousState: SupportCreateActionState,
  formData: FormData,
): Promise<SupportCreateActionState> {
  const locale = await getLocale();

  const appLocale =
    locale === "de" ? "de" : "uz";

  await requireAdmin(appLocale);

  const supporterName = getString(
    formData,
    "supporterName",
  );

  const amountValue = getString(
    formData,
    "amount",
  );

  const currencyValue = getString(
    formData,
    "currency",
  );

  const amountEurValue = getString(
    formData,
    "amountEur",
  );

  const paymentMethodValue = getString(
    formData,
    "paymentMethod",
  );

  const visibilityValue = getString(
    formData,
    "visibility",
  );

  const statusValue = getString(
    formData,
    "status",
  );

  const contributedDate = getString(
    formData,
    "contributedDate",
  );

  const note = getString(
    formData,
    "note",
  );

  if (
    !isCurrency(currencyValue) ||
    !isPaymentMethod(paymentMethodValue) ||
    !isVisibility(visibilityValue) ||
    !isStatus(statusValue)
  ) {
    return {
      error:
        appLocale === "de"
          ? "Mindestens eine Auswahl ist ungültig."
          : "Tanlangan qiymatlardan biri noto‘g‘ri.",
    };
  }

  if (
    visibilityValue === "public" &&
    !supporterName
  ) {
    return {
      error:
        appLocale === "de"
          ? "Für einen öffentlichen Eintrag ist ein Name erforderlich."
          : "Public contribution uchun ism majburiy.",
    };
  }

  if (
    supporterName.length > 120 ||
    note.length > 1000
  ) {
    return {
      error:
        appLocale === "de"
          ? "Name oder interne Notiz ist zu lang."
          : "Ism yoki ichki izoh juda uzun.",
    };
  }

  const amountMinor = parseOriginalAmount(
    amountValue,
    currencyValue,
  );

  const amountEurCents = parseEurCents(
    amountEurValue,
  );

  if (
    amountMinor === null ||
    amountEurCents === null
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie gültige positive Beträge ein."
          : "Musbat va to‘g‘ri summalarni kiriting.",
    };
  }

  if (!isValidDate(contributedDate)) {
    return {
      error:
        appLocale === "de"
          ? "Bitte geben Sie ein gültiges Zahlungsdatum ein."
          : "To‘g‘ri to‘lov sanasini kiriting.",
    };
  }

  try {
    await createAdminSupportContribution({
      supporterName:
        visibilityValue === "anonymous"
          ? null
          : supporterName,
      amountMinor,
      currency: currencyValue,
      amountEurCents,
      paymentMethod: paymentMethodValue,
      visibility: visibilityValue,
      status: statusValue,
      contributedAt:
        toContributionTimestamp(
          contributedDate,
        ),
      note: note || null,
    });
  } catch (error) {
    console.error(
      "Failed to create support contribution:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Der Beitrag konnte nicht gespeichert werden. Bitte versuchen Sie es erneut."
          : "Contributionni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
    };
  }

  return redirect({
    href: "/admin/support",
    locale: appLocale,
  });
}
