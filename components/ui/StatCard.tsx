import type { ReactNode } from "react";

import { cn } from "../../lib/cn";
import Card from "./Card";

type StatCardProps = {
  value: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  className?: string;
};

export default function StatCard({
  value,
  label,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card
      as="div"
      variant="flat"
      padding="md"
      className={cn(
        "group hover:border-border-strong",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-3xl font-extrabold tracking-tight text-text-primary">
            {value}
          </p>

          <p className="mt-1 text-sm font-medium text-text-muted">
            {label}
          </p>

          {description && (
            <p className="mt-3 text-sm leading-6 text-text-soft">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}