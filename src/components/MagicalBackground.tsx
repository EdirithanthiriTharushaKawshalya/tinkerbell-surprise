// src/components/MagicFlowBackground.tsx
'use client';

import { motion } from 'framer-motion';

export default function MagicFlowBackground() {
  return (
    // Base is now much lighter: using very pale pink/rose/fuchsia shades
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-50">
      
      {/* Flowing Line 1 (Darker Pink) - Moved slightly higher/more off-center */}
      <motion.div
        className="absolute top-[10%] left-[-50%] w-[200vw] h-20 bg-pink-500/30 blur-xl opacity-50 -rotate-12"
        animate={{ x: ['-50%', '50%'] }} 
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear" 
        }}
      />

      {/* Flowing Line 2 (Deeper Rose, opposite direction) - Moved lower */}
      <motion.div
        className="absolute bottom-[10%] right-[-50%] w-[180vw] h-32 bg-rose-600/40 blur-2xl opacity-50 rotate-6"
        animate={{ x: ['50%', '-50%'] }} 
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear",
          delay: 1 
        }}
      />
      
      {/* 1. Pulsing Orb (Top-Left Corner) - Darker element, now contrasts better with lighter background */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-48 h-48 bg-fuchsia-700/50 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.6, 0.8, 0.6],
          x: [0, 20, 0], 
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* 2. Pulsing Orb (Bottom-Right Corner) - Darker element, now contrasts better with lighter background */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-40 h-40 bg-fuchsia-700/50 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.6, 0.8, 0.6],
          x: [0, -20, 0], 
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}