const axios = require('axios');
const cheerio = require('cheerio');

const ttimg = async (link) => {
    if (!link) return { data: '*[❗] Enlace no encontrado.*' };
    try {    
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`;    
        let response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let imgSrc = [];
        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'));
        });
        if (imgSrc.length === 0) {
            return { data: '*[❗] No se encontraron imágenes en el enlace proporcionado.*' };
        }
        return { data: imgSrc }; 
    } catch (error) {
        console.log(error);
        return { data: '*[❗] No se obtuvo respuesta de la página, intente más tarde.*'};
    }
};

module.exports = ttimg;
