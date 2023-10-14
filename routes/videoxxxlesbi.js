const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    const randomIndex = Math.floor(data.length * Math.random());
    const videoUrl = data[randomIndex];
    const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const videoBuffer = Buffer.from(videoResponse.data, 'binary');
    res.setHeader('Content-Type', 'video/mp4');
    let videoFileName = generateRandomFileName(path.join(__dirname, '..', 'tmp'), 'video', '.mp4');
    const videoFilePath = path.join(__dirname, videoFileName);
    fs.writeFileSync(videoFilePath, videoBuffer);
    console.log('Video URL:', videoUrl);
    console.log('Video Buffer Length:', videoBuffer.length);
    console.log('Video File Path:', videoFilePath);
    if (fs.existsSync(videoFilePath)) {
      res.sendFile(videoFileName, { root: __dirname });
    } else {
      console.error('El archivo no existe en la ubicación especificada.');
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});
function generateRandomFileName(directory, baseName, extension) {
  let counter = 0;
  let fileName = `${baseName}${counter}${extension}`;
  let filePath = path.join(__dirname, directory, fileName);
  while (fs.existsSync(filePath)) {
    counter++;
    fileName = `${baseName}${counter}${extension}`;
    filePath = path.join(__dirname, directory, fileName);
  }
  return fileName;
}

module.exports = router;
