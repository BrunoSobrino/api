const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');
const { ytplay } = require('./func/ytplay');

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
  const searchText = req.query.text;
  const videoUrl = req.query.url;

  try {
    if (!searchText && !videoUrl) {
      throw new Error('Debes especificar un texto de búsqueda o una URL de video');
    }
    let results;
    if (searchText) {
      results = await ytplay(searchText);
    } else {
      results = await ytplay(videoUrl);
    }
    const formattedResults = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda de YouTube' });
  }
});

module.exports = router;
