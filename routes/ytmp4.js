const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const YT = require('./func/YT_mp3_mp4'); 

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
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
