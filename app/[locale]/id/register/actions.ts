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

  const displayNameValue =

    formData.get(

      "displayName",

    );

  const emailValue =

    formData.get(

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

  const displayName =

    typeof displayNameValue ===

    "string"

      ? displayNameValue.trim()

      : "";

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

  const passwordConfirm =

    typeof passwordConfirmValue ===

    "string"

      ? passwordConfirmValue

      : "";

  if (

    !email ||

    !password ||

    !passwordConfirm

  ) {

    return {

      error:

        locale === "de"

          ? "Bitte alle Pflichtfelder ausfüllen."

          : "Majburiy maydonlarni to‘ldiring.",

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

          ? "Bitte eine gültige E-Mail-Adresse eingeben."

          : "To‘g‘ri E-mail manzilini kiriting.",

    };

  }

  if (

    displayName.length > 80

  ) {

    return {

      error:

        locale === "de"

          ? "Der Name darf höchstens 80 Zeichen lang sein."

          : "Ism 80 ta belgidan oshmasligi kerak.",

    };

  }

  if (

    password.length < 12

  ) {

    return {

      error:

        locale === "de"

          ? "Das Passwort muss mindestens 12 Zeichen lang sein."

          : "Parol kamida 12 ta belgidan iborat bo‘lishi kerak.",

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

          : "Parollar bir-biriga mos emas.",

    };

  }

  const result =

    await registerPublicUser({

      email,

      password,

      displayName:

        displayName || null,

      preferredLocale:

        locale,

    });

  if (!result.ok) {

    return {

      error:

        locale === "de"

          ? "Für diese E-Mail-Adresse besteht bereits ein Konto."

          : "Bu E-mail manzili bilan akkaunt mavjud.",

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

            : "Akkaunt yaratildi. Iltimos, tizimga kiring.",

      };

    }

    throw error;

  }

}
