import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";

export type CardVariant =
  | "default"
  | "interactive"
  | "flat"
  | "glass"
  | "dark";

export type CardPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";

type CardProps<T extends ElementType = "article"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "color"
>;

const variantClasses: Record<CardVariant, string> = {
  default:
    "border border-border-default bg-surface text-foreground shadow-sm",
  interactive:
    "border border-border-default bg-surface text-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-lg",
  flat:
    "border border-border-default bg-surface-soft text-foreground",
  glass:
    "glass-surface text-foreground",
  dark:
    "border border-white/10 bg-white/5 text-white",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 sm:p-10",
};

export default function Card<
  T extends ElementType = "article",
>({
  as,
  children,
  className,
  variant = "default",
  padding = "md",
  ...props
}: CardProps<T>) {
  const Component = as ?? "article";

  return (
    <Component
      className={cn(
        "rounded-3xl transition-colors duration-300",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-xl font-bold tracking-tight text-text-primary",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm leading-7 text-text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap items-center gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}