const express = require('express')
const userRouter = require('./users')
const gameRouter = require('./games')

const router = express.Router()
router.use('/users', userRouter)
router.use('/games', gameRouter)

module.exports = router
