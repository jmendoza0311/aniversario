// Script Node.js para renombrar archivos de audio automáticamente
// Ejecutar con: node public/audio/rename-script.js

const fs = require('fs');
const path = require('path');

const audioFileMap = {
  'Ed Sheeran - Perfect (Official Music Video).mp3': 'perfect-ed-sheeran.mp3',
  'Camilo, Carin Leon - Una Vida Pasada (Official Video).mp3': 'una-vida-pasada-camilo.mp3',
  'Melendi - Destino o Casualidad ft. Ha_Ash.mp3': 'destino-o-casualidad-melendi.mp3',
  'Camilo, Evaluna Montaner - Por Primera Vez (Official Video).mp3': 'por-primera-vez-camilo.mp3',
  'Andrés Cepeda - Por El Resto De Mi Vida (Video Oficial).mp3': 'por-el-resto-de-mi-vida-andres-cepeda.mp3',
  'Fonseca - Prometo (LyricLetra).mp3': 'prometo-fonseca.mp3',
  'Tony Dize - El Doctorado [Official Video].mp3': 'doctorado-tony-dize.mp3',
  'Chayanne - Completamente Enamorados (Video).mp3': 'completamente-enamorados-chayanne.mp3',
  'John Legend - All of Me (Official Video).mp3': 'all-of-me-john-legend.mp3',
  'Ed Sheeran - Thinking Out Loud (Official Music Video).mp3': 'thinking-out-loud-ed-sheeran.mp3',
  'Christina Perri - A Thousand Years [Official Music Video].mp3': 'a-thousand-years-christina-perri.mp3',
  'Make You Feel My Love.mp3': 'make-you-feel-my-love-adele.mp3',
  'Bruno Mars - Just The Way You Are (Official Music Video).mp3': 'just-the-way-you-are-bruno-mars.mp3',
  'Bruno Mars - Marry You (Official Lyric Video).mp3': 'marry-me-bruno-mars.mp3',
  'OneRepublic - Counting Stars.mp3': 'counting-stars-onerepublic.mp3'
};

const audioDir = path.join(__dirname);

console.log('🎵 Script de Renombrado de Archivos de Audio');
console.log('==========================================\n');

// Verificar qué archivos existen
const existingFiles = fs.readdirSync(audioDir)
  .filter(file => file.endsWith('.mp3'));

console.log('📁 Archivos MP3 encontrados:');
existingFiles.forEach(file => console.log(`  - ${file}`));
console.log('');

// Procesar renombrados
let renamedCount = 0;
let notFoundCount = 0;

Object.entries(audioFileMap).forEach(([oldName, newName]) => {
  const oldPath = path.join(audioDir, oldName);
  const newPath = path.join(audioDir, newName);
  
  if (fs.existsSync(oldPath)) {
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renombrado: ${oldName} → ${newName}`);
      renamedCount++;
    } catch (error) {
      console.log(`❌ Error renombrando ${oldName}: ${error.message}`);
    }
  } else {
    console.log(`⚠️  No encontrado: ${oldName}`);
    notFoundCount++;
  }
});

console.log('\n📊 Resumen:');
console.log(`  - Archivos renombrados: ${renamedCount}`);
console.log(`  - Archivos no encontrados: ${notFoundCount}`);
console.log(`  - Total procesados: ${Object.keys(audioFileMap).length}`);

if (renamedCount > 0) {
  console.log('\n🎉 ¡Archivos renombrados exitosamente!');
  console.log('   Ahora puedes probar el reproductor de música.');
} else if (notFoundCount === Object.keys(audioFileMap).length) {
  console.log('\n📝 Los archivos ya están con los nombres correctos o no se encontraron.');
} else {
  console.log('\n🔍 Algunos archivos no se pudieron renombrar.');
}
