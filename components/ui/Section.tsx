import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";

type SectionTone =
  | "page"
  | "surface"
  | "soft"
  | "muted"
  | "dark"
  | "transparent";

type SectionSpacing =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  borderedTop?: boolean;
  borderedBottom?: boolean;
} & Omit<
  ComponentPropsWithoutRef<T>,
  | "as"
  | "children"
  | "className"
  | "color"
>;

const toneClasses: Record<SectionTone, string> = {
  page: "bg-page text-foreground",
  surface: "bg-surface text-foreground",
  soft: "bg-surface-soft text-foreground",
  muted: "bg-surface-muted text-foreground",
  dark:
    "bg-slate-950 text-white dark:bg-black",
  transparent: "bg-transparent text-foreground",
};

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-16",
  lg: "py-16 sm:py-20",
  xl: "py-20 sm:py-24",
};

export default function Section<
  T extends ElementType = "section",
>({
  as,
  children,
  className,
  tone = "page",
  spacing = "lg",
  borderedTop = false,
  borderedBottom = false,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        "transition-colors duration-300",
        toneClasses[tone],
        spacingClasses[spacing],
        borderedTop && "border-t border-border-default",
        borderedBottom && "border-b border-border-default",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}