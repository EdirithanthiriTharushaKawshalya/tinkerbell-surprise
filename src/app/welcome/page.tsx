// src/app/welcome/page.tsx
'use client'; // Required for hooks (useWindowSize) and interactivity

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Confetti from 'react-confetti';

// A helper hook to get the window size for the confetti
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Set size on mount
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
};

export default function Welcome() {
  const router = useRouter();
  const { width, height } = useWindowSize(); // For full-screen confetti

  // Function to go to the next page, as per your page flow
  const goToNextPage = () => {
    router.push('/cake'); // Navigates to the cake page [cite: 24]
  };

  return (
    <>
      {/* Full-screen confetti */}
      <Confetti
        width={width}
        height={height}
        recycle={false} // Run once and stop
        numberOfPieces={500}
        gravity={0.1}
      />
      
      {/* Page Content */}
      <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
        
        {/* Welcome Message [cite: 38, 39] */}
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-8 animate-pulse">
          Happy Birthday My Tinkerbell ❤️
        </h1>
        
        <p className="text-xl md:text-2xl font-light mb-12">
          The surprise is just beginning...
        </p>

        {/* Button to go to the next step */}
        <button
          onClick={goToNextPage}
          className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Click to continue
        </button>
      </main>
    </>
  );
}