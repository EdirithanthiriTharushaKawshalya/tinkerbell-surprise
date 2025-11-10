// src/app/final/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Simple animation variant for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Each child will animate 0.3s after the previous one
    },
  },
};

// Animation variant for each text line
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Final() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
      
      {/* Animated container for the text */}
      <motion.div
        className="flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Heart */}
        <motion.div
          variants={itemVariants}
          className="text-6xl md:text-8xl mb-8"
        >
          ❤️
        </motion.div>

        {/* Animated Text Lines */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-pink-600 mb-6"
        >
          Happy 20th Birthday, my Tinkerbell.
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl font-light mb-6"
        >
          This entire journey from the cake to the memories was just a small token of a love that is bigger than any website I could ever build. You are my world.
        </motion.p>
        
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl font-bold text-purple-600 mb-12"
        >
          I love you more than I can ever show you.
        </motion.h2>

        {/* New button to navigate to dashboard */}
        <motion.button
          variants={itemVariants}
          onClick={() => router.push('/dashboard')}
          className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          See Your Keepsakes
        </motion.button>
        
      </motion.div>
    </main>
  );
}