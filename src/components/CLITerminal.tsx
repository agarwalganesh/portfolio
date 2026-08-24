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
    "  about          - Learn more about Ganesh Agarwal",
    "  skills         - View technical skills and competencies",
    "  projects       - List all machine learning & web engineering projects",
    "  experience     - Display professional timeline",
    "  education      - Show academic pathways",
    "  achievements   - Display awards and milestones",
    "  certifications - List professional certifications",
    "  contact        - Display contact and social channels",
    "  matrix         - Run digital code rain simulation (Toggle)",
    "  clear          - Clear the terminal screen",
    "  exit | gui     - Close CLI terminal and return to standard page",
  ],

  about: [
    "Ganesh Agarwal — GenAI & LLM Engineer, Machine Learning Engineer,",
    "AI Automation Developer, and BS Data Science student at IIT Madras.",
    "─────────────────────────────────────────────────────────────────",
    "Location : Bangalore, Karnataka, India",
    "Hometown : Neemkathana, Rajasthan",
    "Born     : September 8, 2005",
    "JEE      : 92 Percentile",
    "Goal     : ML Engineer & AI Analyst",
    "Focus    : GenAI agents, LLM fine-tuning, predictive model engineering.",
    "Mission  : Build production-ready GenAI platforms and scalable AI integrations.",
  ],

  skills: [
    "Technical Skills & Proficiencies:",
    "",
    "  [ Core / Working ]",
    "  * Python — Pandas, NumPy, Scikit-learn        (90%)",
    "  * Machine Learning — XGBoost, Random Forest   (85%)",
    "  * EDA & Feature Engineering                   (88%)",
    "  * Anomaly Detection — IsoForest, LOF          (80%)",
    "  * SQL / MySQL                                 (85%)",
    "  * C++ / C                                     (75%)",
    "  * Git / GitHub                                (85%)",
    "  * Node.js & Supabase                          (75%)",
    "",
    "  [ Web Engineering ]",
    "  * React, TypeScript, Tailwind CSS, Framer Motion",
    "  * MongoDB, Express.js",
    "",
    "  [ Currently Learning ]",
    "  * Deep Learning   * MLOps    * AWS Cloud",
    "  * DSA             * Power BI * Prompt Engineering",
  ],

  projects: [
    "Featured Projects (7 total):",
    "",
    "  1. [ML]  Credit Risk & Fraud Detection",
    "           XGBoost + Isolation Forest | AUC-ROC 0.85 | 78-81% Acc",
    "           github.com/agarwalganesh/Loan-risk-analysis--PROJECT",
    "",
    "  2. [ML]  Student Mental Health & Overthinking",
    "           Random Forest EDA Pipeline | 101x8 Dataset",
    "           github.com/agarwalganesh/StudentOverthinkingEDA-project",
    "",
    "  3. [AI]  Meeting Mind",
    "           AI Meeting Intelligence & Summarizer | Whisper + LLM",
    "           github.com/agarwalganesh/MeetingMindAI",
    "",
    "  4. [WEB] JEE Mains Rank Predictor",
    "           PW IOI Lead Generation Tool | Node.js + Supabase + Vercel",
    "           jeemains-rank-predicator-pwioi.live",
    "",
    "  5. [WEB] Sunstide",
    "           Solar Charging Smart Bag Showcase | React + Tailwind",
    "",
    "  6. [WEB] Excel Analytics Platform",
    "           MERN Stack Data Visualizer | 2D/3D Charts | File Upload",
    "",
    "  7. [AI]  LearnSyncAI Terminal",
    "           AI Website Generator via CLI | Python + OpenAI API",
    "           github.com/agarwalganesh/LearnSync-Website-maker",
  ],

  experience: [
    "Professional Experience:",
    "",
    "  [CURRENT] Artificial Intelligence Engineer — PW (PhysicsWallah)",
    "            Jun 2026 – Present  |  On-site, Sector 62 Noida, UP",
    "            → Generative AI solutions, custom LLM agents,",
    "              intelligent automation workflows.",
    "",
    "  [PREV]    Web Developer — Zidio Development",
    "            Apr 2025 – Jul 2025 (4 months)  |  Remote, Bengaluru",
    "            → Scalable web features, Agile sprints, code reviews,",
    "              cross-functional engineering teams.",
  ],

  education: [
    "Academic Pathways:",
    "",
    "  [2020-2022] High School (PCM)",
    "              Eternal Life Senior Secondary School",
    "              Neemkathana, Rajasthan  |  Score: 89.20%",
    "",
    "  [2022-2025] B.Sc. Mathematics  ✓ Completed",
    "              S.N.K.P. Government College",
    "              Neemkathana, Rajasthan  |  Score: 59%",
    "",
    "  [2024-Now]  B.S. Data Science & Applications  ★ Current",
    "              Indian Institute of Technology Madras",
    "              Chennai, Tamil Nadu",
    "",
    "  [2024-Now]  CS & AI Program",
    "              PhysicsWallah Institute of Innovation (PW IOI)",
    "              Bangalore, Karnataka",
  ],

  achievements: [
    "Awards & Milestones:",
    "",
    "  🏆 Rajya Puraskar Award (2023)",
    "     Honored by Governor Kalraj Mishra for leadership",
    "     in Bharat Scouts & Guides.",
    "",
    "  💻 100+ Days Coding Streak (2024)",
    "     Consistent problem-solving in Python, Java & DSA",
    "     on LeetCode & CodeChef.",
    "",
    "  ☁️  Top 5 — AWS Cloud Hackathon (2024)",
    "     Ranked Top 5 out of 140+ competing teams.",
    "",
    "  📊 Power BI Competition Winner (2024)",
    "     Won SkillBoost EdTech Case Study — Interactive dashboards.",
    "",
    "  🧠 Prompt Engineering Certified (2024)",
    "     Chegg Skills certification in AI prompt engineering.",
    "",
    "  🏢 Software Dev Internship Completed (2024)",
    "     Zidio Development Company, Bangalore.",
  ],

  certifications: [
    "Professional Certifications:",
    "",
    "  1. AI Prompt Engineering Certificate",
    "     Chegg Skills × EdifyOnline  |  May–Jul 2025",
    "",
    "  2. B.Sc. Part-III Result Certificate",
    "     PDU Shekhawati University, Sikar  |  2024–2025",
    "",
    "  3. Foundation Level Certificate",
    "     IIT Madras — BS Programme  |  Completed Sep 2025",
    "",
    "  4. A Quick Introduction to Machine Learning",
    "     IBM Skills Network × Cognitive Class  |  August 2025",
  ],

  contact: [
    "Get in Touch:",
    "  * Email    : ganeshagarwal0895@gmail.com",
    "  * Phone    : +91 63754 76136",
    "  * GitHub   : https://github.com/agarwalganesh",
    "  * LinkedIn : https://www.linkedin.com/in/ganesh-agarwal-a20917308",
    "  * Location : Bangalore, Karnataka, India",
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
