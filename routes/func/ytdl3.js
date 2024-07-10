const { ytmp3v2, ytmp4 } = require('ruhend-scraper');

async function obtenerInformacionYoutube(url) {
    try {
        const { title: audioTitle, audio } = await ytmp3v2(url);
        const { title: videoTitle, video, quality, thumbnail, size } = await ytmp4(url);
        return {
            status: true,
            resultado: {
                ytmp3v2: {
                    title: audioTitle,
                    audio
                },
                ytmp4: {
                    title: videoTitle,
                    video,
                    quality,
                    thumbnail,
                    size
                }
            }
        };
    } catch (error) {
        return {
            status: false,
            resultado: {
                error: error.message
            }
        };
    }
}

module.exports = {
obtenerInformacionYoutube
};
