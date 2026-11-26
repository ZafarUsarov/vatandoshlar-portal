"use client";

import mobile from "./PartnersMobile.module.css";
import { useEffect, useRef } from "react";

const CENTER = 120;
const INNER_RADIUS = 34;
const OUTER_RADIUS = 87;
const NODE_RADIUS = 12;

const round = (value: number) => Number(value.toFixed(3));

const nodes = Array.from({ length: 8 }, (_, index) => {
  const angle = index * Math.PI / 4 - Math.PI / 2;
  const point = (radius: number) => ({
    x: round(CENTER + radius * Math.cos(angle)),
    y: round(CENTER + radius * Math.sin(angle)),
  });

  return {
    center: point(OUTER_RADIUS),
    start: point(INNER_RADIUS),
    end: point(OUTER_RADIUS - NODE_RADIUS),
  };
});

export default function PartnershipNetwork() {
  const ref = useRef<SVGSVGElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let visible = false;

    const sync = () => {
      if (!visible || preference.matches || document.hidden) {
        svg.pauseAnimations();
        return;
      }

      svg.unpauseAnimations();

      if (!started.current) {
        svg.querySelectorAll<SVGAnimationElement>(
          "animateMotion"
        ).forEach((motion) => motion.beginElement());

        started.current = true;
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
    <div className={`${mobile.graphic} mx-auto w-full max-w-[190px] text-[#527461] sm:max-w-[200px] lg:max-w-[240px] dark:text-[#9bbba8]`}>
      <svg
        ref={ref}
        viewBox="0 0 240 240"
        aria-hidden="true"
        focusable="false"
        className="block h-auto w-full"
        fill="none"
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={OUTER_RADIUS}
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 5"
          opacity="0.6"
        />

        {nodes.map(({ center, start, end }, index) => {
          const path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
          const reverse = `M ${end.x} ${end.y} L ${start.x} ${start.y}`;

          return (
            <g key={index}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.65"
              />

              <g className="motion-reduce:hidden">
                <circle r="2.3" fill="currentColor">
                  <animateMotion
                    begin="indefinite"
                    dur={`${8 + index % 3}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    path={path}
                  />
                </circle>

                <circle r="1.7" fill="currentColor" opacity="0.65">
                  <animateMotion
                    begin="indefinite"
                    dur={`${10 + index % 3}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    path={reverse}
                  />
                </circle>
              </g>

              <circle
                cx={center.x}
                cy={center.y}
                r={NODE_RADIUS}
                className={`${mobile.node} fill-[#e2eae1] dark:fill-[#263b32]`}
                stroke="currentColor"
                strokeWidth="1"
              />

              <circle
                cx={center.x}
                cy={center.y}
                r="3"
                fill="currentColor"
              />
            </g>
          );
        })}

        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          className={`${mobile.center} fill-[#204c3b] dark:fill-[#315c48]`}
        />

        <text
          x={CENTER}
          y={CENTER}
          dominantBaseline="central"
          textAnchor="middle"
          fill="#f0f5ed"
          fontSize="19"
          fontWeight="600"
        >
          UzDe.
        </text>
      </svg>
    </div>
  );
}
