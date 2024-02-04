const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('../func/YT_mp3_mp4');

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
    const videoData = await YT.mp4_2(link);
    const infovid = await YT.ytinfo(link);
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
    console.log(infovid)
    res.download(`./tmp/${fileName}`, `${infovid.resultado.title || fileName}.mp4`, (err) => {
      if (err) {
        res.sendFile(path.join(__dirname, '../public/500.html'));
      }
    });
  } catch (error) {
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
