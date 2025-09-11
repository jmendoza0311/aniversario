'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, categories, getScoreFeedback, QuizQuestion } from '../data/quizData'
import { Check, X, RotateCcw, Trophy, Heart, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'

type GameState = 'start' | 'category' | 'playing' | 'results'

interface QuizAnswer {
  questionId: string
  selectedAnswer: number
  isCorrect: boolean
}

export default function Quiz() {
  const [gameState, setGameState] = useState<GameState>('start')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([])

  const currentQuestion = currentQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1

  const startQuiz = () => {
    setGameState('category')
  }

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = categories.find(c => c.id === categoryId)
    if (category) {
      setCurrentQuestions(category.questions)
      setGameState('playing')
      setCurrentQuestionIndex(0)
      setAnswers([])
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    
    setTimeout(() => {
      const isCorrect = answerIndex === currentQuestion.correctAnswer
      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        selectedAnswer: answerIndex,
        isCorrect
      }
      
      setAnswers(prev => [...prev, newAnswer])
      setShowResult(true)
      
      setTimeout(() => {
        if (isLastQuestion) {
          setGameState('results')
        } else {
          setCurrentQuestionIndex(prev => prev + 1)
          setSelectedAnswer(null)
          setShowResult(false)
        }
      }, 2500)
    }, 500)
  }

  const resetQuiz = () => {
    setGameState('start')
    setSelectedCategory(null)
    setCurrentQuestionIndex(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowResult(false)
    setCurrentQuestions([])
  }

  const correctAnswers = answers.filter(a => a.isCorrect).length
  const feedback = getScoreFeedback(correctAnswers, answers.length)

  if (gameState === 'start') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-12 sm:py-16 md:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Game Icon */}
            <motion.div
              className="text-8xl mb-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🎯
            </motion.div>

            {/* Title */}
            <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                Test de Pareja
              </span>
            </h2>

            <p className="text-xl text-emerald-100 mb-8 max-w-xl mx-auto">
              ¿Qué tanto se conocen después de 7 años juntos? ¡Descúbranlo con este divertido quiz!
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                { icon: '💕', title: 'Generales', desc: 'Su historia juntos' },
                { icon: '👩‍💼', title: 'Sobre Ella', desc: 'Lo que él sabe' },
                { icon: '👨‍💼', title: 'Sobre Él', desc: 'Lo que ella sabe' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-emerald-200 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Start Button */}
            <Button
              onClick={startQuiz}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 touch-manipulation"
            >
              <Trophy className="mr-2 h-5 w-5" />
              ¡Comenzar Test!
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  if (gameState === 'category') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-12 sm:py-16 md:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Elige una Categoría
            </h2>
            <p className="text-xl text-emerald-100 mb-12">
              Cada categoría tiene preguntas únicas sobre su relación
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectCategory(category.id)}
                  className="cursor-pointer group"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/20">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {category.name}
                    </h3>
                    <p className="text-emerald-200 mb-6">
                      {category.description}
                    </p>
                    <div className="text-white/70 text-sm mb-6">
                      {category.questions.length} preguntas
                    </div>
                    <div className={`inline-flex items-center text-white bg-gradient-to-r ${category.color} px-4 py-2 rounded-full font-semibold group-hover:shadow-lg transition-all duration-300`}>
                      Seleccionar
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  if (gameState === 'playing') {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100
    const category = categories.find(c => c.id === selectedCategory)

    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-3xl">{category?.icon}</span>
                <h2 className="text-2xl font-bold text-white">{category?.name}</h2>
              </div>
              
              {/* Progress Bar */}
              <div className="relative w-full max-w-md mx-auto h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${category?.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-emerald-200 mt-2">
                Pregunta {currentQuestionIndex + 1} de {currentQuestions.length}
              </p>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center leading-relaxed">
                  {currentQuestion.question}
                </h3>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => {
                    let buttonClass = 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40'
                    
                    if (selectedAnswer !== null) {
                      if (index === currentQuestion.correctAnswer) {
                        buttonClass = 'bg-green-500/80 text-white border-green-400 shadow-green-500/30'
                      } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                        buttonClass = 'bg-red-500/80 text-white border-red-400 shadow-red-500/30'
                      } else {
                        buttonClass = 'bg-white/5 text-white/60 border-white/10'
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        whileHover={selectedAnswer === null ? { 
                          scale: 1.03, 
                          x: 8,
                          transition: {
                            duration: 0.4,
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                          }
                        } : {}}
                        whileTap={selectedAnswer === null ? { 
                          scale: 0.97,
                          transition: { duration: 0.2 }
                        } : {}}
                        className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-500 ease-out text-left font-semibold text-lg ${buttonClass} disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-purple-500/25`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {selectedAnswer !== null && (
                            <div className="ml-4">
                              {index === currentQuestion.correctAnswer ? (
                                <Check className="h-6 w-6 text-green-200" />
                              ) : index === selectedAnswer ? (
                                <X className="h-6 w-6 text-red-200" />
                              ) : null}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Fun Fact */}
                <AnimatePresence>
                  {showResult && currentQuestion.funFact && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30"
                    >
                      <div className="flex items-start space-x-3">
                        <Heart className="h-6 w-6 text-pink-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-pink-300 font-semibold mb-2">¿Sabías que...?</h4>
                          <p className="text-white text-lg">{currentQuestion.funFact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    )
  }

  if (gameState === 'results') {
    return (
      <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 py-12 sm:py-16 md:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Results Icon */}
            <motion.div
              className="text-8xl mb-8"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {feedback.emoji}
            </motion.div>

            {/* Score */}
            <div className={`inline-block bg-gradient-to-r ${feedback.color} text-white px-8 py-4 rounded-full text-4xl font-bold mb-6 shadow-2xl`}>
              {correctAnswers}/{answers.length}
            </div>

            {/* Feedback */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {feedback.title}
            </h2>
            
            <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              {feedback.message}
            </p>

            {/* Category Results */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                Resultados por Categoría
              </h3>
              <div className="space-y-4">
                {categories.map(category => {
                  const categoryAnswers = answers.filter(a => {
                    const question = quizQuestions.find(q => q.id === a.questionId)
                    return question?.category === category.id
                  })
                  
                  if (categoryAnswers.length === 0) return null
                  
                  const categoryCorrect = categoryAnswers.filter(a => a.isCorrect).length
                  
                  return (
                    <div key={category.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-white font-semibold">{category.name}</span>
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white font-bold`}>
                        {categoryCorrect}/{categoryAnswers.length}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-x-4">
              <Button
                onClick={resetQuiz}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 touch-manipulation"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Jugar de Nuevo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}