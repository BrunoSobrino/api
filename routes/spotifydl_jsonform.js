const express = require('express');
const router = express.Router();
const path = require('path');
const { spotifyDownload } = require('./func/spotify');

router.get('/', async (req, res) => {
  const urll = req.query.url;
  const input = urll
  try {
    if (!input) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL de la musica o Album de Spotify.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;      
    }
    const spty = await spotifyDownload(input);
    const formattedResults2 = JSON.stringify(spty, null, 2);
    res.setHeader('Content-Type', 'application/json');  
    res.send(formattedResults2);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
