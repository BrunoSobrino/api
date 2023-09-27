const axios = require('axios');

const getBuffer = async (url, options) => {
    options = options || {};
    const res = await axios({
        method: 'get',
        url,
        headers: {
            'DNT': 1,
            'Upgrade-Insecure-Request': 1,
        },
        ...options,
        responseType: 'arraybuffer'
    });
    return res.data;
};

module.exports = {
    getBuffer
};
