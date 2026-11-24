"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Paperclip, Smile, Send, Pause, Play, RotateCcw, CheckCheck, UserRound } from "lucide-react";
import type { SupportedTelegramLocale } from "@/types/telegram";

type Group = { bundesland: string; state: string; shortName: string; username: string | null };
export default function CinematicTelegramChat({ locale, groups }: { locale: SupportedTelegramLocale; groups: Group[] }) {
  const uz = locale === "uz";
  const messages = uz ? ["Assalomu alaykum! Kiel şahrida Anmeldung böyiça savolim bor. Wohnungsgeberbestätigung hujjatining PDF nusxasi yetarlimi yoki asl nusxasi ham kerakmi?", "Va alaykum assalom! Bu talabni Kiel Bürgeramt orqali aniqlaştirib olganingiz ma’qul.", "Rahmat! Aniqlaştirib, natijasini guruhda bölişaman."] : ["Hallo zusammen! Ich habe eine Frage zur Anmeldung in Kiel. Reicht eine PDF-Kopie der Wohnungsgeberbestätigung oder brauche ich auch das Original?", "Hallo! Am besten klärst du diese Anforderung direkt mit dem Bürgeramt Kiel.", "Danke! Ich kläre das und teile das Ergebnis in der Gruppe."];
  const selected = groups.find(g => g.bundesland === "Schleswig-Holstein");
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const frame = useRef<HTMLElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update(); mq.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (frame.current) observer.observe(frame.current);
    return () => { mq.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible || time >= 32000) return;
    const id = window.setTimeout(() => setTime(t => Math.min(t + 60, 32000)), 60);
    return () => window.clearTimeout(id);
  }, [paused, reduced, visible, time]);
  const t = reduced ? 32000 : time;
  const count = t >= 24000 ? 3 : t >= 17000 ? 2 : t >= 10000 ? 1 : 0;
  const typing = t >= 13500 && t < 17000;
  const draft = t >= 1500 && t < 10000 ? messages[0].slice(0, Math.floor((t-1500)/8500*messages[0].length)) : t >= 20500 && t < 24000 ? messages[2].slice(0, Math.floor((t-20500)/3500*messages[2].length)) : "";
  useEffect(() => { if (feed.current) feed.current.scrollTop = feed.current.scrollHeight; }, [count, typing]);
  const avatar = (code: string) => <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#b79b70]/45 bg-[#34302b] text-xs font-semibold tracking-wide text-[#e6c99b]">{code}</span>;
  return <figure ref={frame} className="overflow-hidden rounded-[14px] border border-[#665743] bg-[#171a1d] text-[#f4f1eb] shadow-xl sm:rounded-[24px]">
    <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#202326] px-4 py-3 text-xs sm:px-6"><span className="font-medium tracking-wide text-[#d8c4a6]">UzDe. / Telegram · {uz ? "Namunaviy suhbat" : "Beispielgespräch"}</span><div className="flex gap-3">{!reduced && <><button type="button" aria-label={paused ? (uz ? "Davom ettiriş" : "Fortsetzen") : (uz ? "Töxtatiş" : "Pause")} onClick={() => setPaused(p => !p)} className="rounded p-1 focus-visible:outline-2">{paused ? <Play size={16}/> : <Pause size={16}/>}</button><button type="button" aria-label={uz ? "Qayta başlaş" : "Neu starten"} onClick={() => {setTime(0);setPaused(false);}} className="rounded p-1 focus-visible:outline-2"><RotateCcw size={16}/></button></>}</div></figcaption>
    <div className="grid h-[460px] min-w-0 md:h-[440px] md:grid-cols-[minmax(210px,27%)_minmax(0,1fr)]">
      <aside className="hidden min-h-0 flex-col border-r border-white/10 bg-[#202326] md:flex"><div className="m-3 flex items-center gap-2 rounded-lg bg-[#15181b] px-3 py-2 text-xs text-[#b9bfc3]"><Search size={15}/>{uz ? "Qidiriş" : "Suchen"}</div><div className="min-h-0 overflow-y-auto">{groups.map(g => <div key={g.shortName} className={`flex items-center gap-3 border-l-2 px-3 py-3 ${g.shortName === selected?.shortName && t >= 600 ? "border-[#58d3c1] bg-[#30413e]" : "border-transparent"} transition-colors motion-reduce:transition-none`}>{avatar(g.shortName)}<div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{g.state}</p><p className="truncate text-xs text-[#b9bfc3]">{g.username ?? "\u00a0"}</p></div><span className="text-[10px] text-[#b9bfc3]">10:24</span></div>)}</div></aside>
      <div className="flex min-h-0 min-w-0 flex-col bg-[radial-gradient(ellipse_at_top_right,#383027_0%,#1b2023_55%,#15191c_100%)]"><header className="flex items-center gap-3 border-b border-white/10 bg-[#25292b] px-4 py-3">{avatar(selected?.shortName ?? "SH")}<div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{selected?.state ?? "Schleswig-Holstein"}</p><p className="truncate text-xs text-[#a9c9c3]">{selected?.username ?? "\u00a0"}</p></div></header>
      <div ref={feed} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-8" aria-label={uz ? "Namunaviy xabarlar" : "Beispielnachrichten"}><p className="text-center text-[11px] text-[#c5b69e]">{uz ? "Bugun" : "Heute"}</p>{messages.slice(0,count).map((m,i) => <div key={i} className={`flex items-end gap-2 ${i===1 ? "justify-start" : "justify-end"}`}>{i===1 && <UserRound className="mb-1 size-7 shrink-0 rounded-full bg-[#4a4035] p-1 text-[#e6c99b]"/>}<div className={`max-w-[92%] rounded-xl border px-3 py-2 text-[13px] leading-5 [overflow-wrap:anywhere] sm:max-w-[min(78%,680px)] ${i===1 ? "rounded-bl-sm border-[#655644] bg-[#302b26]" : "rounded-br-sm border-[#42665f] bg-[#233e3b]"}`}><p>{m}</p><div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#b9c9c5]">10:{24+i}{i!==1 && <CheckCheck size={14} className="text-[#66d8c7]"/>}</div></div></div>)}{typing && <p className="w-fit rounded-xl bg-[#302b26] px-3 py-2 text-xs text-[#e6c99b]">{uz ? "Javob yozilmoqda" : "Schreibt"}<span className="animate-pulse motion-reduce:animate-none">…</span></p>}</div>
      <div aria-hidden="true" className="flex min-h-[76px] items-center gap-3 border-t border-white/10 bg-[#202326] px-3 py-3 sm:px-5"><Paperclip size={18} className="shrink-0 text-[#b9bfc3]"/><div className="min-w-0 flex-1 text-xs leading-5 [overflow-wrap:anywhere] text-[#e4e8e7]">{draft || <span className="text-[#b9bfc3]">{uz ? "Xabar yoziş" : "Nachricht schreiben"}</span>}</div><Smile size={18} className="shrink-0 text-[#b9bfc3]"/><Send size={19} className="shrink-0 text-[#58d3c1]"/></div></div></div>
  </figure>;
}
