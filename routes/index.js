const router = require('express').Router()
const fs = require('fs')


const path = __dirname

const routerVersion = {
  ytmp3: '/v1/ytmp3',
  ytmp3_2: '/v2/ytmp3',
  ytmp4: '/v1/ytmp4', 
  ytmp4_2: '/v2/ytmp4',
  igdl: '/v1',
  getmail: '/tempmail',
  getmessages: '/tempmail'
}

// se ignoran estas rutas porque se estan usando directamente en el index y las de func no son rutas 

const pathIgnore = ['func', 'human', 'human-apis']

const removeExtention = (filename) => {
  return filename.split('.').shift()
}

fs.readdirSync(path).filter(filename => {

  const name = removeExtention(filename)

  const version = routerVersion[name] ?? ''

  console.log(`${version}/${name.startsWith('ytmp') ? '' : name}`);
  if(name !== 'index' && !pathIgnore.includes(name)) {
    router.use(`${version}/${name.startsWith('ytmp') ? '' : name}`, require(`./${filename}`))
  }
})

module.exports = router
