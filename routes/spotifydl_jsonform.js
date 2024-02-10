const express = require('express');
const router = express.Router();
const path = require('path');
const { spotifyDownload } = require('./func/spotify');

// Función para convertir un array de números en una cadena separada por comas
function arrayToCommaSeparatedString(array) {
  return array.join(', ');
}

router.get('/', async (req, res) => {
  const urll = req.query.url;
  const input = urll;
  try {
    if (!input) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL de la música o Álbum de Spotify.'
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(errorResponse, null, 2));
      return;      
    }

    let spty = await spotifyDownload(input);

    // Convertir audioBuffer en una cadena de números separada por comas
    let audioBufferString = '';
    if (spty.audioBuffer) {
      audioBufferString = arrayToCommaSeparatedString(spty.audioBuffer);
    } else if (spty.trackList && spty.trackList.length > 0) {
      const trackAudioBuffers = spty.trackList.map(track => track.audioBuffer).filter(buffer => buffer); // Filter out null or undefined values
      audioBufferString = arrayToCommaSeparatedString([].concat(...trackAudioBuffers));
    }

    // Crear un nuevo objeto que contenga todos los datos menos audioBuffer
    const sptyWithoutAudioBuffer = { ...spty };
    delete sptyWithoutAudioBuffer.audioBuffer;
    if (sptyWithoutAudioBuffer.trackList) {
      sptyWithoutAudioBuffer.trackList.forEach(track => delete track.audioBuffer);
    }

    // Enviar los datos formateados como JSON, incluyendo audioBuffer como una cadena de texto
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
