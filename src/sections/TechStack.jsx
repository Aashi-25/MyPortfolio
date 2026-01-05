import { motion } from "framer-motion";
import { techStackIcons } from "../constants";
// import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";

const TechStack = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="padding-x-lg xl:mt-0 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            My Tech Stack
          </h2>
          <p className="text-white-50 text-lg md:text-xl max-w-2xl mx-auto">
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
              {/* Temporarily disabled 3D element for smooth scrolling test */}
              {/* <TechIconCardExperience model={techStackIcon} /> */}
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-gray-600">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">{techStackIcon.name}</h3>
                  <p className="text-sm opacity-70">3D Model Disabled</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
