import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Workflow,
  Cpu,
  Database,
  Server,
  Cloud,
  Code2,
  Boxes,
} from "lucide-react";

type SkillGroup = {
  title: string;
  icon: typeof Brain;
  tagline: string;
  accent: string;
  border: string;
  items: string[];
};

const groups: SkillGroup[] = [
  {
    title: "AI Engineering",
    icon: Brain,
    tagline: "LLM applications, agents, retrieval",
    accent: "from-violet-500/15 to-violet-500/0",
    border: "hover:border-violet-400/40",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "AI Agents",
      "LLM Applications",
      "Tool Calling",
      "Embeddings",
      "Vector Databases",
    ],
  },
  {
    title: "AI Automation",
    icon: Workflow,
    tagline: "Event-driven AI workflows",
    accent: "from-pink-500/15 to-pink-500/0",
    border: "hover:border-pink-400/40",
    items: [
      "n8n",
      "Workflow Automation",
      "API Integrations",
      "AI-powered workflows",
      "Event-driven automation",
    ],
  },
  {
    title: "Machine Learning",
    icon: Cpu,
    tagline: "Classical ML & feature engineering",
    accent: "from-emerald-500/15 to-emerald-500/0",
    border: "hover:border-emerald-400/40",
    items: [
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "Feature Engineering",
      "Anomaly Detection",
    ],
  },
  {
    title: "Data",
    icon: Database,
    tagline: "Pythonic data workhorses",
    accent: "from-amber-500/15 to-amber-500/0",
    border: "hover:border-amber-400/40",
    items: ["Python", "Pandas", "NumPy", "SQL", "MySQL"],
  },
  {
    title: "Backend",
    icon: Server,
    tagline: "APIs, databases, full-stack glue",
    accent: "from-blue-500/15 to-blue-500/0",
    border: "hover:border-blue-400/40",
    items: ["FastAPI", "REST APIs", "PostgreSQL", "Supabase", "Node.js"],
  },
  {
    title: "DevOps / Cloud",
    icon: Cloud,
    tagline: "Container, cloud, version control",
    accent: "from-sky-500/15 to-sky-500/0",
    border: "hover:border-sky-400/40",
    items: ["Docker", "AWS", "MLOps", "Git", "GitHub"],
  },
  {
    title: "Other Languages",
    icon: Code2,
    tagline: "Strong fundamentals",
    accent: "from-zinc-500/15 to-zinc-500/0",
    border: "hover:border-zinc-400/40",
    items: ["C", "C++", "Java"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-sm text-primary mb-4">
            <Boxes className="w-4 h-4" /> Core Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            AI Engineering <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practical skills I use to build real AI products — grouped by the kind of work they support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 transition-colors duration-300 ${g.border}`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${g.accent} opacity-70 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors shrink-0">
                    <g.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-base leading-snug">
                      {g.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{g.tagline}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ y: -2 }}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary/60 text-foreground/90 border border-border/60 hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;