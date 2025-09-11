'use client'

import { motion } from 'framer-motion'
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
  if (!currentModal) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 px-2 sm:px-0"
    >
      <div className="bg-black/40 backdrop-blur-xl rounded-full px-2 sm:px-4 py-2 sm:py-3 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Home button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-white hover:bg-white/10 transition-all duration-200 hover:scale-110 touch-manipulation"
            title="Volver al inicio"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Separator */}
          <div className="w-px h-5 sm:h-6 bg-white/20" />

          {/* Navigation Items */}
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = currentModal === section.id
            
            return (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id as 'timeline' | 'gallery' | 'quiz' | 'puzzle' | 'music' | 'finale')}
                className={`relative p-1.5 sm:p-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 flex items-center space-x-1 sm:space-x-2 touch-manipulation ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                title={section.label}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                
                {isActive && (
                  <motion.div
                    layoutId="activeModalNavItem"
                    className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-full`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )
          })}

          {/* Separator */}
          <div className="w-px h-5 sm:h-6 bg-white/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-white hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 hover:scale-110 touch-manipulation"
            title="Cerrar"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}