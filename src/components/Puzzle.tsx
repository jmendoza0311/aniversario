'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { puzzleImages, difficultySettings, getRandomCompletionMessages, PuzzleImage } from '../data/puzzleData'
import { Shuffle, RotateCcw, Trophy, Heart, Sparkles, Clock, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'

type GameState = 'select-image' | 'select-difficulty' | 'playing' | 'playing-jigsaw' | 'completed'
type Difficulty = 'easy' | 'medium' | 'hard'
type PuzzleMode = 'sliding' | 'jigsaw'

interface PuzzlePiece {
  id: number
  isEmpty?: boolean
}

interface JigsawPiece {
  id: number
  row: number
  col: number
  path: string
  x: number // porcentaje 0-100
  y: number // porcentaje 0-100
  correctX: number // porcentaje
  correctY: number // porcentaje
  placed: boolean
}

export default function Puzzle() {
  const [gameState, setGameState] = useState<GameState>('select-image')
  const [selectedImage, setSelectedImage] = useState<PuzzleImage | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [jigsawPieces, setJigsawPieces] = useState<JigsawPiece[]>([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [completionTime, setCompletionTime] = useState<number>(0)
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null)
  const [touchStartPos, setTouchStartPos] = useState<{x: number, y: number} | null>(null)
  const [, setPuzzleMode] = useState<PuzzleMode>('sliding')
  const [showModeModal, setShowModeModal] = useState(false)

  // Jigsaw drag state
  const boardRef = useRef<HTMLDivElement | null>(null)
  const [draggingJigsawId, setDraggingJigsawId] = useState<number | null>(null)
  const [dragOffset, setDragOffset] = useState<{dx: number, dy: number} | null>(null)

  const totalPieces = difficultySettings[difficulty].pieces
  const gridSize = Math.sqrt(totalPieces)

  // Initialize puzzle
  const initializePuzzle = useCallback(() => {
    const newPieces = createInitialPieces()
    // Shuffle pieces and set them to state
    const shuffledPieces = shufflePuzzle(newPieces)
    setPieces(shuffledPieces)
    setMoves(0)
    setStartTime(Date.now())
  }, [totalPieces])

  // Create ordered pieces (solved state)
  const createInitialPieces = useCallback((): PuzzlePiece[] => {
    const orderedPieces: PuzzlePiece[] = []
    for (let i = 0; i < totalPieces - 1; i++) {
      orderedPieces.push({ id: i })
    }
    orderedPieces.push({ id: -1, isEmpty: true })
    return orderedPieces
  }, [totalPieces])

  // Reset to solved state (original positions)
  const resetToOriginal = () => {
    const ordered = createInitialPieces()
    setPieces(ordered)
    setMoves(0)
    setStartTime(Date.now())
  }

  // Shuffle puzzle pieces
  const shufflePuzzle = (puzzlePieces: PuzzlePiece[]) => {
    const shuffled = [...puzzlePieces]
    
    // Perform random swaps to ensure solvable state (reduced iterations for better performance)
    const shuffleCount = Math.max(100, gridSize * gridSize * 2) // Adaptive shuffle count
    
    for (let i = 0; i < shuffleCount; i++) {
      const emptyIndex = shuffled.findIndex(p => p.isEmpty)
      const validMoves = getValidMoves(emptyIndex, gridSize)
      
      if (validMoves.length > 0) {
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
        swapPieces(shuffled, emptyIndex, randomMove)
      }
    }
    
    return shuffled
  }

  // Get valid moves for empty space
  const getValidMoves = (emptyIndex: number, size: number) => {
    const moves = []
    const row = Math.floor(emptyIndex / size)
    const col = emptyIndex % size
    
    if (row > 0) moves.push(emptyIndex - size) // Up
    if (row < size - 1) moves.push(emptyIndex + size) // Down
    if (col > 0) moves.push(emptyIndex - 1) // Left
    if (col < size - 1) moves.push(emptyIndex + 1) // Right
    
    return moves
  }

  // Swap two pieces
  const swapPieces = (puzzlePieces: PuzzlePiece[], index1: number, index2: number) => {
    const temp = puzzlePieces[index1]
    puzzlePieces[index1] = puzzlePieces[index2]
    puzzlePieces[index2] = temp
    // Note: Array index already represents current position, no need to update currentPosition field
  }

  // Handle piece click/move
  const handlePieceClick = (pieceIndex: number) => {
    const emptyIndex = pieces.findIndex(p => p.isEmpty)
    const validMoves = getValidMoves(emptyIndex, gridSize)
    
    if (validMoves.includes(pieceIndex)) {
      const newPieces = [...pieces]
      swapPieces(newPieces, emptyIndex, pieceIndex)
      setPieces(newPieces)
      setMoves(prev => prev + 1)
      
      // Check if puzzle is completed
      if (isPuzzleCompleted(newPieces)) {
        setCompletionTime(Date.now() - startTime)
        setGameState('completed')
      }
    }
  }

  // Check if puzzle is completed
  const isPuzzleCompleted = (puzzlePieces: PuzzlePiece[]) => {
    // Check if each piece is in its correct position by comparing piece.id with expected id at that position
    return puzzlePieces.every((piece, index) => {
      if (piece.isEmpty) {
        // Empty piece should be at the last position (bottom-right)
        return index === totalPieces - 1
      } else {
        // Regular piece should have id matching its current index
        return piece.id === index
      }
    })
  }

  // Handle drag start
  const handleDragStart = (e: React.DragEvent | MouseEvent | TouchEvent | PointerEvent, pieceIndex: number) => {
    setDraggedPiece(pieceIndex)
    if ('dataTransfer' in e && e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
    }
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent, _: number) => {
    e.preventDefault()
    if (draggedPiece !== null) {
      handlePieceClick(draggedPiece)
      setDraggedPiece(null)
    }
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, pieceIndex: number) => {
    const touch = e.touches[0]
    setTouchStartPos({ x: touch.clientX, y: touch.clientY })
    setDraggedPiece(pieceIndex)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (draggedPiece !== null && touchStartPos) {
      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartPos.x
      const deltaY = touch.clientY - touchStartPos.y
      const threshold = 50 // minimum swipe distance
      
      // Simply try to move the piece - handlePieceClick already validates if move is legal
      if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
        handlePieceClick(draggedPiece)
      }
      
      setDraggedPiece(null)
      setTouchStartPos(null)
    }
  }

  // Start new game
  const _startGame = () => {
    setGameState('playing')
  }

  // Ensure puzzle initializes whenever we enter the playing state
  useEffect(() => {
    if (gameState === 'playing') {
      initializePuzzle()
    }
  }, [gameState, initializePuzzle])

  // Generate jigsaw connectors in consistent pairs
  const generateJigsawPieces = useCallback((): JigsawPiece[] => {
    const pieces: JigsawPiece[] = []
    const connectors: number[][][] = [] // [row][col][4]
    const knobSize = 12

    for (let r = 0; r < gridSize; r++) {
      connectors[r] = []
      for (let c = 0; c < gridSize; c++) {
        const top = r === 0 ? 0 : -connectors[r-1][c][2]
        const left = c === 0 ? 0 : -connectors[r][c-1][1]
        const bottom = r === gridSize - 1 ? 0 : (Math.random() > 0.5 ? 1 : -1)
        const right = c === gridSize - 1 ? 0 : (Math.random() > 0.5 ? 1 : -1)
        connectors[r][c] = [top, right, bottom, left]
      }
    }

    const buildPath = (r: number, c: number) => {
      const unit = 100 / gridSize
      const x0 = c * unit
      const y0 = r * unit
      const size = unit
      const k = (size * knobSize) / 100

      const [top, right, bottom, left] = connectors[r][c]

      const knob = (dir: 1 | -1, horizontal: boolean, x: number, y: number) => {
        if (horizontal) {
          return `C ${x + size/3},${y} ${x + size/3},${y - dir*k} ${x + size/2},${y - dir*k} ` +
                 `C ${x + 2*size/3},${y - dir*k} ${x + 2*size/3},${y} ${x + size},${y}`
        }
        return `C ${x},${y + size/3} ${x - dir*k},${y + size/3} ${x - dir*k},${y + size/2} ` +
               `C ${x - dir*k},${y + 2*size/3} ${x},${y + 2*size/3} ${x},${y + size}`
      }

      let d = `M ${x0},${y0} `
      // top edge
      if (top === 0) {
        d += `L ${x0 + size},${y0} `
      } else {
        d += knob(top as 1 | -1, true, x0, y0) + ' '
      }
      // right edge
      if (right === 0) {
        d += `L ${x0 + size},${y0 + size} `
      } else {
        d += knob(right as 1 | -1, false, x0 + size, y0) + ' '
      }
      // bottom edge
      if (bottom === 0) {
        d += `L ${x0},${y0 + size} `
      } else {
        // reverse knob horizontally
        const y = y0 + size
        const x = x0
        const dir = -bottom as 1 | -1
        d += `C ${x + 2*size/3},${y} ${x + 2*size/3},${y - dir*k} ${x + size/2},${y - dir*k} ` +
             `C ${x + size/3},${y - dir*k} ${x + size/3},${y} ${x},${y} `
      }
      // left edge
      if (left === 0) {
        d += `L ${x0},${y0} Z`
      } else {
        // reverse vertical knob
        const x = x0
        const y = y0
        const dir = -left as 1 | -1
        d += `C ${x},${y + 2*size/3} ${x - dir*k},${y + 2*size/3} ${x - dir*k},${y + size/2} ` +
             `C ${x - dir*k},${y + size/3} ${x},${y + size/3} ${x},${y} Z`
      }
      return d
    }

    let id = 0
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const correctX = (c * 100) / (gridSize - 1)
        const correctY = (r * 100) / (gridSize - 1)
        pieces.push({
          id: id++,
          row: r,
          col: c,
          path: buildPath(r, c),
          x: correctX,
          y: correctY,
          correctX,
          correctY,
          placed: false
        })
      }
    }
    return pieces
  }, [gridSize])

  const initializeJigsaw = useCallback(() => {
    const pieces = generateJigsawPieces()
    const randomized = randomizeJigsawPositions(pieces)
    setJigsawPieces(randomized)
    setMoves(0)
    setStartTime(Date.now())
  }, [generateJigsawPieces])

  // Initialize jigsaw when entering Jigsaw mode
  useEffect(() => {
    if (gameState === 'playing-jigsaw') {
      initializeJigsaw()
    }
  }, [gameState, initializeJigsaw])

  const randomizeJigsawPositions = (arr: JigsawPiece[]) => {
    // Distribuir fichas en un anillo alrededor del cuadro (fuera del área central 10%-90%)
    return arr.map(p => {
      const side = Math.floor(Math.random() * 4) // 0 top,1 right,2 bottom,3 left
      const span = 88 // aprox. borde externo del inset-6
      const t = Math.random() * span + 6
      let x = p.correctX
      let y = p.correctY
      if (side === 0) { x = t; y = 2 }
      if (side === 1) { x = 98; y = t }
      if (side === 2) { x = t; y = 98 }
      if (side === 3) { x = 2; y = t }
      return { ...p, x, y, placed: false }
    })
  }

  const resetJigsawToOriginal = () => {
    const solved = generateJigsawPieces().map(p => ({
      ...p,
      x: p.correctX,
      y: p.correctY,
      placed: true
    }))
    setJigsawPieces(solved)
    setMoves(0)
    setStartTime(Date.now())
  }

  const onJigsawPointerDown = (e: React.PointerEvent, id: number) => {
    if (!boardRef.current) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    const rect = boardRef.current.getBoundingClientRect()
    const piece = jigsawPieces.find(p => p.id === id)
    if (!piece) return
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    setDraggingJigsawId(id)
    setDragOffset({ dx: px - piece.x, dy: py - piece.y })
  }

  const onJigsawPointerMove = (e: React.PointerEvent) => {
    if (draggingJigsawId === null || !boardRef.current || !dragOffset) return
    const rect = boardRef.current.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    setJigsawPieces(prev => prev.map(p => p.id === draggingJigsawId ? { ...p, x: px - dragOffset.dx, y: py - dragOffset.dy } : p))
  }

  const onJigsawPointerUp = () => {
    if (draggingJigsawId === null) return
    const threshold = 4
    let placedThisMove = false
    setJigsawPieces(prev => {
      const next = prev.map(p => {
        if (p.id !== draggingJigsawId) return p
        const close = Math.abs(p.x - p.correctX) <= threshold && Math.abs(p.y - p.correctY) <= threshold
        if (close) {
          placedThisMove = true
          return { ...p, x: p.correctX, y: p.correctY, placed: true }
        }
        return p
      })
      // Asegurar que las piezas NO encajadas queden por encima (al final del array)
      const ordered = [...next].sort((a, b) => {
        if (a.placed === b.placed) return 0
        return a.placed ? -1 : 1
      })
      const allPlaced = ordered.every(p => p.placed)
      if (allPlaced) {
        setCompletionTime(Date.now() - startTime)
        setGameState('completed')
      }
      return ordered
    })
    if (placedThisMove) setMoves(m => m + 1)
    setDraggingJigsawId(null)
    setDragOffset(null)
  }

  // Reset game
  const resetGame = () => {
    setGameState('select-image')
    setSelectedImage(null)
    setPieces([])
    setMoves(0)
  }

  // Select image screen
  if (gameState === 'select-image') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="text-6xl mb-6">🧩</div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Rompecabezas del Amor
              </span>
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Arma nuestros momentos especiales pieza por pieza y descubre mensajes románticos únicos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {puzzleImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedImage(image)
                  setGameState('select-difficulty')
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300">
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-600">
                              <div class="text-center text-gray-600">
                                <div class="text-4xl mb-2">
                                  🧩
                                </div>
                                <p class="font-semibold">${image.title}</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-purple-200 text-sm">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Difficulty selection screen
  if (gameState === 'select-difficulty') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Button
              onClick={() => setGameState('select-image')}
              variant="outline"
              className="mb-8"
            >
              ← Cambiar imagen
            </Button>

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {selectedImage?.title}
              </h3>
              <p className="text-purple-200 text-lg mb-8">
                Elige la dificultad de tu rompecabezas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(difficultySettings).map(([key, setting]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setDifficulty(key as Difficulty)
                    setShowModeModal(true)
                  }}
                  className="cursor-pointer group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                    <div className="text-6xl mb-6">{setting.icon}</div>
                    <h4 className="text-2xl font-bold text-white mb-4">{setting.label}</h4>
                    <p className="text-purple-200 mb-6">{setting.description}</p>
                    <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${setting.color} text-white font-semibold`}>
                      {setting.pieces} piezas
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Mode selection modal */}
            <AnimatePresence>
              {showModeModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-8 w-full max-w-xl text-left"
                  >
                    <h4 className="text-2xl font-bold text-white mb-2">Elige el tipo de rompecabezas</h4>
                    <p className="text-purple-200 mb-6">Puedes jugar con cuadros deslizables o con fichas de encaje clásicas.</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div
                        role="button"
                        onClick={() => {
                          setPuzzleMode('sliding')
                          setShowModeModal(false)
                          setGameState('playing')
                        }}
                        className="group aspect-square rounded-2xl border border-white/20 bg-white/10 hover:border-white/40 transition-colors p-4 cursor-pointer"
                      >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                              <pattern id="grid-preview" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect width="20" height="20" fill="rgba(255,255,255,0.06)"/>
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
                              </pattern>
                            </defs>
                            <rect x="0" y="0" width="100" height="100" fill="url(#grid-preview)"/>
                            <rect x="40" y="40" width="20" height="20" fill="rgba(139,92,246,0.6)" />
                            <rect x="60" y="40" width="20" height="20" fill="rgba(139,92,246,0.35)" />
                            <rect x="40" y="60" width="20" height="20" fill="rgba(139,92,246,0.35)" />
                            <rect x="60" y="60" width="20" height="20" fill="none" stroke="rgba(255,255,255,0.6)" strokeDasharray="2,2" />
                          </svg>
                          <div className="absolute bottom-2 left-2 right-2 text-center text-white font-semibold text-sm bg-black/30 rounded-md py-1">
                            Rompecabezas con cuadros
                          </div>
                        </div>
                      </div>

                      <div
                        role="button"
                        onClick={() => {
                          setPuzzleMode('jigsaw')
                          setShowModeModal(false)
                          setGameState('playing-jigsaw')
                        }}
                        className="group aspect-square rounded-2xl border border-white/20 bg-white/10 hover:border-white/40 transition-colors p-4 cursor-pointer"
                      >
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M20,30 h40 c10,0 10,-12 20,-12 8,0 8,12 0,12 h0 c10,0 10,12 20,12 8,0 8,-12 0,-12 -10,0 -10,-12 -20,-12 H20 v40 c0,10 -12,10 -12,20 0,8 12,8 12,0 v0 c0,10 12,10 12,20 0,8 -12,8 -12,0 0,-10 -12,-10 -12,-20 V30 z" fill="rgba(236,72,153,0.55)"/>
                            <path d="M50,50 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" fill="rgba(255,255,255,0.35)"/>
                          </svg>
                          <div className="absolute bottom-2 left-2 right-2 text-center text-white font-semibold text-sm bg-black/30 rounded-md py-1">
                            Rompecabezas de encaje
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowModeModal(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    )
  }

  // Game playing screen
  if (gameState === 'playing') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          {/* Game Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Button
                onClick={() => setGameState('select-difficulty')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
              <h3 className="text-2xl font-bold text-white">{selectedImage?.title}</h3>
              <p className="text-purple-200">
                {difficultySettings[difficulty].pieces} piezas • {moves} movimientos
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={initializePuzzle}
                variant="outline"
                size="sm"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Mezclar
              </Button>
              <Button
                onClick={resetToOriginal}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Puzzle Grid */}
          <div className="flex justify-center">
            <div 
              className="grid gap-1 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 relative"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                maxWidth: '800px',
                width: '90vw',
                aspectRatio: '1'
              }}
            >
              {/* Capa guía alineada con la grilla para referencia */}
              {selectedImage && (
                <div
                  className="absolute inset-6 grid gap-1 pointer-events-none"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    opacity: 0.28,
                    zIndex: 0
                  }}
                >
                  {Array.from({ length: totalPieces }).map((_, i) => {
                    const row = Math.floor(i / gridSize)
                    const col = i % gridSize
                    return (
                      <div key={`guide-${i}`} className="rounded-lg overflow-hidden p-px">
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${selectedImage.src})`,
                            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                            backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
                            backgroundRepeat: 'no-repeat'
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              )}
              
              {pieces.map((piece, index) => {
                // Use piece.id to determine which part of the image to show
                // But skip the empty piece (id === totalPieces - 1)
                const row = Math.floor(piece.id / gridSize)
                const col = piece.id % gridSize
                
                return (
                  <motion.div
                    key={`${piece.id}-${index}`}
                    onClick={() => !piece.isEmpty && handlePieceClick(index)}
                    draggable={!piece.isEmpty}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onTouchStart={(e) => !piece.isEmpty && handleTouchStart(e, index)}
                    onTouchEnd={handleTouchEnd}
                    className={`aspect-square relative cursor-pointer transition-all duration-200 touch-manipulation select-none z-10 overflow-hidden ${
                      piece.isEmpty 
                        ? 'bg-white/5 border-2 border-dashed border-white/20 rounded-lg' 
                        : 'bg-white rounded-lg hover:shadow-lg hover:scale-105 border border-white/20'
                    }`}
                    whileHover={!piece.isEmpty ? { scale: 1.05 } : {}}
                    whileTap={!piece.isEmpty ? { scale: 0.95 } : {}}
                  >
                    {!piece.isEmpty && selectedImage && (
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${selectedImage.src})`,
                          backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                          // Posicionar cada pieza usando incrementos de 0% a 100% en base a (gridSize - 1)
                          backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <p className="text-purple-200 text-base sm:text-lg px-4">
              Haz clic o desliza una pieza adyacente al espacio vacío para moverla
            </p>
            <p className="text-purple-300 text-sm mt-2">
              También puedes arrastrar las piezas
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Jigsaw playing screen
  if (gameState === 'playing-jigsaw' && selectedImage) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Button
                onClick={() => setGameState('select-difficulty')}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Atrás
              </Button>
              <h3 className="text-2xl font-bold text-white">{selectedImage?.title} • Encaje</h3>
              <p className="text-purple-200">{difficultySettings[difficulty].pieces} piezas • {moves} movimientos</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={initializeJigsaw}
                variant="outline"
                size="sm"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Mezclar
              </Button>
              <Button
                onClick={resetJigsawToOriginal}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              ref={boardRef}
              className="relative p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
              style={{ maxWidth: '900px', width: '92vw', aspectRatio: '1' }}
              onPointerMove={onJigsawPointerMove}
              onPointerUp={onJigsawPointerUp}
              onPointerCancel={onJigsawPointerUp}
            >
              <div 
                className="absolute inset-6 rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${selectedImage.src})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  opacity: 0.18,
                  zIndex: 0
                }}
              />

              <svg className="absolute inset-6" viewBox={`0 0 100 100`} preserveAspectRatio="none" style={{ zIndex: 10 }}>
                {jigsawPieces.map(piece => (
                  <g key={piece.id}
                    style={{ cursor: piece.placed ? 'default' : 'grab' }}
                    onPointerDown={(e) => !piece.placed && onJigsawPointerDown(e as React.PointerEvent<SVGGElement>, piece.id)}
                    transform={`translate(${piece.x - (piece.col * 100)/(gridSize - 1)} ${piece.y - (piece.row * 100)/(gridSize - 1)})`}
                  >
                    <clipPath id={`clip-${piece.id}`}>
                      <path d={piece.path} />
                    </clipPath>
                    <image
                      href={selectedImage.src}
                      x={0}
                      y={0}
                      width={100}
                      height={100}
                      preserveAspectRatio="none"
                      clipPath={`url(#clip-${piece.id})`}
                    />
                    <path d={piece.path} fill="transparent" stroke="rgba(255,255,255,0.6)" strokeWidth={0.3} pointerEvents="none" />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-purple-200 text-base sm:text-lg px-4">Arrastra y suelta cada ficha sobre su lugar. Se encaja automáticamente al estar cerca.</p>
          </div>
        </div>
      </section>
    )
  }

  // Completion screen
  if (gameState === 'completed') {
    const timeInSeconds = Math.floor(completionTime / 1000)
    const randomMessage = getRandomCompletionMessages()[Math.floor(Math.random() * getRandomCompletionMessages().length)]

    return (
      <section className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Success animation */}
            <motion.div
              className="text-8xl mb-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎉
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                ¡Rompecabezas Completado!
              </span>
            </h2>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{moves}</div>
                <div className="text-purple-200">Movimientos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{timeInSeconds}s</div>
                <div className="text-purple-200">Tiempo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Sparkles className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{difficultySettings[difficulty].pieces}</div>
                <div className="text-purple-200">Piezas</div>
              </div>
            </div>

            {/* Romantic message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl p-8 border border-pink-400/30 mb-8"
            >
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-pink-300 mb-4">Mensaje Especial:</h3>
              <p className="text-white text-lg leading-relaxed mb-6">
                {selectedImage?.completionMessage}
              </p>
              <div className="text-pink-300 text-sm">
                {randomMessage}
              </div>
            </motion.div>

            {/* Action buttons */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Button
                onClick={() => {
                  setGameState('select-difficulty')
                }}
                size="lg"
              >
                Jugar de Nuevo
              </Button>
              <Button
                onClick={resetGame}
                size="lg"
                variant="outline"
              >
                Elegir Otra Imagen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}