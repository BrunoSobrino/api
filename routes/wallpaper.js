const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const { RandomAgresivo, wallpaper } = require('./func/functions');

router.get('/coffee', async (req, res) => {
  try {
        const imageResponse = await axios.get('https://coffee.alexflipnote.dev/random', { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        res.setHeader('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
  } catch (error) {
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

router.get('/wprandom', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/wprandom.json');
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

router.get('/cristianoronaldo', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/CristianoRonaldo.json');
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

router.get('/messi', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/Messi.json');
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

router.get('/itzy', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/itzy.json');
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

router.get('/navidad', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/navidad.json');
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

router.get('/wpmountain', async (req, res) => {
  try {
    const response = await wallpaper('mountain');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/pubg', async (req, res) => {
  try {
    const pug = ['pubg', 'playerunknowns battlegrounds', 'pubg mobile'];
    const pug2 = RandomAgresivo(0, pug.length - 1);    
    const response = await wallpaper(pug2);
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/wpgaming', async (req, res) => {
  try {
    const ga = ['gaming', 'gamers', 'video game'];
    const ga2 = RandomAgresivo(0, ga.length - 1);    
    const response = await wallpaper(ga2);
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/aesthetic', async (req, res) => {
  try {
    const response = await wallpaper('aesthetic');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/pentol', async (req, res) => {
  try {
    const response = await wallpaper('milk y mocha');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/cartoon', async (req, res) => {
  try {
    const response = await wallpaper('cartoon network');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/cyberspace', async (req, res) => {
  try {
    const response = await wallpaper('cyberspace');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/technology', async (req, res) => {
  try {
    const response = await wallpaper('technology');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/doraemon', async (req, res) => {
  try {
    const response = await wallpaper('doraemon');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/hacker', async (req, res) => {
  try {
    const response = await wallpaper('hacker');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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

router.get('/planet', async (req, res) => {
  try {
    const response = await wallpaper('planet');
    let imageUrl = null;
    while (!imageUrl) {
      const randomIndex = RandomAgresivo(0, response.length - 1);
      imageUrl = response[randomIndex];
      try {
        const imageResponse = await axios.get(imageUrl.image[0], { responseType: 'arraybuffer' });
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
