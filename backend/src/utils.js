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
 * Generates a token containing the given data, with an
 * expiration date
 * String, Date -> String
 */
exports.genToken = function genToken(data, expiration) {
    let cipher = crypto.createCipher('aes256', CONFIG.SECRET_KEY)
    var ciphered = cipher.update(data + "|" + expiration, 'utf8', 'base64')
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
exports.hashPassword = function hashPassword(password) {
    return crypto.createHmac('sha256', password).update(password).digest('base64')
}


/**
 * Allows any string that is at least 4-length long with any unicode char
 * String -> Boolean
 */
exports.validatePassword = function validatePassword(password) {
    // https://github.com/mathiasbynens/regenerate
    return /([\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){4,}/
        .test(password)
}

/**
 * Return a new object containing only the given named fields from the
 * original object
 */
exports.pick = pick
function pick(o, ...fields) {
    // http://stackoverflow.com/a/25835337
    return fields.reduce((a, x) => {
        if (o.hasOwnProperty(x)) {
            a[x] = o[x]
        }
        return a
    }, {})
}
