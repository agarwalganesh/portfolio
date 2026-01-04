import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sun, BarChart3, Bot, ExternalLink, Github } from "lucide-react";

const projectsData = [
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
    link: "#",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            >
              <motion.div
                className="glass rounded-2xl overflow-hidden h-full group cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Header */}
                <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <project.icon className="w-16 h-16 text-white/80" />
                  </motion.div>

                  {/* Hover Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.a
                      href={project.link}
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={16} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary mb-3">{project.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {feature}
                      </span>
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
