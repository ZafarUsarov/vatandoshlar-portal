"use client";
import { useState } from "react";
import { ArrowDownRight, ChevronDown } from "lucide-react";
import styles from "./Privacy.module.css";

type Item = Readonly<{ id: string; title: string }>;
export default function PrivacyTableOfContents({ title, sections, locale }: Readonly<{ title: string; sections: readonly Item[]; locale: "uz" | "de" }>) {
  const [open, setOpen] = useState(false);
  return <aside className={styles.toc}>
    <p className={styles.tocTitle}>{title}</p>
    <button type="button" className={styles.tocToggle} aria-expanded={open} aria-controls="privacy-toc" onClick={() => setOpen(value => !value)}>{title} · {sections.length} {locale === "de" ? "Abschnitte" : "bölim"}<ChevronDown size={18} aria-hidden="true" /></button>
    <nav id="privacy-toc" aria-label={title} className={styles.tocNav} data-open={open}>
      <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} onClick={(event) => {
        const target = document.getElementById(section.id);
        if (!target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => {
          window.history.pushState(null, "", `#${section.id}`);
          target.focus({ preventScroll: true });
          target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
        });
      }}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{section.title.replace(/^\d+\.\s*/, "")}</span><ArrowDownRight aria-hidden="true" /></a></li>)}</ol>
    </nav>
  </aside>;
}
