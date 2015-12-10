const express = require('express')
const controller = require('../../controllers/games')

const router = express.Router()

router.post('/', controller.register)

module.exports = router

