type Props = Readonly<{ service: string; locale: "uz" | "de"; email: string }>;

export default function ServiceContactLink({ service, locale, email }: Props) {
  const de = locale === "de";
  const subject = de
    ? `UzDe — Anfrage zu ${service}`
    : `UzDe — ${service} böyiça murojaat`;
  const body = de
    ? `Guten Tag,\n\nich interessiere mich für folgende Dienstleistung: ${service}.\n\nMeine Anfrage:\n\nMit freundlichen Grüßen`
    : `Assalomu alaykum,\n\nMen quyidagi xizmat böyiça boǵlanmoqçiman: ${service}.\n\nMening talabim:\n\nHurmat bilan`;
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <a href={href} className="mt-4 inline-flex min-h-11 items-center gap-3 border-b border-teal-700 text-sm font-semibold text-teal-800 transition-colors hover:text-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-teal-300 dark:text-teal-300 dark:hover:text-teal-200">
      {de ? "Kontakt aufnehmen" : "Boǵlaniş"} <span aria-hidden="true">↗</span>
    </a>
  );
}
