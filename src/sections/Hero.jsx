import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Video from "./Video";
import { useRef } from "react";

const Hero = ({ onExplore }) => {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-line-1", { opacity: 0, y: 80, duration: 1.4 })
        .from(".hero-line-2", { opacity: 0, y: 80, duration: 1.4 }, "-=1")
        .from(".hero-line-3", { opacity: 0, y: 80, duration: 1.4 }, "-=1")
        .from(".video-pill", { scale: 0.85, opacity: 0, duration: 1 }, "-=1")
        .fromTo(
          ".explore-btn",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-black text-white"
    >
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 -z-30">
        <Video />
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 -z-20 bg-black/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* HERO CONTENT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-8 font-[font1] uppercase">
        <div>
          <div className="hero-line-1 text-[10vw] lg:text-[7.5vw] leading-[9vw] lg:leading-[6.5vw]">
            The idea
          </div>

          <div className="hero-line-2 flex items-center justify-center gap-4 lg:gap-6 text-[10vw] lg:text-[7.5vw] leading-[9vw] lg:leading-[6.5vw]">
            that
            <div className="video-pill h-[7vw] w-[16vw] lg:h-[5.5vw] lg:w-[12vw] rounded-full overflow-hidden border-4 border-white/30">
              <Video />
            </div>
            becomes
          </div>

          <div className="hero-line-3 text-[10vw] lg:text-[7.5vw] leading-[9vw] lg:leading-[6.5vw]">
            reality
          </div>

          <p className="hidden lg:block mt-4 text-xs tracking-widest opacity-70">
            Developer • Product Builder • Problem Solver
          </p>

          {/* EXPLORE BUTTON */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={onExplore}
              className="
                explore-btn
                relative z-30
                opacity-100
                inline-flex items-center gap-3
                px-12 py-5
                rounded-full
                border border-white/40
                bg-white/5
                backdrop-blur-md
                uppercase
                tracking-widest
                text-sm lg:text-base
                font-semibold
                transition-all duration-500
                hover:border-[#D3FD50]
                hover:text-[#D3FD50]
                hover:bg-white/10
                hover:scale-105
                shadow-[0_0_40px_rgba(211,253,80,0.18)]
              "
            >
              Explore Work
              <span className="animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
