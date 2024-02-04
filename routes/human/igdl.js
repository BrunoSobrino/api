const express = require('express');
const router = express.Router();
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const archiver = require('archiver');
const { igdl2 } = require('../func/igdl');
const { getBuffer } = require('../func/functions');

router.get('/', async (req, res) => {
  const url = req.query.url;
  try {
    if (!url) {
      const errorResponse = {
        status: false,
        message: 'Debes especificar la URL del video, post, reel, imagen de Instagram.'
      };
      const formattedResults_e = JSON.stringify(errorResponse, null, 2);
      res.setHeader('Content-Type', 'application/json');
      res.send(formattedResults_e);
      return;
    }

    const results = await igdl2(url);

    if (results.data.length > 1) {
      const archivosPromises = results.data.map(async (archivo, index) => {
        const fileType = archivo.type;
        const fileUrl = archivo.url_download;

        // Realizar la solicitud HTTP a la URL de descarga de Instagram
        const archivoBuffer = await getBuffer(fileUrl);

        const extension = fileType === 'video' ? 'mp4' : 'jpg';
        let fileName = `instagram_${Date.now()}_${index + 1}.${extension}`;

        let fileIndex = 1;
        while (fs.existsSync(`./tmp/${fileName}`)) {
          const baseName = path.basename(fileName, extension);
          fileName = `${baseName}_${fileIndex}.${extension}`;
          fileIndex++;
        }

        fs.writeFileSync(`./tmp/${fileName}`, archivoBuffer);

        return {
          fileName,
          fileType
        };
      });

      // Esperar a que se completen todas las descargas
      const archivosDescargados = await Promise.all(archivosPromises);

      // Crear un archivo ZIP con todos los archivos descargados
      const zipFileName = `instagram_${Date.now()}.zip`;
      const zipFilePath = path.join(__dirname, `../../tmp/${zipFileName}`);
      const output = fs.createWriteStream(zipFilePath);
      const zip = archiver('zip', { zlib: { level: 9 } });

      output.on('close', () => {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`);
        res.sendFile(zipFilePath);
      });

      zip.pipe(output);

      // Agregar cada archivo al archivo ZIP
      archivosDescargados.forEach(({ fileName }) => {
        zip.file(path.join(__dirname, `../../tmp/${fileName}`), { name: fileName });
      });

      // Finalizar el archivo ZIP cuando se han agregado todos los archivos
      zip.finalize();
    } else {
      const fileType = results.data[0].type;
      const fileUrl = results.data[0].url_download;
      const archivoBuffer = await getBuffer(fileUrl);
      const extension = fileType === 'video' ? 'mp4' : 'jpg';
      const fileName = `instagram_${Date.now()}.${extension}`;
      let fileIndex = 1;
      while (fs.existsSync(`./tmp/${fileName}`)) {
        const baseName = path.basename(fileName, extension);
        fileName = `${baseName}_${fileIndex}.${extension}`;
        fileIndex++;
      }
      fs.writeFileSync(`./tmp/${fileName}`, archivoBuffer);
      res.setHeader('Content-Type', fileType === 'video' ? 'video/mp4' : 'image/jpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.send(archivoBuffer);
    }
  } catch (error) {
    console.error(`Error al procesar la solicitud: ${error.message}`);
    res.sendFile(path.join(__dirname, '../../public/500.html'));
  }
});

module.exports = router;
