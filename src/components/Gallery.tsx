'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { photoData, categories, Photo } from '../data/galleryData'
import { X, Heart, Calendar, MessageCircle } from 'lucide-react'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return photoData
    return photoData.filter(photo => photo.category === selectedCategory)
  }, [selectedCategory])

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Galería de Momentos
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto px-4">
            Cada foto guarda un secreto, cada imagen cuenta una historia de nuestro amor
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 touch-manipulation ${
                selectedCategory === category.id
                  ? 'bg-white text-purple-900 shadow-lg shadow-white/20'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id 
                    ? 'bg-purple-200 text-purple-900' 
                    : 'bg-white/20 text-white'
                }`}>
                  {category.count}
                </span>
              </span>
              
              {/* Active indicator */}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Photo Grid - Masonry Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  layout: { type: "spring", bounce: 0.1 }
                }}
                className="break-inside-avoid mb-4 sm:mb-6"
              >
                <PhotoCard 
                  photo={photo} 
                  onClick={() => setSelectedPhoto(photo)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Results count */}
        <motion.div
          className="mt-8 sm:mt-12 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-purple-200">
            Mostrando {filteredPhotos.length} {filteredPhotos.length === 1 ? 'foto' : 'fotos'}
            {selectedCategory !== 'all' && (
              <span> de {categories.find(c => c.id === selectedCategory)?.label}</span>
            )}
          </p>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <PhotoLightbox
              photo={selectedPhoto}
              onClose={() => setSelectedPhoto(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

interface PhotoCardProps {
  photo: Photo
  onClick: () => void
}

function PhotoCard({ photo, onClick }: PhotoCardProps) {
  // const aspectRatio = photo.height / photo.width
  
  return (
    <motion.div
      className="group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 20,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        rotateY: 2,
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
    >
      {/* Photo with aspect ratio */}
      <div 
        className="w-full bg-gradient-to-br from-gray-300 to-gray-600 relative overflow-hidden"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        {/* Actual image */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = 'flex';
          }}
        />
        
        {/* Placeholder content (hidden by default) */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
          <div className="text-center text-gray-600">
            <div className="text-4xl mb-2">
              {
               photo.category === 'cumpleanos' ? '🎂' :
               photo.category === 'selfies' ? '🤳' : '⭐'}
            </div>
            <p className="text-sm font-medium">{photo.title}</p>
          </div>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
          {categories.find(c => c.id === photo.category)?.icon} {categories.find(c => c.id === photo.category)?.label}
        </div>
        
        {/* Hidden message indicator */}
        <motion.div
          className="absolute top-3 right-3 p-2 bg-pink-500/80 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <MessageCircle className="h-4 w-4" />
        </motion.div>
        
        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
          <div className="flex items-center text-sm opacity-90">
            <Calendar className="h-3 w-3 mr-1" />
            {photo.date}
          </div>
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl" />
    </motion.div>
  )
}

interface PhotoLightboxProps {
  photo: Photo
  onClose: () => void
}

function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
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
        className="relative z-10 max-w-6xl w-full max-h-[95vh] bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", bounce: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all duration-200 hover:scale-110"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid lg:grid-cols-2 gap-0 h-full min-h-[600px]">
          {/* Image Side */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-300 to-gray-600 flex items-center justify-center">
            {/* Actual image */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            
            {/* Placeholder content (hidden by default) */}
            <div className="text-center text-gray-600" style={{ display: 'none' }}>
              <div className="text-8xl mb-4">
                {
                 photo.category === 'cumpleanos' ? '🎂' :
                 photo.category === 'selfies' ? '🤳' : '⭐'}
              </div>
              <p className="text-2xl font-semibold">{photo.title}</p>
              <p className="text-lg opacity-75 mt-2">{photo.date}</p>
            </div>
            
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-black/20" />
            
            {/* Category badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-white font-semibold">
              {categories.find(c => c.id === photo.category)?.icon} {categories.find(c => c.id === photo.category)?.label}
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                {photo.title}
              </h2>

              {/* Date */}
              <div className="flex items-center text-purple-200 mb-8 text-lg">
                <Calendar className="h-5 w-5 mr-3" />
                {photo.date}
              </div>

              {/* Hidden Message */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <Heart className="h-5 w-5 mr-2 text-pink-400" />
                  <span className="text-pink-300 font-semibold">Mensaje Secreto:</span>
                </div>
                
                <motion.div
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg leading-relaxed text-purple-100 italic">
                    "{photo.hiddenMessage}"
                  </p>
                </motion.div>

                {/* Decorative hearts */}
                <div className="absolute -top-2 -right-2">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-pink-400 text-2xl"
                  >
                    💕
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
      </motion.div>
    </motion.div>
  )
}