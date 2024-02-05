const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { facebookdlfunc } = require('../func/facebook');
const { getBuffer } = require('../func/functions');

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    if (!url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del video de Facebook.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }
    const results = await facebookdlfunc(url);
    const fileData = results.resultado.data;
    let fileName = `facebook_video_${Date.now()}.mp4`;
    let fileIndex = 1;
    while (fs.existsSync(`./tmp/${fileName}`)) {
      const extension = path.extname(fileName);
      const baseName = path.basename(fileName, extension);
      fileName = `${baseName}_${fileIndex}${extension}`;
      fileIndex++;
    }
    const fileBuffer = Buffer.isBuffer(fileData) ? fileData : await getBuffer(fileData);
    fs.writeFileSync(`./tmp/${fileName}`, fileBuffer);
    res.attachment(fileName);
    res.send(fileBuffer);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
