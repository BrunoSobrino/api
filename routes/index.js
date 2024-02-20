const router = require('express').Router()
const bodyParser = require('body-parser')
const fs = require('fs')
const database = require('./func/database')


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


router.use(function (req, res, next) {
  if (req.url.includes('manageusers')) return next()
  const apiKey = req.query.apikey
  //console.log(apiKey);
  if (!apiKey) {
    return res.status(401).json({ status: false, message: 'No se proporcionó una clave de API' })
  }
  let search = database.getDatabaseByApiKey(apiKey)
  if (!search) {
    return res.status(401).json({ status: false, message: 'Clave de API no válida' })
  }

  if (search.isBanned) {
    return res.status(401).json({ status: false, message: 'El usuario ha sido baneado' })
  }

  if (!search.isVerified) {
    return res.status(401).json({ status: false, message: 'El usuario no ha verificado su correo electrónico' })
  }

  if (!search.isPremium) {
    // Comprobar si ya pasaron 24 horas
    if (search.lastUsed < Date.now() - 86400000) {
      search.lastUsed = Date.now()
      search.uses = 0
    }
    if (search.uses >= Number(process.env.free_user_limit)) {
      return res.status(401).json({ status: false, message: 'Límite de uso diario alcanzado, Vuelve mañana' })
    }
  } else {
    if (search.lastUsed < Date.now() - 86400000) {
      search.lastUsed = Date.now()
      search.uses = 0
    }
    if (search.uses >= Number(process.env.premium_user_limit)) {
      return res.status(401).json({ status: false, message: 'Límite de uso diario alcanzado, Vuelve mañana' })
    }
  }

  database.addUse(search.mail)

  next();
});

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

fs.readdirSync(path).filter(filename => {

  const name = removeExtention(filename)

  const version = routerVersion[name] ?? ''

  //console.log(`${version}/${name.startsWith('ytmp') ? '' : name}`);
  if(name !== 'index' && !pathIgnore.includes(name)) {
    router.use(`${version}/${name.startsWith('ytmp') ? '' : name}`, require(`./${filename}`))
  }
})


module.exports = router
