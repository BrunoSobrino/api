const fs = require('fs');
const path = require('path');

function analyzeFiles() {
  const foldersToAnalyze = [
    './././routes',
    './././public',
    '././func' 
  ];
  const filesToAnalyze = ['./././index.js'];
  foldersToAnalyze.forEach((folder) => {
    const folderPath = path.join(__dirname, folder);
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(`Error al leer la carpeta ${folder}:`, err);
        return;
      }
      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (statErr, stats) => {
          if (statErr) {
            console.error(`Error al obtener estadísticas de archivo ${file}:`, statErr);
            return;
          }
          const modificationTime = new Date(stats.mtime);
          const currentTime = new Date();
          const timeDifference = (currentTime - modificationTime) / 1000; // Diferencia en segundos
          if (timeDifference <= 300) {
            console.log(`El archivo ${file} en la carpeta ${folder} ha sido modificado recientemente.`);
          }
        });
      });
    });
  });
  filesToAnalyze.forEach((file) => {
    const filePath = path.join(__dirname, file);
    fs.stat(filePath, (statErr, stats) => {
      if (statErr) {
        console.error(`Error al obtener estadísticas de archivo ${file}:`, statErr);
        return;
      }
      const modificationTime = new Date(stats.mtime);
      const currentTime = new Date();
      const timeDifference = (currentTime - modificationTime) / 1000; // Diferencia en segundos
      if (timeDifference <= 300) {
        console.log(`El archivo ${file} ha sido modificado recientemente.`);
      }
    });
  });
}

module.exports = analyzeFiles;
