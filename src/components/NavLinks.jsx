import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import LightDarkToggle from "./LightDarkToggle";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Navigation single-page : burger sur mobile, rangée ouverte sur desktop.
 * Ancres avec scroll fluide + section active. Le header sticky garde
 * la navigation visible pendant le scroll.
 * Ordre : Accueil > Expérience > Formation > Compétences > Projets > Contact.
 */
const SECTIONS = [
  { id: "accueil", key: "home" },
  { id: "experience", key: "experience" },
  { id: "formation", key: "formation" },
  { id: "competences", key: "competences" },
  { id: "projets", key: "portfolio" },
  { id: "contact", key: "contact" },
];

const NavLinks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("accueil");
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, lang]);

  const goTo = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav id="main-navigation" className={`links ${isMenuOpen ? "open" : "closed"}`} aria-label="Navigation principale">
        {SECTIONS.map(({ id, key }, i) => {
          const active = isHome && activeId === id;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 - i * 0.03, duration: 0.4 }}
            >
              <a
                href={`#${id}`}
                onClick={(e) => goTo(e, id)}
                className={active ? "active" : ""}
                aria-current={active ? "true" : undefined}
              >
                {t.nav[key]}
              </a>
            </motion.div>
          );
        })}
      </nav>
      <div className="headerActions">
        <button
          className="langToggle"
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          aria-label="Changer de langue / Switch language"
          style={{
            background: "transparent",
            border: "1px solid var(--hl-color)",
            borderRadius: "20px",
            color: "var(--text-color)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1px",
            padding: "10px 16px",
            minHeight: "44px",
          }}
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>
        <LightDarkToggle />
        <button
          className="dropdown-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>
    </>
  );
};

export default NavLinks;
