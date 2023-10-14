const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { fromBuffer  } = require('file-type');


function RandomAgresivo(min, max) {
  if (typeof RandomAgresivo.seen === 'undefined') {
    RandomAgresivo.seen = [];
  }
  if (RandomAgresivo.seen.length === 0) {
    RandomAgresivo.seen = Array.from({ length: max - min + 1 }, (_, index) => index + min);
  }
  const randomIndex = Math.floor(Math.random() * RandomAgresivo.seen.length);
  const randomNumber = RandomAgresivo.seen[randomIndex];
  RandomAgresivo.seen.splice(randomIndex, 1);
  return randomNumber;
}

function getFileName(prefix, directory) {
  let index = 1;
  let fileName = `${prefix}`;
  const ext = path.extname(prefix);
  const name = path.basename(prefix, ext);
  while (fs.existsSync(path.join(directory, fileName))) {
    fileName = `${name}+${index}${ext}`;
    index++;
  }
  return fileName;
}

const getBuffer = async (url, options) => {
    options = options || {};
    const res = await axios({
        method: 'get',
        url,
        headers: {
            'DNT': 1,
            'Upgrade-Insecure-Request': 1,
        },
        ...options,
        responseType: 'arraybuffer'
    });
    return res.data;
};

const getBuffer2 = async (url, options) => {
  options = options || {};
  const res = await axios({
    method: 'get',
    url,
    headers: {
      'DNT': 1,
      'Upgrade-Insecure-Request': 1,
    },
    ...options,
    responseType: 'arraybuffer'
  });
  const buffer = Buffer.from(res.data, 'base64');
  const typeInfo = await fromBuffer(buffer);
  let bufferResult = '';
  let fileTypeResult = '';
  if (typeInfo) {
    fileTypeResult = typeInfo.mime;
  }
  return {
    buffer: bufferResult,
    fileType: fileTypeResult
  };
};


module.exports = {
    getBuffer,
    getBuffer2,
    RandomAgresivo,
    getFileName
};
