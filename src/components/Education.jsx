import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen } from 'lucide-react';
import { education } from '../data';
import SectionHeader from './SectionHeader';

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader title="Education" subtitle="Academic background" />

        <div className="space-y-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-hover p-8 card-shine group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={28} className="text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-display font-semibold text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {edu.gpa && (
                        <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-sm font-mono font-medium">
                          GPA: {edu.gpa}
                        </span>
                      )}
                      <span className="text-slate-500 text-sm font-mono">{edu.duration}</span>
                    </div>
                  </div>

                  {/* Coursework */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={14} className="text-slate-500" />
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        Relevant Coursework
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
