'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Heart, Sparkles, X } from 'lucide-react'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  type: 'heart' | 'star' | 'spark'
  color: string
  size: number
}

interface Firework {
  id: number
  x: number
  y: number
  particles: Particle[]
  exploded: boolean
}

export default function Finale() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [fireworks, setFireworks] = useState<Firework[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [showSecretButton, setShowSecretButton] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [messagePhase, setMessagePhase] = useState(0)

  // Start the finale sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 1000)
    const timer2 = setTimeout(() => setMessagePhase(1), 2000)
    const timer3 = setTimeout(() => setMessagePhase(2), 4000)
    const timer4 = setTimeout(() => setMessagePhase(3), 6000)
    const timer5 = setTimeout(() => setShowSecretButton(true), 8000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [])

  // Particle system - optimized with requestAnimationFrame
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 1 : 2 // Reduce particles on mobile
    const spawnRate = isMobile ? 600 : 300 // ms between spawns
    const maxParticles = isMobile ? 15 : 30 // Fewer max particles

    let lastSpawnTime = 0
    let animationFrameId: number

    const animate = (currentTime: number) => {
      // Spawn new particles based on spawn rate
      if (currentTime - lastSpawnTime > spawnRate) {
        const newParticles: Particle[] = []

        // Random heart particles
        for (let i = 0; i < particleCount; i++) {
          newParticles.push(createParticle('heart'))
        }

        // Random star particles (less frequent on mobile)
        if (Math.random() > (isMobile ? 0.85 : 0.75)) {
          newParticles.push(createParticle('star'))
        }

        setParticles(prev => {
          const updated = [...prev, ...newParticles]
            .map(particle => updateParticle(particle))
            .filter(particle => particle.life > 0)

          // Limit particles to prevent memory issues
          return updated.slice(-maxParticles)
        })

        lastSpawnTime = currentTime
      } else {
        // Just update existing particles
        setParticles(prev =>
          prev
            .map(particle => updateParticle(particle))
            .filter(particle => particle.life > 0)
        )
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Fireworks system - optimized for mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const fireworkInterval = isMobile ? 5000 : 3000 // Less frequent overall
    const fireworkThreshold = isMobile ? 0.7 : 0.5 // Less likely on mobile

    const interval = setInterval(() => {
      if (Math.random() > fireworkThreshold) {
        createFirework()
      }
    }, fireworkInterval)

    return () => clearInterval(interval)
  }, [])

  const createParticle = (type: 'heart' | 'star' | 'spark'): Particle => {
    const colors = {
      heart: ['#FF69B4', '#FF1493', '#DC143C', '#FFB6C1'],
      star: ['#FFD700', '#FFA500', '#FF4500', '#FFFF00'],
      spark: ['#FF69B4', '#9370DB', '#00CED1', '#32CD32']
    }

    return {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 1,
      maxLife: 1,
      type,
      color: colors[type][Math.floor(Math.random() * colors[type].length)],
      size: Math.random() * 20 + 10
    }
  }

  const updateParticle = (particle: Particle): Particle => {
    return {
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      vy: particle.vy + 0.1, // gravity
      life: particle.life - 0.02
    }
  }

  const createFirework = () => {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * (window.innerHeight * 0.6) + 100
    
    const fireworkParticles: Particle[] = []
    const colors = ['#FF69B4', '#FFD700', '#FF4500', '#9370DB', '#00CED1', '#32CD32']
    
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 10 : 20 // Fewer firework particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const speed = Math.random() * 3 + 2
      
      fireworkParticles.push({
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        type: 'spark',
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4
      })
    }

    const newFirework: Firework = {
      id: Math.random(),
      x,
      y,
      particles: fireworkParticles,
      exploded: true
    }

    setFireworks(prev => [...prev, newFirework])
    
    // Remove firework after particles fade
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id))
    }, 3000)
  }

  const openVideoModal = () => {
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 relative overflow-hidden flex items-center justify-center">
      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              color: particle.color,
              fontSize: `${particle.size}px`
            }}
            animate={{
              opacity: particle.life,
              scale: [1, 1.2, 0.8],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {particle.type === 'heart' ? '💕' : particle.type === 'star' ? '⭐' : '✨'}
          </motion.div>
        ))}
      </div>

      {/* Fireworks */}
      <div className="absolute inset-0 pointer-events-none">
        {fireworks.map(firework => (
          <div key={firework.id}>
            {firework.particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: particle.x,
                  top: particle.y,
                  backgroundColor: particle.color,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
                animate={{
                  x: particle.vx * 50,
                  y: particle.vy * 50 + 200, // gravity effect
                  opacity: [1, 0],
                  scale: [1, 0]
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Background stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="mb-16"
            >
              <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8"
                animate={{
                  backgroundImage: [
                    'linear-gradient(45deg, #FF69B4, #FFD700)',
                    'linear-gradient(45deg, #FFD700, #FF4500)',
                    'linear-gradient(45deg, #FF4500, #9370DB)',
                    'linear-gradient(45deg, #9370DB, #FF69B4)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                7 Años
              </motion.h1>

              {/* Message phases */}
              <div className="space-y-6">
                <AnimatePresence>
                  {messagePhase >= 1 && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="text-lg sm:text-2xl md:text-4xl text-white font-light leading-relaxed"
                    >
                      Juntos y sigo
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {messagePhase >= 2 && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent"
                    >
                      eligiéndote
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {messagePhase >= 3 && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="text-lg sm:text-2xl md:text-4xl text-purple-200 font-light"
                    >
                      cada día...💜 
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Secret Button */}
        <AnimatePresence>
          {showSecretButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                bounce: 0.5, 
                duration: 1 
              }}
              className="relative"
            >
              <motion.button
                onClick={openVideoModal}
                className="relative group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-white text-lg shadow-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Play className="h-6 w-6" />
                  <span>Tengo una sorpresa para ti...</span>
                  <Sparkles className="h-6 w-6" />
                </span>
                
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Sparkle effect */}
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-yellow-300"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: 360,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating hearts around the button */}
        {showSecretButton && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl text-pink-400"
                style={{
                  left: `${40 + Math.cos(i * Math.PI / 4) * 200}px`,
                  top: `${300 + Math.sin(i * Math.PI / 4) * 100}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              >
                💕
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <VideoModal onClose={closeVideoModal} />
        )}
      </AnimatePresence>
    </section>
  )
}

interface VideoModalProps {
  onClose: () => void
}

function VideoModal({ onClose }: VideoModalProps) {
  const { pauseBackgroundMusic, resumeBackgroundMusic } = useBackgroundMusic()

  const handleVideoPlay = () => {
    // Pausar música de fondo cuando comienza el video
    pauseBackgroundMusic()
  }

  const handleVideoPause = () => {
    // Reanudar música de fondo cuando se pausa el video
    resumeBackgroundMusic()
  }

  const handleVideoEnded = () => {
    // Reanudar música de fondo cuando termina el video
    resumeBackgroundMusic()
  }

  const handleClose = () => {
    // Reanudar música de fondo al cerrar el modal
    resumeBackgroundMusic()
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full max-h-[90vh] bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", bounce: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all duration-200 hover:scale-110"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Video Content */}
        <div className="p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Tu Sorpresa Especial 💕
              </span>
            </h2>

            {/* Video sorpresa */}
            <div className="aspect-video rounded-2xl mb-6 overflow-hidden border border-white/10 shadow-2xl">
              <video 
                className="w-full h-full object-cover rounded-2xl"
                controls
                preload="metadata"
                poster="/images/video-poster.jpg" // Opcional: puedes agregar una imagen de portada
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
              >
                <source src="/video/NUESTRO.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>

            {/* Message below video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-400/30"
            >
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-4" />
              <p className="text-white text-lg leading-relaxed">
                Espero que hayas disfrutado este viaje por nuestros 7 años juntos. 
                Cada sección de esta página web está llena del amor que siento por ti. 
                Gracias por ser mi compañera de vida, mi mejor amiga, y mi amor eterno.
              </p>
              <p className="text-pink-300 font-semibold mt-4">
                Te amo más cada día que pasa. 💕
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating particles in modal */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg text-pink-400/60"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
      </motion.div>
    </motion.div>
  )
}