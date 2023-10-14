const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = Math.floor(data.length * Math.random());
    const videoUrl = data[randomIndex];
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');

    // Establece el tipo de contenido de la respuesta como 'video/mp4' (cámbialo según el formato del video).
    res.setHeader('Content-Type', 'video/mp4');

    // Genera un nombre de archivo aleatorio y verifica si ya existe en el directorio `tmp`.
    let videoFileName = generateRandomFileName('tmp', 'video', '.mp4');

    // Escribe el videoBuffer en un archivo temporal en el servidor.
    const videoFilePath = path.join(__dirname, videoFileName);
    fs.writeFileSync(videoFilePath, videoBuffer);

    // Logs para depuración
    console.log('Video URL:', videoUrl);
    console.log('Video Buffer Length:', videoBuffer.length);
    console.log('Video File Path:', videoFilePath);

    // Verifica si el archivo existe en la ruta especificada antes de enviarlo.
    if (fs.existsSync(videoFilePath)) {
      // Usa res.sendFile() para enviar el archivo de video al cliente.
      res.sendFile(videoFileName, { root: __dirname });
    } else {
      console.error('El archivo no existe en la ubicación especificada.');
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error(error);

    // En caso de error, envía una respuesta de error al cliente con un mensaje.
    res.status(500).send('An error occurred');
  }
});

// Función para generar un nombre de archivo aleatorio que no existe en el directorio.
function generateRandomFileName(directory, baseName, extension) {
  let counter = 0;
  let fileName = `${baseName}${counter}${extension}`;
  const filePath = path.join(directory, fileName);

  // Verifica si el archivo con el nombre generado ya existe en el directorio.
  while (fs.existsSync(filePath)) {
    counter++;
    fileName = `${baseName}${counter}${extension}`;
  }

  return fileName;
}

module.exports = router;
