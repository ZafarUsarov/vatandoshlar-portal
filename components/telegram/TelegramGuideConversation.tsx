"use client";

import { useEffect, useRef, useState } from "react";

type Conversation = Readonly<{
  questionLabel: string;
  question: string;
  typing: string;
  answerLabel: string;
  answer: string;
}>;

const CYCLE_MS = 10_000;

export default function TelegramGuideConversation({ conversation }: { conversation: Conversation }) {
  const [elapsed, setElapsed] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const started = performance.now() - elapsed;
    let frame = 0;
    const tick = (now: number) => {
      setElapsed((now - started) % CYCLE_MS);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
    // Preserve the elapsed phase while the preview is outside the viewport.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reducedMotion]);

  const time = reducedMotion ? 8_000 : elapsed;
  const questionStarted = time >= 500;
  const questionSent = time >= 2_800;
  const typingResponse = time >= 3_500 && time < 5_000;
  const responseVisible = time >= 5_000;
  const questionLength = !questionStarted ? 0 : questionSent
    ? conversation.question.length
    : Math.max(1, Math.floor(((time - 500) / 2_300) * conversation.question.length));

  return (
    <div ref={containerRef} aria-hidden="true" className="min-w-0 rounded-[11px] border border-white/10 bg-[var(--telegram-chat,#2B2D2F)] p-3 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 md:pb-4">
        <span className="size-2 rounded-full bg-[#55D7C3]" />
        <span className="h-2 w-16 rounded-full bg-white/20" />
        <span className="ml-auto flex gap-1.5">
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
        </span>
      </div>
      <div className="relative mt-3 min-w-0 md:mt-5">
        <div aria-hidden="true" className="invisible flex flex-col gap-2 md:gap-4">
          <div className="ml-auto w-[94%] rounded-[10px] border border-transparent px-3 py-2 md:px-4 md:py-3">
            <p className="text-[11px] font-bold">{conversation.questionLabel}</p>
            <p className="mt-1 text-xs leading-[1.4] md:mt-1.5 md:text-sm md:leading-6">{conversation.question}</p>
            <span className="block text-right text-xs">✓</span>
          </div>
          <div className="w-[94%] rounded-[10px] border border-transparent px-3 py-2 md:px-4 md:py-3">
            <p className="text-[11px] font-bold">{conversation.answerLabel}</p>
            <p className="mt-1 text-xs leading-[1.4] md:mt-1.5 md:text-sm md:leading-6">{conversation.answer}</p>
            <span className="mt-1 block text-right text-[10px] md:mt-2 md:text-xs">✓✓</span>
          </div>
        </div>
        <div className="absolute inset-0 flex min-w-0 flex-col gap-2 md:gap-4">
        {questionStarted && (
          <div className="ml-auto w-[94%] rounded-[10px] rounded-br-sm border border-[#55D7C3]/20 bg-[#24413D] px-3 py-2 md:rounded-[10px] md:px-4 md:py-3">
            <p className="text-[11px] font-bold text-[#55D7C3]">{conversation.questionLabel}</p>
            <p className="mt-1 min-h-0 text-xs leading-[1.4] text-slate-100 md:mt-1.5 md:text-sm md:leading-6">{conversation.question.slice(0, questionLength)}</p>
            {questionSent && <span className="block text-right text-xs text-[#55D7C3]">✓</span>}
          </div>
        )}
        {typingResponse && (
          <div className="self-start rounded-[10px] border border-white/10 bg-[var(--telegram-elevated,#343638)] px-3 py-1.5 text-[11px] text-slate-200 md:px-4 md:py-2 md:text-xs">
            {conversation.typing} <span className="text-[#55D7C3]">•••</span>
          </div>
        )}
        {responseVisible && (
          <div className="w-[94%] animate-[uzde-response-in_450ms_ease-out_both] rounded-[10px] rounded-bl-sm border border-white/10 bg-[var(--telegram-elevated,#383A3C)] px-3 py-2 motion-reduce:animate-none md:rounded-[10px] md:px-4 md:py-3">
            <p className="text-[11px] font-bold text-[#55D7C3]">{conversation.answerLabel}</p>
            <p className="mt-1 text-xs leading-[1.4] text-slate-100 md:mt-1.5 md:text-sm md:leading-6">{conversation.answer}</p>
            <span className="mt-1 block text-right text-[10px] font-semibold text-[#55D7C3] md:mt-2 md:text-xs">✓✓</span>
          </div>
        )}
        </div>
      </div>
      <style>{`@keyframes uzde-response-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
