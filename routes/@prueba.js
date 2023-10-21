const express = require('express');
const router = express.Router();
const path = require('path');
const canvacard = require("canvacard");

router.get('/', async (req, res) => {
  const username = req.query.username 
  const subtitulo = req.query.subtitulo   
  const img = req.query.ppuser;
  const background = req.query.background;
  if (!img || !background || !username || !subtitulo) {
    const errorResponse = {
      status: false,
      message: 'Debes proporcionar la URL de la imagen de perfil y el fondo, asi como el nombre de usuario y un subtitulo.',
      example: 'https://api.boxmine.xyz/api/canvas/welcome?username?=shadow&subtitulo=bienvenido%20al%20grupo&img=https://cdn.discordapp.com/embed/avatars/0.png&background=https://i.imgur.com/5O7xmVe.png'
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
    .setSubtitulo(subtitulo)
    .setTitulo(username)
    .setSubtitulo(subtitulo)
    .setColorTitulo("#FFFFFF")
    .setColorSubtitulo("#5865f2")
    .setColorCircle("#FFFFFF")
    .setColorOverlay("transparent")
    .setOpacityOverlay("0.4");
    const imageData = await welcomer.build();
    res.contentType('image/png');
    res.send(imageData);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
