import type { CSSProperties, ReactNode } from "react";
import styles from "./Marquee.module.css";

type Props = {
  items: ReactNode[];
  /** Séparateur fixe, ou fonction de l'index pour varier les séparateurs. */
  separator?: ReactNode | ((index: number) => ReactNode);
  /** Durée d'un tour complet, en secondes. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/** Bandeau défilant infini (contenu dupliqué, animation CSS). */
export default function Marquee({ items, separator, duration = 40, reverse = false, className }: Props) {
  const group = (hidden: boolean) => (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className={styles.item}>
          {item}
          {separator && <span className={styles.separator}>{typeof separator === "function" ? separator(i) : separator}</span>}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={[styles.marquee, reverse && styles.reverse, className].filter(Boolean).join(" ")}
      style={{ "--duration": `${duration}s` } as CSSProperties}
    >
      {group(false)}
      {group(true)}
    </div>
  );
}
