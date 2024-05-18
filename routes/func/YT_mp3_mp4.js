const ytdl = require("ytdl-core");
const readline = require("readline");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { randomBytes } = require("crypto");
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');
const { getBuffer } = require('./functions');
const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

class YT {
  constructor() {}

  static isYTUrl(url) {
    return ytIdRegex.test(url);
  }

  static getVideoID(url) {
    if (!this.isYTUrl(url)) throw new Error("is not YouTube URL");
    return ytIdRegex.exec(url)[1];
  }

  static async mp3(url) {
    try {
      if (!url) {
          throw new Error("Video ID or YouTube Url is required");
      }
      url = this.isYTUrl(url) ? `https://www.youtube.com/watch?v=${this.getVideoID(url)}` : url;
      const stream = ytdl(url, {
        requestOptions: {
          headers: {
              cookie: "ISITOR_INFO1_LIVE=C0N8P8YKBPA; PREF=tz=America.Bogota&f5=20000; VISITOR_PRIVACY_METADATA=CgJQRRICGgA%3D; YSC=F124HPwH5Tk; HSID=ANMLlrOaE0U-Y9XCx; SSID=A7jofnRgyop0pJcA8; APISID=n6SY-W-U79WMcMi5/ANLbUtthWezCHSl58; SAPISID=7I0Je63HDw5qNtsd/A6kfwXpaWpL9oWNCS; __Secure-1PAPISID=7I0Je63HDw5qNtsd/A6kfwXpaWpL9oWNCS; __Secure-3PAPISID=7I0Je63HDw5qNtsd/A6kfwXpaWpL9oWNCS; YTSESSION-1b=ANPz9Kj3kneHXWVd/cloLDglSZTXhG+rbQ+5A7pXe4ThWYQ8rHRQr/mpDnEVOIc4PEpOo34pArbBqPItpFUmcRF7rBrbvY8o3qIyjm7pPyQcuuM=; GPS=1; SID=aQizKdEFw5-p5KcnHIHgPWALDWZSyYJmFsyl7wWOi7fu_X8gTdvx6Oug-zMeHzNA-0hvLw.; __Secure-1PSID=aQizKdEFw5-p5KcnHIHgPWALDWZSyYJmFsyl7wWOi7fu_X8gzfBOB25007gw93sW0fZZBw.; __Secure-1PSIDTS=sidts-CjIBSAxbGSjJ0ofY2vRCVz8xqU2RHXjyE-VqNeez6nkw8jvOZ5xtUFTPzutu1nM3OvSrJxAA; __Secure-3PSIDTS=sidts-CjIBSAxbGSjJ0ofY2vRCVz8xqU2RHXjyE-VqNeez6nkw8jvOZ5xtUFTPzutu1nM3OvSrJxAA; __Secure-3PSID=aQizKdEFw5-p5KcnHIHgPWALDWZSyYJmFsyl7wWOi7fu_X8g6hK1AfHBNbTFevBaBQPuvA.; LOGIN_INFO=AFmmF2swRQIhAIuauIKMJskoIcXPzomtvy4859ECXJjXKwIL4Fwqi8M-AiBi3HsuFHlV7lQ1cmm3p0MA9MZSsdNDL3RLqyb_aLrKMw:QUQ3MjNmemZrTWlwS2dIcm81YnNzTFRwVVFlLUF6bGh1TzV0ZWpMSFRRYm9XdHdMYnFVUV9kcWNVTVF2QXpzSWROYzE4YkM1RzU2ZjdjUk1BWTFRTm5FS1lFVHpkVXplUzF1ZGhmMTJvZW9Ca2x1Y24zTDl3bG1tSEFILWlWX2ZNRDBCVm9RSm9EZnJPMkFyMUJqaE9uR2xoM3hyVXJWbWtn; CONSISTENCY=AKreu9spRAFkKxEWfUje5J-netwXc64KTkz8ZxGkb2fS0jSkvw7HS3ZlNxyUNMoWb1_0Kzj4kSS6Wb0tulfITpFGHwYqDQyEvRz4lyfhoJV4U9Pa1V7XYEzG5c8QhUyn-KE21gCuwrCyYoLt295cpHM; SIDCC=APoG2W_12yoyWkHPHg7DjiiKJB01vkwulDW9v2gIuS0mUCIpDl7SGkQ8ywiYcwBXal5jnLxZ01s; __Secure-1PSIDCC=APoG2W9XogiNUjt9CjAlbVSb0YTrBJlo_rvOXGqodWmCwyDW_3SPyDLi9b1Co99YVhvhXvlWWPY; __Secure-3PSIDCC=APoG2W8Koq32WwziWG7m1gPuRhj8dxVpdIFrjbUM6rA2vH7wUY-cE16wy6XKz8QfLOuyKshzVjJa"
          },
        },
        filter: "audioonly",
        quality: 140,
      });
      const buffers = [];
      stream.on("data", (chunk) => {
        buffers.push(chunk);
      });
      return new Promise((resolve, reject) => {
        stream.on("end", () => {
          const fullBuffer = Buffer.concat(buffers);
          resolve(fullBuffer);
        });
        stream.on("error", (err) => {
          reject(err);
        });
      });
    } catch (error) {
      throw error;
    }
  }    
        
  static async mp4(url) {
try {
  if (!url) {
    throw new Error("Video ID or YouTube Url is required");
  }
  url = this.isYTUrl(url) ? `https://www.youtube.com/watch?v=${this.getVideoID(url)}` : url;
  const stream = ytdl(url, {
    requestOptions: {
      headers: {
        cookie: "ISITOR_INFO1_LIVE=C0N8P8YKBPA; PREF=tz=America.Bogota&f5=20000; VISITOR_PRIVACY_METADATA=CgJQRRICGgA%3D; YSC=F124HPwH5Tk; HSID=ANMLlrOaE0U-Y9XCx; SSID=A7jofnRgyop0pJcA8; APISID=n6SY-W-U79WMcMi5/ANLbUtthWezCHSl58; SAPISID=7I0Je63HDw5qNtsd/A6kfwXpaWpL9oWNCS; __Secure-1PAPISID=7I0Je63HDw5qNtsd/A6kfwXpaWpL9oWNCS; __Secure-3PAPISID=7I0Je63HDw5qNtsd/A6kfwXpaWpL9oWNCS; YTSESSION-1b=ANPz9Kj3kneHXWVd/cloLDglSZTXhG+rbQ+5A7pXe4ThWYQ8rHRQr/mpDnEVOIc4PEpOo34pArbBqPItpFUmcRF7rBrbvY8o3qIyjm7pPyQcuuM=; GPS=1; SID=aQizKdEFw5-p5KcnHIHgPWALDWZSyYJmFsyl7wWOi7fu_X8gTdvx6Oug-zMeHzNA-0hvLw.; __Secure-1PSID=aQizKdEFw5-p5KcnHIHgPWALDWZSyYJmFsyl7wWOi7fu_X8gzfBOB25007gw93sW0fZZBw.; __Secure-1PSIDTS=sidts-CjIBSAxbGSjJ0ofY2vRCVz8xqU2RHXjyE-VqNeez6nkw8jvOZ5xtUFTPzutu1nM3OvSrJxAA; __Secure-3PSIDTS=sidts-CjIBSAxbGSjJ0ofY2vRCVz8xqU2RHXjyE-VqNeez6nkw8jvOZ5xtUFTPzutu1nM3OvSrJxAA; __Secure-3PSID=aQizKdEFw5-p5KcnHIHgPWALDWZSyYJmFsyl7wWOi7fu_X8g6hK1AfHBNbTFevBaBQPuvA.; LOGIN_INFO=AFmmF2swRQIhAIuauIKMJskoIcXPzomtvy4859ECXJjXKwIL4Fwqi8M-AiBi3HsuFHlV7lQ1cmm3p0MA9MZSsdNDL3RLqyb_aLrKMw:QUQ3MjNmemZrTWlwS2dIcm81YnNzTFRwVVFlLUF6bGh1TzV0ZWpMSFRRYm9XdHdMYnFVUV9kcWNVTVF2QXpzSWROYzE4YkM1RzU2ZjdjUk1BWTFRTm5FS1lFVHpkVXplUzF1ZGhmMTJvZW9Ca2x1Y24zTDl3bG1tSEFILWlWX2ZNRDBCVm9RSm9EZnJPMkFyMUJqaE9uR2xoM3hyVXJWbWtn; CONSISTENCY=AKreu9spRAFkKxEWfUje5J-netwXc64KTkz8ZxGkb2fS0jSkvw7HS3ZlNxyUNMoWb1_0Kzj4kSS6Wb0tulfITpFGHwYqDQyEvRz4lyfhoJV4U9Pa1V7XYEzG5c8QhUyn-KE21gCuwrCyYoLt295cpHM; SIDCC=APoG2W_12yoyWkHPHg7DjiiKJB01vkwulDW9v2gIuS0mUCIpDl7SGkQ8ywiYcwBXal5jnLxZ01s; __Secure-1PSIDCC=APoG2W9XogiNUjt9CjAlbVSb0YTrBJlo_rvOXGqodWmCwyDW_3SPyDLi9b1Co99YVhvhXvlWWPY; __Secure-3PSIDCC=APoG2W8Koq32WwziWG7m1gPuRhj8dxVpdIFrjbUM6rA2vH7wUY-cE16wy6XKz8QfLOuyKshzVjJa"
      }
    },
    filter: "audioandvideo",
    quality: 'highestvideo'
  });
  const videoPath = `./tmp/${randomBytes(3).toString("hex")}.mp4`;
  let index = 1;
  while (fs.existsSync(videoPath)) {
     videoPath = `./tmp/${randomBytes(3).toString("hex")}_${index}.mp4`;
     index++;
  }
  const output = fs.createWriteStream(videoPath);
  await new Promise((resolve, reject) => {
    stream.pipe(output);
    stream.on("end", () => {
      output.end();
      resolve(videoPath);
    });
    stream.on("error", (err) => {
      reject(err);
    });
    process.on('exit', () => {
      stream.destroy();
      reject(new Error('Stream terminated unexpectedly'));
    });
  });
  return {
    path: videoPath
  };
} catch (error) {
  throw error;
}
}    
    
  static async mp3_2(url, quality = '128kbps') {
  try {
    if (!url) {
      throw new Error("Video ID or YouTube Url is required");
    }
    url = this.isYTUrl(url) ? `https://www.youtube.com/watch?v=${this.getVideoID(url)}` : url;
    const yt = await youtubedl(url).catch(async (_) => await youtubedlv2(url));
    const dl_url = await yt.audio[quality].download();
    const audioBuffer = await getBuffer(dl_url);
    return audioBuffer;
  } catch (error) {
    throw error;
  }
}

  static async mp4_2(url, quality = '360p') {
    try {
      if (!url) {
        throw new Error("Video ID or YouTube Url is required");
      }
      url = this.isYTUrl(url) ? `https://www.youtube.com/watch?v=${this.getVideoID(url)}` : url;
      const yt = await youtubedl(url).catch(async (_) => await youtubedlv2(url));
      const dl_url = await yt.video[quality].download();
      const videoBuffer = await getBuffer(dl_url);
      return videoBuffer;
    } catch (error) {
      throw error;
    }
  }
    
  static ytinfo = async (url) => {
    try {
      if (!url) throw new Error("Video ID or YouTube Url is required");
      url = this.isYTUrl(url) ? "https://www.youtube.com/watch?v=" + this.getVideoID(url) : url;
      const info = await ytdl.getInfo(url, { lang: "id" });    
      const { videoDetails } = info;    
      const audioURL = ytdl.chooseFormat(info.formats, {quality: 'highestaudio'}).url;
      const videoURL = ytdl.chooseFormat(info.formats, {quality: 'highestvideo'}).url;
      const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${audioURL}`)).text();
      const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${videoURL}`)).text();
      const audiodl = shortUrl1 ? shortUrl1 : audioURL; 
      const videodl = shortUrl2 ? shortUrl2 : videoURL; 
    return {
      resultado: {
        channelUrl: videoDetails.author.channel_url,
        views: videoDetails.viewCount,
        category: videoDetails.category,
        id: videoDetails.videoId,
        url: videoDetails.video_url,
        publicDate: videoDetails.publishDate,
        uploadDate: videoDetails.uploadDate,
        keywords: videoDetails.keywords,
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url,
          download: {
             audio: audiodl,
             video: videodl
      },
     },   
    };
    } catch (error) {
      throw error;
    }
  };

  static ytinfo2 = async (url) => {
    try {
      if (!url) throw new Error("Video ID or YouTube Url is required");
      url = this.isYTUrl(url) ? "https://www.youtube.com/watch?v=" + this.getVideoID(url) : url;
      const info = await ytdl.getInfo(url, { lang: "id" });    
      const { videoDetails } = info;    
    return {
      resultado: {
        channelUrl: videoDetails.author.channel_url,
        views: videoDetails.viewCount,
        category: videoDetails.category,
        id: videoDetails.videoId,
        url: videoDetails.video_url,
        publicDate: videoDetails.publishDate,
        uploadDate: videoDetails.uploadDate,
        keywords: videoDetails.keywords,
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url
     },   
    };
    } catch (error) {
      throw error;
    }
  };  
    
}
module.exports = YT;
