import type { ReactNode } from "react";

import { cn } from "../../lib/cn";
import Container from "./Container";
import Section from "./Section";

type PageHeroProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  stats?: ReactNode;
  aside?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  stats,
  aside,
  className,
  contentClassName,
}: PageHeroProps) {
  return (
    <Section
      tone="surface"
      spacing="xl"
      borderedBottom
      className={className}
    >
      <Container>
        <div
          className={cn(
            aside
              ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)]"
              : "",
            contentClassName,
          )}
        >
          <div className="min-w-0">
            {eyebrow && (
              <div className="page-eyebrow">
                {eyebrow}
              </div>
            )}

            <h1 className="page-title mt-4">
              {title}
            </h1>

            {description && (
              <div className="page-subtitle mt-6">
                {description}
              </div>
            )}

            {actions && (
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            )}

            {stats && (
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats}
              </div>
            )}
          </div>

          {aside && (
            <div className="min-w-0">
              {aside}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}