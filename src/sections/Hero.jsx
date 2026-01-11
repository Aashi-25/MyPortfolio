import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Video from "./Video";
import { useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

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
      <div className="absolute inset-0 -z-20 bg-black/50 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

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
        </div>
      </div>
    </section>
  );
};

export default Hero;
