const CONFIG = require('./config')
const crypto = require('crypto')

/** () -> String */
exports.UUID = function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = crypto.randomBytes(1)[0]%16|0
        return (c === 'x' ? r : r&0x3|0x8).toString(16)
    })
}

/**
 * Generates a token containing the given data, along with an
 * expiration date.
 * String -> String
 */
exports.genToken = function genToken(data) {
    let cipher = crypto.createCipher('aes256', CONFIG.SECRET_KEY)
    var ciphered = cipher.update(data + "|" + (Date.now() + CONFIG.EXPIRATION_DELAY), 'utf8', 'base64')
    return ciphered + cipher.final('base64')
}

/**
 * Decrypts a token and returns the contained data and its
 * expiration date in ms from Epoch.
 * String -> {data: String, expiration: Number }
 */
exports.readToken = function readToken(token) {
    let decipher = crypto.createDecipher('aes256', CONFIG.SECRET_KEY)
    var plaintext = decipher.update(token, 'base64', 'utf8')
    plaintext += decipher.final('utf8')
    let [data, expiration] = plaintext.split('|')
    return {
        data: data,
        expiration: parseInt(expiration, 10)
    }
}

/**
 * Encrypt a plain-text password with itself and returns its base64 representation
 * String -> String
 */
exports.hashPassword = function hashPassword (password) {
    return crypto.createHmac('sha256', password).update(password).digest('base64')
}
