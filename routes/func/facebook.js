const axios = require('axios');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fg = require('api-dylux');
const { savefrom, facebookdl, facebookdlv2 } = require('@bochilteam/scraper');
const { facebook } = require('@xct007/frieren-scraper');
const fbDownloader = require('fb-downloader-scrapper');

const facebookdlfunc = async (url) => {
  if (!url) {
    return {
      status: false,
      resultado: {
        data: 'URL no proporcionada'
      }
    };
  }
  try {
    const fbdlResult = await fbdl(url);
    if (fbdlResult?.result?.hd || fbdlResult?.result?.sd) {
      return {
        status: true,
        resultado: {
          title: fbdlResult.result.title || "Facebook video download",
          data: fbdlResult.result.hd || fbdlResult.result.sd
        }
      };
    } else { throw XD }
  } catch (error) {
  try {
    const fbdlResult = await facebookVideo(url);
    if (fbdlResult?.result[0]?.url || fbdlResult?.result[1]?.url) {
      return {
        status: true,
        resultado: {
          title: "Facebook video download",
          data: fbdlResult?.result[0]?.url || fbdlResult?.result[1]?.url
        }
      };
    }
  } catch (error) {    
  try {
    const data = await facebook.v1(url);
    let res = '';
    if (data.urls && data.urls.length > 0) {
      res = `${data.urls[0]?.hd || data.urls[1]?.sd || ''}`;
    }
    if (!res || res == '' || res == undefined || res == null) {
      throw new Error('No se pudo obtener el video de Facebook');
    }
    return {
      status: true,
      resultado: {
        title: "Facebook video download",
        data: res
      }
    };
  } catch (error1) {
    try {
      const req = await igeh(url);
      const res = req.url_list;
      if (!res || res == '' || res == undefined || res == null) {
        throw new Error('No se pudo obtener el video de Facebook');
      }
      return {
        status: true,
        resultado: {
          title: "Facebook video download",
          data: res
        }
      };
    } catch (error2) {
      try {
        const Rres = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${global.lolkeysapi}&url=${url}`);
        const Jjson = await Rres.json();
        let VIDEO = Jjson.result[0];
        if (VIDEO == '' || !VIDEO || VIDEO == null) VIDEO = Jjson.result[1];
        if (!VIDEO || VIDEO == '' || VIDEO == undefined || VIDEO == null) {
          throw new Error('No se pudo obtener el video de Facebook');
        }
        return {
          status: true,
          resultado: {
            title: "Facebook video download",
            data: VIDEO
          }
        };
      } catch (error3) {
        try {
          const ress = await fg.fbdl(url);
          const urll = ress.data[0].url;
          if (!urll || urll == '' || urll == undefined || urll == null) {
            throw new Error('No se pudo obtener el video de Facebook');
          }
          return {
            status: true,
            resultado: {
              title: "Facebook video download",
              data: urll
            }
          };
        } catch (error4) {
          try {
            const res = await fbDownloader(url);
            for (const result of res.download) {
              const ur = result.url;
              if (!ur || ur == '' || ur == undefined || ur == null) {
                throw new Error('No se pudo obtener el video de Facebook');
              }
              return {
                status: true,
                resultado: {
                  title: "Facebook video download",
                  data: ur
                }
              };
            }
          } catch (error5) {
            try {
              const res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=nekosmic&q=${url}`);
              const json = await res3.json();
              const url3 = json.video;
              if (!url3 || url3 == '' || url3 == undefined || url3 == null) {
                throw new Error('No se pudo obtener el video de Facebook');
              }
              return {
                status: true,
                resultado: {
                  title: "Facebook video download",
                  data: url3
                }
              };
            } catch (error6) {
              try {
                const { result } = await facebookdl(url).catch(async (_) => await facebookdlv2(url)).catch(async (_) => await savefrom(url));
                const urls = result.map(({ url, isVideo }) => ({ url }));
                if (!urls || urls == '' || urls == undefined || urls == null) {
                  throw new Error('No se pudo obtener el video de Facebook');
                }
                return {
                  status: true,
                  resultado: {
                    title: "Facebook video download",
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
  }
 }
};

async function facebookVideo(url) {
    try {
        const baseURLL = "https://fdownloader.net/id";
        const apiURLL = "https://v3.fdownloader.net/api/ajaxSearch?lang=en";
        const {
            data
        } = await axios(baseURLL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
            },
            data: new URLSearchParams(
                Object.entries({
                    recaptchaToken: "",
                    q: url,
                    t: "media",
                    lang: "en",
                })
            ),
        });
        const $ = cheerio.load(data);
        const script = $("body").find("script").text().trim();
        const k_token = script.split("k_token = ")[1].split(";")[0];
        const k_exp = script.split("k_exp = ")[1].split(";")[0];
        const {
            data: apiData
        } = await axios(apiURLL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
            },
            data: new URLSearchParams(
                Object.entries({
                    k_exp,
                    k_token,
                    q: url,
                    lang: "en",
                    web: "fdownloader.net",
                    v: "v2",
                    w: "",
                })
            ),
        });
        const $api = cheerio.load(apiData.data);
        const result = [];
        const duration = $api('div.clearfix > p').text().trim();
        $api('div.tab__content')
            .find('tbody > tr')
            .each((index, element) => {
                const quality = $api(element).find('td.video-quality').text();
                const videoUrl = $api(element).find('td > a').attr('href');
                if (quality && videoUrl) {
                    result.push({
                        quality,
                        url: videoUrl,
                    });
                }
            });
        return {
            duration,
            result,
        };
    } catch (error) {
        console.log(error);
        throw error;
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

async function fbdl(t) {
  return new Promise(async (e, a) => {
    const i = await fetch("https://www.getfvid.com/downloader", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://www.getfvid.com/"
      },
      body: new URLSearchParams(Object.entries({
        url: t
      }))
    });
    const o = cheerio.load(await i.text());
    e({
      result: {
        url: t,
        title: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-5.no-padd > div > h5 > a").text() || "Video downloader",
        hd: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a").attr("href"),
        sd: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a").attr("href"),
        audio: o("body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(3) > a").attr("href")
      }
    });
  });
}

module.exports = { facebookdlfunc };
