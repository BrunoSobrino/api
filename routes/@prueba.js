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
      example: 'api/maker/canvas/welcome?username=shadow&subtitulo=bienvenido%20al%20grupo&ppuser=https://telegra.ph/file/24fa902ead26340f3df2c.png&background=https://static.videezy.com/system/resources/thumbnails/000/040/439/original/Comp-8.jpg'
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
    .setColorOverlay("rgba(0, 0, 0, 0.5)")
    .setOpacityOverlay("0.4");
    const imageData = await welcomer.build();
    res.contentType('image/png');
    res.send(imageData);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
