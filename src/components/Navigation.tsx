'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, Map, Camera, Menu, X } from 'lucide-react'

const sections = [
  {
    id: 'timeline',
    label: 'Nuestra Historia',
    icon: Clock,
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'memory-map',
    label: 'Mapa de Recuerdos',
    icon: Map,
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'gallery',
    label: 'Galería de Momentos',
    icon: Camera,
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'quiz',
    label: 'Test de Pareja',
    icon: Heart,
    color: 'from-emerald-400 to-teal-500'
  }
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('timeline')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      
      // Update active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0
      }))

      const currentSection = sectionElements.find((section, index) => {
        const nextSection = sectionElements[index + 1]
        const scrollPos = window.scrollY + 200
        
        return scrollPos >= section.offset && 
               (!nextSection || scrollPos < nextSection.offset)
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block transition-all duration-300 ${
          isScrolled ? 'top-4' : 'top-8'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className={`bg-black/20 backdrop-blur-xl rounded-full px-2 py-2 border border-white/10 shadow-2xl transition-all duration-300 ${
          isScrolled ? 'bg-black/40' : 'bg-black/20'
        }`}>
          <div className="flex items-center space-x-1">
            {/* Logo */}
            <div className="px-4 py-2 flex items-center space-x-2">
              <Heart className="h-5 w-5 text-pink-400" />
              <span className="text-white font-semibold text-sm">7 Años</span>
            </div>
            
            {/* Navigation Items */}
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeNavItem"
                      className={`absolute inset-0 bg-gradient-to-r ${section.color} rounded-full -z-10`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className="fixed top-4 right-4 z-40 lg:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl text-white hover:bg-black/60 transition-all duration-300"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <motion.div
          className={`absolute top-16 right-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, scale: 0.8, transformOrigin: 'top right' }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            scale: isMenuOpen ? 1 : 0.8 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-2 min-w-[200px]">
            {/* Logo */}
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-400" />
                <span className="text-white font-semibold">7 Años de Amor</span>
              </div>
            </div>
            
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${section.color} text-white` 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>
      </motion.nav>

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-30 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        style={{
          scaleX: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}