const express = require('express');
const router = express.Router();
const { getMusicBuffer } = require('./func/spotifysearch'); 

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'audio/mpeg');
  const songName = req.query.songName; 
  try {
    const songBuffer = await getMusicBuffer(songName); 
    res.end(songBuffer);
  } catch (error) {
    if (!error.response) {
      res.status(500).send('An error occurred');
    } else {
      res.status(500).send('An error occurred');
    }
  }
});

module.exports = router;
