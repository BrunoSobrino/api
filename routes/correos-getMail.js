const express = require('express');
const router = express.Router();
const { generarCorreoAleatorio } = require('./func/tempmail');

router.get('/', async (req, res) => {
  try {
    const correoTemp = await generarCorreoAleatorio();
    const formattedResults = JSON.stringify(correoTemp, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    console.error(error);
    const errorMessage = 'Error al generar el correo aleatorio';
    const formattedError = JSON.stringify({
      status: false,
      error: errorMessage
    }, null, 2);
    res.status(500).json(JSON.parse(formattedError)); 
  }
});

module.exports = router;
