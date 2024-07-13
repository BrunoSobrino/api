process.on('uncaughtException', console.error)
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const PORT = parseInt(process.env.PORT || 2035);
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const axios = require('axios');
const favicon = require('serve-favicon');
const nodemailer = require("nodemailer");
const visitors = new Set(); 
let totalRequests = 0;
let totalVisitors = 0;

var allowedOrigins = ['https://api.cafirexos.com', 'http://localhost:2027'];

app.set('trust proxy', 1)

// Inicicializar el servidor de correo

if (process.env.new_user_verification === "true") {
const transporter = nodemailer.createTransport({
  host: process.env.smtp_host,
  port: Number(process.env.smtp_port),
  secure: process.env.smtp_is_secure === 'true',
  auth: {
    user: process.env.smtp_user,
    pass: process.env.smtp_password
  },
});
global.mTransporter = transporter;
}



// Funciones

const home = require('./routes/home');
const docs = require('./routes/docs');
const apirouter5 = require('./routes/human-apis');

const getUptime = () => {
  const uptimeInSeconds = Math.floor(process.uptime());
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = uptimeInSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
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


app.use('/api', require('./routes'))

// si es /human/algo usa las rutas dinamicas de ./routes/human
app.use('/human', require('./routes/human'))

//si es /human entra aqui directamente
app.use('/human', apirouter5);

app.use('/tmp', express.static('tmp'));
app.use(express.static('public'));
app.use(express.static('data'));

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

global.lolkeysapi = 'GataDiosV2';

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
app.listen(PORT, function() {
    const line = chalk.yellow('==========================================');
    const serverUrl = 'http://localhost:' + PORT;
    const serverMessage = chalk.green.bold('| Server activo: ') + chalk.blue.bold(serverUrl);
    const creatorMessage = chalk.magenta.bold('| Creador: BrunoSobrino');
    const numberMessage = chalk.magenta.bold('| Numero: +52 1 999 612 5657');
    const apiMessage = chalk.red.bold('|          "Free Api Rest"');
    console.log(chalk.yellow(line));
    console.log(apiMessage);
    console.log(chalk.yellow(line));
    console.log(serverMessage);
    console.log(chalk.yellow(line));
    console.log(creatorMessage);
    console.log(numberMessage);
    console.log(chalk.yellow(line));
});