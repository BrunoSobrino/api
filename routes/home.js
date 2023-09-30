const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json('Api Rest - By BrunoSobrino - En Desarollo');
});

module.exports = router;
