const express = require('express');
const router = express.Router();
const path = require('path');
const canvacard = require("canvacard");

router.get('/', async (req, res) => {
  const img = req.query.img;
  const background = req.query.background;
  if (!img || !background) {
    const errorResponse = {
      status: false,
      message: 'Debes proporcionar la URL de la imagen de perfil y el fondo.'
    };
    const formattedResults_e = JSON.stringify(errorResponse, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(formattedResults_e);
    return;
  }
  try {  
  const welcomer = new canvacard.Welcomer()
    .setAvatar(img)
    .setBackground('IMAGE', background)
    .setTitulo("WELCOME")
    .setSubtitulo("Subtitulo personalizable!")
    .setTitulo("Titulo personalizable!")
    .setSubtitulo("Subtitulo personalizable!")
    .setColorTitulo("#FFFFFF")
    .setColorSubtitulo("#5865f2")
    .setColorCircle("#FFFFFF")
    .setColorOverlay("#000000")
    .setOpacityOverlay("0.4");
    const imageData = await welcomer.build();
    res.contentType('image/png');
    res.send(imageData);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
