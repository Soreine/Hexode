const express = require('express')
const ERRORS = require('../../errors')
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
                token: utils.genToken(user.id),
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
 *   403 Unauthorized: Wrong credentials
 */
router.get('/authenticate', authenticate)
function authenticate(req, res) {
    res.json({ notImplemented: "yet" })
}


module.exports = router
