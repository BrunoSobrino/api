const express = require('express');
const router = express.Router();
const path = require('path');
//const canvacard = require("canvacard");

router.get('/', async (req, res) => {
  const username = req.query.username;
  const groupname = req.query.groupname;
  const groupicon = req.query.groupicon;
  const membercount = req.query.membercount;
  const profile = req.query.profile;
  const background = req.query.background;
  if (!username || !groupname || !groupicon || !membercount || !profile || !background) {
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
    const imgBuffer = await welcome(req.query);
    res.contentType('image/png');
    res.send(imgBuffer);
  } catch (error) {
    console.log(error)
    res.sendFile(path.join(__dirname, '../public/500.html'));
  }
});

async function welcome(params) {
  const img = await new canvacard.Welcome()
    .setUsername(params.username)
    .setGuildName(params.groupname)
    .setGuildIcon(params.groupicon)
    .setMemberCount(params.membercount)
    .setAvatar(params.profile)
    .setBackground(params.background)
    .toAttachment();
  const imgBuffer = await img.toBuffer();
  return imgBuffer;
}

module.exports = router;
