import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Github } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section scrollspy
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          zIndex: 1000,
          backgroundColor: scrolled || mobileMenuOpen ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--border-color)' : '1px solid transparent',
          transition: 'var(--transition-smooth)'
        }}
      >
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-blue-dark) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                boxShadow: '0 0 15px var(--accent-glow)'
              }}
            >
              PB
            </div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em'
              }}
            >
              Prabodh <span style={{ color: 'var(--accent-blue-light)' }}>Badimi</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map(item => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <li key={item.name} style={{ position: 'relative' }}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      style={{
                        textDecoration: 'none',
                        color: isActive ? 'var(--accent-blue-light)' : 'var(--text-secondary)',
                        fontWeight: isActive ? 600 : 400,
                        fontSize: '0.95rem',
                        transition: 'var(--transition-smooth)',
                        padding: '8px 4px'
                      }}
                    >
                      {item.name}
                    </a>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: 'var(--accent-blue)',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px var(--accent-blue-light)'
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Theme Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="mobile-controls">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0,
              right: 0,
              zIndex: 999,
              backgroundColor: 'var(--bg-secondary)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              maxHeight: 'calc(100vh - var(--nav-height))',
              overflowY: 'auto'
            }}
          >
            <div className="container" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {navItems.map(item => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{
                      textDecoration: 'none',
                      color: isActive ? 'var(--accent-blue-light)' : 'var(--text-primary)',
                      fontSize: '1.15rem',
                      fontWeight: isActive ? 700 : 500,
                      padding: '10px 0',
                      borderBottom: '1px dashed var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-blue-light)' }} />
                    )}
                  </a>
                );
              })}
              <div style={{ display: 'flex', gap: '16px', paddingTop: '12px' }}>
                <a
                  href="https://github.com/prabodh2"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-blue-light)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/prabodh-badimi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-blue-light)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 851px) {
          .mobile-controls { display: none !important; }
        }
        @media (max-width: 850px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
};
