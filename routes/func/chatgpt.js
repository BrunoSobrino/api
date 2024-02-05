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
/*    {
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
    },*/
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
      url: `https://rest-api.akuari.my.id/ai/gpt?chat=${text}`,
      processResponse: async (data) => {
        if (data?.respon != 'error' && data?.respon != '' && data?.respon != undefined && data?.respon) {
          const translatedResult = await translate(data.respon, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
    {
      url: `https://api.azz.biz.id/api/gpt?q=${text}&user=Adit`,
      processResponse: async (data) => {
        if (data?.respon != 'error' && data?.respon != '' && data?.respon != undefined && data?.respon) {
          const translatedResult = await translate(data.respon, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
        }
      },
    },
  ];

for (const apiEndpoint of apiEndpoints) {  
  try {
    const response = await fetch(apiEndpoint.url);
    if (response.ok) {
      const responseData = await response.json();
      if (responseData) {
        await apiEndpoint.processResponse(responseData);
        if (result.resultado) {
          result.resultado = result.resultado;
          return result;
        }
      }
    }
  } catch {}
}
  result.status = false;
  result.resultado = "Error en todas las APIs";
  return result;
}

async function gpt(content) {
  let url = 'https://c3.a0.chat/v1/chat/gpt/';
  let headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2004J19C Build/RP1A.200720.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.129 Mobile Safari/537.36 WhatsApp/1.2.3',
    'Referer': 'https://c3.a0.chat/#/web/chat'
  }

  const datos = {
    list: [
      {
        content: content,
        role: "user",
        nickname: senderName,
        time: "2023-9-19 14:30:08",
        isMe: true,
        index: 0
      }
    ],
    id: 1695108574472,
    title: "Samuel",
    time: "2023-9-19 14:29:34",
    prompt: "",//aca agrega como quieres que actue la ia xd
    models: 0,
    temperature: 0,
    continuous: true
  }

  try {
    let ress = await axios.post(url, datos, { headers });
    return ress.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { chatgpt, gpt };
