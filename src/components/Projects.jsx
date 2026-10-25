import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Globe,
  Building2,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { projects } from '../data';
import SectionHeader from './SectionHeader';
import TiltCard3D from './TiltCard3D';

const CATEGORIES = [
  'All',
  'Selected Web Work',
  'Enterprise & PMS',
  'Backend & AI',
  'Web & Mobile',
];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        <SectionHeader
          title="Selected Work & Systems"
          subtitle="Featured Engineering & IT Leadership"
        />

        {/* Selected Work Highlight Banner (CV Featured Domains) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 p-4 sm:px-6 rounded-2xl glass border-primary/25 bg-gradient-to-r from-primary/10 via-surface-light/60 to-accent/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-accent">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-accent">
                CV Highlighted Production Systems
              </p>
              <p className="text-sm text-slate-300">
                Leading <span className="text-white font-semibold">Bali Bustle PMS</span> &amp; shipping production platforms:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://socotracenter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-primary/25 border border-white/15 hover:border-primary/50 text-xs font-mono text-white transition-all duration-300"
            >
              <Globe size={13} className="text-accent" />
              socotracenter.com
              <ArrowUpRight size={13} />
            </a>
            <a
              href="https://tamkeen-hub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-accent/25 border border-white/15 hover:border-accent/50 text-xs font-mono text-white transition-all duration-300"
            >
              <Globe size={13} className="text-emerald-400" />
              tamkeen-hub.com
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-primary to-accent text-slate-950 font-semibold shadow-lg shadow-primary/25 scale-105'
                    : 'glass text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3D Project Cards Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 35, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="h-full"
              >
                <TiltCard3D
                  intensity={11}
                  glareColor={project.glowColor}
                  className="glass rounded-2xl p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* 3D Floating Top Visual Header */}
                    <div
                      style={{ transform: 'translateZ(28px)' }}
                      className={`relative h-36 rounded-xl mb-5 p-4 overflow-hidden bg-gradient-to-br ${project.accent} flex flex-col justify-between shadow-lg`}
                    >
                      <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px]" />
                      <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/15 blur-xl group-hover:scale-150 transition-transform duration-500" />

                      {/* Window Dots + Badge */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-300/90" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white">
                          {project.badge}
                        </span>
                      </div>

                      {/* Role & Period inside 3D Header */}
                      <div className="relative z-10">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-white/80">
                          {project.role}
                        </p>
                        <h3 className="text-lg font-display font-bold text-white leading-snug line-clamp-1">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Subtitle & Description */}
                    <div style={{ transform: 'translateZ(18px)' }}>
                      <p className="text-xs font-mono text-accent mb-2">
                        {project.subtitle}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Deliverables / Metrics */}
                    <div
                      style={{ transform: 'translateZ(22px)' }}
                      className="space-y-1.5 mb-5"
                    >
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-slate-300"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-accent flex-shrink-0"
                          />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack & Actions */}
                  <div style={{ transform: 'translateZ(26px)' }} className="pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 5).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Layers size={14} className="text-primary" />
                        System Details
                      </button>

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-white px-3.5 py-2 rounded-lg bg-accent/10 hover:bg-accent/25 border border-accent/30 transition-all"
                        >
                          Live Site
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <Building2 size={12} />
                          Active Enterprise PMS
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3D System Architecture Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full glass border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-accent text-xs font-mono mb-4">
                <Cpu size={13} />
                {activeProject.category} • {activeProject.period}
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-1">
                {activeProject.title}
              </h3>
              <p className="text-sm text-primary font-medium mb-4">
                Role: {activeProject.role}
              </p>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {activeProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Outcomes &amp; Architecture Highlights
                </h4>
                <div className="grid sm:grid-cols-3 gap-2.5">
                  {activeProject.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white flex items-center gap-2"
                    >
                      <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Technologies &amp; Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-primary/15 border border-primary/30 text-xs font-mono text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-slate-950 font-semibold hover:opacity-95 transition-opacity"
                >
                  Open {activeProject.badge}
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
