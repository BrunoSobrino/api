const express = require('express');
const router = express.Router();
const path = require('path'); 

router.get('/youtube', async (req, res) => {
    const indexPath = path.join(__dirname, '..', 'public', 'human-youtubedl.html');
    res.sendFile(indexPath);
});

router.get('/instagram', async (req, res) => {
    const indexPath = path.join(__dirname, '..', 'public', 'human-igdl.html');
    res.sendFile(indexPath);
});

router.get('/facebook', async (req, res) => {
    const indexPath = path.join(__dirname, '..', 'public', 'human-facebook.html');
    res.sendFile(indexPath);
});

module.exports = router;
