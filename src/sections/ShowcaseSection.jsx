import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";

const projects = [
  {
    title: 'Project One',
    desc: 'Advanced animations and interactive UI.',
    tech: ['React', 'GSAP', 'Three.js']
  },
  {
    title: 'Project Two',
    desc: 'Real-time full-stack application.',
    tech: ['Next.js', 'TypeScript', 'Tailwind']
  },
  {
    title: 'Project Three',
    desc: 'Micro-interactions and UX polish.',
    tech: ['Vue', 'WebGL', 'Performance']
  },
  {
    title: 'Project Four',
    desc: 'AI-powered automation platform.',
    tech: ['Python', 'LLMs', 'LangChain']
  },
  {
    title: 'Project Five',
    desc: 'Scalable SaaS dashboard.',
    tech: ['React', 'Charts', 'API']
  }
];

const ProjectCard = ({ title, desc, tech }) => (
  <div className="space-y-4">
    <h3 className="text-4xl font-semibold tracking-tight">{title}</h3>
    <p className="text-white/65 text-lg leading-relaxed max-w-3xl">{desc}</p>

    <div className="flex gap-3 flex-wrap">
      {tech.map(t => (
        <span
          key={t}
          className="px-4 py-1.5 bg-blue-900/40 rounded-full text-[13px] tracking-wide uppercase"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const AppShowcase = ({ onViewAll }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    );
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-black text-white"
    >
      {/* HEADING (normal scroll) */}
      <div className="max-w-6xl mx-auto pt-24 pb-4 text-center">
        <h2 className="text-5xl font-bold mb-6">My Projects</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore some of my featured work showcasing innovative solutions and
          cutting-edge technologies.
        </p>
      </div>

      {/* STACK ZONE */}
      <div className="relative flex justify-center">
        <ScrollStack>
          {projects.map((project, i) => (
            <ScrollStackItem key={i}>
              <ProjectCard {...project} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default AppShowcase;
