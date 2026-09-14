"use server";

import {
  AuthError,
} from "next-auth";

import {
  signIn,
} from "@/auth";

export type PublicLoginState = Readonly<{
  error: string | null;
}>;

export const initialPublicLoginState: PublicLoginState = {
  error: null,
};

function getLocale(
  formData: FormData,
): "uz" | "de" {
  return formData.get("locale") === "de"
    ? "de"
    : "uz";
}

export async function publicLoginAction(
  _previousState: PublicLoginState,
  formData: FormData,
): Promise<PublicLoginState> {
  const locale =
    getLocale(
      formData,
    );

  const emailValue =
    formData.get(
      "email",
    );

  const passwordValue =
    formData.get(
      "password",
    );

  const email =
    typeof emailValue ===
    "string"
      ? emailValue.trim()
      : "";

  const password =
    typeof passwordValue ===
    "string"
      ? passwordValue
      : "";

  if (
    !email ||
    !password
  ) {
    return {
      error:
        locale === "de"
          ? "Bitte E-Mail-Adresse und Passwort eingeben."
          : "E-mail va parolni kiriting.",
    };
  }

  try {
    await signIn(
      "public-credentials",
      {
        email,
        password,
        redirectTo:
          `/${locale}/account`,
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
            ? "E-Mail-Adresse oder Passwort ist nicht korrekt."
            : "E-mail yoki parol noto‘g‘ri.",
      };
    }

    throw error;
  }
}
