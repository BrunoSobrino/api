const express = require('express');
const router = express.Router();
const path = require('path');
const { ytsearch } = require('./func/ytsearch');

router.get('/', async (req, res) => {
  const searchText = req.query.text;
  try {
    if (!searchText) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto para hacer la busqueda de vieos en YouTube.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }    
    const results = await ytsearch(searchText);
    const formattedResults = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
