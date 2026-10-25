import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  FileText,
  Sparkles,
  MapPin,
  Briefcase,
  Award,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { personalInfo } from '../data';
import profileImg from '../assets/img/profile.jpg';
import TiltCard3D from './TiltCard3D';

export default function Hero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Ambient gradient backdrops */}
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Executive Pitch & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-slate-200 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>IT PM @ Bali Bustle</span>
              <span className="text-slate-600">•</span>
              <span className="text-accent font-mono text-xs flex items-center gap-1">
                <MapPin size={12} /> Taiwan (NTOU M.Sc. CS)
              </span>
            </motion.div>

            {/* Name & Title */}
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-slate-400 mb-2">
              {personalInfo.headline}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-4">
              Hi, I&apos;m{' '}
              <span className="gradient-text">Ahmed Al-Kuraimi</span>
            </h1>

            {/* Dynamic Role TypeAnimation */}
            <div className="text-lg sm:text-2xl lg:text-3xl text-slate-300 font-light mb-6 h-9 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-slate-500 font-mono text-base">&gt;</span>
              <TypeAnimation
                sequence={personalInfo.roles.flatMap((role) => [role, 2200])}
                wrapper="span"
                speed={45}
                repeat={Infinity}
                className="text-accent font-display font-semibold"
              />
            </div>

            {/* Bio from new CV */}
            <p className="text-slate-300/90 text-sm sm:text-base lg:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
              {personalInfo.bio}
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-7">
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary via-indigo-500 to-accent text-slate-950 font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <Sparkles size={18} />
                Explore Selected Work
              </button>

              <a
                href={personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass border-white/15 text-white font-medium hover:bg-white/10 hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FileText size={18} className="text-accent" />
                View New CV (PDF)
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Mail size={18} className="text-primary" />
                Email Me
              </a>
            </div>

            {/* Socials + Selected Work Quick Links */}
            <div className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start">
              {[
                { icon: Github, href: personalInfo.social.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-300 hover:text-white hover:border-primary/50 hover:bg-primary/15 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}

              <span className="h-5 w-px bg-white/10 mx-1 hidden sm:inline-block" />

              {personalInfo.selectedDomains.map((domain) => (
                <a
                  key={domain}
                  href={`https://${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-accent transition-colors"
                >
                  {domain}
                  <ExternalLink size={11} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Orbital Holographic Frame with Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="relative flex-shrink-0 my-4 lg:my-0"
          >
            <TiltCard3D
              intensity={16}
              scaleOnHover={1.04}
              glareColor="rgba(34, 211, 238, 0.28)"
              className="relative p-6 sm:p-8 rounded-[2.25rem] glass border-white/15 shadow-2xl shadow-primary/20"
            >
              {/* Outer 3D Gimbal Rings */}
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                style={{ transform: 'translateZ(-15px)' }}
                className="pointer-events-none absolute -inset-3 rounded-[2.6rem] border border-dashed border-primary/35"
              />
              <motion.div
                animate={{ rotateZ: -360 }}
                transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                style={{ transform: 'translateZ(-25px)' }}
                className="pointer-events-none absolute -inset-6 rounded-[3rem] border border-dashed border-accent/25 hidden sm:block"
              />

              {/* Profile Image Container elevated in 3D Z-space */}
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden ring-2 ring-primary/40 shadow-2xl"
              >
                <img
                  src={profileImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-65" />

                {/* Holographic Scanline Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.05)_50%)] bg-[length:100%_4px]" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-2 rounded-xl bg-surface/85 backdrop-blur-md border border-white/15">
                  <div>
                    <p className="text-xs font-display font-bold text-white">
                      {personalInfo.shortName}
                    </p>
                    <p className="text-[10px] font-mono text-accent">
                      kuraimi.tech • +886 903 425 703
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    3D READY
                  </span>
                </div>
              </div>

              {/* Floating 3D Depth Badge 1: Top-Left */}
              <div
                style={{ transform: 'translateZ(58px)' }}
                className="hidden sm:flex absolute -top-4 -left-6 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-surface/90 backdrop-blur-xl border border-primary/40 shadow-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Briefcase size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400">
                    Current Lead
                  </p>
                  <p className="text-xs font-semibold text-white">
                    Bali Bustle PMS
                  </p>
                </div>
              </div>

              {/* Floating 3D Depth Badge 2: Top-Right */}
              <div
                style={{ transform: 'translateZ(64px)' }}
                className="hidden sm:flex absolute -top-3 -right-6 items-center gap-2 px-3.5 py-2 rounded-2xl bg-surface/90 backdrop-blur-xl border border-emerald-400/40 shadow-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Award size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400">
                    ERP Rating
                  </p>
                  <p className="text-xs font-semibold text-emerald-300">
                    100/100 Score
                  </p>
                </div>
              </div>

              {/* Floating 3D Depth Badge 3: Bottom-Left */}
              <div
                style={{ transform: 'translateZ(52px)' }}
                className="hidden sm:flex absolute -bottom-4 -left-5 items-center gap-2 px-3.5 py-2 rounded-2xl bg-surface/90 backdrop-blur-xl border border-accent/40 shadow-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                  <GraduationCap size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono uppercase text-slate-400">
                    Master&apos;s CS
                  </p>
                  <p className="text-xs font-semibold text-white">
                    NTOU Taiwan
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* 3D KPI Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {personalInfo.stats.map((stat, i) => (
            <TiltCard3D
              key={i}
              intensity={9}
              className="glass rounded-2xl p-4 sm:p-5 text-center sm:text-left"
            >
              <div style={{ transform: 'translateZ(20px)' }}>
                <p className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {stat.label}
                </p>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {stat.detail}
                </p>
              </div>
            </TiltCard3D>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 flex justify-center"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-accent transition-colors cursor-pointer"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase">
            Scroll 3D Space
          </span>
          <ArrowDown size={15} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
