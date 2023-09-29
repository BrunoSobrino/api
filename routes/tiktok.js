const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');
const { getTikTokBuffer } = require('./func/tiktokdl');

const app = express();

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  handler: function(req, res) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  },
});

const cache = apicache.middleware;

router.get('/', cache('2 minutes'), apiRequestLimiter, async (req, res) => {
  res.setHeader('Content-Type', 'video/mp4');
  const tiktokUrl = req.query.url;
  try {
    const videoBuffer = await getTikTokBuffer(tiktokUrl);
      res.end(videoBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
