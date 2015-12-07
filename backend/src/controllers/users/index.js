const ERRORS = require('../../errors')
const User = require('../../models/User')
const utils = require('../../utils')

exports.register = function register (req, res, next) {
    const { body: { username, password } } = req
    if (!username || !password) {
        return next(ERRORS.MISSING_PARAMETERS(['username', 'password']))
    }
    User.register(username, password)
        .then(user => ({
            id: user.id,
            username: user.username,
            token: utils.genToken(user)
        }))
        .then(data => {
            res.status(201)
            res.json(data)
        })
        .catch(next)
}
