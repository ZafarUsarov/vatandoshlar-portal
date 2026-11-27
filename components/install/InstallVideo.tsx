import { installContent } from '@/data/install/content';
import styles from './Install.module.css';
export default function InstallVideo({de}:{de:boolean}) {
 const t=installContent[de?'de':'uz'];
 return <section className={`${styles.section} ${styles.videoSection}`} aria-labelledby="install-video-title"><div><p className={styles.eyebrow}>{t.videoLabel}</p><h2 id="install-video-title">{t.videoTitle}</h2><p className={styles.description}>{t.videoDescription}</p></div><video className={styles.video} controls playsInline preload="none" poster="/images/install/uzde-video-poster.jpg" aria-label={t.videoAria}><source src="/videos/uzde-install-guide.mp4" type="video/mp4"/>{t.videoFallback}</video></section>;
}
