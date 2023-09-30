const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');
const { getMusicBuffer } = require('./func/spotifysearch'); 

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
