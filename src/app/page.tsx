'use client'

import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import WelcomeScreen from '../components/WelcomeScreen'
import MainPage from '../components/MainPage'
import ModalNavigation from '../components/ModalNavigation'
import ModalWrapper from '../components/ModalWrapper'
import Timeline from '../components/Timeline'
import Gallery from '../components/Gallery'
import Quiz from '../components/Quiz'
import Puzzle from '../components/Puzzle'
import Music from '../components/Music'
import Finale from '../components/Finale'
import BackgroundMusic from '../components/BackgroundMusic'

type ModalType = 'timeline' | 'gallery' | 'quiz' | 'puzzle' | 'music' | 'finale' | null

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentModal, setCurrentModal] = useState<ModalType>(null)

  const handleEnter = () => {
    setShowWelcome(false)
  }

  const handleOpenModal = (modalType: ModalType) => {
    setCurrentModal(modalType)
  }

  const handleCloseModal = () => {
    setCurrentModal(null)
  }

  const handleNavigateModal = (modalType: ModalType) => {
    setCurrentModal(modalType)
  }

  // Evitar cambios de layout/scroll que provocan parpadeo al abrir/cerrar modales
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (currentModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow || ''
    }
    return () => {
      document.body.style.overflow = previousOverflow || ''
    }
  }, [currentModal])

  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnter} />
  }

  return (
    <LayoutGroup>
      {/* Global background music - paused only on music section */}
      <BackgroundMusic paused={currentModal === 'music'} />
      {/* Main Page - mantener montado para evitar parpadeos al abrir modales */}
      <div aria-hidden={!!currentModal} className={currentModal ? 'pointer-events-none' : ''}>
        <MainPage onOpenModal={handleOpenModal} />
      </div>

      {/* Modal Navigation - shown when any modal is open */}
      <ModalNavigation 
        currentModal={currentModal}
        onNavigate={handleNavigateModal}
        onClose={handleCloseModal}
      />

      {/* Seed layout nodes for smooth morph (avoid flash) when opening first modal */}
      {!currentModal && (
        <div className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
          <motion.div
            layoutId="nav-shell"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 border border-white/20"
            aria-hidden
            style={{ opacity: 0 }}
          />
          <motion.div
            layoutId="nav-glow"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full"
            aria-hidden
            style={{
              opacity: 0,
              background: 'radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0))'
            }}
          />
        </div>
      )}

      {/* Timeline Modal */}
      <ModalWrapper 
        isOpen={currentModal === 'timeline'} 
        onClose={handleCloseModal}
        modalKey="timeline"
      >
        <Timeline />
      </ModalWrapper>


      {/* Gallery Modal */}
      <ModalWrapper 
        isOpen={currentModal === 'gallery'} 
        onClose={handleCloseModal}
        modalKey="gallery"
      >
        <Gallery />
      </ModalWrapper>

      {/* Quiz Modal */}
      <ModalWrapper 
        isOpen={currentModal === 'quiz'} 
        onClose={handleCloseModal}
        modalKey="quiz"
      >
        <Quiz />
      </ModalWrapper>

      {/* Puzzle Modal */}
      <ModalWrapper 
        isOpen={currentModal === 'puzzle'} 
        onClose={handleCloseModal}
        modalKey="puzzle"
      >
        <Puzzle />
      </ModalWrapper>

      {/* Music Modal */}
      <ModalWrapper 
        isOpen={currentModal === 'music'} 
        onClose={handleCloseModal}
        modalKey="music"
      >
        <Music />
      </ModalWrapper>

      {/* Finale Modal */}
      <ModalWrapper 
        isOpen={currentModal === 'finale'} 
        onClose={handleCloseModal}
        modalKey="finale"
      >
        <Finale />
      </ModalWrapper>
    </LayoutGroup>
  )
}