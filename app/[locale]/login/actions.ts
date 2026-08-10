"use server";

import { AuthError } from "next-auth";
import { getLocale } from "next-intl/server";

import { signIn } from "@/auth";
import { getPathname } from "@/i18n/navigation";

export type LoginActionState = {
  error: string | null;
};

export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const emailValue =
    formData.get("email");

  const passwordValue =
    formData.get("password");

  const email =
    typeof emailValue === "string"
      ? emailValue.trim()
      : "";

  const password =
    typeof passwordValue === "string"
      ? passwordValue
      : "";

  const locale = await getLocale();

  if (!email || !password) {
    return {
      error:
        locale === "de"
          ? "Bitte geben Sie E-Mail-Adresse und Passwort ein."
          : "E-mail va parolni kiriting.",
    };
  }

  const redirectTo = getPathname({
    locale,
    href: "/admin",
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });

    return {
      error: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
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