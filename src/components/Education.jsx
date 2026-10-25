import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen, MapPin, Award } from 'lucide-react';
import { education } from '../data';
import SectionHeader from './SectionHeader';
import TiltCard3D from './TiltCard3D';

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="education" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        <SectionHeader
          title="Education & Academic Research"
          subtitle="Taiwan • Indonesia • Yemen"
        />

        <div className="space-y-7">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.14 }}
            >
              <TiltCard3D
                intensity={8}
                className="glass rounded-2xl p-6 sm:p-8 group"
              >
                <div
                  style={{ transform: 'translateZ(22px)' }}
                  className="flex flex-col md:flex-row md:items-start gap-6"
                >
                  {/* 3D Floating Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap size={28} className="text-slate-950" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md bg-primary/15 border border-primary/30 text-accent text-[11px] font-mono">
                            {edu.status}
                          </span>
                          {edu.location && (
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400">
                              <MapPin size={12} className="text-primary" />
                              {edu.location}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-display font-bold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-primary font-medium text-sm sm:text-base">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {edu.gpa && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
                            <Award size={12} />
                            {edu.gpa === 'In Progress'
                              ? 'M.Sc. Active'
                              : `GPA: ${edu.gpa}`}
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                          {edu.duration}
                        </span>
                      </div>
                    </div>

                    {/* Coursework & Focus Areas */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen size={14} className="text-accent" />
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                          Focus Areas &amp; Coursework
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium hover:bg-primary/15 hover:border-primary/40 hover:text-white transition-colors duration-200"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
