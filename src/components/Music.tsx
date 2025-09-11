'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { songs, categories, moods, Song } from '../data/musicData'
import { Play, Pause, ExternalLink, Heart, Music2, Volume2, Filter } from 'lucide-react'
import { Button } from './ui/button'

export default function Music() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [playingSong, setPlayingSong] = useState<string | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredSongs = selectedCategory === 'all' 
    ? songs 
    : songs.filter(song => song.category === selectedCategory)

  const handlePlaySong = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null)
    } else {
      setPlayingSong(songId)
    }
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

        {/* Filters Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </motion.div>

        {/* Category Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-12 overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-2xl transition-all duration-300 text-center ${
                      selectedCategory === category.id
                        ? 'bg-white text-purple-900 shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-semibold mb-1">{category.name}</div>
                    <div className="text-xs opacity-70">{category.count} {category.count === 1 ? 'canción' : 'canciones'}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Songs List */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredSongs.map((song, index) => (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <SongCard
                  song={song}
                  isPlaying={playingSong === song.id}
                  onPlay={() => handlePlaySong(song.id)}
                  onOpenDetails={() => openSongModal(song)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Results counter */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-purple-200">
            Mostrando {filteredSongs.length} {filteredSongs.length === 1 ? 'canción' : 'canciones'}
            {selectedCategory !== 'all' && (
              <span> de {categories.find(c => c.id === selectedCategory)?.name}</span>
            )}
          </p>
        </motion.div>

        {/* Song Detail Modal */}
        <AnimatePresence>
          {selectedSong && (
            <SongModal
              song={selectedSong}
              isPlaying={playingSong === selectedSong.id}
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
  onPlay: () => void
  onOpenDetails: () => void
}

function SongCard({ song, isPlaying, onPlay, onOpenDetails }: SongCardProps) {
  const mood = moods.find(m => m.id === song.mood)

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
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
          >
            {isPlaying ? (
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
            
            {/* Mood indicator */}
            <div className={`flex items-center space-x-1 ${mood?.color}`}>
              <span className="text-sm">{mood?.icon}</span>
              <span className="text-xs font-medium">{mood?.name}</span>
            </div>
          </div>

          {/* Explanation */}
          <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
            {song.explanation}
          </p>

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
  onPlay: () => void
  onClose: () => void
}

function SongModal({ song, isPlaying, onPlay, onClose }: SongModalProps) {
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
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
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
          Reproduciendo...
        </motion.div>
      </div>
    </div>
  )
}