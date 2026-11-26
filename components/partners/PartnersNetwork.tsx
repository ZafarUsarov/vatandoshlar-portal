"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { verifiedPartners } from "@/data/partners/content";

type Props = { title: string; emptyTitle: string; description: string; action: string; emailHref: string; headingClassName: string };

export default function PartnersNetwork({ title, emptyTitle, description, action, emailHref, headingClassName }: Props) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <section aria-labelledby="partners-network" className="border-y border-[var(--border)]">
      <h2 id="partners-network" className={headingClassName}>
        <button id="partners-network-toggle" type="button" aria-expanded={open} aria-controls="partners-network-panel" onClick={() => setOpen(value => !value)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-[30px] font-semibold leading-tight tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 lg:py-6 lg:text-[44px]">
          {title}
          {open ? <Minus aria-hidden="true" className="size-6 shrink-0" /> : <Plus aria-hidden="true" className="size-6 shrink-0" />}
        </button>
      </h2>
      <div id="partners-network-panel" role="region" aria-labelledby="partners-network-toggle" inert={!open}>
        <AnimatePresence initial={false}>
          {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} className="overflow-hidden">
            <div className="pb-6 lg:pb-8">
              {verifiedPartners.length === 0 ? <>
                <h3 className={`${headingClassName} text-xl font-semibold lg:text-2xl`}>{emptyTitle}</h3>
                <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[var(--text-secondary)] lg:text-lg">{description}</p>
              </> : <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{verifiedPartners.map(partner => <li key={partner.url}><a href={partner.url} className="flex flex-col items-start gap-3 focus-visible:outline-2" target="_blank" rel="noopener noreferrer"><Image src={partner.logo} alt="" width={160} height={64} className="object-contain" /><span>{partner.name}</span></a></li>)}</ul>}
              <a href={emailHref} className="mt-4 inline-flex min-h-12 items-center gap-6 border-b border-current font-semibold focus-visible:outline-2">{action}<span aria-hidden="true">↗</span></a>
            </div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </section>
  );
}
