import React, { useEffect, useRef } from "react";

export function DottedGlowBackground({
  className = "",
  opacity = 0.6,
  gap = 14,
  radius = 1.4,
  speedMin = 0.2,
  speedMax = 0.6,
  speedScale = 1,
  backgroundOpacity = 0,
  colorLightVar = "--color-neutral-400",
  glowColorLightVar = "--color-neutral-500",
  colorDarkVar = "--color-neutral-500",
  glowColorDarkVar = "--color-sky-800",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const dots = [];
    const cols = Math.ceil(width / gap);
    const rows = Math.ceil(height / gap);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          x: x * gap,
          y: y * gap,
          phase: Math.random() * Math.PI * 2,
          speed:
            (Math.random() * (speedMax - speedMin) + speedMin) * speedScale,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.phase += dot.speed * 0.01;
        const glow = (Math.sin(dot.phase) + 1) / 2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${
          opacity * glow
        })`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [
    opacity,
    gap,
    radius,
    speedMin,
    speedMax,
    speedScale,
    backgroundOpacity,
    colorLightVar,
    glowColorLightVar,
    colorDarkVar,
    glowColorDarkVar,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ opacity }}
    />
  );
}