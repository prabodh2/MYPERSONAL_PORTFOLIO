import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, Bus } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { slideUp, staggerContainer, organicCardVariant } from '../utils/animations';
import { fetchEducation } from '../services/api';

const TimelineDot = ({ progress, index, totalItems }) => {
  // Calculate exact threshold for when the bus touches/crosses this node
  const maxIndex = totalItems > 1 ? totalItems - 1 : 1;
  const threshold = index === 0 ? 0 : (index / maxIndex) * 0.85;

  // Circle stays white UNTIL progress reaches/crosses threshold
  const background = useTransform(
    progress,
    [Math.max(0, threshold - 0.01), Math.min(1, threshold + 0.05)],
    ['var(--bg-primary)', 'var(--accent-blue)']
  );

  const boxShadow = useTransform(
    progress,
    [Math.max(0, threshold - 0.01), Math.min(1, threshold + 0.05)],
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

export const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const timelineRef = useRef(null);

  // Scroll Progress tracking for the timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 85%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001
  });

  // Calculate animated fill height and bus movement offset
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="heading-md text-gradient">Academic Journey</h2>
          </motion.div>

          {/* Timeline Container */}
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

            {/* Scroll-Driven Moving Bus Badge */}
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
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Bus size={20} />
            </motion.div>

            {/* Timeline Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {educationList.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  variants={organicCardVariant(index)}
                  style={{
                    position: 'relative',
                    paddingLeft: '68px'
                  }}
                >
                  {/* Dynamic Timeline Dot Node - turns dark blue ONLY when bus crosses it */}
                  <TimelineDot
                    progress={smoothProgress}
                    index={index}
                    totalItems={educationList.length}
                  />

                  {/* Education Card wrapped with 3D Tilt */}
                  <TiltCard
                    maxTilt={6}
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
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
