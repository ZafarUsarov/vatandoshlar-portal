import styles from "./AnimatedO.module.css";

export default function AnimatedO() {
  return (
    <span className={styles.letter} aria-label="Ö">
      <span className={styles.measure} aria-hidden="true">Ö</span>
      <span className={styles.base} aria-hidden="true">O</span>
      <span className={styles.dots} aria-hidden="true">
        <span className={styles.eye}><span className={styles.pupil} /></span>
        <span className={styles.eye}><span className={styles.pupil} /></span>
      </span>
    </span>
  );
}
