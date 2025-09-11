'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAudioContext } from '../contexts/AudioContext'
import { Play, Pause, SkipBack, SkipForward, Volume2, X, Music2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function MiniPlayer() {
  const audioContext = useAudioContext()
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    currentSongData,
    isPlaying,
    isLoading,
    progress,
    duration,
    volume,
    togglePlay,
    setVolume,
    seek,
    stop,
    nextSong,
    previousSong,
    isMiniPlayerVisible,
    hideMiniPlayer
  } = audioContext

  // Auto ocultar después de un tiempo de inactividad
  useEffect(() => {
    if (!isPlaying && currentSongData) {
      const timer = setTimeout(() => {
        hideMiniPlayer()
      }, 30000) // 30 segundos
      
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentSongData, hideMiniPlayer])

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // No mostrar si no hay canción o no está visible
  if (!currentSongData || !isMiniPlayerVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.div
          className={`bg-gradient-to-r ${currentSongData.color} backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'w-96' : 'w-80'
          }`}
          whileHover={{ scale: 1.02 }}
          layout
        >
          {/* Header con información de la canción */}
          <div className="p-4 pb-2">
            <div className="flex items-center space-x-3">
              {/* Album cover */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg overflow-hidden flex items-center justify-center">
                  <Music2 className="h-6 w-6 text-white/80" />
                </div>
              </div>

              {/* Información de la canción */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm truncate">
                  {currentSongData.title}
                </h4>
                <p className="text-white/70 text-xs truncate">
                  {currentSongData.artist}
                </p>
              </div>

              {/* Botones de control superior */}
              <div className="flex items-center space-x-2">
                {/* Botón expandir/contraer */}
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.button>

                {/* Botón cerrar */}
                <motion.button
                  onClick={() => {
                    stop()
                    hideMiniPlayer()
                  }}
                  className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Controles principales */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-center space-x-4">
              {/* Botón anterior */}
              <motion.button
                onClick={previousSong}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-400 ease-out hover:shadow-lg hover:shadow-white/25"
                whileHover={{ 
                  scale: 1.15,
                  rotateY: -10,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.2 }
                }}
                disabled={!currentSongData || isLoading}
              >
                <SkipBack className="h-4 w-4 text-white" />
              </motion.button>

              {/* Botón play/pause principal */}
              <motion.button
                onClick={togglePlay}
                className="p-3 bg-white/30 hover:bg-white/40 rounded-full transition-all duration-400 ease-out hover:shadow-xl hover:shadow-white/30"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.2 }
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : isPlaying ? (
                  <Pause className="h-5 w-5 text-white" />
                ) : (
                  <Play className="h-5 w-5 text-white ml-0.5" />
                )}
              </motion.button>

              {/* Botón siguiente */}
              <motion.button
                onClick={nextSong}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-400 ease-out hover:shadow-lg hover:shadow-white/25"
                whileHover={{ 
                  scale: 1.15,
                  rotateY: 10,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ 
                  scale: 0.9,
                  transition: { duration: 0.2 }
                }}
                disabled={!currentSongData || isLoading}
              >
                <SkipForward className="h-4 w-4 text-white" />
              </motion.button>

              {/* Control de volumen */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Volume2 className="h-4 w-4 text-white" />
                </motion.button>

                {/* Slider de volumen */}
                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full mb-2 right-0 bg-black/80 backdrop-blur-sm rounded-xl p-3 min-w-max"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-white text-xs">{Math.round(volume * 100)}%</span>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb-white"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="px-4 pb-4">
            <div className="flex items-center space-x-2 text-xs text-white/70">
              <span>{formatTime(progress)}</span>
              <div className="flex-1 relative">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/60 rounded-full"
                    style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                {/* Clickable progress bar */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={(e) => seek(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Sección expandida */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/20 p-4 bg-black/20"
              >
                <p className="text-white/80 text-xs leading-relaxed">
                  {currentSongData.explanation}
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-white/60 text-xs">
                    {currentSongData.album} • {currentSongData.year}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de reproducción con ondas */}
          {isPlaying && (
            <div className="absolute top-2 left-2 flex items-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white/60 rounded-full"
                  animate={{
                    height: [4, 12, 4, 8, 4],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
