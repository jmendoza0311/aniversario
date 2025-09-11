'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { songs, Song } from '../data/musicData'

interface AudioContextType {
  // Estados
  currentSong: string | null
  isPlaying: boolean
  isLoading: boolean
  error: string | null
  progress: number
  duration: number
  volume: number
  
  // Información de la canción actual
  currentSongData: Song | null
  
  // Métodos
  play: (songId: string, audioSrc?: string) => void
  pause: () => void
  togglePlay: () => void
  stop: () => void
  setVolume: (volume: number) => void
  seek: (time: number) => void
  nextSong: () => void
  previousSong: () => void
  
  // Control del mini reproductor
  isMiniPlayerVisible: boolean
  showMiniPlayer: () => void
  hideMiniPlayer: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

// Mapeo de archivos (mismo que en useAudioPlayer)
const audioFileMap: Record<string, string> = {
  'perfect-ed-sheeran': 'Ed Sheeran - Perfect (Official Music Video).mp3',
  'una-vida-pasada-camilo': 'Camilo, Carin Leon - Una Vida Pasada (Official Video).mp3',
  'destino-o-casualidad-melendi': 'Melendi - Destino o Casualidad ft. Ha_Ash.mp3',
  'por-primera-vez-camilo': 'Camilo, Evaluna Montaner - Por Primera Vez (Official Video).mp3',
  'por-el-resto-de-mi-vida-andres-cepeda': 'Andrés Cepeda - Por El Resto De Mi Vida (Video Oficial).mp3',
  'prometo-fonseca': 'Fonseca - Prometo (LyricLetra).mp3',
  'doctorado-tony-dize': 'Tony Dize - El Doctorado [Official Video].mp3',
  'completamente-enamorados-chayanne': 'Chayanne - Completamente Enamorados (Video).mp3',
  'all-of-me-john-legend': 'John Legend - All of Me (Official Video).mp3',
  'thinking-out-loud-ed-sheeran': 'Ed Sheeran - Thinking Out Loud (Official Music Video).mp3',
  'a-thousand-years-christina-perri': 'Christina Perri - A Thousand Years [Official Music Video].mp3',
  'make-you-feel-my-love-adele': 'Make You Feel My Love.mp3',
  'just-the-way-you-are-bruno-mars': 'Bruno Mars - Just The Way You Are (Official Music Video).mp3',
  'marry-me-bruno-mars': 'Bruno Mars - Marry You (Official Lyric Video).mp3',
  'counting-stars-onerepublic': 'OneRepublic - Counting Stars.mp3'
}

// Función para verificar si un archivo de audio existe
const checkAudioFile = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentSongId = useRef<string | null>(null)

  // Obtener información de la canción actual
  const currentSongData = currentSong ? songs.find(s => s.id === currentSong) || null : null

  // Función para limpiar el audio actual
  const cleanup = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current.load()
    }
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
    setError(null)
  }

  const play = async (songId: string, audioSrc?: string) => {
    try {
      setError(null)
      setIsLoading(true)

      // Si es la misma canción, solo toggle play/pause
      if (currentSongId.current === songId && audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
        }
        setIsLoading(false)
        return
      }

      // Limpiar audio anterior
      cleanup()

      // Crear nuevo audio
      const audio = new Audio()
      audioRef.current = audio
      currentSongId.current = songId
      setCurrentSong(songId)

      // Determinar la fuente del audio con mapeo inteligente
      let src = audioSrc
      if (!src) {
        const mappedFile = audioFileMap[songId]
        src = mappedFile ? `/audio/${encodeURIComponent(mappedFile)}` : `/audio/${songId}.mp3`
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Mapeo de archivo:', {
            songId,
            mappedFile,
            finalSrc: src
          })
        }
        
        // Verificar si el archivo existe antes de asignarlo
        const fileExists = await checkAudioFile(src)
        if (!fileExists) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Archivo de audio no encontrado: ${src}`)
          }
          setError(`Archivo de audio no encontrado: ${mappedFile || songId}`)
          setIsLoading(false)
          return
        }
      } else {
        // Para archivos con ruta personalizada también verificar existencia
        const fileExists = await checkAudioFile(src)
        if (!fileExists) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Archivo de audio no encontrado: ${src}`)
          }
          setError(`Archivo de audio no encontrado: ${src}`)
          setIsLoading(false)
          return
        }
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Archivo de audio encontrado: ${src}`)
      }
      audio.src = src
      audio.volume = volume
      audio.preload = 'auto'

      // Event listeners
      audio.addEventListener('loadstart', () => setIsLoading(true))
      
      audio.addEventListener('canplaythrough', () => {
        setIsLoading(false)
        setDuration(audio.duration || 0)
      })

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration || 0)
      })

      audio.addEventListener('timeupdate', () => {
        setProgress(audio.currentTime || 0)
      })

      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setProgress(0)
      })

      audio.addEventListener('play', () => {
        setIsPlaying(true)
        setIsMiniPlayerVisible(true) // Mostrar mini reproductor cuando empiece a reproducir
      })
      
      audio.addEventListener('pause', () => setIsPlaying(false))

      audio.addEventListener('error', () => {
        // Manejo de errores sin logging problemático
        if (process.env.NODE_ENV === 'development') {
          console.warn('Audio error detected for song:', songId)
          if (audio.error) {
            console.warn('Error details:', {
              code: audio.error.code,
              message: audio.error.message || 'No message available'
            })
          }
        }
        
        let errorMessage = 'Error de reproducción: '
        if (audio.error) {
          switch (audio.error.code) {
            case 1: // MEDIA_ERR_ABORTED
              errorMessage += 'Reproducción abortada por el usuario'
              break
            case 2: // MEDIA_ERR_NETWORK
              errorMessage += 'Error de red al descargar el archivo'
              break
            case 3: // MEDIA_ERR_DECODE
              errorMessage += 'Error al decodificar el archivo de audio'
              break
            case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
              errorMessage += 'Archivo no encontrado o formato no compatible'
              break
            default:
              errorMessage += 'Error desconocido'
          }
        } else {
          errorMessage += 'No se pudo cargar el archivo de audio'
        }
        
        setError(errorMessage)
        setIsLoading(false)
        setIsPlaying(false)
      })

      // Intentar reproducir
      await audio.play()
      
    } catch (err) {
      console.error('Error al reproducir:', err)
      setError('Error al reproducir la canción. Posible problema con el archivo de audio.')
      setIsLoading(false)
      setIsPlaying(false)
    }
  }

  const pause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause()
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
    }
  }

  const stop = () => {
    cleanup()
    setCurrentSong(null)
    currentSongId.current = null
    setIsMiniPlayerVisible(false)
  }

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clampedVolume)
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setProgress(time)
    }
  }

  const showMiniPlayer = () => setIsMiniPlayerVisible(true)
  const hideMiniPlayer = () => setIsMiniPlayerVisible(false)

  // Función para ir a la siguiente canción
  const nextSong = () => {
    if (!currentSong) return
    
    const currentIndex = songs.findIndex(song => song.id === currentSong)
    if (currentIndex === -1) return
    
    const nextIndex = (currentIndex + 1) % songs.length // Navegación cíclica
    const nextSongData = songs[nextIndex]
    const audioSrc = nextSongData.audioFile
    play(nextSongData.id, audioSrc)
  }

  // Función para ir a la canción anterior
  const previousSong = () => {
    if (!currentSong) return
    
    const currentIndex = songs.findIndex(song => song.id === currentSong)
    if (currentIndex === -1) return
    
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1 // Navegación cíclica
    const prevSongData = songs[prevIndex]
    const audioSrc = prevSongData.audioFile
    play(prevSongData.id, audioSrc)
  }

  // Cleanup cuando el componente se desmonta
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [])

  const value = {
    currentSong,
    isPlaying,
    isLoading,
    error,
    progress,
    duration,
    volume,
    currentSongData,
    play,
    pause,
    togglePlay,
    stop,
    setVolume,
    seek,
    nextSong,
    previousSong,
    isMiniPlayerVisible,
    showMiniPlayer,
    hideMiniPlayer
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudioContext() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
}
