import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink, Download, Calendar, Building } from "lucide-react";
import cheggCert from "@/assets/chegg-prompt-eng-cert.jpg";
import bscResultCert from "@/assets/bsc-result-cert.jpg";
import iitMadrasCert from "@/assets/iit-madras-cert.jpg";
import ibmMlCert from "@/assets/ibm-ml-cert.jpg";

const certificatesData = [
  {
    title: "AI Prompt Engineering Certificate",
    issuer: "Chegg Skills",
    partner: "EdifyOnline",
    dates: "May 2025 – July 2025",
    image: cheggCert,
    pdfUrl: "/certificates/chegg_prompt_eng.pdf",
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "hover:border-orange-500/50",
  },
  {
    title: "B.Sc. Part-III Result (Mathematics, Physics, Chemistry)",
    issuer: "PDU Shekhawati University, Sikar",
    partner: "",
    dates: "2024 – 2025",
    image: bscResultCert,
    pdfUrl: "/certificates/3rd_year_result.pdf",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-blue-500/50",
  },
  {
    title: "Foundation Level Certificate",
    issuer: "IIT Madras",
    partner: "BS Degree Programme",
    dates: "Completed Sep 2025",
    image: iitMadrasCert,
    pdfUrl: "/certificates/iit_madras_foundation.pdf",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "hover:border-emerald-500/50",
  },
  {
    title: "A Quick Introduction to Machine Learning",
    issuer: "IBM Skills Network",
    partner: "Cognitive Class",
    dates: "August 2025",
    image: ibmMlCert,
    pdfUrl: "/certificates/ibm_ml_intro.pdf",
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "hover:border-indigo-500/50",
  },
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="certifications" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Verified Credentials</span>
            <Award className="w-5 h-5 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and courses I've completed
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificatesData.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.div
                className={`glass rounded-2xl overflow-hidden border border-border/50 ${cert.borderColor} transition-colors duration-300`}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Certificate Image */}
                <div className="relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                  />
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-52 object-cover object-top"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                    initial={{ x: "-100%" }}
                    animate={hoveredIndex === index ? { x: "200%" } : { x: "-100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="w-4 h-4 text-primary/70" />
                      <span>{cert.issuer}</span>
                      {cert.partner && (
                        <span className="text-xs text-muted-foreground/70">× {cert.partner}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary/70" />
                      <span>{cert.dates}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </motion.a>
                    <motion.a
                      href={cert.pdfUrl}
                      download
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.a>
                  </div>
                </div>

                {/* Bottom accent */}
                <motion.div
                  className="h-1 bg-gradient-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
