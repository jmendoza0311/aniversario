'use client'

import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

export default function FloatingThemeToggle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-6 right-6 z-40"
    >
      <ThemeToggle />
    </motion.div>
  )
}