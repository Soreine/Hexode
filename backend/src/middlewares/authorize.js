/**
 * Middlewares to add an authorization layer to routes
 */
const ERRORS = require('../errors')
const User = require('../models/User')
const Game = require('../models/Game')
const utils = require('../utils')

module.exports = {
    user,
    game
}

/** 
 * Adds requirement for a valid user token. Decorates the request with
 * the user object
 * 
 * Header:
 *   Authorization: userToken=<token>
 * Possible Responses:
 *   ERROR.UNAUTHORIZED
 *   ERROR.EXPIRED_TOKEN
 */
function user (req, res, next) {
    var tokenObject

    try {
        tokenObject = parseToken('userToken', req)
    } catch (e) {
        if(e === PARSE_ERROR) {
            return next(ERRORS.UNAUTHORIZED())
        } else {
            return next(e)
        }
    }

    if(isExpired(tokenObject)) {
        return next(ERRORS.EXPIRED_TOKEN())
    }
    
    var userid = tokenObject.data
    // Fetch user TODO cache results
    User.findUserById(userid)
        .then(user => {
            // Decorate with the user
            req.user = user
            next()
        })
        .catch(err => {
            if(err === User.ERR_NOT_FOUND) {
                return next(ERRORS.UNAUTHORIZED())
            } else {
                return Promise.reject(err)
            }
        })
}

/** 
 * Adds requirement for a valid game token. Decorates the request with
 * the user object
 * 
 * Header:
 *   Authorization: gameToken=<token>
 * Possible Responses:
 *   ERROR.UNAUTHORIZED
 *   ERROR.EXPIRED_TOKEN
 */
function game (req, res, next) {
    var tokenObject

    try {
        tokenObject = parseToken('gameToken', req)
    } catch (e) {
        if(e === PARSE_ERROR) {
            return next(ERRORS.UNAUTHORIZED())
        } else {
            return next(e)
        }
    }

    if(isExpired(tokenObject)) {
        return next(ERRORS.EXPIRED_TOKEN())
    }

    return next(new Error("TODO Not implemented"))
}

/**
 * Parses a token of the form tag=... in the Authorization header
 * Throws: 
 * String, Request -> { data, expiration }
 */
const PARSE_ERROR = new Error("Parsing error")
function parseToken(tag, req) {
    var authHeader = req.get("Authorization")
    if (!authHeader) { throw PARSE_ERROR }

    // TODO parse among multiple tags
    var token = new RegExp(`^${tag}=([\w=\+]+)$`).exec(authHeader)
    if (!token) { throw PARSE_ERROR }

    return utils.readToken(token[1])
}

/**
 * Returns true if the token has expired
 * { expiration } -> Boolean
 */
function isExpired(tokenObject) {
    return tokenObject.expiration > Date.now()
}
