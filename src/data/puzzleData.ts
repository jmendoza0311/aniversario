export interface PuzzleImage {
  id: string
  title: string
  description: string
  src: string
  completionMessage: string
  color: string
}

export const puzzleImages: PuzzleImage[] = [
  {
    id: 'inicios-rompecabezas',
    title: 'Inicios de nuestra historia',
    description: 'Aquel beso que marcaba el comienzo de nuestra historia',
    src: 'images/Puzzle/primera.jpg',
    color: 'from-pink-400 to-rose-500',
    completionMessage: '¡Armaste el momento donde todo comenzó! Ese día supe que eras especial. Tu sonrisa nerviosa era lo más hermoso que había visto. 💕 Desde entonces, cada día contigo ha sido una nueva pieza del rompecabezas perfecto de nuestro amor.'
  },
  {
    id: 'aventura-en-clase',
    title: 'Aventura en clase',
    description: 'Perdidos en la clase, pero encontrados en el amor',
    src: '/images/Puzzle/Segunda.jpg',
    color: 'from-orange-400 to-red-500',
    completionMessage: '¡Reconstruiste nuestro primer momento juntos! Al encontrarte, entendí que no podía vivir sin ti. Toda la clase fue testigo de cómo nuestro amor se volvió eterno. 🏛️❤️'
  },
  {
    id: 'En-la-uva',
    title: 'En la uva juntos',
    description: 'los bigotes que marcan historia',
    src: '/images/Puzzle/Tercera.jpg',
    color: 'from-purple-400 to-indigo-500',
    completionMessage: '¡Completaste nuestra escapada a la uva!'
  },
  {
    id: 'Un-Regalo',
    title: 'Un Regalo Perfecto',
    description: 'Una sorpresa que marcó el comienzo de nuestra historia',
    src: '/images/Puzzle/Cuarta.jpg',
    color: 'from-green-400 to-emerald-500',
    completionMessage: '¡Despues de un largo viaje, regresas a casa y ves un regalo esperando para ti!'
  },
  {
    id: 'Dia-feliz',
    title: 'Dia de risas',
    description: 'Uno de tantos momentos de felicidad',
    src: '/images/Puzzle/Quinta.jpg',
    color: 'from-blue-400 to-cyan-500',
    completionMessage: 'Uno de tantos momentos de felicidad! Uno de tantos momentos de risas y alegría. 😂'
  },
  {
    id: 'selfie-perfecta',
    title: 'Selfie Perfecta',
    description: 'Capturando momentos, guardando sonrisas',
    src: '/images/Puzzle/Sexta.jpg',
    color: 'from-yellow-400 to-orange-500',
    completionMessage: '¡Armaste una de nuestras selfie favoritas! Desde el primer día supe que contigo quería tomarme fotos para toda la vida. Cada selfie cuenta una historia, cada sonrisa guarda un momento. Eres mi fotógrafa favorita y mi modelo perfecta. 📸💕'
  },
  {
    id: 'Revelación',
    title: 'Dias de revelación',
    description: 'Entre naranjos y azahares, una revelacion se asomaba',
    src: '/images/Puzzle/Septima.jpg',
    color: 'from-orange-300 to-pink-400',
    completionMessage: '¡Dias llenos de misterios y sorpresas, una personita nueva venia asomando su luz a este mundo!'
  },
  {
    id: 'Dia de cumple',
    title: 'Momentos especiales',
    description: 'Siempre tú, siempre nosotros.',
    src: '/images/Puzzle/Octava.jpg',
    color: 'from-pink-300 to-purple-400',
    completionMessage: '¡Dias llenos de momentos especiales, y cada recuerdo, cada foto son mas y mas especiales.'
  },
  {
    id: 'futuro-juntos',
    title: 'Nuestro Futuro',
    description: 'Esto solo es el comienzo de nuestra historia infinita',
    src: '/images/Puzzle/Novena.jpg',
    color: 'from-gradient-to-r from-yellow-300 via-pink-300 to-purple-400',
    completionMessage: '¡Armaste nuestro futuro! Como este rompecabezas, nuestra historia se va construyendo pieza por pieza, momento por momento. Cada día juntos añade una nueva pieza a nuestro amor infinito. Lo mejor está por venir, mi amor. Esto solo es el comienzo... 🌟💫'
  }
]

export const difficultySettings = {
  easy: {
    pieces: 25,
    gridSize: '5x5',
    label: 'Fácil',
    description: '25 piezas - Perfecto para comenzar',
    color: 'from-green-400 to-emerald-500',
    icon: '😊'
  },
  medium: {
    pieces: 49, 
    gridSize: '7x7',
    label: 'Medio',
    description: '49 piezas - Un buen desafío',
    color: 'from-yellow-400 to-orange-500',
    icon: '🤔'
  },
  hard: {
    pieces: 81,
    gridSize: '9x9',
    label: 'Difícil',
    description: '81 piezas - Para expertos',
    color: 'from-red-400 to-pink-500',
    icon: '😤'
  }
} as const

export const getRandomCompletionMessages = () => [
  '¡Eres increíble! Como armaste este rompecabezas, has ido armando mi corazón pieza por pieza. 💕',
  '¡Perfecto! Tienes la paciencia y dedicación que me enamoró desde el primer día. 🌟',
  '¡Amazing! Cada pieza que colocaste me recordó una razón por la que te amo. 💖',
  '¡Genial! Tu persistencia es una de las cosas que más admiro de ti. 🏆',
  '¡Fantástico! Como este puzzle, nuestra historia también se completa perfectamente. ✨'
]