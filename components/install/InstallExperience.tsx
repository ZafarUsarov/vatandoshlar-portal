'use client';
import { useEffect, useState } from 'react';
import PhoneShowcase from './PhoneShowcase';
import { Check } from 'lucide-react';
import InstallationGuide from './InstallationGuide';

import { installContent, type InstallLocale } from '@/data/install/content';
import styles from './Install.module.css';
export default function InstallExperience({locale}:{locale:InstallLocale}) {
 const t=installContent[locale];

 const [installed,setInstalled]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(display-mode: standalone)');
  const sync=()=>setInstalled(media.matches || (navigator as Navigator & {standalone?:boolean}).standalone===true);
  const onInstalled=()=>setInstalled(true);
  window.addEventListener('appinstalled',onInstalled);media.addEventListener('change',sync);
  sync();
  return ()=>{window.removeEventListener('appinstalled',onInstalled);media.removeEventListener('change',sync);};
 },[]);
 return <><section className={styles.hero}><div className={styles.heroCopy}><p className={styles.eyebrow}>{t.eyebrow}</p><h1><span>UzDe.</span><span>{t.titleLine}</span></h1><p className={styles.description}>{t.description}</p><p className={styles.meta}>{t.meta}</p>{installed&&<p className={styles.installed} role="status"><Check size={20}/>{t.installed}</p>}</div><div className={styles.device}><PhoneShowcase label={t.phone}/></div></section>
 <InstallationGuide locale={locale}/></>;
}
