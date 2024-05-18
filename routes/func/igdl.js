const axios = require('axios');
const { fromBuffer  } = require('file-type');
const instagramDl = require("@sasmeee/igdl");
const instagramGetUrl = require('instagram-url-direct');
const { instagram } = require('@xct007/frieren-scraper');
const { instagramdl } = require('@bochilteam/scraper');

async function igdl2(url) {
  try {
    const dataList = await instagramDl(url);
    if (!dataList || dataList.length === 0) return XD; //Error undefined
    const formattedData = [];
    for (const item of dataList) {
      if (item && item.download_link) {
        const { buffer, detectedType } = await getBuffer(item.download_link);
        if (detectedType && (detectedType.mime.startsWith('image/') || detectedType.mime.startsWith('video/'))) {
          formattedData.push({
            type: detectedType.mime.startsWith('image/') ? 'imagen' : 'video',
            url_download: item.download_link
          });
        }
      }
    }
    if (formattedData.length === 0) return XD; //Error undefined
    return {
      success: true,
      data: formattedData
    };
  } catch {
  try {
    const datTa = await instagram.v1(url);
    if (!datTa || datTa.length === 0) return XD; //Error undefined
    const formattedData = [];
    for (const urRRl of datTa) {
      if (urRRl && urRRl.url) {
        const { buffer, detectedType } = await getBuffer(urRRl.url);
        if (detectedType && (detectedType.mime.startsWith('image/') || detectedType.mime.startsWith('video/'))) {
          formattedData.push({
            type: detectedType.mime.startsWith('image/') ? 'imagen' : 'video',
            url_download: urRRl.url
          });
        }
      }
    }
    if (formattedData.length === 0) return XD; //Error undefined
    return {
      success: true,
      data: formattedData
    };
  } catch {
  try {
    const resultss = await instagramGetUrl(url);
    if (!resultss || resultss.length === 0) {
      throw new Error('No se encontraron datos de Instagram para la URL proporcionada');
    }
    const formattedData = [];
    for (const dataresult of resultss) {
      if (dataresult && dataresult.url_list) {
        const { buffer, detectedType } = await getBuffer(dataresult.url_list);
        if (detectedType && (detectedType.mime.startsWith('image/') || detectedType.mime.startsWith('video/'))) {
          formattedData.push({
            type: detectedType.mime.startsWith('image/') ? 'imagen' : 'video',
            url_download: dataresult.url_list
          });
        }
      }
    }
    if (formattedData.length === 0) return XD; //Error undefined
    return {
      success: true,
      data: formattedData
    };        
} catch {
try {    
    const resultssss = await instagramdl(url);
    if (!resultssss || resultssss.length === 0) return XD; //Error undefined
    const formattedData = [];
    for (const tiosex of resultssss) {
      if (tiosex) {
        const { buffer, detectedType } = await getBuffer(tiosex);
        if (detectedType && (detectedType.mime.startsWith('image/') || detectedType.mime.startsWith('video/'))) {
          formattedData.push({
            type: detectedType.mime.startsWith('image/') ? 'imagen' : 'video',
            url_download: tiosex
          });
        }
      }
    }
    if (formattedData.length === 0) return XD; //Error undefined
    return {
      success: true,
      data: formattedData
    };   
} catch {
try {
     const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${global.lolkeysapi}&url=${url}`);
     const json = await human.json();
     const videoig = json.result;
    if (!videoig || videoig.length === 0) return XD; //Error undefined
    const formattedData = [];
    for (const alaprimaselearrima of videoig) {
      if (alaprimaselearrima) {
        const { buffer, detectedType } = await getBuffer(alaprimaselearrima);
        if (detectedType && (detectedType.mime.startsWith('image/') || detectedType.mime.startsWith('video/'))) {
          formattedData.push({
            type: detectedType.mime.startsWith('image/') ? 'imagen' : 'video',
            url_download: alaprimaselearrima
          });
        }
      }
    }
    if (formattedData.length === 0) return XD; //Error undefined
    return {
      success: true,
      data: formattedData
    };       
} catch (error) {
    return {
      success: false,
      error: error.message
      };
     }
    }   
   }
  }
 }
}

async function getBuffer(url, options) {
  try {
    options = options || {};
    const res = await axios({
      method: 'get',
      url,
      headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1},
      ...options,
      responseType: 'arraybuffer'
    });
    const buffer = Buffer.from(res.data, 'binary');
    const detectedType = await fromBuffer (buffer);
    return { buffer, detectedType };
  } catch (error) {
    console.error('Error al obtener el buffer en igdl:', error);
    return { buffer: null, detectedType: null };
  }
}

module.exports = { igdl2 };
