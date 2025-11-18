// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

// --- Re-usable Cake Component (UPDATED TO NEXT LEVEL UI) ---
function InteractiveCake() {
  const [isLit, setIsLit] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full overflow-hidden">
      <h2 className="text-xl font-bold text-pink-600">Make Another Wish</h2>
      
      {/* Cake Container - Scaled down to fit the card */}
      <div className="relative mt-14 mb-8 scale-[0.65] transform origin-center">
        
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
          
          {/* The Candle Stick */}
          <div className="w-4 h-16 bg-white border border-gray-100 rounded-sm relative overflow-hidden shadow-sm mx-auto mt-1">
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
          </div>
          
          {/* Middle Tier */}
          <div className="w-60 h-20 bg-gradient-to-r from-pink-300 to-pink-200 rounded-xl shadow-md -mt-4 z-20 relative border-b-4 border-pink-400/30">
             <div className="absolute top-8 left-10 w-2 h-2 bg-white rounded-full opacity-80"></div>
             <div className="absolute bottom-6 right-12 w-2 h-2 bg-white rounded-full opacity-80"></div>
          </div>
          
          {/* Bottom Tier */}
          <div className="w-72 h-24 bg-gradient-to-r from-pink-500 to-pink-400 rounded-xl shadow-xl -mt-4 z-10 relative flex items-center justify-center">
             <div className="w-full h-1 bg-pink-600/20 absolute top-1/2"></div>
          </div>

          {/* Plate */}
          <div className="w-80 h-6 bg-white/40 rounded-[50%] absolute -bottom-2 blur-[1px] shadow-xl z-0"></div>
        </div>
      </div>

      <button
        onClick={() => setIsLit(!isLit)}
        className="px-6 py-2 bg-purple-500 text-white font-bold rounded-full shadow-md text-sm transition-transform transform hover:scale-105 z-20 relative"
      >
        {isLit ? 'Blow out candle 🎂' : 'Relight Candle ✨'}
      </button>
    </div>
  );
}

// --- Re-usable Card Component (UPDATED) ---
function InteractiveCard() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Get router instance

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold text-pink-600 mb-4">Your Letter</h2>
      {/* Envelope and Card Wrapper */}
      <div className="relative w-[220px] h-[150px] mb-8 scale-90">
        <motion.div
          className="absolute w-[200px] h-[130px] bg-white shadow-lg rounded-lg p-4 text-center"
          style={{ top: 10, left: 10, zIndex: 100 }}
          animate={{ y: isOpen ? -130 : 0, zIndex: isOpen ? 110 : 100 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-md text-pink-500">To My One and Only,</p>
          
          <p
            className="text-gray-700 text-sm cursor-pointer hover:underline"
            onClick={() => router.push('/card?from=dashboard')}
          >
            Want to re-read your letter darling?
          </p>

        </motion.div>
        
        {/* Envelope Back */}
        <div className="absolute w-full h-full bg-pink-300 rounded-lg shadow-xl" style={{ zIndex: 10 }} />
        
        {/* Envelope Flap */}
        <motion.div
          className="absolute w-full h-1/2 bg-pink-400 rounded-t-lg"
          style={{ originY: 'bottom', zIndex: 10, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 120 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Envelope Front */}
        <div className="absolute w-full h-full bg-pink-300 rounded-lg" style={{ zIndex: 105 }} />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-purple-500 text-white font-bold rounded-full shadow-md text-sm transition-transform transform hover:scale-105"
      >
        {isOpen ? 'Close Letter' : 'Open Letter 💌'}
      </button>
    </div>
  );
}

// --- Define a type for our Reason data ---
interface Reason {
  id: string;
  text: string;
  icon: string;
}

// --- Main Dashboard Page ---
export default function Dashboard() {
  const router = useRouter(); 
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [currentReason, setCurrentReason] = useState<Reason | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all reasons on load
  useEffect(() => {
    async function fetchReasons() {
      try {
        const reasonsCollectionRef = collection(db, 'reasons');
        const querySnapshot = await getDocs(reasonsCollectionRef);
        const reasonsList = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          text: doc.data().text || '',
          icon: doc.data().icon || '❤️',
        }));
        setReasons(reasonsList);
      } catch (error) {
        console.error("Error fetching reasons:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReasons();
  }, []);

  // Function to show a random reason
  const showRandomReason = () => {
    if (reasons.length === 0) return;
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentReason(reasons[randomIndex]);
  };

  return (
    <main className="relative z-10 flex flex-col items-center min-h-screen p-4 md:p-8 bg-gradient-to-b from-pink-100 to-purple-200 text-gray-800">
      <Image
        src="/love.gif" 
        alt="Animated bunny peeking"
        width={150}
        height={150}
        unoptimized={true} 
      />
      <h1 className="text-2xl md:text-5xl font-bold text-pink-600 mt-8 mb-8">
        A Collection for My Love ❤️
      </h1>
      
      {/* Dashboard Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Random Reason */}
        <div className="bg-white/70 rounded-4xl shadow-lg p-6 flex flex-col items-center justify-between min-h-[250px]">
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Reasons I'm Obsessed</h2>
          <div className="flex-grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentReason ? (
                <motion.div
                  key={currentReason.id}
                  className="flex items-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <span className="text-4xl mr-4">{currentReason.icon}</span>
                  <span className="text-xl text-gray-700">{currentReason.text}</span>
                </motion.div>
              ) : (
                <p className="text-gray-500">Click the button to see a reason!</p>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={showRandomReason}
            disabled={isLoading}
            className="mt-4 px-6 py-3 bg-pink-500 text-white font-bold rounded-full shadow-md transition-transform transform hover:scale-105 disabled:opacity-50"
          >
            Show me a reason
          </button>
        </div>

        {/* Card 2: Memories Link */}
        <motion.div
          onClick={() => router.push('/memories?from=dashboard')}
          className="bg-white/70 rounded-4xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[250px] cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-4">The Story of Us</h2>
          <Image
            src="/heart love.gif" 
            alt="Animated heart love"
            width={100}
            height={100}
            unoptimized={true} 
            className="mb-4"
          />
          <p className="text-gray-700 text-lg">Take a walk down memory lane</p>
        </motion.div>

        {/* Card 3: Interactive Cake */}
        <div className="bg-white/70 rounded-4xl shadow-lg p-6 flex items-center justify-center">
          <InteractiveCake />
        </div>
        
        {/* Card 4: Interactive Card */}
        <div className="bg-white/70 rounded-4xl shadow-lg p-6">
          <InteractiveCard />
        </div>

      </div>
    </main>
  );
}