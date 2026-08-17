import React from 'react';
import { motion } from 'framer-motion';
import { User, Code, Laptop, Heart, Music, Activity, GraduationCap } from 'lucide-react';
import { slideUp, staggerContainer } from '../utils/animations';

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
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="heading-md text-gradient">Driven by Curiosity & Code</h2>
          </motion.div>

          {/* Interactive About Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Card 1: Academic Background */}
            <motion.div variants={slideUp} className="glass-panel" style={{ padding: '32px' }}>
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
                  marginBottom: '20px'
                }}
              >
                <GraduationCap size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Computer Science Student
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                Fourth-year B.Tech Computer Science student at <strong>ITM Skills University</strong> (Kharghar, Maharashtra). Dedicated to developing computer science fundamentals into high-impact software solutions.
              </p>
            </motion.div>

            {/* Card 2: Development Focus */}
            <motion.div variants={slideUp} className="glass-panel" style={{ padding: '32px' }}>
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
                  marginBottom: '20px'
                }}
              >
                <Code size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Full Stack & Web Craft
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6 }}>
                Experienced in building scalable web applications with React.js, Express.js, and MongoDB. Passionate about responsive UI development, performance optimization, and clean, maintainable code architectures.
              </p>
            </motion.div>

            {/* Card 3: Personal Interests */}
            <motion.div variants={slideUp} className="glass-panel" style={{ padding: '32px' }}>
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
                  marginBottom: '20px'
                }}
              >
                <Heart size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Beyond Code
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '16px' }}>
                Outside of technology, I enjoy playing badminton and listening to music. Balancing active sports and music keeps me energetic, focused, and creative when tackling complex technical challenges.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-blue-light)', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                  <Activity size={14} /> Badminton
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                  <Music size={14} /> Music
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
