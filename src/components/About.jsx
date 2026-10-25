import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase,
  Server,
  Layers,
  Globe,
  Brain,
  Database,
  Smartphone,
  Cloud,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { personalInfo, interests, journeyLocations } from '../data';
import SectionHeader from './SectionHeader';
import TiltCard3D from './TiltCard3D';
import Globe3D from './Globe3D';

const iconMap = {
  briefcase: Briefcase,
  server: Server,
  layers: Layers,
  globe: Globe,
  brain: Brain,
  database: Database,
  smartphone: Smartphone,
  cloud: Cloud,
};

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const [activeLocationId, setActiveLocationId] = useState('taiwan');

  const activeLocation =
    journeyLocations.find((l) => l.id === activeLocationId) ||
    journeyLocations[journeyLocations.length - 1];

  const infoItems = [
    {
      icon: MapPin,
      label: 'Current Base',
      value: 'Taiwan (NTOU Master’s)',
    },
    {
      icon: Briefcase,
      label: 'Current Role',
      value: 'IT Project Manager @ Bali Bustle',
    },
    {
      icon: Phone,
      label: 'Phone (Taiwan)',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: GraduationCap,
      label: 'Degrees',
      value: 'M.Sc. CS (NTOU) • B.Eng (UM, GPA 3.75)',
    },
  ];

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-45 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        <SectionHeader
          title="About & Global Journey"
          subtitle="Engineering • ERP • IT Leadership"
        />

        {/* Top Row: 3D Bio & Quick Info */}
        <div className="grid lg:grid-cols-12 gap-7 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <TiltCard3D intensity={8} className="glass rounded-2xl p-7 sm:p-8">
              <div style={{ transform: 'translateZ(20px)' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-accent text-xs font-mono mb-4">
                  Executive Summary
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                  Architecting Systems &amp; Leading Cross-Border Teams
                </h3>
                <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                  {personalInfo.bio}
                </p>
                <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-6">
                  {personalInfo.fullBio}
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-400">
                    Selected Work:{' '}
                    <a
                      href="https://socotracenter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      socotracenter.com
                    </a>{' '}
                    |{' '}
                    <a
                      href="https://tamkeen-hub.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      tamkeen-hub.com
                    </a>
                  </div>
                  <a
                    href={personalInfo.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-accent transition-colors"
                  >
                    Download Full CV
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="lg:col-span-5"
          >
            <TiltCard3D intensity={8} className="glass rounded-2xl p-7 sm:p-8">
              <div style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-xl font-display font-bold text-white mb-5">
                  Profile Snapshot
                </h3>
                <div className="space-y-3.5">
                  {infoItems.map(({ icon: Icon, label, value, href }, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon size={17} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-slate-500 uppercase font-mono tracking-wider">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="text-slate-200 hover:text-accent transition-colors text-sm font-medium truncate block"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-slate-200 text-sm font-medium truncate">
                            {value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* Interactive 3D Global Journey Globe Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="glass rounded-3xl p-6 sm:p-8 mb-14 border border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left: Interactive Three.js 3D Globe */}
            <div className="w-full lg:w-1/2">
              <Globe3D
                locations={journeyLocations}
                activeId={activeLocationId}
                onSelectLocation={setActiveLocationId}
              />
            </div>

            {/* Right: Interactive Hub Selector & Active Hub Details */}
            <div className="w-full lg:w-1/2 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent mb-1">
                  <Navigation size={13} />
                  Interactive 3D Career Trajectory
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  Yemen → Indonesia → Bali → Taiwan
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select a hub below to rotate the 3D globe and inspect milestones across each country.
                </p>
              </div>

              {/* Hub Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {journeyLocations.map((loc, idx) => {
                  const isActive = loc.id === activeLocationId;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setActiveLocationId(loc.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-accent text-slate-950 font-semibold shadow-lg shadow-primary/25 scale-105'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: isActive ? '#090d16' : loc.color,
                        }}
                      />
                      <span>
                        0{idx + 1}. {loc.city.split(',')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Location Card */}
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-surface-light/80 border border-white/15 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium"
                    style={{
                      backgroundColor: `${activeLocation.color}20`,
                      color: activeLocation.color,
                    }}
                  >
                    {activeLocation.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeLocation.period}
                  </span>
                </div>
                <h4 className="text-lg font-display font-bold text-white">
                  {activeLocation.city} — {activeLocation.role}
                </h4>
                <p className="text-xs font-mono text-primary">
                  {activeLocation.org}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeLocation.summary}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Core Domains / Interests in 3D Cards */}
        <div>
          <h3 className="text-lg font-display font-semibold text-white mb-6 text-center">
            Core Engineering &amp; Management Domains
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {interests.map((interest, i) => {
              const Icon = iconMap[interest.icon] || Globe;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <TiltCard3D
                    intensity={12}
                    className="glass rounded-2xl p-4 flex flex-col items-center gap-3 text-center group"
                  >
                    <div
                      style={{ transform: 'translateZ(24px)' }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon size={22} className="text-accent" />
                    </div>
                    <span
                      style={{ transform: 'translateZ(16px)' }}
                      className="text-xs sm:text-sm text-slate-200 font-medium"
                    >
                      {interest.name}
                    </span>
                  </TiltCard3D>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
