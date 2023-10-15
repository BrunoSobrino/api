const express = require('express');
const router = express.Router();
const path = require('path');
const ttimg = require('./func/ttimg');

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const match_url = req.query.url;
    try {
    if (!match_url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del videoimagenes de tiktok.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;      
    }        
    const result = await ttimg(match_url);
    res.send(JSON.stringify(result, null, 4));
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
