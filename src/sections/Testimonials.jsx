import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { DottedGlowBackground } from "../components/ui/dotted-glow-background";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative flex-center section-padding py-20 min-h-[120vh]"
    >
      {/* DOTTED BACKGROUND */}
      <DottedGlowBackground className="z-0" />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="⭐️ Customer feedback highlights"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-12">
          {testimonials.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index}>
              <div className="flex items-center gap-3">
                <img src={testimonial.imgPath} alt="" />
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
