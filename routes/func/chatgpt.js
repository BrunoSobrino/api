const fetch = require('node-fetch');
const translate = require('@vitalets/google-translate-api');

async function chatgpt(text, lenguaje = 'es') {
  const result = {
    status: true,
    resultado: "",
  };
  try {
    const fgapi1 = await fetch(`https://api-fgmods.ddns.net/api/info/openai2?text=${text}&apikey=XlwAnX8d`);
    const fgjson1 = await fgapi1.json();
    if (fgjson1.result != 'error' && fgjson1.result != '' && fgjson1.result != undefined && fgjson1.result) {
      const translatedResult = await translate(fgjson1.result, { to: lenguaje, autoCorrect: true });
      result.resultado = translatedResult.text.trim();
      return result;
    }
  } catch {
    try {
      const vihangayt1 = await fetch(`https://vihangayt.me/tools/chatgpt?q=${text}`);
      const vihangaytjson1 = await vihangayt1.json();
      if (vihangaytjson1.data != 'error' && vihangaytjson1.data != '' && vihangaytjson1.data != undefined && vihangaytjson1.data) {
        let parsedData1 = ''; 
        try {     
          parsedData1 = unescape(vihangaytjson1.data);
        } catch {
          parsedData1 = vihangaytjson1.data;    
        }  
        const translatedResult = await translate(parsedData1, { to: lenguaje, autoCorrect: true });
        result.resultado = translatedResult.text.trim();
        return result;
      }
    } catch {
      try {
        const vihangayt2 = await fetch(`https://vihangayt.me/tools/chatgpt2?q=${text}`);
        const vihangaytjson2 = await vihangayt2.json();
        if (vihangaytjson2.data != 'error' && vihangaytjson2.data != '' && vihangaytjson2.data != undefined && vihangaytjson2.data) {
          let parsedData2 = ''; 
          try {     
            parsedData2 = unescape(vihangaytjson2.data);
          } catch {
            parsedData2 = vihangaytjson2.data;    
          }  
          const translatedResult = await translate(parsedData2, { to: lenguaje, autoCorrect: true });
          result.resultado = translatedResult.text.trim();
          return result;
        }
      } catch {
        try {
          const vihangayt3 = await fetch(`https://vihangayt.me/tools/chatgpt3?q=${text}`);
          const vihangaytjson3 = await vihangayt3.json();
          if (vihangaytjson3.data != 'error' && vihangaytjson3.data != '' && vihangaytjson3.data != undefined && vihangaytjson3.data) {
            let parsedData3 = ''; 
            try {     
              parsedData3 = unescape(vihangaytjson3.data);
            } catch {
              parsedData3 = vihangaytjson3.data;    
            }  
            const translatedResult = await translate(parsedData3, { to: lenguaje, autoCorrect: true });
            result.resultado = translatedResult.text.trim();
            return result;
          }
        } catch {
          try {
            const tioress22 = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=GataDios&text=${text}&user=${m.sender}`);
            const hasill22 = await tioress22.json();
            if (hasill22.result != 'error' && hasill22.result != '' && hasill22.result != undefined && hasill22.result) {
              const translatedResult = await translate(hasill22.result, { to: lenguaje, autoCorrect: true });
              result.resultado = translatedResult.text.trim();
              return result;
            }
          } catch {
            try {
              const searchString2 = ' Indonesia ';
              const replacementString2 = ' español ';
              const rres = await fetch(`https://api.ibeng.tech/api/others/chatgpt?q=Hola&apikey=eMlBNRzUXv`);
              const jjson = await rres.json();
              if (jjson.data != 'error' && jjson.data != '' && jjson.data != undefined && jjson.data) {
                const hahaha = await translate(jjson.data, { to: lenguaje, autoCorrect: true });
                const sextS = hahaha.text;
                const replacedText = sextS.replace(searchString2, replacementString2).trim();
                result.resultado = replacedText;
                return result;
              }
            } catch {
              try {
                const akuariapi2 = await fetch(`https://api.akuari.my.id/ai/gpt?chat=${text}`);
                const akuariapijson2 = await akuariapi2.json();
                if (akuariapijson2.respon != 'error' && akuariapijson2.respon != '' && akuariapijson2.respon != undefined && akuariapijson2.respon) {
                  const translatedResult = await translate(akuariapijson2.respon, { to: lenguaje, autoCorrect: true });
                  result.resultado = translatedResult.text.trim();
                  return result;
                }
              } catch {
                try {
                  const akuariapi1 = await fetch(`https://api.azz.biz.id/api/bard?q=${text}&key=global`);
                  const akuariapijson1 = await akuariapi1.json();
                  if (akuariapijson1.respon != 'error' && akuariapijson1.respon != '' && akuariapijson1.respon != undefined && akuariapijson1.respon) {
                    const translatedResult = await translate(akuariapijson1.respon, { to: lenguaje, autoCorrect: true });
                    result.resultado = translatedResult.text.trim();
                    return result;
                  }
                } catch {
                  result.status = false;
                  result.resultado = "Error en todas las APIs";
                  return result;
                }
              }
            }
          }
        }
      }
    }
  }
  result.status = false;
  result.resultado = "Error en todas las APIs";
  return result;
}

module.exports = chatgpt;
