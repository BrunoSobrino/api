const express = require('express');
const router = express.Router();
const axios = require('axios');
const { RandomAgresivo } = require('./func/functions');

router.get('/akira', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-akira.json');
    const data = response.data;
    const randomIndex = RandomAgresivo(0, data.length - 1);
    const imageUrl = data[randomIndex];
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

router.get('/akiyama', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-akiyama.json');
    const data = response.data;
    const randomIndex = RandomAgresivo(0, data.length - 1);
    const imageUrl = data[randomIndex];
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


module.exports = router;
