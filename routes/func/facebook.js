const axios = require('axios');
const fg = require('api-dylux');
const fetch = require('node-fetch');
const { savefrom, facebookdl, facebookdlv2 } = require('@bochilteam/scraper');
const { facebook } = require('@xct007/frieren-scraper');
const fbDownloader = require('fb-downloader-scrapper');

const facebookdlfunc = async (url) => {
  if (!url) {
    return {
      status: false,
      message: 'URL no proporcionada'
    };
  }
  try {
    const d2ata = await facebook.v1(url); 
    let r2es = '';
    if (d2ata.urls && d2ata.urls.length > 0) {
      r2es = `${d2ata.urls[0]?.hd || d2ata.urls[1]?.sd || ''}`;
    }
    if (!r2es || r2es == '' || r2es == undefined || r2es == null) return XD; 
    return {
      status: true,
      resultado: {
        data: r2es
      }
    };
  } catch (error1) {
    try {
      const req = await igeh(url); 
      const res = req.url_list;
      if (!res || res == '' || res == undefined || res == null) return XD; 
      return {
        status: true,
        resultado: {
          data: res
        }
      };
    } catch (error2) {
      try {
        const Rres = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=GataDios&url=${url}`);
        const Jjson = await Rres.json();
        let VIDEO = Jjson.result[0];
        if (VIDEO == '' || !VIDEO || VIDEO == null) VIDEO = Jjson.result[1];
        if (!VIDEO || VIDEO == '' || VIDEO == undefined || VIDEO == null) return XD;
        return {
          status: true,
          resultado: {
            data: VIDEO
          }
        };
      } catch (error3) {
        try {
          const ress = await fg.fbdl(url); 
          const urll = ress.data[0].url;
          if (!urll || urll == '' || urll == undefined || urll == null) return XD;
          return {
            status: true,
            resultado: {
              data: urll
            }
          };
        } catch (error4) {
          try {
            const res = await fbDownloader(url); 
            for (const result of res.download) {
              const ur = result.url;
              if (!ur || ur == '' || ur == undefined || ur == null) return XD;
              return {
                status: true,
                resultado: {
                  data: ur
                }
              };
            }
          } catch (error5) {
            try {
              const res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=nekosmic&q=${url}`); 
              const json = await res3.json();
              const url3 = json.video;
              if (!url3 || url3 == '' || url3 == undefined || url3 == null) return XD;
              return {
                status: true,
                resultado: {
                  data: url3
                }
              };
            } catch (error6) {
              try {
                const { result } = await facebookdl(url).catch(async (_) => await facebookdlv2(url)).catch(async (_) => await savefrom(url)); 
                const urls = result.map(({ url, isVideo }) => ({ url }));
                if (!urls || urls == '' || urls == undefined || urls == null) return XD;
                return {
                  status: true,
                  resultado: {
                    data: urls
                  }
                };
              } catch (error7) {
                return {
                  status: false,
                  resultado: {
                    data: 'No se pudo obtener el video de Facebook'
                  }
                };
              }
            }
          }
        }
      }
    }
  }
};

async function igeh(url_media) {
  return new Promise(async (resolve, reject)=>{
    const BASE_URL = 'https://instasupersave.com/';
    try {
      const resp = await axios(BASE_URL);
      const cookie = resp.headers['set-cookie']; 
      const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '');
      const config = {method: 'post', url: `${BASE_URL}api/convert`, headers: {'origin': 'https://instasupersave.com', 'referer': 'https://instasupersave.com/pt/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-origin', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 'x-xsrf-token': session, 'Content-Type': 'application/json', 'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`}, data: {url: url_media}};
      axios(config).then(function(response) {
        const ig = [];
        if (Array.isArray(response.data)) {
          response.data.forEach((post) => {
            ig.push(post.sd === undefined ? post.thumb : post.sd.url);
          });
        } else {
          ig.push(response.data.url[0].url);
        }
        resolve({results_number: ig.length, url_list: ig});
      }).catch(function(error) {
        reject(error.message);
      });
    } catch (e) {
      reject(e.message);
    }
  });
}

module.exports = { facebookdlfunc };
