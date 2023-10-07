const express = require('express');
const router = express.Router();
const { spotifySearch2 } = require('./func/spotify');

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');  
  const textoo = req.query.text;
  try {
    if (!textoo) {
      const formattedError = {status: false, message: 'Debes proporcionar un texto.'};
      const formattedResults = JSON.stringify(formattedError, null, 2);
      return res.send(formattedResults);
    }
    const spty = await spotifySearch2(textoo);
    const formattedResponse = {status: true, spty};
    const formattedResults2 = JSON.stringify(formattedResponse, null, 2);
    res.send(formattedResults2);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los resultados.' });
  }
});

module.exports = router;
