const router = require('express').Router()
const fs = require('fs')

// para no romper compativilidad con los endpoints ya creados

const routerVersion = {
  ytmp3_1: '/v1/ytmp3',
  ytmp3_2: '/v2/ytmp3',
  ytmp4_1: '/v1/ytmp4', 
  ytmp4_2: '/v2/ytmp4'
}

const path = __dirname

const removeExtention = (filename) => {
  return filename.split('.').shift()
}

// lee todos los archivos del file human y crea las rutas dinamicamente
// ejemplo:
// ytmp3_1.js: primero remueve la ext .js se queda con el nombre ytmp3
// pasa por la version -> /v1/ytmp3 y en caso que el name empieze por ytmp la ruta queda siendo /v1/ytmp3 y por ultimo requiere el archivo ./ytmp3_1.js

fs.readdirSync(path).filter(filename => {
  const name = removeExtention(filename)
  if(name !== 'index') {
    const version = routerVersion[name] ?? ''
    router.use(`${version}/${name.startsWith('ytmp') ? '' : name}`, require(`./${filename}`))
  }
})

module.exports = router