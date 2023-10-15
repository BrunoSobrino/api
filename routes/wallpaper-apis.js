const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const { RandomAgresivo, wallpaper } = require('./func/functions');

router.get('/wprandom', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/wprandom.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/cristianoronaldo', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/CristianoRonaldo.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/messi', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/Messi.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/itzy', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/itzy.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/navidad', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/navidad.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/wpmontaña', async (req, res) => {
  try {
    const response = await wallpaper('mountain');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
