const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { getMusicBuffer } = require('./func/spotify');

router.get('/', async (req, res) => {
  try {
    const input = req.query.text;
    const input2 = req.query.url;
    const soung = input ? input : input2
    if (!soung) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL o el titulo de la musica.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }
    const filePath = await getMusicBuffer(soung);
    res.sendFile(filePath, { root: '.', headers: { 'Content-Type': 'audio/mpeg' } });
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
