import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TbArrowUpRight, TbBrandGithub, TbBrandLinkedin, TbCheck, TbCopy, TbDownload, TbMail } from "react-icons/tb";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import { profile } from "../data/profile";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable, { StableStack } from "../i18n/Stable";
import { ui } from "../i18n/ui";
import styles from "./Contact.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { lang } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        {/* Le paragraphe d'intro est affiché à côté de l'e-mail, pas sous le titre. */}
        <SectionHeading
          id="contact-heading"
          index="07"
          copy={(u) => ({ label: u.contact.label, titleStart: u.contact.titleStart, titleAccent: u.contact.titleAccent })}
        />

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className={styles.lead}>
            <Stable text={both((u) => u.contact.lead)} block />
          </p>

          <div className={styles.mailBlock}>
            <a className={styles.mail} href={`mailto:${profile.email}`}>
              <TbMail aria-hidden="true" className={styles.mailIcon} />
              <span>{profile.email}</span>
            </a>
            <div className={styles.mailActions}>
              <Button href={`mailto:${profile.email}`} icon={<TbArrowUpRight />} magnetic>
                <Stable text={both((u) => u.contact.write)} />
              </Button>
              <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={copied ? `${styles.copyInner} ${styles.copied}` : styles.copyInner}
                  >
                    {copied ? <TbCheck aria-hidden="true" /> : <TbCopy aria-hidden="true" />}
                    {/* Les 4 libellés (copier/copié × FR/EN) partagent la même case : le bouton ne change pas de taille. */}
                    <StableStack
                      items={[ui.fr.contact.copy, ui.en.contact.copy, ui.fr.contact.copied, ui.en.contact.copied]}
                      active={(copied ? 2 : 0) + (lang === "en" ? 1 : 0)}
                    />
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>

        <motion.ul
          className={styles.links}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <TbBrandLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
              <span className={styles.handle}>elguendouz-boualem</span>
              <TbArrowUpRight aria-hidden="true" className={styles.arrow} />
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <TbBrandGithub aria-hidden="true" />
              <span>GitHub</span>
              <span className={styles.handle}>Boualem234</span>
              <TbArrowUpRight aria-hidden="true" className={styles.arrow} />
            </a>
          </li>
          <li>
            <a href={profile.cv} download>
              <TbDownload aria-hidden="true" />
              <Stable text={both((u) => u.contact.cv)} />
              <span className={styles.handle}>PDF</span>
              <TbArrowUpRight aria-hidden="true" className={styles.arrow} />
            </a>
          </li>
        </motion.ul>

        <dl className={styles.facts}>
          <div>
            <dt>
              <Stable text={both((u) => u.contact.locationLabel)} />
            </dt>
            <dd>
              <Stable text={both((u) => u.contact.location)} />
            </dd>
          </div>
          <div>
            <dt>
              <Stable text={both((u) => u.contact.languagesLabel)} />
            </dt>
            <dd>
              <Stable text={both((u) => u.contact.languages)} />
            </dd>
          </div>
          <div>
            <dt>
              <Stable text={both((u) => u.contact.mobilityLabel)} />
            </dt>
            <dd>
              <Stable text={both((u) => u.contact.mobility)} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
