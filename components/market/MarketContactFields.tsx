import type { MarketContact } from "@/lib/market/market-contact";

const control = "min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export default function MarketContactFields({ locale, values, disabled }: { locale: "uz" | "de"; values: MarketContact; disabled: boolean }) {
  const de = locale === "de";
  const fields = [
    { name: "telegram", label: "Telegram", placeholder: "@username", maxLength: 33 },
    { name: "whatsapp", label: "WhatsApp", placeholder: "+491701234567", maxLength: 16 },
    { name: "phone", label: de ? "Telefon" : "Telefon", placeholder: "+491701234567", maxLength: 16 },
    { name: "email", label: "Email", placeholder: "name@example.com", maxLength: 254 },
  ] as const;
  return <fieldset className="space-y-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
    <legend className="px-2 font-semibold">{de ? "Kontaktmöglichkeiten" : "Bog‘lanish usullari"}</legend>
    <p className="text-sm text-slate-600 dark:text-slate-300">{de ? "Mindestens eine Angabe ist erforderlich. Nur eingegebene Angaben werden öffentlich angezeigt. Telefonnummern bitte mit Ländervorwahl (+49...) angeben." : "Kamida bittasini kiriting. Faqat kiritilgan ma’lumotlar ommaga ko‘rinadi. Telefon raqamlarini xalqaro formatda (+49...) kiriting."}</p>
    <div className="grid gap-4 sm:grid-cols-2">{fields.map(field => <div key={field.name}>
      <label htmlFor={`market-contact-${field.name}`} className="mb-2 block font-medium">{field.label}</label>
      <input id={`market-contact-${field.name}`} name={field.name} type={field.name === "email" ? "email" : "text"} autoComplete={field.name === "email" ? "email" : field.name === "phone" ? "tel" : "off"} defaultValue={values[field.name]} placeholder={field.placeholder} maxLength={field.maxLength} disabled={disabled} className={control} />
    </div>)}</div>
  </fieldset>;
}
