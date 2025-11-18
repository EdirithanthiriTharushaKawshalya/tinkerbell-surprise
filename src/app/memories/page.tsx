// src/app/memories/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation'; 
import Image from 'next/image'; 
import { storage } from '@/lib/firebase'; 
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';

// --- NEW IMPORT ---
import ImageModal from '@/components/ImageModal'; // Import the new modal component
// ------------------

// Wrap the page in Suspense for useSearchParams
export default function MemoriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Memories />
    </Suspense>
  );
}

function Memories() {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  
  const fromDashboard = searchParams.get('from') === 'dashboard';

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- NEW STATE for the Modal ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // -------------------------------

  useEffect(() => {
    async function fetchImages() {
      try {
        const photosRef = ref(storage, 'photos'); 
        const response = await listAll(photosRef); 

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
    
    fetchImages();
  }, []); 

  // Function to open the modal
  const openModal = (url: string) => {
    setSelectedImage(url);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  const goToNextPage = () => {
    router.push('/final'); 
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8 bg-transparent text-gray-800">
      
      {/* --- NEW: Image Modal Component --- */}
      <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      {/* ---------------------------------- */}

      {/* Header */}
      <Image
          src="/heart.gif" 
          alt="Animated heart"
          width={100}
          height={100}
          unoptimized={true} 
      />
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">
        Remember When...
      </h1>
      <p className="text-lg mb-8">A quick trip down memory lane, just for you.</p>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-8">
        {isLoading ? (
          <p className="text-center col-span-full">Loading memories...</p>
        ) : (
          imageUrls.map((url, index) => (
            <motion.div
              key={url}
              className="overflow-hidden rounded-lg shadow-xl cursor-pointer" 
              // --- NEW: Add onClick handler to open the modal ---
              onClick={() => openModal(url)} 
              // --------------------------------------------------
              
              // Animation properties
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={url}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover aspect-square hover:opacity-80 transition-opacity" // Added hover effect
              />
            </motion.div>
          ))
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        
        {fromDashboard && (
          <button
            onClick={() => router.push('/dashboard')}
            className="px-8 py-4 bg-gray-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        )}

        <button
          onClick={goToNextPage}
          className="px-8 py-4 bg-purple-500 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          The Final Surprise
        </button>
      </div>
    </main>
  );
}