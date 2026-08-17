import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { slideUp, staggerContainer } from '../utils/animations';
import { fetchEducation } from '../services/api';

export const Education = () => {
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    fetchEducation().then(data => setEducationList(data));
  }, []);

  return (
    <section id="education" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="heading-md text-gradient">Academic Journey</h2>
          </motion.div>

          {/* Timeline Container */}
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Animated Connecting Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '24px',
                width: '3px',
                background: 'linear-gradient(to bottom, var(--accent-blue) 0%, var(--accent-cyan) 100%)',
                borderRadius: '3px'
              }}
            />

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {educationList.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  variants={slideUp}
                  style={{
                    position: 'relative',
                    paddingLeft: '64px'
                  }}
                >
                  {/* Timeline Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '24px',
                      transform: 'translateX(-50%)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: item.isPrimary ? 'var(--accent-blue)' : 'var(--bg-primary)',
                      border: '3px solid var(--accent-blue-light)',
                      boxShadow: '0 0 12px var(--accent-glow-strong)',
                      zIndex: 2
                    }}
                  />

                  {/* Education Card */}
                  <div
                    className="glass-panel"
                    style={{
                      padding: '28px',
                      borderLeft: item.isPrimary ? '4px solid var(--accent-blue)' : '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {item.degree}
                      </h3>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: 'rgba(59, 130, 246, 0.12)',
                          color: 'var(--accent-blue-light)',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}
                      >
                        <Calendar size={14} /> {item.period}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-blue-light)', fontWeight: 600, marginBottom: '8px' }}>
                      {item.institution}
                    </h4>

                    {item.location && (
                      <p style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <MapPin size={14} /> {item.location}
                      </p>
                    )}

                    {item.isPrimary && (
                      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                        <Award size={16} color="var(--accent-cyan)" /> Major in Computer Science and Technology with full-stack concentration.
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
