const express = require('express');
const router = express.Router();
const path = require('path');
const { chatgpt, gpt } = require('./func/chatgpt'); 

router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const inputText = req.query.text;
  const lenguaje = req.query.lenguaje || 'es'; 
   try {
    if (!inputText) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto para usar chatgpt.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;      
    }     
    const results = await gpt(inputText) //chatgpt(inputText, lenguaje);
    const formattedResults = JSON.stringify(results, null, 2);
    res.send(formattedResults);
  } catch (error) {
     console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
