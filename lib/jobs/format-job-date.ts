import type {
  SupportedJobLocale,
} from "@/types/jobs";

export function formatJobDate(
  date: string,
  locale: SupportedJobLocale,
): string {
  return new Intl.DateTimeFormat(
    locale === "uz"
      ? "uz-UZ"
      : "de-DE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(
    new Date(
      `${date}T12:00:00`,
    ),
  );
}
