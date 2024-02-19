const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const { RandomAgresivo } = require('./func/functions');

router.get('/nsfwass', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwass.json');
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

router.get('/nsfwbdsm', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwbdsm.json');
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

router.get('/nsfwcum', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwcum.json');
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

router.get('/ecchi', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/ecchi.json');
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

router.get('/nsfwero', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwero.json');
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

router.get('/nsfwfemdom', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwfemdom.json');
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

router.get('/nsfwfoot', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwfoot.json');
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

router.get('/nsfwglass', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwglass.json');
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

router.get('/hentai', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/hentai.json');
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

router.get('/nsfwloli', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfwloli.json');
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

router.get('/nsfworgy', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/nsfworgy.json');
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

router.get('/nsfwtrap', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/trapito.json');
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

router.get('/yaoi', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/yaoi.json');
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

router.get('/yuri', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/yuri.json');
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
