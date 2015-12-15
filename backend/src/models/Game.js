const mongo = require('../db')
const utils = require('../utils')
const Board = require('./Board')

/**
 * Game :: {
 *    id: String,
 *    name: String,
 *    protected: Boolean
 *    password: String,
 *    creationDate: Number
 *      In number of milliseconds since epoch.
 *    players: [{ userid:String, playerid:Number }]
 *      The list of user who joined the game and their associated player number
 *    board: String
 *      A serialized version of the board.
 * }
 */

/** String -> Promise(Boolean, Error) */
exports.gameExist = function gameExist(name) {
    return findGameByName(name)
        .then(game => game != null)
}

/** String -> String -> Game */
exports.createGame = function createGame(name, password) {
    const restricted = password !== undefined
    const game = {
        "id": utils.UUID(), // TODO generate unique ids
        "name": name,
        "restricted": restricted,
        "createdAt": Date.now(),
        "deleted": false,
        "board": Board.serialize(Board.createStandard())
    }
    if (restricted) {
        let password = utils.hashPassword(password)
        return Object.assign({ password }, game)
    } else {
        return game
    }
}

/** String -> Promise(Game, Error) */
function findGameByName(name) {
    return mongo.connect()
        .then(db => db.collection('games')
              .findOne({ name })
              .then(mongo.close(db)))
}

/** Game -> Promise(Game, Error) */
exports.saveGame = function saveGame(game) {
    return mongo.connect()
        .then(db => db.collection('games')
              .insertOne(game)
              .then(mongo.close(db)))
        .then(() => game)
}
