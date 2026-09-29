import { motion } from "framer-motion";

/**
 * Icônes sociales GitHub / LinkedIn.
 * Utilisé comme pastille fixe en bas à gauche (className="socialDock").
 *
 * @component
 * @param {string} className - Classe additionnelle pour le positionnement.
 */

const SocialIcons = ({ className = "" }) => {
  // Define styles for the icons
  const styles = {
    icon: {
      textDecoration: "none",
      fontSize: "22px",
      padding: "10px",
      transition: "0.2s ease-in",
    },
  };

  return (
    <div className={`socialIcons ${className}`.trim()}>
      <a
        className="icon"
        style={styles.icon}
        href="https://github.com/Boualem234"
        target="_blank"
        rel="noreferrer"
        aria-label="Profil GitHub de El Guendouz Boualem"
      >
        {/* GitHub Icon */}
        <motion.i
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
          className="fa-brands fa-github"
          aria-hidden="true"
          title="El Guendouz Boualem GitHub Profile"
        ></motion.i>
      </a>
      <a
        className="icon"
        style={styles.icon}
        href="https://www.linkedin.com/in/elguendouz-boualem/"
        target="_blank"
        rel="noreferrer"
        aria-label="Profil LinkedIn de El Guendouz Boualem"
      >
        {/* LinkedIn Icon */}
        <motion.i
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          className="fa-brands fa-linkedin"
          aria-hidden="true"
          title="El Guendouz Boualem LinkedIn Profile"
        ></motion.i>
      </a>
    </div>
  );
};

export default SocialIcons;
