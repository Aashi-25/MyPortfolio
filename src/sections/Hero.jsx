import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { words } from "../constants";
import AnimatedCounter from "../components/AnimatedCounter";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import Button from "../components/Button";

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const wordSliderRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    // Use only unique words (first 4)
    const uniqueWords = words.slice(0, 4);
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % uniqueWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Create a master timeline for hero animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate intro text
      if (introRef.current) {
        tl.from(introRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
        });
      }

      // Animate name
      if (nameRef.current) {
        tl.from(
          nameRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
          },
          "-=0.5"
        );
      }

      // Animate role
      if (roleRef.current) {
        tl.from(
          roleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.6"
        );
      }

      // Animate word slider
      if (wordSliderRef.current) {
        tl.from(
          wordSliderRef.current,
          {
            opacity: 0,
            x: -30,
            duration: 0.8,
          },
          "-=0.5"
        );
      }

      // Animate description
      if (descriptionRef.current) {
        tl.from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.4"
        );
      }

      // Animate badge
      if (badgeRef.current) {
        tl.from(
          badgeRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
          },
          "-=0.3"
        );

        // Floating animation for badge
        gsap.to(badgeRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Animate CTA buttons
      if (ctaRef.current && ctaRef.current.children.length > 0) {
        tl.from(
          ctaRef.current.children,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex flex-col"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="hero-layout relative z-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center xl:items-start items-center text-center xl:text-left px-5 md:px-10 xl:px-20 max-w-4xl">
          {/* Introduction */}
          <div
            ref={introRef}
            className="text-white-50 text-lg md:text-xl mb-4 font-light tracking-wide"
          >
            Hi, I'm
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl xl:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-white-50 to-white bg-clip-text text-transparent"
          >
            Adrian JSM
          </h1>

          {/* Role with animated word slider */}
          <div
            ref={roleRef}
            className="flex items-center gap-3 md:gap-4 mb-6 text-3xl md:text-5xl xl:text-6xl font-semibold"
          >
            <span>I turn</span>
            <div
              ref={wordSliderRef}
              className="slide-container relative h-[48px] md:h-[78px] overflow-hidden"
            >
              <div
                className="slide-wrapper flex flex-col transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateY(-${currentWordIndex * 100}%)`,
                }}
              >
                {words.slice(0, 4).map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 md:gap-4 min-h-[48px] md:min-h-[78px]"
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {word.text}
                    </span>
                    <img
                      src={word.imgPath}
                      alt={word.text}
                      className="size-8 md:size-10 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-white-50 text-base md:text-lg xl:text-xl mb-8 max-w-2xl leading-relaxed"
          >
            A passionate developer crafting exceptional digital experiences
            through innovative design and cutting-edge technology.
          </p>

          {/* Badge */}
          <div
            ref={badgeRef}
            className="hero-badge mb-8 inline-block"
          >
            Portfolio 2025
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <Button
              text="View My Work"
              id="work"
              className="w-full sm:w-auto"
            />
            <a
              href="#contact"
              className="cta-wrapper w-full sm:w-auto"
            >
              <div className="cta-button group border border-white-50/20 hover:border-white-50/40 bg-transparent">
                <div className="bg-circle" />
                <p className="text text-white-50">Get In Touch</p>
                <div className="arrow-wrapper">
                  <img src="/images/arrow-right.svg" alt="arrow" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Right 3D Element */}
        <div className="hero-3d-layout">
          <HeroExperience />
        </div>
      </div>

      {/* Animated Counter */}
      <AnimatedCounter />
    </section>
  );
};

export default Hero;