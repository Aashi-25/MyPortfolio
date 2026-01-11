import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const ExploreCTA = ({ onExplore }) => {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    // Reset initial state
    gsap.set(ref.current, { opacity: 0, y: 40 });
    
    // Fade in once
    gsap.to(ref.current, { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: "power3.out", 
      delay: 0.5 
    });
  }, []);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto">
      <button
        ref={ref}
        onClick={() => onExplore && onExplore()}
        style={{ opacity: 0, transform: 'translateY(40px)' }}
        className="
          cursor-pointer
          pointer-events-auto
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
  );
};

export default ExploreCTA;
