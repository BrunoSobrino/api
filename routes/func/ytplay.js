const yts = require('yt-search');
const fetch = require('node-fetch');
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper');

const ytplay = async (input) => {
  try {
    if (!input) {
      throw new Error('Input not specified');
    }

    let videoInfo;
    let searchResult;
    let isSearch = false;

    if (input.startsWith('https://www.youtube.com/') || input.startsWith('https://youtu.be/')) {
      try {
        videoInfo = await youtubedl(input);
      } catch (error) {
        videoInfo = await youtubedlv2(input);
      }
      searchResult = await yts({ videoId: videoInfo.id });
    } else {
      const searchResults = await yts(input);
      if (!searchResults.videos.length) {
        throw new Error('No videos found for the search query');
      }
      searchResult = searchResults.videos[0];
      try {
        videoInfo = await youtubedl(searchResult.url);
      } catch (error) {
        videoInfo = await youtubedlv2(searchResult.url);
      }
      isSearch = true;
    }

    const audioURL = await videoInfo.audio['128kbps']?.download() || "-";
    const videoURL = await videoInfo.video['360p']?.download() || "-";
    const shortAudioURL = audioURL !== "-" ? await (await fetch(`https://tinyurl.com/api-create.php?url=${audioURL}`)).text() : "-";
    const shortVideoURL = videoURL !== "-" ? await (await fetch(`https://tinyurl.com/api-create.php?url=${videoURL}`)).text() : "-";

    return {
      resultado: {
        channelUrl: searchResult.author.url || "-",
        views: searchResult.views || "-",
        category: "-",
        id: videoInfo.id || searchResult.videoId || "-",
        url: searchResult.url || "-",
        publicDate: searchResult.ago || "-",
        uploadDate: searchResult.ago || "-",
        keywords: "-",
        title: videoInfo.title || searchResult.title || "-",
        channel: searchResult.author.name || "-",
        seconds: searchResult.duration.seconds || "-",
        description: searchResult.description || "-",
        image: videoInfo.thumbnail || searchResult.thumbnail || "-",
        download: {
          audio: isSearch ? shortAudioURL : audioURL,
          video: isSearch ? shortVideoURL : videoURL,
        },
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { ytplay };
