const express = require('express');
const router = express.Router();
const { generarCorreoAleatorio } = require('./func/tempmail');

router.get('/', async (req, res) => {
  try {
    const correoTemp = await generarCorreoAleatorio();
    const formattedResponse = JSON.stringify({
      status: true,
      mail: correoTemp.correo
    }, null, 2);
    res.status(200).json(JSON.parse(formattedResponse)); 
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
