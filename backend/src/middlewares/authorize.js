const ERRORS = require('../errors')

module.exports = tag => (req, res, next) => {
    authorize = req.get("Authorization")
    if (!authorize) { return next(ERRORS.WRONG_CREDENTIALS()) }
    // Consider the authorization header of the form: tag=...
    // With the token being a base64 encode of what we're looking for
    tokenReg = new RegExp(`^${tag}=([\w=\+]+)$`)
    token = authorize.match(tokenReg)
    if (!token) { return next(ERRORS.WRONG_CREDENTIALS()) }
    decrypted = utils.readToken(token[1])
    if (decrypted.expiration >= Date.Now()) { return next(ERRORS.WRONG_CREDENTIALS()) }

    switch (tag) {
        case "userToken":
            // For a user token, let's add a user
            // We could also possibly retrieve the user from the db or local cache.
            req.userId = decrypted.data
        break
        case "gameToken":
        default:
            throw "Not Implemented"
    }
}
