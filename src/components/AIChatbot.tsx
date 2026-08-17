import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "Tell me about your ML projects",
  "What are your achievements?",
  "What is your tech stack?",
  "How can I contact you?",
];

const BOT_KNOWLEDGE: { keywords: string[]; response: string }[] = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ["hello", "hi", "hey", "greetings", "yo", "sup", "howdy"],
    response:
      "Hello! 👋 I'm Ganesh's AI Assistant. Ask me anything about his projects, skills, experience, education, achievements, or certifications!",
  },

  // ── About / Personal ───────────────────────────────────────────────────────
  {
    keywords: ["about", "who", "ganesh", "yourself", "background", "profile", "bio"],
    response:
      "Ganesh Agarwal is a GenAI & LLM Engineer, Machine Learning Engineer, and AI Automation Developer.\n\n• 📍 Location: Bangalore, Karnataka, India\n• 🎂 Born: September 8, 2005 — from Neemkathana, Rajasthan\n• 🎯 Goal: ML Engineer & AI Analyst\n• 🏫 Student at IIT Madras (BS Data Science) & PW IOI\n• 📈 JEE Percentile: 92%\n\nHe journeyed from a small town in Rajasthan to top-tier tech institutes through dedication and continuous learning.",
  },

  // ── Skills ─────────────────────────────────────────────────────────────────
  {
    keywords: ["skill", "skills", "tech", "languages", "stack", "code", "python", "react", "tools", "tooling"],
    response:
      "Ganesh's tech stack spans AI/ML and Modern Web:\n\n🔧 *Core Skills*\n• Python — Pandas, NumPy, Scikit-learn (90%)\n• Machine Learning — XGBoost, Random Forest (85%)\n• EDA & Feature Engineering (88%)\n• Anomaly Detection — IsoForest, LOF (80%)\n• SQL / MySQL (85%)\n• C++ / C (75%)\n• Git / GitHub (85%)\n• Node.js & Supabase (75%)\n\n🌱 *Currently Learning*\n• Deep Learning 🤖  |  MLOps ⚙️\n• AWS Cloud ☁️  |  DSA 🧮\n• Power BI 📊  |  Prompt Engineering 🧠\n\n🌐 *Web*: React, TypeScript, Tailwind CSS, Framer Motion\n🗄️ *Databases*: MongoDB, Supabase, MySQL",
  },

  // ── Projects – overview ────────────────────────────────────────────────────
  {
    keywords: ["project", "projects", "work", "portfolio", "build", "built"],
    response:
      "Ganesh has built 6 featured projects across ML and Web:\n\n1. 🛡️ *Credit Risk & Fraud Detection* — XGBoost + Anomaly Detection\n2. 🧠 *Student Mental Health & Overthinking* — EDA + Random Forest\n3. 🎓 *JEE Mains Rank Predictor* — PW IOI lead generation tool\n4. ☀️ *Sunstide* — Solar charging smart bag showcase website\n5. 📊 *Excel Analytics Platform* — MERN stack data visualizer\n6. 🤖 *LearnSyncAI Terminal* — AI-powered website generator (CLI)\n\nAsk me about any specific project for more details!",
  },

  // ── Project – Credit Risk ──────────────────────────────────────────────────
  {
    keywords: ["credit", "risk", "fraud", "finance", "loan", "xgboost", "anomaly"],
    response:
      "🛡️ *Credit Risk & Fraud Detection*\nSubtitle: ML Risk Scoring & Anomaly Detection\n\n• Dataset: 1,000 × 9 financial records\n• Algorithms: XGBoost, Random Forest, Isolation Forest, Local Outlier Factor (LOF)\n• Flagged ~20% anomalous transactions\n• *AUC-ROC: 0.85*  |  *Accuracy: 78–81%*\n• 12+ engineered features, 5-fold cross-validation\n• Tech: Python, XGBoost, Scikit-learn\n• GitHub: github.com/agarwalganesh/Loan-risk-analysis--PROJECT",
  },

  // ── Project – Mental Health ────────────────────────────────────────────────
  {
    keywords: ["mental", "health", "overthinking", "student", "eda"],
    response:
      "🧠 *Student Mental Health & Overthinking*\nSubtitle: EDA + Classification Pipeline\n\n• Dataset: 101 × 8 student behavior records\n• 8-visualization EDA pipeline revealing behavioral patterns\n• Random Forest classifier mapping overthinking levels: High → None\n• Output: Confusion Matrix & Behavior Insights\n• Tech: Python, Scikit-learn, Pandas\n• GitHub: github.com/agarwalganesh/StudentOverthinkingEDA-project",
  },

  // ── Project – JEE Predictor ────────────────────────────────────────────────
  {
    keywords: ["jee", "rank", "predictor", "pw", "ioi", "physicswallah"],
    response:
      "🎓 *JEE Mains Rank Predictor*\nSubtitle: PW IOI Lead Generation Tool\n\n• High-accuracy predictive tool estimating student JEE ranks from performance inputs\n• Generates data-driven admission leads for PW IOI Innovation Hub\n• Features: Real-time predictions, High availability, Live demo\n• Tech: Node.js, Supabase, Vercel\n• Live: jeemains-rank-predicator-pwioi.live\n• GitHub: github.com/agarwalganesh",
  },

  // ── Project – Sunstide ────────────────────────────────────────────────────
  {
    keywords: ["sunstide", "solar", "bag", "sun"],
    response:
      "☀️ *Sunstide*\nSubtitle: Solar Charging Smart Bag Website\n\n• Showcase website for an innovative solar-charging bag that generates energy through sunlight and motion\n• Features: Responsive design, Interactive demos, Mobile-first, Modern UI/UX\n• Tech: React, Tailwind CSS, Framer Motion\n• GitHub: github.com/agarwalganesh",
  },

  // ── Project – Excel Analytics ─────────────────────────────────────────────
  {
    keywords: ["excel", "analytics", "platform", "chart", "mern", "visuali"],
    response:
      "📊 *Excel Analytics Platform*\nSubtitle: MERN Stack Data Visualization\n\n• Dynamic web app allowing users to upload Excel files and generate interactive 2D/3D charts\n• Features: File Upload, Real-time Processing, 3D Charts, Data Export\n• Tech: MongoDB, Express.js, React, Node.js\n• GitHub: github.com/agarwalganesh",
  },

  // ── Project – LearnSyncAI ─────────────────────────────────────────────────
  {
    keywords: ["learnsync", "terminal", "ai website", "generator", "cli", "openai", "nlp"],
    response:
      "🤖 *LearnSyncAI Terminal*\nSubtitle: AI-Powered Website Generator\n\n• Terminal-based AI assistant that helps users generate and deploy websites using natural language commands\n• Features: NLP Commands, Auto Deploy, AI Code Generation, Multiple Templates\n• Tech: Python, OpenAI API, CLI\n• GitHub: github.com/agarwalganesh/LearnSync-Website-maker",
  },

  // ── Experience ────────────────────────────────────────────────────────────
  {
    keywords: ["experience", "intern", "internship", "zidio", "pw", "physicswallah", "job", "work history", "professional"],
    response:
      "💼 Ganesh's Professional Experience:\n\n🌟 *Artificial Intelligence Engineer — PW (PhysicsWallah)*\n  📅 Jun 2026 – Present  |  On-site, Sector 62 Noida, UP\n  → Working on generative AI solutions, custom LLM agents, and intelligent automation workflows.\n\n💻 *Web Developer — Zidio Development*\n  📅 Apr 2025 – Jul 2025 (4 months)  |  Remote, Bengaluru\n  → Engineered scalable web application features, partnered with cross-functional teams, participated in sprint planning & code reviews in an Agile environment.",
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    keywords: ["study", "education", "iit", "madras", "university", "college", "degree", "school", "academic"],
    response:
      "🎓 Ganesh's Academic Journey:\n\n1. 📚 *High School (PCM)* — Eternal Life Senior Secondary School, Neemkathana, Rajasthan\n   Duration: 2020 – 2022  |  Score: *89.20%*\n\n2. 🎓 *B.Sc. Mathematics* — S.N.K.P. Govt. College, Neemkathana, Rajasthan\n   Duration: 2022 – 2025  |  Score: 59%  ✅ Completed\n\n3. 🖥️ *B.S. Data Science & Applications* — Indian Institute of Technology Madras\n   Duration: 2024 – Present  ⭐ Current\n\n4. 🚀 *CS & AI Program* — PhysicsWallah Institute of Innovation (PW IOI), Bangalore\n   Duration: 2024 – Present",
  },

  // ── Achievements ──────────────────────────────────────────────────────────
  {
    keywords: ["achievement", "achievements", "award", "awards", "honor", "recognition", "milestone", "rajya", "puraskar", "scout", "aws", "hackathon", "power bi", "streak"],
    response:
      "🏆 Ganesh's Key Achievements:\n\n🥇 *Rajya Puraskar Award* (2023)\n   Honored by Governor Kalraj Mishra for leadership in Bharat Scouts & Guides\n\n💻 *100+ Days Coding Streak* (2024)\n   Consistent problem-solving in Python, Java & DSA on LeetCode & CodeChef\n\n☁️ *Top 5 — AWS Cloud Hackathon* (2024)\n   Ranked Top 5 out of 140+ teams\n\n📊 *Power BI Competition Winner* (2024)\n   Won SkillBoost EdTech Case Study — Built interactive dashboards\n\n🧠 *Prompt Engineering Certified* (2024)\n   Certification from Chegg Skills in AI prompt engineering\n\n🏢 *Software Dev Internship Completed* (2024)\n   Zidio Development Company, Bangalore",
  },

  // ── Certifications ────────────────────────────────────────────────────────
  {
    keywords: ["certif", "certificate", "certification", "course", "chegg", "ibm", "foundation", "credential"],
    response:
      "📜 Ganesh's Certifications:\n\n1. 🤖 *AI Prompt Engineering Certificate*\n   Issuer: Chegg Skills × EdifyOnline  |  May–Jul 2025\n\n2. 📄 *B.Sc. Part-III Result Certificate*\n   Issuer: PDU Shekhawati University, Sikar  |  2024–2025\n\n3. 🎓 *Foundation Level Certificate*\n   Issuer: IIT Madras (BS Programme)  |  Completed Sep 2025\n\n4. 🧠 *A Quick Introduction to Machine Learning*\n   Issuer: IBM Skills Network × Cognitive Class  |  August 2025",
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  {
    keywords: ["contact", "hire", "email", "phone", "reach", "location", "bangalore", "linkedin", "github", "connect"],
    response:
      "📬 Contact Ganesh:\n\n• ✉️ *Email*: ganeshagarwal0895@gmail.com\n• 📱 *Phone*: +91 63754 76136\n• 💼 *LinkedIn*: linkedin.com/in/ganesh-agarwal-a20917308\n• 🐙 *GitHub*: github.com/agarwalganesh\n• 📍 *Location*: Bangalore, Karnataka, India",
  },

  // ── Resume ────────────────────────────────────────────────────────────────
  {
    keywords: ["resume", "cv", "download", "pdf"],
    response:
      "📄 You can download Ganesh's resume directly from the portfolio website. Click the *Download Resume* button in the Hero section or navigate to /resume.pdf",
  },

  // ── Help ──────────────────────────────────────────────────────────────────
  {
    keywords: ["help", "what can you", "options", "topics", "ask"],
    response:
      "💡 Here's what I can tell you about Ganesh:\n\n• *about* — Background & personal info\n• *skills* — Tech stack & proficiency levels\n• *projects* — All 6 featured projects\n• *experience* — Work & internship history\n• *education* — Academic journey\n• *achievements* — Awards & milestones\n• *certifications* — Verified credentials\n• *contact* — How to reach him\n\nJust ask naturally — e.g. 'Tell me about his ML projects' or 'What awards did he win?'",
  },
];

const renderMessageText = (text: string) =>
  text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
      <strong key={i} className="font-semibold">
        {part.slice(1, -1)}
      </strong>
    ) : (
      part
    )
  );

const getBotResponse = (input: string): string => {
  const query = input.toLowerCase().trim();

  // Exact match for "help"
  if (query === "help") {
    return BOT_KNOWLEDGE.find((e) => e.keywords.includes("help"))!.response;
  }

  for (const entry of BOT_KNOWLEDGE) {
    if (entry.keywords.some((keyword) => query.includes(keyword))) {
      return entry.response;
    }
  }
  return "I'm not sure about that detail yet. Try asking about his *projects*, *skills*, *experience*, *education*, *achievements*, *certifications*, or *contact* info. Type 'help' for all topics!";
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! 👋 I'm Ganesh's AI Assistant — trained on his full resume & portfolio. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate thinking/typing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const botResponseText = getBotResponse(text);
    const botMsg: Message = {
      id: Math.random().toString(),
      sender: "bot",
      text: botResponseText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300 relative group"
            style={{ boxShadow: "0 0 15px hsl(var(--primary) / 0.5)" }}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[360px] sm:w-[400px] h-[500px] bg-background/95 border border-primary/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col glass"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 bg-primary/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-1">
                    Ganesh's Agent <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-muted-foreground">Online & Ready to Chat</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === "user" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] text-sm whitespace-pre-line leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none border border-primary/5"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Bot className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                  <div className="p-3 bg-muted text-muted-foreground rounded-2xl rounded-tl-none border border-primary/5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 bg-background/50 border-t border-primary/5">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSendMessage(sug)}
                    className="text-[11px] bg-secondary/80 hover:bg-primary/10 hover:text-primary transition-all px-2.5 py-1 rounded-full border border-primary/10"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-3 border-t border-primary/10 flex gap-2 bg-background"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-secondary text-sm border-none rounded-xl px-4 py-2 focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="w-9 h-9 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-95 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbot;
