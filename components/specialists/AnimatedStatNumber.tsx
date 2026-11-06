"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatNumberProps = Readonly<{ value: number }>;

export default function AnimatedStatNumber({ value }: AnimatedStatNumberProps) {
  const [display, setDisplay] = useState(value);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || value <= 0) return;

    let frame = 0;
    let startedAt: number | null = null;
    let started = false;
    const duration = 850;

    const tick = (now: number) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.min(value, Math.floor(eased * value)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        setDisplay(0);
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={elementRef}>{display}</span>;
}
