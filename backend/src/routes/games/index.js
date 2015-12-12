const express = require('express')
const controller = require('../../controllers/games')

const router = express.Router()

router.delete('/:gameId', controller.delete)
router.post('/', controller.create)
router.put('/:gameId/invade', controller.invadeTile)
router.put('/:gameId/join', controller.join)
router.get('/:gameId', controller.retrieveState)
router.get('/', controller.listOngoing)

module.exports = router

