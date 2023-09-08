# Free Cricket API 🏏  

[![Github Workflow](https://github.com/sanwebinfo/cricket-api-nodejs/workflows/server-test/badge.svg)](https://github.com/sanwebinfo/cricket-api-nodejs/actions)  

Node.js Version - Get Live Cricket Score data from `Cricbuzz.com`  

This is an unofficial API and not Linked or Partnered with Any Brands/Company.  

## How it Works? 🤔

Build using Node.js and cheerio.js - using cheerio for Scrape the data and Converted in JSON API with the Help of Express Server.

Everything is scraped live and shown to end users in realtime.  

**API URL**

- Live Match Data - `http://localhost:3000/live`
- Get Live data from the URL - `http://localhost:3000/score?url=<Live Match URL>`  

**Note**

API Caching, CORS and API Rate limit Was Enabled by default you can update the settings accoding to your usage - Files are Located in `/routes/` folder  

## Requirements 📑

- Server With Latest LTS Node.JS Support and Nginx (For Self Host)
- HTTPS for Secure SSL Connection

(OR)

- use Vercel or Heroku Free Cloud Hosting

## Installation and Development 📥

- Download the Clone the Repo

```sh
git clone https://github.com/sanwebinfo/cricket-api-nodejs.git
cd cricket-api-nodejs
```

- install Node Modules via `yarn`

```sh
yarn
```

- Test Locally

```sh
yarn dev
```

- Production

```sh
yarn start
```

## Usage 🍟

- Get the Live Match Score URL from - `https://www.cricbuzz.com/cricket-match/live-scores`
- Enter them Directly or replace `www` with `m`

### Example 📋

```sh
http://localhost:3000/score?url=https://www.cricbuzz.com/live-cricket-scores/30524/53rd-match-indian-premier-league-2020
```

(OR)

- Update the Match URL on `/utlis/app.json` File

```sh
http://localhost:3000/live
```

## Free Hosting 😍

- Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fsanwebinfo%2Fcricket-api-nodejs)  

## Contributing 🙌

Your PR's are Welcome

## Disclaimer 🗃

- This is not an Offical API from Cricbuzz - it's an Unofficial API
- This is for Education Purpose only - use at your own risk on Production Site

All Credits Goes to <https://www.cricbuzz.com/>

## LICENSE 📕

MIT
