// Framer Motion Animation Variants & Helpers - Human Motion System

export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.8
};

export const gentleSpring = {
  type: "spring",
  stiffness: 70,
  damping: 18,
  mass: 1
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 35, rotateX: 5 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const slideLeft = {
  hidden: { opacity: 0, x: -35, rotateY: -3 },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotateY: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const slideRight = {
  hidden: { opacity: 0, x: 35, rotateY: 3 },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotateY: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: springTransition 
  }
};

export const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const organicCardVariant = (index = 0) => ({
  hidden: { 
    opacity: 0, 
    y: 30, 
    rotate: (index % 2 === 0 ? -1 : 1),
    scale: 0.98 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      delay: index * 0.08
    }
  }
});

// Reduced Motion Checker
export const getSafeVariant = (variant, isReducedMotion) => {
  if (isReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } }
    };
  }
  return variant;
};
