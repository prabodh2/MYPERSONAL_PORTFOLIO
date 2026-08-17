import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Github, ExternalLink, ShieldCheck, Car, CheckCircle, UtensilsCrossed } from 'lucide-react';
import { slideUp, staggerContainer } from '../utils/animations';
import { fetchProjects } from '../services/api';

export const Projects = () => {
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    fetchProjects().then(data => setProjectsList(data));
  }, []);

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="heading-md text-gradient">Projects</h2>
          </motion.div>

          {/* Projects List Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {projectsList.map((project, index) => {
              const isFintech = project.visualTheme === 'fintech';
              const isFood = project.visualTheme === 'food';
              const isAuto = project.visualTheme === 'automotive';

              const cardAccentColor = isFintech
                ? 'var(--accent-blue)'
                : isFood
                ? '#f59e0b'
                : 'var(--accent-cyan)';

              return (
                <motion.div
                  key={project._id || index}
                  variants={slideUp}
                  whileHover={{ y: -4 }}
                  className="glass-panel"
                  style={{
                    padding: '36px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderLeft: `5px solid ${cardAccentColor}`
                  }}
                >
                  {/* Subtle Background Visual Watermark Icon */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-20px',
                      bottom: '-20px',
                      opacity: 0.05,
                      color: cardAccentColor,
                      pointerEvents: 'none'
                    }}
                  >
                    {isFintech ? <ShieldCheck size={260} /> : isFood ? <UtensilsCrossed size={260} /> : <Car size={260} />}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', position: 'relative', zIndex: 1 }}>
                    {/* Left Details */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                          {project.title}
                        </h3>

                        {project.isClone && (
                          <span
                            style={{
                              padding: '4px 12px',
                              borderRadius: '20px',
                              background: 'rgba(234, 179, 8, 0.15)',
                              border: '1px solid rgba(234, 179, 8, 0.3)',
                              color: '#eab308',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            Practice / Clone Project
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                        {project.description}
                      </p>

                      {/* Contributions */}
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                          Key Contributions:
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                          {project.contributions.map((contrib, cIdx) => (
                            <li key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                              <CheckCircle size={15} color="var(--accent-blue-light)" style={{ marginTop: '3px', flexShrink: 0 }} /> {contrib}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              background: 'rgba(59, 130, 246, 0.1)',
                              border: '1px solid var(--border-color)',
                              color: 'var(--accent-blue-light)',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', gap: '16px' }}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ padding: '10px 20px', fontSize: '0.92rem' }}
                          >
                            <Github size={18} /> View Code on GitHub
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ padding: '10px 20px', fontSize: '0.92rem' }}
                          >
                            <ExternalLink size={18} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Card Graphic Highlight */}
                    <div
                      style={{
                        borderRadius: '16px',
                        background: isFintech
                          ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, var(--bg-card-subtle) 100%)'
                          : isFood
                          ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, var(--bg-card-subtle) 100%)'
                          : 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, var(--bg-card-subtle) 100%)',
                        border: '1px solid var(--border-color)',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        minHeight: '220px'
                      }}
                    >
                      {isFintech ? (
                        <>
                          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue-light)', marginBottom: '16px' }}>
                            <ShieldCheck size={32} />
                          </div>
                          <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '6px' }}>
                            Fintech Payment Engine
                          </h4>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                            High-security money transfer & transaction tracking architecture with modern UX.
                          </p>
                        </>
                      ) : isFood ? (
                        <>
                          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', marginBottom: '16px' }}>
                            <UtensilsCrossed size={32} />
                          </div>
                          <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '6px' }}>
                            Full-Stack Ordering System
                          </h4>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                            Flutter & Node.js architecture with role-based controls for users, owners & admins.
                          </p>
                        </>
                      ) : (
                        <>
                          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)', marginBottom: '16px' }}>
                            <Car size={32} />
                          </div>
                          <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '6px' }}>
                            Automotive E-Commerce Platform
                          </h4>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                            Interactive car valuation engine & multi-device marketplace interface.
                          </p>
                        </>
                      )}
                    </div>
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
