const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require('chalk');
const port = process.env.PORT || 3036;

var allowedOrigins = ['https://api.onrender.com'];

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

const home = require('./routes/home');
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

app.use('/', home);
app.use('/ttimg', ttimg);
app.use('/v1/ytmp3', ytmp3);
app.use('/v1/ytmp4', ytmp4);
app.use('/v2/ytmp3', ytmp3_2);
app.use('/v2/ytmp4', ytmp4_2);
app.use('/nsfw/nsfwloli', nsfwloli);
app.use('/tiktok', tiktokdl);
app.use('/ytsearch', ytsearch);
app.use('/ytdl', ytdl);
app.use('/ytplay', ytplay);
app.use('/spotifysearch', spotifys);
app.use('/tmp', express.static('tmp'));
app.use(express.static('public'));

app.disable("x-powered-by");

app.use('/', function(req, res) {
    const errorMessage = {
        error: 1,
        message: 'Data not Found'
    };
    res.status(404).json(errorMessage);
});

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
