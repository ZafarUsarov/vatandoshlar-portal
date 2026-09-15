"use server";

import {
  registerPublicUser,
} from "@/lib/auth/public-user-repository";
import {
  createAuthTokenForUser,
} from "@/lib/auth/public-auth-token-repository";
import {
  sendVerificationEmail,
} from "@/lib/email/auth-email";

export type PublicRegisterState = Readonly<{
  error: string | null;
  success: string | null;
}>;

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
      success: null,
    };
  }

  if (!lastName) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie Ihren Nachnamen ein."
          : "Familiyangizni kiriting.",
      success: null,
    };
  }

  if (!email) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie Ihre E-Mail-Adresse ein."
          : "E-mail manzilini kiriting.",
      success: null,
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
      success: null,
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
      success: null,
    };
  }

  if (!password) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie ein Passwort ein."
          : "Parolni kiriting.",
      success: null,
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
      success: null,
    };
  }

  if (!passwordConfirm) {
    return {
      error:
        locale === "de"
          ? "Bitte wiederholen Sie das Passwort."
          : "Parolni takrorlang.",
      success: null,
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
      success: null,
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
      success: null,
    };
  }

  try {
    const token =
      await createAuthTokenForUser(
        result.userId,
        "email_verification",
        24 * 60,
      );

    await sendVerificationEmail(
      email.trim().toLowerCase(),
      token,
      locale,
    );
  } catch (mailError) {
    console.error(
      "Registration verification email failed",
      {
        userId: result.userId,
        error: mailError,
      },
    );

    return {
      error: null,
      success:
        locale === "de"
          ? "Konto erstellt. Die Bestätigungs-E-Mail konnte gerade nicht versendet werden. Bitte nutzen Sie „Bestätigungs-E-Mail erneut senden“."
          : "Hisob yaratildi. Tasdiqlash xatini hozir yuborib bo‘lmadi. “Tasdiqlash xatini qayta yuborish” orqali qayta urinib ko‘ring.",
    };
  }

  return {
    error: null,
    success:
      locale === "de"
        ? "Konto erstellt. Bitte prüfen Sie Ihre E-Mails und bestätigen Sie Ihre Adresse."
        : "Hisob yaratildi. E-mailingizni tekshirib, manzilni tasdiqlang.",
  };
}
