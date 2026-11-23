"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";
import type { SpecialistCategory } from "@/types/specialist";
import styles from "./SpecialistsCategoryMarquee.module.css";

type Category = "all" | SpecialistCategory;
type Option = { value: Category; label: string };
type Props = Readonly<{
  categories: ReadonlyArray<Option>;
  selectedCategory: Category;
  label: string;
  onSelect: (category: Category) => void;
}>;

type Drag = {
  pointerId: number;
  startX: number;
  startScroll: number;
  active: boolean;
};

export default function SpecialistsCategoryMarquee({
  categories,
  selectedCategory,
  label,
  onSelect,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let cycleWidth = group.getBoundingClientRect().width;

    const normalize = () => {
      if (cycleWidth <= 0 || !desktop.matches) return;
      if (viewport.scrollLeft >= cycleWidth || viewport.scrollLeft < 0) {
        viewport.scrollLeft = ((viewport.scrollLeft % cycleWidth) + cycleWidth) % cycleWidth;
      }
    };
    const updateWidth = () => {
      cycleWidth = group.getBoundingClientRect().width;
      normalize();
    };
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    desktop.addEventListener("change", updateWidth);

    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 64) : 0;
      previous = time;
      if (
        desktop.matches && !reduced.matches &&
        !hoverRef.current && !focusRef.current && !dragRef.current &&
        cycleWidth > 0
      ) {
        viewport.scrollLeft += (cycleWidth / 44000) * elapsed;
        normalize();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", updateWidth);
    };
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || window.innerWidth < 1024) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: event.currentTarget.scrollLeft,
      active: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.active && Math.abs(delta) > 7) {
      drag.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!drag.active) return;
    event.preventDefault();
    const width = groupRef.current?.getBoundingClientRect().width ?? 0;
    let next = drag.startScroll - delta;
    if (width > 0) next = ((next % width) + width) % width;
    event.currentTarget.scrollLeft = next;
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.active) {
      // Suppress only the synthetic click associated with this drag.
      suppressClickRef.current = true;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }
    dragRef.current = null;
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const chips = (duplicate: boolean) => categories.map((option) => {
    const active = selectedCategory === option.value;
    return (
      <button
        key={option.value}
        type="button"
        tabIndex={duplicate ? -1 : 0}
        aria-pressed={duplicate ? undefined : active}
        onClick={() => onSelect(option.value)}
        className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-sm font-medium opacity-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
          active
            ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
            : "border border-zinc-200 bg-transparent text-zinc-600 hover:border-zinc-400 hover:text-zinc-950 dark:border-white/15 dark:text-zinc-300 dark:hover:border-white/40 dark:hover:text-white"
        }`}
      >
        {option.label}
      </button>
    );
  });

  return (
    <div
      ref={viewportRef}
      role="group"
      aria-label={label}
      className={`${styles.viewport} mb-7`}
      onPointerEnter={() => { hoverRef.current = true; }}
      onPointerLeave={() => { hoverRef.current = false; }}
      onFocusCapture={() => { focusRef.current = true; }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) focusRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onClickCapture={handleClickCapture}
    >
      <div className={styles.track}>
        <div ref={groupRef} className={styles.group}>{chips(false)}</div>
        <div className={`${styles.group} ${styles.duplicate}`} aria-hidden="true">{chips(true)}</div>
      </div>
    </div>
  );
}
