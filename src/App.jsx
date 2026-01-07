import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import { useEffect, useState } from "react";
import { initSmoothScrolling } from "./utils/smoothScroll";
import Loader from "./components/Loader";
import Stairs from "./components/Stairs";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const [hasExplored, setHasExplored] = useState(false);

  useEffect(() => {
    const cleanup = initSmoothScrolling();
    return cleanup;
  }, []);

  return (
    <>
      {showLoader && (
        <Loader
          onFinish={() => {
            setSlideUp(true);
            setTimeout(() => setShowLoader(false), 800);
          }}
          slideUp={slideUp}
        />
      )}

      <Navbar />

      {/* HERO ALWAYS VISIBLE */}
      <Hero onExplore={() => setHasExplored(true)} />

      {/* REST OF PAGE — REVEALED VIA STAIRS */}
      {hasExplored && (
        <Stairs>
          <ShowcaseSection />
          <LogoShowcase />
          <FeatureCards />
          <Experience />
          <TechStack />
          <Testimonials />
          <Contact />
          <Footer />
        </Stairs>
      )}
    </>
  );
};

export default App;
