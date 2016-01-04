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

/** String -> String -> User */
function createUser(username, password) {
    return {
        "id": utils.UUID(),
        "username": username,
        "password": utils.hashPassword(password),
        "createdAt": Date.now()
    }
}

/** String -> Promise(mongo.User, String) */
function findUserByName(username) {
    return mongo.connect()
        .then(db => db.collection('users')
              .findOne({ username })
              .then(mongo.close(db)))
}

/** String -> String -> Promise((), String) */
function ensureParams (username, password) {
    if (!/^[\w-]{4,}$/.test(username)) {
        return Promise.reject("Invalid username")
    }

    // https://github.com/mathiasbynens/regenerate
    // Allow any string that is at least 4-length long with any unicode char
    if (!/([\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){4,}/.test(password)) {
        return Promise.reject("Invalid password")
    }

    return Promise.resolve()
}

/** String -> Promise(Boolean, String) */
function userExists(username) {
    return findUserByName(username)
        .then(user => user != null)
}

/** User -> Promise(User, String) */
function saveUser(user) {
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
            Promise.reject("The user already exist") :
            Promise.resolve(createUser(username, password)))
        .then(saveUser)
}

/** String -> String -> Promise(User, String) */
exports.login = function login(username, password) {
    return findUserByName(username)
        .then(user => {
            hash = utils.hashPassword(password)
            if (user.password !== hash) {
                return Promise.reject("Passwords don't match")
            }
            return Promise.resolve(user)
        })
}
