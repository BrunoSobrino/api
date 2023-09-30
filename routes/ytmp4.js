const express = require('express');
const router = express.Router();
const fs = require('fs');
const YT = require('./func/YT_mp3_mp4');

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'video/mp4');
  const match_url = req.query.url;
  let videoPath;
  try {
    const videoData = await YT.mp4(match_url);
    videoPath = videoData.path;
    const fileStream = fs.createReadStream(videoPath);
    fileStream.on('close', () => {
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    });
    fileStream.pipe(res);
  } catch (error) {
    if (!error.response) {
      res.status(500).send('An error occurred');
    } else {
      res.status(500).send('An error occurred');
    }
  }
});

module.exports = router;
