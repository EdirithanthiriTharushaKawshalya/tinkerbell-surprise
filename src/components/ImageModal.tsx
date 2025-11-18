// src/app/memories/ImageModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Using Lucide for the Close icon

// Define the props for the ImageModal component
interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          // 1. Backdrop Container
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-0 sm:p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose} // Close modal on backdrop click
        >
          {/* 2. Modal Content Container */}
          <motion.div
            className="w-full h-full max-w-screen-xl max-h-screen-xl relative"
            // Use a click handler on the content container to prevent closing when clicking on the image space
            onClick={(e) => e.stopPropagation()} 
            
            // Sophisticated scaling animation (pop-in effect)
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          >
            {/* 3. The Full-Screen Image */}
            <img
              src={imageUrl}
              alt="Full screen memory"
              // Ensure the image covers the available space beautifully
              className="w-full h-full object-contain rounded-none sm:rounded-xl shadow-2xl"
              style={{ objectFit: 'contain' }}
            />
            
            {/* 4. Top/Close Button Bar (Simplified) */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-end bg-gradient-to-b from-black/50 to-transparent z-50 rounded-t-xl">
              {/* Only the Close button remains */}
              <button
                onClick={onClose}
                className="p-2 text-white/90 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close full screen image"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 5. Navigation Buttons (REMOVED) */}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;