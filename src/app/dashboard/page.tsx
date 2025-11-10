// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

// --- Re-usable Cake Component ---
function InteractiveCake() {
  const [isLit, setIsLit] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold text-pink-600 mb-4">Make Another Wish</h2>
      
      {/* Cake & Candle */}
      <div className="relative mb-8 mt-12">
        <AnimatePresence>
          {isLit && (
            <motion.div
              className="w-3 h-6 bg-yellow-400 rounded-t-full rounded-b-lg absolute left-1/2 -translate-x-1/2 -top-12 z-30"
              style={{ boxShadow: '0 0 10px 3px #fde047' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            />
          )}
        </AnimatePresence>
        
        {/* Candle - Added z-20 */}
        <div className="w-4 h-8 bg-white rounded-t-md absolute left-1/2 -translate-x-1/2 -top-8 z-20" />
        
        {/* === NEW CAKE STRUCTURE (Scaled Down) === */}
        <div className="flex flex-col items-center">
          
          {/* Top Tier (Frosting) - Scaled down from w-56, h-20 */}
          <div className="w-36 h-14 bg-white rounded-lg shadow-lg z-10" />
          
          {/* Middle Tier - Scaled down from w-64, h-20 */}
          <div className="w-44 h-14 bg-pink-400 rounded-lg shadow-md -mt-3 z-0" />
          
          {/* Bottom Tier - Scaled down from w-72, h-24 */}
          <div className="w-48 h-16 bg-pink-300 rounded-lg shadow-xl -mt-3" />
        </div>
        {/* === END NEW CAKE === */}

      </div>
      <button
        onClick={() => setIsLit(!isLit)}
        className="px-6 py-2 bg-purple-500 text-white font-bold rounded-full shadow-md text-sm transition-transform transform hover:scale-105"
      >
        {isLit ? 'Blow out candle 🎂' : 'Make another wish?'}
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
          
          {/* === UPDATE === */}
          <p
            className="text-gray-700 text-sm cursor-pointer hover:underline"
            // Add ?from=dashboard to the URL
            onClick={() => router.push('/card?from=dashboard')}
          >
            Want to re-read your letter darling?
          </p>
          {/* === END UPDATE === */}

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
        
        {/* Envelope Front (This was covering the letter) */}
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
  const router = useRouter(); // This router is used by the Memories card
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
      } catch (error)
{
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
    <main className="flex flex-col items-center min-h-screen p-4 md:p-8 bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mt-8 mb-8">
        A Collection for My Love ❤️
      </h1>
      
      {/* Dashboard Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Random Reason */}
        <div className="bg-white/70 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between min-h-[250px]">
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

        {/* Card 2: Memories Link (UPDATED) */}
        <motion.div
          // Add ?from=dashboard to the URL
          onClick={() => router.push('/memories?from=dashboard')}
          className="bg-white/70 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center min-h-[250px] cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-4">The Story of Us</h2>
          <p className="text-5xl mb-4">📸</p>
          <p className="text-gray-700 text-lg">Take a walk down memory lane</p>
        </motion.div>

        {/* Card 3: Interactive Cake */}
        <div className="bg-white/70 rounded-lg shadow-lg p-6">
          <InteractiveCake />
        </div>
        
        {/* Card 4: Interactive Card */}
        <div className="bg-white/70 rounded-lg shadow-lg p-6">
          <InteractiveCard />
        </div>

      </div>
    </main>
  );
}