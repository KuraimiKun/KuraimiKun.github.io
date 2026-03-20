import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionHeader({ title, subtitle }) {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="text-primary text-sm font-mono font-medium tracking-wider uppercase mb-3"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-display font-bold text-white"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  );
}
