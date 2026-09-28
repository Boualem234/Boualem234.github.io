import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import profileImage from "../images/profile.jpg";
import SocialIcons from "./SocialIcons";
import Button from "./Button";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Represents the hero section of the page.
 *
 * @component
 * @param {string} name - The name to be displayed in the hero section.
 */

const Hero = ({ name }) => {
  const { t, lang } = useLanguage();
  const skillGroups = [
    {
      title: lang === "en" ? "Back-end & APIs" : "Back-end & APIs",
      items: ["Python (Django, Ninja)", "C# (ASP.NET Core)", "API REST", "Huey"],
    },
    {
      title: lang === "en" ? "Front-end & DataViz" : "Front-end & DataViz",
      items: ["JavaScript", "HTMX", "Blazor", "Chart.js", "Tabler / Bootstrap"],
    },
    {
      title: lang === "en" ? "Databases & Design" : "Bases de données & Conception",
      items: ["PostgreSQL", "MySQL", "SQL Server", "MVC / MVVM / MVT"],
    },
    {
      title: lang === "en" ? "Cloud, DevOps & Methods" : "Cloud, DevOps & Méthodes",
      items: ["Docker", "Coolify", "S3 OVHcloud", "Sentry", "CI/CD", "GitFlow", "Scrum"],
    },
  ];
  // Styles for various elements (tailles avatar/nom pilotées par hero.css)
  const styles = {
    avatar: {
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid var(--hl-color)",
      marginBottom: "16px",
    },

    textContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      letterSpacing: "1px",
      textAlign: "center",
      zIndex: "1",
      color: "var(--text-color)",
      textShadow: "var(--hero-shadow)",
    },

    name: {
      color: "var(--text-color)",
      fontWeight: "700",
      paddingBottom: "28px",
    },
  };
  return (
    <>
      <div className="textContainer" style={styles.textContainer}>
        {/* Profile photo */}
        <motion.img
          className="profileAvatar"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={styles.avatar}
          src={profileImage}
          alt={name}
        />
        {/* Animated name */}
        <motion.h1
          className="name"
          style={styles.name}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0, duration: 0.5, type: "spring" }}
        >
          {name}
        </motion.h1>
        {/* Animated description */}
        <motion.div
          className="description"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {/* Typewriter effect for dynamic text animation without a cursor */}
          <Typewriter
            key={lang}
            className="description"
            options={{
              cursor: "",
            }}
            onInit={(typewriter) => {
              typewriter.changeDelay(50).typeString(t.hero.role).start();
            }}
          />
        </motion.div>
        {/* Call-to-action buttons */}
        <motion.div
          className="heroCta"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <NavLink to="/portfolio">
            <Button name={t.hero.ctaWork} />
          </NavLink>
          <NavLink to="/contact">
            <Button name={t.hero.ctaContact} />
          </NavLink>
        </motion.div>
        {/* Social icons: photo, nom, rôle, boutons, icônes, compétences */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeInOut" }}>
          <SocialIcons />
        </motion.div>
        {/* Compétences rangées par catégorie */}
        <motion.div
          className="heroSkills"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {skillGroups.map((group) => (
            <div key={group.title} className="heroSkillGroup">
              <h4 className="heroSkillTitle">{group.title}</h4>
              <div className="heroSkillBadges">
                {group.items.map((tech) => (
                  <span key={tech} className="heroTech">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <NavLink to="/competences" className="heroSkillsLink">
            {lang === "en" ? "View all skills →" : "Voir toutes les compétences →"}
          </NavLink>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
