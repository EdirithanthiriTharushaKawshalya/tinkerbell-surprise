// src/components/Snowfall.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Snow-themed colors (shades of white with slight blue)
const snowColors = [
  "#FFFFFF",
  "#F0F8FF", // AliceBlue
  "#E6F7FF", // Very light blue
]

// Client-side only component for the actual snow animation
export default function Snowfall() {
  // Use state to track if we're in the browser
  const [isMounted, setIsMounted] = useState(false)

  // Only run on the client after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Return null during SSR and initial render
  if (!isMounted) {
    return null
  }

  // Only render the actual snow component on the client
  return <ClientSnowfall />
}

// Separate component that only runs on the client
function ClientSnowfall() {
  const [elements, setElements] = useState<
    Array<{
      id: number
      x: number
      color: string
      size: number
      speed: number
      delay: number
    }>
  >([])

  useEffect(() => {
    // Generate elements
    const width = window.innerWidth

    const newElements = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      color: snowColors[Math.floor(Math.random() * snowColors.length)],
      size: Math.random() * 3 + 1, // Snowflakes are 1px to 4px
      speed: Math.random() * 15 + 10, // 10s to 25s duration
      delay: Math.random() * 15, // Staggered start
    }))

    setElements(newElements)

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          x: (element.x / width) * newWidth,
        })),
      )
    }

    // Throttle resize events
    let resizeTimer: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 200)
    }

    window.addEventListener("resize", throttledResize)
    return () => {
      window.removeEventListener("resize", throttledResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full z-0 select-none" style={{ pointerEvents: "none" }}>
      <svg className="w-full h-full">
        <title>Snowfall</title>
        {elements.map((element) => (
          <FallingElement key={element.id} {...element} />
        ))}
      </svg>
    </div>
  )
}

function FallingElement({
  x,
  color,
  size,
  speed,
  delay,
}: {
  x: number
  color: string
  size: number
  speed: number
  delay: number
}) {
  return (
    <motion.circle
      initial={{ y: -size * 2, cx: x, opacity: 0 }}
      animate={{
        y: window.innerHeight + size * 2,
        cx: x + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 100, // Horizontal drift
        opacity: [0, 0.8, 0.8, 0], // Fade in and out
      }}
      transition={{
        duration: speed,
        times: [0, 0.1, 0.9, 1],
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "linear",
      }}
      r={size}
      fill={color}
      style={{ filter: "blur(0.5px)" }} // Soft blur for a snow effect
    />
  )
}