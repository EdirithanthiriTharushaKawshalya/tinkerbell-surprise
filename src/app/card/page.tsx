// src/app/card/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Card() {
  const router = useRouter();
  
  // State to track if the envelope is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to go to the next page
  const goToNextPage = () => {
    router.push('/reasons'); // As per your page flow
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
      
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-8">
        A Special Letter for You
      </h1>

      {/* Envelope and Card Wrapper */}
      <div className="relative w-[300px] h-[200px] mb-8">
        
        {/* The Card (slides out) */}
        <motion.div
          className="absolute w-[280px] h-[180px] bg-white shadow-lg rounded-lg p-6 text-center flex flex-col justify-center items-center"
          style={{ top: 10, left: 10, zIndex: 100 }}
          // Animate: Slide up
          animate={{ y: isOpen ? -180 : 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Your placeholder message */}
          <p className="text-lg text-pink-500 mb-4">My Dearest Tinkerbell,</p>
          <p className="text-gray-700">
            This is just the placeholder for the romantic card message.
            We will personalize this later!
          </p>
        </motion.div>

        {/* Envelope Back */}
        <div className="absolute w-full h-full bg-pink-300 rounded-lg shadow-xl" style={{ zIndex: 10 }} />
        
        {/* Envelope Flap (animates) */}
        <motion.div
          className="absolute w-full h-1/2 bg-pink-400 rounded-t-lg"
          style={{
            originY: 'bottom', // Set rotation origin to the bottom edge
            zIndex: 10,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)', // Triangle shape
          }}
          // Animate: Rotate open
          animate={{
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 0 : 120, // Move flap behind card when open
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Envelope Front */}
        <div 
          className="absolute w-full h-full bg-pink-300 rounded-lg shadow-xl"
          style={{ 
            zIndex: 110,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Placeholder
            // This is a simplified front, real envelope is complex
          }}
        />
        {/* A simple "front" to cover the card before opening */}
        <div className="absolute w-full h-full bg-pink-300 rounded-lg" style={{ zIndex: 105 }} />

      </div>

      {/* Button to Open/Continue */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="open"
            onClick={() => setIsOpen(true)}
            className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Open the Letter 💌
          </motion.button>
        ) : (
          <motion.div
            key="actions"
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }} // Shortened delay to feel responsive
          >
            {/* NEW Close Button */}
            <button
              onClick={() => setIsOpen(false)} // Sets state back to false
              className="px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Close Letter
            </button>
            
            {/* Existing Continue Button */}
            <button
              onClick={goToNextPage}
              className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              See What's Next
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* === NEW DASHBOARD BUTTON === */}
      <button
        onClick={() => router.push('/dashboard')}
        className="mt-6 px-6 py-3 bg-white text-purple-600 font-bold rounded-full shadow-md transition-transform transform hover:scale-105 border border-purple-200"
      >
        Go to Dashboard
      </button>
      {/* === END NEW DASHBOARD BUTTON === */}

    </main>
  );
}