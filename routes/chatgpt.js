const express = require('express');
const router = express.Router();
const chatgpt = require('./func/chatgpt'); 

router.get('/', async (req, res) => {
  const inputText = req.query.text;
  const lenguaje = req.query.lenguaje || 'es'; 
  try {
    if (!inputText) {
      throw new Error('Texto de entrada no especificado');
    }
    const results = await chatgpt(inputText, lenguaje);
    const formattedResults = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    const correctEscapeSequences = async function (text) {
    const correctedText = text.replace(/\\U/g, "\\u").replace(/\\f/g, "\\u00");
      return correctedText;
    }
    const finr = await correctEscapeSequences(formattedResults)
    res.send(finr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la solicitud de chatgpt' });
  }
});

module.exports = router;
