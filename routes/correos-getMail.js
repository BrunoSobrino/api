const express = require('express');
const router = express.Router();
const path = require('path');
const { generarCorreoAleatorio } = require('./func/tempmail');

router.get('/', async (req, res) => {
  try {
    const correoTemp = await generarCorreoAleatorio();
    const formattedResults = JSON.stringify(correoTemp, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
