const express = require('express');
const router = express.Router();
const { getTikTokBuffer } = require('./func/tiktokdl');

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'video/mp4');
  const match_url = req.query.url;
  try {
    const videoBuffer = await getTikTokBuffer(match_url);
    res.send(videoBuffer);
  } catch (error) {
    if (!error.response) {
      res.status(500).send('An error occurred');
    } else {
      res.status(500).send('An error occurred');
    }
  }
});

module.exports = router;
