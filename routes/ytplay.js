const express = require('express');
const router = express.Router();
const path = require('path');
const { ytplay } = require('./func/ytplay');

router.get('/', async (req, res) => {
  const searchText = req.query.text;
  const videoUrl = req.query.url;
  try {
    if (!searchText && !videoUrl) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto de búsqueda o una URL de video'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
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
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
