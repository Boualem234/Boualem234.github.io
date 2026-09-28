import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import LightDarkToggle from "./LightDarkToggle";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Represents navigation links and menu toggles.
 *
 * @component
 */

const NavLinks = () => {
  // State to track whether the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  return (
    <>
      {/* Navigation links */}
      <nav id="main-navigation" className={`links ${isMenuOpen ? "open" : "closed"}`}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
        >
          {/* Home link */}
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            {t.nav.home}
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          {/* Portfolio link */}
          <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)}>
            {t.nav.portfolio}
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5, type: "spring" }}
        >
          <NavLink to="/formation" onClick={() => setIsMenuOpen(false)}>
            {t.nav.formation}
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.5, type: "spring" }}
        >
          <NavLink to="/experience" onClick={() => setIsMenuOpen(false)}>
            {t.nav.experience}
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <NavLink to="/competences" onClick={() => setIsMenuOpen(false)}>
            {t.nav.competences}
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          {/* Contact link */}
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
            {t.nav.contact}
          </NavLink>
        </motion.div>
      </nav>
      <div className="headerActions">
        {/* Language toggle FR/EN */}
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
        {/* Theme toggle: always visible, even on mobile with closed menu */}
        <LightDarkToggle />
        {/* Menu toggle button (mobile only, see index.css) */}
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
