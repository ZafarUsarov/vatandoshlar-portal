import type { ReactNode } from "react";

type GuideInfoBoxProps = Readonly<{
  title: string;
  children: ReactNode;
  variant?: "info" | "warning";
}>;

export default function GuideInfoBox({
  title,
  children,
  variant = "info",
}: GuideInfoBoxProps) {
  const styles =
    variant === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100"
      : "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100";

  return (
    <aside className={`rounded-3xl border p-7 sm:p-8 ${styles}`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 leading-7">{children}</div>
    </aside>
  );
}
