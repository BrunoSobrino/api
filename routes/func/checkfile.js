const fs = require('fs');
const path = require('path');

function analyzeFiles() {
  const foldersToAnalyze = [
    './routes',
    './public',
    './func' // Rutas a las carpetas que deseas analizar
  ];

  // Agregar el archivo index.js a los archivos a analizar
  const filesToAnalyze = ['./index.js'];

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

          // Verificar si el archivo ha sido modificado recientemente (por ejemplo, en los últimos 5 minutos)
          const modificationTime = new Date(stats.mtime);
          const currentTime = new Date();
          const timeDifference = (currentTime - modificationTime) / 1000; // Diferencia en segundos

          if (timeDifference <= 300) {
            console.log(`El archivo ${file} en la carpeta ${folder} ha sido modificado recientemente.`);
            // Agrega aquí cualquier acción que desees realizar cuando se detecte un cambio en un archivo.
          }
        });
      });
    });
  });

  // Verificar el archivo index.js en el directorio actual
  filesToAnalyze.forEach((file) => {
    const filePath = path.join(__dirname, file);

    fs.stat(filePath, (statErr, stats) => {
      if (statErr) {
        console.error(`Error al obtener estadísticas de archivo ${file}:`, statErr);
        return;
      }

      // Verificar si el archivo ha sido modificado recientemente (por ejemplo, en los últimos 5 minutos)
      const modificationTime = new Date(stats.mtime);
      const currentTime = new Date();
      const timeDifference = (currentTime - modificationTime) / 1000; // Diferencia en segundos

      if (timeDifference <= 300) {
        console.log(`El archivo ${file} ha sido modificado recientemente.`);
        // Agrega aquí cualquier acción que desees realizar cuando se detecte un cambio en el archivo index.js.
      }
    });
  });
}

module.exports = analyzeFiles;
