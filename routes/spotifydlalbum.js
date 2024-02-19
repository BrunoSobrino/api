const express = require('express');
const router = express.Router();
const path = require('path');
const { spotifyDownload } = require('./func/spotify');

router.get('/', async (req, res) => {
  const urll = req.query.url;
  const input = urll;
  try {
    if (!input) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL de un Álbum de Spotify.'
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(errorResponse, null, 2));
      return;      
    }
    let spty = await spotifyDownload(input);
    console.log(spty);

    // Convertir todos los audioBuffers a base64
    const audioBuffersBase64 = spty.trackList.map(track => track.audioBuffer.toString('base64'));

    res.setHeader('Content-Type', 'application/json');  
    res.send(JSON.stringify({
      ...spty,
      audioBuffer: audioBuffersBase64.join(', ')
    }, null, 2));
  } catch (error) {
    console.log(error);
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
