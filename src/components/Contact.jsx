import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Send,
  Facebook,
  Copy,
  Check,
  FileText,
} from 'lucide-react';
import { FaDiscord, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data';
import SectionHeader from './SectionHeader';
import TiltCard3D from './TiltCard3D';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin },
  { icon: FaWhatsapp, label: 'WhatsApp', href: personalInfo.social.whatsapp },
  { icon: FaTelegram, label: 'Telegram', href: personalInfo.social.telegram },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram },
  { icon: Facebook, label: 'Facebook', href: personalInfo.social.facebook },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        <SectionHeader
          title="Get in Touch"
          subtitle="Available for IT Project Management & Engineering"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Direct Contact Details in 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <TiltCard3D intensity={8} className="glass rounded-3xl p-7 sm:p-8 h-full">
              <div style={{ transform: 'translateZ(20px)' }} className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Let&apos;s Build Something Exceptional
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Based in Taiwan and leading remote software &amp; PMS/ERP engineering globally. Reach out directly for project management, backend architecture, or full-stack consulting.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {[
                    {
                      icon: Mail,
                      label: 'Email',
                      value: personalInfo.email,
                      href: `mailto:${personalInfo.email}`,
                      copyable: true,
                    },
                    {
                      icon: Phone,
                      label: 'Phone (Taiwan)',
                      value: personalInfo.phone,
                      href: `tel:${personalInfo.phone}`,
                    },
                    {
                      icon: MapPin,
                      label: 'Location',
                      value: `${personalInfo.location} (NTOU • Remote Worldwide)`,
                    },
                    {
                      icon: ExternalLink,
                      label: 'Portfolio & Selected Work',
                      value: `${personalInfo.website} • socotracenter.com`,
                      href: `https://${personalInfo.website}`,
                    },
                  ].map(({ icon: Icon, label, value, href, copyable }, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-accent" />
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

                      {copyable && (
                        <button
                          onClick={copyEmail}
                          title="Copy email"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <Check size={15} className="text-emerald-400" />
                          ) : (
                            <Copy size={15} />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Discord Row */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaDiscord size={20} className="text-[#5865F2]" />
                    <div>
                      <p className="text-[11px] text-slate-500 font-mono uppercase">
                        Discord Handle
                      </p>
                      <p className="text-slate-200 font-mono text-sm">
                        {personalInfo.social.discord}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    Active
                  </span>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Right: 3D Social Grid + Direct Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between gap-6"
          >
            <div>
              <h3 className="text-lg font-display font-bold text-white mb-4">
                Connect Across Platforms
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {socialLinks.map(({ icon: Icon, label, href }, i) => (
                  <TiltCard3D
                    key={i}
                    intensity={14}
                    className="glass rounded-2xl p-4 group"
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ transform: 'translateZ(24px)' }}
                      className="flex flex-col items-center gap-2.5 text-center"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/5 group-hover:bg-primary/20 border border-white/10 group-hover:border-accent/40 flex items-center justify-center transition-all duration-300">
                        <Icon
                          size={22}
                          className="text-slate-300 group-hover:text-accent transition-colors"
                        />
                      </div>
                      <span className="text-xs text-slate-300 group-hover:text-white font-medium transition-colors">
                        {label}
                      </span>
                    </a>
                  </TiltCard3D>
                ))}
              </div>
            </div>

            {/* Primary Email & Resume Action Buttons */}
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-indigo-500 to-accent text-slate-950 font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 w-full"
              >
                <Send size={18} />
                Send an Email ({personalInfo.email})
              </a>

              <a
                href={personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl glass border-white/15 text-white font-medium hover:bg-white/10 transition-all duration-300 w-full"
              >
                <FileText size={18} className="text-accent" />
                Download Official CV (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
