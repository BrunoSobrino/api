const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('./func/YT_mp3_mp4'); 

router.get('/', async (req, res) => {
  try {
    const link = req.query.url; 
    const videoData = await YT.mp4_2(link); 
    const videoBuffer = Buffer.from(videoData.buffer); 
    let fileName = `video_${Date.now()}.mp4`;
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
    console.error('Ocurrió un error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
});

module.exports = router;
