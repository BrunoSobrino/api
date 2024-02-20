const fs = require('fs')
const crypto = require('crypto')

const databaseDir = "./database.json"

if (!fs.existsSync(databaseDir)) {
  fs.writeFileSync(databaseDir, JSON.stringify([]))
}

const database = JSON.parse(fs.readFileSync(databaseDir))

/**
 * Obtiene un usuario de la base de datos, si no existe devuelve undefined
 * @param {String} mail 
 * @param {Boolean} includePassword
 * @returns {{
 *   mail: String,
 *   hashPassword: String | undefined,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }}
 */

const getDatabaseByUser = (mail, includePassword) => {
    return database.find(user => user.mail === mail)
    ? includePassword
      ? database.find(user => user.mail === mail)
      : { ...database.find(user => user.mail === mail), hashPassword: undefined }
    : undefined

}


/**
 * Obtiene un usuario de la base de datos, si no existe devuelve undefined
 * @param {String} apikey
 * @returns {{
 *   mail: String,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }}
 */

const getDatabaseByApiKey = (apikey) => {
    return database.find(user => user.apikey === apikey)
    ? { ...database.find(user => user.apikey === apikey), hashPassword: undefined }
    : undefined
}

/**
 * Obtiene un usuario de la base de datos, si no existe devuelve undefined
 * @param {String} userId 
 * @returns {{
 *   mail: String,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }}
 */

const getDatabaseByUserId = (userId) => {
    return database.find(user => user.userId === userId)
    ? { ...database.find(user => user.userId === userId), hashPassword: undefined }
    : undefined
}

/**
 * Obtiene un usuario de la base de datos, si no existe devuelve undefined
 * @param {String} verifyCode 
 * @returns {{
 *   mail: String,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   verifyCode: String | undefined,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }}
 */

const getDatabaseByVerifyCode = (verifyCode) => {
    return database.find(user => user.verifyCode === verifyCode)
    ? { ...database.find(user => user.verifyCode === verifyCode), hashPassword: undefined }
    : undefined
}

/**
 * Obtiene un usuario de la base de datos, si no existe devuelve undefined
 * @returns {[{
 *   mail: String,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }]}
 */

const getDatabase = () => {
    return database.map(user => ({ ...user, hashPassword: undefined }))
}


/**
 * Agrega un usuario a la base de datos
* @returns {{
 *   mail: String,
 *   hashPassword: String,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   verifyCode: String | undefined,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }}
 */

const PostDatabase = (mail, password, verify) => {
    // make md5 with crypto
    const hashPassword = crypto.createHash('md5').update(password).digest('hex')
    const userId = crypto.createHash('md5').update(mail + hashPassword).digest('hex')
    database.push({
        mail,
        hashPassword,
        apikey: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        date: new Date(),
        isVerified: verify ? true : false,
        verifyCode: !verify ? crypto.createHash('md5').update(userId + mail).digest('hex') : undefined,
        isPremium: false,
        isBanned: false,
        lastUsed: new Date(),
        uses: 0,
        userId
    })
    fs.writeFileSync(databaseDir, JSON.stringify(database))
    return database[database.length - 1]
}

/**
 * Modifica un usuario en la base de datos
  * @returns {{
 *   mail: String,
 *   hashPassword: String,
 *   apikey: String,
 *   date: Date,
 *   isVerified: Boolean,
 *   isPremium: Boolean,
 *   isBanned: Boolean,
 *   lastUsed: Date,
 *   uses: Number,
 *   userId: String
 * }}
 */

const UpdateDatabase = (mail, data) => {
    const userIndex = database.findIndex(user => user.mail === mail)
    database[userIndex] = { ...database[userIndex], ...data }
    fs.writeFileSync(databaseDir, JSON.stringify(database))
    return database[userIndex]
}

/**
 * Añade un uso a un usuario
 * @returns {Boolean}
 */

const addUse = (mail) => {
    const userIndex = database.findIndex(user => user.mail === mail)
    if (userIndex === -1) return false
    database[userIndex].uses++
    fs.writeFileSync(databaseDir, JSON.stringify(database))
    return true
}

/**
 * Extermina un usuario de la base de datos
 * @returns {Boolean}
 */

const DeleteDatabase = (mail) => {
    const userIndex = database.findIndex(user => user.mail === mail)
    if (userIndex === -1) return false
    database.splice(userIndex, 1)
    fs.writeFileSync(databaseDir, JSON.stringify(database))
    return true
}

module.exports = {
    getDatabaseByUser,
    getDatabaseByApiKey,
    getDatabaseByUserId,
    getDatabaseByVerifyCode,
    PostDatabase,
    UpdateDatabase,
    DeleteDatabase,
    getDatabase,
    addUse
}