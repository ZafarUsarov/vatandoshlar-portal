export function formatNewsDate(
  value: string,
  locale: string,
): string {
  return new Intl.DateTimeFormat(
    locale === "de"
      ? "de-DE"
      : "uz-UZ",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(
    new Date(value),
  );
}
