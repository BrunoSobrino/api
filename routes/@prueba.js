const express = require('express');
const router = express.Router();
const path = require('path');
const { drawCard, LinearGradient } = require('discord-welcome-card');

router.get('/', async (req, res) => {
  const username = req.query.username;
  const groupname = req.query.groupname;
  const membercount = req.query.membercount;
  const profile = req.query.profile;
  const background = req.query.background || 'https://telegra.ph/file/82d079999da723cc80899.png';
  const description = req.query.description;
  if (!username || !groupname || !profile || !membercount || !description) {
    const errorResponse = {
      status: false,
      message: 'Debes proporcionar los parámetros necesarios: username, groupname, groupicon, membercount, profile y background.',
      example: 'api/maker/canvas/welcome?username=Bruno%20Sobrino&groupname=API%20Empire%20-%20Comunidad&membercount=12&description=Bienvenido(a),%20lee%20las%20reglas%20del%20grupo&profile=https://github.com/BrunoSobrino.png'
    };
    const formattedResults_e = JSON.stringify(errorResponse, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(formattedResults_e);
    return;
  }
  try {
  const image = await drawCard({
    theme: 'code', // 'circuit', 'Dark'
    text: {
      title: groupname,
      text: username + ' #' + membercount,
      subtitle: description,
      color: `#88f`,
    },
    avatar: {
      image: profile,
      outlineWidth: 5,
      outlineColor: new LinearGradient([0, '#33f'], [1, '#f33']),
    },
      background: background,
      blur: 1,
      border: true,
      rounded: true,
    });
    res.contentType('image/png');
    res.send(image);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
