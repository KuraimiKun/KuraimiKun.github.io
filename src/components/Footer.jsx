import { personalInfo } from '../data';

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6 border-t border-white/10 bg-surface/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-slate-400 text-xs sm:text-sm">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="gradient-text font-display font-bold">
            {personalInfo.name}
          </span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-xs text-slate-500">
            Taiwan | Bali Bustle | NTOU
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
          <a
            href="https://socotracenter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            socotracenter.com
          </a>
          <a
            href="https://tamkeen-hub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            tamkeen-hub.com
          </a>
          <a
            href={personalInfo.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors"
          >
            CV.pdf
          </a>
        </div>
      </div>
    </footer>
  );
}
