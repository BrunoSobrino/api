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
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');
    const tmpDirectory = path.join(__dirname, '..', 'tmp');
    if (!fs.existsSync(tmpDirectory)) {
      fs.mkdirSync(tmpDirectory);
    }
    let counter = 0;
    let videoFileName = 'video.mp4';
    let videoFilePath = path.join(tmpDirectory, videoFileName);
    while (fs.existsSync(videoFilePath)) {
      counter++;
      videoFileName = `video_${counter}.mp4`;
      videoFilePath = path.join(tmpDirectory, videoFileName);
    }
    fs.writeFileSync(videoFilePath, videoBuffer);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    if (fs.existsSync(videoFilePath)) {
      res.send(videoFileName, { root: tmpDirectory });
    } else {
      console.error('El archivo no existe en la ubicación especificada.');
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
