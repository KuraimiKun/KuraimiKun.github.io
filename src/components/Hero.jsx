import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data';
import profileImg from '../assets/img/profile.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [10, -15, 10] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 right-1/3 w-48 h-48 bg-purple-500/15 rounded-full blur-[80px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-4">
            Hi, I'm{' '}
            <span className="gradient-text">Ahmed</span>
          </h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-slate-300 font-light mb-6 h-10">
            <TypeAnimation
              sequence={personalInfo.roles.flatMap(role => [`a ${role}`, 2000])}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-accent"
            />
          </div>

          <p className="text-slate-400 text-base lg:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail size={18} />
              Get in Touch
            </a>
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              View Resume
            </a>
          </div>

          <div className="flex gap-3 mt-8 justify-center lg:justify-start">
            {[
              { icon: Github, href: personalInfo.social.github },
              { icon: Linkedin, href: personalInfo.social.linkedin },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex-shrink-0"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed border-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-dashed border-accent/20"
            />
            <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-4 ring-offset-surface relative">
              <img
                src={profileImg}
                alt="Ahmed Kuraimi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
