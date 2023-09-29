const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');
const { getTikTokBuffer } = require('./func/tiktokdl');
const { ytsearch } = require('./func/ytsearch');

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

  try {
    if (!searchText) {
      throw new Error('Texto de búsqueda no especificado');
    }

    const results = await ytsearch(searchText); 
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda de YouTube' });
  }
});

module.exports = router;
