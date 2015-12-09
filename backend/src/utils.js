const CONFIG = require('./config')
const crypto = require('crypto')

/** () -> String */
exports.UUID = function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = crypto.randomBytes(1)[0]%16|0
        return (c === 'x' ? r : r&0x3|0x8).toString(16)
    })
}

/** User -> String */
exports.genToken = function genToken(user) {
    let cypher = crypto.createCipher('aes256', CONFIG.SECRET_KEY)
    cypher.update(user.id + "|" + (Date.now() + CONFIG.EXPIRATION_DELAY), 'utf8', 'base64')
    return cypher.final('base64')
}
