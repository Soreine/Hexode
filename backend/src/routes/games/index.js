const express = require('express')
const ERRORS = require('../../errors')
const Game = require('../../models/Game')
const utils = require('../../utils')
const router = express.Router()
const authorize = require('../../middlewares/authorize')

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
router.post('/', authorize.user)
router.post('/', create)
function create(req, res, next) {
    const { name, password } = req.body
    if (!name) {
        next(ERRORS.MISSING_PARAMETERS('name'))
        return
    }

    Game.registerGame(name, password)
        // TODO automatically join the game ?
        .then(curateGame)
        .then(game => {
            res.status(201)
            res.json(game)
        })
        .catch(err => next(ERRORS.DEBUG(err)))
}

/*
router.put('/:gameId/invade', invadeTile)
router.put('/:gameId/join', join)
router.get('/:gameId', retrieveState)
router.get('/', listOngoing)
*/

/**
 * Returns a curated Game object, that only exposes properties defined
 * in the API
 * Game -> Object
 */
function curateGame(game) {
    return utils.pick(game,
               'id',
               'name',
               'restricted',
               'createdAt',
               'deleted',
               'board',
               'players')
}

module.exports = router
