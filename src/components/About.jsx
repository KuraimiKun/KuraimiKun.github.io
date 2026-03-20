import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code, Brain, Eye, MessageSquare, Globe,
  BarChart2, GitBranch, Image, Calendar,
  MapPin, Phone, Mail
} from 'lucide-react';
import { personalInfo, interests } from '../data';
import SectionHeader from './SectionHeader';

const iconMap = {
  code: Code,
  brain: Brain,
  eye: Eye,
  'message-square': MessageSquare,
  globe: Globe,
  'bar-chart-2': BarChart2,
  'git-branch': GitBranch,
  image: Image,
};

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const infoItems = [
    { icon: Calendar, label: 'Birthday', value: personalInfo.birthday },
    { icon: MapPin, label: 'Location', value: personalInfo.location },
    { icon: Phone, label: 'Phone', value: personalInfo.phone },
    { icon: Mail, label: 'Email', value: personalInfo.email },
  ];

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader title="About Me" subtitle="Get to know me better" />

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-hover p-8 card-shine"
          >
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              Who I Am
            </h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              {personalInfo.bio}
            </p>
            <p className="text-slate-400 leading-relaxed">
              {personalInfo.fullBio}
            </p>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-hover p-8 card-shine"
          >
            <h3 className="text-xl font-display font-semibold text-white mb-6">
              Quick Info
            </h3>
            <div className="space-y-4">
              {infoItems.map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-slate-200 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-display font-semibold text-white mb-6 text-center">
            Areas of Interest
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {interests.map((interest, i) => {
              const Icon = iconMap[interest.icon] || Code;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="glass-hover p-4 flex flex-col items-center gap-3 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{interest.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
