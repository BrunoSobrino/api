const fetch = require('node-fetch');
const SpottyDL = require('spottydl');
const fs = require('fs');
const NodeID3 = require('node-id3');
const axios = require('axios');
const uploadFile = require('./uploadFile')
const { getBuffer } = require('./functions');
const { search, downloadTrack, downloadAlbum } = require("sanzy-spotifydl")

async function getMusicBuffer(text) {
  try {
    const isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track)\/[a-zA-Z0-9]+)/i);
    if (isSpotifyUrl) {
      let dlspoty;
      if (isSpotifyUrl[2] === 'album') {
        const album = await downloadAlbum(isSpotifyUrl[0]);
        dlspoty = album.trackList[0].audioBuffer; 
      } else if (isSpotifyUrl[2] === 'track') {
        const track = await downloadTrack(isSpotifyUrl[0]);
        dlspoty = track.audioBuffer;
      }
      let dataInfo;
      if (isSpotifyUrl[2] === 'album') {
        dataInfo = await SpottyDL.getAlbum(isSpotifyUrl[0])
      } else if (isSpotifyUrl[2] === 'track') {
        dataInfo = await SpottyDL.getTrack(isSpotifyUrl[0])
      }
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
      const img = await (await fetch(`${dataInfo.albumCoverURL}`)).buffer()  
      const tags = {
        title: dataInfo.title ? dataInfo.title : dataInfo.name || '-',
        artist: artist,
        album: dataInfo.album ? dataInfo.album : dataInfo.name || '-',
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
     let linkDLLL;
     try {  
      const resDL = await fetch(`https://controlled-gae-deliriusapi.koyeb.app/api/spotify?q=${text}`);
      const jsonDL = await resDL.json();
      linkDLLL = jsonDL.data[0].url;
     } catch {
      const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${global.lolkeysapi}&query=${text}`);
      const jsonDL = await resDL.json();
      linkDLLL = jsonDL.result[0].link;    
      }     
      const dlspoty = await downloadTrack(linkDLLL);
      const dataInfo = await SpottyDL.getTrack(linkDLLL)      
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
      const img = await (await fetch(`${dataInfo.albumCoverURL}`)).buffer()  
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
      await fs.promises.writeFile(filePath, dlspoty.audioBuffer);
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
     try {  
      const resDL = await fetch(`https://controlled-gae-deliriusapi.koyeb.app/api/spotify?q=${input}`);
      const jsonDL = await resDL.json();
      linkDL = jsonDL.data[0].url;
     } catch {
      const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${global.lolkeysapi}&query=${input}`);
      const jsonDL = await resDL.json();
      linkDL = jsonDL.result[0].link;    
      }    
    }
    const dataInfo = await SpottyDL.getTrack(linkDL)      
    const dlspoty = await downloadTrack(linkDL);
    const artist = dataInfo.artist || '-';
    const data = {
      title: dataInfo.title || '-',
      artist: artist,
      album: dataInfo.album || '-',
      url: linkDL || '-',
      year: dataInfo.year || '-',
      genre: 'Música',
      thumbnail: dataInfo.albumCoverURL || '-'
    };
    const audiodl = await uploadFile(dlspoty.audioBuffer)
    return { resultado: data, download: { audio: audiodl } };
  } catch (error) {
    console.error(error);
    throw 'Error al obtener los datos de la música.';
  }
}

async function spotifySearch2(text) {
  try {
    const resDL = await fetch(`https://controlled-gae-deliriusapi.koyeb.app/api/spotify?q=${text}`);
    const jsonDL = await resDL.json();
    return { resultado: jsonDL.data };
  } catch {
  try {   
    const resDLl = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${global.lolkeysapi}&query=${text}`);
    const jsonDLl = await resDLl.json();    
    return { resultado: jsonDLl.result };
  } catch (error) {
    console.error(error);
    throw 'Error en la búsqueda de Spotify.';
  }
 }
}

async function spotifyDownload(input) {
    input = String(input); 
    const isSpotifyUrl = input.match(/^(https:\/\/open\.spotify\.com\/(album)\/[a-zA-Z0-9]+)/i);
    if (!isSpotifyUrl) return { status: false, message: 'El link ingresado no es de algun album de spotify.' };
   try {
        const response = await downloadAlbum(isSpotifyUrl[0]);
        return response;
    } catch (error) {
        return { status: false, error: error.message };
    }
}

module.exports = {
  getMusicBuffer,
  spotifySearch1,
  spotifySearch2,
  spotifyDownload
};

/*const credentials = {
  clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
  clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009',
};
const spotify = new Spotify.default(credentials);*/

/*async function spotifydl(url) {
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
}*/

//const dlspoty = await getBuffer(`https://www.guruapi.tech/api/spotifydl?text=${linkDL}`);

/*
      const resDL = await fetch(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${global.lolkeysapi}&query=${text}`);
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
*/

      //const spty = await spotifydl(linkDL);
