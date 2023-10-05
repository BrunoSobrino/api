const express = require('express');
const router = express.Router();
const { igdl2 } = require('./func/igdl');

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    if (!url) {
      const exampleUsage = {
        usage: 'Ejemplo de uso: /api/igdl2?url=https://www.instagram.com/reel/Co3tkGLL8nl/'
      };
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json(exampleUsage);
      return;
    }
    const results = await igdl2(url); 
    const formattedResults = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la descarga de contenido de Instagram' });
  }
});

module.exports = router;
