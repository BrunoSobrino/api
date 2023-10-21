const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const { maker, ttp } = require('./func/functions');
//const canvacard = require("canvacard");
const knights = require("canvas-hikki")
const option = require('knights-canvas')

/* ------------{ canvas }------------ */

router.get('/canvas/welcome', async (req, res) => {
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


/* ------------{ stickers }------------ */

router.get('/attp', async (req, res) => {
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
    const ttpst = await ttp(texto);
    const imageResponse = await axios.get(ttpst.resultado, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

/* ------------{ textpro }------------ */

router.get('/textpro/deep-sea-metal', async (req, res) => {
  const texto = req.query.text; 
  try {
    if (!texto) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto para el logo.',
        example: 'api/maker/textpro/deep-sea-metal?text=api%20empire'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const resss = await maker('https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html', [texto])
    const imageResponse = await axios.get(resss.image, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/textpro/wolf-logo-galaxy', async (req, res) => {
  const texto1 = req.query.text1; 
  const texto2 = req.query.text2; 
  try {
    if (!texto1 || !texto2) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto para el logo.',
        example: 'api/maker/textpro/wolf-logo-galaxy?text1=api%20empire&text2=by%20brunosobrino'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const resss = await maker('https://textpro.me/create-wolf-logo-galaxy-online-936.html', [texto1, texto2])
    const imageResponse = await axios.get(resss.image, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

/* ------------{ photooxy }------------ */

router.get('/photooxy/flaming', async (req, res) => {
  const texto = req.query.text; 
  try {
    if (!texto) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto para el logo.',
        example: 'api/maker/photooxy/flaming?text=api%20empire'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const resss = await maker('https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html', [texto])
    const imageResponse = await axios.get(resss.image, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

/* ------------{ ephoto360 }------------ */

router.get('/ephoto360/eraser-deleting-text', async (req, res) => {
  const texto = req.query.text; 
  try {
    if (!texto) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar un texto para el logo.',
        example: 'api/maker/ephoto360/eraser-deleting-text?text=api%20empire'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }        
    const resss = await maker('https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html', [texto])
    const imageResponse = await axios.get(resss.image, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
