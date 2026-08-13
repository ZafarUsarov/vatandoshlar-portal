"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: ReadonlyArray<string>,
): string | null {
  const [activeSectionId, setActiveSectionId] =
    useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement =>
        Boolean(element),
      );

    if (elements.length === 0) {
      return;
    }

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(
              entry.target.id,
              entry.intersectionRatio,
            );
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const nextActiveSection = Array.from(
          visibleSections.entries(),
        ).sort(
          (firstEntry, secondEntry) =>
            secondEntry[1] - firstEntry[1],
        )[0]?.[0];

        if (nextActiveSection) {
          setActiveSectionId(nextActiveSection);
          return;
        }

        const currentScrollPosition = window.scrollY + 160;
        const closestSection = elements
          .filter(
            (element) =>
              element.offsetTop <= currentScrollPosition,
          )
          .at(-1);

        setActiveSectionId(
          closestSection?.id ?? elements[0]?.id ?? null,
        );
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  if (sectionIds.length === 0) {
    return null;
  }

  if (
    activeSectionId &&
    sectionIds.includes(activeSectionId)
  ) {
    return activeSectionId;
  }

  return sectionIds[0] ?? null;
}
