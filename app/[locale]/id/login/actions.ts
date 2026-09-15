"use server";

import {

  AuthError,

} from "next-auth";

import {

  signIn,

} from "@/auth";

export type PublicLoginErrorField =

  | "email"

  | "password"

  | "credentials"

  | "service"

  | null;

export type PublicLoginState = Readonly<{

  error: string | null;

  errorField: PublicLoginErrorField;

}>;

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

    typeof emailValue === "string"

      ? emailValue.trim()

      : "";

  const password =

    typeof passwordValue === "string"

      ? passwordValue

      : "";

  if (!email) {

    return {

      error:

        locale === "de"

          ? "Bitte geben Sie Ihre E-Mail-Adresse ein."

          : "E-mail manzilini kiriting.",

      errorField:

        "email",

    };

  }

  if (!password) {

    return {

      error:

        locale === "de"

          ? "Bitte geben Sie Ihr Passwort ein."

          : "Parolni kiriting.",

      errorField:

        "password",

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

      error: null,

      errorField: null,

    };

  } catch (error) {

    if (

      error instanceof

      AuthError

    ) {

      if (

        error.type ===

        "CredentialsSignin"

      ) {

        return {

          error:

            locale === "de"

              ? "E-Mail-Adresse oder Passwort ist nicht korrekt. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut."

              : "E-mail yoki parol noto‘g‘ri. Iltimos, ma’lumotlarni tekshirib qayta urinib ko‘ring.",

          errorField:

            "credentials",

        };

      }

      console.error(

        "Public login authentication service error:",

        error.type,

      );

      return {

        error:

          locale === "de"

            ? "Die Anmeldung ist derzeit nicht möglich. Bitte versuchen Sie es später erneut."

            : "Hozircha kirish amalga oshmadi. Birozdan so‘ng qayta urinib ko‘ring.",

        errorField:

          "service",

      };

    }

    // Successful Auth.js redirects are represented by a framework redirect

    // exception and must continue to propagate.

    throw error;

  }

}
