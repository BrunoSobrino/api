const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('../func/YT_mp3_mp4');

router.get('/', async (req, res) => {
  const match_url = req.query.url;
  try {
    if (!match_url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL de video de YouTube'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const audioBuffer = await YT.mp3_2(match_url);
    const infoaud = await YT.ytinfo(match_url);
    let fileName = `audio_${Date.now()}.mp3`;
    let fileIndex = 1;
    while (fs.existsSync(`./tmp/${fileName}`)) {
      fileName = `audio_${Date.now()}_${fileIndex}.mp3`;
      fileIndex++;
    }
    fs.writeFileSync(`./tmp/${fileName}`, audioBuffer);
    res.download(`./tmp/${fileName}`, `${infoaud.resultado.title || fileName}.mp3`, (err) => {
      if (err) {
        res.sendFile(path.join(__dirname, '../public/500.html'));
      }
    });
  } catch (error) {
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
