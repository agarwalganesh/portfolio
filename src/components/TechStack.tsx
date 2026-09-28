import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Brain,
  Server,
  Database,
  Cloud,
  Workflow,
  Layers,
} from "lucide-react";

type TechItem = { name: string; icon?: string };

type TechCategory = {
  title: string;
  icon: typeof Code2;
  accent: string;
  border: string;
  items: TechItem[];
};

const categories: TechCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    accent: "from-cyan-500/15 to-cyan-500/5",
    border: "hover:border-cyan-400/40",
    items: [
      { name: "Python" },
      { name: "Java" },
      { name: "C" },
      { name: "C++" },
      { name: "TypeScript" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "AI / GenAI",
    icon: Brain,
    accent: "from-violet-500/15 to-violet-500/5",
    border: "hover:border-violet-400/40",
    items: [
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "RAG" },
      { name: "AI Agents" },
      { name: "Tool Calling" },
      { name: "Prompt Engineering" },
      { name: "Embeddings" },
      { name: "Vector Databases" },
      { name: "ChromaDB" },
    ],
  },
  {
    title: "Machine Learning",
    icon: Layers,
    accent: "from-emerald-500/15 to-emerald-500/5",
    border: "hover:border-emerald-400/40",
    items: [
      { name: "Scikit-learn" },
      { name: "XGBoost" },
      { name: "Random Forest" },
      { name: "Feature Engineering" },
      { name: "Anomaly Detection" },
    ],
  },
  {
    title: "Data",
    icon: Database,
    accent: "from-amber-500/15 to-amber-500/5",
    border: "hover:border-amber-400/40",
    items: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "SQL" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
    ],
  },
  {
    title: "Backend / API",
    icon: Server,
    accent: "from-blue-500/15 to-blue-500/5",
    border: "hover:border-blue-400/40",
    items: [
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "Node.js" },
      { name: "Supabase" },
      { name: "Next.js" },
      { name: "React" },
    ],
  },
  {
    title: "Automation",
    icon: Workflow,
    accent: "from-pink-500/15 to-pink-500/5",
    border: "hover:border-pink-400/40",
    items: [{ name: "n8n" }, { name: "Workflow Automation" }, { name: "Webhooks" }],
  },
  {
    title: "DevOps / Cloud",
    icon: Cloud,
    accent: "from-sky-500/15 to-sky-500/5",
    border: "hover:border-sky-400/40",
    items: [
      { name: "Docker" },
      { name: "AWS" },
      { name: "MLOps" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-primary mb-4">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Tools I <span className="text-gradient">Build With</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I use to design, build and ship AI-powered products — from LLM apps to backend APIs and automation workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 transition-colors duration-300 ${cat.border}`}
            >
              {/* subtle accent gradient */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cat.accent} opacity-60 pointer-events-none`}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <cat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <span
                      key={tech.name}
                      className="text-xs px-2.5 py-1 rounded-full bg-secondary/60 text-foreground/90 border border-border/60 hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {tech.name}
                    </span>
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

export default TechStack;