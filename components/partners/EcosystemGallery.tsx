'use client';
import {useEffect,useRef,useState} from 'react';
import {Link} from '@/i18n/navigation';
import {Pause,Play} from 'lucide-react';
import type {Brand} from '@/data/partners/content';
import EcosystemBrandMark from './EcosystemBrandMark';
import styles from './EcosystemGallery.module.css';

function createBalancedRows(brands: readonly Brand[]): Brand[][] {
  const first = [...brands];
  const n = first.length;
  if (n < 2) return [first, [...first]];
  // Interleave even and odd indices, then choose the least aligned rotation.
  const order = [...first.filter((_, i) => i % 2 === 0), ...first.filter((_, i) => i % 2 !== 0)];
  let best = order;
  let bestScore = -Infinity;
  for (let offset = 0; offset < n; offset++) {
    const candidate = [...order.slice(offset), ...order.slice(0, offset)];
    const score = candidate.reduce((sum, brand, i) => sum + (brand.id === first[i].id ? -20 : 1), 0);
    if (score > bestScore) { best = candidate; bestScore = score; }
  }
  return [first, best];
}

export default function EcosystemGallery({brands,caption,pause,play}:{brands:readonly Brand[];caption:string;pause:string;play:string}) {
 const ref=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(false);
 const [hoverPaused,setHoverPaused]=useState(false);
 const hoverTimer=useRef<ReturnType<typeof setTimeout> | null>(null);
 const hoverLatched=useRef(false);
 useEffect(()=>()=>{if(hoverTimer.current!==null)clearTimeout(hoverTimer.current)},[]);
 const pauseOnHover=()=>{
   if(hoverLatched.current || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
   hoverLatched.current=true;
   if(paused || reduced)return;
   if(hoverTimer.current!==null)clearTimeout(hoverTimer.current);
   setHoverPaused(true);
   hoverTimer.current=setTimeout(()=>{setHoverPaused(false);hoverTimer.current=null},1000);
 };

 const [visible,setVisible]=useState(false);
 const [hidden,setHidden]=useState(false);
 const [reduced,setReduced]=useState(false);
 useEffect(()=>{const el=ref.current;if(!el)return;const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>{setHidden(document.hidden);setReduced(mq.matches)};sync();const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));observer.observe(el);document.addEventListener('visibilitychange',sync);mq.addEventListener('change',sync);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);mq.removeEventListener('change',sync)}},[]);
 const active=brands.filter(b=>b.isActive).sort((a,b)=>a.sortOrder-b.sortOrder);
 const rows=createBalancedRows(active);
 return <div ref={ref} className={styles.gallery} data-running={visible&&!hidden&&!paused&&!reduced&&!hoverPaused}>
 <div className={styles.rows} onPointerOver={event=>{
   if(event.pointerType==='mouse' && event.target instanceof Element && event.target.closest(`.${styles.banner}`))pauseOnHover();
 }} onPointerLeave={()=>{hoverLatched.current=false}}>{rows.map((row,i)=><div className={styles.viewport} key={i}><div className={`${styles.track} ${i===1?styles.reverse:''}`}>{[0,1].map(copy=><div key={copy} className={styles.group}>{[...row,...row].map((b,j)=>{
 const duplicate=i!==0||copy!==0||j>=row.length;
 const props={className:`${styles.banner} ${styles[b.theme]}`,tabIndex:duplicate?-1:0,'aria-hidden':duplicate||undefined};
 const body=<><div className={styles.mark}><EcosystemBrandMark brand={b}/></div><div className={styles.copy}><p className={styles.name}>{b.name}</p><p className={styles.description}>{b.description}</p></div></>;
 return b.external?<a key={`${b.id}-${j}`} href={b.href} target="_blank" rel="noopener noreferrer" {...props}>{body}</a>:<Link key={`${b.id}-${j}`} href={b.href} {...props}>{body}</Link>;
 })}</div>)}</div></div>)}</div>
 <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[var(--text-secondary)] sm:text-sm"><p>{caption}</p>{!reduced&&<button type="button" aria-label={paused?play:pause} onClick={()=>setPaused(v=>!v)} className="inline-flex min-h-11 min-w-11 items-center justify-center focus-visible:outline-2">{paused?<Play size={18}/>:<Pause size={18}/>}</button>}</div>
 </div>;
}
