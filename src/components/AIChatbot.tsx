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
  "What is your tech stack?",
  "How can I contact you?",
  "Where do you study?",
];

const BOT_KNOWLEDGE: { keywords: string[]; response: string }[] = [
  {
    keywords: ["project", "projects", "work", "portfolio"],
    response: "Ganesh has completed several high-impact machine learning and web projects, including:\n1. *Credit Risk & Fraud Detection* (XGBoost)\n2. *Student Mental Health EDA & Classification*\n3. *JEE Mains Rank Predictor* (leads tool for PW IOI)\n4. *Sunstide* (solar smart bag portal)\n5. *Excel Analytics Platform*\n\nWhich one would you like to hear more about?",
  },
  {
    keywords: ["credit", "risk", "fraud", "finance"],
    response: "The *Credit Risk & Fraud Detection* project evaluates financial risk on a 1,000x9 dataset, segmenting applicants using XGBoost and Random Forest. It also utilizes Isolation Forest & Local Outlier Factor (LOF) to flag ~20% anomalous transactions, achieving an accuracy of 78-81% and an AUC-ROC of 0.85.",
  },
  {
    keywords: ["mental", "health", "overthinking", "student"],
    response: "The *Student Mental Health & Overthinking* project uses an 8-visualization EDA pipeline on student behaviors, culminating in a Random Forest classifier that maps overthinking levels from 'High' to 'None' with high accuracy.",
  },
  {
    keywords: ["jee", "rank", "predictor", "pw", "ioi"],
    response: "The *JEE Mains Rank Predictor* is a live web tool built for PW IOI to generate student admission leads by predicting ranks from performance input. It runs on Node.js, Supabase, and Vercel for high availability.",
  },
  {
    keywords: ["skill", "skills", "tech", "languages", "stack", "code", "python", "react"],
    response: "Ganesh's tech stack is centered around AI, ML, and Modern Web:\n• *Languages/Libraries*: Python (Pandas, NumPy, Scikit-learn), C/C++, SQL (MySQL)\n• *Web Engineering*: React, Node.js, Supabase, TypeScript, Tailwind CSS\n• *Currently Learning*: Deep Learning, MLOps, AWS Cloud, DSA, Power BI, Prompt Engineering.",
  },
  {
    keywords: ["contact", "hire", "email", "phone", "reach", "location", "bangalore"],
    response: "You can reach Ganesh through the following channels:\n• *Email*: ganeshagarwal0895@gmail.com\n• *Phone*: +91 63754 76136\n• *LinkedIn*: linkedin.com/in/ganesh-agarwal-a20917308\n• *GitHub*: github.com/agarwalganesh\n• *Location*: Bangalore, Karnataka, India.",
  },
  {
    keywords: ["study", "education", "iit", "madras", "university", "college", "degree"],
    response: "Ganesh's academic credentials include:\n1. *BS in Data Science & Applications* - IIT Madras (2023 - Present)\n2. *PW IOI Innovation Hub* - School of Computer Science & AI (2023 - 2027)\n3. *B.Sc. Mathematics & Sciences* - PDU Shekhawati University, Sikar (2022 - 2025).",
  },
  {
    keywords: ["experience", "intern", "internship", "zidio", "work"],
    response: "Ganesh has completed two internships:\n• *GenAI & LLM Intern* (Aug 2025 - Present): Architecting conversational agents, workflow automation, and prompting structures.\n• *Software Development Intern* at Zidio Development, Bangalore (Jun 2024 - Dec 2024): Developed React interfaces, integrated REST APIs, and managed data flows.",
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "yo"],
    response: "Hello! I am Ganesh's AI Assistant. Ask me anything about his projects, technical skills, education, or how to contact him!",
  },
];

const getBotResponse = (input: string): string => {
  const query = input.toLowerCase();
  for (const entry of BOT_KNOWLEDGE) {
    if (entry.keywords.some((keyword) => query.includes(keyword))) {
      return entry.response;
    }
  }
  return "I'm not fully sure about that detail. You can ask about his projects, skills, experience, education, or contact details, or type 'help' to see suggestions!";
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I am Ganesh's AI Assistant. How can I help you explore his portfolio today?",
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
                    {msg.text}
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
