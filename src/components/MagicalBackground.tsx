// src/components/MagicFlowBackground.tsx
'use client';

import { motion } from 'framer-motion';

export default function MagicFlowBackground() {
  return (
    // Base gradient is now slightly richer/more pink
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-br from-rose-100 via-pink-200 to-fuchsia-100">
      
      {/* Flowing Line 1 (Darker Pink) - Faster flow */}
      <motion.div
        className="absolute top-[10%] left-[-50%] w-[200vw] h-20 bg-pink-500/30 blur-xl opacity-50 -rotate-12"
        animate={{ x: ['-50%', '50%'] }} 
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear" 
        }}
      />

      {/* Flowing Line 2 (Deeper Rose, opposite direction) - Faster flow */}
      <motion.div
        className="absolute bottom-[10%] right-[-50%] w-[180vw] h-32 bg-rose-600/40 blur-2xl opacity-50 rotate-6"
        animate={{ x: ['50%', '-50%'] }} 
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear",
          delay: 1 
        }}
      />
      
      {/* 1. Pulsing Orb (Top-Left Corner) - More Dramatic Pulse */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-48 h-48 bg-fuchsia-700/50 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.5, 0.9, 0.5],
          x: [0, 40, 0], 
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* 2. Pulsing Orb (Bottom-Right Corner) - More Dramatic Pulse */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-40 h-40 bg-fuchsia-700/50 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.5, 0.9, 0.5],
          x: [0, -40, 0], 
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}