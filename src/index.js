// Import dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

// Import global and page-specific styles
import "./index.css";
import "./pages/landing/hero.css";
import "./pages/landing/about.css";
import "./pages/portfolio/portfolio.css";
import "./pages/info/info.css";
import "./pages/resume/resume.css";
import "./pages/contact/contact.css";
import "./pages/404/pageNotFound.css";

// Import the main App component
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";

// Initialize the root element and render the application
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
