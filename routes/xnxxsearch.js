const express = require('express');
const router = express.Router();
const { xnxxsearch } = require('./func/functions');

router.get('/xnxxsearch', async (req, res) => {
  const query = req.query.text;
  try {
    if (!query) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un término de búsqueda'
      };
      res.status(400).json(errorResponse);
    } else {
      const result = await xnxxsearch(query);
      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error en la búsqueda de XNXX' });
  }
});

module.exports = router;
