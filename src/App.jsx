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

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Initialize enhanced smooth scrolling
    const cleanup = initSmoothScrolling();
    return cleanup;
  }, []);

  return (
    <>
      {showLoader && (
        <Loader
          onFinish={() => {
            setSlideUp(true);
            setTimeout(() => setShowLoader(false), 800); // match Loader's transition
          }}
          slideUp={slideUp}
        />
      )}
      {/* Main portfolio is always rendered */}
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
