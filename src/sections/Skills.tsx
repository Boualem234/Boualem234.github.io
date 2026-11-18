import type { MouseEvent, ReactNode } from "react";
import { motion } from "motion/react";
import SectionHeading from "../components/SectionHeading";
import { skillGroups } from "../data/skills";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable from "../i18n/Stable";
import styles from "./Skills.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

/** Carte avec halo lumineux qui suit le curseur. */
function SpotlightCard({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      className={`${styles.card} ${className ?? ""}`}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.article>
  );
}

export default function Skills() {
  const { t } = useI18n();
  const s = t.skills;

  return (
    <section id="competences" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          id="skills-heading"
          index="04"
          copy={(u) => u.skills}
        />

        <div className={styles.bento}>
          {skillGroups.map((group, i) => (
            <SpotlightCard key={group.id} className={styles[group.id]} delay={i * 0.06}>
              <header className={styles.head}>
                <h3>
                  <Stable text={group.title} />
                </h3>
              </header>
              <ul className={styles.skills}>
                {group.skills.map(({ name, icon: Icon }) => (
                  <li key={name}>
                    <Icon aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}

          <SpotlightCard className={styles.languages} delay={0.1}>
            <header className={styles.head}>
              <h3>
                <Stable text={both((u) => u.skills.languagesTitle)} />
              </h3>
            </header>
            <ul className={styles.langList}>
              {s.languages.map((language, i) => (
                <li key={i}>
                  <Stable className={styles.langName} text={both((u) => u.skills.languages[i]?.name ?? "")} />
                  <span className={styles.langScale} aria-hidden="true">
                    {CEFR.map((level, n) => (
                      <span key={level} className={n < language.score ? styles.on : undefined} title={level} />
                    ))}
                  </span>
                  <Stable className={styles.langLevel} text={both((u) => u.skills.languages[i]?.level ?? "")} />
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
