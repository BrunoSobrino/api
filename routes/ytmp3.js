const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('./func/YT_mp3_mp4');
const { ytmp33 } = require('./func/yt25');
const { obtenerInformacionYoutube } = require('./func/ytdl3');
const { getBuffer } = require('./func/functions');

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
    
    try {
      const result = await ytmp33(match_url);
      const audio11 = await getBuffer(result.resultados.descargar);
        const fileName = `audio_${Date.now()}.mp3`;
        let fileIndex = 1;
        while (fs.existsSync(`./tmp/${fileName}`)) {
          fileName = `audio_${Date.now()}_${fileIndex}.mp3`;
          fileIndex++;
        }
        fs.writeFileSync(`./tmp/${fileName}`, Buffer.from(audio11));
        res.sendFile(fileName, { root: './tmp', headers: { 'Content-Type': 'audio/mpeg' } });
    } catch (error) {
      try {
        const audioBuffer = await YT.mp3(match_url);
        let fileName = `audio_${Date.now()}.mp3`;
        let fileIndex = 1;
        while (fs.existsSync(`./tmp/${fileName}`)) {
          fileName = `audio_${Date.now()}_${fileIndex}.mp3`;
          fileIndex++;
        }
        fs.writeFileSync(`./tmp/${fileName}`, audioBuffer);
        res.sendFile(fileName, { root: './tmp', headers: { 'Content-Type': 'audio/mpeg' } });
      } catch {
        try {
          const youtubeInfo = await obtenerInformacionYoutube(match_url);
          const formattedResults = JSON.stringify(youtubeInfo, null, 2);
          const audio = await getBuffer(youtubeInfo.resultado.ytmp3v2.audio);
          const audioBuffer = Buffer.from(audio); 
          let fileName = `audiomp3_${Date.now()}.mp3`;
          let fileIndex = 1;
          while (fs.existsSync(`./tmp/${fileName}`)) {
            const extension = path.extname(fileName);
            const baseName = path.basename(fileName, extension);
            fileName = `${baseName}_${fileIndex}${extension}`;
            fileIndex++;
          }
          fs.writeFileSync(`./tmp/${fileName}`, audioBuffer);
          res.sendFile(fileName, { root: './tmp' });
        } catch (error) {
          res.sendFile(path.join(__dirname, '../public/500.html'));
        }
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
