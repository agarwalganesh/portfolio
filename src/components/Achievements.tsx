import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Trophy,
  Code,
  Cloud,
  Brain,
  Briefcase,
  Star,
  Sparkles,
} from "lucide-react";

const achievementsData = [
  {
    icon: Trophy,
    title: "Rajya Puraskar Award",
    description:
      "Honored by Governor Kalraj Mishra for leadership in Bharat Scouts and Guides.",
    year: "2023",
    color: "bg-yellow-500/20 text-yellow-400",
    glowColor: "hsl(45, 100%, 50%)",
  },
  {
    icon: Code,
    title: "100+ Days Coding Streak",
    description:
      "Consistent problem-solving in Python, Java and DSA on LeetCode & CodeChef.",
    year: "2024",
    color: "bg-green-500/20 text-green-400",
    glowColor: "hsl(120, 100%, 40%)",
  },
  {
    icon: Cloud,
    title: "Top 5 — AWS Cloud Hackathon",
    description: "Ranked Top 5 out of 140+ teams in the AWS Cloud Hackathon.",
    year: "2024",
    color: "bg-orange-500/20 text-orange-400",
    glowColor: "hsl(30, 100%, 50%)",
  },
  {
    icon: Sparkles,
    title: "Prompt Engineering Certified",
    description:
      "Completed AI Prompt Engineering certification from Chegg Skills × EdifyOnline.",
    year: "2025",
    color: "bg-purple-500/20 text-purple-400",
    glowColor: "hsl(280, 100%, 60%)",
  },
  {
    icon: Briefcase,
    title: "AI Engineer Intern — PW",
    description:
      "Currently working as AI Engineer Intern at PhysicsWallah on GenAI agents & automation.",
    year: "2025",
    color: "bg-cyan-500/20 text-cyan-400",
    glowColor: "hsl(180, 100%, 50%)",
    highlight: true,
  },
  {
    icon: Brain,
    title: "IBM Machine Learning",
    description:
      "Completed 'A Quick Introduction to Machine Learning' from IBM Skills Network × Cognitive Class.",
    year: "2025",
    color: "bg-indigo-500/20 text-indigo-400",
    glowColor: "hsl(230, 100%, 60%)",
  },
];

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-muted-foreground">Milestones & Recognition</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition and milestones from coding, hackathons and learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className={`glass rounded-xl p-5 h-full relative overflow-hidden group cursor-pointer ${
                  achievement.highlight ? "border border-primary/30" : ""
                }`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow:
                    hoveredIndex === index
                      ? `0 20px 40px -15px ${achievement.glowColor}40`
                      : "none",
                }}
              >
                {/* Background Glow on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Animated particles on hover */}
                {hoveredIndex === index && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary/50"
                        initial={{
                          x: Math.random() * 100,
                          y: 100,
                          opacity: 0,
                        }}
                        animate={{
                          y: -20,
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                        style={{ left: `${20 + i * 15}%` }}
                      />
                    ))}
                  </>
                )}

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <motion.div
                      className={`w-11 h-11 rounded-lg ${achievement.color} flex items-center justify-center`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <achievement.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                      {achievement.year}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-semibold mb-1.5 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                {/* Bottom highlight line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;