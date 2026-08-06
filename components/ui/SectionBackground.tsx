type SectionBackgroundProps = Readonly<{
  variant?: "emerald" | "blue";
}>;

export default function SectionBackground({
  variant = "emerald",
}: SectionBackgroundProps) {
  const primary =
    variant === "emerald"
      ? "bg-emerald-300/25 dark:bg-emerald-500/10"
      : "bg-blue-300/25 dark:bg-blue-500/10";

  const secondary =
    variant === "emerald"
      ? "bg-cyan-300/20 dark:bg-cyan-500/10"
      : "bg-violet-300/20 dark:bg-violet-500/10";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className={`absolute -left-32 top-12 size-80 rounded-full blur-3xl ${primary}`}
      />
      <div
        className={`absolute -right-40 bottom-0 size-96 rounded-full blur-3xl ${secondary}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_52%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.34),transparent_55%)]" />
    </div>
  );
}
