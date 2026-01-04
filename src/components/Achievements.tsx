import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Code, Cloud, BarChart, Brain, Briefcase } from "lucide-react";

const achievementsData = [
  {
    icon: Trophy,
    title: "Rajya Puraskar Award",
    description: "Honored by Governor Kalraj Mishra for leadership in Bharat Scouts and Guides",
    year: "2023",
    color: "bg-yellow-500/20 text-yellow-400",
  },
  {
    icon: Code,
    title: "100+ Days Coding Streak",
    description: "Consistent problem-solving in Python, Java & DSA on LeetCode & CodeChef",
    year: "2024",
    color: "bg-green-500/20 text-green-400",
  },
  {
    icon: Cloud,
    title: "Top 5 - AWS Hackathon",
    description: "Ranked Top 5 out of 140+ teams in AWS Cloud Hackathon",
    year: "2024",
    color: "bg-orange-500/20 text-orange-400",
  },
  {
    icon: BarChart,
    title: "Power BI Competition",
    description: "Winner of SkillBoost EdTech Case Study - Built interactive dashboards",
    year: "2024",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    icon: Brain,
    title: "Prompt Engineering Certified",
    description: "Completed certification from Chegg Skills in AI prompt engineering",
    year: "2024",
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    icon: Briefcase,
    title: "Software Dev Intern",
    description: "Completed internship at Zidio Development Company, Bangalore",
    year: "2024",
    color: "bg-cyan-500/20 text-cyan-400",
  },
];

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Milestones and recognitions along my journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="glass rounded-xl p-6 h-full relative overflow-hidden group"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${achievement.color} flex items-center justify-center`}>
                      <achievement.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                      {achievement.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
