'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
    >
      {/* Background glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDark 
            ? 'bg-gradient-to-r from-blue-400 to-indigo-500' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500'
        }`}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Icon container */}
      <div className="relative z-10 w-8 h-8 flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: isDark ? 0 : 180,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-blue-200" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-200" />
          )}
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-blue-300' : 'bg-yellow-300'
            }`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-10, -20, -10]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.button>
  )
}