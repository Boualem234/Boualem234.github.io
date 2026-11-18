import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { LANGS, useI18n, type Localized } from "../i18n/context";
import stableStyles from "../i18n/Stable.module.css";
import styles from "./ScrollText.module.css";

type Token = { word: string; accent: boolean };

/** `*texte*` = passage mis en avant. */
function tokenize(text: string): Token[] {
  return text.split(/(\*[^*]+\*)/).flatMap((part) => {
    const accent = part.startsWith("*") && part.endsWith("*");
    return part
      .replace(/\*/g, "")
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, accent }));
  });
}

// État « éteint » encore lisible : contraste ≥ 3:1 (texte large, WCAG AA).
const DIM_OPACITY = 0.4;
const DIM_ACCENT = "rgb(122, 116, 109)";
const ACCENT = "rgb(255, 107, 53)";

function Word({ token, range, progress }: { token: Token; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [DIM_OPACITY, 1]);
  const color = useTransform(progress, range, [DIM_ACCENT, ACCENT]);
  return (
    <>
      <motion.span style={token.accent ? { color } : { opacity }}>{token.word}</motion.span>{" "}
    </>
  );
}

/**
 * Paragraphe qui s'éclaire mot à mot au fil du défilement.
 * Les versions FR et EN sont superposées : le bloc garde la hauteur de la plus longue.
 */
export default function ScrollText({ text, className }: { text: Localized; className?: string }) {
  const { lang } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <p ref={ref} className={[styles.text, className].filter(Boolean).join(" ")}>
      <span className="visually-hidden">{text[lang].replace(/\*/g, "")}</span>
      <span className={styles.stack} aria-hidden="true">
        {LANGS.map((l) => {
          const tokens = tokenize(text[l]);
          return (
            <span key={l} className={l === lang ? undefined : stableStyles.ghost}>
              {tokens.map((token, i) => (
                <Word key={i} token={token} progress={scrollYProgress} range={[i / tokens.length, (i + 1) / tokens.length]} />
              ))}
            </span>
          );
        })}
      </span>
    </p>
  );
}
