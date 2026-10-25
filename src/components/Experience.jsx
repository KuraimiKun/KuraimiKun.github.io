import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, MapPin, ChevronRight, Briefcase, Award } from 'lucide-react';
import { experience } from '../data';
import SectionHeader from './SectionHeader';
import TiltCard3D from './TiltCard3D';

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        <SectionHeader
          title="Professional Experience"
          subtitle="Leadership & Software Delivery"
        />

        {/* 3D Timeline */}
        <div className="relative">
          {/* Glowing vertical spine */}
          <div className="absolute left-6 md:left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent via-primary to-purple-500 opacity-40" />

          <div className="space-y-9">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pl-16 md:pl-20"
              >
                {/* 3D Timeline Node */}
                <div className="absolute left-3 md:left-5 top-6 w-6 h-6 rounded-xl bg-surface border-2 border-accent shadow-lg shadow-accent/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>

                <TiltCard3D
                  intensity={8}
                  className="glass rounded-2xl p-6 md:p-8 group"
                >
                  <div style={{ transform: 'translateZ(22px)' }}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                          <h3 className="text-lg md:text-xl font-display font-bold text-white">
                            {exp.title}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-md bg-primary/15 border border-primary/30 text-primary text-xs font-mono">
                            {exp.type}
                          </span>
                          {exp.badge && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                              <Award size={11} />
                              {exp.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          {exp.website ? (
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline font-medium flex items-center gap-1 text-sm"
                            >
                              <Briefcase size={13} />
                              {exp.company}
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="text-accent font-medium flex items-center gap-1.5 text-sm">
                              <Briefcase size={13} />
                              {exp.company}
                            </span>
                          )}

                          {exp.location && (
                            <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                              <MapPin size={12} className="text-primary" />
                              {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono whitespace-nowrap self-start">
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mt-4">
                      {exp.highlights.map((highlight, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed"
                        >
                          <ChevronRight
                            size={15}
                            className="text-accent mt-1 flex-shrink-0"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
