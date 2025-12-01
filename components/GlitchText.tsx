
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-heading font-black tracking-tighter italic uppercase ${className}`}>
      <motion.span
        className="block bg-gradient-to-r from-[#06b6d4] via-[#cffafe] to-[#3b82f6] bg-[length:200%_auto] bg-clip-text text-transparent will-change-[background-position]"
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(6,182,212,0.3)'
        }}
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GradientText;
