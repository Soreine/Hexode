const CONFIG = require('./config')
const crypto = require('crypto')

/** () -> String */
exports.UUID = function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = crypto.randombytes(1)[0]%16|0
        return (v = c === 'x' ? r : r&0x3|0x8).toString(16)
    })
}

/** User -> String */
exports.genToken = function genToken(user) {
    return crypto
        .createCipher('aes256', CONFIG.SECRET_KEY)
        .update(user.id + "|" + (Date.now() + CONFIG.EXPIRATION_DELAY))
        .digest('base64')
}
