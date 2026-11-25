"use client";

import { useEffect, useRef } from "react";

const orbits = [
  { angle: 0, phase: 0.08, duration: 16 },
  { angle: 30, phase: 0.37, duration: 17 },
  { angle: 60, phase: 0.69, duration: 18 },
  { angle: 90, phase: 0.22, duration: 19 },
  { angle: 120, phase: 0.84, duration: 20 },
  { angle: 150, phase: 0.53, duration: 21 },
];
const cx = 140, cy = 140, rx = 122, ry = 46;

const roundCoordinate = (value: number): number => Number(value.toFixed(3));

export default function TalksOrbitalGraphic() {
  const svgRef = useRef<SVGSVGElement>(null);

  const startedRef = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || preference.matches || document.hidden) {
        svg.pauseAnimations();
        return;
      }
      svg.unpauseAnimations();
      if (!startedRef.current) {
        svg.querySelectorAll<SVGAnimationElement>("animateMotion").forEach((motion) => motion.beginElement());
        startedRef.current = true;
      }
    };
    svg.pauseAnimations();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(svg);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      svg.pauseAnimations();
    };
  }, []);

  return (
    <svg ref={svgRef} aria-hidden="true" focusable="false" viewBox="0 0 280 280" className="mx-auto h-auto w-full" style={{ width: "100%", height: "auto", maxWidth: 240 }} fill="none">
      {orbits.map(({ angle, phase, duration }) => {
        const theta = phase * Math.PI * 2;
        const x = rx * Math.cos(theta);
        const y = ry * Math.sin(theta);
        // Four quarter-ellipses avoid ambiguous diametric arc rounding.
        const endpoints = [1, 2, 3, 4].map((quarter) => {
          if (quarter === 4) return "0 0";
          const t = theta + quarter * Math.PI / 2;
          return `${roundCoordinate(rx * Math.cos(t) - x)} ${roundCoordinate(ry * Math.sin(t) - y)}`;
        });
        const path = `M 0 0 ${endpoints.map((point) => `A ${rx} ${ry} 0 0 1 ${point}`).join(" ")}`;
        return (
          <g key={angle} transform={`rotate(${angle} ${cx} ${cy})`}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke="#bcd4c6" strokeWidth="0.85" opacity="0.65" />
            <circle cx={roundCoordinate(cx + x)} cy={roundCoordinate(cy + y)} r="2.7" fill="#f1f0e9">
              <animateMotion begin="indefinite" dur={`${duration}s`} repeatCount="indefinite" calcMode="paced" path={path} />
            </circle>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="8" fill="#bcd4c6" />
    </svg>
  );
}
