import { Github, Linkedin, Mail, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { icon: Github, href: "https://github.com/agarwalganesh", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ganesh-agarwal-a20917308", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ganeshagarwal0895@gmail.com", label: "Email" },
  ];

  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI Engineer · GenAI · AI Automation · Building AI Agents & RAG Systems</span>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © {currentYear} Ganesh Agarwal. Built with React, Tailwind & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;