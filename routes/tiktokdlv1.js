const express = require('express');
const router = express.Router();
const path = require('path');
const { tiktokv2, tiktokDownloader } = require('./func/tiktokdl');

router.get('/', async (req, res) => {
  const url = req.query.url; 
  try {
    if (!url) {
      const errorResponse = {
        status: false,
        message: 'Debes ingresar el link de un video o imagen de tiktok.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const pint = await tiktokDownloader(url);
    const formattedResults = JSON.stringify(pint, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
