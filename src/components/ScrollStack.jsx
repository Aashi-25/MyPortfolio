import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card ${itemClassName}`}
    style={{
      willChange: "transform",
      transformOrigin: "top center",
      backfaceVisibility: "hidden",
      WebkitBackfaceVisibility: "hidden",
      transform: "translateZ(0)",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  itemDistance = 120,
  itemScale = 0.04,
  itemStackDistance = 40,
  stackPosition = "25%",
  scaleEndPosition = "12%",
  baseScale = 0.9,
  useWindowScroll = true,
}) => {
  const cardsRef = useRef([]);
  const positionsRef = useRef([]);
  const rafRef = useRef(null);
  const scrollYRef = useRef(0);

  const parsePercent = (v, h) =>
    typeof v === "string" ? (parseFloat(v) / 100) * h : v;

  useLayoutEffect(() => {
    cardsRef.current = Array.from(
      document.querySelectorAll(".scroll-stack-card")
    );

    const vh = window.innerHeight;

    // 🔒 Cache card positions ONCE
    positionsRef.current = cardsRef.current.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    const stackPos = parsePercent(stackPosition, vh);
    const scaleEnd = parsePercent(scaleEndPosition, vh);

    const update = () => {
      const scrollTop = scrollYRef.current;

      cardsRef.current.forEach((card, i) => {
        const cardTop = positionsRef.current[i];

        const start = cardTop - stackPos - itemStackDistance * i;
        const end = cardTop - scaleEnd;

        const progress = Math.min(
          Math.max((scrollTop - start) / (end - start), 0),
          1
        );

        const scale = 1 - progress * (1 - (baseScale + i * itemScale));
        const y =
          scrollTop > start
            ? scrollTop - cardTop + stackPos + itemStackDistance * i
            : 0;

        card.style.transform = `
          translate3d(0, ${y}px, 0)
          scale(${scale})
        `;
      });

      rafRef.current = requestAnimationFrame(update);
    };

    // Lenis for smooth scrolling
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    const onScroll = e => {
      scrollYRef.current = e.scroll;
    };

    lenis.on("scroll", onScroll);

    const raf = time => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    update();

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="pt-[20vh] pb-[60vh]">{children}</div>
    </div>
  );
};

export default ScrollStack;
