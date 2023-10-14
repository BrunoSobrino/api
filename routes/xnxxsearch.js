const express = require('express');
const router = express.Router();
const { xnxxsearch } = require('./func/functions');

router.get('/', async (req, res) => {
  const query = req.query.text;
  try {
    if (!query) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un término de búsqueda'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.status(400).json(formattedResults_e);
    } else {
      const result = await xnxxsearch(query);
      const formattedResults = JSON.stringify(result, null, 2);
      res.status(200).json(formattedResults);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error en la búsqueda de XNXX' });
  }
});

module.exports = router;
