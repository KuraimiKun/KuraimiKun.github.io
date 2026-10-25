import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard3D({
  children,
  className = '',
  intensity = 12,
  glareColor = 'rgba(99, 102, 241, 0.22)',
  scaleOnHover = 1.02,
  disabled = false,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig);

  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e) => {
    if (disabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      style={{ perspective: '1200px' }}
      className="relative h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered && !disabled ? scaleOnHover : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`relative h-full will-change-transform ${className}`}
      >
        {/* Dynamic 3D Specular Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(450px circle at ${gx}% ${gy}%, ${glareColor}, transparent 70%)`
            ),
          }}
        />

        {/* Subtle 3D Rim Highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 group-hover:border-white/25 transition-colors duration-300 z-20"
          style={{ transform: 'translateZ(1px)' }}
        />

        {/* Card Content with 3D preservation */}
        <div
          className="relative z-10 h-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
