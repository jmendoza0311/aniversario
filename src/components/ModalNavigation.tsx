'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { X, Home, Clock, Camera, Heart, Puzzle, Music, Sparkles } from 'lucide-react'

interface ModalNavigationProps {
  currentModal: 'timeline' | 'gallery' | 'quiz' | 'puzzle' | 'music' | 'finale' | null
  onNavigate: (modal: 'timeline' | 'gallery' | 'quiz' | 'puzzle' | 'music' | 'finale' | null) => void
  onClose: () => void
}

const sections = [
  {
    id: 'timeline',
    label: 'Timeline',
    icon: Clock,
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'gallery',
    label: 'Galería',
    icon: Camera,
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'quiz',
    label: 'Quiz',
    icon: Heart,
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'puzzle',
    label: 'Puzzle',
    icon: Puzzle,
    color: 'from-violet-400 to-purple-500'
  },
  {
    id: 'music',
    label: 'Música',
    icon: Music,
    color: 'from-slate-400 to-purple-500'
  },
  {
    id: 'finale',
    label: 'Final',
    icon: Sparkles,
    color: 'from-yellow-400 to-orange-500'
  }
]

export default function ModalNavigation({ currentModal, onNavigate, onClose }: ModalNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Variantes para aparición secuencial de los ítems
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.03 * i, type: 'spring' as const, stiffness: 300, damping: 20 }
    }),
    exit: { opacity: 0, y: -6, scale: 0.95, transition: { duration: 0.15 } }
  }

  // Auto-minimiza a los 3 segundos cuando se expande (debe declararse antes de cualquier return)
  useEffect(() => {
    if (!isExpanded) return
    const timer = setTimeout(() => setIsExpanded(false), 3000)
    return () => clearTimeout(timer)
  }, [isExpanded, currentModal])

  // Solo visible cuando hay algún modal
  if (!currentModal) return null

  // Vista minimizada: solo icono de casa
  if (!isExpanded) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.button
          onClick={() => setIsExpanded(true)}
          className="relative p-2 sm:p-2.5 rounded-full text-white transition-all duration-200 touch-manipulation"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Abrir menú"
        >
          {/* Burbuja que se morfa al header */}
          <motion.div
            layoutId="nav-shell"
            className="absolute inset-0 -z-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl"
          />
          {/* Glow suave */}
          <motion.div
            layoutId="nav-glow"
            className="absolute inset-0 -z-20 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0))' }}
          />
          <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          {/* Anillo de ping al hacer click */}
          <AnimatePresence>
            <motion.span
              key="ping"
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-full border border-white/30"
            />
          </AnimatePresence>
        </motion.button>
      </motion.div>
    )
  }

  // Vista expandida: header completo
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-0"
    >
      <motion.div layoutId="nav-shell" className="relative bg-black/40 backdrop-blur-xl rounded-full px-2 sm:px-4 py-2 sm:py-3 border border-white/20 shadow-2xl">
        {/* Glow compartido para hacer el morph más agradable */}
        <motion.div layoutId="nav-glow" className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0))' }} />
        <div className="flex items-center space-x-1 sm:space-x-2 relative">
          {/* Home button */}
          <button
            onClick={() => { setIsExpanded(false); onClose() }}
            className="p-1.5 sm:p-2 rounded-full text-white hover:bg-white/10 transition-all duration-200 hover:scale-110 touch-manipulation"
            title="Volver al inicio"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Separator */}
          <div className="w-px h-5 sm:h-6 bg-white/20" />

          {/* Navigation Items */}
          <AnimatePresence initial={false}>
            {sections.map((section, i) => {
              const Icon = section.icon
              const isActive = currentModal === section.id
              return (
                <motion.button
                  key={section.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => { setIsExpanded(false); onNavigate(section.id as 'timeline' | 'gallery' | 'quiz' | 'puzzle' | 'music' | 'finale') }}
                  className={`relative p-1.5 sm:p-2 rounded-full font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 touch-manipulation transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={section.label}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {isActive && (
                    <motion.div
                      layoutId="activeModalNavItem"
                      className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-full`}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>

          {/* Separator */}
          <div className="w-px h-5 sm:h-6 bg-white/20" />

          {/* Close button */}
          <button
            onClick={() => { setIsExpanded(false); onClose() }}
            className="p-1.5 sm:p-2 rounded-full text-white hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 hover:scale-110 touch-manipulation"
            title="Cerrar"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}