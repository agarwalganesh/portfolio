import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Brain, Sparkles, Code2 } from "lucide-react";
import ganeshProfile from "@/assets/ganesh-profile.jpg";

const highlights = [
  { icon: Brain, label: "Focus", value: "AI Engineering · GenAI · Automation" },
  { icon: Sparkles, label: "Building", value: "AI Agents · LangChain · RAG" },
  { icon: Code2, label: "Stack", value: "Python · FastAPI · React" },
  { icon: GraduationCap, label: "Student", value: "IIT Madras BS Data Science" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI engineer focused on building practical, production-ready intelligent systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glass p-2">
              <img
                src={ganeshProfile}
                alt="Ganesh Agarwal — AI Engineer"
                className="w-full rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-display font-bold text-gradient">AI Engineer</p>
              <p className="text-xs text-muted-foreground">GenAI · Automation</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-4">
              Building AI Systems That Actually Work
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm Ganesh Agarwal — an AI Engineer specializing in Generative AI, LLM applications, and AI automation. I design and ship intelligent systems end-to-end: from prompt engineering and RAG pipelines to LangChain / LangGraph agents, FastAPI backends, and full-stack interfaces that make AI usable in real products.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              My work spans AI agents with tool calling, vector retrieval with ChromaDB, workflow automation with n8n, and production-grade Python backends. I've built meeting intelligence tools, RAG-powered assistants, and predictive ML systems — backed by solid work in ML, data analytics, and full-stack development.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Currently pursuing B.S. Data Science at IIT Madras and working on real-world AI problems — from prototype to deployment. I learn fast, build continuously, and focus on shipping things that work in production.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass rounded-lg p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Location row */}
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Bangalore, Karnataka, India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;