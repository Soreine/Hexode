const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')

const app = express()

// Automatically parses application/json body and put it in req.body
app.use(bodyParser.json())

app.use(router)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.code)
    res.json(err)
})

module.exports = app
