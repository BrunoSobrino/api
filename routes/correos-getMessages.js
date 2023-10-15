const express = require('express');
const router = express.Router();
const path = require('path');
const { obtenerCorreos } = require('./func/tempmail'); 

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');  
  const correoCompleto = req.query.mail;
  try {
    if (!correoCompleto) {
      const formattedError = {status: false, message: 'Debes proporcionar un correo'};
      const formattedResults = JSON.stringify(formattedError, null, 2);
      return res.send(formattedResults);
    }
    const correos = await obtenerCorreos(correoCompleto);
    const formattedResponse = {status: true, correos: correos.correos};
    const formattedResults2 = JSON.stringify(formattedResponse, null, 2);
    res.send(formattedResults2);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
