const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { facebookdlfunc } = require('../func/facebook');
const { getBuffer } = require('../func/functions');
const fileType = require('file-type');

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    if (!url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del video de Facebook.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }

    const results = await facebookdlfunc(url);
    const fileData = results.resultado.data;

    // Detectar el tipo de archivo utilizando file-type
    const detectedFileType = fileType(fileData);

    // Determinar si es video o imagen
    const isVideo = detectedFileType && detectedFileType.mime.includes('video');

    // Nombre personalizado para el archivo de descarga
    let fileName = isVideo ? `facebook_video_${Date.now()}.mp4` : `facebook_imagen_${Date.now()}.png`;

    // Lógica para cambiar el nombre si ya existe
    let fileIndex = 1;
    while (fs.existsSync(`./tmp/${fileName}`)) {
      const extension = path.extname(fileName);
      const baseName = path.basename(fileName, extension);
      fileName = `${baseName}_${fileIndex}${extension}`;
      fileIndex++;
    }

    // Convertir el archivo a buffer (si es necesario)
    const fileBuffer = Buffer.isBuffer(fileData) ? fileData : await getBuffer(fileData);

    // Guardar el archivo en el directorio temporal
    fs.writeFileSync(`./tmp/${fileName}`, fileBuffer);

    // Configurar el encabezado para la descarga
    res.attachment(fileName);

    // Enviar el archivo como descarga
    res.send(fileBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
