import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ExternalLink, MapPin, ChevronRight } from 'lucide-react';
import { experience } from '../data';
import SectionHeader from './SectionHeader';

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-40" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader title="Experience" subtitle="Professional journey" />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple-500 to-accent opacity-30" />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-3.5 md:left-5.5 top-2 w-5 h-5 rounded-full bg-surface border-2 border-primary shadow-lg shadow-primary/20">
                  <div className="absolute inset-1 rounded-full bg-primary animate-pulse-slow" />
                </div>

                <div className="glass-hover p-6 md:p-8 card-shine group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg md:text-xl font-display font-semibold text-white">
                          {exp.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline font-medium flex items-center gap-1 text-sm"
                        >
                          {exp.company}
                          <ExternalLink size={12} />
                        </a>
                        {exp.location && (
                          <span className="flex items-center gap-1 text-slate-500 text-xs">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-slate-500 text-sm font-mono whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                        <ChevronRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
