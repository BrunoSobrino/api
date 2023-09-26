const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { rateLimit } = require('express-rate-limit');
const apicache = require("apicache");

const app = express();

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 40,
    handler: function (req, res) {
        return res.status(429).json({ error: 'Rate limit exceeded' });
    }
});

const cache = apicache.middleware;

// Import the ttimg function from './func-ttimg'
const ttimg = require('./func-ttimg');

// Define the route
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
        // Call the ttimg function here
        const result = await ttimg(match_url);

        res.send(JSON.stringify(result, null, 4));
    } catch (error) {
        // Handle errors here, you can use a similar approach as in your example
        if (!error.response) {
            res.json({ error: 'An error occurred' });
        } else {
            res.json({ error: 'An error occurred' });
        }
    }
});

// Define other routes or middleware as needed

// Start the Express app
const PORT = process.env.PORT || 3000;
app.use('/api', router); // Use the router for /api/* routes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
