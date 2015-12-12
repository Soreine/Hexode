const ERRORS = require('../../errors')
const Game = require('../../models/Game')
const User = require('../../models/User')
const utils = require('../../utils')

/*
 * Header:
 *   Authorization: A valid user token
 * Body: {name, (password)}
 * Response:
 *   201 (JSON) The created game
 *   400 Bad Request: invalid parameters
 *   401 Unauthorized: wrong token
 */
exports.create = function create (req, res, next) {
    const { name, password } = req.body
    const userToken = req.get("Authorization")
    const {username, expiration} = utils.readToken(userToken)
    // TODO check token validity, maybe by adding a middleware
    if (!name) {
        next(ERRORS.MISSING_PARAMETERS('name'))
    } else {
        Game.createGame(name, password)
        // TODO automatically join the game ?
            .then(game => {
                res.status(201)
                res.json(game)
            })
        // TODO what could happen ?
            .catch(err => next(ERRORS.DEBUG(err)))
    }
}
