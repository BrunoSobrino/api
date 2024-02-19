const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const { RandomAgresivo } = require('./func/functions');

router.get('/videoxxx', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videoxxx.json');
    const data = response.data;
    let videoUrl = null;
    while (!videoUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      videoUrl = data[randomIndex];
      try {
        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoBuffer = Buffer.from(videoResponse.data, 'base64');
        res.end(videoBuffer);
      } catch (error) {
        videoUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/videoxxxlesbi', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/videolesbixxx.json');
    const data = response.data;
    let videoUrl = null;
    while (!videoUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      videoUrl = data[randomIndex];
      try {
        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoBuffer = Buffer.from(videoResponse.data, 'base64');
        res.end(videoBuffer);
      } catch (error) {
        videoUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/booty', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/booty.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/furro', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/furro.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/imglesbian', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/imagenlesbians.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/panties', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/panties.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/pechos', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/pechos.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/pene', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/pene.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/porno', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/porno.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/tetas', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/tetas.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/gawrgura', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/gawrgura18.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/packgirl', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/packgirl.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/packmen', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/packmen.json');
    const data = response.data;
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, data.length - 1);
      imageUrl = data[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
      } catch (error) {
        imageUrl = null;
      }
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
