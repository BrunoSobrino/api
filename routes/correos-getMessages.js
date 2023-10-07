const express = require('express');
const router = express.Router();
const { obtenerCorreos } = require('./func/tempmail'); 

router.get('/', async (req, res) => {
  const correoCompleto = req.query.mail;
  try {
    if (!correoCompleto) {
      const errorMessage = 'Debes proporcionar un correo';
      const formattedError = JSON.stringify({
        status: false,
        message: errorMessage
      }, null, 2);
      return res.status(200).json(JSON.parse(formattedError));
    }
    const correos = await obtenerCorreos(correoCompleto);
    const formattedResponse = JSON.stringify({
      status: true,
      correos: correos.correos
    }, null, 2);
    res.status(200).json(JSON.parse(formattedResponse));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los correos' });
  }
});

module.exports = router;
