import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for smooth trailing cursor motion
  const springConfigOuter = { stiffness: 250, damping: 20 };
  const springConfigInner = { stiffness: 800, damping: 35 };

  const outerX = useSpring(cursorX, springConfigOuter);
  const outerY = useSpring(cursorY, springConfigOuter);

  const innerX = useSpring(cursorX, springConfigInner);
  const innerY = useSpring(cursorY, springConfigInner);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .glass-panel, [role="button"], .interactive-hover');
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const outerSize = isClicking ? 24 : isHovered ? 44 : 32;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: outerX,
          y: outerY,
          width: outerSize,
          height: outerSize,
          borderRadius: '50%',
          border: '1.5px solid var(--accent-blue-light)',
          boxShadow: isHovered ? '0 0 22px var(--accent-glow-strong)' : '0 0 10px var(--accent-glow)',
          pointerEvents: 'none',
          zIndex: 9999,
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
          translateX: '-50%',
          translateY: '-50%'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: innerX,
          y: innerY,
          width: isClicking ? 10 : 6,
          height: isClicking ? 10 : 6,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-blue)',
          pointerEvents: 'none',
          zIndex: 10000,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    </>
  );
};

export default CustomCursor;
