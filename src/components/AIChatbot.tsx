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
  "What AI projects have you built?",
  "Tell me about your AI automation work",
  "What's in your tech stack?",
  "How can I contact you?",
];

const BOT_KNOWLEDGE: { keywords: string[]; response: string }[] = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ["hello", "hi", "hey", "greetings", "yo", "sup", "howdy"],
    response:
      "Hello! 👋 I'm Ganesh's AI Assistant. Ask me anything about his AI engineering work, projects, skills, experience, or how to get in touch!",
  },

  // ── About / Personal ───────────────────────────────────────────────────────
  {
    keywords: ["about", "who", "ganesh", "yourself", "background", "profile", "bio"],
    response:
      "Ganesh Agarwal is an AI Engineer focused on GenAI, AI Automation and full-stack AI development.\n\n• 📍 Location: Bangalore, Karnataka, India\n• 🎯 Focus: AI Engineering · GenAI · AI Automation\n• 🏫 Student at IIT Madras (BS Data Science) & PW IOI\n• 🛠️ Building: AI agents, RAG systems, LLM apps, automation workflows\n\nHe ships end-to-end AI products — from prompt engineering and retrieval pipelines to FastAPI backends and full-stack interfaces.",
  },

  // ── Skills ─────────────────────────────────────────────────────────────────
  {
    keywords: ["skill", "skills", "tech", "languages", "stack", "code", "python", "react", "tools", "tooling"],
    response:
      "Ganesh's stack is built around AI engineering and modern full-stack development:\n\n🤖 *AI / GenAI*\n• LangChain · LangGraph · RAG · AI Agents\n• Tool Calling · Prompt Engineering\n• Embeddings · Vector Databases · ChromaDB\n\n⚡ *AI Automation*\n• n8n · Workflow Automation · API Integrations\n• Webhooks · Event-driven automation\n\n🧠 *Machine Learning*\n• Scikit-learn · XGBoost · Random Forest\n• Feature Engineering · Anomaly Detection\n\n📊 *Data*\n• Python · Pandas · NumPy · SQL · MySQL\n\n🛠️ *Backend*\n• FastAPI · REST APIs · PostgreSQL · Supabase · Node.js\n\n☁️ *DevOps / Cloud*\n• Docker · AWS · MLOps · Git · GitHub",
  },

  // ── Projects – overview ────────────────────────────────────────────────────
  {
    keywords: ["project", "projects", "work", "portfolio", "build", "built"],
    response:
      "Ganesh has built 7 featured projects spanning AI, ML and full-stack:\n\n1. 🎙️ *Meeting Mind* — AI meeting intelligence & summarizer (LLM + Whisper)\n2. 🧠 *Student Mental Health & Overthinking* — EDA + Random Forest\n3. 🛡️ *Credit Risk & Fraud Detection* — XGBoost + Anomaly Detection\n4. 🤖 *LearnSyncAI Terminal* — AI website generator via CLI\n5. 🎓 *JEE Mains Rank Predictor* — PW IOI lead-gen tool (Node.js + Supabase)\n6. ☀️ *Sunstide* — Solar charging smart bag showcase\n7. 📊 *Excel Analytics Platform* — MERN stack visualizer\n\nAsk me about any specific project for more details!",
  },

  // ── Project – Meeting Mind ─────────────────────────────────────────────────
  {
    keywords: ["meeting", "meeting mind", "meetingmind", "summarizer", "transcription", "action item", "whisper"],
    response:
      "🎙️ *Meeting Mind*\nSubtitle: AI Meeting Intelligence & Summarizer\n\n• An intelligent meeting assistant that transcribes live audio, generates structured summaries, and extracts action items using LLMs\n• Features: Audio Transcription, Action Item Extractor, Smart Summaries, Searchable Notes\n• Tech: Next.js, Python, Whisper, OpenAI / Gemini\n• GitHub: github.com/agarwalganesh/MeetingMindAI",
  },

  // ── Project – Credit Risk ──────────────────────────────────────────────────
  {
    keywords: ["credit", "risk", "fraud", "finance", "loan", "xgboost", "anomaly"],
    response:
      "🛡️ *Credit Risk & Fraud Detection*\nSubtitle: ML Risk Scoring & Anomaly Detection\n\n• Dataset: 1,000 × 9 financial records\n• Algorithms: XGBoost, Random Forest, Isolation Forest, LOF\n• Flagged ~20% anomalous transactions\n• *AUC-ROC: 0.85*  |  *Accuracy: 78–81%*\n• 12+ engineered features, 5-fold CV\n• Tech: Python, XGBoost, Scikit-learn\n• GitHub: github.com/agarwalganesh/Loan-risk-analysis--PROJECT",
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
      "🎓 *JEE Mains Rank Predictor*\nSubtitle: PW IOI Lead Generation Tool\n\n• Predictive tool estimating JEE ranks from student inputs\n• Generates data-driven admission leads for PW IOI Innovation Hub\n• Features: Real-time predictions, High availability, Live demo\n• Tech: Node.js, Supabase, Vercel\n• Live: jeemains-rank-predicator-pwioi.live",
  },

  // ── Project – LearnSyncAI ─────────────────────────────────────────────────
  {
    keywords: ["learnsync", "terminal", "ai website", "generator", "cli", "openai", "nlp"],
    response:
      "🤖 *LearnSyncAI Terminal*\nSubtitle: AI-Powered Website Generator (CLI)\n\n• Terminal-based AI assistant that generates and deploys websites via natural language\n• Features: NLP Commands, Auto Deploy, AI Code Gen, Multiple Templates\n• Tech: Python, LLM API, CLI\n• GitHub: github.com/agarwalganesh/LearnSync-Website-maker",
  },

  // ── AI Automation ─────────────────────────────────────────────────────────
  {
    keywords: ["automation", "automate", "workflow", "n8n", "webhook", "trigger"],
    response:
      "⚡ *AI Automation*\nGanesh designs and ships event-driven AI workflows:\n\nTrigger → Data/API → AI Processing → Decision/Agent → Action → Notification\n\nTools: n8n · LangChain · LangGraph · LLMs · Webhooks · APIs · Telegram / WhatsApp\n\nTypical patterns: lead enrichment, AI-driven email classification, social → knowledge-base pipelines, document Q&A with notifications.",
  },

  // ── RAG / AI Agents ───────────────────────────────────────────────────────
  {
    keywords: ["rag", "retrieval", "agent", "agents", "vector", "embedding", "chroma", "langchain", "langgraph", "llm", "prompt"],
    response:
      "🧠 *RAG & AI Agents*\n\nGanesh builds practical LLM applications:\n• *RAG*: document ingestion → chunking → embeddings → ChromaDB → retrieval → LLM response\n• *AI Agents*: LangGraph graphs with tool calling, state and conditional edges\n• *Prompt Engineering*: structured outputs, system prompts, few-shot patterns\n• *Embeddings*: chunking strategies, vector store selection, semantic retrieval",
  },

  // ── Experience ────────────────────────────────────────────────────────────
  {
    keywords: ["experience", "intern", "internship", "zidio", "pw", "physicswallah", "job", "work history", "professional"],
    response:
      "💼 Ganesh's Professional Experience:\n\n🌟 *AI Engineer Intern — PW (PhysicsWallah)*\n  📅 Jun 2025 – Present  |  On-site / Hybrid\n  → Building GenAI solutions, custom LLM agents and AI automation workflows.\n\n💻 *Web Developer — Zidio Development*\n  📅 Apr 2025 – Jul 2025 (4 months)  |  Remote, Bengaluru\n  → Engineered scalable web application features, partnered with cross-functional teams in Agile sprints.",
  },

  // ── Education / Journey ────────────────────────────────────────────────────
  {
    keywords: ["study", "education", "iit", "madras", "university", "college", "degree", "school", "academic", "journey", "learning"],
    response:
      "🎓 Ganesh's Journey & Education:\n\n*Progression:* Data Analytics → Machine Learning → Generative AI → LangChain → LangGraph → AI Agents → AI Automation → Full-Stack AI.\n\n*Academics:*\n• B.S. Data Science & Applications — IIT Madras (2024 – Present)\n• CS & AI Program — PhysicsWallah Institute of Innovation (PW IOI)\n• B.Sc. Mathematics — PDU Shekhawati University (completed)\n• High School PCM — Eternal Life Senior Secondary School",
  },

  // ── Achievements ──────────────────────────────────────────────────────────
  {
    keywords: ["achievement", "achievements", "award", "awards", "honor", "recognition", "milestone", "rajya", "puraskar", "scout", "aws", "hackathon", "streak"],
    response:
      "🏆 Key Achievements:\n\n🥇 *Rajya Puraskar Award* (2023) — Governor Kalraj Mishra, Bharat Scouts & Guides\n💻 *100+ Days Coding Streak* (2024) — Python, Java, DSA on LeetCode & CodeChef\n☁️ *Top 5 — AWS Cloud Hackathon* (2024) — Top 5 of 140+ teams\n🤖 *Prompt Engineering Certified* (2025) — Chegg Skills × EdifyOnline\n🧠 *IBM Machine Learning* (2025) — IBM Skills Network × Cognitive Class\n🏢 *AI Engineer Intern — PW* (2025) — Currently working on GenAI agents",
  },

  // ── Certifications ────────────────────────────────────────────────────────
  {
    keywords: ["certif", "certificate", "certification", "course", "chegg", "ibm", "foundation", "credential"],
    response:
      "📜 Certifications:\n\n1. 🤖 *AI Prompt Engineering Certificate*\n   Issuer: Chegg Skills × EdifyOnline  |  May–Jul 2025\n\n2. 🎓 *Foundation Level Certificate*\n   Issuer: IIT Madras (BS Programme)  |  Completed Sep 2025\n\n3. 🧠 *A Quick Introduction to Machine Learning*\n   Issuer: IBM Skills Network × Cognitive Class  |  August 2025",
  },

  // ── GitHub ────────────────────────────────────────────────────────────────
  {
    keywords: ["github", "git", "repo", "repos", "commit", "contribution", "code"],
    response:
      "🐙 GitHub: github.com/agarwalganesh\nLive repos, stars and contribution history are embedded directly on this portfolio. Check the *GitHub* section on this page for the live contribution graph and stats.",
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
      "📄 You can download Ganesh's resume directly from the portfolio. Use the *Resume* button in the Hero section, or open /resume.pdf",
  },

  // ── Help ──────────────────────────────────────────────────────────────────
  {
    keywords: ["help", "what can you", "options", "topics", "ask"],
    response:
      "💡 Here's what I can tell you about Ganesh:\n\n• *about* — Background & focus\n• *skills / stack* — AI, ML, backend, devops\n• *projects* — All 7 featured projects\n• *rag / agents* — RAG & AI agent work\n• *automation* — AI automation workflows\n• *experience* — Internships & work\n• *journey* — Learning progression\n• *achievements* — Awards & milestones\n• *certifications* — Verified credentials\n• *github* — Code & contributions\n• *contact* — How to reach him\n\nJust ask naturally — e.g. 'Tell me about his AI projects' or 'How does he automate workflows?'",
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
    ),
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
  return "I'm not sure about that detail yet. Try asking about his *projects*, *skills*, *rag*, *agents*, *automation*, *experience*, *journey*, *achievements*, *certifications*, or *contact*. Type 'help' for all topics!";
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! 👋 I'm Ganesh's AI Assistant — trained on his full portfolio. Ask me about his AI engineering, RAG, agents, automation or projects.",
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

    await new Promise((resolve) => setTimeout(resolve, 700));

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
            aria-label="Open AI chatbot"
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
                aria-label="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === "user"
                        ? "bg-accent/20 text-accent"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
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
                    <span
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
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
                aria-label="Send message"
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