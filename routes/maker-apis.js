const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const { maker, ttp } = require('./func/functions');
const Photooxy = require('@sl-code-lords/photooxy');
const photooxy = new Photooxy();

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

router.get('/photooxy/painting-effect', async (req, res) => {
  const img = req.query.img;
  try {
    if (!img) {
      const errorResponse = {
        status: false,
        message: 'Debes agregar el link de la imagen a la cual se le dará el efecto.',
        example: 'api/maker/photooxy/painting-effect?img=https://telegra.ph/file/24fa902ead26340f3df2c.png'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }
    const downloadDirectory = './tmp';
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}.jpg`;
    const filePath = path.join(downloadDirectory, fileName);
    async function downloadAndSaveImage(imgUrl, filePath) {
        const response = await axios.get(imgUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
    }
    await downloadAndSaveImage(img, filePath);
    const imgBuffer = fs.readFileSync(filePath);
    const image3 = await photooxy.create({
      url: 'https://photooxy.com/create-an-oil-painting-effect-with-a-puppy-415.html',
      images: [imgBuffer]
    });
    console.log(image3);
    const img2_buf = await photooxy.image_to_buffer(image3.url);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(img2_buf);
  } catch (error) {
    console.log(error);
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
