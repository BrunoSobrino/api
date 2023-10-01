const express = require('express');
const router = express.Router();
const chatgpt = require('./func/chatgpt'); 

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const inputText = req.query.text;
  const lenguaje = req.query.lenguaje || 'es'; 
   try {
    const results = await chatgpt(inputText, lenguaje);
    const formattedResults = JSON.stringify(results, null, 2);
    res.send(formattedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la solicitud de chatgpt' });
  }
});

module.exports = router;
