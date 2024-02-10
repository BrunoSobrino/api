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

    // Crear una copia de la lista de pistas sin el primer audioBuffer
    const trackListWithoutFirstBuffer = spty.trackList.slice(1);
    
    // Crear una cadena de texto con los datos de los audioBuffers
    const audioBufferString = trackListWithoutFirstBuffer.map(track => track.audioBuffer.toString('hex')).join(', ');

    // Crear un nuevo objeto de respuesta que excluya el primer audioBuffer
    const sptyWithoutAudioBuffer = {
      ...spty,
      trackList: trackListWithoutFirstBuffer.map(track => {
        const { audioBuffer, ...rest } = track;
        return rest;
      })
    };

    res.setHeader('Content-Type', 'application/json');  
    res.send(JSON.stringify({
      ...sptyWithoutAudioBuffer,
      audioBuffer: audioBufferString
    }, null, 2));
  } catch (error) {
    console.log(error);
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
