const express = require('express');
const router = express.Router();
const { ytplay } = require('./func/ytplay');

router.get('/', async (req, res) => {
  const searchText = req.query.text;
  const videoUrl = req.query.url;
  try {
    if (!searchText && !videoUrl) {
      throw new Error('Debes especificar un texto de búsqueda o una URL de video');
    }
    let results;
    if (searchText) {
      results = await ytplay(searchText);
    } else {
      results = await ytplay(videoUrl);
    }
    const formattedResults = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda de YouTube' });
  }
});

module.exports = router;
