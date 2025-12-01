
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
         className="absolute border border-[#06b6d4] rounded-full"
         style={{ width: 40, height: 40 }}
         animate={{ 
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.3,
            borderWidth: isHovering ? '2px' : '1px',
            borderColor: '#06b6d4'
         }}
         transition={{ duration: 0.2 }}
      />
      
      <motion.div
        className="relative rounded-full bg-[#06b6d4] blur-[2px]"
        style={{ width: 6, height: 6 }}
        animate={{
          scale: isHovering ? 0.5 : 1, 
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
