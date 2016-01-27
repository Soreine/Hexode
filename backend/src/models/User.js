const mongo = require('../db')
const utils = require('../utils')

/**
 * User :: {
 *    id: String,
 *    username: String,
 *    password: String,
 *    createdAt: String
 * }
 */

exports.ERR_NOT_FOUND = new Error("User not found")
exports.ERR_ALREADY_EXISTS = new Error("The user already exists")
exports.ERR_WRONG_CREDENTIALS = new Error("Password don't match")
exports.ERR_INVALID_USERNAME = new Error("The username is invalid")
exports.ERR_INVALID_PASSWORD = new Error("The password is invalid")

/** String -> String -> User */
function createUser(username, password) {
    console.log("Create user", username)
    return {
        "id": utils.UUID(),
        "username": username,
        "password": utils.hashPassword(password),
        "createdAt": Date.now()
    }
}

/** String -> Promise(mongo.User, Error) */
function findUserByName(username) {
    console.log("Lookup for user", username)
    return mongo.connect()
        .then(db => db.collection('users')
              .findOne({ username })
              .then(mongo.close(db)))
        .then(user => {
            if (user == null) {
                return Promise.reject(exports.ERR_NOT_FOUND)
            }
            return Promise.resolve(user)
        })
}

/** String -> String -> Promise((), Error) */
function ensureParams (username, password) {
    if (!/^[\w-]{4,}$/.test(username)) {
        return Promise.reject(exports.ERR_INVALID_USERNAME)
    }

    if (!utils.validatePassword(password)) {
        return Promise.reject(exports.ERR_INVALID_PASSWORD)
    }

    return Promise.resolve()
}

/** String -> Promise(Boolean, String) */
function userExists(username) {
    console.log("Search if user exists", username)
    return findUserByName(username)
        .then(() => Promise.resolve(true))
        .catch(err => {
            if (err === exports.ERR_NOT_FOUND) {
                return Promise.resolve(false)
            }
            return Promise.reject(err)
        })
}

/** User -> Promise(User, String) */
function saveUser(user) {
    console.log("Save user", user.username)
    return mongo.connect()
        .then(db => db.collection('users').insertOne(user)
        .then(mongo.close(db)))
        .then(() => user)
}

/** String -> String -> Promise(User, String) */
exports.register = function register(username, password) {
    return ensureParams(username, password)
        .then(() => userExists(username))
        .then(exist => exist ?
            Promise.reject(exports.ERR_ALREADY_EXISTS) :
            Promise.resolve(createUser(username, password)))
        .then(saveUser)
}

/** String -> String -> Promise(User, String) */
exports.login = function login(username, password) {
    console.log("login", username, password)
    return findUserByName(username)
        .then(user => {
            var hash = utils.hashPassword(password)
            if (user.password !== hash) {
                return Promise.reject(exports.ERR_WRONG_CREDENTIALS)
            }
            return Promise.resolve(user)
        })
}

