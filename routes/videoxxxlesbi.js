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

    const baseName = 'video.mp4'; // Nombre base del archivo
    let videoFileName = baseName;
    let counter = 1;

    // Genera un nombre de archivo único con sufijo numérico
    while (fs.existsSync(path.join(tmpDirectory, videoFileName))) {
      videoFileName = `${baseName.replace('.mp4', '')}_${counter}.mp4`;
      counter++;
    }

    const videoFilePath = path.join(tmpDirectory, videoFileName);

    const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
    const videoStream = videoResponse.data;
    const writeStream = fs.createWriteStream(videoFilePath);
    videoStream.pipe(writeStream);

    writeStream.on('finish', () => {
      res.sendFile(videoFilePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;

