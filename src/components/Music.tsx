'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { songs, Song } from '../data/musicData'
import { Play, Pause, ExternalLink, Heart, Music2, Volume2, AlertCircle } from 'lucide-react'
import { useAudioContext } from '../contexts/AudioContext'

export default function Music() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  
  const audioContext = useAudioContext()

  const handlePlaySong = (songId: string) => {
    const song = songs.find(s => s.id === songId)
    const audioSrc = song?.audioFile
    audioContext.play(songId, audioSrc)
  }

  const openSongModal = (song: Song) => {
    setSelectedSong(song)
  }

  const closeSongModal = () => {
    setSelectedSong(null)
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-800 via-purple-900 to-indigo-900 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="text-6xl mb-6">🎵</div>
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Cancionero del Amor
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto px-4">
            Las canciones que han marcado nuestra historia juntos. Cada melodía, un recuerdo único.
          </p>
        </motion.div>



        {/* Songs List */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  y: -20,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: {
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                className="group"
              >
                <SongCard
                  song={song}
                  isPlaying={audioContext.currentSong === song.id && audioContext.isPlaying}
                  isLoading={audioContext.currentSong === song.id && audioContext.isLoading}
                  error={audioContext.currentSong === song.id ? audioContext.error : null}
                  onPlay={() => handlePlaySong(song.id)}
                  onOpenDetails={() => openSongModal(song)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


        {/* Song Detail Modal */}
        <AnimatePresence>
          {selectedSong && (
            <SongModal
              song={selectedSong}
              isPlaying={audioContext.currentSong === selectedSong.id && audioContext.isPlaying}
              isLoading={audioContext.currentSong === selectedSong.id && audioContext.isLoading}
              error={audioContext.currentSong === selectedSong.id ? audioContext.error : null}
              onPlay={() => handlePlaySong(selectedSong.id)}
              onClose={closeSongModal}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

interface SongCardProps {
  song: Song
  isPlaying: boolean
  isLoading?: boolean
  error?: string | null
  onPlay: () => void
  onOpenDetails: () => void
}

function SongCard({ song, isPlaying, isLoading, error, onPlay, onOpenDetails }: SongCardProps) {

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-500 ease-out group cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20"
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        rotateY: 1,
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.2 }
      }}
      onClick={onOpenDetails}
    >
      <div className="flex items-center space-x-6">
        {/* Album Cover */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-600 shadow-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <Music2 className="h-8 w-8" />
            </div>
          </div>
          
          {/* Play Button Overlay */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onPlay()
            }}
            className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 border-2 border-white border-t-transparent rounded-full"
              />
            ) : isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </motion.button>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-white mb-1 truncate group-hover:text-purple-200 transition-colors">
                {song.title}
              </h3>
              <p className="text-purple-200 truncate">
                {song.artist} • {song.album} ({song.year})
              </p>
            </div>
            
          </div>

          {/* Explanation */}
          <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
            {song.explanation}
          </p>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-xs mb-3">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Streaming Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {song.links.youtube && (
                <motion.a
                  href={song.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors text-xs"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>YouTube</span>
                </motion.a>
              )}
              {song.links.spotify && (
                <motion.a
                  href={song.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors text-xs"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Spotify</span>
                </motion.a>
              )}
            </div>
            
            <div className="text-xs text-purple-300">
              {song.genre}
            </div>
          </div>
        </div>

        {/* Wave Animation */}
        {isPlaying && <WaveAnimation color={song.color} />}
      </div>
    </motion.div>
  )
}

interface SongModalProps {
  song: Song
  isPlaying: boolean
  isLoading?: boolean
  error?: string | null
  onPlay: () => void
  onClose: () => void
}

function SongModal({ song, isPlaying, isLoading, error, onPlay, onClose }: SongModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 max-w-4xl w-full max-h-[90vh] bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", bounce: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Album Art Side */}
          <div className={`relative bg-gradient-to-br ${song.color} p-8 flex items-center justify-center min-h-[400px] lg:min-h-[600px]`}>
            <div className="text-center">
              <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto rounded-3xl bg-white/20 backdrop-blur-sm shadow-2xl mb-6 flex items-center justify-center">
                <Music2 className="h-24 w-24 lg:h-32 lg:w-32 text-white/80" />
              </div>
              
              <motion.button
                onClick={onPlay}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-400 ease-out hover:shadow-lg hover:shadow-white/25"
                whileHover={{ 
                  scale: 1.15,
                  rotate: 360,
                  transition: {
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
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
                    className="h-8 w-8 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : isPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </motion.button>
            </div>

            {isPlaying && <WaveAnimation color="from-white/20 to-white/40" overlay />}
          </div>

          {/* Content Side */}
          <div className="p-8 lg:p-12 text-white overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Song info */}
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">{song.title}</h2>
              <p className="text-purple-200 text-lg mb-1">{song.artist}</p>
              <p className="text-purple-300 text-sm mb-6">{song.album} ({song.year}) • {song.genre}</p>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Explanation */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-pink-400" />
                  Por qué es especial:
                </h3>
                <p className="text-purple-100 leading-relaxed mb-4">
                  {song.explanation}
                </p>
              </div>

              {/* Memory */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  Nuestro recuerdo:
                </h3>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
                  <p className="text-white leading-relaxed italic">
                    {song.memory}
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center space-x-4">
                {song.links.youtube && (
                  <motion.a
                    href={song.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>YouTube</span>
                  </motion.a>
                )}
                {song.links.spotify && (
                  <motion.a
                    href={song.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Spotify</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all duration-200"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  )
}

interface WaveAnimationProps {
  color: string
  overlay?: boolean
}

function WaveAnimation({ color, overlay }: WaveAnimationProps) {
  return (
    <div className={`absolute ${overlay ? 'inset-0' : 'right-6 top-1/2 transform -translate-y-1/2'} flex items-center justify-center`}>
      <div className="flex items-end space-x-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1 bg-gradient-to-t ${color} rounded-full`}
            animate={{
              height: [8, 24, 8, 16, 8],
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
      <div className="flex items-center space-x-2 ml-4">
        <Volume2 className="h-4 w-4 text-white/60" />
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/60 text-xs"
        >
        </motion.div>
      </div>
    </div>
  )
}