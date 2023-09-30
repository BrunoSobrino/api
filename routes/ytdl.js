const express = require('express');
const router = express.Router();
const YT = require('./func/YT_mp3_mp4');

router.get('/', async (req, res) => {
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
