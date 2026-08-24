import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import CountUpNumber from "./CountUpNumber";

const currentSkills = [
  { name: "Python (Pandas, NumPy, Scikit-learn)", level: 90 },
  { name: "Machine Learning (XGBoost, RF)", level: 85 },
  { name: "SQL (MySQL)", level: 85 },
  { name: "EDA & Feature Engineering", level: 88 },
  { name: "Anomaly Detection (IsoForest, LOF)", level: 80 },
  { name: "C++ / C", level: 75 },
  { name: "Git / GitHub", level: 85 },
  { name: "Node.js & Supabase", level: 75 },
];

const learningSkills = [
  { name: "Deep Learning", icon: "🤖" },
  { name: "MLOps", icon: "⚙️" },
  { name: "AWS Cloud", icon: "☁️" },
  { name: "DSA", icon: "🧮" },
  { name: "Power BI", icon: "📊" },
  { name: "Prompt Engineering", icon: "🧠" },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skills & <span className="text-gradient">Languages</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with and skills I'm developing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Current Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
              <motion.span 
                className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓
              </motion.span>
              Present Working
            </h3>

            <div className="space-y-5">
              {currentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-primary rounded-full relative"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={isInView ? { x: "200%" } : {}}
                        transition={{ duration: 1.5, delay: 1 + index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Learning Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
              <motion.span 
                className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-sm"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📚
              </motion.span>
              Currently Learning
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {learningSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass rounded-xl p-4 text-center cursor-pointer group relative overflow-hidden"
                >
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <motion.span 
                    className="text-3xl mb-2 block relative z-10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <span className="text-sm font-medium relative z-10">{skill.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 glass rounded-xl p-6 relative overflow-hidden"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="grid grid-cols-3 gap-4 text-center relative z-10">
                <div>
                  <p className="text-2xl font-display font-bold text-gradient">
                    <CountUpNumber value={100} suffix="+" />
                  </p>
                  <p className="text-xs text-muted-foreground">Days Coding</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-gradient">
                    <CountUpNumber value={7} suffix="+" />
                  </p>
                  <p className="text-xs text-muted-foreground">Projects Built</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-gradient">
                    <CountUpNumber value={5} suffix="+" />
                  </p>
                  <p className="text-xs text-muted-foreground">Certifications</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;