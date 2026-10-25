import { useEffect, useRef, useState } from 'react';

const SPHERE_SKILLS = [
  { label: 'C# / .NET', group: 'backend' },
  { label: 'PHP / Laravel', group: 'backend' },
  { label: 'Python', group: 'backend' },
  { label: 'FastAPI', group: 'backend' },
  { label: 'Django & Flask', group: 'backend' },
  { label: 'Node.js', group: 'backend' },
  { label: 'REST & GraphQL', group: 'backend' },
  { label: 'Microservices', group: 'backend' },
  { label: 'React', group: 'frontend' },
  { label: 'Vue.js', group: 'frontend' },
  { label: 'JavaScript', group: 'frontend' },
  { label: 'Flutter & Dart', group: 'frontend' },
  { label: 'HTML5 / SCSS', group: 'frontend' },
  { label: 'SQL Server', group: 'data' },
  { label: 'Oracle 12c', group: 'data' },
  { label: 'MySQL', group: 'data' },
  { label: 'Onyx Pro ERP', group: 'erp' },
  { label: 'M+ ERP', group: 'erp' },
  { label: 'PMS Architecture', group: 'erp' },
  { label: 'IT Project Mgmt', group: 'pm' },
  { label: 'Linux & Git', group: 'data' },
  { label: 'Agile Delivery', group: 'pm' },
];

const GROUP_COLORS = {
  backend: 'border-indigo-400/50 text-indigo-200 bg-indigo-500/15 shadow-indigo-500/20',
  frontend: 'border-cyan-400/50 text-cyan-200 bg-cyan-500/15 shadow-cyan-500/20',
  data: 'border-emerald-400/50 text-emerald-200 bg-emerald-500/15 shadow-emerald-500/20',
  erp: 'border-amber-400/50 text-amber-200 bg-amber-500/15 shadow-amber-500/20',
  pm: 'border-purple-400/50 text-purple-200 bg-purple-500/15 shadow-purple-500/20',
};

export default function SkillSphere3D({ activeCategory }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const velocityRef = useRef({ vx: 0.0045, vy: 0.0065 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    const count = SPHERE_SKILLS.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    // Initialize 3D unit sphere coordinates using Fibonacci lattice
    const points = SPHERE_SKILLS.map((_, i) => {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });

    let animationId;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      if (Math.abs(dx) <= 1.2 && Math.abs(dy) <= 1.2) {
        velocityRef.current.vy = dx * 0.016;
        velocityRef.current.vx = -dy * 0.016;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (document.hidden || !containerRef.current) return;

      const radius = Math.min(containerRef.current.clientWidth, 380) * 0.39;
      const { vx, vy } = velocityRef.current;
      const cosX = Math.cos(vx);
      const sinX = Math.sin(vx);
      const cosY = Math.cos(vy);
      const sinY = Math.sin(vy);

      points.forEach((p, idx) => {
        // Rotate around X
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        // Rotate around Y
        const x2 = p.x * cosY + z1 * sinY;
        const z2 = -p.x * sinY + z1 * cosY;

        p.x = x2;
        p.y = y1;
        p.z = z2;

        const el = itemRefs.current[idx];
        if (el) {
          const depth = (p.z + 1.4) / 2.4; // 0.16 to 1.0
          const scale = 0.65 + depth * 0.48;
          const opacity = Math.max(0.22, Math.min(1, depth * 1.05));
          const tx = p.x * radius;
          const ty = p.y * radius;

          el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${(
            p.z * 80
          ).toFixed(1)}px) scale(${scale.toFixed(3)})`;
          el.style.opacity = opacity.toFixed(2);
          el.style.zIndex = Math.round(depth * 100);
        }
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ perspective: '900px' }}
      className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Decorative 3D Core Rings inside the sphere */}
      <div className="pointer-events-none absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-dashed border-primary/25 animate-[spin_28s_linear_infinite]" />
      <div className="pointer-events-none absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-accent/15 animate-[spin_38s_linear_infinite_reverse]" />
      <div className="pointer-events-none absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

      {/* 3D Orbiting Skill Nodes */}
      <div
        className="relative w-0 h-0 flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {SPHERE_SKILLS.map((item, i) => {
          const colorCls = GROUP_COLORS[item.group] || GROUP_COLORS.backend;
          const isDimmed =
            activeCategory &&
            activeCategory !== 'all' &&
            activeCategory !== item.group;

          return (
            <div
              key={item.label}
              ref={(el) => (itemRefs.current[i] = el)}
              onMouseEnter={() => setHoveredSkill(item.label)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl border backdrop-blur-md text-xs font-mono font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 shadow-lg ${colorCls} ${
                isDimmed ? '!opacity-15' : ''
              } ${
                hoveredSkill === item.label
                  ? 'ring-2 ring-white/60 bg-white/20 text-white'
                  : ''
              }`}
            >
              {item.label}
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface/80 border border-white/10 text-[11px] font-mono text-slate-400">
        Move cursor to steer 3D Tech Constellation
      </div>
    </div>
  );
}
