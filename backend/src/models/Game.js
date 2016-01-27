const mongo = require('../db')
const utils = require('../utils')
const Board = require('./Board')

exports.ERR_NOT_FOUND = new Error("Game not found")
exports.ERR_ALREADY_EXISTS = new Error("The game already exists")
exports.ERR_WRONG_PASSWORD = new Error("Password doesn't match")
exports.ERR_INVALID_NAME = new Error("The name is invalid")
exports.ERR_INVALID_PASSWORD = new Error("The password is invalid")

/**
 * Game :: {
 *    id: String,
 *    name: String,
 *    restricted: Boolean
 *    password: String,
 *    creationDate: Number
 *      In number of milliseconds since epoch.
 *    players: [{ id:String, username:String }]
 *      The list of users who are playing the game
 *    board: String
 *      A serialized version of the board.
 * }
 */


/** Creates a new game object with the given name and optional password
 * String -> (String) -> Game
 */
function createGame(name, password) {
    const restricted = password !== undefined
    const game = {
        id: utils.UUID(),
        name: name,
        restricted: restricted,
        createdAt: Date.now(),
        deleted: false,
        board: Board.serialize(Board.createStandard()),
        players: []
    }
    if (restricted) {
        let password = utils.hashPassword(password)
        return Object.assign({ password }, game)
    } else {
        return game
    }
}

/** Lookup for an active (= non deleted) game by name
 * String -> Promise(Boolean, Error) 
 */
exports.activeGameExists = activeGameExists
function activeGameExists(name) {
    console.log(`Lookup for game '${name}'`)
    return findActiveGameByName(name)
        .then(game => game != null)
}

/** Game -> Promise(Game, Error) */
exports.saveGame = saveGame
function saveGame(game) {
    return mongo.connect()
        .then(db => db.collection('games')
              .insertOne(game)
              .then(mongo.close(db)))
        .then(() => game)
}

/** Register a new game with optional password
 * String -> (String) -> Promise(Game, Error) */
exports.registerGame = registerGame
function registerGame(name, password) {
    console.log(`Register game '${name}'`
                + (password ? ` with password '${password}`
                   : " without password"))
    let checks = [validateName(name)]
    if (password) {
        checks.push(validatePassword(password))
    }
    
    return Promise.all(checks)
        .then(() => activeGameExists(name))
        .then(exists => exists ?
              Promise.reject(exports.ERR_ALREADY_EXISTS)
              : Promise.resolve(createGame(name, password)))
        .then(saveGame)
}


/** String -> Promise(Game, Error) */
function findActiveGameByName(name) {
    return mongo.connect()
        .then(db => db.collection('games')
              .findOne({ name }) // TODO filter out deleted ones
              .then(mongo.close(db)))
}

/** String -> String -> Promise((), Error) */
function validateName(gamename) {
    if (!/^.{3,}$/.test(gamename)) {
        return Promise.reject(exports.ERR_INVALID_NAME)
    }
    return Promise.resolve()
}

/** String -> String -> Promise((), Error) */
function validatePassword(password) {
    if (utils.validatePassword(password)) {
        return Promise.reject(exports.ERR_INVALID_PASSWORD)
    }
    return Promise.resolve()
}
