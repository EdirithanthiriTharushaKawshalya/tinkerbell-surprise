// src/app/cake/page.tsx
'use client'; // Required for click handlers (useState) and animations

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion'; // From your tech stack

export default function Cake() {
  const router = useRouter();

  // We use state to track if the candle is "lit"
  const [isLit, setIsLit] = useState(true);

  // This function will "blow out" the candle
  const handleBlowOut = () => {
    setIsLit(false);

    // Wait 3 seconds, then go to the next page
    setTimeout(() => {
      router.push('/card'); // As per your page flow
    }, 3000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-pink-100 to-purple-200 text-gray-800">
      
      {/* Title - Removed mb-4 to group it with the cake below */}
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-20">
        Make A Wish, My Love.
      </h1>

      {/* The Cake & Candle - Added mt-8 to group with title, mb-8 remains */}
      <div className="relative mt-8 mb-8">
        
        {/* Candle Flame - We use AnimatePresence and motion to make it fade */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              className="w-4 h-8 bg-yellow-400 rounded-t-full rounded-b-lg absolute left-1/2 -translate-x-1/2 -top-16 z-30"
              style={{ boxShadow: '0 0 15px 5px #fde047' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
            />
          )}
        </AnimatePresence>
        
        {/* Candle - Added z-20 to ensure it's on top of the cake */}
        <div className="w-6 h-12 bg-white rounded-t-md absolute left-1/2 -translate-x-1/2 -top-12 z-20" />

        {/* === UPGRADED CAKE UI === */}
        {/* We stack the tiers from top to bottom, using negative margin to overlap */}
        <div className="flex flex-col items-center">
          
          {/* Top Tier (Frosting Layer) */}
          <div className="w-56 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center text-pink-500 font-semibold text-lg z-10">
            {/* Sweet 20! */}
          </div>
          
          {/* Middle Tier */}
          <div className="w-64 h-20 bg-pink-400 rounded-lg shadow-md -mt-4 z-0" />
          
          {/* Bottom Tier */}
          <div className="w-72 h-24 bg-pink-300 rounded-lg shadow-xl -mt-4" />
        </div>
        {/* === END UPGRADED CAKE === */}

      </div>

      {/* Interaction Button */}
      {isLit ? (
        <button
          onClick={handleBlowOut}
          className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Click to blow out the candle 🎂
        </button>
      ) : (
        <p className="text-2xl font-light text-pink-600 animate-pulse">
          I hope all your wishes come true, my love. ❤️
        </p>
      )}
    </main>
  );
}