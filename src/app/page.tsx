// src/app/page.tsx
'use client'; // This is required for using hooks (useState, useEffect)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase'; // Import our db connection
import { doc, getDoc, Timestamp } from 'firebase/firestore';

export default function Home() {
  const router = useRouter();

  // State to hold the countdown parts
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Target unlock time from your documentation [cite: 7]
  const targetTimezone = 'Asia/Colombo'; // (GMT+5:30)

  useEffect(() => {
    // 1. Fetch the unlock time from Firebase
    async function fetchUnlockTime() {
      try {
        // We get the document 'config' from the 'settings' collection 
        const docRef = doc(db, 'settings', 'config');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          // Get the 'unlockTime' field 
          const unlockTimestamp = data.unlockTime as Timestamp;
          const targetDate = unlockTimestamp.toDate(); // Convert Firebase Timestamp to JS Date

          // 2. Start the countdown timer
          const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
              // Time's up!
              clearInterval(interval);
              setIsUnlocked(true);
            } else {
              // Calculate time left
              setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
              setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
              setMinutes(Math.floor((difference / 1000 / 60) % 60));
              setSeconds(Math.floor((difference / 1000) % 60));
              setIsLoading(false);
            }
          }, 1000);

        } else {
          console.error("Error: Could not find 'config' document in Firebase.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
        setIsLoading(false);
      }
    }

    fetchUnlockTime();
  }, []); // The empty array [] means this runs once when the page loads

  // 3. Handle redirection when unlocked
  useEffect(() => {
    if (isUnlocked) {
      // Redirect to the welcome page as per your page flow [cite: 24]
      router.push('/welcome');
    }
  }, [isUnlocked, router]);

  // --- Render the Page ---

  // Show a loading screen while we get the time
  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Connecting to surprise...</p>
      </main>
    );
  }

  // The main countdown UI
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-t from-pink-200 to-purple-200 text-gray-800">
      
      {/* Landing Text [cite: 39] */}
      <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">
        Happy Birthday My Tinkerbell ❤️
      </h1>

      {/* Countdown Text [cite: 41] */}
      <p className="text-2xl md:text-3xl font-light mb-8">
        You’re not allowed to peek yet! 🎁⏳
      </p>

      {/* The Timer */}
      <div className="flex gap-4 md:gap-8">
        <div className="flex flex-col items-center justify-center bg-white/50 p-4 md:p-8 rounded-lg min-w-[80px]">
          <span className="text-4xl md:text-6xl font-bold">{days}</span>
          <span className="text-sm">Days</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/50 p-4 md:p-8 rounded-lg min-w-[80px]">
          <span className="text-4xl md:text-6xl font-bold">{hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/50 p-4 md:p-8 rounded-lg min-w-[80px]">
          <span className="text-4xl md:text-6xl font-bold">{minutes}</span>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/50 p-4 md:p-8 rounded-lg min-w-[80px]">
          <span className="text-4xl md:text-6xl font-bold">{seconds}</span>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    </main>
  );
}