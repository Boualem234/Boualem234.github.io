import styles from "./Scissors.module.css";

type Props = {
  /** `snip` : coupe en boucle ; `open` : lames ouvertes ; `closed` : au repos. */
  state?: "closed" | "open" | "snip";
  className?: string;
};

/**
 * Ciseaux dessinés en deux pièces (lame + anneau opposé), qui pivotent
 * autour de la vis comme de vrais ciseaux.
 */
export default function Scissors({ state = "closed", className }: Props) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={[styles.scissors, styles[state], className].filter(Boolean).join(" ")}
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.bladeA}>
        <path d="M23 20 L62 20 Q49 16 26 16.2 Z" fill="currentColor" />
        <path d="M26 21 L15.5 27.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <circle cx="10.5" cy="30.5" r="5.6" stroke="currentColor" strokeWidth="2.8" fill="none" />
      </g>
      <g className={styles.bladeB}>
        <path d="M23 20 L62 20 Q49 24 26 23.8 Z" fill="currentColor" />
        <path d="M26 19 L15.5 12.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <circle cx="10.5" cy="9.5" r="5.6" stroke="currentColor" strokeWidth="2.8" fill="none" />
      </g>
      <circle cx="26" cy="20" r="1.7" className={styles.pivot} />
    </svg>
  );
}
