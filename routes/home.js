const express = require('express');
const router = express.Router();
const { rateLimit } = require('express-rate-limit');
const apicache = require("apicache");
const cache = apicache.middleware

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 40,
    handler: function (req, res) {
        return res.status(429).json(
          dummydata()
        )
    }
})

router.get('/', cache('1 hour'), apiRequestLimiter, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json('Api Rest - By BrunoSobrino - En Desarollo');
});

module.exports = router;
