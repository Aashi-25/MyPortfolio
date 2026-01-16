import { motion } from "framer-motion";
import { techStackIcons } from "../constants";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";

const TechStack = () => {
  return (
    <section className="relative overflow-hidden mt-20 mb-40">
      <div className="padding-x-lg xl:mt-20 md:mt-32 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            My Tech Stack
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
            I work with a variety of technologies to create amazing digital
            experiences. Here are some of the tools I use daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="tech-grid"
        >
          {techStackIcons.map((techStackIcon, index) => (
            <motion.div
              key={techStackIcon.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="tech-icon-wrapper group"
            >
              <TechIconCardExperience model={techStackIcon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
