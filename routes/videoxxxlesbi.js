const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = Math.floor(data.length * Math.random());
    const videoUrl = data[randomIndex];
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');
    res.setHeader('Content-Type', 'video/mp4'); // Cambiar 'video/mp4' al tipo de contenido adecuado
    res.send(videoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
