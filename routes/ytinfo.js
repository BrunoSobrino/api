const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { ytplay } = require('./func/ytplay');

router.get('/', async (req, res) => {
  const match_url = req.query.url;
  try {
    if (!match_url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL de video de YouTube'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const infoaud = await ytplay(match_url);
    const formattedResults = JSON.stringify(infoaud, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);    
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
