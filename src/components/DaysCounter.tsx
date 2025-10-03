'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Calendar } from 'lucide-react'

export default function DaysCounter() {
  const [days, setDays] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const startDate = new Date('2018-09-23') // 23 de septiembre de 2018

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - startDate.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      setDays(diffDays)
    }

    calculateDays()
    // Actualizar cada día a medianoche
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const msUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeoutId = setTimeout(() => {
      calculateDays()
      // Luego actualizar cada 24 horas
      const intervalId = setInterval(calculateDays, 24 * 60 * 60 * 1000)
      return () => clearInterval(intervalId)
    }, msUntilMidnight)

    return () => clearTimeout(timeoutId)
  }, [])

  // Calcular años, meses y días
  const years = Math.floor(days / 365)
  const remainingDays = days % 365
  const months = Math.floor(remainingDays / 30)
  const daysLeft = remainingDays % 30

  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={() => setShowDetails(!showDetails)}
        className="group relative bg-gradient-to-br from-pink-400/90 to-purple-500/90 dark:from-pink-500/90 dark:to-purple-600/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-purple-300/40 dark:border-white/20 hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="h-6 w-6 text-white fill-white" />
          </motion.div>

          <div className="text-left">
            <div className="text-white/80 text-xs font-semibold uppercase tracking-wide">
              Días Juntos
            </div>
            <div className="text-white text-2xl font-bold">
              {days.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 pt-3 border-t border-white/20 overflow-hidden"
            >
              <div className="text-white/90 text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-semibold">Desde:</span>
                  <span>23 Sept 2018</span>
                </div>
                <div className="text-white font-semibold mt-2">
                  {years} {years === 1 ? 'año' : 'años'}, {months} {months === 1 ? 'mes' : 'meses'}, {daysLeft} {daysLeft === 1 ? 'día' : 'días'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/50 to-purple-500/50 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
      </motion.button>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-1/2 text-pink-300"
            animate={{
              y: [-40, -80],
              x: [0, (i - 1) * 20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
          >
            💕
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
