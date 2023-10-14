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

    const videoFileName = generateUniqueFileName('video.mp4', tmpDirectory);
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

function generateUniqueFileName(baseName, directory) {
  let timestamp = new Date().getTime();
  let uniqueName = `${timestamp}_${baseName}`;
  while (fs.existsSync(path.join(directory, uniqueName))) {
    timestamp++;
    uniqueName = `${timestamp}_${baseName}`;
  }
  return uniqueName;
}

module.exports = router;

