'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

interface BackgroundMusicContextType {
  isPaused: boolean
  isTimerActive: boolean
  timeRemaining: number
  pauseBackgroundMusic: () => void
  resumeBackgroundMusic: () => void
  startTimer: () => void
  cancelTimer: () => void
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | undefined>(undefined)

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const [isPaused, setIsPaused] = useState(false)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(10) // 10 segundos
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const pauseBackgroundMusic = () => {
    console.log('⏸️ Pausando música de fondo')
    setIsPaused(true)
    // Cancelar timer si está activo
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsTimerActive(false)
  }

  const resumeBackgroundMusic = () => {
    console.log('🎵 Reanudando música de fondo')
    setIsPaused(false)
    // Cancelar timer si está activo
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsTimerActive(false)
    setTimeRemaining(10) // Resetear el contador
  }

  const startTimer = () => {
    // Solo iniciar timer si no está ya activo
    if (isTimerActive) {
      console.log('⏰ Timer ya está activo, no iniciando nuevo timer')
      return
    }
    
    console.log('⏰ Iniciando timer de 10 segundos para reanudar música de fondo')
    setIsTimerActive(true)
    setTimeRemaining(10)
    
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        // Solo loggear cada 5 segundos o en los últimos 3 segundos
        if (prev % 5 === 0 || prev <= 3) {
          console.log(`⏰ Timer: ${prev} segundos restantes`)
        }
        if (prev <= 1) {
          // Timer terminado, reanudar música
          console.log('🎵 Timer terminado, reanudando música de fondo')
          setIsPaused(false)
          setIsTimerActive(false)
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          return 10 // Resetear para la próxima vez
        }
        return prev - 1
      })
    }, 1000)
  }

  const cancelTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsTimerActive(false)
    setTimeRemaining(10)
  }

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const value = {
    isPaused,
    isTimerActive,
    timeRemaining,
    pauseBackgroundMusic,
    resumeBackgroundMusic,
    startTimer,
    cancelTimer
  }

  return (
    <BackgroundMusicContext.Provider value={value}>
      {children}
    </BackgroundMusicContext.Provider>
  )
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext)
  if (context === undefined) {
    throw new Error('useBackgroundMusic must be used within a BackgroundMusicProvider')
  }
  return context
}