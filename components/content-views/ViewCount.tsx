type ViewCountProps = Readonly<{
  count: number | undefined;
  locale: string;
  className?: string;
}>;

type IconProps = Readonly<{
  className?: string;
}>;

function EyeIcon({
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M2.75 12s3.25-6 9.25-6 9.25 6 9.25 6-3.25 6-9.25 6S2.75 12 2.75 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="2.75"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function ViewCount({
  count,
  locale,
  className = "",
}: ViewCountProps) {
  const safeCount =
    Number.isFinite(count) &&
    (count ?? 0) >= 0
      ? Math.trunc(count ?? 0)
      : 0;

  const isGerman =
    locale === "de";

  const formattedCount =
    new Intl.NumberFormat(
      isGerman
        ? "de-DE"
        : "uz-UZ",
    ).format(safeCount);

  const label =
    isGerman
      ? `${formattedCount} Aufrufe`
      : `${formattedCount} marta ko‘rilgan`;

  return (
    <span
      aria-label={label}
      className={`inline-flex items-center gap-1.5 tabular-nums ${className}`}
      title={label}
    >
      <EyeIcon className="size-4 shrink-0" />
      <span>{formattedCount}</span>
    </span>
  );
}
