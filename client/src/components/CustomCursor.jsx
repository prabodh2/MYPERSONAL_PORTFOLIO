import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if target is interactive element
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, .glass-panel, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          borderRadius: '50%',
          border: '1.5px solid var(--accent-blue-light)',
          boxShadow: isHovered ? '0 0 20px var(--accent-glow-strong)' : '0 0 10px var(--accent-glow)',
          transform: `translate3d(${position.x - (isHovered ? 24 : 16)}px, ${position.y - (isHovered ? 24 : 16)}px, 0)`,
          transition: 'width 0.2s ease, height 0.2s ease, transform 0.08s ease-out, border-color 0.2s ease',
          pointerEvents: 'none',
          zIndex: 9999,
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.08)' : 'transparent'
        }}
      />
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-blue)',
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          transition: 'transform 0.02s linear',
          pointerEvents: 'none',
          zIndex: 10000
        }}
      />
    </>
  );
};
