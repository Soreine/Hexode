const express = require('express')
const ERRORS = require('../../errors')
const CONFIG = require('../../config')
const User = require('../../models/User')
const utils = require('../../utils')
const router = express.Router()


/*
 * Endpoint: [POST] /users
 * Header:
 *   <None>
 * Body: {username, password}
 * Response:
 *   201 (JSON) The created user with a valid auth token
 *   400 Bad Request: invalid parameters
 */
router.post('/', register)
function register(req, res, next) {
    const { body: { username, password } } = req
    if (!username || !password) {
        next(ERRORS.MISSING_PARAMETERS(['username', 'password']))
    } else {
        User.register(username, password)
            .then(user => ({
                id: user.id,
                username: user.username,
                token: utils.genToken(user.id, Date.now() + CONFIG.USER_TOKEN_EXPIRATION),
                createdAt: user.createdAt
            }))
            .then(data => {
                res.status(201)
                res.json(data)
            })
            .catch(err => next(ERRORS.REGISTRATION_FAILED(err)))
    }
}

/*
 * Endpoint: [GET] /users/authenticate?username:username
 * Header:
 *   Authorization: password=<password>
 * Body: <None>
 * Response:
 *   200 (JSON) A valid auth token
 *   403 Forbidden: Wrong credentials
 */
router.get('/authenticate', authenticate)
function authenticate(req, res, next) {
    var authorize = req.get("Authorization")
    if (!authorize) { return next(ERRORS.WRONG_CREDENTIALS()) }
    var password = authorize.match(/^password=(.+)$/)
    if (!password) { return next(ERRORS.WRONG_CREDENTIALS()) }
    if (!req.query.username) { return next(ERRORS.WRONG_CREDENTIALS()) }
    User.login(req.query.username, password[1])
        .then(user => {
            res.status(200)
            res.json({
                token: utils.genToken(user.id, Date.now() + CONFIG.USER_TOKEN_EXPIRATION)
            })
        })
        .catch(() => next(ERRORS.WRONG_CREDENTIALS()))
}


module.exports = router
