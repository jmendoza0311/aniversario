export interface Song {
  id: string
  title: string
  artist: string
  album: string
  year: number
  genre: string
  category: 'nuestra-cancion' | 'primera-cita' | 'viajes' | 'especiales' | 'baile' | 'nostalgicas'
  albumCover: string
  explanation: string
  memory: string
  links: {
    youtube?: string
    spotify?: string
    appleMusic?: string
  }
  color: string
  mood: 'romantic' | 'happy' | 'nostalgic' | 'energetic' | 'emotional'
}

export const songs: Song[] = [
  {
    id: 'perfect-ed-sheeran',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    year: 2017,
    genre: 'Pop/Folk',
    category: 'nuestra-cancion',
    albumCover: '/images/music/perfect-ed-sheeran.jpg',
    explanation: 'Esta es oficialmente "nuestra canción". La primera que bailamos juntos.',
    memory: 'Sonó en una ocasión especial y sin decir nada, me extendiste la mano. Bailamos mientras todos nos miraban sonriendo. En ese momento supe que eras perfecta para mí, tal como dice la canción. 💕',
    links: {
      youtube: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
      spotify: 'https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v'
    },
    color: 'from-pink-400 to-rose-500',
    mood: 'romantic'
  },
  {
    id: 'una-vida-pasada-camilo',
    title: 'Una Vida Pasada',
    artist: 'Camilo',
    album: 'Mis Manos',
    year: 2021,
    genre: 'Pop Latino',
    category: 'especiales',
    albumCover: '/images/music/una-vida-pasada-camilo.jpg',
    explanation: 'Esta canción describe perfectamente cómo siento que ya te conocía desde antes de conocerte.',
    memory: 'La primera vez que la escuchamos juntos, me miraste y dijiste: "Es como si hubiéramos vivido esto antes". Exactamente eso siento contigo, como si fuéramos almas que se reencuentran. 💫',
    links: {
      youtube: 'https://www.youtube.com/watch?v=VRLHHbKjEaM',
      spotify: 'https://open.spotify.com/track/6d9x9dKp7QMxnV3GzRa8YZ'
    },
    color: 'from-purple-400 to-indigo-500',
    mood: 'romantic'
  },
  {
    id: 'destino-o-casualidad-melendi',
    title: 'Destino o Casualidad',
    artist: 'Melendi',
    album: 'Ahora',
    year: 2018,
    genre: 'Pop/Folk',
    category: 'primera-cita',
    albumCover: '/images/music/destino-o-casualidad-melendi.jpg',
    explanation: 'Nuestra canción sobre cómo nos encontramos. ¿Fue destino o casualidad?',
    memory: 'Después de nuestro primer encuentro, no podía parar de pensar en ti. Esta canción sonó en la radio y pensé: "¿Será casualidad o será el destino diciéndome algo?" Ahora sé la respuesta. 🎲✨',
    links: {
      youtube: 'https://www.youtube.com/watch?v=Xjsn4VfNjaI',
      spotify: 'https://open.spotify.com/track/1BxkgE6OTz9Qvg7aY7Xd5C'
    },
    color: 'from-blue-400 to-teal-500',
    mood: 'romantic'
  },
  {
    id: 'por-primera-vez-camilo',
    title: 'Por Primera Vez',
    artist: 'Camilo',
    album: 'Por Primera Vez',
    year: 2020,
    genre: 'Pop Latino',
    category: 'primera-cita',
    albumCover: '/images/music/por-primera-vez-camilo.jpg',
    explanation: 'Contigo todo se siente como si fuera la primera vez, cada beso, cada abrazo, cada "te amo".',
    memory: 'Esta canción la descubrimos cuando empezábamos nuestra relación. "Eres mi primera vez en tantas cosas" te dije una noche. Y es verdad, contigo todo es nuevo y emocionante. 🌟',
    links: {
      youtube: 'https://www.youtube.com/watch?v=VPiDAkeu2l0',
      spotify: 'https://open.spotify.com/track/7hu9XfrLRrJxBa7YPE8e8l'
    },
    color: 'from-pink-400 to-rose-500',
    mood: 'romantic'
  },
  {
    id: 'por-el-resto-de-mi-vida-andres-cepeda',
    title: 'Por el Resto de Mi Vida',
    artist: 'Andrés Cepeda',
    album: 'Magia',
    year: 2015,
    genre: 'Balada/Pop Latino',
    category: 'especiales',
    albumCover: '/images/music/por-el-resto-de-mi-vida-cepeda.jpg',
    explanation: 'Mi promesa eterna. Por el resto de mi vida quiero amarte, cuidarte y hacerte feliz.',
    memory: 'En nuestro aniversario del año pasado, mientras cenábamos, empezó a sonar esta canción. Te tomé las manos y te dije: "Por el resto de mi vida". Lloramos juntos de felicidad. 💍👰‍♀️',
    links: {
      youtube: 'https://www.youtube.com/watch?v=cqVEb6LATu4',
      spotify: 'https://open.spotify.com/track/4Xz8n1G5p6Y9tLk2Qw1sKl'
    },
    color: 'from-red-400 to-pink-500',
    mood: 'emotional'
  },
  {
    id: 'promero-fonseca',
    title: 'Promero',
    artist: 'Fonseca',
    album: 'Agustín',
    year: 2015,
    genre: 'Vallenato/Pop',
    category: 'especiales',
    albumCover: '/images/music/promero-fonseca.jpg',
    explanation: 'Esta canción habla de promesas y compromisos del corazón. Exactamente lo que siento por ti.',
    memory: 'La pusiste un día mientras cocinábamos juntos. Empezaste a cantarla y a bailar por la cocina. "Te prometo ser tu compañero", cantabas señalándome. Mi corazón se llenó de amor. 👨‍🍳💕',
    links: {
      youtube: 'https://www.youtube.com/watch?v=s8GBBa2Q1J8',
      spotify: 'https://open.spotify.com/track/2hGKfN8VxQw7p9Rs6F8pNk'
    },
    color: 'from-yellow-400 to-orange-500',
    mood: 'happy'
  },
  {
    id: 'doctorado-tony-dize',
    title: 'Doctorado',
    artist: 'Tony Dize',
    album: 'La Melodía de la Calle',
    year: 2007,
    genre: 'Reggaeton/Urban',
    category: 'baile',
    albumCover: '/images/music/doctorado-tony-dize.jpg',
    explanation: 'Nuestra canción para bailar pegaditos. Siempre que suena, no podemos evitar movernos juntos.',
    memory: 'En una fiesta, empezó a sonar y me dijiste: "Esta es nuestra canción para bailar romántico". Desde entonces, cada vez que la escuchamos, dejamos todo y bailamos como si fuéramos los únicos en el mundo. 💃🕺',
    links: {
      youtube: 'https://www.youtube.com/watch?v=EgBJmlPo8Xw',
      spotify: 'https://open.spotify.com/track/0S5n4b5VqPq8g2pY1m8G3o'
    },
    color: 'from-green-400 to-blue-500',
    mood: 'energetic'
  },
  {
    id: 'completamente-enamorados-chayanne',
    title: 'Completamente Enamorados',
    artist: 'Chayanne',
    album: 'Atado a Tu Amor',
    year: 1998,
    genre: 'Pop Latino/Balada',
    category: 'especiales',
    albumCover: '/images/music/completamente-enamorados-chayanne.jpg',
    explanation: 'Esto es exactamente lo que somos: completamente enamorados el uno del otro.',
    memory: 'Tu mamá puso esta canción en una reunión familiar y nos dijo: "Esta canción los describe perfectamente". Tenía razón, estamos completamente enamorados. 👨‍👩‍👧‍👦💕',
    links: {
      youtube: 'https://www.youtube.com/watch?v=sALYR0F-w9g',
      spotify: 'https://open.spotify.com/track/3nGY4lKPj5yGzf2P8mN5Qe'
    },
    color: 'from-red-400 to-rose-500',
    mood: 'romantic'
  },
  {
    id: 'all-of-me-john-legend',
    title: 'All of Me',
    artist: 'John Legend',
    album: 'Love in the Future',
    year: 2013,
    genre: 'R&B/Soul',
    category: 'nostalgicas',
    albumCover: '/images/music/all-of-me-john-legend.jpg',
    explanation: '"All of me loves all of you" resume perfectamente mi amor incondicional hacia ti.',
    memory: 'En una noche de lluvia, mientras estábamos abrazados viendo una película, empezó a sonar esta canción. Me acerqué a tu oído y te canté bajito: "All of me loves all of you". Fue uno de nuestros momentos más íntimos. 🌧️💕',
    links: {
      youtube: 'https://www.youtube.com/watch?v=450p7goxZqg',
      spotify: 'https://open.spotify.com/track/3U4isOIWM3VvDubwSI4C7V'
    },
    color: 'from-blue-400 to-indigo-500',
    mood: 'romantic'
  },
  {
    id: 'thinking-out-loud-ed-sheeran',
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    album: 'x (Multiply)',
    year: 2014,
    genre: 'Pop/Folk',
    category: 'especiales',
    albumCover: '/images/music/thinking-out-loud.jpg',
    explanation: '"When your legs don\'t work like they used to before" - Quiero amarte hasta que seamos viejitos.',
    memory: 'La pusiste en el coche durante un viaje y dijiste que te gustaba imaginar cómo seríamos de viejos. Yo ya me imaginaba envejeciendo contigo desde ese momento. Nuestro amor será eterno. 👴👵',
    links: {
      youtube: 'https://www.youtube.com/watch?v=lp-EO5I60KA',
      spotify: 'https://open.spotify.com/track/14zvGKV0xF4wiSEqBUl8Fa'
    },
    color: 'from-orange-400 to-red-500',
    mood: 'emotional'
  },
  {
    id: 'a-thousand-years-christina-perri',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    album: 'The Twilight Saga: Breaking Dawn',
    year: 2011,
    genre: 'Pop/Balada',
    category: 'especiales',
    albumCover: '/images/music/a-thousand-years-christina-perri.jpg',
    explanation: 'Te he amado por mil años y te amaré por mil años más. Nuestra canción de amor eterno.',
    memory: 'Viendo Crepúsculo juntos, cuando sonó esta canción en la boda de Bella y Edward, me susurraste: "Así quiero que sea nuestro amor, eterno". Mis ojos se llenaron de lágrimas de felicidad. 🧛‍♂️💒',
    links: {
      youtube: 'https://www.youtube.com/watch?v=rtOvBOTyX00',
      spotify: 'https://open.spotify.com/track/6h6pz6XOvBFczXnZW8Cckr'
    },
    color: 'from-purple-400 to-pink-500',
    mood: 'romantic'
  },
  {
    id: 'make-you-feel-my-love-adele',
    title: 'Make You Feel My Love',
    artist: 'Adele',
    album: '19',
    year: 2008,
    genre: 'Soul/Balada',
    category: 'nostalgicas',
    albumCover: '/images/music/make-you-feel-my-love-adele.jpg',
    explanation: 'Haría cualquier cosa para hacerte sentir mi amor. Esta canción es mi compromiso contigo.',
    memory: 'Una noche que estabas triste, puse esta canción y te abracé fuerte. "I could make you happy, make your dreams come true", te canté al oído. Tu sonrisa lo curó todo. 🎤💙',
    links: {
      youtube: 'https://www.youtube.com/watch?v=0put0_a--Ng',
      spotify: 'https://open.spotify.com/track/4i6cwNY6oIUL6WLFpx9fdc'
    },
    color: 'from-gray-400 to-blue-500',
    mood: 'emotional'
  },
  {
    id: 'marry-me-bruno-mars',
    title: 'Marry Me',
    artist: 'Bruno Mars',
    album: 'Doo-Wops & Hooligans',
    year: 2010,
    genre: 'Pop/R&B',
    category: 'especiales',
    albumCover: '/images/music/marry-me-bruno-mars.jpg',
    explanation: 'La canción que me daba valor para pensar en proponerte matrimonio.',
    memory: 'Practicaba cantar esta canción en secreto, imaginando el momento perfecto para pedirte que te casaras conmigo. Cuando finalmente te propuse, esta melodía sonaba en mi corazón. 💍🎵',
    links: {
      youtube: 'https://www.youtube.com/watch?v=Yt-gRlkkvcE',
      spotify: 'https://open.spotify.com/track/273dJ7RpRlXbwisNa8tgsp'
    },
    color: 'from-gold-400 to-yellow-500',
    mood: 'romantic'
  },
  {
    id: 'just-the-way-you-are-bruno-mars',
    title: 'Just The Way You Are',
    artist: 'Bruno Mars',
    album: 'Doo-Wops & Hooligans',
    year: 2010,
    genre: 'Pop/R&B',
    category: 'especiales',
    albumCover: '/images/music/just-the-way-you-are-bruno-mars.jpg',
    explanation: 'Eres hermosa tal como eres. Esta canción describe lo que veo cuando te miro.',
    memory: 'Un día que te sentías insegura con tu apariencia, puse esta canción y te dije: "Her eyes, her eyes make the stars look like they\'re not shining". Eres perfecta para mí. ⭐👸',
    links: {
      youtube: 'https://www.youtube.com/watch?v=LjhCEhWiKXk',
      spotify: 'https://open.spotify.com/track/7BqBn9nzAq8spo5e7cZ0dJ'
    },
    color: 'from-yellow-400 to-orange-500',
    mood: 'happy'
  },
  {
    id: 'counting-stars-onerepublic',
    title: 'Counting Stars',
    artist: 'OneRepublic',
    album: 'Native',
    year: 2013,
    genre: 'Pop Rock',
    category: 'viajes',
    albumCover: '/images/music/counting-stars-onerepublic.jpg',
    explanation: 'Nuestra canción de aventuras. "Lately I\'ve been losing sleep, dreaming about the things that we could be".',
    memory: 'En nuestro viaje por carretera, poníamos esta canción y cantábamos a todo pulmón con las ventanas abajo. Soñábamos con todo lo que podríamos ser juntos. Y mira dónde estamos ahora. 🚗⭐',
    links: {
      youtube: 'https://www.youtube.com/watch?v=hT_nvWreIhg',
      spotify: 'https://open.spotify.com/track/2tpWsVSb9UEmDRxAl1zhX1'
    },
    color: 'from-indigo-400 to-purple-500',
    mood: 'energetic'
  }
]

export const categories = [
  {
    id: 'all',
    name: 'Todas las Canciones',
    description: 'Nuestro cancionero completo',
    icon: '🎵',
    count: songs.length
  },
  {
    id: 'nuestra-cancion',
    name: 'Nuestra Canción',
    description: 'La canción oficial de nuestra relación',
    icon: '💕',
    count: songs.filter(s => s.category === 'nuestra-cancion').length
  },
  {
    id: 'primera-cita',
    name: 'Primera Cita',
    description: 'Canciones de cuando nos conocimos',
    icon: '☕',
    count: songs.filter(s => s.category === 'primera-cita').length
  },
  {
    id: 'viajes',
    name: 'Viajes',
    description: 'Soundtrack de nuestras aventuras',
    icon: '✈️',
    count: songs.filter(s => s.category === 'viajes').length
  },
  {
    id: 'especiales',
    name: 'Momentos Especiales',
    description: 'Canciones de momentos únicos',
    icon: '⭐',
    count: songs.filter(s => s.category === 'especiales').length
  },
  {
    id: 'baile',
    name: 'Para Bailar',
    description: 'Las que nos hacen mover el esqueleto',
    icon: '💃',
    count: songs.filter(s => s.category === 'baile').length
  },
  {
    id: 'nostalgicas',
    name: 'Nostálgicas',
    description: 'Canciones que nos hacen reflexionar',
    icon: '🌙',
    count: songs.filter(s => s.category === 'nostalgicas').length
  }
] as const

export const moods = [
  { id: 'romantic', name: 'Romántico', color: 'text-pink-400', icon: '💖' },
  { id: 'happy', name: 'Feliz', color: 'text-yellow-400', icon: '😊' },
  { id: 'nostalgic', name: 'Nostálgico', color: 'text-blue-400', icon: '🌙' },
  { id: 'energetic', name: 'Energético', color: 'text-red-400', icon: '⚡' },
  { id: 'emotional', name: 'Emotivo', color: 'text-purple-400', icon: '💙' }
] as const