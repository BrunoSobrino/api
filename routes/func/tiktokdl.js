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
    const dataFF = await tiktokDownloader(url);
    const sexx = dataFF?.resultado?.videoUrl  
    if (!sexx || sexx == null || sexx == '' || sexx == undefined) return XD;  
    const videoBuffer = await getBuffer(sexx);
    return videoBuffer;
  } catch {    
  try {
    const dataF = await tiktok.v1(url);
    if (!dataF?.play || dataF?.play == null || dataF?.play == '' || dataF?.play == undefined) return XD;  
    const videoBuffer = await getBuffer(dataF.play);
    return videoBuffer;
  } catch {
    try {
      const tTiktok = await tiktokdlF(url);
      if (!tTiktok?.video || tTiktok?.video == null || tTiktok?.video == '' || tTiktok?.video == undefined) return XD;
      const videoBuffer = await getBuffer(tTiktok.video);
      return videoBuffer;
    } catch {
      try {
        const p = await fg.tiktok(url);
        if (!p?.nowm || p?.nowm == null || p?.nowm == '' || p?.nowm == undefined) return XD;  
        const videoBuffer = await getBuffer(p.nowm);
        return videoBuffer;
      } catch {
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
}}

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

async function tiktokv2(url) {
   try {
      let data = await axios.get("https://ssstik.io/en", {
         headers: {
            "Hx-Current-Url": "https://ssstik.io/en",
            "Hx-Request": true,
            "Hx-Target": "target",
            "Hx-Trigger": "_gcaptcha_pt",
            "Origin": "https://ssstik.io",
            "Referer": "https://ssstik.io/en",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
         }
      })
      let tt = /tt:(["'])(.*?)\1/g.exec(data.data)[2]
      data = await axios.post("https://ssstik.io/abc?url=dl", {
         id: url,
         locale: "en",
         tt
      }, {
         headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "id,en-US;q=0.9,en;q=0.8",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Hx-Current-Url": "https://ssstik.io/en",
            "Hx-Request": true,
            "Hx-Target": "target",
            "Hx-Trigger": "_gcaptcha_pt",
            "Origin": "https://ssstik.io",
            "Referer": "https://ssstik.io/en",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188"
         }
      })
      let $ = cheerio.load(data.data)
      let slide = $("ul > li").map((a, b) => {
         return $(b).find("a").attr('href') || $(b).find("img").attr("src")
      }).get()
      let result = { status: true, resultado: {
         thumbnail: $("img.result_author").attr("src"),
         author: $("div.pure-u-18-24.pd-lr > h2").text().trim() || $("div.pure-u-20-24.pd-lr > h2").text().trim(),
         description: $("div.pure-u-18-24.pd-lr > p").text().trim(),
         media: $("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.without_watermark.vignette_active.notranslate").attr("href") || slide.trim(),
         music: $("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.vignette_active.notranslate").attr("href") || $("a.pure-button.pure-button-primary.is-center.u-bl.dl-button.download_link.music.notranslate").attr("href"),
         like: $("div.d-flex.flex-1.align-items-center.justify-content-start").text().trim(),
         comment: $("div.d-flex.flex-1.align-items-center.justify-content-center").text().trim(),
         share: $("div.d-flex.flex-1.align-items-center.justify-content-end").text().trim()
      }}
      return result
   } catch (e) {
      return {status: false, message: e.message}
   }
}

async function tiktokDownloader(url) {
    try {
        let tiktokdl = await fetch(`https://www.tikwm.com/api/?url=${url}?hd=1`);
        let res = await tiktokdl.json();

        let response = {
            status: true,
            resultado: {}
        };

        if (res.data.images) {
            response.resultado = {
                username: res.data.author.unique_id,
                nickname: res.data.author.nickname,
                region: res.data.region,
                commentCount: res.data.comment_count,
                shareCount: res.data.share_count,
                downloadCount: res.data.download_count,
                imagesCount: res.data.images.length,
                musicInfo: {
                    title: res.data.music_info.title,
                    album: res.data.music_info.album || ""
                },
                title: res.data.title || "",
                imagesUrl: res.data.images
            };
        } else {
            response.resultado = {
                username: res.data.author.unique_id,
                nickname: res.data.author.nickname,
                region: res.data.region,
                commentCount: res.data.comment_count,
                shareCount: res.data.share_count,
                downloadCount: res.data.download_count,
                musicInfo: {
                    title: res.data.music_info.title,
                    album: res.data.music_info.album || ""
                },
                title: res.data.title || "",
                videoUrl: res.data.play
            };
        }

        return response;
    } catch (e) {
        return { status: false, error: e.message };
    }
}

module.exports = { getTikTokBuffer, tiktokv2, tiktokDownloader };
