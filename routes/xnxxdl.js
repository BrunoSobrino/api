const express = require('express');
const router = express.Router();
const { xnxxdl } = require('./func/functions');

router.get('/', async (req, res) => {
  const videoUrl = req.query.url;
  try {
    if (!videoUrl) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar una URL de video'
      };
      res.status(400).json(errorResponse);
    } else {
      const result = await xnxxdl(videoUrl);
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error al obtener los datos de XNXX' });
  }
});

module.exports = router;
