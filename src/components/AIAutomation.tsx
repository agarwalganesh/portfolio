import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Database,
  Brain,
  GitBranch,
  Send,
  Bell,
  Workflow,
  ArrowDown,
} from "lucide-react";

type Step = {
  icon: typeof Zap;
  title: string;
  description: string;
  accent: string;
};

const steps: Step[] = [
  {
    icon: Zap,
    title: "Trigger",
    description: "Webhook, schedule, message or event kicks off the workflow.",
    accent: "from-cyan-500/20 to-cyan-500/0",
  },
  {
    icon: Database,
    title: "Data / API",
    description: "Fetch from APIs, databases, documents or third-party services.",
    accent: "from-blue-500/20 to-blue-500/0",
  },
  {
    icon: Brain,
    title: "AI Processing",
    description: "LLMs via LangChain / LangGraph classify, extract or generate.",
    accent: "from-violet-500/20 to-violet-500/0",
  },
  {
    icon: GitBranch,
    title: "Decision / Agent",
    description: "Tool-calling agents decide next steps based on context.",
    accent: "from-pink-500/20 to-pink-500/0",
  },
  {
    icon: Send,
    title: "Action",
    description: "Update DB, call API, send reply, generate document, trigger job.",
    accent: "from-amber-500/20 to-amber-500/0",
  },
  {
    icon: Bell,
    title: "Notification",
    description: "Telegram / WhatsApp / Email / Slack notify humans or downstream systems.",
    accent: "from-emerald-500/20 to-emerald-500/0",
  },
];

const tools = [
  "n8n",
  "LangChain",
  "LangGraph",
  "LLMs",
  "Webhooks",
  "APIs",
  "Telegram / WhatsApp",
];

const AIAutomation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-automation" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-sm text-primary mb-4">
            <Workflow className="w-4 h-4" /> AI Automation
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            AI <span className="text-gradient">Automation</span> Workflows
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I design and ship event-driven AI automations that connect LLMs, APIs and messaging — turning manual work into reliable, repeatable flows.
          </p>
        </motion.div>

        {/* Workflow visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="group relative rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md p-5 h-full overflow-hidden">
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.accent} opacity-70 pointer-events-none`}
                  />

                  {/* Step number */}
                  <div className="absolute top-3 right-3 text-xs font-mono text-muted-foreground/80">
                    0{i + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-base mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Down arrow on mobile, hidden on lg */}
                {i < steps.length - 1 && (
                  <div className="flex justify-center my-2 lg:hidden">
                    <ArrowDown className="w-4 h-4 text-primary/60" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tooling chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto glass rounded-2xl p-6"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">
            Stack I use for AI automation
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/15"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAutomation;