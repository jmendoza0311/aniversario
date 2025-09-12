'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import { Music, Clock } from 'lucide-react'

export default function MusicTimerIndicator() {
  const { isTimerActive, timeRemaining } = useBackgroundMusic()

  if (!isTimerActive) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <motion.div
          className="bg-black/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Music className="h-5 w-5 text-purple-300" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-white/60" />
              <span className="text-white text-sm font-medium">
                Música de fondo en {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 w-full bg-white/10 rounded-full h-1">
            <motion.div
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeRemaining / 10) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}