import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  { icon: Mail, label: "Email", value: "ganeshagarwal0895@gmail.com", href: "mailto:ganeshagarwal0895@gmail.com" },
  { icon: MapPin, label: "Location", value: "Bangalore, Karnataka, India", href: "#" },
  { icon: Phone, label: "Phone", value: "+91 63754 76136", href: "tel:+916375476136" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/agarwalganesh", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ganesh-agarwal-a20917308", label: "LinkedIn" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    
    const text = `Hello Ganesh! I would like to connect with you.\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || "916375476136";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    
    // Simulate form submission animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Redirect to WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    
    toast.success("Opening WhatsApp to send your message!");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>
 
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">
              Let's Connect
            </h3>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your vision.
            </p>
 
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 glass rounded-lg p-4 hover:bg-secondary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:glow-primary transition-shadow">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
 
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
 
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Your Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
              </div>
 
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Subject
                </label>
                <Input
                  name="subject"
                  type="text"
                  placeholder="Project Inquiry"
                  required
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>
 
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="bg-secondary/50 border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-primary-foreground font-semibold py-6 glow-primary hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send via WhatsApp
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Or email directly:{" "}
                <a
                  href="mailto:ganeshagarwal0895@gmail.com"
                  className="text-primary hover:underline"
                >
                  ganeshagarwal0895@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
