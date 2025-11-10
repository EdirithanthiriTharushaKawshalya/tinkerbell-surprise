// src/components/BackgroundMusic.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

export default function BackgroundMusic() {
  // State to track if music is muted
  const [isMuted, setIsMuted] = useState(false);
  
  // Reference to the <audio> element
  const audioRef = useRef<HTMLAudioElement>(null);

  // This effect ensures audio plays on first user interaction
  useEffect(() => {
    const playAudio = () => {
      audioRef.current?.play().catch(error => {
        // Autoplay was prevented by the browser. 
        // We'll wait for a click.
        console.log("Autoplay prevented. Waiting for user interaction.");
      });
    };
    
    // Try to play
    playAudio();

    // Add a listener to play on the first click anywhere
    document.addEventListener('click', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  // Function to toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* The Audio Element */}
      <audio ref={audioRef} loop autoPlay playsInline>
        {/* IMPORTANT: Update this src path to your music file */}
        <source src="/music/soft-romantic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 p-3 bg-white/50 rounded-full shadow-lg text-2xl"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </>
  );
}