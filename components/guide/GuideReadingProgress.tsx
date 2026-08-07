"use client";

import { useEffect, useRef, useState } from "react";

type GuideReadingProgressProps = Readonly<{
  targetId: string;
  label: string;
}>;

function clampProgress(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export default function GuideReadingProgress({
  targetId,
  label,
}: GuideReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const target = document.getElementById(targetId);

      if (!target) {
        setProgress(0);
        return;
      }

      const targetTop =
        target.getBoundingClientRect().top + window.scrollY;
      const targetHeight = target.offsetHeight;
      const viewportHeight = window.innerHeight;
      const readableDistance = Math.max(
        targetHeight - viewportHeight,
        1,
      );
      const currentDistance = window.scrollY - targetTop;

      setProgress(
        clampProgress(
          (currentDistance / readableDistance) * 100,
        ),
      );
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        updateProgress();
        frameRef.current = null;
      });
    };

    updateProgress();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetId]);

  const roundedProgress = Math.round(progress);

  return (
    <div
      className="fixed inset-x-0 top-20 z-40 h-1 bg-slate-200/80 backdrop-blur dark:bg-slate-800/80"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-emerald-500 transition-transform duration-150 ease-out motion-reduce:transition-none"
        style={{
          transform: `scaleX(${progress / 100})`,
        }}
      />

      <span className="sr-only">
        {label}: {roundedProgress}%
      </span>
    </div>
  );
}
