const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { googleImage, RandomAgresivo } = require('./func/functions');

router.get('/', async (req, res) => {
  const texto = req.query.text;
  try {
    if (!texto) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar el texto para buscar la imagen.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }    
    const imagess = await googleImage(texto);
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, imagess.length - 1);
      imageUrl = imagess[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'base64');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
