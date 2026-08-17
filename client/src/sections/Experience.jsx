import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { slideUp, staggerContainer } from '../utils/animations';
import { fetchExperience } from '../services/api';

export const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchExperience().then(data => setExperiences(data));
  }, []);

  return (
    <section id="experience" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="heading-md text-gradient">Professional Experience</h2>
          </motion.div>

          {/* Interactive Timeline Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            {experiences.map((exp, index) => (
              <motion.div key={exp._id || index} variants={slideUp} className="glass-panel" style={{ padding: '36px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px' }}>
                      {exp.role}
                    </h3>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-blue-light)', fontWeight: 600 }}>
                      {exp.company}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        color: 'var(--accent-blue-light)',
                        fontSize: '0.88rem',
                        fontWeight: 600
                      }}
                    >
                      <Calendar size={14} /> {exp.period}
                    </span>
                    {exp.location && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div style={{ marginTop: '20px', marginBottom: '24px' }}>
                  <h5 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    Key Contributions & Impact:
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle2 size={16} color="var(--accent-blue-light)" style={{ marginTop: '4px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px', borderTop: '1px dashed var(--border-color)' }}>
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '8px',
                        background: 'rgba(59, 130, 246, 0.08)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--accent-blue-light)',
                        fontSize: '0.82rem',
                        fontWeight: 500
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
