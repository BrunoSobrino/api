const express = require('express');
const router = express.Router();
const { obtenerCorreos } = require('./func/tempmail'); 

router.get('/', async (req, res) => {
  const correoCompleto = req.query.correo;
  try {
    const correos = await obtenerCorreos(correoCompleto);
      res.status(200).json({
        status: true,
        correos: correos.correos
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los correos' });
  }
});

module.exports = router;
