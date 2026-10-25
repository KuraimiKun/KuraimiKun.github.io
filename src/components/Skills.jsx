import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Server, Smartphone, Database, Briefcase, Globe2 } from 'lucide-react';
import { skills, languages } from '../data';
import SectionHeader from './SectionHeader';
import TiltCard3D from './TiltCard3D';
import SkillSphere3D from './SkillSphere3D';

const categoryMeta = {
  'Backend & APIs': {
    icon: Server,
    gradient: 'from-indigo-500 to-blue-500',
    sphereKey: 'backend',
  },
  'Frontend & Mobile': {
    icon: Smartphone,
    gradient: 'from-cyan-500 to-teal-500',
    sphereKey: 'frontend',
  },
  'Databases & Enterprise Systems': {
    icon: Database,
    gradient: 'from-emerald-500 to-green-500',
    sphereKey: 'data',
  },
  'Project Management & Architecture': {
    icon: Briefcase,
    gradient: 'from-purple-500 to-pink-500',
    sphereKey: 'pm',
  },
};

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const [hoveredGroup, setHoveredGroup] = useState('all');

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        <SectionHeader
          title="Technical Arsenal & Languages"
          subtitle="3D Interactive Stack"
        />

        {/* Top Row: Interactive 3D Skill Constellation + Category Cards */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: 3D Orbital Skill Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5 glass rounded-3xl p-4 border border-white/10"
          >
            <SkillSphere3D activeCategory={hoveredGroup} />
          </motion.div>

          {/* Right: 4 3D Tilt Skill Category Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {Object.entries(skills).map(([category, items], i) => {
              const meta = categoryMeta[category] || {
                icon: Server,
                gradient: 'from-primary to-accent',
                sphereKey: 'all',
              };
              const Icon = meta.icon;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredGroup(meta.sphereKey)}
                  onMouseLeave={() => setHoveredGroup('all')}
                  className="h-full"
                >
                  <TiltCard3D
                    intensity={10}
                    className="glass rounded-2xl p-6 group h-full"
                  >
                    <div style={{ transform: 'translateZ(24px)' }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <h3 className="font-display font-bold text-white text-sm leading-snug">
                          {category}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill, j) => (
                          <span
                            key={j}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 text-xs font-mono hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard3D>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Multilingual Spoken Languages Card (Updated with Chinese from new CV) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <TiltCard3D intensity={6} className="glass rounded-3xl p-6 sm:p-8">
            <div style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Globe2 size={20} className="text-accent" />
                <h3 className="text-lg sm:text-xl font-display font-bold text-white text-center">
                  Multilingual Communication
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {languages.map((lang, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white font-display font-bold text-base">
                        {lang.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent text-xs font-mono">
                        {lang.level}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">
                      {lang.tag}
                    </p>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${lang.percent}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.4 + i * 0.12,
                          ease: 'easeOut',
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard3D>
        </motion.div>
      </div>
    </section>
  );
}
