import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Target, Users } from "lucide-react";
import ganeshProfile from "@/assets/ganesh-profile.jpg";

const highlights = [
  { icon: MapPin, label: "Location", value: "Bangalore, Karnataka" },
  { icon: Calendar, label: "Born", value: "September 8, 2005" },
  { icon: Target, label: "Goal", value: "ML Engineer & Analyst" },
  { icon: Users, label: "Status", value: "IIT Madras Student" },
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
            Get to know my background, vision, and what drives me
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
                alt="Ganesh Agarwal"
                className="w-full rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass rounded-xl p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="text-3xl font-display font-bold text-gradient">92%</p>
              <p className="text-sm text-muted-foreground">JEE Percentile</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-4">
              A Curious Learner & Tech Enthusiast
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm Ganesh Agarwal, a motivated learner with a strong foundation in 
              mathematics and a growing passion for software development. From a small 
              town in Rajasthan to pursuing excellence at IIT Madras, I've built my 
              journey through dedication and continuous learning.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Currently pursuing B.Sc. in Data Science from IIT Madras and gaining 
              hands-on experience at PW IOI in DSA, full-stack development, and 
              real-world software projects. I aspire to become a data-driven product 
              developer, building scalable applications backed by intelligent analytics.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
