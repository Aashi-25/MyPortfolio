import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function FlowingMenu({
  items = [],
  speed = 30,
  textColor = '#ffffff',
  bgColor = '#000000',
  marqueeBgColor = '#ffffff',
  marqueeTextColor = '#000000',
  borderColor = 'rgba(255,255,255,0.1)'
}) {
  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst }) {
  const itemRef = useRef(null);
  const clipRef = useRef(null);
  const marqueeRef = useRef(null);
  const scrollAnim = useRef(null);
  const [reps, setReps] = useState(6);

  useEffect(() => {
    const calc = () => {
      if (!marqueeRef.current) return;
      const part = marqueeRef.current.querySelector('.part');
      if (!part) return;
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 3;
      setReps(Math.max(6, needed));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text, image]);

  useEffect(() => {
    const start = () => {
      if (!marqueeRef.current) return;
      const part = marqueeRef.current.querySelector('.part');
      if (!part || part.offsetWidth === 0) return;
      const width = part.offsetWidth;
      if (scrollAnim.current) scrollAnim.current.kill();
      scrollAnim.current = gsap.to(marqueeRef.current, {
        x: -width,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };
    start();
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = start;
    }
  }, [reps, speed, text, image]);

  // Initial state: fully clipped (hidden)
  useEffect(() => {
    gsap.set(clipRef.current, { clipPath: 'inset(100% 0 0 0)' });
  }, []);

  const onEnter = () => {
    gsap.to(clipRef.current, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'expo.out'
    });
  };

  const onLeave = () => {
    gsap.to(clipRef.current, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.8,
      ease: 'expo.in'
    });
  };

  return (
    <div ref={itemRef} className="flex-1 relative overflow-hidden" style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}>
      <a
        href={link}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="flex items-center justify-center h-full uppercase font-bold text-[8vh] md:text-[10vh] lg:text-[12vh] leading-none tracking-wider cursor-pointer"
        style={{ color: textColor }}
      >
        {text}
      </a>

      {/* Clipped marquee layer — hidden at rest */}
      <div
        ref={clipRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div ref={marqueeRef} className="h-full flex items-center w-fit">
          {Array(reps).fill().map((_, i) => (
            <div key={i} className="part flex items-center flex-shrink-0 px-[4vw]" style={{ color: marqueeTextColor }}>
              <span className="uppercase font-bold text-[8vh] md:text-[10vh] lg:text-[12vh] leading-none tracking-wider whitespace-nowrap">
                {text}
              </span>
              <div
                className="w-[350px] h-[15vh] mx-[5vw] rounded-3xl bg-cover bg-center shadow-2xl"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}