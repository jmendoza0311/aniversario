'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  modalKey: string
}

export default function ModalWrapper({ isOpen, onClose, children, modalKey }: ModalWrapperProps) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <motion.div
          key={modalKey}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-40 bg-black/60"
          onClick={onClose}
        >
          {/* Cabecera estética del modal (sin layoutId para evitar flicker de morph) */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl h-12 sm:h-14 rounded-full bg-black/35 border border-white/15"
            aria-hidden
          />
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl h-12 sm:h-14 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(255,255,255,0))' }}
            aria-hidden
          />
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.995 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26, mass: 0.7 }}
            className="absolute inset-0 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}