const express = require('express');
const router = express.Router();
const { generarCorreoAleatorio } = require('./func/tempmail');

router.get('/', async (req, res) => {
  try {
    const correoTemp = await generarCorreoAleatorio();
      res.status(200).json({
        status: true,
        correo: correoTemp.correo
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el correo aleatorio' });
  }
});

module.exports = router;
