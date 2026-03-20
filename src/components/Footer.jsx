import { Heart } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  return (
    <footer className="relative py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="gradient-text font-semibold">{personalInfo.name}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-600 text-xs">
          Built with <Heart size={12} className="text-red-500 fill-red-500" /> using React
        </div>
      </div>
    </footer>
  );
}
