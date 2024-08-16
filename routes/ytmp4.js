const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('./func/YT_mp3_mp4');
const { ytmp44 } = require('./func/yt25');
const { obtenerInformacionYoutube } = require('./func/ytdl3');
const { getBuffer } = require('./func/functions');

router.get('/', async (req, res) => {
  const link = req.query.url;
  try {
    if (!link) {
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
      const result = await ytmp44(link);
      const video = await getBuffer(result.resultados.descargar);
      const videoBuffer = Buffer.from(video); 
      let fileName = `videomp4_${Date.now()}.mp4`;
      let fileIndex = 1;
      while (fs.existsSync(`./tmp/${fileName}`)) {
        const extension = path.extname(fileName);
        const baseName = path.basename(fileName, extension);
        fileName = `${baseName}_${fileIndex}${extension}`;
        fileIndex++;
      }
      fs.writeFileSync(`./tmp/${fileName}`, videoBuffer);
      res.sendFile(fileName, { root: './tmp', headers: { 'Content-Type': 'video/mp4' } });
    } catch (error) {
      try {
        const videoData = await YT.mp4(link); 
        const videoPath = videoData.path;
        let fileName = path.basename(videoPath);
        let fileIndex = 1;
        while (fs.existsSync(`./tmp/${fileName}`)) {
          const extension = path.extname(fileName);
          const baseName = path.basename(fileName, extension);
          fileName = `${baseName}_${fileIndex}${extension}`;
          fileIndex++;
        }
        fs.renameSync(videoPath, `./tmp/${fileName}`);
        res.sendFile(fileName, { root: './tmp', headers: { 'Content-Type': 'video/mp4' } });
      } catch {
        try {
          const youtubeInfo = await obtenerInformacionYoutube(link);
          const video = await getBuffer(youtubeInfo.resultado.ytmp4.video);
          const videoBuffer = Buffer.from(video); 
          let fileName = `videomp4_${Date.now()}.mp4`;
          let fileIndex = 1;
          while (fs.existsSync(`./tmp/${fileName}`)) {
            const extension = path.extname(fileName);
            const baseName = path.basename(fileName, extension);
            fileName = `${baseName}_${fileIndex}${extension}`;
            fileIndex++;
          }
          fs.writeFileSync(`./tmp/${fileName}`, videoBuffer);
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
