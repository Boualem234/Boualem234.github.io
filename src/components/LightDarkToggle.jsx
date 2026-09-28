import { useState, useEffect } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

/**
 * Represents a light/dark mode toggle button component.
 * Dark (default): black background. Light: white background.
 * Accent colors are shared by both themes.
 * The choice is persisted in localStorage.
 *
 * @component
 */

const darkColors = {
  "--bg-color": "#0e1513",
  "--bg2-color": "#16211c",
  "--hl-color": "#00b894",
  "--hl2-color": "#16a085",
  "--text-color": "#f2f7f4",
  "--secondary-text-color": "#b9c9c0",
  "--grey": "#b9c9c0",
  "--hero-shadow": "1px 1px 3px #000",
  "--card-bg-1": "#1c2b24",
  "--card-bg-2": "#14201b",
  "--card-bg-3": "#0e1513",
  "--card-shadow": "1px 1px 10px 2px rgba(0, 0, 0, 0.35)",
  "--card-border": "transparent",
  "--btn-bg": "#00b894",
  "--btn-bg-hover": "#26d1ab",
  "--btn-text": "#06281f",
  "--tech-bg": "#00b89422",
  "--tech-text": "#4fe0b5",
};

const lightColors = {
  "--bg-color": "#f4f8f6",
  "--bg2-color": "#ffffff",
  "--hl-color": "#006b52",
  "--hl2-color": "#005844",
  "--text-color": "#15212b",
  "--secondary-text-color": "#3f4c5a",
  "--grey": "#4b5a69",
  "--hero-shadow": "none",
  "--card-bg-1": "#ffffff",
  "--card-bg-2": "#e4f2ea",
  "--card-bg-3": "#c6e4d4",
  "--card-shadow": "0 6px 22px rgba(0, 107, 82, 0.16)",
  "--card-border": "#bcd9c9",
  "--btn-bg": "#006b52",
  "--btn-bg-hover": "#005844",
  "--btn-text": "#ffffff",
  "--tech-bg": "#006b5214",
  "--tech-text": "#005844",
};

const LightDarkToggle = () => {
  // State to track the current mode (dark by default)
  const [isLightMode, setLightMode] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") === "light";
    } catch {
      return false;
    }
  });

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    setLightMode(!isLightMode);
  };

  // Apply the selected mode's colors using CSS custom properties
  useEffect(() => {
    const colors = isLightMode ? lightColors : darkColors;

    for (const property in colors) {
      const value = colors[property];
      document.documentElement.style.setProperty(property, value);
    }

    try {
      localStorage.setItem("portfolio-theme", isLightMode ? "light" : "dark");
    } catch {}
  }, [isLightMode]);

  return (
    <button
      className="toggleMode"
      onClick={toggleMode}
      title={isLightMode ? "Passer en mode sombre" : "Passer en mode clair"}
      aria-label="Basculer entre le mode clair et sombre"
    >
      {isLightMode ? <MdDarkMode className="toggleIcon" /> : <CiLight className="toggleIcon" />}
    </button>
  );
};

export default LightDarkToggle;
