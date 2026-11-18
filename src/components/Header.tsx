import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { TbDownload, TbMenu2, TbX } from "react-icons/tb";
import { profile } from "../data/profile";
import { both } from "../i18n/both";
import { useI18n, type Localized } from "../i18n/context";
import Stable from "../i18n/Stable";
import { useScrollTo } from "../hooks/useScrollTo";
import styles from "./Header.module.css";

const SECTIONS = ["experience", "projets", "competences", "formation", "hors-code"] as const;

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const scrollTo = useScrollTo();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const labels: Record<(typeof SECTIONS)[number] | "contact", Localized> = {
    experience: both((u) => u.nav.experience),
    projets: both((u) => u.nav.projects),
    competences: both((u) => u.nav.skills),
    formation: both((u) => u.nav.education),
    "hors-code": both((u) => u.nav.beyond),
    contact: both((u) => u.nav.contact),
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > previous && !open);
  });

  // Section visible -> lien actif dans la navigation.
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const ids = [...SECTIONS, "accueil", "contact"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  // Menu mobile ouvert : la page ne défile plus. La section demandée est rejointe à la fermeture.
  // (On ne touche à Lenis que menu ouvert, pour ne pas relancer le défilement pendant l'intro.)
  const pendingSection = useRef<string | null>(null);
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      root.style.overflow = "";
      lenis?.start();
      if (pendingSection.current) {
        scrollTo(pendingSection.current);
        pendingSection.current = null;
      }
    };
  }, [open, lenis, scrollTo]);

  const current = pathname === "/" ? active : null;

  const goTo = (e: MouseEvent, id: string) => {
    e.preventDefault();
    if (pathname !== "/") {
      setOpen(false);
      navigate(`/#${id}`);
    } else if (open) {
      pendingSection.current = id;
      setOpen(false);
    } else {
      scrollTo(id);
    }
  };

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <>
      <motion.header
        className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label={t.header.home} onClick={(e) => goTo(e, "accueil")}>
            <span className={styles.mark}>
              EB<span className={styles.markCut} />
            </span>
            <span className={styles.logoName}>
              Boualem <span>El Guendouz</span>
            </span>
          </Link>

          <nav className={styles.nav} aria-label={t.a11y.mainNav}>
            <ul>
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`${import.meta.env.BASE_URL}#${id}`}
                    onClick={(e) => goTo(e, id)}
                    className={current === id ? styles.active : undefined}
                    aria-current={current === id ? "location" : undefined}
                  >
                    <Stable text={labels[id]} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.lang} onClick={toggleLang} aria-label={t.header.switchLang}>
              <span className={lang === "fr" ? styles.langOn : undefined}>FR</span>
              <span className={lang === "en" ? styles.langOn : undefined}>EN</span>
            </button>
            <a className={styles.cv} href={profile.cv} download>
              <TbDownload aria-hidden="true" />
              <Stable text={both((u) => u.header.cv)} />
            </a>
            <a className={styles.contact} href={`${import.meta.env.BASE_URL}#contact`} onClick={(e) => goTo(e, "contact")}>
              <Stable text={both((u) => u.header.contact)} />
            </a>
            <button
              type="button"
              className={styles.burger}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.header.close : t.header.menu}
            >
              {open ? <TbX /> : <TbMenu2 />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.mobile}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label={t.a11y.mobileNav}>
              <ul>
                {[...SECTIONS, "contact" as const].map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  >
                    <a href={`${import.meta.env.BASE_URL}#${id}`} onClick={(e) => goTo(e, id)}>
                      <span className={styles.mobileIndex}>0{i + 1}</span>
                      <Stable text={labels[id]} />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileFooter}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className={styles.cv} href={profile.cv} download>
                <TbDownload aria-hidden="true" />
                <Stable text={both((u) => u.header.cv)} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
