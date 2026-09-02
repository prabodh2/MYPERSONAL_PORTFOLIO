import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001
  });

  // Calculate percentage for progress fill and snake head horizontal position
  const progressPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        zIndex: 10002,
        pointerEvents: 'none',
        overflow: 'visible'
      }}
    >
      {/* Background Track */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Snake Gradient Trail Line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: progressPercent,
          background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #4ade80 100%)',
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.8)',
          borderRadius: '0 3px 3px 0'
        }}
      />

      {/* Animated Moving Snake Head Badge */}
      <motion.div
        style={{
          position: 'absolute',
          top: '3px',
          left: progressPercent,
          transform: 'translate(-50%, -50%)',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06b6d4 0%, #4ade80 100%)',
          border: '2px solid #ffffff',
          boxShadow: '0 0 16px #06b6d4, 0 0 8px #4ade80',
          zIndex: 10003,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        animate={{
          scale: [1, 1.15, 1],
          y: [-1, 1, -1]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Snake Eyes / Core Glow Dot */}
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#070913',
            boxShadow: '0 0 4px #ffffff'
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollProgress;
