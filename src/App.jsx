import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Scene3DBackground from './components/Scene3DBackground';

export default function App() {
  return (
    <div className="relative min-h-screen bg-surface selection:bg-primary/30 selection:text-white">
      {/* Interactive Three.js 3D WebGL Background & Scroll-Reactive Core */}
      <Scene3DBackground />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
