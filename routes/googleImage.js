const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
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
    const images = await googleImage(texto);
    const image = RandomAgresivo(0, images.length - 1)
    console.log(image)
    res.setHeader('Content-Type', 'image/png')
    const imageBuffer = Buffer.from(image)
    res.end(imageBuffer);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
