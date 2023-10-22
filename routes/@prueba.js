const express = require('express');
const router = express.Router();
const path = require('path');
const knights = require("@clayzaaubert/canvix");

router.get('/', async (req, res) => {
  const username = req.query.username;
  const groupname = req.query.groupname;
  const membercount = req.query.membercount;
  const profile = req.query.profile;
  const groupicon = req.query.groupicon
  const background = req.query.background;
  if (!username || !groupname || !profile || !membercount || !background) {
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
  const image = await new knights.Welcome()
      .setUsername(username)
      .setGuildName(groupname)
      .setGuildIcon(groupicon)
      .setMemberCount(membercount)
      .setAvatar(profile)
      .setBackground(background)
      .toAttachment();
    const data = image.toBuffer();
    res.contentType('image/png');
    res.send(data);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

module.exports = router;
