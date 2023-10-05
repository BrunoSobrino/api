const axios = require('axios');
const { fromBuffer  } = require('file-type');
const instagramDl = require("@sasmeee/igdl");

async function downloadInstagramContent(url) {
  try {
    const dataList = await instagramDl(url);

    if (!dataList || dataList.length === 0) {
      throw new Error('No se encontraron datos de Instagram para la URL proporcionada');
    }

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

    if (formattedData.length === 0) {
      throw new Error('No se encontraron imágenes ni videos en la URL de Instagram proporcionada');
    }

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
    console.error('Error al obtener el buffer:', error);
    return { buffer: null, detectedType: null };
  }
}

module.exports = { downloadInstagramContent };
