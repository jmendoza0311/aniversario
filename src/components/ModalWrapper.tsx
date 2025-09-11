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
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={modalKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              bounce: 0.1,
              duration: 0.5
            }}
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