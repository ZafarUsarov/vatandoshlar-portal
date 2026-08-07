import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}

export default function Reveal({
  children,
  className = "",
}: RevealProps) {
  return <div className={className}>{children}</div>;
}
