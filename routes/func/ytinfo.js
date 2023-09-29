const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { rateLimit } = require('express-rate-limit');
const apicache = require("apicache");
const YT = require('./func/YT_mp3_mp4');

const app = express();

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 40,
    handler: function (req, res) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
    }
});

const cache = apicache.middleware;

router.get('/', cache('2 minutes'), apiRequestLimiter, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const match_url = req.query.url;
    try {
        const result = await YT.ytinfo(match_url);
        res.send(JSON.stringify(result, null, 4));
    } catch (error) {
        if (!error.response) {
            res.json({ error: 'An error occurred' });
        } else {
            res.json({ error: 'An error occurred' });
        }
    }
});

module.exports = router;
