const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');
const fs = require('fs');
const YT = require('./func/YT_mp3_mp4'); 

const app = express();

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  handler: function (req, res) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  },
});

const cache = apicache.middleware;

router.get('/', cache('2 minutes'), apiRequestLimiter, async (req, res) => {
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('Strict-Transport-Security', 'max-age=63072000');
  res.setHeader('Content-Type', 'application/json');
  
  const match_url = req.query.url;
  
  try {
    const audioData = await YT.mp3(match_url);
    const jsonResponse = {
      meta: {
        channelUrl: audioData.meta.channelUrl,
        views: audioData.meta.views,
        category: audioData.meta.category,
        id: audioData.meta.id,
        url: audioData.meta.url,
        publicDate: audioData.meta.publicDate,
        uploadDate: audioData.meta.uploadDate,
        keywords: audioData.meta.keywords,
        title: audioData.meta.title,
        channel: audioData.meta.channel,
        seconds: audioData.meta.seconds,
        image: audioData.meta.image,
      },
      path: audioData.path,
      size: fs.statSync(audioData.path).size,
    };
    res.send(JSON.stringify(jsonResponse, null, 4));
  } catch (error) {
    if (!error.response) {
      res.json({ error: 'An error occurred' });
    } else {
      res.json({ error: 'An error occurred' });
    }
  }
});
module.exports = router;
