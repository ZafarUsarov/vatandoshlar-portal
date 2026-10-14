"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { id: string };
type Props = { images: readonly GalleryImage[]; title: string; locale: "uz" | "de" };

export default function MarketImageGallery({ images, title, locale }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;
  const previous = useCallback(() => setActive((n) => (n - 1 + count) % count), [count]);
  const next = useCallback(() => setActive((n) => (n + 1) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowLeft" && count > 1) previous();
      if (event.key === "ArrowRight" && count > 1) next();
      if (event.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-market-gallery-dialog] button:not(:disabled)'));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const triggerElement = trigger.current;
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", onKeyDown); triggerElement?.focus(); };
  }, [open, count, previous, next]);

  if (!count) return null;
  const labels = locale === "de"
    ? { enlarge: "Bild vergrößern", close: "Galerie schließen", previous: "Vorheriges Bild", next: "Nächstes Bild", gallery: "Bildergalerie" }
    : { enlarge: "Rasmni kattalashtirish", close: "Galereyani yopish", previous: "Oldingi rasm", next: "Keyingi rasm", gallery: "Rasmlar galereyasi" };
  const src = (index: number) => `/api/market/images/${images[index].id}`;
  const alt = (index: number) => `${title} — ${index + 1}`;
  const swipeStart = (event: React.TouchEvent) => { touchX.current = event.touches[0]?.clientX ?? null; };
  const swipeEnd = (event: React.TouchEvent) => {
    if (touchX.current === null || count < 2) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) > 45) {
      if (delta < 0) next();
      else previous();
    }
  };
  return (
    <section className="mt-8" aria-label={labels.gallery}>
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900" onTouchStart={swipeStart} onTouchEnd={swipeEnd}>
        <button ref={trigger} type="button" onClick={() => setOpen(true)} aria-label={labels.enlarge} className="relative block h-[280px] w-full cursor-zoom-in sm:h-[400px] lg:h-[390px]">
          <Image unoptimized fill sizes="(max-width: 640px) 100vw, 900px" src={src(active)} alt={alt(active)} className="object-contain" priority={active === 0} />
        </button>
        {count > 1 && <>
          <button type="button" onClick={previous} aria-label={labels.previous} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 text-slate-900 shadow hover:bg-white focus-visible:outline-2 focus-visible:outline-emerald-500">‹</button>
          <button type="button" onClick={next} aria-label={labels.next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-3 text-slate-900 shadow hover:bg-white focus-visible:outline-2 focus-visible:outline-emerald-500">›</button>
          <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-medium text-white">{active + 1} / {count}</span>
        </>}
      </div>
      {count > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label={labels.gallery}>
        {images.map((image, index) => <button key={image.id} type="button" onClick={() => setActive(index)} aria-label={alt(index)} aria-current={index === active ? "true" : undefined} className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-100 sm:h-20 sm:w-24 ${index === active ? "border-emerald-600" : "border-transparent hover:border-slate-400"}`}><Image unoptimized fill sizes="96px" src={src(index)} alt={alt(index)} className="object-cover" /></button>)}
      </div>}
      {open && <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-3 text-white sm:p-6" role="dialog" aria-modal="true" aria-label={labels.gallery} data-market-gallery-dialog onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className="flex shrink-0 items-center justify-between gap-4"><span className="text-sm">{active + 1} / {count}</span><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label={labels.close} className="rounded-full border border-white/30 px-4 py-2 text-sm hover:bg-white/15">✕ {locale === "de" ? "Schließen" : "Yopish"}</button></div>
        <div className="relative min-h-0 flex-1" onTouchStart={swipeStart} onTouchEnd={swipeEnd}>
          <Image unoptimized fill sizes="100vw" src={src(active)} alt={alt(active)} className="object-contain" />
          {count > 1 && <><button type="button" onClick={previous} aria-label={labels.previous} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-3 text-2xl hover:bg-white/25">‹</button><button type="button" onClick={next} aria-label={labels.next} className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-3 text-2xl hover:bg-white/25">›</button></>}
        </div>
        {count > 1 && <div className="flex shrink-0 justify-center gap-2 overflow-x-auto py-3">{images.map((image, index) => <button key={image.id} type="button" onClick={() => setActive(index)} aria-label={alt(index)} className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border-2 ${index === active ? "border-emerald-400" : "border-transparent"}`}><Image unoptimized fill sizes="64px" src={src(index)} alt={alt(index)} className="object-cover" /></button>)}</div>}
      </div>}
    </section>
  );
}
