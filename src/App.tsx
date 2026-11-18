import { lazy, Suspense, useCallback, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import BoostMeter from "./components/BoostMeter";
import Goal from "./components/Goal";
import Header from "./components/Header";
import Intro from "./components/Intro";
import ScrollManager from "./components/ScrollManager";
import { IntroContext, markIntroSeen, shouldPlayIntro } from "./hooks/intro";
import { useTabAwayTitle } from "./hooks/useDocumentTitle";
import { useKonami } from "./hooks/useKonami";
import { useI18n } from "./i18n/context";
import HomePage from "./pages/HomePage";

const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

/** Anciennes URLs du site (/portfolio/:slug) conservées pour ne casser aucun lien partagé. */
function LegacyProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/projets/${slug ?? ""}`} replace />;
}

export default function App() {
  const { t } = useI18n();
  const [introPlaying, setIntroPlaying] = useState(shouldPlayIntro);
  const [introRevealed, setIntroRevealed] = useState(!introPlaying);
  const [goal, setGoal] = useState(false);

  useTabAwayTitle(t.meta.tabAway);
  useKonami(useCallback(() => setGoal(true), []));
  const endGoal = useCallback(() => setGoal(false), []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Défilement fluide, un peu plus rapide que le réglage par défaut à la molette */}
      <ReactLenis root options={{ lerp: 0.13, wheelMultiplier: 1.4, autoRaf: true }} />
      <IntroContext.Provider value={introRevealed}>
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        {introPlaying && (
          <Intro
            onReveal={() => setIntroRevealed(true)}
            onDone={() => {
              markIntroSeen();
              setIntroPlaying(false);
            }}
          />
        )}
        <ScrollManager />
        <Header />
        <Suspense fallback={<div style={{ minHeight: "100dvh" }} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projets/:slug" element={<ProjectPage />} />
            <Route path="/portfolio/:slug" element={<LegacyProjectRedirect />} />
            {["portfolio", "experience", "formation", "competences", "contact", "resume"].map((old) => (
              <Route key={old} path={`/${old}`} element={<Navigate to="/" replace />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <BoostMeter />
        {goal && <Goal onDone={endGoal} />}
      </IntroContext.Provider>
    </MotionConfig>
  );
}
