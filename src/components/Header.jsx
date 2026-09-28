import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

/**
 * Represents the header component containing the logo and navigation links.
 *
 * @component
 */

const Header = () => {
  return (
    <header className="header">
      {/* Link to the home page */}
      <NavLink to="/">
        {/* Animated logo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          {/* Animated logo image */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="logo"
            style={{
              display: "inline-block",
              fontWeight: "800",
              fontSize: "clamp(22px, 6vw, 28px)",
              letterSpacing: "2px",
              color: "var(--hl-color)",
            }}
          >
            EB
          </motion.span>
        </motion.div>
      </NavLink>
      {/* Navigation links */}
      <NavLinks />
    </header>
  );
};

export default Header;
