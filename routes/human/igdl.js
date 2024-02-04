const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const { igdl2 } = require('../func/igdl');
const { getBuffer } = require('../func/functions');

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    if (!url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del video, post, reel, imagen de Instagram.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }
    const results = await igdl2(url);
      const fileType = results.data[0].type;
      const fileUrl = results.data[0].url_download;
      const archivoBuffer = await getBuffer(fileUrl);
      const extension = fileType === 'video' ? 'mp4' : 'jpg';
      const fileName = `instagram_${Date.now()}.${extension}`;
      let fileIndex = 1;
      while (fs.existsSync(`./tmp/${fileName}`)) {
        const baseName = path.basename(fileName, extension);
        fileName = `${baseName}_${fileIndex}.${extension}`;
        fileIndex++;
      }
      fs.writeFileSync(`./tmp/${fileName}`, archivoBuffer);
      res.setHeader('Content-Type', fileType === 'video' ? 'video/mp4' : 'image/jpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(archivoBuffer);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
