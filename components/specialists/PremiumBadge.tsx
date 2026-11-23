"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

type Vec3 = readonly [number, number, number];
type Face = { points: number[]; base: readonly [number, number, number] };

const SEGMENTS = 12;
const vertices: Vec3[] = [];
for (const [radius, height, offset] of [
  [0.48, -0.46, 0],
  [0.9, -0.04, 0],
  [0.82, 0.13, 0],
  [0.34, 0.58, Math.PI / SEGMENTS],
] as const) {
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i * Math.PI * 2) / SEGMENTS + offset;
    vertices.push([radius * Math.cos(angle), height, radius * Math.sin(angle)]);
  }
}
const bottom = vertices.push([0, 0.84, 0]) - 1;
const faces: Face[] = [];
const colors: Face["base"][] = [
  [0, 107, 79], [0, 143, 105], [19, 184, 137],
  [5, 122, 91], [15, 159, 115], [7, 99, 78],
];
for (let i = 0; i < SEGMENTS; i++) {
  const j = (i + 1) % SEGMENTS;
  faces.push({ points: [i, j, SEGMENTS + j], base: colors[i % colors.length] });
  faces.push({ points: [i, SEGMENTS + j, SEGMENTS + i], base: colors[(i + 2) % colors.length] });
  faces.push({ points: [SEGMENTS + i, SEGMENTS + j, SEGMENTS * 2 + j], base: colors[(i + 1) % colors.length] });
  faces.push({ points: [SEGMENTS + i, SEGMENTS * 2 + j, SEGMENTS * 2 + i], base: colors[(i + 3) % colors.length] });
  faces.push({ points: [SEGMENTS * 2 + i, SEGMENTS * 2 + j, SEGMENTS * 3 + j], base: colors[(i + 4) % colors.length] });
  faces.push({ points: [SEGMENTS * 2 + i, SEGMENTS * 3 + j, SEGMENTS * 3 + i], base: colors[(i + 5) % colors.length] });
  faces.push({ points: [SEGMENTS * 3 + i, SEGMENTS * 3 + j, bottom], base: colors[(i + 2) % colors.length] });
}
// A flat table with triangular internal reflections, visible from above.
for (let i = 1; i < SEGMENTS - 1; i++) {
  faces.push({ points: [0, i, i + 1], base: colors[(i + 1) % colors.length] });
}

function normalize([x, y, z]: Vec3): Vec3 {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}
function subtract(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function renderDiamond(ctx: CanvasRenderingContext2D, angle: number, dark: boolean) {
  const width = ctx.canvas.width;
  const scale = width * 0.34;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const tilt = -0.19;
  const sinTilt = Math.sin(tilt);
  const cosTilt = Math.cos(tilt);
  const rotated = vertices.map(([x, y, z]): Vec3 => {
    const rx = x * cos + z * sin;
    const rz = -x * sin + z * cos;
    return [rx, y * cosTilt - rz * sinTilt, y * sinTilt + rz * cosTilt];
  });
  const project = ([x, y, z]: Vec3): readonly [number, number] => {
    const perspective = 3.8 / (3.8 - z);
    return [width / 2 + x * scale * perspective, width * 0.49 + y * scale * perspective];
  };
  const light = normalize([-0.55, -0.7, 1]);
  ctx.clearRect(0, 0, width, width);
  const sorted = faces.map((face) => {
    const points = face.points.map((index) => rotated[index]);
    const normal = normalize(cross(subtract(points[1], points[0]), subtract(points[2], points[0])));
    const depth = points.reduce((sum, point) => sum + point[2], 0) / points.length;
    return { ...face, points, normal, depth };
  }).sort((a, b) => a.depth - b.depth);

  for (const face of sorted) {
    const diffuse = Math.abs(dot(face.normal, light));
    const glint = Math.pow(Math.max(0, Math.abs(dot(face.normal, light))), 22);
    const brightness = (dark ? 0.57 : 0.48) + diffuse * 0.75;
    const color = face.base.map((value, index) => Math.min(255, Math.round(value * brightness + (index === 1 ? 4 : 0) + glint * 44)));
    ctx.beginPath();
    face.points.forEach((point, index) => {
      const [px, py] = project(point);
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = `rgb(${color.join(",")})`;
    ctx.fill();
    ctx.strokeStyle = dark ? "rgba(174,255,224,.24)" : "rgba(0,67,47,.21)";
    ctx.lineWidth = width / 180;
    ctx.stroke();
    if (glint > 0.65) {
      ctx.fillStyle = `rgba(220,255,238,${Math.min(0.38, (glint - 0.65) * 0.9)})`;
      ctx.fill();
    }
  }
}

function EmeraldDiamond({ size }: Readonly<{ size: "card" | "profile" | "hero" }>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)");
    let frame = 0;
    let elapsed = 0;
    let last = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) draw();
    });
    const isDark = () => document.documentElement.classList.contains("dark") || (!document.documentElement.classList.contains("light") && darkMode.matches);
    const draw = () => renderDiamond(ctx, 0.45 + (elapsed / 8000) * Math.PI * 2, isDark());
    const tick = (now: number) => {
      if (!last) last = now;
      if (visible && !motion.matches && !document.hidden) {
        elapsed += Math.min(now - last, 100);
        draw();
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    const refresh = () => { if (motion.matches) elapsed = 0; draw(); };
    const themeObserver = new MutationObserver(refresh);
    observer.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    motion.addEventListener("change", refresh);
    darkMode.addEventListener("change", refresh);
    draw();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      motion.removeEventListener("change", refresh);
      darkMode.removeEventListener("change", refresh);
    };
  }, []);
  return <canvas ref={canvasRef} width={120} height={120} aria-hidden="true" className={`block shrink-0 ${size === "hero" ? "size-[104px] sm:size-[116px]" : size === "profile" ? "size-[27px] sm:size-[32px]" : "size-[23px]"}`} />;
}

/** Premium subscription identity; independent from verified status. */
export default function PremiumBadge({ size = "card" }: Readonly<{ size?: "card" | "profile" | "hero" }>) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const description = locale === "de"
    ? "Mitglied mit erweiterten Profilfunktionen."
    : "Kengaytirilgan profil imkoniyatlariga ega obunachi.";

  return (
    <span className="group/premium relative z-20 inline-flex shrink-0 items-center self-center" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button
        type="button"
        aria-label={`UzDe. Premium — ${description}`}
        aria-expanded={open}
        onClick={(event) => { event.preventDefault(); event.stopPropagation(); setOpen((value) => !value); }}
        onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); event.stopPropagation(); } }}
        className={`relative z-20 inline-flex shrink-0 items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#059669] dark:focus-visible:ring-[#6EE7B7] ${size === "hero" ? "size-[112px] sm:size-[124px]" : "size-8"}`}
      >
        <EmeraldDiamond size={size} />
      </button>
      <span role="tooltip" className={`${open ? "visible opacity-100" : "invisible opacity-0 group-hover/premium:visible group-hover/premium:opacity-100 group-focus-within/premium:visible group-focus-within/premium:opacity-100"} pointer-events-none absolute bottom-full z-30 mb-2 w-56 ${size === "hero" ? "right-0" : "left-0"} max-w-[calc(100vw-3rem)] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-xs font-normal leading-relaxed text-zinc-700 shadow-sm transition-opacity duration-150 dark:border-zinc-700 dark:bg-[#202326] dark:text-zinc-200 motion-reduce:transition-none`}>
        <strong className="block font-semibold text-zinc-900 dark:text-white">UzDe. Premium</strong>
        {description}
      </span>
    </span>
  );
}
