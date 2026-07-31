import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import Link, { type LinkProps } from "next/link";

import { cn } from "../../lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export type ButtonProps = SharedButtonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof SharedButtonProps
  >;

export type ButtonLinkProps = SharedButtonProps &
  LinkProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps | keyof SharedButtonProps
  >;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-brand text-white shadow-[0_10px_26px_rgba(37,99,235,0.20)] hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_14px_32px_rgba(37,99,235,0.26)] active:translate-y-0 active:bg-brand-active",
  secondary:
    "border border-border-default bg-surface text-text-primary shadow-sm hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-soft",
  ghost:
    "border border-transparent bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary",
  danger:
    "border border-transparent bg-danger text-white hover:-translate-y-0.5 hover:brightness-95 active:translate-y-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-[0.9375rem]",
  lg: "min-h-14 px-7 py-3.5 text-base",
};

function getButtonClasses({
  variant,
  size,
  fullWidth,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold leading-5 whitespace-nowrap transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses({
        variant,
        size,
        fullWidth,
        className,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClasses({
        variant,
        size,
        fullWidth,
        className,
      })}
      {...props}
    >
      {children}
    </Link>
  );
}

export function ExternalButtonLink({
  children,
  className,
  variant = "secondary",
  size = "md",
  fullWidth = false,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={getButtonClasses({
        variant,
        size,
        fullWidth,
        className,
      })}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}