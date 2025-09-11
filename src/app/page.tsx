'use client'

import { useState } from 'react'
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

  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnter} />
  }

  return (
    <>
      {/* Global background music - paused only on music section */}
      <BackgroundMusic paused={currentModal === 'music'} />
      {/* Main Page - shown when no modal is open */}
      {!currentModal && <MainPage onOpenModal={handleOpenModal} />}

      {/* Modal Navigation - shown when any modal is open */}
      <ModalNavigation 
        currentModal={currentModal}
        onNavigate={handleNavigateModal}
        onClose={handleCloseModal}
      />

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
    </>
  )
}