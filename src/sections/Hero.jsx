import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Video from "./Video";

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-line-1", { opacity: 0, y: 80, duration: 1.4 })
      .from(".hero-line-2", { opacity: 0, y: 80, duration: 1.4 }, "-=1")
      .from(".hero-line-3", { opacity: 0, y: 80, duration: 1.4 }, "-=1")
      .from(".video-pill", { scale: 0.85, opacity: 0, duration: 1 }, "-=1")
      .from(".description-text", { opacity: 0, y: 40, duration: 1.2 }, "-=0.6")
      .from(".cta-button", { opacity: 0, y: 30, duration: 1 }, "-=0.8");
  });

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">

      {/* Background Video */}
      <div className="absolute inset-0 -z-30">
        <Video />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-20 bg-black/50" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* HERO CONTENT */}
      <div className="relative z-10 h-screen flex flex-col justify-between items-center text-center px-8 py-20 font-[font1] uppercase">

        {/* Headline */}
        <div>
          <div className="hero-line-1 text-[10vw] lg:text-[7.5vw] leading-[9vw] lg:leading-[6.5vw] drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
            The idea
          </div>

          <div className="hero-line-2 flex items-center gap-4 lg:gap-6 text-[10vw] lg:text-[7.5vw] leading-[9vw] lg:leading-[6.5vw] drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
            that
            <div className="video-pill h-[7vw] w-[16vw] lg:h-[5.5vw] lg:w-[12vw] rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              <Video />
            </div>
            becomes
          </div>

          <div className="hero-line-3 text-[10vw] lg:text-[7.5vw] leading-[9vw] lg:leading-[6.5vw] drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
            reality
          </div>

          <p className="hidden lg:block mt-4 text-xs tracking-widest opacity-70">
            Developer • Product Builder • Problem Solver
          </p>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center gap-6 mb-6">

          <p className="description-text max-w-3xl text-xs lg:text-base leading-tight lg:leading-relaxed text-center opacity-90">
            I design and build digital products that solve real problems. From ideas to
            production-ready experiences, I focus on clean code, thoughtful design, and
            meaningful impact.
          </p>

          {/* EXPLORE BUTTON — FIXED */}
          <Link
            to="/projects"
            className="
              cta-button
              relative z-20
              px-12 py-5
              rounded-full
              border-2 border-white
              bg-black/40
              backdrop-blur-md
              uppercase
              text-lg lg:text-2xl
              font-bold
              transition-all duration-500
              hover:border-[#D3FD50]
              hover:text-[#D3FD50]
              hover:bg-black/60
              hover:scale-105
            "
          >
            Explore
          </Link>

          <p className="text-xs uppercase tracking-widest opacity-50">
            Selected work & experiments
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
