const express = require('express');
const router = express.Router();
const YT = require('./func/YT_mp3_mp4');

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'video/mp4');
  const match_url = req.query.url;
  try {
    const videoBuffer = await YT.mp4_2(match_url);
    res.end(videoBuffer);
  } catch (error) {
    if (!error.response) {
      res.status(500).send('An error occurred');
    } else {
      res.status(500).send('An error occurred');
    }
  }
});

module.exports = router;
