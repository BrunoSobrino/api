const express = require('express');
const router = express.Router();
const { ytsearch } = require('./func/ytsearch');

router.get('/', async (req, res) => {
  const searchText = req.query.text;
  try {
    if (!searchText) {
      throw new Error('Texto de búsqueda no especificado');
    }
    const results = await ytsearch(searchText);
    const formattedResults = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda de YouTube' });
  }
});

module.exports = router;
