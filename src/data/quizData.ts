export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: 'generales' | 'ella' | 'tu'
  funFact?: string
}

export const quizQuestions: QuizQuestion[] = [
  // PREGUNTAS GENERALES
  {
    id: 'gen-1',
    category: 'generales',
    question: '¿En qué fecha sucedió todo?',
    options: [
      '14 de Septiembre, 2018',
      '23 de Septiembre, 2018', 
      '21 de Septiembre, 2018',
      '26 de Septiembre, 2018'
    ],
    correctAnswer: 1,
    funFact: '¡Y fue un día de celebración de tu cumpleaños! El destino tiene sentido del humor 💕'
  },
  {
    id: 'gen-2',
    category: 'generales',
    question: '¿Cuál es nuestro restaurante favorito?',
    options: [
      'Tierra Querida',
      'Makabro',
      'Rey Parrillero', 
      'Mandingas de la esquina',
      'Todas las anteriores'
    ],
    correctAnswer: 4,
    funFact: 'Donde sea que comamos, pero lo mas importante es que sea juntos! 💜'
  },
  {
    id: 'gen-3',
    category: 'generales',
    question: '¿Quién se demora más en arreglarse?',
    options: [
      'Kerin',
      'Daiana',
      'Kerin con afán',
      'Daiana con tiempo'
    ],
    correctAnswer: 3,
    funFact: 'Pura demora en arreglarse, avemaria!!'
  },
  {
    id: 'gen-4',
    category: 'generales',
    question: '¿Qué ciudad soñamos con visitar algún día?',
    options: [
      'Guatica',
      'New York',
      'Barcelona',
      'Paris'
    ],
    correctAnswer: 0,
    funFact: 'La verdad es que cualquier lugar acompañado de ti, es mi viaje soñado💜'
  },

  // PREGUNTAS SOBRE ELLA
  {
    id: 'ella-1',
    category: 'ella',
    question: '¿Cuál es la fecha de cumpleaños de ella?',
    options: [
      '26 de Septiembre',
      '29 de Septiembre',
      '14 de Septiembre',
      '8 de Septiembre'
    ],
    correctAnswer: 0,
    funFact: '¡Y cada año se pone más hermosa! Como el buen vino 🍷'
  },
  {
    id: 'ella-2',
    category: 'ella',
    question: '¿Cuál es su reacción cuando está nerviosa?',
    options: [
      'Se muerde las uñas',
      'Juega con su pelo',
      'Habla sin parar',
      'Se empieza a reir'
    ],
    correctAnswer: 3,
    funFact: 'Empieza a reirse y tartamudear es hermosa jaja😊'
  },
  {
    id: 'ella-3',
    category: 'ella',
    question: '¿Qué es lo que más le gusta hacer los domingos?',
    options: [
      'Ver series en pijama',
      'Salir a caminar',
      'Ir a restaurantes',
      'Visitar lugares',
      'Todas las anteriores'
    ],
    correctAnswer: 4,
    funFact: 'Domingos perfectos: pijamas, series, y muchos mimos 📺💕'
  },
  {
    id: 'ella-4',
    category: 'ella',
    question: '¿Cuál es su mayor deseo profesional?',
    options: [
      'Convertirse en Abogada',
      'Convertirse en Arquitecta',
      'Convertirse en Ingenieria civil',
      'Convertirse en delineante',
    ],
    correctAnswer: 1,
    funFact: '¡Siempre se ha esforzado en sobresalir y llegará a ser la mejor arquitecta 👩‍🎓💪'
  },
  {
    id: 'ella-5',
    category: 'ella',
    question: '¿Qué le hace reír sin falta?',
    options: [
      'Sus chistes malos',
      'Videos de gatitos',
      'Imitaciones que él hace',
      'Memes random',
      'Todo lo anterior siemopre y cuando no tenga sentido'
    ],
    correctAnswer: 4,
    funFact: 'Especialmente los videos random! 😂'
  },

  // PREGUNTAS SOBRE ÉL
  {
    id: 'tu-1',
    category: 'tu',
    question: '¿Cuál es la fecha de cumpleaños de él?',
    options: [
      '6 de Agosto',
      '8 de Agosto',
      '3 de Agosto',
      '4 de Agosto'
    ],
    correctAnswer: 2,
    funFact: '¡Y ella siempre le organiza las mejores sorpresas! 🎉'
  },
  {
    id: 'tu-2',
    category: 'tu',
    question: '¿Cuál es su mayor miedo confesado?',
    options: [
      'Las alturas',
      'Perderla a ella',
      'Las arañas',
      'Hablar en público'
    ],
    correctAnswer: 1,
    funFact: 'Por eso se esfuerza tanto en ser el mejor hombre para ella'
  },
  {
    id: 'tu-3',
    category: 'tu',
    question: '¿Qué hace cuando está muy emocionado?',
    options: [
      'Grita de felicidad',
      'Baila sin música',
      'Se queda sin palabras',
      'Hace planes inmediatamente'
    ],
    correctAnswer: 2,
    funFact: 'Solo me conoces tan bien💜'
  },
  {
    id: 'tu-4',
    category: 'tu',
    question: '¿Cuál es su tradición personal favorita con ella?',
    options: [
      'Desayunos en la cama los sábados',
      'Conducir sin rumbo por la ciudad',
      'Ver series y novelas juntos',
      'Cocinar juntos los viernes'
    ],
    correctAnswer: 2,
    funFact: 'Hasta las series y programas que jamás uno se imagina ver contigo lo disfruto💜 '
  },
  {
    id: 'tu-5',
    category: 'tu',
    question: '¿Cuándo supo que quería pasar su vida con ella?',
    options: [
      'En la primera cita',
      'Después del primer "te amo"',
      'Cuando la vio sonreír abriendo su regalo',
      'En su primer viaje juntos'
    ],
    correctAnswer: 2,
    funFact: 'Ese momento de pura felicidad le confirmó todo lo que su corazón ya sabía 💝'
  }
]

export const categories = [
  {
    id: 'generales',
    name: 'Generales',
    description: 'Sobre su historia juntos',
    icon: '💕',
    color: 'from-pink-500 to-rose-500',
    questions: quizQuestions.filter(q => q.category === 'generales')
  },
  {
    id: 'ella',
    name: 'Sobre Ella',
    description: 'Lo que él sabe de ella',
    icon: '👩‍💼',
    color: 'from-purple-500 to-indigo-500',
    questions: quizQuestions.filter(q => q.category === 'ella')
  },
  {
    id: 'tu',
    name: 'Sobre Él',
    description: 'Lo que ella sabe de él',
    icon: '👨‍💼',
    color: 'from-blue-500 to-cyan-500',
    questions: quizQuestions.filter(q => q.category === 'tu')
  }
] as const

export const getScoreFeedback = (score: number, total: number) => {
  const percentage = (score / total) * 100
  
  if (percentage === 100) {
    return {
      title: '¡PERFECTOS! 🌟',
      message: 'Se conocen mejor que nadie. ¡Son almas gemelas! Su conexión es increíble y su amor es evidente en cada respuesta correcta.',
      emoji: '💯',
      color: 'from-yellow-400 to-orange-500'
    }
  } else if (percentage >= 80) {
    return {
      title: '¡EXPERTOS EN AMOR! 💕',
      message: 'Casi perfecto. Se conocen muy bien y su amor se nota en cada detalle. ¡Son una pareja increíble!',
      emoji: '🥇',
      color: 'from-pink-400 to-rose-500'
    }
  } else if (percentage >= 60) {
    return {
      title: '¡MUY BIEN! 💖',
      message: 'Buenos conocedores el uno del otro. Hay algunos secretitos por descubrir, ¡pero eso es parte de la aventura!',
      emoji: '🥈',
      color: 'from-purple-400 to-pink-500'
    }
  } else if (percentage >= 40) {
    return {
      title: '¡APRENDIENDO! 💝',
      message: 'Aún están descubriendo cosas el uno del otro. ¡Cada día es una oportunidad para conocerse más!',
      emoji: '🥉',
      color: 'from-blue-400 to-purple-500'
    }
  } else {
    return {
      title: '¡CURIOSOS! 💘',
      message: 'Parece que hay muchos misterios por resolver. ¡Perfecto! El amor es una aventura constante de descubrimiento.',
      emoji: '🔍',
      color: 'from-indigo-400 to-blue-500'
    }
  }
}