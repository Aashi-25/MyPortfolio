import React from "react";
import { DottedGlowBackground } from "./dotted-glow-background";

export default function SectionBackground({
  children,
  opacity = 0.6,
  speedMin = 0.2,
  speedMax = 0.6,
}) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <DottedGlowBackground
        className="pointer-events-none"
        opacity={opacity}
        speedMin={speedMin}
        speedMax={speedMax}
      />

      {/* Content */}
      <div className="relative z-10 py-24 px-6">
        {children}
      </div>
    </section>
  );
}