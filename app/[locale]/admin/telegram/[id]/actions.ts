"use server";

import { revalidatePath } from "next/cache";
import { getLocale } from "next-intl/server";

import { redirect } from "@/i18n/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import {
  updateAdminTelegramGroup,
  type AdminTelegramButtonType,
  type AdminTelegramGroupInput,
  type AdminTelegramGroupStatus,
} from "@/lib/telegram/admin-telegram-repository";

export type TelegramEditActionState = {
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

function getNullableString(
  formData: FormData,
  key: string,
): string | null {
  const value = getString(
    formData,
    key,
  );

  return value
    ? value
    : null;
}

function isButtonType(
  value: string,
): value is AdminTelegramButtonType {
  return (
    value === "bot" ||
    value === "group"
  );
}

function isGroupStatus(
  value: string,
): value is AdminTelegramGroupStatus {
  return (
    value === "active" ||
    value === "coming-soon"
  );
}

function isValidHttpUrl(
  value: string,
): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function hasPair(
  first: string | null,
  second: string | null,
): boolean {
  return (
    (
      first === null &&
      second === null
    )
    ||
    (
      first !== null &&
      second !== null
    )
  );
}

function isUniqueViolation(
  error: unknown,
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function updateTelegramGroupAction(
  _previousState: TelegramEditActionState,
  formData: FormData,
): Promise<TelegramEditActionState> {
  const locale = await getLocale();

  const appLocale: "uz" | "de" =
    locale === "de"
      ? "de"
      : "uz";

  await requireAdmin(appLocale);

  const groupId = getString(formData, "groupId");
  const bundesland = getString(formData, "bundesland");
  const shortName = getString(formData, "shortName").toUpperCase();

  const customNameUz = getNullableString(formData, "customNameUz");
  const customNameDe = getNullableString(formData, "customNameDe");

  const customDescriptionUz = getNullableString(
    formData,
    "customDescriptionUz",
  );

  const customDescriptionDe = getNullableString(
    formData,
    "customDescriptionDe",
  );

  const href = getNullableString(formData, "href");
  const buttonType = getString(formData, "buttonType");
  const groupStatus = getString(formData, "groupStatus");

  const sortOrder = Number(
    getString(
      formData,
      "sortOrder",
    ),
  );

  if (
    !groupId ||
    !bundesland ||
    !shortName ||
    !isButtonType(buttonType) ||
    !isGroupStatus(groupStatus) ||
    !Number.isInteger(sortOrder) ||
    sortOrder < 0
  ) {
    return {
      error:
        appLocale === "de"
          ? "Bitte prüfen Sie alle Pflichtfelder."
          : "Barcha majburiy maydonlarni tekshiring.",
    };
  }

  if (
    !hasPair(
      customNameUz,
      customNameDe,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Benutzerdefinierte Namen müssen in UZ und DE gemeinsam ausgefüllt werden."
          : "Custom nomlar UZ va DE tillarida birga to‘ldirilishi kerak.",
    };
  }

  if (
    !hasPair(
      customDescriptionUz,
      customDescriptionDe,
    )
  ) {
    return {
      error:
        appLocale === "de"
          ? "Benutzerdefinierte Beschreibungen müssen in UZ und DE gemeinsam ausgefüllt werden."
          : "Custom tavsiflar UZ va DE tillarida birga to‘ldirilishi kerak.",
    };
  }

  if (
    href &&
    !isValidHttpUrl(href)
  ) {
    return {
      error:
        appLocale === "de"
          ? "Der Telegram-Link muss eine gültige http(s)-URL sein."
          : "Telegram havolasi haqiqiy http(s) URL bo‘lishi kerak.",
    };
  }

  if (
    groupStatus === "active" &&
    !href
  ) {
    return {
      error:
        appLocale === "de"
          ? "Eine aktive Telegram-Gruppe benötigt einen Link."
          : "Faol Telegram guruhi uchun havola majburiy.",
    };
  }

  const input: AdminTelegramGroupInput = {
    bundesland,
    shortName,
    customNameUz,
    customNameDe,
    customDescriptionUz,
    customDescriptionDe,
    href,
    buttonType,
    groupStatus,
    sortOrder,
  };

  try {
    const updated =
      await updateAdminTelegramGroup(
        groupId,
        input,
      );

    if (!updated) {
      return {
        error:
          appLocale === "de"
            ? "Die Telegram-Gruppe wurde nicht gefunden."
            : "Telegram guruhi topilmadi.",
      };
    }
  } catch (error) {
    if (
      isUniqueViolation(error)
    ) {
      return {
        error:
          appLocale === "de"
            ? "Dieser Kurzcode wird bereits verwendet."
            : "Bu qisqa kod allaqachon ishlatilmoqda.",
      };
    }

    console.error(
      "Failed to update Telegram group:",
      error,
    );

    return {
      error:
        appLocale === "de"
          ? "Die Telegram-Gruppe konnte nicht gespeichert werden."
          : "Telegram guruhini saqlab bo‘lmadi.",
    };
  }

  revalidatePath(
    "/[locale]/admin/telegram",
    "page",
  );

  return redirect({
    href: "/admin/telegram",
    locale: appLocale,
  });
}
