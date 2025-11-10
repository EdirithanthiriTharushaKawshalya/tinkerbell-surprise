// src/app/card/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Card() {
  const router = useRouter();
  
  // State to track if the letter modal is open
  const [isOpen, setIsOpen] = useState(false);

  // Function to go to the next page
  const goToNextPage = () => {
    router.push('/reasons'); // As per your page flow
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
      
      {/* This h1 is visible when the modal is closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-pink-600 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            A Special Letter for You
          </motion.h1>
        )}
      </AnimatePresence>


      {/* Envelope Wrapper */}
      <div className="relative w-[300px] h-[200px] mb-8">
        
        {/* === THE OLD SLIDING CARD IS REMOVED === */}

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
          }}
        />
        {/* A simple "front" to cover the card before opening */}
        <div className="absolute w-full h-full bg-pink-300 rounded-lg" style={{ zIndex: 105 }} />
      </div>

      {/* "Open" Button (Only shows when closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="open"
            onClick={() => setIsOpen(true)}
            className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, y: 20 }}
          >
            Open the Letter 💌
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* === NEW: FULL-SCREEN LETTER MODAL === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="letterModal"
            // MODIFIED: Changed z-50 to z-[200] to ensure it's on top
            className="fixed inset-0 z-[200] bg-white p-6 sm:p-12 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } }}
          >
            {/* Letter Content Wrapper */}
            <div className="max-w-3xl mx-auto my-8 text-gray-800">
              
              <h2 className="text-3xl text-pink-500 mb-6 font-semibold">My Dearest Tinkerbell,</h2>
              
              {/* Added a container for slightly better text formatting */}
              <div className="space-y-4 text-left text-lg">
                <p>Happy 20th Birthday, my love.</p>
                <p>
                  Today is such a huge milestone. You're officially stepping into a new decade, and I feel like the luckiest person in the world that I get to be by your side for it. It feels like just yesterday we were holding hands while walking home on the school road on a random Saturday after physics class. Do you remember our first kiss on the corner of that road?, and now, here we are.
                </p>
                <p>
                  As you've probably seen by now, I’ve been trying to put into words just how much you mean to me. A hundred reasons honestly just scratches the surface. How do you even begin to list all the things you love about someone?
                </p>
                <p>
                   I love you for all the big things: your incredible and compassionate heart, and the way you speak about my qualities. That is the main reason I strive to be a better man for you, my baby. I truly appreciate how much you care about me. I feel so lucky to have you, my princess.
                </p>
                <p>
                  I'm obsessed with the little things. I love how your eyes light up when you're in my arms. I love the way you laugh at my silliest jokes. I cherish the moments when you pull me closer, kiss me, and give me tight hugs after we've shared our time together.
                </p>
                <p>
                  Being with you is like... coming home. You are my best friend, my safe space, and my greatest adventure, all rolled into one. You’ve brought so much passion, laughter, and light into my world. You make me feel seen and loved in a way I never knew was possible.
                </p>
                <p>
                   I am so incredibly proud of the woman you are and the one you are becoming. As you start your twenties, I hope this new chapter brings you all the success and happiness you deserve. You deserve the entire world, my dear bunny.
                </p>
                <p>
                   I can't wait to build more memories, go on more adventures, and just... be with you. For everything that's to come.
                </p>
                <p>
                   Happy birthday, baby. Thank you for being you. I love you more than any website could ever show.
                </p>
                <p className="mt-6">
                   All my love, always,
                </p>
                <p>
                   Your one and only, Love...
                </p>
              </div>

              {/* Action Buttons (Now inside the modal) */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
                <button
                  onClick={() => setIsOpen(false)} // Sets state back to false
                  className="px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Close Letter
                </button>
                
                <button
                  onClick={goToNextPage}
                  className="px-8 py-4 bg-pink-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  See What's Next
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* === END OF MODAL === */}

      
      {/* Dashboard button is always visible, but pushed down */}
      <div className="mt-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-6 py-3 bg-white text-purple-600 font-bold rounded-full shadow-md transition-transform transform hover:scale-105 border border-purple-200"
        >
          Go to Dashboard
        </button>
      </div>

    </main>
  );
}