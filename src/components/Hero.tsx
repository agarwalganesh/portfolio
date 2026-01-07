import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail, ArrowDown, Facebook, Sparkles } from "lucide-react";
import ganeshProfile from "@/assets/ganesh-profile.jpg";
import { useState, useEffect } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Ganesh-Agarwal", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ganesh-agarwal-a20917308", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
  { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
];

const roles = [
  "Data Science Student",
  "Full-Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for opportunities</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg mb-4"
            >
              Hi Everyone, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-display font-bold mb-4"
            >
              <motion.span 
                className="text-gradient text-shadow-glow inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px hsl(175 80% 50% / 0.5)",
                    "0 0 40px hsl(175 80% 50% / 0.8)",
                    "0 0 20px hsl(175 80% 50% / 0.5)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Ganesh
              </motion.span>{" "}
              <span className="text-foreground">Agarwal</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 h-10"
            >
              <span className="text-xl md:text-2xl text-muted-foreground">
                I'm a{" "}
              </span>
              <motion.span 
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl md:text-2xl font-semibold text-gradient-accent inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              Passionate learner from IIT Madras BS in Data Science & PW IOI.
              Building end-to-end tech solutions that combine data intelligence
              with software development.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                  />
                  <social.icon size={20} className="relative z-10" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                className="group relative px-8 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Hire Me</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-3 glass text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 border-2 border-primary/50 rounded-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer animated ring */}
              <motion.div
                className="absolute inset-0 w-72 h-72 md:w-96 md:h-96 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(175 80% 50%), hsl(280 70% 60%), hsl(175 80% 50%))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner glow ring */}
              <motion.div
                className="absolute inset-1 w-[280px] h-[280px] md:w-[376px] md:h-[376px] rounded-full bg-background"
                animate={{
                  boxShadow: [
                    "0 0 30px hsl(175 80% 50% / 0.3) inset",
                    "0 0 60px hsl(175 80% 50% / 0.5) inset",
                    "0 0 30px hsl(175 80% 50% / 0.3) inset",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Profile image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2">
                <motion.div 
                  className="absolute inset-4 rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={ganeshProfile}
                    alt="Ganesh Agarwal"
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-sm font-semibold text-gradient">IIT Madras</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-sm font-semibold text-gradient-accent">92% JEE</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors group"
            whileHover={{ y: -5 }}
          >
            <span className="text-sm mb-2 group-hover:text-primary transition-colors">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;