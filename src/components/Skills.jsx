import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Cloud, Cpu, Wrench } from 'lucide-react';
import { skills, languages } from '../data';
import SectionHeader from './SectionHeader';

const categoryIcons = {
  "Languages & Frameworks": Code,
  "Backend & Data": Database,
  "Enterprise & Cloud": Cloud,
  "AI & Emerging Tech": Cpu,
  "Tools & Practices": Wrench,
};

const categoryColors = {
  "Languages & Frameworks": 'from-blue-500 to-indigo-500',
  "Backend & Data": 'from-emerald-500 to-teal-500',
  "Enterprise & Cloud": 'from-orange-500 to-amber-500',
  "AI & Emerging Tech": 'from-purple-500 to-pink-500',
  "Tools & Practices": 'from-cyan-500 to-sky-500',
};

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader title="Skills" subtitle="Technical expertise" />

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Object.entries(skills).map(([category, items], i) => {
            const Icon = categoryIcons[category] || Code;
            const gradient = categoryColors[category] || 'from-primary to-accent';

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-hover p-6 card-shine group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-sm">
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 + j * 0.03 }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-lg font-display font-semibold text-white mb-6 text-center">
            Languages
          </h3>
          <div className="glass p-6 space-y-5">
            {languages.map((lang, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-200 font-medium text-sm">{lang.name}</span>
                  <span className="text-slate-500 text-xs font-mono">{lang.level}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${lang.percent}%` } : {}}
                    transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
