export type MarketContact = Readonly<{
  telegram: string;
  whatsapp: string;
  phone: string;
  email: string;
}>;

export const emptyMarketContact: MarketContact = { telegram: "", whatsapp: "", phone: "", email: "" };

export function validateMarketContact(contact: MarketContact): string | null {
  if (!Object.values(contact).some(Boolean)) return "required";
  if (contact.telegram && !/^@?[A-Za-z0-9_]{5,32}$/.test(contact.telegram)) return "telegram";
  if (contact.whatsapp && !/^\+[1-9]\d{6,14}$/.test(contact.whatsapp)) return "whatsapp";
  if (contact.phone && !/^\+[1-9]\d{6,14}$/.test(contact.phone)) return "phone";
  if (contact.email && (contact.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))) return "email";
  return null;
}

export function contactError(code: string, locale: "uz" | "de"): string {
  const errors: Record<string, [string, string]> = {
    required: ["Kamida bitta aloqa usulini kiriting.", "Bitte geben Sie mindestens eine Kontaktmöglichkeit an."],
    telegram: ["Telegram username noto‘g‘ri.", "Ungültiger Telegram-Benutzername."],
    whatsapp: ["WhatsApp raqamini xalqaro formatda kiriting (+49...).", "WhatsApp-Nummer im internationalen Format eingeben (+49...)."],
    phone: ["Telefon raqamini xalqaro formatda kiriting (+49...).", "Telefonnummer im internationalen Format eingeben (+49...)."],
    email: ["Email manzil noto‘g‘ri.", "Ungültige E-Mail-Adresse."],
  };
  return errors[code]?.[locale === "de" ? 1 : 0] ?? code;
}
