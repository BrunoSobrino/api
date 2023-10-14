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
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
    } else {
      const result = await xnxxdl(videoUrl);
      const formattedResults = JSON.stringify(result, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error al obtener los datos de XNXX' });
  }
});

module.exports = router;
