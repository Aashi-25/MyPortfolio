import { useRef, useState } from "react";
import Navbar from "./components/NavBar";
import Stairs from "./components/Stairs";
import Hero from "./sections/Hero";
import ExploreCTA from "./components/ExploreCTA";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Loader from "./components/Loader";

const App = () => {
  const stairsRef = useRef(null)
  const [showLoader, setShowLoader] = useState(true)
  const [slideUp, setSlideUp] = useState(false)
  const [view, setView] = useState('hero')

  const handleExplore = () => {
    stairsRef.current.play()

    // Switch content DURING black screen
    setTimeout(() => {
      setView('content')
      window.scrollTo(0, 0)
    }, 700)
  }

  return (
    <>
      {/* LOADER */}
      {showLoader && (
        <Loader
          slideUp={slideUp}
          onFinish={() => {
            setSlideUp(true)
            setTimeout(() => setShowLoader(false), 800)
          }}
        />
      )}

      {!showLoader && (
        <>
          <Navbar />

          <Stairs ref={stairsRef}>
            {view === 'hero' && (
              <>
                <Hero />
                <ExploreCTA onExplore={handleExplore} />
              </>
            )}

            {view === 'content' && (
              <>
                <ShowcaseSection />
                <LogoShowcase />
                <FeatureCards />
                <Experience />
                <TechStack />
                <Testimonials />
                <Contact />
                <Footer />
              </>
            )}
          </Stairs>
        </>
      )}
    </>
  )
}

export default App;
