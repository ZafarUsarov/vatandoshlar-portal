import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";

type ContainerSize = "default" | "narrow" | "wide" | "full";

type ContainerOwnProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

type ContainerProps<T extends ElementType = "div"> =
  ContainerOwnProps<T> &
    Omit<
      ComponentPropsWithoutRef<T>,
      keyof ContainerOwnProps<T>
    >;

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

export default function Container<
  T extends ElementType = "div",
>({
  as,
  children,
  className,
  size = "default",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}