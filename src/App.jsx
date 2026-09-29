import { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Header from "./components/Header";
import SocialIcons from "./components/SocialIcons";
import HomePage from "./pages/home/HomePage";
import ProjectDetails from "./pages/portfolio/[project]/ProjectDetails";
import PageNotFound from "./pages/404/PageNotFound";
import { useLanguage } from "./i18n/LanguageContext";

function App() {
  const personalDetails = {
    name: "El Guendouz Boualem",
    location: "Marcinelle, Belgique",
    email: "boualem.elguendouz@gmail.com",
  };

  const { t } = useLanguage();
  const location = useLocation();
  const [originalTitle, setOriginalTitle] = useState();

  useEffect(() => {
    if (!originalTitle) {
      setOriginalTitle(document.title);
    }
    const handleTabChange = () => {
      if (document.hidden) {
        document.title = t.tabReturn;
      } else {
        document.title = originalTitle;
      }
    };
    window.addEventListener("visibilitychange", handleTabChange);
    return () => window.removeEventListener("visibilitychange", handleTabChange);
  }, [location, originalTitle, t]);

  return (
    <>
      <Header />
      <SocialIcons className="socialDock" />
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <HomePage
              name={personalDetails.name}
              location={personalDetails.location}
              email={personalDetails.email}
            />
          }
        />
        <Route path="/portfolio/:projectTitle" element={<ProjectDetails />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        {/* Anciennes routes à onglets -> page unique */}
        <Route path="/portfolio" element={<Navigate to="/#projets" replace />} />
        <Route path="/experience" element={<Navigate to="/#experience" replace />} />
        <Route path="/formation" element={<Navigate to="/#formation" replace />} />
        <Route path="/competences" element={<Navigate to="/#competences" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="/resume" element={<Navigate to="/#experience" replace />} />
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
    </>
  );
}

export default App;
