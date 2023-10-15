const express = require('express');
const router = express.Router();
const path = require('path');
const { xnxxsearch } = require('./func/functions');

router.get('/', async (req, res) => {
  const query = req.query.text;
  try {
    if (!query) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un término de búsqueda'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
    } else {
      const result = await xnxxsearch(query);
      const formattedResults = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults);
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
