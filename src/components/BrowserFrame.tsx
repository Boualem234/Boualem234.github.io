import type { ReactNode } from "react";
import styles from "./BrowserFrame.module.css";

/** Cadre de navigateur minimal pour présenter une capture d'écran. */
export default function BrowserFrame({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={[styles.frame, className].filter(Boolean).join(" ")}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
