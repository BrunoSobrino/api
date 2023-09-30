const playdl = require('play-dl');

async function spotifySearch(query) {
  try {
    const results = await playdl.search(query, { limit: 10 }); // Limita a 10 resultados
    const data = results.map((result, index) => ({
      title: result.title,
      url: result.url,
      author: result.uploader.name,
      duration: result.duration,
    }));
    
    return { data };
  } catch (error) {
    console.error('Error en la búsqueda de canciones:', error);
    return { error: 'Error en la búsqueda de canciones' };
  }
}

module.exports = spotifySearch;
