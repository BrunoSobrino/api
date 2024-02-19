const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { getTikTokBuffer } = require('./func/tiktokdl');

router.get('/', async (req, res) => {
  const link = req.query.url; 
  try {
    if (!link) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del video de tiktok.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;      
    }    
    const videoData = await getTikTokBuffer(link); 
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
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
