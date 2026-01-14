import ScrollVelocity from "../components/ScrollVelocity.jsx";

export default function ProblemStatementBand() {
  return (
    <section className="relative w-full bg-black py-1 overflow-hidden">
      <ScrollVelocity
        texts={[
          "SOLVING PROBLEMS THROUGH SYSTEMS",
          "BREAKING COMPLEXITY INTO CLARITY",
          "ENGINEERING WITH INTENT"
        ]}
        velocity={70}
        numCopies={4}
        className="text-white/25 uppercase tracking-wider"
        parallaxClassName="py-10"
      />
    </section>
  );
}
