const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const port = process.env.PORT || 3036 || 50031;
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');
let totalRequests = 0;

var allowedOrigins = ['https://api-brunosobrino.onrender.com', 'https://api.boxmine.xyz', 'http://prem-n1.zipponodes.com:50031', 'https://api.brunosobrino.repl.co'];

app.set('trust proxy', 1)

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback((msg));
        }
        return callback(null, true);
    }
}));

// Funciones

const home = require('./routes/home');
const docs = require('./routes/docs');
const ttimg = require('./routes/ttimg');
const ytmp3 = require('./routes/ytmp3');
const ytmp4 = require('./routes/ytmp4');
const ytmp3_2 = require('./routes/ytmp3_2');
const ytmp4_2 = require('./routes/ytmp4_2');
const nsfwloli = require('./routes/nsfwloli');
const tiktokdl = require('./routes/tiktok');
const ytsearch = require('./routes/ytsearch');
const ytdl = require('./routes/ytdl');
const ytplay = require('./routes/ytplay');
const spotifys = require('./routes/spotifysearch');
const chatgpt = require('./routes/chatgpt');
const igdl1 = require('./routes/igdl');
const igdl2 = require('./routes/igdl2');
const getmail = require('./routes/correos-getMail');
const getmessages = require('./routes/correos-getMessages');


const getUptime = () => {
  const uptimeInSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = uptimeInSeconds % 60;
  return `${hours} horas, ${minutes} minutos, ${seconds} segundos`;
};

// Subpaginas y usos

app.use((req, res, next) => {
  req.startTime = Date.now();
  totalRequests++; 
  next();
});

app.use('/', home);
app.use('/docs', docs);

app.use('/api/ttimg', ttimg);
app.use('/api/v1/ytmp3', ytmp3);
app.use('/api/v1/ytmp4', ytmp4);
app.use('/api/v2/ytmp3', ytmp3_2);
app.use('/api/v2/ytmp4', ytmp4_2);
app.use('/api/nsfw/nsfwloli', nsfwloli);
app.use('/api/tiktok', tiktokdl);
app.use('/api/ytsearch', ytsearch);
app.use('/api/ytdl', ytdl);
app.use('/api/ytplay', ytplay);
app.use('/api/spotifysearch', spotifys);
app.use('/api/chatgpt', chatgpt);
app.use('/api/v1/igdl', igdl1);
app.use('/api/v2/igdl', igdl2);
app.use('/api/tempmail/getmail', getmail);
app.use('/api/tempmail/getmessages', getmessages);

app.use('/tmp', express.static('tmp'));
app.use(express.static('public'));

app.get('/status', (req, res) => {
  const uptime = getUptime();
  const averageResponseTime = Date.now() - req.startTime;
  const response = {
    uptime: uptime,
    latencia: `${averageResponseTime} ms`,
    totalRequests: totalRequests,
    creator: 'BrunoSobrino',
    phoneNumber: '+52 1 999 612 5657',
    mainPages: {
      home: '/',
      status: '/status',  
      documentacion: '/docs',    
      searchs: {
         ytsearch: '/api/ytsearch',
         spotifysearch: '/api/spotifysearch'
      },
      herramientas: {
         chatgpt: '/api/chatgpt'
      },
      downloader: {
         v1_ytmp3: '/api/v1/ytmp3',
         v1_ytmp4: '/api/v1/ytmp4',
         v2_ytmp3: '/api/v2/ytmp3',
         v2_ytmp4: '/api/v2/ytmp4',
         ytdl: '/api/ytdl',
         ytplay: '/api/ytplay',
         tiktok: '/api/tiktok',
         ttimg: '/api/ttimg'          
      },
      imagen_random: {
         nsfwloli: '/api/nsfw/nsfwloli'
      }
    },
  };
  const formattedResponse = JSON.stringify(response, null, 2);
  res.setHeader('Content-Type', 'application/json');
  res.end(formattedResponse);
});

app.disable("x-powered-by");

app.use(function(req, res, next) {
    res.status(404);
    const filePath = path.join(__dirname, 'public', '404.html');
    res.sendFile(filePath);
});

// Funciones automáticas 
const clearTmpFiles = () => {
  const tmpDir = './tmp';
  fs.readdir(tmpDir, (err, files) => {
    if (err) return console.error('Error al leer directorio temporal:', err);
    const filesToDelete = files.filter((file) => file !== 'file');
    if (filesToDelete.length > 0) {
      filesToDelete.forEach((file) => {
        const filePath = path.join(tmpDir, file);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error al eliminar el archivo:', unlinkErr);
          }
        });
      });
    } else {
      return;
    }
  });
};
setInterval(clearTmpFiles, 60000);

let previousCommitSHA = '';
let isError = false;
async function checkRepoUpdates() {
  if (isError) return;
  try {
    const response = await axios.get(`https://api.github.com/repos/BrunoSobrino/api/commits?per_page=1`);
    const { sha } = response.data[0];
    if (sha !== previousCommitSHA) {
      const stdout = execSync('git pull');
      previousCommitSHA = sha;
    }
  } catch {
    isError = true;
    return;
  }
}
setInterval(checkRepoUpdates, 300000); //300000

// Log incial 
app.listen(port, function() {
    const line = chalk.yellow('==========================================');
    const serverUrl = 'http://localhost:' + port;
    const serverMessage = chalk.green.bold('| Server activo: ') + chalk.blue.bold(serverUrl);
    const creatorMessage = chalk.magenta.bold('| Creador: BrunoSobrino');
    const numberMessage = chalk.magenta.bold('| Numero: +52 1 999 612 5657');
    const apiMessage = chalk.red.bold('|          "Api Rest Free"');
    console.log(chalk.yellow(line));
    console.log(apiMessage);
    console.log(chalk.yellow(line));
    console.log(serverMessage);
    console.log(chalk.yellow(line));
    console.log(creatorMessage);
    console.log(numberMessage);
    console.log(chalk.yellow(line));
});
