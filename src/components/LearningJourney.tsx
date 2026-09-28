import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  LineChart,
  Brain,
  Sparkles,
  Workflow,
  Wrench,
  Bot,
  Code2,
  Rocket,
  Database,
  GraduationCap,
} from "lucide-react";

type Milestone = {
  icon: typeof LineChart;
  title: string;
  detail: string;
  highlight?: boolean;
};

const milestones: Milestone[] = [
  {
    icon: LineChart,
    title: "Data Analytics",
    detail: "Built a strong base in Python, SQL, pandas, NumPy and exploratory data analysis.",
  },
  {
    icon: Brain,
    title: "Machine Learning",
    detail: "Shipped ML projects using Scikit-learn, XGBoost, Random Forest and feature engineering.",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    detail: "Moved into LLMs, embeddings, prompt engineering and generative workflows.",
  },
  {
    icon: Workflow,
    title: "LangChain",
    detail: "Built RAG pipelines, agent chains, tool integrations and structured LLM apps.",
  },
  {
    icon: Wrench,
    title: "LangGraph",
    detail: "Designed graph-based agents with state, conditional edges and tool calling.",
  },
  {
    icon: Bot,
    title: "AI Agents",
    detail: "Multi-step autonomous agents that decide, retrieve and act through real APIs.",
  },
  {
    icon: Rocket,
    title: "AI Automation",
    detail: "Event-driven workflows with n8n, webhooks and messaging integrations.",
  },
  {
    icon: Code2,
    title: "Full-Stack AI",
    detail: "Production apps: FastAPI backends, React/Next.js frontends, deployed to the cloud.",
    highlight: true,
  },
];

const LearningJourney = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="learning-journey" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-sm text-primary mb-4">
            <Rocket className="w-4 h-4" /> Progression
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Learning <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From data analytics to AI engineering — the path I'm walking and the skills I'm building at each step.
          </p>
        </motion.div>

        {/* Mobile-friendly vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Dot */}
                <div
                  className={`absolute left-2 sm:left-4 top-3 w-4 h-4 rounded-full -translate-x-1/2 ${
                    m.highlight
                      ? "bg-primary glow-primary ring-4 ring-primary/20"
                      : "bg-primary/70 ring-2 ring-primary/20"
                  }`}
                />

                <div
                  className={`glass rounded-xl p-4 sm:p-5 border transition-colors ${
                    m.highlight
                      ? "border-primary/40"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        m.highlight ? "bg-primary/25" : "bg-primary/15"
                      }`}
                    >
                      <m.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-semibold text-base">
                          {m.title}
                        </h3>
                        {m.highlight && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {m.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Academic footnote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 max-w-3xl mx-auto glass rounded-xl p-5 text-sm text-muted-foreground flex items-start gap-3"
        >
          <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-foreground font-medium mb-1">Academic Background</p>
            <p>
              B.S. Data Science & Applications at{" "}
              <span className="text-primary">IIT Madras</span> (2024 – Present) ·
              CS & AI Program at{" "}
              <span className="text-primary">PhysicsWallah Institute of Innovation (PW IOI)</span> ·
              B.Sc. Mathematics (PDU Shekhawati University) ·
              High School PCM — Eternal Life Senior Secondary School.
            </p>
          </div>
        </motion.div>

        {/* Hidden: anchor for Education in case any external link references it */}
        <span id="education" className="sr-only" aria-hidden="true" />
      </div>
    </section>
  );
};

export default LearningJourney;