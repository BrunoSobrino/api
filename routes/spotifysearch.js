const express = require('express');
const router = express.Router();
const { spotifySearch2 } = require('./func/spotify');
const path = require('path');

router.get('/', async (req, res) => {
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
    res.setHeader('Content-Type', 'application/json');  
    res.send(formattedResults2);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
