import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Bus } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { slideUp, staggerContainer, organicCardVariant } from '../utils/animations';
import { fetchExperience } from '../services/api';

const TimelineDot = ({ progress, index, totalItems }) => {
  // Calculate threshold for when the bus physically reaches/crosses this node
  const threshold = index === 0 ? 0 : (index / totalItems) * 0.92;

  const background = useTransform(
    progress,
    [Math.max(0, threshold - 0.12), threshold + 0.03],
    ['var(--bg-primary)', 'var(--accent-blue)']
  );

  const boxShadow = useTransform(
    progress,
    [Math.max(0, threshold - 0.12), threshold + 0.03],
    ['0 0 10px var(--accent-glow)', '0 0 18px var(--accent-glow-strong)']
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '24px',
        top: '28px',
        transform: 'translate(-50%, -50%)',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: background,
        border: '3px solid var(--accent-blue-light)',
        boxShadow: boxShadow,
        zIndex: 3
      }}
    />
  );
};

export const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const timelineRef = useRef(null);

  // Scroll progress for experience timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 85%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001
  });

  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="heading-md text-gradient">Professional Experience</h2>
          </motion.div>

          {/* Interactive Timeline Container */}
          <div ref={timelineRef} style={{ position: 'relative', maxWidth: '850px', margin: '0 auto' }}>
            {/* Background Guide Line */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                bottom: '24px',
                left: '24px',
                width: '4px',
                background: 'rgba(59, 130, 246, 0.15)',
                borderRadius: '4px',
                transform: 'translateX(-50%)'
              }}
            />

            {/* Animated Fill Progress Line */}
            <motion.div
              style={{
                position: 'absolute',
                top: '24px',
                bottom: '24px',
                height: fillHeight,
                left: '24px',
                width: '4px',
                background: 'linear-gradient(to bottom, var(--accent-blue) 0%, var(--accent-cyan) 100%)',
                borderRadius: '4px',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 12px var(--accent-glow)'
              }}
            />

            {/* Scroll-Driven Moving Bus / Career Marker */}
            <motion.div
              style={{
                position: 'absolute',
                left: '24px',
                top: fillHeight,
                transform: 'translate(-50%, -50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)',
                border: '3px solid var(--bg-primary)',
                boxShadow: '0 0 25px var(--accent-glow-strong), 0 4px 15px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                zIndex: 10,
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.2, rotate: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Bus size={20} />
            </motion.div>

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp._id || index}
                  variants={organicCardVariant(index)}
                  style={{
                    position: 'relative',
                    paddingLeft: '68px'
                  }}
                >
                  {/* Dynamic Timeline Dot Node - turns solid blue as bus crosses it */}
                  <TimelineDot
                    progress={smoothProgress}
                    index={index}
                    totalItems={experiences.length}
                  />

                  <TiltCard maxTilt={5} className="glass-panel exp-glass-card">
                    <div className="exp-header">
                      <div>
                        <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.4rem)', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px' }}>
                          {exp.role}
                        </h3>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-blue-light)', fontWeight: 600 }}>
                          {exp.company}
                        </h4>
                      </div>
                      <div className="exp-meta">
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            background: 'rgba(59, 130, 246, 0.12)',
                            color: 'var(--accent-blue-light)',
                            fontSize: '0.85rem',
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
                      <h5 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                        Key Contributions & Impact:
                      </h5>
                      <div className="exp-responsibilities">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <div key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <CheckCircle2 size={16} color="var(--accent-blue-light)" style={{ marginTop: '4px', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              {resp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px', borderTop: '1px dashed var(--border-color)' }}>
                      {exp.tags.map((tag, tIdx) => (
                        <motion.span
                          key={tIdx}
                          whileHover={{ scale: 1.08, y: -2 }}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            background: 'rgba(59, 130, 246, 0.08)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--accent-blue-light)',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            transition: 'var(--transition-smooth)'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .exp-glass-card {
          padding: 36px;
        }
        .exp-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }
        .exp-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }
        .exp-responsibilities {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 10px;
        }
        @media (max-width: 640px) {
          .exp-glass-card {
            padding: 20px 16px;
          }
          .exp-meta {
            align-items: flex-start;
          }
          .exp-responsibilities {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
