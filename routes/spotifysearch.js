const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const apicache = require('apicache');
const spotifySearch = require('./func/spotifysearch'); 

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
    const spotifyResults = await spotifySearch(searchText);
    res.setHeader('Content-Type', 'application/json');
    res.send(spotifyResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
});

module.exports = router;
