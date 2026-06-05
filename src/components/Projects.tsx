import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sun, BarChart3, Bot, ExternalLink, Github, ChevronRight, ShieldAlert, Brain, GraduationCap } from "lucide-react";

const projectsData = [
  {
    icon: ShieldAlert,
    title: "Credit Risk & Fraud Detection",
    subtitle: "ML Risk Scoring & Anomaly Detection",
    description:
      "Risk evaluation system on a 1,000 x 9 financial dataset segmenting applicants into risk categories, with Isolation Forest & LOF flagging ~20% anomalous transactions.",
    features: ["AUC-ROC 0.85", "78–81% Accuracy", "12+ Features", "5-Fold CV"],
    tech: ["Python", "XGBoost", "Random Forest"],
    color: "from-red-500 to-rose-500",
    link: "https://github.com/agarwalganesh/Loan-risk-analysis--PROJECT",
    github: "https://github.com/agarwalganesh/Loan-risk-analysis--PROJECT",
  },
  {
    icon: Brain,
    title: "Student Mental Health & Overthinking",
    subtitle: "EDA + Classification Pipeline",
    description:
      "Analyzed a 101 x 8 student dataset with an 8-visualization EDA pipeline and built a Random Forest classifier categorizing overthinking levels from High to None.",
    features: ["EDA Pipeline", "Random Forest", "Confusion Matrix", "Behavior Insights"],
    tech: ["Python", "Scikit-learn", "Pandas"],
    color: "from-purple-500 to-pink-500",
    link: "https://github.com/agarwalganesh/StudentOverthinkingEDA-project",
    github: "https://github.com/agarwalganesh/StudentOverthinkingEDA-project",
  },
  {
    icon: GraduationCap,
    title: "JEE Mains Rank Predictor",
    subtitle: "PW IOI Lead Generation Tool",
    description:
      "High-accuracy predictive tool estimating student ranks from JEE Mains performance, generating data-driven admission leads for the PW IOI Innovation Hub.",
    features: ["Real-time Predictions", "High Availability", "Lead Generation", "Live Demo"],
    tech: ["Node.js", "Supabase", "Vercel"],
    color: "from-indigo-500 to-blue-500",
    link: "https://www.jeemains-rank-predicator-pwioi.live/",
    github: "https://github.com/agarwalganesh",
  },
  {
    icon: Sun,
    title: "Sunstide",
    subtitle: "Solar Charging Smart Bag Website",
    description:
      "A comprehensive website for showcasing an innovative solar-charging bag that generates energy through sunlight and motion.",
    features: ["Responsive Design", "Interactive Demos", "Mobile-First", "Modern UI/UX"],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    color: "from-yellow-500 to-orange-500",
    link: "#",
    github: "https://github.com/agarwalganesh",
  },
  {
    icon: BarChart3,
    title: "Excel Analytics Platform",
    subtitle: "MERN Stack Data Visualization",
    description:
      "Dynamic web app allowing users to upload Excel files and generate interactive 2D/3D charts for data analysis.",
    features: ["File Upload", "Real-time Processing", "3D Charts", "Data Export"],
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    color: "from-green-500 to-emerald-500",
    link: "#",
    github: "https://github.com/agarwalganesh",
  },
  {
    icon: Bot,
    title: "LearnSyncAI Terminal",
    subtitle: "AI-Powered Website Generator",
    description:
      "Terminal-based assistant that helps users generate and deploy websites using natural language commands.",
    features: ["NLP Commands", "Auto Deploy", "AI Code Gen", "Multiple Templates"],
    tech: ["Python", "OpenAI API", "CLI"],
    color: "from-blue-500 to-cyan-500",
    link: "https://github.com/agarwalganesh/LearnSync-Website-maker",
    github: "https://github.com/agarwalganesh/LearnSync-Website-maker",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full glass text-sm text-primary mb-4"
          >
            My Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and passion projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="glass rounded-2xl overflow-hidden h-full group cursor-pointer relative"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${project.color.includes('yellow') ? 'hsl(45, 100%, 50%)' : project.color.includes('green') ? 'hsl(150, 100%, 40%)' : 'hsl(200, 100%, 50%)'}, transparent)`,
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Project Header */}
                <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                    animate={{ 
                      backgroundPosition: hoveredIndex === index ? ['0% 0%', '100% 100%'] : '0% 0%' 
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={hoveredIndex === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <project.icon className="w-16 h-16 text-white/80" />
                  </motion.div>

                  {/* Hover Actions */}
                  <motion.div 
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                    <motion.a
                      href={project.github || project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={16} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary mb-3">{project.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature, i) => (
                      <motion.span
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Tech:</span>
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity w-fit"
                    animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                  >
                    View Project <ChevronRight size={16} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;