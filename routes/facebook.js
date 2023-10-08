const express = require('express');
const router = express.Router();
const { facebookdlfunc } = require('./func/facebook'); 

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    const results = await facebookdlfunc(url);
      const formattedResults = JSON.stringify(results, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la descarga de contenido de Facebook' });
  }
});

module.exports = router;
