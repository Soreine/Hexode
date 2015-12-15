const mongo = require('../db')
const utils = require('../utils')
const crypto = require('crypto')

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
        "password": crypto.createHmac('sha256', password).update(password).digest('base64'),
        "createdAt": Date.now()
    }
}

/** String -> Promise(Boolean, Error) */
function userExist(username) {
    return mongo.connect()
        .then(db => db.collection('users').findOne({ username })
        .then(mongo.close(db)))
        .then(user => user != null)
}

/** User -> Promise(User, Error) */
function saveUser(user) {
    return mongo.connect()
        .then(db => db.collection('users').insertOne(user)
        .then(mongo.close(db)))
        .then(() => user)
}

/** String -> String -> Promise({id, username, token : String}, Error) */
exports.register = function register(username, password) {
    return userExist(username)
        .then(exist => exist ?
                Promise.reject("The user already exist") :
                Promise.resolve(createUser(username, password)))
        .then(saveUser)
}