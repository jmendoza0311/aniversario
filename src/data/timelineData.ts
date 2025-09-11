export interface TimelineItem {
  year: number
  title: string
  description: string
  image: string
  video?: string
  color: string
  isSpecial?: boolean
}

export const timelineData: TimelineItem[] = [
  {
    year: 2018,
    title: "El Primer Encuentro",
    description: "Cuando nuestros caminos se cruzaron por primera vez y todo comenzó.",
    image: "/images/timeline/IMG-20180926-WA0057.jpg",
    color: "from-pink-400 to-rose-500"
  },
  {
    year: 2019,
    title: "Primeras Aventuras",
    description: "Descubriendo el mundo juntos, creando nuestros primeros recuerdos especiales.",
    image: "/images/timeline/20190214_173026.jpg",
    color: "from-purple-400 to-indigo-500"
  },
  {
    year: 2020,
    title: "Unidos Ante Todo",
    description: "Un año desafiante que nos demostró lo fuertes que somos juntos.",
    image: "/images/timeline/20200927_010613.jpg",
    color: "from-blue-400 to-cyan-500"
  },
  {
    year: 2021,
    title: "Creciendo Juntos",
    description: "Cada día aprendiendo más el uno del otro, construyendo nuestro futuro.",
    image: "/images/timeline/ImagenPara2021TimeLine.jpg",
    color: "from-emerald-400 to-teal-500"
  },
  {
    year: 2022,
    title: "Momentos Inolvidables",
    description: "Viviendo experiencias que quedarán grabadas en nuestros corazones para siempre.",
    image: "/images/timeline/IMG_para2021.jpg",
    color: "from-amber-400 to-orange-500"
  },
  {
    year: 2023,
    title: "Fortaleciendo Lazos",
    description: "Cada obstáculo superado nos hizo más fuertes, cada alegría compartida más intensa.",
    image: "/images/timeline/Foto2023TimeLine.jpeg",
    color: "from-red-400 to-pink-500"
  },
  {
    year: 2024,
    title: "Nuestro Presente",
    description: "Celebrando todo lo vivido y mirando hacia adelante con esperanza y amor.",
    image: "/images/timeline/FotoPara2024TimeLine.jpeg",
    color: "from-violet-400 to-purple-500"
  },
  {
    year: 2025,
    title: "El Futuro Nos Espera",
    description: "Esto solo es el comienzo...",
    image: "/images/timeline/FotoPara2025TimeLine.jpeg",
    color: "from-gradient-to-r from-yellow-300 via-pink-300 to-purple-400",
    isSpecial: true
  }
]