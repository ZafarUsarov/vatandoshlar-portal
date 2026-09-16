import { cookies } from "next/headers";

export const GOOGLE_AUTH_INTENT_COOKIE = "vatandoshlar_google_auth_intent";
export const PRIVACY_VERSION = "2026-09-16";

type Intent = Readonly<{ mode: "login" | "register"; locale: "uz" | "de"; privacyAccepted: boolean }>;

export async function setGoogleAuthIntent(intent: Intent): Promise<void> {
  const store = await cookies();
  store.set(GOOGLE_AUTH_INTENT_COOKIE, JSON.stringify(intent), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 10 * 60,
  });
}

export async function consumeGoogleAuthIntent(): Promise<Intent | null> {
  const store = await cookies();
  const raw = store.get(GOOGLE_AUTH_INTENT_COOKIE)?.value;
  store.delete(GOOGLE_AUTH_INTENT_COOKIE);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Intent>;
    if ((value.mode !== "login" && value.mode !== "register") || (value.locale !== "uz" && value.locale !== "de")) return null;
    return { mode: value.mode, locale: value.locale, privacyAccepted: value.privacyAccepted === true };
  } catch {
    return null;
  }
}
