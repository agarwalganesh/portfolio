import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Code, Rocket } from "lucide-react";

const educationData = [
  {
    icon: BookOpen,
    title: "High School",
    institution: "Eternal Life Senior Secondary School",
    location: "Neemkathana, Rajasthan",
    stream: "PCM",
    duration: "2020 - 2022",
    score: "89.20%",
  },
  {
    icon: GraduationCap,
    title: "B.Sc. Mathematics",
    institution: "S.N.K.P. Government College",
    location: "Neemkathana, Rajasthan",
    stream: "Mathematics",
    duration: "2022 - 2025",
    score: "Ongoing",
  },
  {
    icon: Code,
    title: "B.S. Data Science",
    institution: "Indian Institute of Technology Madras",
    location: "Chennai, Tamil Nadu",
    stream: "Data Science & Programming",
    duration: "2024 - Present",
    highlight: true,
  },
  {
    icon: Rocket,
    title: "CS & AI Program",
    institution: "PhysicsWallah Institute of Innovation",
    location: "Bangalore, Karnataka",
    stream: "Computer Science & AI",
    duration: "2024 - Present",
  },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic journey from school to advanced tech programs
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {educationData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary glow-primary -translate-x-1.5 md:-translate-x-2 z-10" />

              {/* Content Card */}
              <div
                className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <motion.div
                  className={`glass rounded-xl p-6 relative ${
                    item.highlight ? "border-primary/50 glow-primary" : ""
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.highlight && (
                    <span className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Current
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.duration}
                      </p>
                    </div>
                  </div>

                  <p className="font-medium mb-1">{item.institution}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {item.stream}
                    </span>
                    {item.score && (
                      <span className="text-sm font-semibold text-primary">
                        {item.score}
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
