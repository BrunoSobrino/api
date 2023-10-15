const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const port = 3036;
const port2 = 40016;
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');
const favicon = require('serve-favicon');
const visitors = new Set(); 
let totalRequests = 0;
let totalVisitors = 0;

var allowedOrigins = ['https://api.boxmine.xyz', 'https://api.brunosobrino.repl.co'];

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
const tiktokdl = require('./routes/tiktok');
const ytsearch = require('./routes/ytsearch');
const ytplay = require('./routes/ytplay');
const spotifydl = require('./routes/spotifydl');
const spotifyinfo = require('./routes/spotifyinfo');
const spotifysearch = require('./routes/spotifysearch');
const chatgpt = require('./routes/chatgpt');
const igdl1 = require('./routes/igdl');
const igdl2 = require('./routes/igdl2');
const getmail = require('./routes/correos-getMail');
const getmessages = require('./routes/correos-getMessages');
const facebook = require('./routes/facebook');
const xnxxdl = require('./routes/xnxxdl');
const xnxxsearch = require('./routes/xnxxsearch');
const apirouter = require('./routes/anime-apis');
const apirouter2 = require('./routes/adult-apis');
const apirouter3 = require('./routes/nsfw-apis');
const apirouter4 = require('./routes/wallpaper-apis');
const lyrics = require('./routes/lyrics');
const ssweb = require('./routes/ssweb');
const googleImage = require('./routes/googleImage');


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
  const userIp = req.ip; 
  if (!visitors.has(userIp)) {
    visitors.add(userIp); 
    totalVisitors++; 
  }
  next();
});

app.use('/', home);
app.use('/docs', docs);

app.use('/api/anime', apirouter);
app.use('/api/adult', apirouter2);
app.use('/api/nsfw', apirouter3);
app.use('/api/wallpaper', apirouter4);
app.use('/api/ttimg', ttimg);
app.use('/api/v1/ytmp3', ytmp3);
app.use('/api/v1/ytmp4', ytmp4);
app.use('/api/v2/ytmp3', ytmp3_2);
app.use('/api/v2/ytmp4', ytmp4_2);
app.use('/api/tiktok', tiktokdl);
app.use('/api/ytsearch', ytsearch);
app.use('/api/ytplay', ytplay);
app.use('/api/spotifydl', spotifydl);
app.use('/api/spotifyinfo', spotifyinfo);
app.use('/api/spotifysearch', spotifysearch);
app.use('/api/chatgpt', chatgpt);
app.use('/api/v1/igdl', igdl1);
app.use('/api/v2/igdl', igdl2);
app.use('/api/tempmail/getmail', getmail);
app.use('/api/tempmail/getmessages', getmessages);
app.use('/api/facebook', facebook);
app.use('/api/xnxxdl', xnxxdl);
app.use('/api/xnxxsearch', xnxxsearch);
app.use('/api/lyrics', lyrics);
app.use('/api/ssweb', ssweb);
app.use('/api/googleImage', googleImage);

app.use('/tmp', express.static('tmp'));
app.use(express.static('public'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/status', (req, res) => {
  const uptime = getUptime();
  const averageResponseTime = Date.now() - req.startTime;
  totalRequests--; 
  const response = {
    uptime: uptime,
    latencia: `${averageResponseTime} ms`,
    totalRequests: totalRequests,
    totalVisitors: totalVisitors,
    creator: 'BrunoSobrino',
    phoneNumber: '+52 1 999 612 5657'
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
      const stdout = execSync('git pull > /dev/null 2>&1');
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
app.listen(port2, function() {});
