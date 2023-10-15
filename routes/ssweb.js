const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { ssweb } = require('./func/functions');

router.get('/', async (req, res) => {
  const match_url = req.query.url;
  try {
    if (!match_url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL de la web que quieras tomar captura.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }    
    const imageBuffer = await ssweb(match_url);
    res.end(imageBuffer);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
