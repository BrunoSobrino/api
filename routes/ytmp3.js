const express = require('express');
const router = express.Router();
const fs = require('fs');
const YT = require('./func/YT_mp3_mp4');

router.get('/', async (req, res) => {
  try {
    const match_url = req.query.url;
    const audioBuffer = await YT.mp3(match_url);
    let fileName = `audio_${Date.now()}.mp3`;
    let fileIndex = 1;
    while (fs.existsSync(`./tmp/${fileName}`)) {
      fileName = `audio_${Date.now()}_${fileIndex}.mp3`;
      fileIndex++;
    }
    fs.writeFileSync(`./tmp/${fileName}`, audioBuffer);
    res.sendFile(fileName, { root: './tmp', headers: { 'Content-Type': 'audio/mpeg' } });
  } catch (error) {
    console.error('Ocurrió un error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
});

module.exports = router;
