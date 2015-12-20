const express = require('express')
const ERRORS = require('../../errors')
const User = require('../../models/User')
const utils = require('../../utils')
const router = express.Router()

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

module.exports = router
