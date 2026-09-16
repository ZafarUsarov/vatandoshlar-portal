"use server";

import { signIn } from "@/auth";
import { redirect } from "@/i18n/navigation";
import {
  PRIVACY_VERSION,
  setGoogleAuthIntent,
} from "@/lib/auth/google-auth-intent";
import {
  registerPublicUser,
} from "@/lib/auth/public-user-repository";
import {
  createAuthTokenForUser,
} from "@/lib/auth/public-auth-token-repository";
import {
  sendVerificationEmail,
} from "@/lib/email/auth-email";

export type PublicRegisterValues = Readonly<{
  firstName: string;
  lastName: string;
  email: string;
  privacyAccepted: boolean;
}>;

export type PublicRegisterState = Readonly<{
  error: string | null;
  success: string | null;
  values: PublicRegisterValues;
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

function getSafeValues(
  formData: FormData,
): PublicRegisterValues {
  return {
    firstName: getString(formData, "firstName"),
    lastName: getString(formData, "lastName"),
    email: getString(formData, "email"),
    privacyAccepted:
      formData.get("privacyAccepted") === "on",
  };
}

export async function publicRegisterAction(
  _previousState: PublicRegisterState,
  formData: FormData,
): Promise<PublicRegisterState> {
  const locale =
    getLocale(
      formData,
    );

  const values =
    getSafeValues(
      formData,
    );

  const {
    firstName,
    lastName,
    email,
    privacyAccepted,
  } = values;

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

  const failure = (
    error: string,
  ): PublicRegisterState => ({
    error,
    success: null,
    values,
  });

  if (!privacyAccepted) {
    return failure(
      locale === "de"
        ? "Bitte bestätigen Sie die Datenschutzerklärung, um ein Konto zu erstellen."
        : "Hisob yaratish uchun Maxfiylik siyosati bilan tanishganingizni tasdiqlang.",
    );
  }

  if (!firstName) {
    return failure(
      locale === "de"
        ? "Bitte geben Sie Ihren Vornamen ein."
        : "Ismingizni kiriting.",
    );
  }

  if (!lastName) {
    return failure(
      locale === "de"
        ? "Bitte geben Sie Ihren Nachnamen ein."
        : "Familiyangizni kiriting.",
    );
  }

  if (!email) {
    return failure(
      locale === "de"
        ? "Bitte geben Sie Ihre E-Mail-Adresse ein."
        : "E-mail manzilini kiriting.",
    );
  }

  if (
    !isValidEmail(
      email,
    )
  ) {
    return failure(
      locale === "de"
        ? "Bitte geben Sie eine gültige E-Mail-Adresse ein."
        : "To‘g‘ri e-mail manzilini kiriting.",
    );
  }

  if (
    firstName.length > 40 ||
    lastName.length > 40
  ) {
    return failure(
      locale === "de"
        ? "Vor- und Nachname dürfen jeweils höchstens 40 Zeichen lang sein."
        : "Ism va familiya har biri 40 ta belgidan oshmasligi kerak.",
    );
  }

  if (!password) {
    return failure(
      locale === "de"
        ? "Bitte geben Sie ein Passwort ein."
        : "Parolni kiriting.",
    );
  }

  if (
    password.length < 8
  ) {
    return failure(
      locale === "de"
        ? "Das Passwort muss mindestens 8 Zeichen lang sein."
        : "Parol kamida 8 ta belgidan iborat bo‘lishi kerak.",
    );
  }

  if (!passwordConfirm) {
    return failure(
      locale === "de"
        ? "Bitte wiederholen Sie das Passwort."
        : "Parolni takrorlang.",
    );
  }

  if (
    password !==
    passwordConfirm
  ) {
    return failure(
      locale === "de"
        ? "Die Passwörter stimmen nicht überein."
        : "Parollar bir xil emas.",
    );
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
      privacyVersion: PRIVACY_VERSION,
    });

  if (!result.ok) {
    return failure(
      locale === "de"
        ? "Für diese E-Mail-Adresse besteht bereits ein Konto."
        : "Bu e-mail manzili bilan hisob mavjud.",
    );
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
      values,
    };
  }

  return {
    error: null,
    success:
      locale === "de"
        ? "Konto erstellt. Bitte prüfen Sie Ihre E-Mails und bestätigen Sie Ihre Adresse."
        : "Hisob yaratildi. E-mailingizni tekshirib, manzilni tasdiqlang.",
    values,
  };
}

export async function googleRegisterAction(
  formData: FormData,
): Promise<void> {
  const locale =
    getLocale(formData);

  if (
    formData.get("privacyAccepted") !== "on"
  ) {
    return redirect({
      href: "/id/register?privacyError=1",
      locale,
    });
  }

  await setGoogleAuthIntent({
    mode: "register",
    locale,
    privacyAccepted: true,
  });

  await signIn("google", {
    redirectTo: `/${locale}/account/profile`,
  });
}
