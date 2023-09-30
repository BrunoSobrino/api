const Spotify = require('@silent-killer/killer-spotify-searching');

function spotifySearch(query) {
  const credentials = {
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009',
  };

  const client = new Spotify({
    consumer: {
      key: credentials.clientId,
      secret: credentials.clientSecret,
    },
  });

  const params = {
    q: query,
  };

  return client.search(params)
    .then(data => {
      return data;
    }).catch(error => {
      console.error('Error en la búsqueda de Spotify:', error);
      throw error;
    });
}

module.exports = spotifySearch;
