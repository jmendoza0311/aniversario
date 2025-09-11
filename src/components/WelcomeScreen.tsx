'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui/button'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface WelcomeScreenProps {
  onEnter: () => void
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [stars, setStars] = useState<Star[]>([])
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [isEntering, setIsEntering] = useState(false)

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 2 + 1,
        })
      }
      setStars(newStars)
    }

    generateStars()

    const animateStars = () => {
      setStars(prev => prev.map(star => ({
        ...star,
        opacity: Math.sin(Date.now() * 0.001 * star.speed) * 0.4 + 0.6,
      })))
    }

    const interval = setInterval(animateStars, 100)
    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    setIsEntering(true)
    setTimeout(() => {
      onEnter()
    }, 1500)
  }

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-black">
      {/* Starry Sky Background */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: star.opacity,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.speed,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-indigo-900/20"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 2.5, 
            delay: 0.8,
            type: "spring",
            stiffness: 60,
            damping: 20,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
            >
              Hace 7 años
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 2, 
              delay: 2.5,
              type: "spring",
              stiffness: 50,
              damping: 25,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200"
          >
            comenzó nuestra aventura...
          </motion.p>
        </motion.div>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1.5, 
            delay: 3.5,
            type: "spring",
            stiffness: 120,
            damping: 20,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <Button
            onClick={handleEnter}
            disabled={isEntering}
            className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-2xl hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/25 disabled:opacity-50 touch-manipulation"
          >
            <motion.span
              animate={isEntering ? { x: [0, 20, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {isEntering ? 'Entrando...' : 'Entrar a nuestra historia'}
            </motion.span>
            
            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
          </Button>
        </motion.div>

        {/* Music Control */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          className="absolute bottom-8 right-8"
        >
          <Button
            onClick={() => setMusicEnabled(!musicEnabled)}
            variant="outline"
            size="sm"
          >
            {musicEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Curtain/Door Animation */}
      {isEntering && (
        <>
          <motion.div
            className="absolute inset-0 z-50 bg-black origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 z-50 bg-gradient-to-r from-purple-900 to-pink-900 origin-right"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  )
}