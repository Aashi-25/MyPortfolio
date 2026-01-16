import { useRef, useState } from "react";
import Navbar from "./components/NavBar";
import Stairs from "./components/Stairs";
import Hero from "./sections/Hero";
import ExploreCTA from "./components/ExploreCTA";
import ShowcaseSection from "./sections/ShowcaseSection";
import ProblemStatementBand from "./sections/ProblemStatementBand";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Loader from "./components/Loader";
import SectionBackground from "./components/ui/SectionBackground";

const App = () => {
  const stairsRef = useRef(null)
  const [showLoader, setShowLoader] = useState(true)
  const [slideUp, setSlideUp] = useState(false)
  const [view, setView] = useState('hero')

  const handleExplore = () => {
    if (!stairsRef.current) return
    stairsRef.current.play()

    // Switch content DURING black screen
    setTimeout(() => {
      setView('content')
      window.scrollTo(0, 0)
    }, 700)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    
    if (view === 'hero') return // Already on hero
    
    if (!stairsRef.current) return
    stairsRef.current.play()

    // Switch back to hero DURING black screen
    setTimeout(() => {
      setView('hero')
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
          <Navbar onLogoClick={handleLogoClick} />

          <Stairs ref={stairsRef}>
            {view === 'hero' && (
              <>
                <Hero />
                <ExploreCTA key="hero-cta" onExplore={handleExplore} />
              </>
            )}

            {view === 'content' && (
              <>
                <ShowcaseSection />
                <ProblemStatementBand />
                {/* <LogoShowcase />
                <FeatureCards /> */}
                <SectionBackground>
                  <Experience />
                  <TechStack />
                  <Testimonials />
                  </SectionBackground>
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
