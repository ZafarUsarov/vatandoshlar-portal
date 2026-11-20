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
    <aside className={`border-l-[3px] border-y-0 border-r-0 px-4 py-3 sm:px-5 ${styles}` }>
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="mt-1.5 text-sm leading-6 sm:text-base sm:leading-7">{children}</div>
    </aside>
  );
}
