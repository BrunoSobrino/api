const fg = require('api-dylux');
const axios = require('axios');
const cheerio = require('cheerio');
const { tiktok } = require('@xct007/frieren-scraper');
const { getBuffer } = require('./functions');
const { tiktokdl } = require('@bochilteam/scraper');

const getTikTokBuffer = async (url) => {
  if (!url) {
    return {
      error: 'URL de TikTok no proporcionada',
      message: 'Por favor, ingrese una URL de TikTok válida. Ejemplo: ' +
        'https://vm.tiktok.com/ZMYWFhKt2'
    };
  }

  try {
    const dataF = await tiktok.v1(url);
    if (!dataF?.play || dataF?.play == null || dataF?.play == '' || dataF?.play == undefined) return XD;  
    const videoBuffer = await getBuffer(dataF.play);
    return videoBuffer;
  } catch (e1) {
    try {
      const tTiktok = await tiktokdlF(url);
      if (!tTiktok?.video || tTiktok?.video == null || tTiktok?.video == '' || tTiktok?.video == undefined) return XD;
      const videoBuffer = await getBuffer(tTiktok.video);
      return videoBuffer;
    } catch (e2) {
      try {
        const p = await fg.tiktok(url);
        if (!p?.nowm || p?.nowm == null || p?.nowm == '' || p?.nowm == undefined) return XD;  
        const videoBuffer = await getBuffer(p.nowm);
        return videoBuffer;
      } catch (e3) {
        try {
          const { video } = await tiktokdl(url);
          const videoUrl = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
          if (!videoUrl || videoUrl == null || videoUrl == '' || videoUrl == undefined) return XD;
          const videoBuffer = await getBuffer(videoUrl);
          return videoBuffer;
        } catch {
          return {
            error: 'Error interno en las APIs',
            message: 'No se encontraron resultados. Por favor, inténtelo de nuevo más tarde.'
          };
        }
      }
    }
  }
}

async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) return 'Enlace incorrecto';
  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = { url: url, _token: token };
  const { data } = await axios.request('https://tikdown.org/getAjax?', {
    method: 'post',
    data: new URLSearchParams(Object.entries(param)),
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
    }
  });
  const getdata = cheerio.load(data.html);
  if (data.status) {
    return {
      status: true,
      thumbnail: getdata('img').attr('src'),
      video: getdata('div.download-links > div:nth-child(1) > a').attr('href'),
      audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')
    };
  } else {
    return { status: false };
  }
}

module.exports = { getTikTokBuffer };
