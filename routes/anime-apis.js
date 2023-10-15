const express = require('express');
const router = express.Router();
const axios = require('axios');
const { RandomAgresivo } = require('./func/functions');

router.get('/akira', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-akira.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/akiyama', async (req, res) => {
  let imageUrl = null;
  const jsonUrl = 'https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-akiyama.json';
  try {
    const response = await axios.get(jsonUrl);
    const data = response.data;
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
    res.status(500).send('An error occurred');
  }
});

router.get('/anna', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-anna.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/asuna', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-asuna.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/ayuzawa', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-ayuzawa.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/boruto', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-boruto.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/chiho', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-chiho.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/chitoge', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-chitoge.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/cosplay', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-cosplay.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/deidara', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-deidara.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/eba', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-eba.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/elaina', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-elaina.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/emilia', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-emilia.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/erza', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-erza.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/hestia', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-hestia.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/hinata', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-hinata.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/inori', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-inori.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/isuzu', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-isuzu.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/itachi', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-itachi.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/itori', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-itori.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/kaga', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-kaga.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/kagura', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-kagura.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/kaori', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-kaori.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/keneki', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-keneki.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/kotori', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-kotori.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/kurumi', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-kurumi.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/madara', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-madara.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/mikasa', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-mikasa.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/miku', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-miku.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/minato', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-minato.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/naruto', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-naruto.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/nezuko', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-nezuko.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/sagiri', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-sagiri.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/sakura', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-sakura.json');
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
    res.status(500).send('An error occurred');
  }
});

router.get('/sasuke', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/BrunoSobrino/api/main/data/anime-sasuke.json');
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
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
