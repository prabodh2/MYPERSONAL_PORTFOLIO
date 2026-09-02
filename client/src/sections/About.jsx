import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Laptop, Heart, Music, Activity, GraduationCap } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { slideUp, staggerContainer, organicCardVariant } from '../utils/animations';

export const About = () => {
  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="heading-md text-gradient">Driven by Curiosity & Code</h2>
          </motion.div>

          {/* Interactive About Cards Grid with 3D Tilt */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Card 1: Academic Background */}
            <motion.div variants={organicCardVariant(0)}>
              <TiltCard className="glass-panel about-card" maxTilt={8}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue-light)',
                    marginBottom: '20px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <GraduationCap size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 700 }}>
                  Computer Science Student
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.65 }}>
                  Fourth-year B.Tech Computer Science student at <strong>ITM Skills University</strong> (Kharghar, Maharashtra). Dedicated to developing computer science fundamentals into high-impact software solutions.
                </p>
              </TiltCard>
            </motion.div>

            {/* Card 2: Development Focus */}
            <motion.div variants={organicCardVariant(1)}>
              <TiltCard className="glass-panel about-card" maxTilt={8}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    marginBottom: '20px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <Code size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 700 }}>
                  Full Stack & Web Craft
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.65 }}>
                  Experienced in building scalable web applications with React.js, Express.js, and MongoDB. Passionate about responsive UI development, performance optimization, and clean, maintainable code architectures.
                </p>
              </TiltCard>
            </motion.div>

            {/* Card 3: Personal Interests */}
            <motion.div variants={organicCardVariant(2)}>
              <TiltCard className="glass-panel about-card" maxTilt={8}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(168, 85, 247, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a855f7',
                    marginBottom: '20px',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <Heart size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 700 }}>
                  Beyond Code
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '16px' }}>
                  Outside of technology, I enjoy playing badminton and listening to music. Balancing active sports and music keeps me energetic, focused, and creative when tackling complex technical challenges.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <motion.span
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-blue-light)', background: 'rgba(59, 130, 246, 0.1)', padding: '5px 14px', borderRadius: '20px', border: '1px solid var(--border-color)' }}
                  >
                    <Activity size={14} /> Badminton
                  </motion.span>
                  <motion.span
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '5px 14px', borderRadius: '20px', border: '1px solid var(--border-color)' }}
                  >
                    <Music size={14} /> Music
                  </motion.span>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .about-card {
          padding: 32px;
          height: 100%;
        }
        @media (max-width: 640px) {
          .about-card {
            padding: 20px 16px;
          }
        }
      `}</style>
    </section>
  );
};
