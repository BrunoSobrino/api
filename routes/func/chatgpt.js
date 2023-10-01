const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

async function chatgpt(text, lenguaje = 'es') {
  if (!text) {
    return {
      status: false,
      message: "No has ingresado un texto.",
      ejemplo: "https://api.boxmine.xyz/chatgpt?text=hola&lenguaje=es"
    };
  }    
  const result = {
    status: true,
    resultado: "",
  };
  const apiEndpoints = [
    {
      url: `https://api-fgmods.ddns.net/api/info/openai2?text=${text}&apikey=XlwAnX8d`,
      processResponse: async (data) => {
        if (data?.result != 'error' && data?.result != '' && data?.result != undefined && data?.result) {
          const translatedResult = await translate(data.result, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://vihangayt.me/tools/chatgpt?q=${text}`,
      processResponse: async (data) => {
        if (data?.data != 'error' && data?.data != '' && data?.data != undefined && data?.data) {
          let parsedData = '';
          try {
            parsedData = unescape(data.data);
          } catch {
            parsedData = data.data;
          }
          const translatedResult = await translate(parsedData.replace(/\\[uU]([0-9A-Fa-f]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16))), { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://vihangayt.me/tools/chatgpt2?q=${text}`,
      processResponse: async (data) => {
        if (data?.data != 'error' && data?.data != '' && data?.data != undefined && data?.data) {
          let parsedData = '';
          try {
            parsedData = unescape(data.data);
          } catch {
            parsedData = data.data;
          }
          const translatedResult = await translate(parsedData.replace(/\\[uU]([0-9A-Fa-f]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16))), { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://vihangayt.me/tools/chatgpt3?q=${text}`,
      processResponse: async (data) => {
        if (data?.data != 'error' && data?.data != '' && data?.data != undefined && data?.data) {
          let parsedData = '';
          try {
            parsedData = unescape(data.data);
          } catch {
            parsedData = data.data;
          }
          const translatedResult = await translate(parsedData.replace(/\\[uU]([0-9A-Fa-f]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16))), { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://api.lolhuman.xyz/api/openai?apikey=GataDios&text=${text}&user=apirest`,
      processResponse: async (data) => {
        if (data?.result != 'error' && data?.result != '' && data?.result != undefined && data?.result) {
          const translatedResult = await translate(data.result, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://api.ibeng.tech/api/others/chatgpt?q=${text}&apikey=eMlBNRzUXv`,
      processResponse: async (data) => {
        if (data?.data != 'error' && data?.data != '' && data?.data != undefined && data?.data) {
          const hahaha = await translate(data.data, { to: lenguaje, autoCorrect: true });
          const sextS = hahaha.text;
          const replacedText = sextS.replace(' Indonesia ', ' español ').trim();
          result.resultado = replacedText;
        }
      },
    },
    {
      url: `https://api.akuari.my.id/ai/gpt?chat=${text}`,
      processResponse: async (data) => {
        if (data?.respon != 'error' && data?.respon != '' && data?.respon != undefined && data?.respon) {
          const translatedResult = await translate(data.respon, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://api.azz.biz.id/api/bard?q=${text}&key=global`,
      processResponse: async (data) => {
        if (data?.respon != 'error' && data?.respon != '' && data?.respon != undefined && data?.respon) {
          const translatedResult = await translate(data.respon, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
  ];

  for (const apiEndpoint of apiEndpoints) {  
    const response = await fetch(apiEndpoint.url);
    if (response.ok) {
      try {
        const responseData = await response.json();
        if (responseData) {
          await apiEndpoint.processResponse(responseData);
          if (result.resultado) {
            result.resultado = result.resultado;
            return result;
          }
        }
      } catch {}
    }
  }
  result.status = false;
  result.resultado = "Error en todas las APIs";
  return result;
}

module.exports = chatgpt;
