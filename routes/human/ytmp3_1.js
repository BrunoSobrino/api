const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { obtenerInformacionYoutube } = require('../func/ytdl3');
const { getBuffer } = require('../func/functions');

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
    const youtubeInfo = await obtenerInformacionYoutube(match_url);
    const audioBuffer = await getBuffer(youtubeInfo.resultado.ytmp3v2.audio);
    let fileName = `audiomp3_${Date.now()}.mp3`;
    let fileIndex = 1;
    while (fs.existsSync(`./tmp/${fileName}`)) {
      const extension = path.extname(fileName);
      const baseName = path.basename(fileName, extension);
      fileName = `${baseName}_${fileIndex}${extension}`;
      fileIndex++;
    }
    fs.writeFileSync(`./tmp/${fileName}`, audioBuffer);
    res.setHeader('Content-Disposition', `attachment; filename="${youtubeInfo.resultado.ytmp3v2.title || fileName}.mp3"`);
    res.sendFile(fileName, { root: './tmp' });
  } catch (error) {  
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
