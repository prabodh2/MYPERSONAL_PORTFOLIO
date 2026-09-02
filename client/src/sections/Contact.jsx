import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TiltCard } from '../components/TiltCard';
import { Magnetic } from '../components/Magnetic';
import { slideUp, staggerContainer, organicCardVariant } from '../utils/animations';
import { sendContactForm } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('prabodhbadimi1@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.type) setStatus({ type: null, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all form fields.' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    const response = await sendContactForm(formData);
    setLoading(false);

    if (response && response.success) {
      setStatus({ type: 'success', message: response.message || 'Message sent successfully!' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Trigger Celebration Confetti Burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      const errMsg = response?.errors?.[0]?.msg || response?.message || 'Error submitting message. Please try again.';
      setStatus({ type: 'error', message: errMsg });
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section Header */}
          <motion.div variants={slideUp} style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="heading-md text-gradient" style={{ marginBottom: '12px' }}>
              Let's Build Something Together
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Have an opportunity, project, or collaboration in mind? Let's connect.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '32px', alignItems: 'start' }}>
            {/* Contact Details Left */}
            <motion.div variants={organicCardVariant(0)}>
              <TiltCard maxTilt={6} className="glass-panel contact-card">
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '24px' }}>
                  Contact Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Email */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue-light)', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                      <Mail size={22} />
                    </div>
                    <div style={{ minWidth: 0, wordBreak: 'break-word', flexGrow: 1 }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Email Address</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=prabodhbadimi1@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Compose email to Prabodh in Gmail"
                          style={{ fontSize: '0.95rem', color: 'var(--accent-blue-light)', fontWeight: 600, textDecoration: 'none' }}
                        >
                          prabodhbadimi1@gmail.com
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          title="Copy Email to Clipboard"
                          style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--accent-blue-light)',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem'
                          }}
                        >
                          {copiedEmail ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
                          {copiedEmail ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue-light)', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Phone Number</span>
                      <a href="tel:8309009913" style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>
                        8309009913
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue-light)', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                      <Linkedin size={22} />
                    </div>
                    <div style={{ minWidth: 0, wordBreak: 'break-word' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>LinkedIn Profile</span>
                      <a href="https://www.linkedin.com/in/prabodh-badimi/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.92rem', color: 'var(--accent-blue-light)', fontWeight: 600, textDecoration: 'none' }}>
                        linkedin.com/in/prabodh-badimi/
                      </a>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue-light)', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                      <Github size={22} />
                    </div>
                    <div style={{ minWidth: 0, wordBreak: 'break-word' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>GitHub Repositories</span>
                      <a href="https://github.com/prabodh2" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.92rem', color: 'var(--accent-blue-light)', fontWeight: 600, textDecoration: 'none' }}>
                        github.com/prabodh2
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* MERN Contact Form Right */}
            <motion.div variants={organicCardVariant(1)}>
              <TiltCard maxTilt={6} className="glass-panel contact-card">
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '24px' }}>
                  Let's Connect
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Form Status Notifications */}
                  {status.type === 'success' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                      <CheckCircle2 size={20} /> {status.message}
                    </motion.div>
                  )}

                  {status.type === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                      <AlertCircle size={20} /> {status.message}
                    </motion.div>
                  )}

                  <div>
                    <label htmlFor="name" style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Opportunity"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'var(--transition-smooth)'
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent-blue)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>

                  <Magnetic distance={0.2} style={{ width: '100%' }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{ width: '100%', marginTop: '8px' }}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Let's Build Something
                        </>
                      )}
                    </button>
                  </Magnetic>
                </form>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .contact-card {
          padding: 36px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .contact-card {
            padding: 20px 16px;
          }
        }
      `}</style>
    </section>
  );
};
