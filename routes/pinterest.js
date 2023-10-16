const express = require('express');
const router = express.Router();
const path = require('path');
const { pinterest } = require('./func/functions');

router.get('/', async (req, res) => {
  const texto = req.query.text; 
  try {
    if (!texto) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto de búsqueda.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const pint = await pinterest(texto);
    const formattedResults = JSON.stringify(pint, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.send(formattedResults);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
