const express = require('express');
const router = express.Router();
const path = require('path'); 

router.get('/', async (req, res) => {
    const indexPath = path.join(__dirname, '..', 'public', 'login.html');
    res.sendFile(indexPath);
});

module.exports = router;
