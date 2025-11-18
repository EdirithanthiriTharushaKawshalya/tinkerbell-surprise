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

    // Wait 3 seconds, then go to the next page (Original Logic)
    setTimeout(() => {
      router.push('/card'); // As per your page flow
    }, 3000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-pink-100 to-purple-200 text-gray-800 overflow-hidden">
      
      {/* === NEW UPGRADED CAKE UI === */}
      <div className="relative mt-10 mb-12 z-20 scale-110 md:scale-125">
        
        {/* 1. Candle & Flame Area */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[60px] z-50">
          <AnimatePresence>
            {isLit ? (
              // --- REALISTIC FLAME ---
              <motion.div
                key="flame"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.1, 1, 1.2, 1], // Flickering size
                  rotate: [-2, 2, -2, 2, 0],  // Flickering rotation
                  opacity: 1 
                }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-6 h-10 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full rounded-b-md shadow-[0_0_20px_5px_rgba(255,200,0,0.6)] origin-bottom"
              />
            ) : (
              // --- SMOKE EFFECT (When blown out) ---
              <div className="relative">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 left-1/2 w-4 h-4 bg-gray-400 rounded-full blur-sm"
                    initial={{ opacity: 0.8, scale: 0.5, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: 2, 
                      y: -80 - (i * 20), // Go up
                      x: (i % 2 === 0 ? 20 : -20) + (Math.random() * 10), // Drift left/right
                    }}
                    transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
          
          {/* The Candle Stick (Striped) */}
          <div className="w-4 h-16 bg-white border border-gray-100 rounded-sm relative overflow-hidden shadow-sm mx-auto mt-1">
             {/* Stripes */}
             <div className="absolute w-full h-4 bg-pink-300 top-2 -skew-y-12 opacity-50"></div>
             <div className="absolute w-full h-4 bg-pink-300 top-8 -skew-y-12 opacity-50"></div>
             <div className="absolute w-full h-4 bg-pink-300 top-14 -skew-y-12 opacity-50"></div>
          </div>
        </div>

        {/* 2. The Cake Layers */}
        <div className="flex flex-col items-center relative">

          {/* Top Tier */}
          <div className="w-48 h-16 bg-gradient-to-r from-pink-100 to-white rounded-xl shadow-lg z-30 relative border-b-4 border-pink-200">
            {/* Frosting Drips */}
            <div className="absolute -bottom-2 left-2 w-4 h-6 bg-pink-200 rounded-full"></div>
            <div className="absolute -bottom-3 left-8 w-4 h-8 bg-pink-200 rounded-full"></div>
            <div className="absolute -bottom-2 left-16 w-5 h-5 bg-pink-200 rounded-full"></div>
            <div className="absolute -bottom-3 right-8 w-4 h-7 bg-pink-200 rounded-full"></div>
            
            {/* Sprinkles */}
            <div className="absolute top-4 left-6 w-2 h-2 bg-blue-300 rounded-full"></div>
            <div className="absolute top-6 right-10 w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-3 left-1/2 w-2 h-2 bg-green-300 rounded-full"></div>
          </div>
          
          {/* Middle Tier */}
          <div className="w-60 h-20 bg-gradient-to-r from-pink-300 to-pink-200 rounded-xl shadow-md -mt-4 z-20 relative border-b-4 border-pink-400/30">
             {/* Sprinkles */}
             <div className="absolute top-8 left-10 w-2 h-2 bg-white rounded-full opacity-80"></div>
             <div className="absolute bottom-6 right-12 w-2 h-2 bg-white rounded-full opacity-80"></div>
             <div className="absolute top-4 right-20 w-2 h-2 bg-yellow-200 rounded-full opacity-80"></div>
          </div>
          
          {/* Bottom Tier */}
          <div className="w-72 h-24 bg-gradient-to-r from-pink-500 to-pink-400 rounded-xl shadow-xl -mt-4 z-10 relative flex items-center justify-center">
             {/* Decorative Line */}
             <div className="w-full h-1 bg-pink-600/20 absolute top-1/2"></div>
          </div>

          {/* Plate */}
          <div className="w-80 h-6 bg-white/40 rounded-[50%] absolute -bottom-2 blur-[1px] shadow-xl z-0"></div>
        </div>
      </div>
      {/* === END UPGRADED CAKE === */}

      {/* Interaction Section */}
      {isLit ? (
        <div className="flex flex-col items-center z-20 relative">
            {/* Text Added Here */}
            <h2 className="text-xl font-bold text-pink-600 mb-4 mt-2">
                Make A Wish, My Love!
            </h2>
            
            <button
            onClick={handleBlowOut}
            className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
            Click to blow out the candle 🎂
            </button>
        </div>
      ) : (
        <p className="text-1xl font-light text-pink-600 animate-pulse z-20 relative">
          I hope all your wishes come true, my love. ❤️
        </p>
      )}
    </main>
  );
}