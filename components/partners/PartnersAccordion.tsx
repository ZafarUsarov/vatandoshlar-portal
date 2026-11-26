'use client';
import mobile from "./PartnersMobile.module.css";
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
export default function PartnersAccordion({items}: {items: readonly (readonly string[])[]}) {
 const [open,setOpen] = useState<number|null>(null);
 const reduced = useReducedMotion();
 return <div className={mobile.accordion}>{items.map(([title,description],i)=><div key={title} className="border-t border-dotted border-[var(--border)] last:border-b">
 <h3><button type="button" id={`partner-benefit-${i}`} aria-expanded={open===i} aria-controls={`partner-panel-${i}`} onClick={()=>setOpen(open===i?null:i)} className="grid grid-cols-[32px_minmax(0,1fr)_20px] min-h-[60px] w-full items-center gap-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 sm:grid-cols-[44px_minmax(0,1fr)_20px] sm:gap-6 lg:min-h-[76px] lg:py-4"><span className="text-sm tabular-nums text-[var(--text-secondary)]">0{i+1}</span><span className="min-w-0 flex-1 text-[18px] font-medium leading-tight sm:text-[22px] lg:text-[26px]">{title}</span>{open===i?<Minus aria-hidden="true" className="size-5 shrink-0"/>:<Plus aria-hidden="true" className="size-5 shrink-0"/>}</button></h3>
 <div id={`partner-panel-${i}`} role="region" aria-labelledby={`partner-benefit-${i}`}><AnimatePresence initial={false}>{open===i&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:0.28}} className="overflow-hidden"><p className="max-w-[75ch] pb-4 pl-[44px] pr-7 text-[15px] leading-relaxed text-[var(--text-secondary)] sm:pl-[68px] sm:text-base lg:pb-5">{description}</p></motion.div>}</AnimatePresence></div>
 </div>)}</div>;
}
