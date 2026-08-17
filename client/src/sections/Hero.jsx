import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, Github, Linkedin, Sparkles } from 'lucide-react';
import { ProfileImage } from '../components/ProfileImage';
import { slideUp, staggerContainer } from '../utils/animations';

export const Hero = () => {
  return (
    <section id="hero" style={{ minHeight: '80vh', paddingTop: 'calc(var(--nav-height) + 20px)', paddingBottom: '30px', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="container" style={{ width: '100%' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Hero Content Left */}
          <div>

            <motion.h2
              variants={slideUp}
              style={{
                fontSize: '1.25rem',
                color: 'var(--accent-blue-light)',
                fontWeight: 600,
                marginBottom: '8px'
              }}
            >
              Hi, I'm Prabodh Badimi
            </motion.h2>

            <motion.h1 variants={slideUp} className="heading-lg text-gradient" style={{ marginBottom: '16px' }}>
              Full Stack Developer
            </motion.h1>

            <motion.h3
              variants={slideUp}
              style={{
                fontSize: '1.35rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.3,
                marginBottom: '16px'
              }}
            >
              Building scalable, high-performance and user-centric web experiences.
            </motion.h3>

            <motion.p
              variants={slideUp}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '600px'
              }}
            >
              Fourth-year B.Tech CSE student passionate about building scalable, high-performance web applications and solving real-world problems through technology.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={slideUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
              <a href="#projects" className="btn-primary">
                View My Projects <ArrowRight size={18} />
              </a>
              <a href="/Prabodh_Badimi_Resume.pdf" download="Prabodh_Badimi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Download size={18} /> Download Resume
              </a>
              <a href="#contact" className="btn-secondary">
                <Send size={18} /> Let's Connect
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={slideUp} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Social Profiles:</span>
              <a
                href="https://github.com/prabodh2"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  transition: 'var(--transition-smooth)'
                }}
              >
                <Github size={20} color="var(--accent-blue-light)" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/prabodh-badimi/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  transition: 'var(--transition-smooth)'
                }}
              >
                <Linkedin size={20} color="var(--accent-blue-light)" /> LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Hero Profile Visual Right */}
          <motion.div variants={slideUp} style={{ display: 'flex', justifyContent: 'center' }}>
            <ProfileImage />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
