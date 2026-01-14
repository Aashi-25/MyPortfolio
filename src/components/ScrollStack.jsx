import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import { isTransitioning } from "../stores/transitionStore";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full my-16 p-16 rounded-[32px] bg-[#0b0b0b] shadow-xl ${itemClassName}`}
    style={{
      maxWidth: '1100px',
      marginInline: 'auto',
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      willChange: "transform",
      transform: "translate3d(0,0,0) scale(1)",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  itemScale = 0.04,
  itemStackDistance = 30,
  stackPosition = "15%",
  scaleEndPosition = "8%",
  baseScale = 0.85,
}) => {
  const cardsRef = useRef([]);
  const positionsRef = useRef([]);
  const scrollYRef = useRef(0);
  const rafRef = useRef(null);

  const parsePercent = (v, h) =>
    typeof v === "string" ? (parseFloat(v) / 100) * h : v;

  const update = useCallback(() => {
    if (isTransitioning) {
      rafRef.current = requestAnimationFrame(update);
      return;
    }

    const scrollY = scrollYRef.current;
    const vh = window.innerHeight;

    const stackPos = parsePercent(stackPosition, vh);
    const scaleEnd = parsePercent(scaleEndPosition, vh);

    const endEl = document.querySelector(".scroll-stack-end");
    const pinEnd = endEl
      ? endEl.getBoundingClientRect().top + window.scrollY - vh / 2
      : Infinity;

    cardsRef.current.forEach((card, i) => {
      const cardTop = positionsRef.current[i];

      const start = cardTop - stackPos - itemStackDistance * i;
      const end = cardTop - scaleEnd;

      const progress = Math.min(
        Math.max((scrollY - start) / (end - start), 0),
        1
      );

      const scale = 1 - progress * (1 - (baseScale + i * itemScale));

      let y = 0;

      if (scrollY >= start && scrollY <= pinEnd) {
        y = scrollY - cardTop + stackPos + itemStackDistance * i;
      } else if (scrollY > pinEnd) {
        y = pinEnd - cardTop + stackPos + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${Math.max(
        0,
        y
      )}px, 0) scale(${scale})`;
    });

    rafRef.current = requestAnimationFrame(update);
  }, [
    baseScale,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
  ]);

  useLayoutEffect(() => {
    cardsRef.current = Array.from(
      document.querySelectorAll(".scroll-stack-card")
    );

    // ✅ Cache original positions
    positionsRef.current = cardsRef.current.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    lenis.on("scroll", e => {
      if (!isTransitioning) {
        scrollYRef.current = e.scroll;
      }
    });

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
  }, [update]);

  return (
    <div className="relative w-full">
      <div className="pt-[8vh] pb-[57vh]">
        {children}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
};

export default ScrollStack;
