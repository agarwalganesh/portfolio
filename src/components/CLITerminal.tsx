import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface CLITerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMAND_RESPONSES: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  about        - Learn more about Ganesh Agarwal",
    "  skills       - View technical skills and competencies",
    "  projects     - List key machine learning & web engineering projects",
    "  experience   - Display professional timeline",
    "  education    - Show academic pathways",
    "  contact      - Display contact and social channels",
    "  matrix       - Run digital code rain simulation (Toggle)",
    "  clear        - Clear the terminal screen",
    "  exit | gui   - Close CLI terminal and return to standard page",
  ],
  about: [
    "Ganesh Agarwal - GenAI & LLM Engineer, Machine Learning Engineer,",
    "AI Automation Developer, and BS Data Science student at IIT Madras.",
    "----------------------------------------------------------------",
    "Location: Bangalore, Karnataka, India",
    "Focus: High-impact AI agents, fine-tuning LLMs, robust predictive model engineering.",
    "Goal: Build production-ready GenAI platforms and scalable AI integrations.",
  ],
  skills: [
    "Technical Core Languages & Tooling:",
    "  * Python (Pandas, NumPy, Scikit-learn, PyTorch)",
    "  * Machine Learning (XGBoost, Random Forest, Anomaly Detection)",
    "  * Web Engineering (React, Node.js, Supabase, Tailwind CSS, TypeScript)",
    "  * Databases & Cloud (SQL/MySQL, Git/GitHub, AWS Cloud)",
    "  * Learning Focus (Deep Learning, MLOps, Prompt Engineering, Power BI)",
  ],
  projects: [
    "Featured Systems:",
    "  1. Credit Risk & Fraud Detection - XGBoost anomaly detection on financial data.",
    "  2. Student Mental Health & Overthinking - Classification pipeline using Random Forest.",
    "  3. JEE Mains Rank Predictor - High availability lead gen system (PW IOI).",
    "  4. Sunstide - Solar Charging smart bag presentation portal.",
    "  5. Excel Analytics Platform - MERN data visualizer engine.",
    "  6. Customer Support Bot - LangChain workflow automation agent.",
  ],
  experience: [
    "Professional History:",
    "  * GenAI & LLM Internship (Aug 2025 - Present)",
    "    - Architecting conversational agents, workflow automation, prompting structures.",
    "  * Web Development Internship at Zidio Development (Jun 2024 - Dec 2024)",
    "    - Developed performant React components, integrated RESTful APIs, optimized asset queries.",
  ],
  education: [
    "Academic Pathways:",
    "  * BS in Data Science & Applications - IIT Madras (2023 - Present)",
    "  * PW IOI Innovation Hub - School of CS & AI (2023 - 2027)",
    "  * B.Sc. Mathematics & Sciences - PDU Shekhawati University (2022 - 2025)",
  ],
  contact: [
    "Get in Touch:",
    "  * Email    : ganeshagarwal0895@gmail.com",
    "  * Phone    : +91 63754 76136",
    "  * GitHub   : https://github.com/agarwalganesh",
    "  * LinkedIn : https://www.linkedin.com/in/ganesh-agarwal-a20917308",
  ],
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(10, 15, 13, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-20" />;
};

const CLITerminal = ({ isOpen, onClose }: CLITerminalProps) => {
  const [history, setHistory] = useState<{ type: "cmd" | "resp"; text: string }[]>([
    { type: "resp", text: "Welcome to Ganesh's CLI System v1.0.0" },
    { type: "resp", text: "Type 'help' to see list of available commands, or 'exit' to close." },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputVal.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: "cmd" as const, text: `$ ${inputVal}` }];
    const nextCmdHistory = [...cmdHistory, inputVal];
    setCmdHistory(nextCmdHistory);
    setHistoryIndex(-1);
    setInputVal("");

    if (cleanCmd === "clear") {
      setHistory([]);
      return;
    }

    if (cleanCmd === "exit" || cleanCmd === "gui") {
      onClose();
      return;
    }

    if (cleanCmd === "matrix") {
      setShowMatrix((prev) => !prev);
      setHistory([
        ...newHistory,
        {
          type: "resp",
          text: showMatrix ? "Disabling Matrix digital code rain." : "Enabling Matrix digital code rain...",
        },
      ]);
      return;
    }

    const response = COMMAND_RESPONSES[cleanCmd];
    if (response) {
      if (Array.isArray(response)) {
        setHistory([...newHistory, ...response.map((text) => ({ type: "resp" as const, text }))]);
      } else {
        setHistory([...newHistory, { type: "resp", text: response }]);
      }
    } else {
      setHistory([
        ...newHistory,
        { type: "resp", text: `Command not recognized: '${cleanCmd}'. Type 'help' for options.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center p-4 md:p-8 font-mono select-none"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-[80vh] bg-[#070b09] border border-primary/40 rounded-xl overflow-hidden shadow-2xl flex flex-col relative"
          >
            {showMatrix && <MatrixRain />}

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-primary/20 bg-background/50 backdrop-blur relative z-10">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <TerminalIcon className="w-4 h-4 animate-pulse" />
                <span>ganesh@portfolio-cli:~</span>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-red-400 hover:rotate-90 transition-all p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div
              ref={containerRef}
              onClick={handleContainerClick}
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-2 select-text custom-scrollbar scrollbar-thin relative z-10 text-emerald-400"
              style={{ textShadow: "0 0 2px rgba(16, 185, 129, 0.4)" }}
            >
              <div className="text-xs text-primary/60 mb-4 border-b border-primary/10 pb-4">
                <pre className="leading-tight hidden sm:block">
{`   ________  ___   _  _______ _____ _    _ 
  /  ___/  |/  /  / / / / ___//  _  \\ |  | |
 /  /  / /|_/ /  / /_/ /\\___ \\/  /_\\  \\ |  | |
/  /__/ /  / /  / __  /____/ /  ____  \\ |__| |
\\____/_/  /_/  /_/ /_/______/__/    \\__\\____/ `}
                </pre>
                <p className="mt-2">GenAI & ML Engineer Terminal CLI Console.</p>
                <p>Feel free to execute commands to traverse Ganesh's qualifications.</p>
              </div>

              {history.map((item, idx) => (
                <div
                  key={idx}
                  className={`whitespace-pre-wrap ${
                    item.type === "cmd" ? "text-primary font-bold" : "text-emerald-300 pl-2 border-l border-primary/10"
                  }`}
                >
                  {item.text}
                </div>
              ))}

              {/* Form Prompt */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 mt-2">
                <span className="text-primary font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-emerald-300 font-mono"
                  placeholder="Type a command (e.g. 'help')"
                  autoFocus
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CLITerminal;
