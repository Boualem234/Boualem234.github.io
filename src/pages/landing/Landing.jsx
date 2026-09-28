import Hero from "../../components/Hero";
import AboutMe from "../../components/AboutMe";

/**
 * Represents the Landing page component.
 * Displays the main landing page content including Hero and About sections.
 *
 * @component
 * @param {string} name - The name of the user displayed in the Hero section.
 */

const Landing = ({ name }) => {
  // Inline styles for the main landing container
  const styles = {
    landing: {
      minHeight: "calc(100dvh - 93px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "24px 16px 48px",
    },
  };

  return (
    <>
      {/* Main Landing Page */}
      <main className="landing container" style={styles.landing}>
        {/* Display the hero component */}
        <Hero name={name} />
      </main>

      {/* Display the about section */}
      <AboutMe name={name} />
    </>
  );
};

export default Landing;
