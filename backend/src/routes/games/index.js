const express = require('express')
const ERRORS = require('../../errors')
const Game = require('../../models/Game')
const utils = require('../../utils')
const router = express.Router()

// router.delete('/:gameId', deleteGame)

/*
 * Header:
 *   Authorization: A valid user token
 * Body: {name, (password)}
 * Response:
 *   201 (JSON) The created game
 *   400 Bad Request: invalid parameters
 *   401 Unauthorized: wrong token
 */
router.post('/', create)
function create (req, res, next) {
    const { name, password } = req.body
    // TODO check token validity, maybe by adding a middleware
    const userToken = req.get("Authorization") // eslint-disable-line
    const {username, expiration} = utils.readToken(userToken) // eslint-disable-line
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

/*
router.put('/:gameId/invade', invadeTile)
router.put('/:gameId/join', join)
router.get('/:gameId', retrieveState)
router.get('/', listOngoing)
*/

module.exports = router
