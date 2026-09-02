import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const TiltCard = ({ children, className = '', style = {}, maxTilt = 10, scaleOnHover = 1.02, ...props }) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: scaleOnHover }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        ...style
      }}
      className={className}
      {...props}
    >
      <div style={{ transform: 'translateZ(10px)', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
