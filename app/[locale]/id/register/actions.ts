"use server";

import {
  AuthError,
} from "next-auth";
import {
  signIn,
} from "@/auth";
import {
  registerPublicUser,
} from "@/lib/auth/public-user-repository";

export type PublicRegisterState = Readonly<{
  error: string | null;
}>;

export const initialPublicRegisterState: PublicRegisterState = {
  error: null,
};

function getLocale(
  formData: FormData,
): "uz" | "de" {
  return formData.get("locale") === "de"
    ? "de"
    : "uz";
}

function getString(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);

  return typeof value === "string"
    ? value.trim()
    : "";
}

function isValidEmail(
  value: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

export async function publicRegisterAction(
  _previousState: PublicRegisterState,
  formData: FormData,
): Promise<PublicRegisterState> {
  const locale =
    getLocale(
      formData,
    );

  const firstName =
    getString(
      formData,
      "firstName",
    );
  const lastName =
    getString(
      formData,
      "lastName",
    );
  const email =
    getString(
      formData,
      "email",
    );
  const passwordValue =
    formData.get(
      "password",
    );
  const passwordConfirmValue =
    formData.get(
      "passwordConfirm",
    );
  const password =
    typeof passwordValue === "string"
      ? passwordValue
      : "";
  const passwordConfirm =
    typeof passwordConfirmValue === "string"
      ? passwordConfirmValue
      : "";

  if (!firstName) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie Ihren Vornamen ein."
          : "Ismingizni kiriting.",
    };
  }

  if (!lastName) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie Ihren Nachnamen ein."
          : "Familiyangizni kiriting.",
    };
  }

  if (!email) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie Ihre E-Mail-Adresse ein."
          : "E-mail manzilini kiriting.",
    };
  }

  if (
    !isValidEmail(
      email,
    )
  ) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie eine gültige E-Mail-Adresse ein."
          : "To‘g‘ri e-mail manzilini kiriting.",
    };
  }

  if (
    firstName.length > 40 ||
    lastName.length > 40
  ) {
    return {
      error:
        locale === "de"
          ? "Vor- und Nachname dürfen jeweils höchstens 40 Zeichen lang sein."
          : "Ism va familiya har biri 40 ta belgidan oshmasligi kerak.",
    };
  }

  if (!password) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie ein Passwort ein."
          : "Parolni kiriting.",
    };
  }

  if (
    password.length < 8
  ) {
    return {
      error:
        locale === "de"
          ? "Das Passwort muss mindestens 8 Zeichen lang sein."
          : "Parol kamida 8 ta belgidan iborat bo‘lishi kerak.",
    };
  }

  if (!passwordConfirm) {
    return {
      error:
        locale === "de"
          ? "Bitte wiederholen Sie das Passwort."
          : "Parolni takrorlang.",
    };
  }

  if (
    password !==
    passwordConfirm
  ) {
    return {
      error:
        locale === "de"
          ? "Die Passwörter stimmen nicht überein."
          : "Parollar bir xil emas.",
    };
  }

  const displayName =
    `${firstName} ${lastName}`;

  const result =
    await registerPublicUser({
      email,
      password,
      displayName,
      preferredLocale:
        locale,
    });

  if (!result.ok) {
    return {
      error:
        locale === "de"
          ? "Für diese E-Mail-Adresse besteht bereits ein Konto."
          : "Bu e-mail manzili bilan hisob mavjud.",
    };
  }

  try {
    await signIn(
      "public-credentials",
      {
        email,
        password,
        redirectTo:
          `/${locale}/account/profile`,
      },
    );

    return {
      error:
        null,
    };
  } catch (error) {
    if (
      error instanceof
      AuthError
    ) {
      return {
        error:
          locale === "de"
            ? "Das Konto wurde erstellt. Bitte melden Sie sich an."
            : "Hisob yaratildi. Iltimos, tizimga kiring.",
      };
    }

    throw error;
  }
}
