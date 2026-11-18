import type { InterestId } from "../data/interests";
import Scissors from "./Scissors";
import styles from "./InterestIcon.module.css";

/** Illustrations animées des centres d'intérêt (animation au survol de la carte parente). */
export default function InterestIcon({ id }: { id: InterestId }) {
  switch (id) {
    case "hair":
      return (
        <div className={`${styles.icon} ${styles.hair}`} aria-hidden="true">
          <Scissors className={styles.hairScissors} />
          <span className={styles.strand} />
          <span className={styles.strand} />
          <span className={styles.strand} />
        </div>
      );
    case "gym":
      return (
        <svg viewBox="0 0 120 120" className={`${styles.icon} ${styles.gym}`} aria-hidden="true">
          <line x1="16" y1="94" x2="104" y2="94" className={styles.ground} />
          <g className={styles.barbell}>
            <line x1="14" y1="60" x2="106" y2="60" className={styles.bar} />
            <rect x="22" y="40" width="9" height="40" rx="2.5" className={styles.plate} />
            <rect x="33" y="47" width="7" height="26" rx="2" className={styles.plateSmall} />
            <rect x="89" y="40" width="9" height="40" rx="2.5" className={styles.plate} />
            <rect x="80" y="47" width="7" height="26" rx="2" className={styles.plateSmall} />
          </g>
          <text x="104" y="28" textAnchor="end" className={styles.reps}>
            ×12
          </text>
        </svg>
      );
    case "reading":
      return (
        <svg viewBox="0 0 120 120" className={`${styles.icon} ${styles.reading}`} aria-hidden="true">
          <path d="M60 36 C 48 28, 30 28, 16 32 L16 88 C 30 84, 48 84, 60 92 Z" className={styles.page} />
          <path d="M60 36 C 72 28, 90 28, 104 32 L104 88 C 90 84, 72 84, 60 92 Z" className={styles.page} />
          <path d="M60 36 C 72 28, 90 28, 104 32 L104 88 C 90 84, 72 84, 60 92 Z" className={styles.flip} />
          <path d="M26 46 H50 M26 56 H50 M26 66 H44 M70 46 H94 M70 56 H94 M70 66 H88" className={styles.lines} />
          <line x1="60" y1="36" x2="60" y2="92" className={styles.spine} />
        </svg>
      );
    case "family":
      return (
        <svg viewBox="0 0 120 120" className={`${styles.icon} ${styles.family}`} aria-hidden="true">
          <path d="M20 58 L60 24 L100 58 M30 50 V98 H90 V50" className={styles.house} />
          <path
            d="M60 86 C 44 74, 40 66, 44 60 C 47 55, 55 55, 60 62 C 65 55, 73 55, 76 60 C 80 66, 76 74, 60 86 Z"
            className={styles.heart}
          />
        </svg>
      );
  }
}
