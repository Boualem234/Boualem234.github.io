import { Fragment, useRef } from "react";
import { motion, useInView } from "motion/react";
import { LANGS, useI18n } from "../i18n/context";
import { ui, type UiStrings } from "../i18n/ui";
import Stable from "../i18n/Stable";
import stableStyles from "../i18n/Stable.module.css";
import styles from "./SectionHeading.module.css";

type Copy = { label: string; titleStart: string; titleAccent?: string; lead?: string };

type Props = {
  /** id du titre, pour `aria-labelledby` sur la section. */
  id?: string;
  index: string;
  /** Textes de la section, lus dans chaque langue. */
  copy: (strings: UiStrings) => Copy;
  align?: "left" | "center";
};

const EASE = [0.22, 1, 0.36, 1] as const;

function splitWords({ titleStart, titleAccent }: Copy) {
  return [
    ...titleStart.split(" ").map((w) => ({ w, accent: false })),
    ...(titleAccent ? titleAccent.split(" ").map((w) => ({ w, accent: true })) : []),
  ];
}

/**
 * Titre de section : chaque mot remonte depuis un masque.
 * Les titres FR et EN sont superposés : la case garde la taille du plus grand
 * et changer de langue ne décale rien.
 */
export default function SectionHeading({ id, index, copy, align = "left" }: Props) {
  const { lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const versions = { fr: copy(ui.fr), en: copy(ui.en) };
  const lead = versions.fr.lead && versions.en.lead ? { fr: versions.fr.lead, en: versions.en.lead } : null;

  return (
    <motion.header
      ref={ref}
      className={`${styles.heading} ${align === "center" ? styles.center : ""}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.p
        className={styles.label}
        variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} />
        <Stable text={{ fr: versions.fr.label, en: versions.en.label }} />
      </motion.p>
      <h2 id={id} className={styles.title}>
        {LANGS.map((l) => (
          <span
            key={l}
            className={l === lang ? styles.layer : `${styles.layer} ${stableStyles.ghost}`}
            aria-hidden={l !== lang || undefined}
          >
            {splitWords(versions[l]).map(({ w, accent }, i) => (
              <Fragment key={i}>
                <span className={styles.mask}>
                  <motion.span
                    className={accent ? `${styles.word} serif accent` : styles.word}
                    variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
                    transition={{ duration: 0.8, delay: 0.05 + i * 0.06, ease: EASE }}
                  >
                    {w}
                  </motion.span>
                </span>{" "}
              </Fragment>
            ))}
          </span>
        ))}
      </h2>
      {lead && (
        <motion.p
          className={styles.lead}
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <Stable text={lead} block />
        </motion.p>
      )}
    </motion.header>
  );
}
