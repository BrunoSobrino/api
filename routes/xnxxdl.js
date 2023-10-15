const express = require('express');
const router = express.Router();
const path = require('path');
const { xnxxdl } = require('./func/functions');

router.get('/', async (req, res) => {
  const videoUrl = req.query.url;
  try {
    if (!videoUrl) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar una URL de video'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
    } else {
      const result = await xnxxdl(videoUrl);
      const formattedResults = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults);
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
