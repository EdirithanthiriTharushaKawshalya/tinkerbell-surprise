// src/app/reasons/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
// 1. Import 'query' and 'limit'
import { collection, getDocs, QueryDocumentSnapshot, DocumentData, query, limit } from 'firebase/firestore';
import { motion } from 'framer-motion';

// Define a type for our Reason data
interface Reason {
  id: string;
  text: string;
  icon: string;
}

export default function Reasons() {
  const router = useRouter(); // We need this for navigation
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReasons() {
      try {
        // 2. Create a query that limits our results to 10
        const reasonsCollectionRef = collection(db, 'reasons');
        const q = query(reasonsCollectionRef, limit(10));
        
        // 3. Execute the limited query
        const querySnapshot = await getDocs(q);
        
        const reasonsList = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            text: data.text || 'Loading...',
            icon: data.icon || '❤️',
          };
        });
        
        setReasons(reasonsList);
        
      } catch (error) {
        console.error("Error fetching reasons:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReasons();
  }, []);

  // Function to go to the next page
  const goToNextPage = () => {
    router.push('/memories'); // Continues the original flow
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
      
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mt-8 mb-4">
        Why I Love You:
      </h1>
      <p className="text-lg mb-8">An Incomplete List Starting with these 10...</p>

      {/* Reasons List */}
      <div className="w-full max-w-lg mb-8">
        {isLoading ? (
          <p className="text-center">Loading reasons...</p>
        ) : (
          <ul>
            {reasons.map((reason, index) => (
              <motion.li
                key={reason.id}
                className="flex items-center bg-white/70 shadow-md rounded-lg p-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-3xl mr-4">{reason.icon}</span>
                <span className="text-lg text-gray-700">{reason.text}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* 4. YOUR NEW MESSAGE */}
      {!isLoading && (
        <div className="text-center mb-8 p-4 bg-white/50 rounded-lg shadow-inner">
          <p className="text-lg text-gray-700">
            Want to see all 100?
          </p>
          <p 
            onClick={() => router.push('/dashboard')}
            className="text-pink-600 font-bold cursor-pointer hover:underline text-lg"
          >
            You can see them all on your keepsake dashboard later!
          </p>
        </div>
      )}

      {/* Original Navigation Button */}
      <button
        onClick={goToNextPage}
        className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        Continue the Surprise
      </button>
    </main>
  );
}