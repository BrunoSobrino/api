const yts = require('yt-search');

const ytsearch = async (searchText) => {
  if (!searchText) {
    throw new Error('Texto de búsqueda no especificado');
  }

  const results = await yts(searchText);

  const formattedResults = results.all.map((video) => {
    if (video.type === 'video') {
      return {
        title: video.title,
        url: video.url,
        duration: video.timestamp,
        uploaded: video.ago,
        views: video.views,
        thumbnail: video.thumbnail
     };
    }
    return null;
  }).filter(Boolean);

  return { resultado: formattedResults };
};

module.exports = { ytsearch };
