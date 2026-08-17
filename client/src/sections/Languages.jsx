import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { slideUp, staggerContainer } from '../utils/animations';

const languages = [
  { name: 'English', code: 'EN' },
  { name: 'Hindi', code: 'HI' },
  { name: 'Telugu', code: 'TE' },
  { name: 'Kannada', code: 'KN' }
];

export const Languages = () => {
  return (
    <section id="languages" style={{ padding: '30px 0', position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 className="heading-md text-gradient" style={{ fontSize: '1.8rem' }}>Languages Spoken</h2>
          </motion.div>

          {/* Languages Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {languages.map((lang, idx) => (
              <motion.div
                key={lang.name}
                variants={slideUp}
                whileHover={{ scale: 1.04 }}
                className="glass-panel"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(59, 130, 246, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue-light)',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}
                >
                  {lang.code}
                </div>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {lang.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
