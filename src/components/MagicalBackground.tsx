// src/components/MagicFlowBackground.tsx
'use client';

import { motion } from 'framer-motion';

export default function MagicFlowBackground() {
  return (
    // Base gradient remains light for good contrast
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-50">
      
      {/* Flowing Line 1 (Darker Pink) - Decreased duration (faster flow) */}
      <motion.div
        className="absolute top-[10%] left-[-50%] w-[200vw] h-20 bg-pink-500/30 blur-xl opacity-50 -rotate-12"
        animate={{ x: ['-50%', '50%'] }} 
        transition={{ 
          duration: 20, // Reduced from 30s to 20s (Faster)
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear" 
        }}
      />

      {/* Flowing Line 2 (Deeper Rose, opposite direction) - Decreased duration (faster flow) */}
      <motion.div
        className="absolute bottom-[10%] right-[-50%] w-[180vw] h-32 bg-rose-600/40 blur-2xl opacity-50 rotate-6"
        animate={{ x: ['50%', '-50%'] }} 
        transition={{ 
          duration: 25, // Reduced from 40s to 25s (Faster)
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear",
          delay: 1 
        }}
      />
      
      {/* 1. Pulsing Orb (Top-Left Corner) - Increased scale and opacity change (More Dramatic Pulse) */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-48 h-48 bg-fuchsia-700/50 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], // Increased scale change (1.1 -> 1.3)
          opacity: [0.5, 0.9, 0.5], // Increased opacity change (0.6/0.8 -> 0.5/0.9)
          x: [0, 40, 0], // Increased corner drift (20 -> 40)
          y: [0, 20, 0] // Increased corner drift (10 -> 20)
        }}
        transition={{ 
          duration: 3, // Reduced from 4s to 3s (Faster Pulse)
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* 2. Pulsing Orb (Bottom-Right Corner) - Increased scale and opacity change (More Dramatic Pulse) */}
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-40 h-40 bg-fuchsia-700/50 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1], // Increased scale change (1.1 -> 1.3)
          opacity: [0.5, 0.9, 0.5], // Increased opacity change
          x: [0, -40, 0], // Increased corner drift
          y: [0, -20, 0] // Increased corner drift
        }}
        transition={{ 
          duration: 4, // Reduced from 5s to 4s (Faster Pulse)
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}