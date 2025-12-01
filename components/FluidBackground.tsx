
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      opacity: Math.random() * 0.4 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, p.opacity, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <ParticleField />

      {/* Subtle Grid - Icy Tech Look */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
      />

      {/* Blob 1: Deep Blue Core */}
      <motion.div
        className="absolute top-[-20%] left-[20%] w-[70vw] h-[70vw] bg-[#1e3a8a] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Blob 2: Icy Cyan */}
      <motion.div
        className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] bg-[#06b6d4] rounded-full mix-blend-screen filter blur-[120px] opacity-15"
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 3: White/Frost Highlights */}
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e0f2fe] rounded-full mix-blend-overlay filter blur-[100px] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Heavy vignette for deep ocean feel */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #020617 90%)" />
    </div>
  );
};

export default FluidBackground;
