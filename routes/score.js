const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const randomUseragent = require('random-useragent');
const apicache = require("apicache");
const axios = require('axios');
const { rateLimit } = require('express-rate-limit');
const rua = randomUseragent.getRandom();
const cache = apicache.middleware
const matchdata = require('../utlis/app.json');
const { dummydata } = require('../utlis/error.js');
const { errormsg } = require('../utlis/msg.js');

const apiRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 40,
    handler: function (req, res) {
        return res.status(429).json(
          dummydata()
        )
    }
})

router.get('/', cache('2 minutes'), apiRequestLimiter, function(req, res) {
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.setHeader('Content-Type', 'application/json');

    const match_url = req.query.url;

    let str = match_url || '';
    let live_url = str.replace('www', 'm');

    axios({
        method: 'GET',
        url: live_url,
        headers: {
            'User-Agent': rua
        }
    }).then(function(response) {

        $ = cheerio.load(response.data);

        var title = $("h4.ui-header").text();
        var update = $("div.cbz-ui-status").text();
        var currentscore = $('span.ui-bat-team-scores').text();
        var batsman = $('span.bat-bowl-miniscore').eq(0).text();
        var batsmanrun = $('td[class="cbz-grid-table-fix "]').eq(6).text();
        var ballsfaced = $('span[style="font-weight:normal"]').eq(0).text();
        var fours = $('td[class="cbz-grid-table-fix "]').eq(7).text();
        var sixes = $('td[class="cbz-grid-table-fix "]').eq(8).text();
        var sr = $('td[class="cbz-grid-table-fix "]').eq(9).text();
        var batsmantwo = $('td[class="cbz-grid-table-fix "]').eq(10).text();
        var batsmantworun = $('td[class="cbz-grid-table-fix "]').eq(11).text();
        var batsmantwoballsfaced = $('span[style="font-weight:normal"]').eq(1).text();
        var batsmantwofours = $('td[class="cbz-grid-table-fix "]').eq(12).text();
        var batsmantwosixes = $('td[class="cbz-grid-table-fix "]').eq(16).text();
        var batsmantwosr = $('td[class="cbz-grid-table-fix "]').eq(14).text();
        var bowler = $('span.bat-bowl-miniscore').eq(2).text();
        var bowlerover = $('td[class="cbz-grid-table-fix "]').eq(21).text();
        var bowlerruns = $('td[class="cbz-grid-table-fix "]').eq(23).text();
        var bowlerwickets = $('td[class="cbz-grid-table-fix "]').eq(24).text();
        var bowlermaiden = $('td[class="cbz-grid-table-fix "]').eq(22).text();
        var bowlertwo =  $('span.bat-bowl-miniscore').eq(3).text();
        var bowletworover = $('td[class="cbz-grid-table-fix "]').eq(26).text();
        var bowlertworuns = $('td[class="cbz-grid-table-fix "]').eq(28).text();
        var bowlertwowickets = $('td[class="cbz-grid-table-fix "]').eq(29).text();
        var bowlertwomaiden = $('td[class="cbz-grid-table-fix "]').eq(27).text();
        var partnership = $("span[style='color:#333']").eq(0).text();
        var recentballs = $("span[style='color:#333']").eq(2).text();
        var lastwicket = $("span[style='color:#333']").eq(1).text();
        var runrate = $("span[class='crr']").eq(0).text();
        var commentary = $("p[class='commtext']").text();

        var livescore = ({
            title: title || "Data Not Found",
            update: update || "Data Not Found",
            current: currentscore || "Data Not Found",
            batsman: batsman || "Data Not Found",
            batsmanrun: batsmanrun || "Data Not Found",
            ballsfaced: ballsfaced || "Data Not Found",
            fours: fours || "Data Not Found",
            sixes: sixes || "Data Not Found",
            sr: sr || "Data Not Found",
            batsmantwo: batsmantwo || "Data Not Found",
            batsmantworun: batsmantworun || "Data Not Found",
            batsmantwoballsfaced: batsmantwoballsfaced || "Data Not Found",
            batsmantwofours: batsmantwofours || "Data Not Found",
            batsmantwosixes: batsmantwosixes || "Data Not Found",
            batsmantwosr: batsmantwosr || "Data Not Found",
            bowler: bowler || "Data Not Found",
            bowlerover: bowlerover || "Data Not Found",
            bowlerruns: bowlerruns || "Data Not Found",
            bowlerwickets: bowlerwickets || "Data Not Found",
            bowlermaiden: bowlermaiden || "Data Not Found",
            bowlertwo: bowlertwo || "Data Not Found",
            bowletworover: bowletworover || "Data Not Found",
            bowlertworuns: bowlertworuns || "Data Not Found",
            bowlertwowickets: bowlertwowickets || "Data Not Found",
            bowlertwomaiden: bowlertwomaiden || "Data Not Found",
            partnership: partnership || "Data Not Found",
            recentballs: recentballs || "Data Not Found",
            lastwicket: lastwicket || "Data Not Found",
            runrate: runrate || "Data Not Found",
            commentary: commentary || "Data Not Found"
        });

        res.send(JSON.stringify(livescore, null, 4));

    }).catch(function(error) {
        if (!error.response) {
            res.json(errormsg());
        } else {
            res.json(errormsg());
        }
    });

});

module.exports = router;