import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";

export type BadgeVariant =
  | "primary"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "danger";

type BadgeProps<T extends ElementType = "span"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "color"
>;

const variantClasses: Record<BadgeVariant, string> = {
  primary:
    "border-brand/25 bg-brand-soft text-brand",
  accent:
    "border-accent/25 bg-accent-soft text-accent",
  neutral:
    "border-border-default bg-surface-muted text-text-muted",
  success:
    "border-success/25 bg-[var(--success-soft)] text-success",
  warning:
    "border-warning/25 bg-[var(--warning-soft)] text-warning",
  danger:
    "border-danger/25 bg-[var(--danger-soft)] text-danger",
};

export default function Badge<
  T extends ElementType = "span",
>({
  as,
  children,
  className,
  variant = "neutral",
  ...props
}: BadgeProps<T>) {
  const Component = as ?? "span";

  return (
    <Component
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold leading-4",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}