// src/app/memories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/firebase'; // Import our db AND storage
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

export default function Memories() {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Asynchronous function to fetch images
    async function fetchImages() {
      try {
        const photosRef = ref(storage, 'photos'); // Get reference to the 'photos' folder
        const response = await listAll(photosRef); // List all items (images) in that folder

        // Get the download URL for each image
        const urls = await Promise.all(
          response.items.map((itemRef) => getDownloadURL(itemRef))
        );
        
        setImageUrls(urls);
        
      } catch (error) {
        console.error("Error fetching images from Firebase Storage:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    // 2. Call the function
    fetchImages();
  }, []); // The empty array [] means this runs once

  // Function to go to the next page
  const goToNextPage = () => {
    router.push('/final'); // As per your page flow
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8 bg-gradient-to-b from-purple-100 to-pink-100 text-gray-800">
      
      {/* Header */}
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mt-8 mb-4">
        Our Memories
      </h1>
      <p className="text-lg mb-8">A few moments we've shared...</p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-8">
        {isLoading ? (
          <p className="text-center">Loading memories...</p>
        ) : (
          imageUrls.map((url, index) => (
            <motion.div
              key={url}
              className="overflow-hidden rounded-lg shadow-xl"
              // Animation properties
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={url}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Navigation Button */}
      <button
        onClick={goToNextPage}
        className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
      >
        The Final Surprise
      </button>
    </main>
  );
}