const express = require('express');
const router = express.Router();
const path = require('path');
const { facebookdlfunc } = require('./func/facebook'); 

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    if (!url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del video de facebook.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;      
    }
    const results = await facebookdlfunc(url);
      const formattedResults = JSON.stringify(results, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
