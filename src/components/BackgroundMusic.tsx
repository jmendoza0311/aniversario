'use client'

import { useEffect, useRef, useState } from 'react'
import { useBackgroundMusic } from '../contexts/BackgroundMusicContext'
import { useAudioContext } from '../contexts/AudioContext'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [waitingForInteraction, setWaitingForInteraction] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const { isPaused, volume, pauseBackgroundMusic, startTimer } = useBackgroundMusic()
  const { setOnPlaybackChange } = useAudioContext()

  // Inicializar el audio
  useEffect(() => {
    if (typeof window === 'undefined') return

    console.log('🎵 Inicializando música de fondo...')
    const audio = new Audio()
    audio.src = '/audio/MusicaFondo.mp3'
    audio.loop = true
    audio.volume = volume // Usar volumen del contexto
    audio.preload = 'auto'
    
    audio.addEventListener('canplaythrough', () => {
      console.log('🎵 Música de fondo cargada correctamente')
      setIsLoaded(true)
      // Intentar reproducir inmediatamente cuando esté completamente cargada
      if (!hasStarted) {
        audio.play().then(() => {
          setHasStarted(true)
          setHasUserInteracted(true)
          console.log('✅ Música de fondo iniciada automáticamente al cargar')
        }).catch(() => {
          console.log('⚠️ No se pudo reproducir automáticamente al cargar')
        })
      }
    })

    audio.addEventListener('canplay', () => {
      console.log('🎵 Música de fondo lista para reproducir')
      if (!hasStarted) {
        setIsLoaded(true)
        // Intentar reproducir cuando esté lista
        audio.play().then(() => {
          setHasStarted(true)
          setHasUserInteracted(true)
          console.log('✅ Música de fondo iniciada automáticamente cuando estuvo lista')
        }).catch(() => {
          console.log('⚠️ No se pudo reproducir automáticamente cuando estuvo lista')
        })
      }
    })

    audio.addEventListener('loadeddata', () => {
      console.log('🎵 Datos de música de fondo cargados')
    })

    audio.addEventListener('error', (e) => {
      console.error('❌ Error al cargar la música de fondo:', e)
    })

    audio.addEventListener('play', () => {
      console.log('🎵 Música de fondo iniciada')
    })

    audio.addEventListener('pause', () => {
      console.log('⏸️ Música de fondo pausada')
    })

    audioRef.current = audio

    // Intentar reproducir inmediatamente
    const tryPlayImmediately = async () => {
      try {
        console.log('🎵 Intentando reproducir inmediatamente...')
        await audio.play()
        setHasStarted(true)
        setIsLoaded(true)
        setHasUserInteracted(true)
        console.log('✅ Música de fondo iniciada inmediatamente')
      } catch (error) {
        console.log('⚠️ Reproducción inmediata falló, esperando carga completa...')
        // Intentar múltiples veces con diferentes estrategias
        setTimeout(() => tryPlayImmediately(), 100)
        setTimeout(() => tryPlayImmediately(), 500)
        setTimeout(() => tryPlayImmediately(), 1000)
      }
    }

    // Intentar reproducir inmediatamente
    tryPlayImmediately()

    // No limpiar el audio al desmontar para mantener la reproducción continua
    return () => {
      // Solo pausar si es necesario, pero no limpiar la referencia
    }
  }, [])

  // Reproducir automáticamente cuando esté cargado
  useEffect(() => {
    if (!audioRef.current || !isLoaded || hasStarted) return

    const playAudio = async () => {
      try {
        console.log('🎵 Reproduciendo música de fondo...')
        await audioRef.current!.play()
        setHasStarted(true)
        setHasUserInteracted(true)
        console.log('✅ Música de fondo iniciada exitosamente')
      } catch (error) {
        console.error('❌ Error al reproducir música de fondo:', error)
        // Intentar múltiples veces antes de mostrar el indicador
        setTimeout(() => {
          if (!hasStarted) {
            audioRef.current?.play().catch(() => {
              // Solo mostrar indicador si realmente no se puede reproducir
              if (!hasUserInteracted) {
                setWaitingForInteraction(true)
                const handleUserInteraction = async () => {
                  try {
                    await audioRef.current!.play()
                    setHasStarted(true)
                    setWaitingForInteraction(false)
                    setHasUserInteracted(true)
                    console.log('✅ Música de fondo iniciada después de interacción del usuario')
                    document.removeEventListener('click', handleUserInteraction)
                    document.removeEventListener('keydown', handleUserInteraction)
                    document.removeEventListener('touchstart', handleUserInteraction)
                  } catch (e) {
                    console.error('❌ Error al reproducir después de interacción:', e)
                  }
                }
                document.addEventListener('click', handleUserInteraction, { once: true })
                document.addEventListener('keydown', handleUserInteraction, { once: true })
                document.addEventListener('touchstart', handleUserInteraction, { once: true })
              }
            })
          }
        }, 2000)
      }
    }

    // Pequeño delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(playAudio, 100)
    return () => clearTimeout(timeoutId)
  }, [isLoaded, hasStarted, hasUserInteracted])

  // Intentar reproducir automáticamente en cualquier interacción del usuario
  useEffect(() => {
    if (hasStarted || hasUserInteracted) return

    const handleAnyInteraction = async () => {
      if (audioRef.current && !hasStarted) {
        try {
          await audioRef.current.play()
          setHasStarted(true)
          setHasUserInteracted(true)
          setWaitingForInteraction(false)
          console.log('✅ Música de fondo iniciada por interacción del usuario')
        } catch (error) {
          console.log('⚠️ Aún no se puede reproducir automáticamente')
        }
      }
    }

    // Escuchar cualquier tipo de interacción
    document.addEventListener('click', handleAnyInteraction, { once: true })
    document.addEventListener('keydown', handleAnyInteraction, { once: true })
    document.addEventListener('touchstart', handleAnyInteraction, { once: true })
    document.addEventListener('mousemove', handleAnyInteraction, { once: true })
    document.addEventListener('scroll', handleAnyInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleAnyInteraction)
      document.removeEventListener('keydown', handleAnyInteraction)
      document.removeEventListener('touchstart', handleAnyInteraction)
      document.removeEventListener('mousemove', handleAnyInteraction)
      document.removeEventListener('scroll', handleAnyInteraction)
    }
  }, [hasStarted, hasUserInteracted])

  // Actualizar volumen cuando cambie
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Controlar pausa/reproducción
  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    if (isPaused) {
      audioRef.current.pause()
    } else if (hasStarted) {
      audioRef.current.play().catch(console.warn)
    }
  }, [isPaused, isLoaded, hasStarted])

  // Configurar callback para escuchar cambios del reproductor del cancionero
  useEffect(() => {
    const handlePlaybackChange = (isPlaying: boolean) => {
      console.log('🎵 Cambio de reproducción del cancionero:', isPlaying)
      if (isPlaying) {
        // Si se está reproduciendo una canción del cancionero, pausar música de fondo
        console.log('⏸️ Pausando música de fondo por canción del cancionero')
        pauseBackgroundMusic()
      } else {
        // Si se pausó o detuvo la canción del cancionero, iniciar timer de 10 segundos
        console.log('⏰ Iniciando timer de 10 segundos para reanudar música de fondo')
        startTimer()
      }
    }

    setOnPlaybackChange(() => handlePlaybackChange)

    return () => {
      setOnPlaybackChange(() => {})
    }
  }, [pauseBackgroundMusic, startTimer, setOnPlaybackChange])

  return (
    <>
      <div
        aria-hidden
        style={{ position: 'fixed', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
      >
        {/* Elemento de audio invisible */}
        <audio ref={audioRef} />
      </div>
      
      {/* Indicador muy sutil de que la música está esperando interacción - solo como último recurso */}
      {waitingForInteraction && !hasStarted && (
        <div className="fixed bottom-4 right-4 z-50 opacity-0 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10 shadow-lg">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-white text-xs opacity-0">Música lista</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}