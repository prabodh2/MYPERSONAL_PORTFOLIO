import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Education } from './sections/Education';
import { Languages } from './sections/Languages';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Sophisticated Animated Tech Grid Background */}
      <div className="bg-grid-overlay" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Languages />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
