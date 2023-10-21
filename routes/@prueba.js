const express = require('express');
const router = express.Router();
const path = require('path');
const { drawCard, LinearGradient } = require('discord-welcome-card');

router.get('/', async (req, res) => {
  const username = req.query.username;
  const groupname = req.query.groupname;
  //const groupicon = req.query.groupicon;
  //const membercount = req.query.membercount;
  const profile = req.query.profile;
  //const background = req.query.background;
  if (!username || !groupname || !profile) {
    const errorResponse = {
      status: false,
      message: 'Debes proporcionar los parámetros necesarios: username, groupname, groupicon, membercount, profile y background.',
      example: 'api/maker/canvas/welcome?username=shadow&groupname=MiGrupo&groupicon=https://example.com/groupicon.png&membercount=100&profile=https://example.com/user.png&background=https://example.com/background.jpg'
    };
    const formattedResults_e = JSON.stringify(errorResponse, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(formattedResults_e);
    return;
  }
  try {

  const image = await drawCard({
    theme: 'circuit',
    text: {
      title: groupname,
      text: username,
      subtitle: 'por favor, lea las reglas del grupo',
      color: `#88f`,
    },
    avatar: {
      image: profile,
      outlineWidth: 5,
      outlineColor: new LinearGradient([0, '#33f'], [1, '#f33']),
    },
    background: 'https://i.imgur.com/ea9PB3H.png',
    blur: 1,
    border: true,
    rounded: true,
  });

    
console.log(image)



    
    res.contentType('image/png');
    res.send(image);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
