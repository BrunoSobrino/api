const express = require('express');
const router = express.Router();
const axios = require('axios');
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');

const app = express();

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  handler: function(req, res) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  },
});

const cache = apicache.middleware;

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwloli.json');
    const data = response.data;
    const randomIndex = Math.floor(data.length * Math.random());
    const imageUrl = data[randomIndex];
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
