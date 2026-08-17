import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '50px 0 30px',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          {/* Left Brand info */}
          <div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '4px' }}>
              Prabodh Badimi
            </h3>
            <p style={{ color: 'var(--accent-blue-light)', fontSize: '0.95rem', fontWeight: 600 }}>
              Full Stack Developer
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
              href="https://github.com/prabodh2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/prabodh-badimi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=prabodhbadimi1@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send Email"
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.92rem', transition: 'var(--transition-smooth)' }}
            >
              <Mail size={18} /> Email
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-blue-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            <ArrowUp size={20} />
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          © 2026 Prabodh Badimi · Built with React, Node.js &amp; MongoDB.
        </div>
      </div>
    </footer>
  );
};
