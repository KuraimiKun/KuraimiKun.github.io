import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail, Phone, MapPin, ExternalLink,
  Github, Linkedin, Instagram, Send,
  MessageCircle, Facebook
} from 'lucide-react';
import { FaDiscord, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data';
import SectionHeader from './SectionHeader';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: personalInfo.social.github, color: 'hover:bg-[#333]' },
  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.social.linkedin, color: 'hover:bg-[#0077b5]' },
  { icon: Instagram, label: 'Instagram', href: personalInfo.social.instagram, color: 'hover:bg-[#e4405f]' },
  { icon: FaTelegram, label: 'Telegram', href: personalInfo.social.telegram, color: 'hover:bg-[#0088cc]' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: personalInfo.social.whatsapp, color: 'hover:bg-[#25d366]' },
  { icon: Facebook, label: 'Facebook', href: personalInfo.social.facebook, color: 'hover:bg-[#1877f2]' },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 mesh-gradient opacity-60" />

      <div className="relative max-w-5xl mx-auto">
        <SectionHeader title="Get in Touch" subtitle="Let's connect" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-400 leading-relaxed">
              I'm always open to new opportunities, collaborations, and interesting conversations.
              Feel free to reach out through any of the channels below.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: 'Location', value: personalInfo.location },
                { icon: ExternalLink, label: 'Website', value: personalInfo.website, href: `https://${personalInfo.website}` },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-slate-200 hover:text-primary transition-colors font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-200 font-medium">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Discord */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="glass p-4 flex items-center gap-3"
            >
              <FaDiscord size={20} className="text-[#5865F2]" />
              <div>
                <p className="text-xs text-slate-500">Discord</p>
                <p className="text-slate-200 font-mono text-sm">{personalInfo.social.discord}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Social grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-lg font-display font-semibold text-white mb-6">
              Connect with me
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {socialLinks.map(({ icon: Icon, label, href, color }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`glass-hover p-4 flex flex-col items-center gap-3 group ${color} hover:border-transparent transition-all duration-300`}
                >
                  <Icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-xs text-slate-500 group-hover:text-white/80 font-medium transition-colors">
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1 w-full"
            >
              <Send size={18} />
              Send me an Email
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
