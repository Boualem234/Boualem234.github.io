import Footer from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useI18n } from "../i18n/context";
import About from "../sections/About";
import Beyond from "../sections/Beyond";
import Contact from "../sections/Contact";
import Education from "../sections/Education";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Ribbons from "../sections/Ribbons";
import Skills from "../sections/Skills";

export default function HomePage() {
  const { t } = useI18n();
  useDocumentTitle(t.meta.title);

  return (
    <>
      <main id="main">
        <Hero />
        <Ribbons />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
