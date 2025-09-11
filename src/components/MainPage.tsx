'use client'

import { motion } from 'framer-motion'
import { Clock, Map, Camera, Heart, Puzzle, Music, Sparkles } from 'lucide-react'
import FloatingThemeToggle from './FloatingThemeToggle'

interface MainPageProps {
  onOpenModal: (modalType: 'timeline' | 'gallery' | 'quiz' | 'puzzle' | 'music' | 'finale') => void
}

const sections = [
  {
    id: 'timeline',
    title: 'Nuestra Historia',
    description: '7 años de momentos únicos en una línea de tiempo interactiva',
    icon: Clock,
    color: 'from-pink-500 via-rose-500 to-red-500',
    gradient: 'from-pink-900/20 to-rose-900/20',
    emoji: '⏰'
  },
  {
    id: 'gallery',
    title: 'Galería de Momentos',
    description: 'Fotos con mensajes secretos y filtros por categorías',
    icon: Camera,
    color: 'from-purple-500 via-indigo-500 to-blue-500',
    gradient: 'from-pink-900/20 to-rose-900/20',
    emoji: '📸'
  },
  {
    id: 'quiz',
    title: 'Test de Pareja',
    description: '¿Qué tanto nos conocemos? Descúbrelo con este divertido quiz',
    icon: Heart,
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    gradient: 'from-emerald-900/20 to-teal-900/20',
    emoji: '🎯'
  },
  {
    id: 'puzzle',
    title: 'Rompecabezas del Amor',
    description: 'Arma nuestros momentos especiales y descubre mensajes románticos',
    icon: Puzzle,
    color: 'from-violet-500 via-purple-500 to-indigo-500',
    gradient: 'from-pink-900/20 to-rose-900/20',
    emoji: '🧩'
  },
  {
    id: 'music',
    title: 'Cancionero del Amor',
    description: 'Las canciones que han marcado nuestra historia juntos',
    icon: Music,
    color: 'from-slate-500 via-purple-500 to-indigo-500',
    gradient: 'from-pink-900/20 to-rose-900/20',
    emoji: '🎵'
  },
  {
    id: 'finale',
    title: 'Mensaje Final',
    description: '7 años juntos... y una sorpresa especial esperándote',
    icon: Sparkles,
    color: 'from-yellow-500 via-orange-500 to-red-500',
    gradient: 'from-pink-900/20 to-rose-900/20',
    emoji: '✨'
  }
]

export default function MainPage({ onOpenModal }: MainPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      <FloatingThemeToggle />
      {/* Background stars animation */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 dark:bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 dark:from-yellow-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent">
              Nuestra Aventura
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed px-4">
            7 años de amor, risas, aventuras y momentos inolvidables. 
            Explora cada capítulo de nuestra historia juntos.
          </p>
        </motion.div>

        {/* Modal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-8xl mx-auto">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7 + index * 0.2,
                  type: "spring",
                  bounce: 0.1
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenModal(section.id as any)}
                className="group cursor-pointer relative overflow-hidden"
              >
                {/* Card Background */}
                <div className={`relative bg-gradient-to-br from-white/80 to-rose-50/80 dark:${section.gradient} backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-rose-200/50 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-rose-300/70 dark:hover:border-white/30 min-h-[280px] sm:min-h-[300px] flex flex-col justify-between`}>
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 2px)`,
                      backgroundSize: '40px 40px'
                    }} />
                  </div>

                  {/* Floating emoji */}
                  <motion.div
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 text-2xl sm:text-3xl md:text-4xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    {section.emoji}
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${section.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                      {section.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                      {section.description}
                    </p>

                    {/* CTA */}
                    <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${section.color} text-white font-semibold shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                      <span>Explorar</span>
                      <motion.div
                        className="ml-2"
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Haz clic en cualquier tarjeta para comenzar la exploración
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-pink-500 dark:bg-pink-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}