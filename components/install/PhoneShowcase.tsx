'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';


import styles from './PhoneShowcase.module.css';

export default function PhoneShowcase({label}: {label:string}) {
 
 const ref=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const node=ref.current;
  if(!node)return;
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));
  observer.observe(node);
  return ()=>observer.disconnect();
 },[]);
 
 return <div ref={ref} className={styles.showcase} data-paused={!visible}>
  <div className={styles.phone} role="img" aria-label={label}>
   <div className={styles.screen} aria-hidden="true">
    <Image className={styles.home} src="/images/install/showcase/install-safari.webp" alt="" fill sizes="(max-width:767px) 120px, 185px" />
    <Image className={styles.menu} src="/images/install/showcase/install-menu.webp" alt="" fill sizes="(max-width:767px) 120px, 185px" />
    <Image className={styles.sheet} src="/images/install/showcase/install-share.webp" alt="" fill sizes="(max-width:767px) 120px, 185px" />
    <Image className={styles.result} src="/images/install/showcase/install-home.webp" alt="" fill sizes="(max-width:767px) 120px, 185px" />
    <Image className={styles.opened} src="/images/install/showcase/install-open.png" alt="" fill sizes="(max-width:767px) 120px, 185px" />
    <span className={styles.touch}/>
    <span className={styles.sensor}/>
   </div>
  </div>
  
 </div>;
}
