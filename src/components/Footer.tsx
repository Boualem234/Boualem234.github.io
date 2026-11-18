import { TbArrowUp, TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import { profile } from "../data/profile";
import { useScrollTo } from "../hooks/useScrollTo";
import { both } from "../i18n/both";
import { useI18n } from "../i18n/context";
import Stable from "../i18n/Stable";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useI18n();
  const scrollTo = useScrollTo();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <p className={styles.name}>© {new Date().getFullYear()} {profile.fullName}</p>
          <p className={styles.credit}>
            <a href="https://github.com/mdyeates/my-portfolio" target="_blank" rel="noreferrer">
              <Stable text={both((u) => u.footer.credit)} />
            </a>
          </p>
        </div>
        <nav className={styles.links} aria-label={t.a11y.footerNav}>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <TbBrandLinkedin aria-hidden="true" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <TbBrandGithub aria-hidden="true" />
          </a>
          <button type="button" className={styles.top} onClick={() => scrollTo(0)}>
            <Stable text={both((u) => u.footer.top)} />
            <TbArrowUp aria-hidden="true" />
          </button>
        </nav>
      </div>
    </footer>
  );
}
