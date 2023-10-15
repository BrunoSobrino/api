const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { fromBuffer  } = require('file-type');

async function lyrics(search) {
  const searchUrl = `https://www.musixmatch.com/search/${search}`;
  const searchResponse = await axios.get(searchUrl);
  const searchHtml = searchResponse.data;
  const $ = cheerio.load(searchHtml);
  const link = $('div.media-card-body > div > h2').find('a').attr('href');
  const lyricsUrl = `https://www.musixmatch.com${link}`;
  const lyricsResponse = await axios.get(lyricsUrl);
  const lyricsHtml = lyricsResponse.data;
  const $$ = cheerio.load(lyricsHtml);
  const thumb = $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src');
  const lyrics1 = $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > p > span').text().trim();
  const lyrics2 = $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > div > p > span').text().trim();
  const title = $$('#site > div > div > div > main > div > div > div.mxm-track-banner.top > div > div > div').find('div.col-sm-10.col-md-8.col-ml-9.col-lg-9.static-position > div.track-title-header > div.mxm-track-title > h1').text().trim().replace('Lyrics','')
  const artist = $$('#site > div > div > div > main > div > div > div > div > div > div > div> div > div > h2 > span').text().trim();
  if (!thumb || (!lyrics1 && !lyrics2)) {
    throw new Error('No se encontraron letras para la canción');
  }
  const lyrics = `${lyrics1}\n\n\n\n${lyrics2}`;
  return { status: true, titulo: title, artista: artist, imagen: thumb: `https:${thumb}`, letra: lyrics };
}

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
  let fileSize = '';
  if (typeInfo) {
    fileTypeResult = typeInfo.mime;
  }
  if (buffer) {
    bufferResult = buffer;
    const fileSizeBytes = buffer.length;
    const fileSizeMB = fileSizeBytes / (1024 * 1024);
    if (fileSizeMB % 1 === 0) {
      fileSize = fileSizeMB.toFixed(0); 
    } else {
      fileSize = fileSizeMB.toFixed(2); 
    }
  }
  return {
    buffer: bufferResult,
    fileType: fileTypeResult,
    fileSize: fileSize
  };
};

function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: true, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({status: false, result: err}));
  });
}

function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com';
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = [];
      const url = [];
      const desc = [];
      const results = [];
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb').each(function(c, d) {
          url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
        });
      });
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb-under').each(function(c, d) {
          desc.push($(d).find('p.metadata').text());
          $(d).find('a').each(function(e, f) {
            title.push($(f).attr('title'));
          });
        });
      });
      for (let i = 0; i < title.length; i++) {
        results.push({title: title[i], info: desc[i], link: url[i]});
      }
      resolve({status: true, result: results});
    }).catch((err) => reject({status: false, result: err}));
  });
}


module.exports = {
    getBuffer,
    getBuffer2,
    RandomAgresivo,
    getFileName,
    xnxxsearch,
    xnxxdl,
    lyrics
};
