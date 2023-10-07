const express = require('express');
const router = express.Router();
const fs = require('fs');
const { getMusicBuffer } = require('./func/spotify');

router.get('/', async (req, res) => {
  try {
    const input = req.query.text;
    if (!input) {
      res.status(400).json({ error: 'Se requiere un parámetro "input" en la consulta.' });
      return;
    }
    const filePath = await getMusicBuffer(input);
    res.sendFile(filePath, { root: '.', headers: { 'Content-Type': 'audio/mpeg' } });
  } catch (error) {
    console.error('Ocurrió un error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
});

module.exports = router;
