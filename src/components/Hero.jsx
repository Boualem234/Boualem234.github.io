import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import profileImage from "../images/profile.jpg";
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
  // Styles for various elements (tailles avatar/nom pilotées par hero.css)
  const styles = {
    avatar: {
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid var(--hl-color)",
      marginBottom: "12px",
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
      paddingBottom: "12px",
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
        {/* Call-to-action buttons : ancres vers la page unique */}
        <motion.div
          className="heroCta"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <a href="#projets">
            <Button name={t.hero.ctaWork} />
          </a>
          <a href="#contact">
            <Button name={t.hero.ctaContact} />
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;
