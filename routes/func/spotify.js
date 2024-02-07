const fetch = require('node-fetch');
const Spotify = require('spotifydl-x');
const SpottyDL = require('spottydl');
const fs = require('fs');
const NodeID3 = require('node-id3');
const axios = require('axios');
const uploadFile = require('./uploadFile')
const { getBuffer } = require('./functions');

const credentials = {
  clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
  clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009',
};
const spotify = new Spotify.default(credentials);

async function getMusicBuffer(text) {
  try {
    const isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+)/i);
    if (isSpotifyUrl) {
      const dlspoty = await getBuffer(`https://www.guruapi.tech/api/spotifydl?text=${isSpotifyUrl[0]}`);
      //const spty = await spotifydl(isSpotifyUrl[0]);
      const dataInfo = await SpottyDL.getTrack(isSpotifyUrl[0])
      const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`;
      };
      let randomName = getRandom('.mp3');
      let filePath = `./tmp/${randomName}`; 
      let fileExists = true;
      while (fileExists) {
        if (fs.existsSync(filePath)) {
          randomName = getRandom('.mp3');
          filePath = `./tmp/${randomName}`;
        } else {
          fileExists = false;
        }
      }
      const artist = dataInfo.artist || '-';
      const img = await (await fetch(`${spty.data.cover_url}`)).buffer()  
      const tags = {
        title: dataInfo.title || '-',
        artist: artist,
        album: dataInfo.album || '-',
        year: dataInfo.year || '-',
        genre: 'Música',
        comment: {
          language: 'spa',
          text: '🤴🏻 Descarga por BrunoSobrino & TheMystic-Bot-MD 🤖',
        },
        unsynchronisedLyrics: {
          language: 'spa',
          text: '🤴🏻 Descarga por BrunoSobrino & TheMystic-Bot-MD 🤖',
        },
        image: {
          mime: 'image/jpeg',
          type: {
            id: 3,
            name: 'front cover',
          },
          description: 'Spotify Thumbnail',
          imageBuffer: await axios.get(dataInfo.albumCoverURL, { responseType: 'arraybuffer' }).then((response) => Buffer.from(response.data, 'binary')),
        },
        mimetype: 'image/jpeg',
        copyright: 'Copyright Darlyn ©2023',
      };
      await fs.promises.writeFile(filePath, dlspoty);
      await NodeID3.write(tags, filePath);
      return filePath;
    } else {
      const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${text}`);
      const jsonDL = await resDL.json();
      const linkDL = jsonDL.result[0].link;
      const spty = await spotifydl(linkDL);
      const getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext}`;
      };
      let randomName = getRandom('.mp3');
      let filePath = `./tmp/${randomName}`; 
      let fileExists = true;
      while (fileExists) {
        if (fs.existsSync(filePath)) {
          randomName = getRandom('.mp3');
          filePath = `./tmp/${randomName}`;
        } else {
          fileExists = false;
        }
      }
      const artist = spty.data.artists.join(', ') || '-';
      const img = await (await fetch(`${spty.data.cover_url}`)).buffer()  
      const tags = {
        title: spty.data.name || '-',
        artist: artist,
        album: spty.data.album_name || '-',
        year: spty.data.release_date || '-',
        genre: 'Música',
        comment: {
          language: 'spa',
          text: '🤴🏻 Descarga por BrunoSobrino & TheMystic-Bot-MD 🤖',
        },
        unsynchronisedLyrics: {
          language: 'spa',
          text: '🤴🏻 Descarga por BrunoSobrino & TheMystic-Bot-MD 🤖',
        },
        image: {
          mime: 'image/jpeg',
          type: {
            id: 3,
            name: 'front cover',
          },
          description: 'Spotify Thumbnail',
          imageBuffer: await axios.get(spty.data.cover_url, { responseType: 'arraybuffer' }).then((response) => Buffer.from(response.data, 'binary')),
        },
        mimetype: 'image/jpeg',
        copyright: 'Copyright Darlyn ©2023',
      };
      await fs.promises.writeFile(filePath, spty.audio);
      await NodeID3.write(tags, filePath);
      return filePath;
    }
  } catch (error) {
    console.error(error);
    throw 'Error al obtener la ruta de la música.';
  }
}

async function spotifySearch1(input) {
  try {
    let linkDL = input;
    if (!input.match(/^(https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+)/i)) {
      const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${input}`);
      const jsonDL = await resDL.json();
      linkDL = jsonDL.result[0].link;
    }
    const spty = await spotifydl(linkDL);
    const artist = spty?.data.artists.join(', ') || '-';
    const data = {
      title: spty?.data.name || '-',
      artist: artist,
      album: spty?.data.album_name || '-',
      url: linkDL || '-',
      year: spty?.data.release_date || '-',
      genre: 'Música',
      thumbnail: spty?.data.cover_url || '-'
    };
    const audiodl = await uploadFile(spty?.audio)
    return { resultado: data, download: { audio: audiodl } };
  } catch (error) {
    console.error(error);
    throw 'Error al obtener los datos de la música.';
  }
}

async function spotifySearch2(text) {
  try {
    const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${text}`);
    const jsonDL = await resDL.json();
    return { resultado: jsonDL.result };
  } catch (error) {
    console.error(error);
    throw 'Error en la búsqueda de Spotify.';
  }
}

async function spotifydl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await spotify.getTrack(url);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Tiempo de espera agotado'));
        }, 300000);
      });
      const audioPromise = spotify.downloadTrack(url);
      const audio = await Promise.race([audioPromise, timeoutPromise]);
      resolve({ data: res, audio });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getMusicBuffer,
  spotifySearch1,
  spotifySearch2,
};
