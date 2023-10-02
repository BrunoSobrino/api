const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('./func/YT_mp3_mp4'); 

router.get('/', async (req, res) => {
  try {
    const link = req.query.url; 
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
    res.sendFile(fileName, { root: './tmp', headers: { 'Content-Type': 'video/mp4' } }, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(500).json({ error: 'Ocurrió un error al enviar el archivo' });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
    console.error(error);
  }
});

module.exports = router;
