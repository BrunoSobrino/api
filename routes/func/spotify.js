const fetch = require('node-fetch');
const Spotify = require('spotifydl-x');
const fs = require('fs');
const NodeID3 = require('node-id3');
const axios = require('axios');
const { find_lyrics } = require('@brandond/findthelyrics');

const credentials = {
  clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
  clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009',
};
const spotify = new Spotify.default(credentials);

async function getMusicBuffer(text) {
  try {
    const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${text}`);
    const jsonDL = await resDL.json();
    const linkDL = jsonDL.result[0].link;
    const spty = await spotifydl(linkDL);
    const getRandom = (ext) => {
      return `${Math.floor(Math.random() * 10000)}${ext}`;
    };
    const randomName = getRandom('.mp3');
    const filePath = `./tmp/${randomName}`;

    await fs.promises.writeFile(filePath, spty.audio);
    const buffer = fs.readFileSync(filePath);
    fs.unlinkSync(filePath); // Elimina el archivo temporal

    return buffer;
  } catch (error) {
    console.error(error);
    throw 'Error al obtener el buffer de la música.';
  }
}

async function getMusicData(text) {
  try {
    const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${text}`);
    const jsonDL = await resDL.json();
    const linkDL = jsonDL.result[0].link;
    const spty = await spotifydl(linkDL);
    const artist = spty.data.artists.join(', ') || '-';
    const img = await (await fetch(`${spty.data.cover_url}`)).buffer();
    const letra_s = await find_lyrics(spty.data.name ? spty.data.name : '');
    let letra;
    letra = `${letra_s ? letra_s + '\n\n🤴🏻 Descarga por BrunoSobrino & TheMystic-Bot-MD 🤖' : '🤴🏻 Descarga por BrunoSobrino & TheMystic-Bot-MD 🤖'}`;

    const data = {
      title: spty.data.name || '-',
      artist: artist,
      album: spty.data.album_name || '-',
      year: spty.data.release_date || '-',
      genre: 'Música',
      comment: {
        language: 'spa',
        text: letra,
      },
      unsynchronisedLyrics: {
        language: 'spa',
        text: letra,
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

    return data;
  } catch (error) {
    console.error(error);
    throw 'Error al obtener los datos de la música.';
  }
}

async function spotifySearch(text) {
  try {
    const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=GataDios&query=${text}`);
    const jsonDL = await resDL.json();
    return jsonDL.result;
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
  getMusicData,
  spotifySearch,
};
