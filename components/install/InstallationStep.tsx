import type { LucideIcon } from 'lucide-react';
import styles from './InstallationGuide.module.css';
export default function InstallationStep({index,icon:Icon,heading,description,labels}:{index:number;icon:LucideIcon;heading:string;description:string;labels:readonly string[]}) {
 return <li className={styles.step}><Icon className={styles.actionIcon} aria-hidden="true"/><div className={styles.stepCopy}><span className={styles.number} aria-hidden="true">0{index+1}</span><h3>{heading}</h3><p>{description}</p>{labels.length>0&&<div className={styles.references}>{labels.map(label=><span key={label}>{label}</span>)}</div>}</div></li>;
}
