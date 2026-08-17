import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, BarChart3, Cloud, Wrench, Users, Sparkles, Check } from 'lucide-react';
import { slideUp, staggerContainer } from '../utils/animations';
import { fetchSkills } from '../services/api';

const categoryIconMap = {
  'Technical Skills': Code2,
  'AI': Brain,
  'Data Science': BarChart3,
  'Cloud Computing': Cloud,
  'Tools': Wrench,
  'Soft Skills': Users
};

export const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);

  useEffect(() => {
    fetchSkills().then(data => setSkillCategories(data));
  }, []);

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="heading-md text-gradient">Technical & Professional Competencies</h2>
          </motion.div>

          {/* Skill Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {skillCategories.map((cat, idx) => {
              const IconComponent = categoryIconMap[cat.category] || Code2;

              return (
                <motion.div
                  key={cat._id || idx}
                  variants={slideUp}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="glass-panel"
                  style={{ padding: '30px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-blue-light)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                      {cat.category}
                    </h3>
                  </div>

                  {/* Skills Pill Items */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {cat.items.map((item, iIdx) => (
                      <motion.div
                        key={iIdx}
                        whileHover={{ scale: 1.05 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          borderRadius: '10px',
                          background: 'var(--bg-pill)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          fontSize: '0.92rem',
                          fontWeight: 500,
                          cursor: 'default',
                          transition: 'var(--transition-smooth)'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'var(--accent-blue)';
                          e.currentTarget.style.boxShadow = '0 0 15px var(--accent-glow)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <Check size={14} color="var(--accent-blue-light)" />
                        <span>{item.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
