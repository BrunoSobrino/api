const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = Math.floor(data.length * Math.random());
    const videoUrl = data[randomIndex];
    const tmpDirectory = path.join(__dirname, '..', 'tmp'); // Ruta absoluta
    fs.mkdirSync(tmpDirectory, { recursive: true }); // Asegura que la carpeta tmp exista

    let videoFileName = `video_${Date.now()}.mp4`;
    let fileIndex = 1;

    // Genera un nombre de archivo único con sufijo numérico
    while (fs.existsSync(path.join(tmpDirectory, videoFileName))) {
      videoFileName = `video_${Date.now()}_${fileIndex}.mp4`;
      fileIndex++;
    }

    const videoFilePath = path.join(tmpDirectory, videoFileName);

    const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoStream = videoResponse.data;
    const writeStream = fs.createWriteStream(videoFilePath);
    videoStream.pipe(writeStream);

    writeStream.on('finish', () => {
      res.sendFile(videoFileName, { root: tmpDirectory, headers: { 'Content-Type': 'video/mp4' } });
    });
  } catch (error) {
    console.error('Ocurrió un error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
});

module.exports = router;
