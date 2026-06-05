import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, MapPin, Sparkles, Code2 } from "lucide-react";

const experienceData = [
  {
    icon: Sparkles,
    role: "Artificial Intelligence Engineer",
    company: "PW (PhysicsWallah)",
    type: "Internship",
    location: "Sector 62 Noida, Uttar Pradesh, India",
    locationType: "On-site",
    duration: "Jun 2026 - Present",
    period: "1 mo",
    description: "Working on generative AI solutions, custom LLM agents, and developing intelligent automation workflows.",
    highlight: true,
  },
  {
    icon: Code2,
    role: "Web Developer",
    company: "Zidio Development",
    type: "Internship",
    location: "Bengaluru, Karnataka, India",
    locationType: "Remote",
    duration: "Apr 2025 - Jul 2025",
    period: "4 mos",
    description: "Engineered scalable web application features, enhancing platform functionality and user experience. Partnered with cross-functional engineering teams to design, code, and deploy solutions in an Agile environment. Optimized development workflows by actively participating in sprint planning and peer code reviews.",
    highlight: false,
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and internship experiences in AI and Web Development.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line with gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-0.5" />

          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary glow-primary -translate-x-1.5 md:-translate-x-2 z-10" />

              {/* Card Container */}
              <div
                className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <motion.div
                  className={`glass rounded-xl p-6 relative group border-border hover:border-primary/50 transition-colors duration-300 ${
                    exp.highlight ? "border-primary/30 glow-primary/10" : ""
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {exp.highlight && (
                    <span className="absolute -top-3 left-4 px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
                      Current
                    </span>
                  )}

                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <exp.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg md:text-xl text-foreground">
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="font-medium text-primary text-sm flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-4 border-t border-border/50 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary/70" />
                      <span>{exp.duration} <span className="text-xs">({exp.period})</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary/70" />
                      <span>{exp.location} <span className="text-xs">({exp.locationType})</span></span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
