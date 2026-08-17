import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';

export const ProfileImage = () => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '340px', aspectRatio: '1/1', margin: '0 auto' }}>
      {/* Outer Rotating Glowing Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: '50%',
          border: '2px dashed var(--accent-blue)',
          opacity: 0.6,
          pointerEvents: 'none'
        }}
      />

      {/* Pulsing Blue Glow Layer */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Profile Container */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '3px solid var(--accent-blue-light)',
          boxShadow: '0 0 35px var(--accent-glow-strong), inset 0 0 20px rgba(59, 130, 246, 0.3)',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer'
        }}
      >
        <img
          src={profileImage}
          alt="Prabodh Badimi"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 15%',
            borderRadius: '50%',
            display: 'block'
          }}
        />
      </motion.div>
    </div>
  );
};
