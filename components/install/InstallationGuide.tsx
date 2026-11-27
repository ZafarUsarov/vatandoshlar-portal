'use client';
import {useState,useSyncExternalStore} from 'react';
import {Share,SquarePlus,Check,EllipsisVertical,Download,Globe,Info,CheckCircle} from 'lucide-react';
import {installationGuide, type InstallLocale} from '@/data/install/content';
import InstallationStep from './InstallationStep';
import ShareButton from '@/components/shared/ShareButton';
import {installContent} from '@/data/install/content';
import styles from './InstallationGuide.module.css';
import base from './Install.module.css';
type Platform='ios'|'android';
function subscribeBrowser() {
  return () => {};
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  const hints = (navigator as Navigator & {
    userAgentData?: { platform?: string };
  }).userAgentData;
  const ipad = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  const android = !ipad && (/Android/i.test(ua) || hints?.platform === 'Android');
  const embedded = /Instagram|FBAN|FBAV|Telegram|\bwv\b/i.test(ua);
  return `${android ? 'android' : 'ios'}${embedded ? ':embedded' : ''}`;
}

const icons={ios:[Share,SquarePlus,Check],android:[EllipsisVertical,Download,Check]};
function PlatformIcon({platform}:{platform:Platform}){return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">{platform==='ios'?<path d="M17.1 12.3c0-2 1.6-3 1.7-3.1-1-1.5-2.6-1.7-3.2-1.7-1.4-.2-2.7.8-3.4.8-.7 0-1.8-.8-3-.8C6.7 7.6 4.5 9.5 4.5 13c0 2.2.8 4.5 2 6.1 1 1.4 1.9 2.5 3.2 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.4 0 2.2-1.2 3.1-2.5.7-1 1.1-2 1.3-2.6-.1 0-3.4-1.3-3.4-4.1ZM15 5.9c.8-.9 1.3-2.1 1.2-3.4-1.1.1-2.4.8-3.2 1.7-.7.8-1.4 2-1.2 3.2 1.2.1 2.4-.6 3.2-1.5Z"/>:<><path d="M3 16a9 9 0 0 1 4-7.5L5.5 6l1-.6 1.6 2.5a9 9 0 0 1 7.8 0l1.6-2.5 1 .6L17 8.5a9 9 0 0 1 4 7.5Z"/><circle cx="8" cy="12" r="1" fill="var(--uzde-editorial-bg)"/><circle cx="16" cy="12" r="1" fill="var(--uzde-editorial-bg)"/></>}</svg>}
export default function InstallationGuide({locale}:{locale:InstallLocale}){
 const t=installationGuide[locale];const detected = useSyncExternalStore(
    subscribeBrowser,
    detectBrowser,
    () => 'ios'
  );
  const [selectedPlatform,setPlatform]=useState<Platform | null>(null);
  const platform=selectedPlatform ?? (detected.startsWith('android')?'android':'ios');
  const embedded=detected.endsWith(':embedded');

 return <section id="anleitung" className={`${base.section} ${styles.guide}`} aria-labelledby="install-guide-title"><div className={styles.headingRow}><p className={base.eyebrow}>{t.eyebrow}</p><div className={styles.share}><ShareButton locale={locale} title={installContent[locale].title} shareUrl={`https://uzde.de/${locale}/install`} variant="guide" iconOnly ariaLabel={installContent[locale].share}/></div></div><h2 id="install-guide-title">{t.heading}</h2><p className={base.description}>{t.description}</p><div className={styles.selector} role="group" aria-label={t.platformLabel}>{(['ios','android'] as const).map(p=><button key={p} type="button" aria-pressed={p===platform} onClick={()=>{setPlatform(p)}}><PlatformIcon platform={p}/><span>{p==='ios'?'iPhone / Safari':'Android / Chrome'}</span>{p===platform&&<Check size={16} aria-hidden="true"/>}</button>)}</div><div className={styles.panel} key={platform}><p className={styles.preparation}><Globe size={20} aria-hidden="true"/><span>{t[platform].intro.split('uzde.de')[0]}<strong>uzde.de</strong>{t[platform].intro.split('uzde.de')[1]}</span></p>{embedded&&<aside className={styles.notice}><Info size={20} aria-hidden="true"/><div><strong>{t.browserHeading}</strong><p>{t.browserDescription}</p></div></aside>}<ol className={styles.steps}>{t[platform].steps.map((step,i)=><InstallationStep key={i} index={i} icon={icons[platform][i]} {...step}/>)}</ol></div><p className={styles.complete}><CheckCircle size={20} aria-hidden="true"/>{t.complete}</p><p className={styles.note}>{t.note}</p></section>;
}
