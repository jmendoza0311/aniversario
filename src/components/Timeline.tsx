'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineData, TimelineItem } from '../data/timelineData'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)
  const [showIntro, setShowIntro] = useState<boolean>(true)
  const [showTimelineView, setShowTimelineView] = useState<boolean>(false)
  const [showSequentialModal, setShowSequentialModal] = useState<boolean>(false)
  const [currentModalIndex, setCurrentModalIndex] = useState<number>(0)

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false)
        setShowSequentialModal(true)
        setCurrentModalIndex(0)
        setSelectedItem(timelineData[0])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showIntro])

  const handleImageClick = (item: TimelineItem) => {
    const index = timelineData.findIndex(data => data.year === item.year)
    setCurrentModalIndex(index)
    setSelectedItem(item)
  }

  const handleNextYear = () => {
    if (currentModalIndex < timelineData.length - 1) {
      const newIndex = currentModalIndex + 1
      setCurrentModalIndex(newIndex)
      setSelectedItem(timelineData[newIndex])
    } else {
      setSelectedItem(null)
      setShowSequentialModal(false)
      setShowTimelineView(true)
    }
  }

  const handlePrevYear = () => {
    if (currentModalIndex > 0) {
      const newIndex = currentModalIndex - 1
      setCurrentModalIndex(newIndex)
      setSelectedItem(timelineData[newIndex])
    }
  }

  const handleModalClose = () => {
    setSelectedItem(null)
    if (showSequentialModal) {
      setShowSequentialModal(false)
      setShowTimelineView(true)
    }
  }

  // Intro Screen
  if (showIntro) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-8 font-dancing-script italic"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Nuestra Línea de Tiempo
          </motion.h1>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </motion.div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-white font-dancing-script italic">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Nuestra Historia
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 px-4 font-dancing-script italic">
            7 años de momentos que nos han definido
          </p>
        </motion.div>

        {/* Show timeline only after sequential modal */}
        {showTimelineView && (
          <>
            {/* Desktop Timeline - Horizontal */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Timeline Line */}
                <motion.div
                  className="absolute left-0 top-1/2 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Timeline Items */}
                <div className="relative grid grid-cols-8 gap-8">
                  {timelineData.map((item, index) => (
                    <TimelinePoint
                      key={item.year}
                      item={item}
                      index={index}
                      isHovered={hoveredIndex === index}
                      onHover={() => setHoveredIndex(index)}
                      onLeave={() => setHoveredIndex(null)}
                      onImageClick={() => handleImageClick(item)}
                      layout="horizontal"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Timeline - Vertical */}
            <div className="lg:hidden">
              <div className="relative">
                {/* Timeline Line */}
                <motion.div
                  className="absolute left-6 sm:left-8 top-0 h-full w-0.5 sm:w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Timeline Items */}
                <div className="space-y-8 sm:space-y-12">
                  {timelineData.map((item, index) => (
                    <TimelinePoint
                      key={item.year}
                      item={item}
                      index={index}
                      isHovered={hoveredIndex === index}
                      onHover={() => setHoveredIndex(index)}
                      onLeave={() => setHoveredIndex(null)}
                      onImageClick={() => handleImageClick(item)}
                      layout="vertical"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sequential Modal or Regular Modal */}
        <AnimatePresence>
          {selectedItem && (
            <NavigableModal
              item={selectedItem}
              currentIndex={currentModalIndex}
              isSequential={showSequentialModal}
              onClose={handleModalClose}
              onNext={handleNextYear}
              onPrev={handlePrevYear}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

interface TimelinePointProps {
  item: TimelineItem
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onImageClick: () => void
  layout: 'horizontal' | 'vertical'
}

function TimelinePoint({ item, index, isHovered, onHover, onLeave, onImageClick, layout }: TimelinePointProps) {
  const isAbove = layout === 'horizontal' && index % 2 === 0
  const isSpecial = item.isSpecial

  return (
    <motion.div
      className={`relative flex ${
        layout === 'horizontal'
          ? `flex-col ${isAbove ? 'items-center' : 'items-center'}`
          : 'items-center space-x-8'
      }`}
      initial={{ opacity: 0, y: layout === 'horizontal' ? (isAbove ? -50 : 50) : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline Point */}
      <motion.div
        className={`relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 sm:border-4 border-white shadow-2xl ${
          layout === 'horizontal' ? 'order-2' : 'flex-shrink-0'
        }`}
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered
            ? '0 0 30px rgba(168, 85, 247, 0.6)'
            : '0 10px 25px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`h-full w-full rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs sm:text-sm font-bold text-white">{item.year}</span>
        </motion.div>
      </motion.div>

      {/* Content Card */}
      <motion.div
        className={`group cursor-pointer ${
          layout === 'horizontal'
            ? `${isAbove ? 'order-1 mb-8' : 'order-3 mt-8'} max-w-xs`
            : 'flex-1'
        }`}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.03 : 1,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 25,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onClick={onImageClick}
      >
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white/10 p-4 sm:p-6 backdrop-blur-sm transition-all duration-600 ease-out hover:bg-white/20 hover:shadow-2xl hover:shadow-pink-500/20">
          {/* Image */}
          <motion.div 
            className="mb-3 sm:mb-4 overflow-hidden rounded-md sm:rounded-lg cursor-pointer touch-manipulation"
            onClick={onImageClick}
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.06,
              transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            whileTap={{ 
              scale: 0.96,
              transition: { duration: 0.2 }
            }}
          >
            <div className="relative h-32 sm:h-40 md:h-48 w-full overflow-hidden">
              {item.video && item.video.trim() !== '' ? (
                <video
                  src={item.video}
                  className="w-full h-full object-cover transition-all duration-300"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={(e) => {
                    console.log('Video error:', e)
                    const videoElement = e.currentTarget
                    const imgElement = videoElement.parentElement?.querySelector('img')
                    videoElement.style.display = 'none'
                    if (imgElement) imgElement.style.display = 'block'
                  }}
                />
              ) : null}
              {(!item.video || item.video.trim() === '') ? (
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.year}`}
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : null}
              {/* Click indicator */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">
                  Clic para ampliar
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center">
            <h3 className={`mb-2 text-lg sm:text-xl font-bold font-dancing-script italic ${isSpecial ? 'bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text text-transparent' : 'text-white'}`}>
              {item.title}
            </h3>
            <p className={`text-xs sm:text-sm font-dancing-script italic ${isSpecial ? 'text-yellow-200 font-semibold' : 'text-gray-300'} leading-relaxed`}>
              {item.description}
            </p>
            
            {/* Special sparkle effect for last item */}
            {isSpecial && (
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-yellow-300 to-pink-400 opacity-80 blur-sm" />
              </motion.div>
            )}
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

interface NavigableModalProps {
  item: TimelineItem
  currentIndex: number
  isSequential: boolean
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function NavigableModal({ item, currentIndex, isSequential, onClose, onNext, onPrev }: NavigableModalProps) {
  console.log('ImageModal rendering:', item.year, item.title)
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={isSequential ? undefined : onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative z-10 w-[95vw] h-[95vh] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Controls */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {isSequential && currentIndex > 0 && (
            <button
              onClick={onPrev}
              className="p-3 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <button
            onClick={isSequential ? onNext : onClose}
            className="p-3 bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-200 hover:scale-110"
          >
            {isSequential && currentIndex < timelineData.length - 1 ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <X className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Progress Indicator */}
        {isSequential && (
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            {timelineData.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-10 rounded-full transition-all duration-500 ${
                  index <= currentIndex ? 'bg-gradient-to-r from-pink-400 to-purple-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
          {/* Image Side */}
          <motion.div 
            className="relative h-[50vh] lg:h-full overflow-hidden"
            key={`image-${item.year}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {item.video && item.video.trim() !== '' ? (
              <video
                src={item.video}
                controls
                className="w-full h-full object-contain"
                poster={item.image}
                onError={(e) => {
                  console.log('Modal video error:', e)
                  const videoElement = e.currentTarget
                  videoElement.style.display = 'none'
                }}
              />
            ) : (
              <Image
                src={item.image}
                alt={`${item.title} - ${item.year}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}
          </motion.div>

          {/* Content Side */}
          <div className="p-6 lg:p-8 flex flex-col justify-center h-[45vh] lg:h-full">
            <motion.div
              key={`content-${item.year}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
            >
              {/* Year Badge */}
              <motion.div 
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 bg-gradient-to-r ${item.color} text-white`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {item.year}
              </motion.div>

              {/* Title */}
              <motion.h2 
                className={`text-3xl lg:text-4xl font-bold mb-4 font-dancing-script italic ${
                  item.isSpecial 
                    ? 'bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {item.title}
              </motion.h2>

              {/* Description */}
              <motion.p 
                className={`text-lg leading-relaxed font-dancing-script italic ${
                  item.isSpecial ? 'text-yellow-200' : 'text-gray-300'
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {item.description}
              </motion.p>

              {/* Special effects for last item */}
              {item.isSpecial && (
                <motion.div
                  className="mt-6 flex items-center space-x-2"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-pink-400" />
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient border */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
      </motion.div>
    </motion.div>
  )
}