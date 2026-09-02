import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, Github, Linkedin, Code2, Terminal } from 'lucide-react';
import { ProfileImage } from '../components/ProfileImage';
import { Magnetic } from '../components/Magnetic';
import { slideUp, staggerContainer } from '../utils/animations';

export const Hero = () => {
  return (
    <section id="hero" style={{ minHeight: '82vh', paddingTop: 'calc(var(--nav-height) + 24px)', paddingBottom: '40px', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="container" style={{ width: '100%' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          {/* Hero Content Left */}
          <div>
            <motion.h2
              variants={slideUp}
              style={{
                fontSize: '1.3rem',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                marginBottom: '8px'
              }}
            >
              Hi, I'm <span style={{ color: 'var(--accent-blue-light)', fontWeight: 700 }}>Prabodh Badimi</span>
            </motion.h2>

            {/* Static Full Stack Developer with Interactive Hover Effect */}
            <motion.h1
              variants={slideUp}
              whileHover={{ scale: 1.02, x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="heading-lg text-gradient interactive-hover"
              style={{
                marginBottom: '16px',
                cursor: 'pointer',
                display: 'inline-block',
                transition: 'filter 0.3s ease'
              }}
            >
              Full Stack Developer
            </motion.h1>

            <motion.h3
              variants={slideUp}
              style={{
                fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.35,
                marginBottom: '18px'
              }}
            >
              Building scalable, high-performance and user-centric web experiences.
            </motion.h3>

            <motion.p
              variants={slideUp}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.02rem',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '600px'
              }}
            >
              Fourth-year B.Tech CSE student passionate about building scalable, high-performance web applications and solving real-world problems through technology.
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div variants={slideUp} className="btn-group-responsive" style={{ marginBottom: '36px' }}>
              <Magnetic distance={0.3}>
                <a href="#projects" className="btn-primary">
                  View My Projects <ArrowRight size={18} />
                </a>
              </Magnetic>

              <Magnetic distance={0.3}>
                <a href="/Prabodh_Badimi_Resume.pdf" download="Prabodh_Badimi_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Download size={18} /> Download Resume
                </a>
              </Magnetic>

              <Magnetic distance={0.3}>
                <a href="#contact" className="btn-secondary">
                  <Send size={18} /> Let's Connect
                </a>
              </Magnetic>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={slideUp} style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Social Profiles:</span>
              
              <Magnetic distance={0.4}>
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
              </Magnetic>

              <Magnetic distance={0.4}>
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
              </Magnetic>
            </motion.div>
          </div>

          {/* Hero Profile Visual Right with Floating Accents */}
          <motion.div variants={slideUp} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <ProfileImage />

              {/* Organic Floating Badge 1 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '-25px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  backdropFilter: 'blur(12px)',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-card)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--accent-blue-light)',
                  zIndex: 2
                }}
              >
                <Code2 size={16} /> Full-Stack Architecture
              </motion.div>

              {/* Organic Floating Badge 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  right: '-25px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  backdropFilter: 'blur(12px)',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-card)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--accent-cyan)',
                  zIndex: 2
                }}
              >
                <Terminal size={16} /> MERN & Node.js
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
